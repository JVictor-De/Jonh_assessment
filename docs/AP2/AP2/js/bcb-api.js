/**
 * Módulo de integração com a API do Banco Central do Brasil
 */

// URLs das APIs do Banco Central do Brasil
const BCB_BASE_URL = 'https://api.bcb.gov.br/dados/serie';
const SERIES = {
    CAMBIO: {
        url: 'bcdata.sgs.1',
        nome: 'Taxa de câmbio - Livre - Dólar americano (compra) - Diário'
    },
    IPCA: {
        url: 'bcdata.sgs.433',
        nome: 'Índice nacional de preços ao consumidor-amplo (IPCA)'
    },
    SELIC: {
        url: 'bcdata.sgs.11',
        nome: 'Taxa de juros - Meta Selic definida pelo Copom'
    }
};

/**
 * Formata uma data para o padrão DD/MM/YYYY
 * @param {Date} date 
 * @returns {string}
 */
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Obtém a data de N meses atrás
 * @param {number} months 
 * @returns {string}
 */
function getDateMonthsAgo(months) {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return formatDate(date);
}

/**
 * Busca os dados de uma série temporal do BCB
 * @param {string} seriesCode - Código da série
 * @param {number} months - Quantidade de meses para buscar
 * @returns {Promise<Array>}
 */
async function fetchBCBSeries(seriesCode, months = 6) {
    const hoje = formatDate(new Date());
    const dataInicio = getDateMonthsAgo(months);
    
    try {
        const url = `${BCB_BASE_URL}/${seriesCode}/dados?formato=json&dataInicial=${dataInicio}&dataFinal=${hoje}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erro ao buscar série ${seriesCode}:`, error);
        throw error;
    }
}

/**
 * Obtém os dados da taxa de câmbio USD/BRL
 * @param {number} months - Quantidade de meses para buscar
 * @returns {Promise<Array>}
 */
async function getCambio(months = 6) {
    return await fetchBCBSeries(SERIES.CAMBIO.url, months);
}

/**
 * Obtém os dados do IPCA
 * @param {number} months - Quantidade de meses para buscar
 * @returns {Promise<Array>}
 */
async function getIPCA(months = 12) {
    return await fetchBCBSeries(SERIES.IPCA.url, months);
}

/**
 * Obtém os dados da Taxa Selic
 * @param {number} months - Quantidade de meses para buscar
 * @returns {Promise<Array>}
 */
async function getSelic(months = 12) {
    return await fetchBCBSeries(SERIES.SELIC.url, months);
}

// Exporta as funções para uso no arquivo app.js
window.bcbAPI = {
    getCambio,
    getIPCA,
    getSelic,
    formatDate
};
