// Lógica do formulário de perfil de investidor: calcula o perfil com base nas respostas e exibe o resultado

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let totalScore = 0;
    const totalQuestions = 12;
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            totalScore += parseInt(selectedOption.value);
        } else {
            alert('Por favor, responda a todas as perguntas para ver seu perfil.');
            return;
        }
    }
    const resultDiv = document.getElementById('result');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    if (totalScore <= 22) {
        resultTitle.textContent = "Seu Perfil: CONSERVADOR";
        resultDescription.innerHTML = "Você prioriza a <strong>segurança</strong> acima de tudo. Seu principal objetivo é preservar seu patrimônio, evitando qualquer tipo de perda. Você não se sente confortável com as oscilações do mercado.<br><br><strong>Investimentos sugeridos:</strong> Tesouro Selic, CDBs de grandes bancos com liquidez diária, Fundos DI e outros produtos de Renda Fixa com baixo risco.";
    } else if (totalScore <= 44) {
        resultTitle.textContent = "Seu Perfil: MODERADO";
        resultDescription.innerHTML = "Você busca um <strong>equilíbrio entre segurança e rentabilidade</strong>. Aceita correr alguns riscos controlados para ter a chance de obter retornos maiores que a inflação no médio e longo prazo. Você já entende que alguma volatilidade faz parte do jogo.<br><br><strong>Investimentos sugeridos:</strong> Uma carteira diversificada com Tesouro IPCA+, CDBs, Fundos Multimercado, Fundos Imobiliários (FIIs) e uma pequena parcela em Ações.";
    } else {
        resultTitle.textContent = "Seu Perfil: ARROJADO (ou Agressivo)";
        resultDescription.innerHTML = "Seu principal objetivo é <strong>maximizar o potencial de crescimento</strong> do seu capital. Você tem alta tolerância ao risco e compreende que perdas no curto prazo podem acontecer em busca de alta rentabilidade no longo prazo. Seu horizonte de investimento é longo e você tem conhecimento do mercado.<br><br><strong>Investimentos sugeridos:</strong> Carteira diversificada com foco em Renda Variável, como Ações, Fundos de Ações, BDRs, ETFs e uma parte em Criptomoedas, além de posições em Renda Fixa para equilíbrio.";
    }
    if (!document.getElementById('go-to-index-btn')) {
        const goToIndexBtn = document.createElement('button');
        goToIndexBtn.id = 'go-to-index-btn';
        goToIndexBtn.textContent = 'Ver Indicadores Econômicos';
        goToIndexBtn.onclick = function() {
            window.location.href = 'graph.html';
        };
        resultDiv.appendChild(goToIndexBtn);
    }
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
});