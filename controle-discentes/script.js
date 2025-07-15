import {carregaFormulario} from "./formulario.js"

// =-=-=-=-=-=-=-=-=-= Código relacionado ao filtro =-=-=-=-=-=-=-=-=-= //

const INPUT_BUSCA = document.getElementById('busca');
let divDisciplinas = document.querySelector("#disciplinas");

let disciplinas = [];
// let alunos = []; // Esta variável 'alunos' pode ser removida se você sempre buscar os alunos da turma.

export function trocaPontoFloat(str) {
  return str.replace(".", ",");
}

let docenteTurmas = JSON.parse(localStorage.getItem("docenteTurmas"));

fetch ("../data/NOVO-disciplinas.json").then((response) => {
  response.json().then((info) => {
    info.disciplinas.map((disciplina) => {

      disciplina.turmas.forEach(turma =>{
        if(docenteTurmas.find(tID => tID == turma.turmaID)){    // Só utiliza turmas em que o professor está inscrito
          salvarDisciplinas(disciplina);

          divDisciplinas.innerHTML += `
                      <button class="itemLista">
                        <div style="display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; text-align: left;">
                          <span><strong>CÓDIGO:</strong></span>   <span>${disciplina.codigo}</span>
                          <span><strong>NOME:</strong></span>     <span>${disciplina.nome}</span>
                          <span><strong>TURMA:</strong></span>    <span>${turma.numero}</span>
                          <span><strong>HORÁRIO:</strong></span>  <span>${turma.horario}</span>
                        </div>
                        <span style="display: none;" class="turmaID">${turma.turmaID}</span>
                      </button>`;
        }
      });
    });
    document.querySelectorAll('.itemLista').forEach(element => {
      element.addEventListener('click', () => {
        let disc = document.getElementById("infoDisc");
        disc.innerHTML = "";
        let h1 = document.createElement("h1");
        h1.textContent = (element.textContent.match(/NOME:\s*(.*)\n/)[1]).trim();
        disc.appendChild(h1);
        //exibirInformacoes(element.textContent); // Esta linha pode ser revisada ou removida se não for mais usada.
        carregarAlunosETabela(element.querySelector(".turmaID").textContent); // Alterado para carregar e preencher a tabela
        destacarDisciplina(element);
      });
    });
  });
});

function destacarDisciplina(disciplinaAlvo){
  let resultadoBusca = document.getElementById("disciplinas");
  let disciplinas = Array.from(resultadoBusca.children);

  disciplinas.forEach(element => {
    if((disciplinaAlvo.textContent.match(/NOME:\s*(.*)\n/)[1]).trim() == (element.textContent.match(/NOME:\s*(.*)\n/)[1]).trim()){
      element.style.backgroundColor="#0080c6";
      element.style.color="#ffffff";
    }
    else{
      element.style.backgroundColor="#ffffff";
      element.style.color="#000000";
    }
  });
}

// Nova função para carregar alunos e preencher a tabela
export async function carregarAlunosETabela(turmaID) {
  let turmasLocal = await carregaFormulario();
  let turma = turmasLocal.turmas.find(item => item.turmaID == turmaID);

  if (turma && turma.alunos) {
    const componenteTabela = document.getElementById('tabelaAlunos');
    construirCabecalhoTabelaAlunos(componenteTabela); // Garante que o cabeçalho seja construído
    preencherTabelaAlunos(turma.alunos, trocaPontoFloat);
  } else {
    console.warn(`Não foi possível encontrar alunos para a turma ID: ${turmaID}`);
    // Opcional: Limpar a tabela ou exibir uma mensagem de "sem alunos"
    document.getElementById("alunosTabela").innerHTML = "";
  }
  document.dispatchEvent(new CustomEvent("novaTabelaAlunos", {}));
  $(document).trigger('tabelaAtualizada');
}

// Função exportada para construir o cabeçalho da tabela
export function construirCabecalhoTabelaAlunos(componenteTabela) {
  componenteTabela.innerHTML =
      `<table class="table table-sm table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">Número</th>
                    <th scope="col">Matricula</th>
                    <th scope="col">Nome</th>
                    <th scope="col" class="visao-discentes">email</th>
                    <th scope="col" class="visao-registros">Nota P1</th>
                    <th scope="col" class="visao-registros">Nota P2</th>
                    <th scope="col" class="visao-registros">Nota PF</th>
                    <th scope="col" class="visao-registros">Média Final</th>
                    <th scope="col" class="visao-registros">Total de faltas</th>
                    <th scope="col" class="visao-registros">Situação</th>
                </tr>
            </thead>
            <tbody id="alunosTabela"></tbody>
        </table>`;
}

