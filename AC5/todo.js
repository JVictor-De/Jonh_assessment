// Gerenciador de Lista de Tarefas integrado ao DOM
let tarefas = [];

const botaoAdicionar = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");
const inputTarefa = document.querySelector("#tarefa");
const inputDescricao = document.querySelector("#inputDescricao");
const inputNome = document.querySelector("#inputNome");
const corFundo = document.querySelector("#corFundo");

// Adiciona tarefa ao clicar no botão ou pressionar Enter
botaoAdicionar.addEventListener("click", adicionarTarefa);
inputTarefa.addEventListener("keyup", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});

// Exibe o nome do usuário no topo, se preenchido
inputNome.addEventListener("input", () => {
  document.title = inputNome.value ? `Tarefas de ${inputNome.value}` : "Gerenciador de Tarefas";
});

function adicionarTarefa() {
  const valor = inputTarefa.value.trim();
  const descricao = inputDescricao.value.trim();
  if (!valor) return;
  tarefas.push({ nome: valor, descricao });
  atualizarLista();
  inputTarefa.value = "";
  inputDescricao.value = "";
  inputTarefa.focus();
}

function atualizarLista() {
  lista.innerHTML = "";
  if (tarefas.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Nenhuma tarefa cadastrada.";
    vazio.style.color = "#888";
    lista.appendChild(vazio);
    return;
  }
  tarefas.forEach((tarefa, idx) => {
    const li = document.createElement("li");
    li.style.background = corFundo.value;
    li.innerHTML = `<strong>${tarefa.nome}</strong>` + (tarefa.descricao ? `: <em>${tarefa.descricao}</em>` : "");
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => {
      tarefas.splice(idx, 1);
      atualizarLista();
    };
    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

corFundo.addEventListener("input", atualizarLista);

// Inicializa a lista ao carregar a página
atualizarLista();