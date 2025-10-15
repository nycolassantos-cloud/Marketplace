<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <title>Marketplace de Agentes</title>
    <style>
        /* CSS Reset & Variáveis */
        :root {
            --primary-bg-start: #003812;
            --primary-bg-end: #004c1a;
            --secondary-bg: #004415;
            --card-bg: #ffffff;
            --text-light: #f0f2f5;
            --text-dark: #1a202c;
            --text-secondary: #5a6474;
            --accent-color: #00e64d;
            --border-color: #027a2b;
            --button-primary-bg: #0d6efd; /* Cor do botão alterada para azul */
            --button-primary-hover-bg: #0b5ed7; /* Cor do botão alterada para azul mais escuro */
            --tag-beta-bg: #e6f7ff;
            --tag-beta-text: #096dd9;
            --tag-prod-bg: #f6ffed;
            --tag-prod-text: #389e0d;
            --tag-tech-bg: #e6e8eb;
            --tag-tech-text: #434d5b;
            --tag-rating-bg: #fffbe6;
            --tag-rating-text: #d48806;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            position: relative; /* Necessário para o pseudo-elemento */
            font-family: 'Roboto', sans-serif;
            color: var(--text-light);
            -webkit-font-smoothing: antialiased;
            min-height: 100vh;
            background-color: var(--primary-bg-start);
        }

        /* Pseudo-elemento para a imagem de fundo com opacidade */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('img/fundo_verde.png');
            background-color: var(--primary-bg-start);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.3;
            z-index: -1; /* Coloca a imagem atrás de todo o conteúdo */
        }


        /* Container Principal */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Cabeçalho */
        .header {
            padding: 1.5rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            background: url(img/logo.png);
            background-size: contain;
            background-repeat: no-repeat;
            width: 120px;
            height: 40px;
        }

        .user-nav {
            position: relative;
            display: flex;
            align-items: center;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #fff;
            background-size: cover;
            border: 2px solid var(--accent-color);
        }

        .user-name {
            font-weight: 500;
        }

        .actions-menu {
            display: none;
            position: absolute;
            top: 120%;
            right: 0;
            background-color: #1a202c;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10;
            width: 200px;
            overflow: hidden;
        }

        .actions-menu.active {
            display: block;
        }

        .actions-menu a {
            display: block;
            padding: 0.75rem 1rem;
            color: var(--text-light);
            text-decoration: none;
            transition: background-color 0.2s ease;
        }

        .actions-menu a:hover {
            background-color: #2d3748;
        }

        /* Seção de Busca */
        .search-hero-section {
            text-align: center;
            padding: 2.5rem 1rem;
        }

        .search-hero-section h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .search-hero-section p {
            font-size: 1.25rem;
            color: #f0f2f5;
            margin-bottom: 2rem;
        }
        
        .search-wrapper {
            max-width: 700px;
            margin: 0 auto;
            position: relative;
        }
        
        #search-input {
            width: 100%;
            height: 60px;
            border-radius: 30px;
            border: 2px solid var(--border-color);
            background-color: rgba(0, 68, 21, 0.8);
            color: var(--text-light);
            font-size: 1.1rem;
            padding: 0 2rem 0 3.5rem;
            transition: all 0.3s ease;
        }
        
        #search-input::placeholder { color: #ccc; }
        #search-input:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 15px rgba(0, 230, 77, 0.3);
        }

        .search-icon {
            position: absolute;
            top: 50%;
            left: 1.25rem;
            transform: translateY(-50%);
            color: #ccc;
        }

        /* Seção de Filtros */
        .filter-section {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.5rem;
            margin: -1rem 0 3rem;
        }
        
        .select-wrapper {
            position: relative;
            min-width: 220px;
        }

        .select-filter {
            width: 100%;
            height: 45px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background-color: rgba(0, 68, 21, 0.8);
            color: var(--text-light);
            font-size: 1rem;
            padding: 0 1rem;
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;
        }
        
        .select-wrapper::after {
            content: '▼';
            font-size: 0.8rem;
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
        }

        /* Catálogo de Agentes */
        #agent-catalog {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
            padding-bottom: 12rem; /* Espaço inferior aumentado para o chat */
        }

        .agent-card {
            background-color: var(--card-bg);
            color: var(--text-dark);
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.5s forwards;
        }

        .agent-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .card-header {
            display: flex;
            align-items: center;
            padding: 1.5rem;
            gap: 1rem;
        }

        .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background-color: #f0f2f5;
            background-size: cover;
            background-position: center;
            flex-shrink: 0;
        }

        .card-title-group h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0;
            line-height: 1.2;
        }

        .card-title-group p {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin: 0.25rem 0 0;
        }

        .card-body {
            padding: 0 1.5rem 1.5rem;
            flex-grow: 1;
        }

        .card-description {
            font-size: 1rem;
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: 1rem;
        }

        .card-responsible {
            font-size: 0.9rem;
            color: var(--text-dark);
            margin-bottom: 1rem;
        }

        .card-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .tag {
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
        }

        .tag-status-produção { background-color: var(--tag-prod-bg); color: var(--tag-prod-text); }
        .tag-status-beta { background-color: var(--tag-beta-bg); color: var(--tag-beta-text); }
        .tag-tech { background-color: var(--tag-tech-bg); color: var(--tag-tech-text); }
        .tag-rating { background-color: var(--tag-rating-bg); color: var(--tag-rating-text); }

        .card-footer {
            border-top: 1px solid #e8e8e8;
            padding: 1rem 1.5rem;
            background-color: #fafafa;
        }

        .details-button {
            display: block;
            width: 100%;
            text-align: center;
            text-decoration: none;
            padding: 0.75rem;
            border-radius: 8px;
            color: #fff;
            background-color: var(--tag-tech-text);
            font-weight: 500;
            transition: background-color 0.3s ease;
        }

        .details-button:hover {
            background-color: var(--button-primary-hover-bg);
        }

        /* Animações e Responsividade */
        @keyframes fadeIn {
            to { opacity: 1; transform: translateY(0); }
        }

        /* Chat Widget Placeholder */
        #chat-widget-placeholder {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background-color: #0d6efd; 
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: transform 0.3s ease, background-color 0.3s ease;
            z-index: 1000;
        }

        #chat-widget-placeholder:hover {
            background-color: #0b5ed7;
            transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
            .container { padding: 0 1rem; }
            .search-hero-section h1 { font-size: 2.25rem; }
            .filter-section { flex-direction: column; }
        }

    </style>