// Função exportada para preencher a tabela de alunos
export function preencherTabelaAlunos(alunos, formatarNotaCallback) {
  const tbody = document.getElementById("alunosTabela");
  tbody.innerHTML = ""; // Limpa o corpo da tabela antes de preencher

  if (!alunos || alunos.length === 0) {
    return;
  }

  alunos.forEach((aluno, index) => {
    let placeholderP1 = (aluno.notas.P1 == -0.1) ? "" : aluno.notas.P1;
    let placeholderP2 = (aluno.notas.P2 == -0.1) ? "" : aluno.notas.P2;
    let placeholderPF = (aluno.notas.PF == -0.1) ? "" : aluno.notas.PF;

    let linhaAluno = document.createElement("tr");
    linhaAluno.innerHTML =
        `<td>${index + 1}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.nome}</td>
            <td class="visao-discentes">${aluno["e-mail"] || aluno.email}</td>
            <td class="visao-registros text-end"><input type="text" class="form-control form-control-sm inputNotas" min="-0.1" max="10" step="0.1" placeholder=${formatarNotaCallback(placeholderP1.toString())}></td>
            <td class="visao-registros text-end"><input type="text" class="form-control form-control-sm inputNotas" min="-0.1" max="10" step="0.1" placeholder=${formatarNotaCallback(placeholderP2.toString())}></td>
            <td class="visao-registros text-end"><input type="text" class="form-control form-control-sm inputNotas" min="-0.1" max="10" step="0.1" placeholder=${formatarNotaCallback(placeholderPF.toString())}></td>
            <td class="visao-registros text-end">${formatarNotaCallback(aluno.notas.mediaFinal.toString())}</td>
            <td class="visao-registros text-end"><input type="text" class="form-control form-control-sm inputFaltas" min="0" step="1" value=${aluno.faltas}></td>
            <td class="visao-registros"> TODO </td>`;
    tbody.appendChild(linhaAluno);
  });
}

// Funções que não foram alteradas mas fazem parte do script.js original
function exibirInformacoes(disciplina){
  let detalhes = document.getElementById("infoDisc");
  detalhes.innerHTML = "";

  let infoDisc = document.createElement("div");

  let nomeDisciplina
  if(disciplina.includes("NOME:")){
    nomeDisciplina = (disciplina.match(/NOME:\s*(.*)\n/)[1]).trim();
  }
  else{
    nomeDisciplina = disciplina;
  }

  let jsonDisciplina = encontrarDisciplina(nomeDisciplina);

  if(!jsonDisciplina){
    return;
  }

  infoDisc.innerHTML = `
  <div class="disciplinaDetalhada">
    <h1>${nomeDisciplina}</h1>
    <div style="display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; text-align: left; margin-top: 8px; width: 100%;">
      <span><strong>CÓDIGO:</strong></span>     <span>${jsonDisciplina.codigo}</span>
      <span><strong>TURMA:</strong></span>      <span>${jsonDisciplina.turmas[0].numero}</span>
      <span><strong>HORÁRIO:</strong></span>    <span>${jsonDisciplina.turmas[0].horario}</span>
      <span><strong>EMENTÁRIO:</strong></span>
      <span>
        <a href="${jsonDisciplina.ementa}" target="_blank" class="d-inline-block text-truncate w-100">
          CONSULTAR EMENTA
        </a>
      </span>
    </div>
    <span style="display: none;" class="turmaID">${jsonDisciplina.turmas[0].turmaID}</span>
  </div>
`;

  detalhes.appendChild(infoDisc);

}


INPUT_BUSCA.addEventListener("input", () => {
  filtrarDisciplinas();
});

function filtrarDisciplinas(){
  let expressaoDigitada = INPUT_BUSCA.value;
  let listaDisciplinas = Array.from(divDisciplinas.getElementsByClassName('itemLista'));

  listaDisciplinas.forEach(element => {
    element.style.display = "none";
    let disciplinaOBJ = encontrarDisciplina(element.textContent.match(/NOME:\s*(.*)\n/)[1].trim());

    if(infoPertenceDisciplina(disciplinaOBJ, expressaoDigitada)){
      element.style.display = "";
    }
  });
}

function salvarDisciplinas(element){
  let turma = [];

  element.turmas.forEach(item => {
    let t = {
      numero: item.numero,
      turmaID: item.turmaID,
      horario: item.horario
    }
    turma.push(t);
  });

  let disciplina = {
    codigo: element.codigo,
    nome: element.nome,
    ementa: element.ementa,
    turmas: turma
  };

  disciplinas.push(disciplina);
}

// =-=-=-=-=-=-=-=-=-= Código relacionado ao LocalStorage =-=-=-=-=-=-=-=-=-= //

