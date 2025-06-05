// Pegando os elementos do formulário
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectSelect = document.getElementById('subject');
const messageInput = document.getElementById('message');
const fileInput = document.getElementById('file');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');
const spinner = document.getElementById('spinner');
const imagePreview = document.getElementById('imagePreview');
const charCount = document.getElementById('charCount');

//1. Como acessar os valores dos inputs do formulário?
// Acesse a propriedade .value dos elementos, ex: nameInput.value

// Para acessar o valor de um campo, use .value (exemplo: nameInput.value)

// Atualiza o título da página conforme o nome é digitado
nameInput.addEventListener('input', () => {
    document.title = nameInput.value ? `Olá, ${nameInput.value}!` : 'Formulário de Contato';
});

// Validação simples dos campos
function validateName() {
    if (nameInput.value.trim() === '') {
        setInvalid(nameInput, 'Por favor, preencha o nome.');
        return false;
    }
    setValid(nameInput);
    return true;
}

// Valida o e-mail
function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        setInvalid(emailInput, 'Digite um e-mail válido.');
        return false;
    }
    setValid(emailInput);
    return true;
}

//valida o telefone
function validatePhone() {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
        setInvalid(phoneInput, 'Digite o telefone no formato (99) 99999-9999');
        return false;
    }
    setValid(phoneInput);
    return true;
}

//valida o assunto
function validateSubject() {
    if (!subjectSelect.value) {
        setInvalid(subjectSelect, 'Escolha um assunto.');
        return false;
    }
    setValid(subjectSelect);
    return true;
}

// valida a mensagem
function validateMessage() {
    const val = messageInput.value.trim();
    if (val.length > 1000) {
        setInvalid(messageInput, 'A mensagem precisa ter alguuma coisa escrita.');
        return false;
    }
    if (val.length = 0) {
        setInvalid(messageInput, 'A mensagem precisa pode ter no máximo 1000 caracteres.');
        return false;
    }
    setValid(messageInput);
    return true;
}

// Mostra visualmente se o campo está correto ou não
function setInvalid(input, msg) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    input.title = msg;
}

function setValid(input) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.title = '';
}

// Só libera o botão se tudo estiver certo
function checkFormValidity() {
    const valid =
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateSubject() &&
        validateMessage();
    submitBtn.disabled = !valid;
}

// Mostra a contagem de caracteres da mensagem
messageInput.addEventListener('input', () => {
    charCount.textContent = `${messageInput.value.length}/100`;
    validateMessage();
    checkFormValidity();
});

// Aplica a máscara de telefone enquanto digita
phoneInput.addEventListener('input', (e) => {
    let v = phoneInput.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 0) v = '(' + v;
    if (v.length > 3) v = v.slice(0, 3) + ') ' + v.slice(3);
    if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
    phoneInput.value = v;
    validatePhone();
    checkFormValidity();
});

// Valida o assunto ao trocar
subjectSelect.addEventListener('change', () => {
    validateSubject();
    checkFormValidity();
});

// Mostra a imagem escolhida antes de enviar
fileInput.addEventListener('change', () => {
    imagePreview.innerHTML = '';
    const file = fileInput.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Limpa tudo depois de enviar
function resetForm() {
    form.reset();
    [nameInput, emailInput, phoneInput, subjectSelect, messageInput].forEach(i => {
        i.classList.remove('valid', 'invalid');
        i.title = '';
    });
    charCount.textContent = '0/100';
    imagePreview.innerHTML = '';
    submitBtn.disabled = true;
}

// Mostra ou esconde o spinner de carregamento
function showSpinner(show) {
    spinner.style.display = show ? 'block' : 'none';
}

// Mensagem de sucesso e redirecionamento
function showSuccessAndRedirect() {
    resultDiv.textContent = 'Mensagem enviada! Obrigado pelo contato 😊';
    setTimeout(() => {
        window.location.href = 'https://github.com/JVictor-De/Jonh_assessment'; 
    }, 2000);
}

// Valida tudo antes de enviar
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateSubject() &&
        validateMessage()
    ) {
        showSpinner(true);
        submitBtn.disabled = true;
        setTimeout(() => {
            showSpinner(false);
            showSuccessAndRedirect();
            resetForm();
        }, 1500);
    } 
    else {
        resultDiv.textContent = 'Confira os campos destacados e tente novamente 😉';
    }
});

// Validação em tempo real dos campos principais
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input === nameInput) validateName();
        if (input === emailInput) validateEmail();
        if (input === messageInput) validateMessage();
        checkFormValidity();
    });
});

// Deixa tudo pronto ao Recarregar
resetForm();