</head>
<body>
    <main class="container">
        <header class="header">
            <div class="logo"></div>
            <nav class="user-nav">
                <div class="user-profile" id="user-menu-toggle">
                    <span class="user-name">Daniel L.</span>
                    <div class="user-avatar" style="background-image: url('https://placehold.co/40x40/FFF/004415?text=DL')"></div>
                </div>
                <div class="actions-menu" id="actions-menu">
                    <a href="#">Solicitação de Acessos</a>
                    <a href="#">Incluir Agente</a>
                </div>
            </nav>
        </header>

        <section class="search-hero-section">
            <h1>Marketplace de Agentes</h1>
            <p>Encontre os melhores agentes para otimizar seus processos.</p>
            <div class="search-wrapper">
                 <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input type="text" id="search-input" placeholder="Buscar por nome, categoria ou funcionalidade...">
            </div>
        </section>

        <section class="filter-section">
            <div class="select-wrapper">
                <select id="filter-categoria" class="select-filter">
                    <option value="">Todas as Categorias</option>
                </select>
            </div>
            <div class="select-wrapper">
                <select id="filter-tecno" class="select-filter">
                    <option value="">Todas as Plataformas</option>
                </select>
            </div>
            <div class="select-wrapper">
                <select id="filter-status" class="select-filter">
                    <option value="">Todas as Maturidades</option>
                </select>
            </div>
        </section>

        <section id="agent-catalog">
            <!-- Os cards dos agentes serão inseridos aqui pelo JavaScript -->
        </section>
    </main>

    <!-- Placeholder para Chat Widget -->
    <div id="chat-widget-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </div>

