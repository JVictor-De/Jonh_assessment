const caixa = document.querySelector("#caixa");

botao.addEventListener("click", () => {
  caixa.style.backgroundColor = "purple";
});

const form = document.querySelector("#meuForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita o recarregamento
      const nome = document.querySelector("#nome").value;
      alert(`Nome digitado: ${nome}`);
    });


const botao = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");

botao.addEventListener("click", () => {
  const input = document.querySelector("#tarefa");
  if (input.value.trim() === "") return; // Evita tarefa vazia

  const li = document.createElement("li");
  li.textContent = input.value;
  lista.appendChild(li);
  input.value = ""; // Limpa o input
});

const inputNome = document.querySelector("#inputNome");
const inputDescricao = document.querySelector("#inputDescricao");
const corFundo = document.querySelector("#corFundo");
const perfil = document.querySelector("#perfil");

inputNome.addEventListener("keyup", () => {
  document.querySelector("#nomePerfil").textContent = inputNome.value;
});

inputDescricao.addEventListener("keyup", () => {
  document.querySelector("#descricao").textContent = inputDescricao.value;
});

corFundo.addEventListener("input", () => {
  perfil.style.backgroundColor = corFundo.value;
});