let input = document.getElementById("busca");
let sugestoes = document.getElementById("sugestoes");


input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarHistorico(input.value);
    sugestoes.style.display = "none";
  }
});

// =-=-=-=-=-=-=-=-=-= Código relacionado ao autocomplete =-=-=-=-=-=-=-=-=-= //

// Eventos

input.addEventListener("input", () => {
  filtrarSugestoes(input.value);
  exibirSugestoes(true);
});

input.addEventListener("focus", () => {
  exibirSugestoes(true);
  filtrarSugestoes(input.value);
  input.style.borderColor="#016ba5";
});

input.addEventListener("blur", () => {
  setTimeout(() => {
    exibirSugestoes(false);
    input.style.borderColor="#adadad";

  }, 100);
});

function adicionarHistorico(texto){
  if(!estaNoHistorico(texto)){
    let item = document.createElement("button");
    item.textContent = texto;
    item.classList.add("itemHistorico");

    item.addEventListener("click", () => {
      input.value = item.textContent;
      filtrarDisciplinas();
    });

    let sugestoes = document.getElementById("sugestoes");
    sugestoes.prepend(item);
  }
}

function estaNoHistorico(texto){
  let sugestoes = document.getElementById("sugestoes");
  let itens = Array.from(sugestoes.children);

  let resultado = false;

  itens.forEach(element => {
    if(element.textContent === texto){
      resultado = true;
    }
  });
  return resultado;
}


// Todas as disciplinas são adicionadas a caixa de sugestões, apenas sua visibilidade é alterada.

adicionarDisciplinas();
function adicionarDisciplinas(){
  fetch('../data/NOVO-disciplinas.json')
      .then(response => response.json())
      .then(data => {

        let item = data.disciplinas;

        item.forEach(element => {
          adicionarSugestao(element.nome);
        });

      })
      .catch(error => {
        console.error("Erro ao carregar JSON:", error);
      });
}
// Lógica de filtragem e exibição.


function filtrarSugestoes(conteudoBusca){
  const Disciplinas = document.getElementById("sugestoes");
  const itens = Array.from(Disciplinas.children);

  itens.forEach(element => {
    element.style.display = "none";

    if(conteudoBusca!=""){

      if(infoPertenceDisciplina(encontrarDisciplina(element.textContent),conteudoBusca)){
        element.style.display="block";
      }
    }

    let nomeDisciplina = element.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let regex = new RegExp("\\b" + conteudoBusca, "i");

    if(element.className == "itemHistorico" && (regex.test(nomeDisciplina))){
      element.style.display="block";
    }
  });

}

function infoPertenceDisciplina(disciplina, info){
  if(disciplina == null){
    return false;
  }

  let nome = disciplina.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  let codigo = disciplina.codigo;

  let regex = new RegExp("\\b" + info.normalize('NFD').replace(/[\u0300-\u036f]/g, ""), "i");
  if(regex.test(nome)){
    return true;
  }
  if(codigo.includes(info.toUpperCase())){
    return true;
  }

  let turma = disciplina.turmas;

  for(var j=0; j<turma.length;j++){
    let infoLC = info.toLowerCase();
    let horario = turma[j].horario;

    for(var i=0; i<horario.length; i++){
      if(horario[i].toLowerCase().includes(infoLC)){
        return true;
      }
    }
  }

  return false;
}

function encontrarDisciplina(nomeDisciplina) {
  return disciplinas.find(element => element.nome == nomeDisciplina);
}

function adicionarSugestao(texto){
  let item = document.createElement("button");
  item.textContent = texto;
  item.classList.add("itemSugestao");

  item.addEventListener("click", () => {
    item.classList.remove("itemSugestao");
    item.classList.add("itemHistorico");
    input.value = item.textContent;

    let sugestoes = document.getElementById("sugestoes");
    sugestoes.prepend(item);
    filtrarDisciplinas();
  });

  let sugestoes = document.getElementById("sugestoes");
  sugestoes.appendChild(item);
}


function exibirSugestoes(buscaSelecionada){
  let sugestoes = document.getElementById("sugestoes");

  sugestoes.style.display = "none";

  if(buscaSelecionada && input.value !== ""){
    sugestoes.style.display = "block";
  }

  if(buscaSelecionada && existeSugestao()){
    sugestoes.style.display = "block";
  }
}

function existeSugestao(){
  let sugestao = document.getElementById("sugestoes");
  let itens = Array.from(sugestao.children);

  let resultado = false;
  itens.forEach(element => {
    if(element.className == "itemHistorico"){
      resultado = true;
    }
  })
  return resultado;
}