<script type="application/json" id="agent-data">
[
    {
        "id":1,
        "nome":"Agente de Análise Sobrestadia (Demurrage)",
        "funcionalidade":"Agente de Análise e  cálculos diversos envolvidos no processo de Sobrestadia (Demurrage)",
        "descricao":"Agente de Análise e  cálculos diversos envolvidos no processo de Sobrestadia (Demurrage)",
        "solicitante":"Luzimary Ferreira ",
        "categoria":"Operações",
        "responsavel":"Giovanni Lopes Pereira",
        "tecnologia":"TBD",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Agente de Análise Sobrestadia"
    },
    {
        "id":2,
        "nome":"Agente de S&OP",
        "funcionalidade":"Agente de consulta aos dados de S&OP",
        "descricao":"Agente de IA dedicado à responder perguntas de negócio sobre indicadores e insights do processo de S&OP em linguagem natural, com base em KPIs definidos.",
        "solicitante":"Daniel Drummond",
        "categoria":"Operações",
        "responsavel":"Viviane Antonia Correa Thomé",
        "tecnologia":"Luria",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Agente de S&OP"
    },
    {
        "id":3,
        "nome":"Agente do Varejo",
        "funcionalidade":"Agente Estratégia Varejo",
        "descricao":"Agente Estratégia Varejo - Suporte à reunião semanal e análise",
        "solicitante":"Renato Correa",
        "categoria":"Comercial Varejo",
        "responsavel":"Rafael Ribeiro Tonassi",
        "tecnologia":"Microsoft",
        "concluido_em":1755216000000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Agente do Varejo"
    },
    {
        "id":4,
        "nome":"Agente Manual e Política de Compras",
        "funcionalidade":"Agente Manual e Politica de Compras",
        "descricao":"Agente teste para validação de sub agentes especialista no Simplifica EV",
        "solicitante":"Ednelson de Jesus dos Santos",
        "categoria":"Produtos e Experiência do Cliente",
        "responsavel":"Matheus Fernandes Pinto",
        "tecnologia":"Microsoft",
        "concluido_em":1757894400000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Agente Manual e Política de Compras"
    },
    {
        "id":5,
        "nome":"Análise do Alinhamento dos Projetos de TI com a Estratégia VIBRA",
        "funcionalidade":"Agente especialista em gestão de projetos de TI.",
        "descricao":"Agente especialista em gestão de projetos. Com base na Planilha do CAPEX 2025 o agente avalia o nível de aderência dos Projetos de TI com a Estratégia VIBRA.",
        "solicitante":"Raphael Rocha",
        "categoria":"Gente,TI e ESG",
        "responsavel":"Luis Fernando Botafogo",
        "tecnologia":"Microsoft",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Análise do Alinhamento dos Projetos"
    },
    {
        "id":6,
        "nome":"Análise e Classificação de lançamentos do Orçamento para benchmarking",
        "funcionalidade":"Agente de apoio à gestão e priorização orçamentária de projetos de TI",
        "descricao":"Agente de análise (segmentação: CAPEX\/OPEX, Categoria de Negócio, etc) para geração de informações para a tomada de decisão da Gestão e Priorização Orçamentária de Projetos de TI.",
        "solicitante":"Raphael Rocha",
        "categoria":"Gente,TI e ESG",
        "responsavel":"Luis Fernando Botafogo",
        "tecnologia":"Microsoft",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Análise e Classificação do Orçamento"
    },
    {
        "id":7,
        "nome":"Assistente Jurídico de Contratos",
        "funcionalidade":"Agente de consulta jurídicas",
        "descricao":"Agente dedicado à agilizar e otimizar o processo de resposta às consultas jurídicas fornecendo respostas rápidas e precisas. Isso permitirá que os advogados dediquem mais tempo às questões complexas e estratégicas​.",
        "solicitante":"Izabel Gomez Garcia",
        "categoria":"Jurídico e RI",
        "responsavel":"Samuel Ridan",
        "tecnologia":"TBD",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Assistente Jurídico de Contratos"
    },
    {
        "id":8,
        "nome":"GAIA - Plataforma de orquestração de Agentes",
        "funcionalidade":"Plataforma para criação de agentes de forma intuitiva. ",
        "descricao":"Plataforma para criação de agentes de forma intuitiva. ",
        "solicitante":"Isabella Perrut",
        "categoria":"Gente,TI e ESG",
        "responsavel":"Rafael Ribeiro Tonassi",
        "tecnologia":"TBD",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"GAIA - Plataforma de Orquestração"
    },
    {
        "id":9,
        "nome":"BR@x - Classficação GAC",
        "funcionalidade":"Agente automatizado com foco na extração e padronização de dados ambientais",
        "descricao":"Agente automatizado com foco na extração e padronização de dados ambientais provenientes de relatórios enviados por clientes.",
        "solicitante":"Bianca Spada Ribeiro",
        "categoria":"Operações",
        "responsavel":"Rafael Ribeiro Tonassi",
        "tecnologia":"Azure",
        "concluido_em":1746748800000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"BR@x - Classficação GAC"
    },
    {
        "id":10,
        "nome":"BR@x -Análise de Editais",
        "funcionalidade":"Agente automatizado para a leitura inteligente de editais públicos",
        "descricao":"Agente automatizado para a leitura inteligente de editais públicos recebidos por e-mail. Download de editais no portal Conlicitação, com encaminhamento automático para o robô que realiza a análise utilizando IA.",
        "solicitante":"Ricardo Muniz Batista Soares",
        "categoria":"Comercial B2B",
        "responsavel":"Rafael Ribeiro Tonassi",
        "tecnologia":"Azure",
        "concluido_em":1667520000000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"BR@x - Análise de Editais"
    },
    {
        "id":11,
        "nome":"Classificação Cases M365 Copilot",
        "funcionalidade":"Agente para a classificação dos cases do Copilot",
        "descricao":"Agente para a classificação dos cases da frente do copilot 365 na Academia de IA, com a Beyond. ",
        "solicitante":"Sonia Bezerra Barbosa",
        "categoria":"Gente,TI e ESG",
        "responsavel":"Arthur Garofalo Zanon",
        "tecnologia":"GCP",
        "concluido_em":1752537600000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Classificação Cases M365 Copilot"
    },
    {
        "id":12,
        "nome":"ClientIA",
        "funcionalidade":"Agente de suporte ao Executivo de Vendas",
        "descricao":"Informações do cliente na palma da mão do Executivo de Vendas",
        "solicitante":"Anik Araujo Auip",
        "categoria":"Comercial B2B",
        "responsavel":"Felipe Doceck",
        "tecnologia":"Neoway",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"ClientIA"
    },
    {
        "id":13,
        "nome":"Contratos B2B",
        "funcionalidade":"Solução de IA Generativa para otimizar a gestão de contratos B2B com fórmulas paramétricas. ",
        "descricao":"Solução de IA Generativa para otimizar a gestão de contratos B2B com fórmulas paramétricas. O sistema auxilia a equipe de PCOM na leitura automática de contratos, identificação de fórmulas paramétricas e cálculo de reajustes de preços baseados em índices como IPCA, IGP-M e IGP-DI, entre outros. O objetivo é agilizar o processo de recálculo tempestivo de preços, reduzindo erros e aumentando a eficiência na análise contratual.",
        "solicitante":"Rodolfo Frederico Marques da Silva",
        "categoria":"Comercial B2B",
        "responsavel":"Viviane Antonia Correa Thomé",
        "tecnologia":"Aws",
        "concluido_em":1761868800000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Contratos B2B"
    },
    {
        "id":14,
        "nome":"CRM analyst",
        "funcionalidade":"Analista de CRM. Executa todo workflow de criação de réguas e criativos",
        "descricao":"O agente CRM Analist cria novas campanhas, analisa dados, segmenta público alvo e monta os criativos necessários.",
        "solicitante":"Mariana Alonso",
        "categoria":"Produtos e Experiência do Cliente",
        "responsavel":"Daniel Nascimento Arruda de Oliveira",
        "tecnologia":"GCP",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"CRM analyst"
    },
    {
        "id":15,
        "nome":"Engenharia Tributaria",
        "funcionalidade":"Geração de arquivos TXT para envio e geração de saving",
        "descricao":"Agente que auxilia na geração de um ZIP com arquivos TXT para geração de saving em creditos de carbono",
        "solicitante":"Jesse James Gomes da Silva Junior",
        "categoria":"Gente,TI e ESG",
        "responsavel":"Matheus Fernandes Pinto",
        "tecnologia":"GCP",
        "concluido_em":1759104000000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Engenharia Tributaria"
    },
    {
        "id":16,
        "nome":"Lu",
        "funcionalidade":"Informações internas de notícias, benefícios e sistemas",
        "descricao":"Alimentada por tecnologia avançada de inteligência artificial generativa como chatGPT e Gemini, a Lu oferece acesso instantâneo a tudo o que você precisa saber sobre: Notícias internas, Orientações sobre benefícios, Ciclo de Reconhecimento, Sistemas e serviços internos, Dúvidas sobre o Premmia. Com a Lu, você terá mais tempo e eficiência no trabalho.",
        "solicitante":"Renato Correa",
        "categoria":"Toda a Vibra",
        "responsavel":"Daniel Nascimento Arruda de Oliveira",
        "tecnologia":"GCP",
        "concluido_em":1753833600000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":"img_lu1.png",
        "captura2":"img_lu2.png",
        "captura3":"img_lu3.png",
        "captura4":"img_lu4.png",
        "url_agente":"https://teams.microsoft.com/l/app/a71e712b-2f0b-453c-9cb8-65a57db40df1?source=app-header-share-entrypoint",
        "icone":"Lu.png",
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":"Público",
        "alias":"Lu"
    },
    {
        "id":17,
        "nome":"Lubito",
        "funcionalidade":"Agente de recomendação de produtos por similaridade",
        "descricao":"Recomendações inteligentes de produtos (Lubrificantes) para clientes  por pesquisa de similaridade.",
        "solicitante":"Luiz Felipe Depes Vital Brasil",
        "categoria":"Comercial B2B",
        "responsavel":"Nycolas Wenderson da Silva dos Santos ",
        "tecnologia":"Microsoft",
        "concluido_em":1753228800000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":"img_lub1.png",
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":"https://teams.microsoft.com/l/chat/19:285d3539-374a-47ce-aed4-d96f638ea430_7e6df30b-2dea-4e93-81b5-2a432feb01ae@unq.gbl.spaces/conversations?context=%7B%22contextType%22%3A%22chat%22%7D",
        "icone":"lubito.png",
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Lubito"
    },
    {
        "id":18,
        "nome":"MAX",
        "funcionalidade":"Agente de suporte e informações importantes para ajudar no seu dia a dia.",
        "descricao":"Conheça o Max, nosso colega de trabalho da Vibra Energia. Ele está pronto para oferecer suporte e informações importantes para ajudar no seu dia a dia.",
        "solicitante":"Raquel da Costa Garcia Fontes",
        "categoria":"Toda a Vibra",
        "responsavel":"Raquel da Costa Garcia Fontes",
        "tecnologia":"Sophia",
        "concluido_em":1617235200000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":"https://teams.microsoft.com/l/app/c75e045e-d34f-4b04-8e73-d13af7acda94?source=app-profile-card&threadId=19%3A285d3539-374a-47ce-aed4-d96f638ea430_6448a469-6694-4efc-b3e1-df8081c2501a%40unq.gbl.spaces",
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":"Público",
        "alias":"MAX"
    },
    {
        "id":19,
        "nome":"Previsão de Mercado RMKey",
        "funcionalidade":"Assistente de IA especialista em Revenue Assurance e Análise de Negócios.​",
        "descricao":"Assistente de IA especialista em Revenue Assurance (Garantia de Receita) e análise de Negócios.",
        "solicitante":"Anik Araujo Auip",
        "categoria":"Comercial B2B",
        "responsavel":"Samuel Ridan",
        "tecnologia":"TBD",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Previsão de Mercado RMKey"
    },
    {
        "id":20,
        "nome":"Procedimentos das bases",
        "funcionalidade":"Agente de centralização e disponibilização de informações",
        "descricao":"Agente que auxilia na centralização e disponibilização de informações sobre processos técnicos e operacionais da base",
        "solicitante":"Fabrício Pinheiro Souza",
        "categoria":"Operações",
        "responsavel":"Fabrício Pinheiro Souza",
        "tecnologia":"Microsoft",
        "concluido_em":null,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Procedimentos das bases"
    },
    {
        "id":21,
        "nome":"Questões de Segurança da VIBRA",
        "funcionalidade":"Agente especialista em questões relacionadas a Segurança da Informação",
        "descricao":"O agente especialista em questões relacionadas a Segurança da Informação serve como um help\/FAQ para as questões de SegInf.",
        "solicitante":"Raphael Rocha",
        "categoria":"Gente,TI e ESG",
        "responsavel":"Luis Fernando Botafogo",
        "tecnologia":"Microsoft",
        "concluido_em":null,
        "status":"Beta",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"Questões de Segurança da VIBRA"
    },
    {
        "id":22,
        "nome":"RI",
        "funcionalidade":"Agente Relações com Investidadores",
        "descricao":"Agente para resposta aos investidores",
        "solicitante":"Eduardo Honzak de Siqueira",
        "categoria":"Finanças, Estratégia e RI",
        "responsavel":"Rafael Ribeiro Tonassi",
        "tecnologia":"Microsoft",
        "concluido_em":1748304000000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":null,
        "captura2":null,
        "captura3":null,
        "captura4":null,
        "url_agente":null,
        "icone":null,
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":null,
        "alias":"RI"
    },
    {
        "id":23,
        "nome":"Simplifica EV",
        "funcionalidade":"Agente virtual para consultoria de processos comerciais, focado no apoio ao EV.",
        "descricao":"Especializado em orientar e informar o Executivo de Venda (EV) sobre as melhores ações relacionadas com o processo de abertura de protocolos.",
        "solicitante":"Lidia de Almeida Miranda",
        "categoria":"Produtos e Experiência do Cliente",
        "responsavel":"Matheus Fernandes Pinto",
        "tecnologia":"GCP",
        "concluido_em":1753315200000,
        "status":"Produção",
        "avaliacao":"5.0",
        "comentarios":null,
        "captura1":"img_SimpEV1.png",
        "captura2":"img_SimpEV2.png",
        "captura3":"img_SimpEV3.png",
        "captura4":"img_SimpEV4.png",
        "url_agente":"https://teams.microsoft.com/l/app/698efa20-6357-4317-bdf6-90ed8b78a508?source=app-header-share-entrypoint",
        "icone":"Simplifica EV.png",
        "agente-de-instrucoes":"Não",
        "url_link_explicacao":null,
        "desenvolvido_por":"Vibra",
        "confidencialidade":"Restrito",
        "alias":"Simplifica EV"
    }
]
</script>

