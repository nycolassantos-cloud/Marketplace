<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalhes do Agente - IA Financeira</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="agente-detalhe2.css">
    
</head>
<script src="linkJSON.js"></script>
<body>

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
                    <span class="sp2">90% assertividade</span>
                    <span>�</span>
                    <span class="agent-category">Carregando...</span>
                </div>
                <p class="agent-summary">Carregando...</p>
            </div>
            <div class="agent-actions">
                <button class="btn btn-primary">Ativar</button>
                <button class="btn btn-secondary">Visitar Site</button>
                <div class="agent-price-info">
                    <span class="price-tag">L</span>
                    <div>
                        <p>LIVRE</p>
                        <p class="small-text">Recursos adicionais podem ser pagos</p>
                    </div>
                </div>
            </div>
        </header>

        <section class="detail-section">
            <h2 class="section-title">Capturas de tela</h2>
            <div class="screenshots-container">
                <img class="img1 screenshot-img" src="img/img_lu1.png" alt=""/>
                <img class="img2 screenshot-img" src="img/img_lu2.png" alt=""/>
                <img class="img3 screenshot-img" src="img/img_lu3.png" alt=""/>
                <img class="img4 screenshot-img" src="img/img_lu4.png" alt=""/>

               <!-- <img class="img1 screenshot-img" src="img/null.png" alt="">
                <img class="img2 screenshot-img" src="img/null.png" alt="">
                <img class="img3 screenshot-img" src="img/null.png" alt="">
                <img class="img4 screenshot-img" src="img/null.png" alt="">-->
            </div>
        </section>

        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button active" data-tab="description">Descri��o</button>
                <button class="tab-button" data-tab="prompts">Prompts Sugeridos</button>
                <button class="tab-button" data-tab="feedback">Feedbacks</button>
            </div>

            <div id="description" class="tab-content active">
                <p>Carregando descrição...</p>
            </div>
            <div id="prompts" class="tab-content">
                <ul>
                    <li>"Qual o resumo das vendas do último trimestre?"</li>
                    <li>"Crie um plano de marketing para o novo produto X."</li>
                    <li>"Compare a performance das campanhas A e B."</li>
                    <li>"Gere um relatório de satisfação do cliente."</li>
                </ul>
            </div>

            <div id="feedback" class="tab-content">
                <div class="feedback-list">
                    <div class="feedback-item">
                        <p class="feedback-author"><strong>Carlos Silva</strong></p>
                        <p>Muito útil! Me ajudou a otimizar meu tempo.</p>
                    </div>
                    <div class="feedback-item">
                        <p class="feedback-author"><strong>Maria Oliveira</strong></p>
                        <p>Ferramenta fantástica para análise de dados.</p>
                    </div>
                </div>
                <form class="feedback-form">
                    <h3>Deixe seu feedback:</h3>
                    <textarea placeholder="Escreva seu comentário..." required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>

    </div>


<script src="agente-detalhe2.js"></script>
</body>
</html>