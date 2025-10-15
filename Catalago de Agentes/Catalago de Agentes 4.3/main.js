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

    // --- Carregamento de Dados (MODIFICADO) --- //
    async function loadData() {
        try {
            // 1. Busca o arquivo JSON na rede
            const response = await fetch('catalog_agentes.json');

            // 2. Verifica se a requisição foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.statusText}`);
            }

            // 3. Converte a resposta para um objeto JavaScript
            allAgents = await response.json();

            // 4. Continua a execução normal após carregar os dados
            populateFilters(allAgents);
            renderAgents(allAgents);

        } catch (error) {
            console.error('Erro ao carregar dados dos agentes:', error);
            catalogContainer.innerHTML = '<p style="padding: 2rem; text-align: center; color: #ffcccc;">Não foi possível carregar os agentes. Verifique o console para mais detalhes.</p>';
        }
    }

    // --- Popular Filtros --- //
    function populateFilters(agents) {
        if (!agents) return;
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
        if (!agents || agents.length === 0) {
            catalogContainer.innerHTML = '<p style="padding: 2rem; text-align: center;">Nenhum agente encontrado.</p>';
            return;
        }

        agents.forEach((agent, index) => {
            const card = document.createElement('div');
            card.className = 'agent-card';
            card.style.animationDelay = `${index * 50}ms`;
            const statusClass = agent.status ? `tag-status-${agent.status.toLowerCase().replace(/\s+/g, '')}` : '';
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

    // Inicia o carregamento dos dados
    loadData();

    

});