<script>
document.addEventListener('DOMContentLoaded', () => {
    let allAgents = []; 
    const catalogContainer = document.getElementById('agent-catalog');
    const searchInput = document.getElementById('search-input');
    const categoriaFilter = document.getElementById('filter-categoria');
    const tecnoFilter = document.getElementById('filter-tecno');
    const statusFilter = document.getElementById('filter-status');
    const userMenuToggle = document.getElementById('user-menu-toggle');
    const actionsMenu = document.getElementById('actions-menu');

    // --- Menu do Usuário --- //
    userMenuToggle.addEventListener('click', () => {
        actionsMenu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!userMenuToggle.contains(e.target) && !actionsMenu.contains(e.target)) {
            actionsMenu.classList.remove('active');
        }
    });

    // --- Carregamento de Dados --- //
    function loadData() {
        try {
            const dataElement = document.getElementById('agent-data');
            const jsonData = dataElement.textContent;
            allAgents = JSON.parse(jsonData);
            populateFilters(allAgents);
            renderAgents(allAgents);
        } catch (error) {
            console.error('Erro ao carregar dados dos agentes:', error);
            catalogContainer.innerHTML = '<p style="padding: 2rem;">Não foi possível carregar os agentes.</p>';
        }
    }

    // --- Popular Filtros --- //
    function populateFilters(agents) {
        const categorias = [...new Set(agents.map(agent => agent.categoria))].sort();
        const tecnologias = [...new Set(agents.map(agent => agent.tecnologia))].sort();
        const statuses = [...new Set(agents.map(agent => agent.status))].sort();

        categorias.forEach(cat => categoriaFilter.add(new Option(cat, cat)));
        tecnologias.forEach(tec => tecnoFilter.add(new Option(tec, tec)));
        statuses.forEach(stat => statusFilter.add(new Option(stat, stat)));
    }

    // --- Renderizar Lista de Agentes (agora como Cards) --- //
    function renderAgents(agents) {
        catalogContainer.innerHTML = '';
        if (agents.length === 0) {
            catalogContainer.innerHTML = '<p style="padding: 2rem; text-align: center;">Nenhum agente encontrado.</p>';
            return;
        }

        agents.forEach((agent, index) => {
            const card = document.createElement('div');
            card.className = 'agent-card';
            card.style.animationDelay = `${index * 50}ms`;

            const statusClass = agent.status ? `tag-status-${agent.status.toLowerCase().replace(' ', '')}` : '';
            const iconUrl = agent.icone ? `img/${agent.alias}/${agent.icone}` : 'img/err.png';

            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon" style="background-image: url('${iconUrl}')"></div>
                    <div class="card-title-group">
                        <h3>${agent.alias || 'Nome Indisponível'}</h3>
                        <p>${agent.desenvolvido_por || 'N/A'}</p>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-description">${agent.funcionalidade || 'Funcionalidade não descrita.'}</p>
                    <p class="card-responsible"><strong>Responsável:</strong> ${agent.responsavel || 'N/A'}</p>
                    <div class="card-tags">
                        <span class="tag tag-rating">${agent.avaliacao || 'N/A'} ★</span>
                        <span class="tag ${statusClass}">${agent.status || 'N/A'}</span>
                        <span class="tag tag-tech">${agent.tecnologia || 'N/A'}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="agente-detalhe.html?id=${agent.id}" class="details-button">Detalhes</a>
                </div>
            `;
            catalogContainer.appendChild(card);
        });
    }

    // --- Lógica de Filtro --- //
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategoria = categoriaFilter.value;
        const selectedTecno = tecnoFilter.value;
        const selectedStatus = statusFilter.value;

        const filteredAgents = allAgents.filter(agent => {
            const matchesSearch = searchTerm === '' ||
                (agent.nome && agent.nome.toLowerCase().includes(searchTerm)) ||
                (agent.alias && agent.alias.toLowerCase().includes(searchTerm)) ||
                (agent.funcionalidade && agent.funcionalidade.toLowerCase().includes(searchTerm));
            
            return matchesSearch &&
                   (selectedCategoria === '' || agent.categoria === selectedCategoria) &&
                   (selectedTecno === '' || agent.tecnologia === selectedTecno) &&
                   (selectedStatus === '' || agent.status === selectedStatus);
        });

        renderAgents(filteredAgents);
    }

    // --- Event Listeners --- //
    searchInput.addEventListener('input', applyFilters);
    [categoriaFilter, tecnoFilter, statusFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    loadData();
});
</script>
</body>
</html>

