1. Como acessar os valores dos inputs do formulário?  
Use a propriedade .value de cada elemento, por exemplo: nameInput.value.


2. Atualizar o conteúdo de uma página web com o conteúdo dos campos (escrever na página sem clicar no botão)?  
Utilize o evento input para capturar mudanças em tempo real e atualizar qualquer parte da página, exemplo:
nameInput.addEventListener('input', () => {
    document.getElementById('algumElemento').textContent = nameInput.value;
});


3. Validar cada entrada do formulário antes de enviar o form?  
Crie funções de validação para cada campo (nome obrigatório, email válido, mensagem obrigatória) e chame essas funções antes do envio. Exemplo:
function validateName() { return nameInput.value.trim() !== ''; }
function validateEmail() { return /\S+@\S+\.\S+/.test(emailInput.value); }
function validateMessage() { return messageInput.value.trim() !== ''; }


4. Redefinir as entradas do formulário após enviar o formulário?  
Use form.reset() e limpe feedbacks visuais e pré-visualização de imagem.


5. Desativar o botão enviar até que todas as entradas do formulário sejam preenchidas?  
Verifique a validade dos campos em tempo real e só habilite o botão se todos estiverem válidos:
submitBtn.disabled = !(validateName() && validateEmail() && validateMessage());


6. Mostrar um botão giratório (spinner) de carregamento enquanto o formulário está sendo enviado?  
Exiba um elemento spinner (display: block) durante o envio e oculte após finalizar.


7. Exibir uma mensagem de sucesso após o envio do formulário e depois redirecionar para outra página?  
Mostre a mensagem no DOM e use setTimeout para redirecionar:
resultDiv.textContent = Mensagem enviada!;
setTimeout(() => { window.location.href = outra_pagina.html; }, 2000);


8. Adicionar Validação de Tamanho da Mensagem  
Garanta que a mensagem tenha pelo menos 100 caracteres:
if (messageInput.value.trim().length < 100) { /* mostrar erro */ }


9. Adicionar Feedback Visual para Campos Inválidos  
Adicione/remova classes CSS (invalid/valid) para destacar campos com erro (bordas vermelhas).


10. Adicionar um Campo de Telefone com Máscara [(país) (ddd) xxxxx-xxxx]  
Implemente uma máscara usando o evento input para formatar o valor enquanto digita.


11. Adicionar um Campo de Seleção de Assunto [Elogio, Reclamação e Sugestão]  
Use um <select> e valide se algum valor foi selecionado diferente de vazio.


12. Adicionar um Campo de Arquivo ao Formulário para permitir o upload de imagens  
Inclua <input type="file" accept="image/*"> e use FileReader para mostrar a pré-visualização da imagem selecionada.  
Limpe a pré-visualização ao enviar ou redefinir o formulário.