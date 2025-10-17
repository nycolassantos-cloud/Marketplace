// ====== ORIGINAL ======
var agente = null;
const params = new URLSearchParams(window.location.search);
const responsibleModal = document.getElementById('responsible-modal');
// Lista Feedback (GUID fixo)
const FEEDBACK_LIST_ID = '6657837b-a9d8-45c2-92c8-3154842ba4cc';

// ====== NOVO: garante que exista um modal de justificativa no DOM ======
function ensurejustificativaModalExists() {
  if (document.getElementById('justificativa-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'justificativa-modal';
  modal.className = 'modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" data-close="justificativa-modal">&times;</span>
      <h2>justificativa do Acesso</h2>
      <p>Explique por que você precisa deste agente:</p>
      <textarea id="justificativa-text" rows="6" placeholder="Digite sua justificativa..." style="width:100%;"></textarea>
      <div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end;">
        <button id="justificativa-cancelar" class="btn btn-secondary">Cancelar</button>
        <button id="justificativa-enviar" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// ====== NOVO: abre o modal e devolve a justificativa (ou null se cancelar) ======
function showjustificativaModal() {
  ensurejustificativaModalExists();

  return new Promise((resolve) => {
    const modal = document.getElementById('justificativa-modal');
    const textarea = document.getElementById('justificativa-text');
    const btnEnviar = document.getElementById('justificativa-enviar');
    const btnCancelar = document.getElementById('justificativa-cancelar');
    const btnX = modal.querySelector('.close-modal');

    textarea.value = '';

    const close = (result = null) => {
      btnEnviar.removeEventListener('click', onEnviar);
      btnCancelar.removeEventListener('click', onCancelar);
      modal.removeEventListener('click', onBackdrop);
      btnX.removeEventListener('click', onXClose);
      modal.style.display = 'none';
      resolve(result);
    };

    const onEnviar = () => {
      const txt = textarea.value.trim();
      if (txt.length < 10) { alert('Escreva uma justificativa um pouco mais detalhada (>= 10 caracteres).'); return; }
      if (txt.length > 2000) { alert('justificativa muito longa. Limite a até 2000 caracteres.'); return; }
      close(txt);
    };
    const onCancelar = () => close(null);
    const onBackdrop = (e) => { if (e.target === modal) close(null); };
    const onXClose = () => close(null);

    btnEnviar.addEventListener('click', onEnviar);
    btnCancelar.addEventListener('click', onCancelar);
    modal.addEventListener('click', onBackdrop);
    btnX.addEventListener('click', onXClose);

    modal.style.display = 'block';
    textarea.focus();
  });
}

document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);
  const urlid = params.get("id");

  // --- CARREGAMENTO DE DADOS DO AGENTE --- //
  if (urlid) {
    fetch(linkJs)
      .then(res => res.json())
      .then(async (data) => { 
        const agent = data.find(element => element.id == urlid);
        agente = agent;

        if (agent) {
          // Preenchimento dos detalhes do agente
          document.title = `Detalhes - ${agent.nome}`;
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

          // --- SEÇÃO DE BOTÕES COM A LÓGICA CORRETA ---
          const agentActionsContainer = document.querySelector('.agent-actions');
          agentActionsContainer.innerHTML = ''; // Limpa botões antigos para evitar duplicação

          if (agent.confidencialidade == "Público") {
            const btnPrimary = document.createElement('button');
            btnPrimary.className = 'btn-primary btn';
            btnPrimary.textContent = "Ativar";
            btnPrimary.addEventListener('click', () => { window.open(agent.url_agente) });
            agentActionsContainer.appendChild(btnPrimary);
          } else {
            const btnPrimary = document.createElement('button');
            btnPrimary.className = 'btn-primary btn';
            
            const jaSolicitou = await verificarStatusSolicitacao(agent.id.toString());
            console.log(jaSolicitou?.[1]?.status);
            // ====== AJUSTE SEGURO ======
            var statusSolicitacao = jaSolicitou?.[1]?.status || null;

            if (jaSolicitou[0] && statusSolicitacao == "Pendente") {
              btnPrimary.textContent = "Aguardando Aprovação";
              btnPrimary.addEventListener('click', () => { 
                // se existir seu modal/listagem de solicitações
                if (typeof showSolicitacoesModal === 'function') {
                  showSolicitacoesModal();
                }
              });
            } 
            else if (statusSolicitacao == "Aprovado") {
              btnPrimary.textContent = "Ativar";
              btnPrimary.addEventListener('click', () => { window.open(agent.url_agente) });
            }
            else {
              btnPrimary.textContent = "Solicitar Acesso";
              btnPrimary.addEventListener('click', async () => { 
                // ====== NOVO: abre modal para coletar justificativa ======
                const justificativa = await showjustificativaModal();
                if (justificativa === null) return; // cancelou

                try {
                  btnPrimary.disabled = true;
                  btnPrimary.textContent = "Enviando...";
                  await solicitarAcesso(agent.id.toString(), agent, justificativa);

                  btnPrimary.textContent = "Aguardando Aprovação";
                  btnPrimary.disabled = true;
                } catch (e) {
                  btnPrimary.textContent = "Solicitar Acesso";
                  btnPrimary.disabled = false;
                }
              });
            }
            agentActionsContainer.appendChild(btnPrimary);
          }

          // Botão Contato
          const btnsecondary = document.createElement('button');
          btnsecondary.className = 'btn-secondary btn';
          btnsecondary.textContent = "Contato";
          btnsecondary.onclick = modalResponsavel;
          agentActionsContainer.appendChild(btnsecondary);

          // Informações de Preço/Licença
          const agentPriceInfo = document.createElement('div');
          agentPriceInfo.className = 'agent-price-info';
          agentPriceInfo.innerHTML = `
            <span class="price-tag">L</span>
            <div>
              <p>${agent.confidencialidade}</p>
              <p class="small-text">Requer licença da plataforma</p>
            </div>
          `;
          agentActionsContainer.appendChild(agentPriceInfo);
          
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

    if (!modal || !modalImg || !closeModal) return;

    screenshotImages.forEach(img => {
      img.addEventListener('click', function() {
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
  const feedbackTextarea = feedbackForm ? feedbackForm.querySelector('textarea') : null;

  if (feedbackForm && feedbackTextarea && feedbackList) {
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
  }

  function avaliar(x){
    alert(x)
    const av = document.querySelector('.avaliacao');
    if (av) av.style.display="none";
  }
});

// Modal do Responsável
function modalResponsavel() {
  if (!agente) return;
  document.getElementById('resp-modal-name').textContent = agente.responsavel || '';
  document.getElementById('resp-modal-area').textContent = agente.responsavelArea || '';
  document.getElementById('resp-modal-email').textContent = agente.responsavelEmail || '';
  if (responsibleModal) responsibleModal.style.display = 'block';
};

// Fechar Modais (genérico para os já existentes no HTML)
document.querySelectorAll('.modal').forEach(modal => {
  const closeBtn = modal.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
});

function enviarTeams(){
  if (!agente) return;
  console.log("https://teams.microsoft.com/l/chat/0/0?users="+agente.responsavelEmail);
  window.open("https://teams.microsoft.com/l/chat/0/0?users="+agente.responsavelEmail);
}

// Verifica na lista do SharePoint se já existe uma solicitação para o agente e usuário atuais.
async function verificarStatusSolicitacao(agentId) {
  const account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));
  if (!account) return [false, null];

  try {
    const token = await getToken();
    const userEmail = account.username;
    const listId = '1D608945-09B4-4BD8-8BE2-53213E0267EC';

    // Agrupamos as condições de status com parênteses
    const filterQuery = `(fields/status eq 'Pendente' or fields/status eq 'Aprovado') and fields/emailSolicitante eq '${userEmail}' and fields/idAgente eq '${agentId}'`;

    const endpoint = `https://graph.microsoft.com/v1.0/sites/vibraenergia.sharepoint.com:/sites/marketplace-agentes:/lists/${listId}/items?expand=fields&$filter=${filterQuery}`;

    const response = await fetch(endpoint, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      // Se ainda der erro, o console mostrará a mensagem exata da API
      const errorDetails = await response.json();
      console.error("Falha ao verificar status no SharePoint:", errorDetails);
      return [false, null];
    }

    const data = await response.json();
    return [data.value.length > 0, data.value.length < 1 ? null : data.value[0].fields];

  } catch (error) {
    console.error("Erro em verificarStatusSolicitacao:", error);
    return [false, null];
  }
}

// ====== ALTERADO: Função para solicitar acesso (agora aceita justificativa) ======
async function solicitarAcesso(urlid, agente, justificativa = '') {
  try {
    const account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));
    if (!account) {
      alert("Por favor, faça o login para solicitar o acesso.");
      throw new Error("Sem conta MSAL");
    }

    const token = await getToken(); 

    const item = {
      fields: {
        solicitante: account.name,
        emailSolicitante: account.username,
        idAgente: urlid.toString(),
        urlAgente: agente.url_agente || '',
        responsavel: agente.responsavel,
        emailResponsavel: agente.responsavelEmail,
        status: 'Pendente',
        justificativa: justificativa, // <<<<< NOVO CAMPO
        nomeAgente: agente.nome,
        Plataforma: agente.tecnologia
      }
    };

    const endpoint = 'https://graph.microsoft.com/v1.0/sites/vibraenergia.sharepoint.com:/sites/marketplace-agentes:/lists/1D608945-09B4-4BD8-8BE2-53213E0267EC/items';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    if (response.ok) {
      alert('Solicitação de acesso enviada com sucesso!');
    } else {
      const error = await response.json();
      throw new Error(error?.error?.message || 'Falha ao criar item no SharePoint.');
    }
  } catch (error) {
    console.error('Erro ao criar item no SharePoint:', error);
    alert(`Erro ao enviar solicitação: ${error.message}`);
    throw error; // propaga para o caller reabilitar o botão
  }
}





/* ================================
   FEEDBACK → SharePoint (Lista Feedback)
   Cole este bloco no FINAL do agente-detalhe.js
================================== */

// GUID fixo da lista "Lista Feedback"


// Cria o controle de 1–5 estrelas dentro do form (se ainda não existir)
function ensureRatingStars(feedbackForm) {
  if (!feedbackForm || feedbackForm.querySelector('.rating-stars')) return;

  const starsWrap = document.createElement('div');
  starsWrap.className = 'rating-stars';
  starsWrap.style.display = 'flex';
  starsWrap.style.gap = '6px';
  starsWrap.style.alignItems = 'center';
  starsWrap.style.margin = '6px 0 10px';

  const label = document.createElement('span');
  label.textContent = 'Sua avaliação:';
  label.style.marginRight = '6px';
  label.style.opacity = '0.9';

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = 'estrelas';
  hidden.value = '0';

  const makeStar = (n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'star-btn';
    b.dataset.value = String(n);
    b.textContent = '☆'; // vazio
    b.style.fontSize = '22px';
    b.style.lineHeight = '1';
    b.style.border = 'none';
    b.style.background = 'transparent';
    b.style.cursor = 'pointer';
    b.setAttribute('aria-label', `${n} estrela${n>1?'s':''}`);
    b.addEventListener('mouseenter', () => paint(n));
    b.addEventListener('focus', () => paint(n));
    b.addEventListener('click', () => {
      hidden.value = String(n);
      paint(n);
    });
    return b;
  };

  const stars = Array.from({ length: 5 }, (_, i) => makeStar(i + 1));

  const paint = (qtd) => {
    stars.forEach((s, idx) => s.textContent = (idx < qtd ? '★' : '☆'));
  };

  starsWrap.appendChild(label);
  stars.forEach(s => starsWrap.appendChild(s));
  starsWrap.appendChild(hidden);

  // insere antes do botão Enviar
  const submitBtn = feedbackForm.querySelector('button[type="submit"]') || feedbackForm.lastElementChild;
  feedbackForm.insertBefore(starsWrap, submitBtn);
}

// Envia o feedback para a lista SharePoint pelo Graph API
async function enviarFeedbackSharePoint({ comentario, estrelas }) {
  // Verifica login e agente
  const account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));
  if (!account) { alert('Faça login para enviar feedback.'); throw new Error('Sem conta MSAL'); }
  if (!agente)   { alert('Agente não carregado.');          throw new Error('Agente indefinido'); }

  const token = await getToken();

  // Endpoint com GUID fixo da lista
  const endpoint = `https://graph.microsoft.com/v1.0/sites/vibraenergia.sharepoint.com:/sites/marketplace-agentes:/lists/${FEEDBACK_LIST_ID}/items`;

  // Title ajuda se a coluna estiver obrigatória
  const title = `${agente.nome || 'Agente'} • ${account.name || account.username} • ${new Date().toLocaleString()}`;

  const body = {
    fields: {
      Title: title,
      idAgente: String(agente.id),
      nomeAgente: agente.nome || '',
      emailSolicitante: account.username || '',
      solicitante: account.name || '',
      comentario: comentario || '',
      estrelas: Number(estrelas) || 0
    }
  };

  // Logs úteis
  console.groupCollapsed('📝 Enviar Feedback → SharePoint');
  console.log('Endpoint:', endpoint);
  console.log('Payload:', body);
  console.groupEnd();

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    let apiMsg = text;
    try { apiMsg = JSON.parse(text).error?.message || text; } catch {}
    console.error('❌ Erro ao enviar feedback:', resp.status, resp.statusText, apiMsg);
    throw new Error(`Não foi possível enviar seu feedback.\n${apiMsg}`);
  }

  const json = await resp.json().catch(() => ({}));
  console.log('✅ Feedback criado:', json);
  return json;
}

// Intercepta o submit do formulário de feedback (captura) e envia ao SharePoint
(function wireFeedbackSubmission() {
  const feedbackForm   = document.querySelector('.feedback-form');
  const feedbackList   = document.querySelector('.feedback-list');
  const feedbackTextarea = feedbackForm ? feedbackForm.querySelector('textarea') : null;
  if (!feedbackForm || !feedbackTextarea) return;

  // adiciona as estrelinhas se não existir
  ensureRatingStars(feedbackForm);

  // Handler em CAPTURA para “anular” o listener antigo e usar este
  feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation(); // impede o handler antigo de rodar

    const comentario = (feedbackTextarea.value || '').trim();
    const estrelas   = Number(feedbackForm.querySelector('input[name="estrelas"]')?.value || 0);

    if (!comentario) { alert('Escreva um comentário.'); return; }
    if (estrelas < 1) { alert('Selecione uma nota (1 a 5 estrelas).'); return; }

    const submitBtn = feedbackForm.querySelector('button[type="submit"]');
    const oldText   = submitBtn ? submitBtn.textContent : '';

    try {
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Enviando...'; }

      await enviarFeedbackSharePoint({ comentario, estrelas });

      // Atualiza UI local imediatamente
      if (feedbackList) {
        const newFeedback = document.createElement('div');
        newFeedback.classList.add('feedback-item');
        const starsText = '★'.repeat(estrelas) + '☆'.repeat(5 - estrelas);
        // Nome do usuário logado (ou "Você")
        const account = myMSALObj.getAccountByUsername(sessionStorage.getItem('msalAccount'));
        const autor = account?.name || 'Você';

        newFeedback.innerHTML = `
          <p class="feedback-author"><strong>${autor}</strong> — <span>${starsText}</span></p>
          <p>${comentario}</p>
        `;
        feedbackList.prepend(newFeedback);
      }

      // Reset do form
      feedbackTextarea.value = '';
      const hiddenStars = feedbackForm.querySelector('input[name="estrelas"]');
      if (hiddenStars) hiddenStars.value = '0';
      feedbackForm.querySelectorAll('.rating-stars .star-btn').forEach(btn => btn.textContent = '☆');

      alert('Feedback enviado com sucesso!');
    } catch (err) {
      console.error(err);
      alert(err?.message || 'Não foi possível enviar seu feedback.');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = oldText || 'Enviar'; }
    }
  }, true); // ← captura = true (roda antes dos outros listeners)
})();
