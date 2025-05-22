// Gerenciador de Lista de Tarefas integrado ao DOM
let tarefas = [];

// Funções de array para uso no DOM
function listarTarefas() {
  if (tarefas.length === 0) {
    alert("Nenhuma tarefa cadastrada.");
  } else {
    let lista = tarefas.map((t, i) => `${i + 1}. ${t}`).join("\n");
    alert("Tarefas:\n" + lista);
  }
}

function adicionarTarefaPrompt() {
  const nova = prompt("Digite a nova tarefa:");
  if (nova && nova.trim() !== "") {
    tarefas.push(nova.trim());
    atualizarLista();
    alert("Tarefa adicionada!");
  } else {
    alert("Tarefa inválida.");
  }
}

function removerTarefaPrompt() {
  if (tarefas.length === 0) {
    alert("Nenhuma tarefa para remover.");
    return;
  }
  listarTarefas();
  const idx = parseInt(prompt("Digite o número da tarefa para remover:"), 10);
  if (!isNaN(idx) && idx >= 1 && idx <= tarefas.length) {
    const removida = tarefas.splice(idx - 1, 1);
    atualizarLista();
    alert(`Tarefa removida: ${removida}`);
  } else {
    alert("Número inválido.");
  }
}

function menu() {
  let opcao;
  do {
    opcao = prompt(
      "Gerenciador de Tarefas:\n1. Listar tarefas\n2. Adicionar tarefa\n3. Remover tarefa\n4. Sair\nEscolha uma opção (1-4):"
    );
    switch (opcao) {
      case "1":
        listarTarefas();
        break;
      case "2":
        adicionarTarefaPrompt();
        break;
      case "3":
        removerTarefaPrompt();
        break;
      case "4":
        alert("Saindo...");
        break;
      default:
        alert("Opção inválida.");
    }
  } while (opcao !== "4");
}

// --- DOM Interativo ---
// Remove código não utilizado do exemplo anterior
// Adiciona tarefas, exibe e permite remover

const botaoAdicionar = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");

botaoAdicionar.addEventListener("click", () => {
  const input = document.querySelector("#tarefa");
  const valor = input.value.trim();
  if (valor === "") return;
  tarefas.push(valor);
  atualizarLista();
  input.value = "";
});

function atualizarLista() {
  lista.innerHTML = "";
  tarefas.forEach((tarefa, idx) => {
    const li = document.createElement("li");
    li.textContent = tarefa + " ";
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

// Para rodar o menu de prompt, descomente a linha abaixo:
// menu();