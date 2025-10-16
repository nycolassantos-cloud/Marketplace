// Configuração da MSAL
const msalConfig = {
    auth: {
        // Cole aqui o ID do Aplicativo (cliente) do seu registro no Azure AD
        clientId: '647bfbf0-f999-42ba-962f-faf21a2a894d', 
        authority: 'https://login.microsoftonline.com/809f94a6-0477-4390-b86e-eab14c5493a7', // Ou especifique seu tenant ID
        redirectUri: window.location.href // A URL onde o arquivo está, já configurada no Azure
    },
    cache: {
        cacheLocation: "sessionStorage", // 'localStorage' se quiser manter o login entre abas/janelas
        storeAuthStateInCookie: false,
    }
};

// ATENÇÃO: Reduzimos os escopos para solicitar APENAS a permissão que você tem.
const loginRequest = {
    scopes: ["User.Read"]
};

// Instancia o objeto MSAL
const myMSALObj = new msal.PublicClientApplication(msalConfig);

// Elementos da UI
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const contentDiv = document.getElementById('content');
const currentUserInfoDiv = document.getElementById('currentUserInfo');
const currentUserPhotoImg = document.getElementById('currentUserPhoto');

// --- LÓGICA DE AUTENTICAÇÃO ---

function handleResponse(response) {
    if (response !== null) {
        sessionStorage.setItem('msalAccount', response.account.username);
        updateUI(response.account);
    } else {
        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length > 0) {
            sessionStorage.setItem('msalAccount', currentAccounts[0].username);
            updateUI(currentAccounts[0]);
        }
    }
}

function signIn() {
    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);
        });
}

function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'))
    };
    myMSALObj.logoutPopup(logoutRequest);
    sessionStorage.removeItem('msalAccount');
    updateUI(null);
}

// --- CHAMADAS À API DO GRAPH ---

async function getToken() {
    let account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));
    if (!account) {
        throw new Error("Usuário não logado!");
    }

    const request = { ...loginRequest, account: account };

    try {
        const response = await myMSALObj.acquireTokenSilent(request);
        return response.accessToken;
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
            const response = await myMSALObj.acquireTokenPopup(request);
            return response.accessToken;
        } else {
            throw error;
        }
    }
}

async function callGraphApi(endpoint, responseType = 'json') {
    const token = await getToken();
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    const response = await fetch(endpoint, options);

    if (response.ok) {
        if (responseType === 'blob') {
            return await response.blob();
        } else {
            return await response.json();
        }
    } else {
        throw new Error(`Erro na API do Graph: ${response.status}`);
    }
}

// --- FUNÇÃO DE BUSCA DE DADOS DO USUÁRIO LOGADO ---

async function getCurrentUserData() {
    try {
        // A permissão User.Read permite chamar o endpoint /me
        const user = await callGraphApi("https://graph.microsoft.com/v1.0/me?$select=displayName,mail,jobTitle,department");
        currentUserInfoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${user.displayName || 'Não informado'}</p>
            <p><strong>E-mail:</strong> ${user.mail || 'Não informado'}</p>
            <p><strong>Cargo:</strong> ${user.jobTitle || 'Não informado'}</p>
            <p><strong>Departamento:</strong> ${user.department || 'Não informado'}</p>
        `;

        // A permissão User.Read também permite buscar a própria foto
        const photoBlob = await callGraphApi("https://graph.microsoft.com/v1.0/me/photo/$value", 'blob');
        currentUserPhotoImg.src = URL.createObjectURL(photoBlob);
    } catch (error) {
        console.error(error);
        currentUserInfoDiv.innerHTML = `<p style="color:red;">Erro ao buscar dados do usuário. Verifique se a foto de perfil está configurada.</p>`;
    }
}

// --- ATUALIZAÇÃO DA UI E EVENT LISTENERS ---

function updateUI(account) {
    if (account) {
        loginButton.classList.add('hidden');
        logoutButton.classList.remove('hidden');
        contentDiv.classList.remove('hidden');
        getCurrentUserData();
    } else {
        loginButton.classList.remove('hidden');
        logoutButton.classList.add('hidden');
        contentDiv.classList.add('hidden');
    }
}

loginButton.addEventListener('click', signIn);
logoutButton.addEventListener('click', signOut);

// Verifica o estado do login ao carregar a página
myMSALObj.handleRedirectPromise().then(handleResponse).catch(err => {
    console.error(err);
});

const account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));
updateUI(account);