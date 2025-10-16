<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalhes do Agente - IA Financeira</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="agente-detalhe.css">
    <link rel="icon" href="https://www.vibraenergia.com.br/sites/default/files/favicon.ico" type="image/vnd.microsoft.icon">
</head>
<script src="linkJSON.js"></script>
<body>
    <div id="responsible-modal" class="modal">
        <div class="modal-content responsible-info">
            <span class="close-modal">&times;</span>
            <h2>Informa��es de Contato</h2>
            <p><strong>Nome:</strong> <span id="resp-modal-name"></span></p>
            <p><strong>�rea:</strong> <span id="resp-modal-area"></span></p>
            <p><strong>E-mail:</strong> <span id="resp-modal-email"></span></p>

            <button type="button" id="enviarTeams" style="margin-top:20px;margin-left: 27%;width: 205px;background-color: #5b5fc7;" class="btn btn-primary" onclick="enviarTeams()">Falar no Teams</button>
        </div>
    </div>
    <div class="avaliacao"></div>

        <div id="imageModal" class="modal">
        <span class="close-modal" title="Fechar">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </span>
        <img class="modal-content" id="modalImage">
    </div>


    <div class="detail-container">
        <a href="index.aspx" class="back-button" aria-label="Voltar para a p�gina inicial">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Voltar
        </a>
        <header class="detail-header">
            <div class="agent-icon">
                <div class="icon-placeholder"></div>
            </div>
            <div class="agent-info">
                <h1 class="agent-title">Carregando...</h1>
                <p class="agent-developer">Carregando...</p>
                <div class="agent-meta">
                    <span class="sp1">0.0 ?</span>
                    <span>�</span>
                    <span class="agent-category">Carregando...</span>
                    <span>�</span>
                    <span class="sp2">90% assertividade</span>
                </div>
                <p class="agent-summary">Carregando...</p>
            </div>
            <div class="agent-actions">
            </div>
        </header>

        <section class="detail-section" id="captura-tela">
            <h2 class="section-title">Capturas de tela</h2>
            <div class="screenshots-container">
                <img class="img1 screenshot-img" src="img/null.png" alt=""/>
                <img class="img2 screenshot-img" src="img/null.png" alt=""/>
                <img class="img3 screenshot-img" src="img/null.png" alt=""/>
                <img class="img4 screenshot-img" src="img/null.png" alt=""/>
            </div>
        </section>

        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button active" data-tab="description">Descri��o</button>
                <button class="tab-button" data-tab="prompts">Prompts Sugeridos</button>
                <button class="tab-button" data-tab="feedback">Feedbacks</button>
            </div>

            <div id="description" class="tab-content active">
                <p>Carregando descri��o...</p>
            </div>

            <div id="prompts" class="tab-content">
                <ul>
                    <li>"Qual o resumo das vendas do �ltimo trimestre?"</li>
                    <li>"Crie um plano de marketing para o novo produto X."</li>
                    <li>"Compare a performance das campanhas A e B."</li>
                    <li>"Gere um relat�rio de satisfa��o do cliente."</li>
                </ul>
            </div>

            <div id="feedback" class="tab-content">
                <div class="feedback-list">
                    <div class="feedback-item">
                        <p class="feedback-author"><strong>Carlos Silva</strong></p>
                        <p>Muito �til! Me ajudou a otimizar meu tempo.</p>
                    </div>
                    <div class="feedback-item">
                        <p class="feedback-author"><strong>Maria Oliveira</strong></p>
                        <p>Ferramenta fant�stica para an�lise de dados.</p>
                    </div>
                </div>
                <form class="feedback-form">
                    <h3>Deixe seu feedback:</h3>
                    <textarea placeholder="Escreva seu coment�rio..." required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>

    </div>


<script src="agente-detalhe.js"></script>
</body>
</html>