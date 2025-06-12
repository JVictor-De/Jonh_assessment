document.addEventListener('DOMContentLoaded', function() {
    // Configurações globais do Chart.js
    Chart.defaults.color = '#aaaaaa';
    Chart.defaults.font.family = "'Segoe UI', 'Roboto', sans-serif";
    Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';
    Chart.defaults.elements.point.radius = 3;
    Chart.defaults.elements.line.tension = 0.4;
    Chart.defaults.elements.line.borderWidth = 2;

    // Referências aos elementos HTML
    const tabs = document.querySelectorAll('.tab');
    const cards = document.querySelectorAll('.card');
    const lastUpdateEl = document.getElementById('last-update');
    const currentCambioEl = document.getElementById('current-cambio');
    const cambioChangeEl = document.getElementById('cambio-change');
    const currentIPCAEl = document.getElementById('current-ipca');
    const currentSelicEl = document.getElementById('current-selic');
    const summaryIPCAEl = document.getElementById('summary-ipca');

    // Instâncias dos gráficos
    let cambioChart, ipcaChart, selicChart, expensesChart;

    // Estado do aplicativo
    let state = {
        cambioData: null,
        ipcaData: null,
        selicData: null,
        activeTab: 'cambio'
    };

    // Atualizar data de última atualização
    function updateLastUpdate() {
        const now = new Date();
        lastUpdateEl.textContent = now.toLocaleDateString('pt-BR');
    }

    // Função para alternar entre abas
    function setupTabs() {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover classe ativa de todas as abas
                tabs.forEach(t => t.classList.remove('active'));
                
                // Adicionar classe ativa à aba clicada
                tab.classList.add('active');
                
                // Atualizar estado
                state.activeTab = tab.dataset.tab;
                
                // Mostrar o card correto
                showActiveCard();
            });
        });
    }

    // Mostrar o card ativo baseado na aba selecionada
    function showActiveCard() {
        cards.forEach(card => {
            if (card.id === `${state.activeTab}-card`) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Inicializar o gráfico de câmbio
    function initCambioChart(data) {
        const ctx = document.getElementById('cambio-chart').getContext('2d');
        
        const dates = data.map(item => {
            const [day, month] = item.data.split('/');
            return `${day}/${month}`;
        });
        
        const values = data.map(item => parseFloat(item.valor));
        
        // Calcular variação percentual
        const lastValue = values[values.length - 1];
        const previousValue = values[values.length - 2];
        const percentChange = ((lastValue - previousValue) / previousValue * 100).toFixed(2);
        
        // Atualizar elementos de interface
        currentCambioEl.textContent = lastValue.toFixed(2);
        cambioChangeEl.textContent = `${percentChange}% nas últimas 24h`;
        cambioChangeEl.classList.toggle('negative', percentChange < 0);
        
        // Criar gráfico
        cambioChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'USD/BRL',
                    data: values,
                    borderColor: '#ff7a39',
                    backgroundColor: 'rgba(255, 122, 57, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // Inicializar o gráfico do IPCA
    function initIPCAChart(data) {
        const ctx = document.getElementById('ipca-chart').getContext('2d');
        
        // Filtrar para obter apenas os últimos 6 meses
        const lastSixMonths = data.slice(-6);
        
        const dates = lastSixMonths.map(item => {
            const [day, month] = item.data.split('/');
            return `${month}`;
        });
        
        const values = lastSixMonths.map(item => parseFloat(item.valor));
        const colors = values.map(value => value > 5.0 ? '#ff7a39' : '#6fff57');
        
        // Atualizar elementos de interface
        const currentIPCA = values[values.length - 1];
        currentIPCAEl.textContent = currentIPCA.toFixed(2);
        summaryIPCAEl.textContent = currentIPCA.toFixed(2);
        
        // Criar gráfico
        ipcaChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'IPCA (%)',
                    data: values,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Inicializar o gráfico da Selic
    function initSelicChart(data) {
        const ctx = document.getElementById('selic-chart').getContext('2d');
        
        const dates = data.map(item => {
            const [day, month] = item.data.split('/');
            return `${day}/${month}`;
        });
        
        const values = data.map(item => parseFloat(item.valor));
        
        // Atualizar elementos de interface
        currentSelicEl.textContent = values[values.length - 1].toFixed(2);
        
        // Criar gráfico
        selicChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Taxa Selic (%)',
                    data: values,
                    borderColor: '#3987ff',
                    backgroundColor: 'rgba(57, 135, 255, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // Inicializar o gráfico de resumo (donut)
    function initExpensesChart() {
        const ctx = document.getElementById('expenses-chart').getContext('2d');
        // Destroi gráfico anterior se existir
        if (expensesChart) {
            expensesChart.destroy();
        }
        // Garante que os valores são válidos
        const cambio = parseFloat(currentCambioEl.textContent.replace(',', '.'));
        const ipca = parseFloat(currentIPCAEl.textContent.replace(',', '.'));
        const selic = parseFloat(currentSelicEl.textContent.replace(',', '.'));
        if (isNaN(cambio) || isNaN(ipca) || isNaN(selic)) {
            // Não cria o gráfico se algum valor não estiver pronto
            return;
        }
        expensesChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Câmbio', 'IPCA', 'Selic'],
                datasets: [{
                    data: [cambio, ipca, selic],
                    backgroundColor: [
                        '#ff7a39',  // laranja
                        '#6fff57',  // verde
                        '#3987ff',  // azul
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Atualizar tabela de resumo
    function updateResumoTable() {
        const tableCambio = document.getElementById('table-cambio');
        const tableIpca = document.getElementById('table-ipca');
        const tableSelic = document.getElementById('table-selic');
        if (tableCambio) tableCambio.textContent = currentCambioEl.textContent;
        if (tableIpca) tableIpca.textContent = currentIPCAEl.textContent;
        if (tableSelic) tableSelic.textContent = currentSelicEl.textContent;
    }

    // Buscar e processar dados
    async function fetchData() {
        try {
            // Buscar dados da API do BCB
            const [cambioData, ipcaData, selicData] = await Promise.all([
                window.bcbAPI.getCambio(6),
                window.bcbAPI.getIPCA(12),
                window.bcbAPI.getSelic(12)
            ]);
            
            // Atualizar estado
            state.cambioData = cambioData;
            state.ipcaData = ipcaData;
            state.selicData = selicData;
            
            // Inicializar gráficos
            initCambioChart(cambioData);
            initIPCAChart(ipcaData);
            initSelicChart(selicData);
            // Após garantir que os valores DOM estão atualizados, aguarde o próximo tick do event loop
            setTimeout(() => {
                initExpensesChart();
                updateResumoTable();
            }, 0);
            // Atualizar data
            updateLastUpdate();
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Houve um erro ao buscar os dados econômicos. Por favor, tente novamente mais tarde.');
        }
    }

    // Inicialização
    function init() {
        setupTabs();
        showActiveCard();
        fetchData();
    }

    // Iniciar o aplicativo
    init();
});
