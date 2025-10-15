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
    scopes: ["User.Read", "Sites.ReadWrite.All"]
};

// Instancia o objeto MSAL
const myMSALObj = new msal.PublicClientApplication(msalConfig);

// Elementos da UI
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const acompanharSolicitacoesButton = document.getElementById('AcompanharSolicitacoes'); // NOVO


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

        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');

        // A permissão User.Read permite chamar o endpoint /me
        const user = await callGraphApi("https://graph.microsoft.com/v1.0/me?$select=displayName,mail,jobTitle,department");

        userName.innerText= user.displayName || 'Não informado';
        // A permissão User.Read também permite buscar a própria foto
        const photoBlob = await callGraphApi("https://graph.microsoft.com/v1.0/me/photo/$value", 'blob');
        //currentUserPhotoImg.src = URL.createObjectURL(photoBlob);
        userAvatar.style.backgroundImage = "url('"+URL.createObjectURL(photoBlob)+"')";
        //style="background-image: url('https://placehold.co/40x40/FFF/004415?text=IS')"


    } catch (error) {
        console.error(error);
    }
}

// --- ATUALIZAÇÃO DA UI E EVENT LISTENERS ---

function updateUI(account) {

    if (account) { //Mostrar Logout
        loginButton.classList.add('hidden');
        loginButton.style.display = "none";
        logoutButton.classList.remove('hidden');
        logoutButton.style.display = "block";
        document.getElementById('userAvatar').style.display = "block";
        document.getElementById('AcompanharSolicitacoes').style.display = "block";

        getCurrentUserData();

    } else { //Mostrar Login
        logoutButton.classList.add('hidden');
        logoutButton.style.display = "none";
        loginButton.classList.remove('hidden');
        loginButton.style.display = "block";
        document.getElementById('AcompanharSolicitacoes').style.display = "none";
        document.getElementById('userAvatar').style.display = "none"; 
        document.getElementById('userName').innerText = "Login";

    }
}

// --- NOVO: LÓGICA DO MODAL DE SOLICITAÇÕES ---

async function showSolicitacoesModal() {
    const modal = document.getElementById('solicitacoes-modal');
    const listContainer = document.getElementById('solicitacoes-list');
    const account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));

    if (!modal || !listContainer || !account) return;

    listContainer.innerHTML = '<p>Carregando solicitações...</p>';
    modal.style.display = 'block';

    try {
        const token = await getToken();
        // Filtra a lista pelo email do solicitante
        const endpoint = `https://graph.microsoft.com/v1.0/sites/vibraenergia.sharepoint.com:/sites/marketplace-agentes:/lists/1D608945-09B4-4BD8-8BE2-53213E0267EC/items?expand=fields&filter=fields/emailSolicitante eq '${account.username}'`;

        const response = await fetch(endpoint, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Falha ao buscar dados do SharePoint.');

        const data = await response.json();
        listContainer.innerHTML = ''; // Limpa o "Carregando"

        if (data.value.length === 0) {
            listContainer.innerHTML = '<p>Nenhuma solicitação encontrada.</p>';
            return;
        }

        data.value.forEach(item => {
            const fields = item.fields;
            const statusClass = `status-${(fields.status || 'pendente').toLowerCase()}`;

            const solicitacaoDiv = document.createElement('div');
            solicitacaoDiv.className = 'solicitacao-item';
            solicitacaoDiv.innerHTML = `
                <p><strong>Agente ID:</strong> ${fields.idAgente || 'N/A'}</p>
                <p><strong>Responsável:</strong> ${fields.responsavel || 'N/A'}</p>
                <p><strong>Status:</strong> <span class="status ${statusClass}">${fields.status || 'Pendente'}</span></p>
            `;
            listContainer.appendChild(solicitacaoDiv);
        });

    } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
        listContainer.innerHTML = `<p style="color: red;">Erro ao carregar solicitações. Tente novamente mais tarde.</p>`;
    }
}


// Event Listeners
loginButton.addEventListener('click', signIn);
logoutButton.addEventListener('click', signOut);
if(acompanharSolicitacoesButton) {
    acompanharSolicitacoesButton.addEventListener('click', (e) => {
        e.preventDefault(); // Previne a navegação do link '#'
        showSolicitacoesModal();
    });
}


// Verifica o estado do login ao carregar a página
myMSALObj.handleRedirectPromise().then(handleResponse).catch(err => {
    console.error(err);
    updateUI(null); // Garante que a UI seja atualizada mesmo em caso de erro na inicialização
});

const account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));
updateUI(account);