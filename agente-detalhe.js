var agente = null;
const params = new URLSearchParams(window.location.search);
const responsibleModal = document.getElementById('responsible-modal');
document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const urlid = params.get("id");

    // --- CARREGAMENTO DE DADOS DO AGENTE --- //
    if (urlid) {
        fetch(linkJs)
            .then(res => res.json())
            .then(data => {
                const agent = data.find(element => element.id == urlid);
                agente = agent;

                if (agent) {
                    document.title = `Detalhes - ${agent.nome}`; // Mudar título da página
                    document.querySelector('.icon-placeholder').style.backgroundImage = agent.icone ? `url('img/${agent.alias}/${agent.icone}')` : `url('img/err.png')`;
                    document.querySelector('.agent-title').textContent = agent.nome;
                    document.querySelector('.agent-developer').textContent = `Desenvolvido por ${agent.tecnologia}`;
                    document.querySelector('.agent-summary').textContent = agent.funcionalidade;
                    document.querySelector('.agent-category').textContent = agent.categoria;
                    document.querySelector('.sp1').textContent = `${agent.avaliacao} ★`;
                    document.querySelector('.sp2').textContent = `Responsável ${agent.responsavel}`;
                    document.querySelector('#description div').textContent = agent.descricao || "Nenhuma descrição disponível.";

                    const screenshots = document.querySelectorAll('.screenshot-img');
                    screenshots[0].src = agent.captura1 ? `img/${agent.alias}/${agent.captura1}` : 'https://placehold.co/400x300/004415/FFF?text=Sem+Imagem';
                    screenshots[1].src = agent.captura2 ? `img/${agent.alias}/${agent.captura2}` : 'https://placehold.co/400x300/004415/FFF?text=Sem+Imagem';
                    screenshots[2].src = agent.captura3 ? `img/${agent.alias}/${agent.captura3}` : 'https://placehold.co/400x300/004415/FFF?text=Sem+Imagem';
                    screenshots[3].src = agent.captura4 ? `img/${agent.alias}/${agent.captura4}` : 'https://placehold.co/400x300/004415/FFF?text=Sem+Imagem';

                    // Carregar prompts sugeridos   
                    const promptsTab = document.querySelector('#prompts ul');
                    promptsTab.innerHTML = ''; // Limpa os itens antigos

                    if (agent.Prompt && Array.isArray(agent.Prompt)) {
                        agent.Prompt.forEach(prompt => {
                            const li = document.createElement('li');
                            li.className = 'prompts-suggestion';
                            li.textContent = prompt;
                            promptsTab.appendChild(li);
                        });
                    } else {
                        const li = document.createElement('li');
                        li.className = 'prompts-suggestion';
                        li.textContent = 'Nenhum prompt sugerido disponível.';
                        promptsTab.appendChild(li);
                    }
                    //BOTOES DE INFORMAÇÕES
                    if (agent.confidencialidade == "Público") {
                        const btnPrimary = document.createElement('button');
                        btnPrimary.setAttribute('class', 'btn-primary btn');
                        btnPrimary.textContent = "Ativar";
                        btnPrimary.addEventListener('click', () => { window.open(agent.url_agente) })
                        document.querySelector('.agent-actions').appendChild(btnPrimary)
                    } else {
                        const btnPrimary = document.createElement('button');
                        btnPrimary.setAttribute('class', 'btn-primary btn');
                        btnPrimary.textContent = "Solicitar Acesso";
                        btnPrimary.addEventListener('click', () => { window.alert("Solicitação enviada com sucesso !") })
                        document.querySelector('.agent-actions').appendChild(btnPrimary)

                    }


                    const btnsecondary = document.createElement('button');
                    btnsecondary.setAttribute('class', 'btn-secondary btn');
                    btnsecondary.setAttribute('onclick', 'modalResponsavel()');
                    btnsecondary.textContent = "Contato";
                    document.querySelector('.agent-actions').appendChild(btnsecondary)

                    const agentPriceInfo = document.createElement('div');
                    agentPriceInfo.setAttribute('class', 'agent-price-info');
                    document.querySelector('.agent-actions').appendChild(agentPriceInfo)

                    const priceTag = document.createElement('span');
                    priceTag.setAttribute('class', 'price-tag');
                    priceTag.textContent = "L";
                    document.querySelector('.agent-price-info').appendChild(priceTag)

                    const diiv = document.createElement('div');
                    document.querySelector('.agent-price-info').appendChild(diiv)

                    const p1 = document.createElement('p');
                    p1.textContent = agent.confidencialidade;
                    document.querySelector('.agent-price-info div').appendChild(p1)

                    const p2 = document.createElement('p');
                    p2.setAttribute('class', 'small-text');
                    p2.textContent = "Requer licença da plataforma";
                    document.querySelector('.agent-price-info div').appendChild(p2)


                    // Inicializar modal após carregar as imagens
                    initImageModal();
                } else {
                    document.querySelector('.agent-title').textContent = "Agente não encontrado";
                }
            })
            .catch(error => {
                console.error("Erro ao carregar dados do agente:", error);
                document.querySelector('.agent-title').textContent = "Erro ao carregar";
            });
    }

    // --- LÓGICA DO SISTEMA DE ABAS --- //
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona a classe 'active' ao botão clicado e ao conteúdo correspondente
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });


    // --- LÓGICA DO MODAL DE IMAGEM --- //
    function initImageModal() {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const screenshotImages = document.querySelectorAll('.screenshot-img');
        const closeModal = document.querySelector(".close-modal");

        screenshotImages.forEach(img => {
            img.addEventListener('click', function () {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });

        const close = () => {
            modal.style.display = "none";
        };

        closeModal.addEventListener('click', close);
        // Fecha o modal se clicar fora da imagem
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                close();
            }
        });
    }


    // --- LÓGICA DO FORMULÁRIO DE FEEDBACK --- //
    const feedbackForm = document.querySelector('.feedback-form');
    const feedbackList = document.querySelector('.feedback-list');
    const feedbackTextarea = feedbackForm.querySelector('textarea');

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const feedbackText = feedbackTextarea.value.trim();

        if (feedbackText) {
            const newFeedback = document.createElement('div');
            newFeedback.classList.add('feedback-item');

            newFeedback.innerHTML = `
                    <p class="feedback-author"><strong>Usuário Anônimo</strong></p>
                    <p>${feedbackText}</p>
                `;

            feedbackList.appendChild(newFeedback);
            feedbackTextarea.value = ''; // Limpa o campo
        }
    });

    function avaliar(x) {
        alert(x)
        document.querySelector('.avaliacao').style.display = "none"
    }
});
// Modal do Responsável
function modalResponsavel() {
    document.getElementById('resp-modal-name').textContent = agente.responsavel;
    document.getElementById('resp-modal-area').textContent = agente.responsavelArea;
    document.getElementById('resp-modal-email').textContent = agente.responsavelEmail;
    responsibleModal.style.display = 'block';
};
// Fechar Modais
document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
function enviarTeams() {
    console.log("https://teams.microsoft.com/l/chat/0/0?users=" + agente.responsavelEmail)
    window.open("https://teams.microsoft.com/l/chat/0/0?users=" + agente.responsavelEmail);
}