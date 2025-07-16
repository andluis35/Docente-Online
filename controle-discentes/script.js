import {carregaFormulario} from "./formulario.js"

// =-=-=-=-=-=-=-=-=-= Código relacionado ao filtro =-=-=-=-=-=-=-=-=-= //

const INPUT_BUSCA = document.getElementById('busca');
let divDisciplinas = document.querySelector("#disciplinas");

let disciplinas = [];
let alunos = [];

let caixaTemposFaltosos = document.querySelector("#caixa-de-tempos-faltosos");

function trocaPontoFloat(str) {
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
                        let discSelecionada = document.getElementById("discSelecionada");
                        discSelecionada.textContent = (element.textContent.match(/NOME:\s*(.*)\n/)[1]).trim();
                        //exibirInformacoes(element.textContent);
                        carregarAlunos(element.querySelector(".turmaID").textContent);
                        destacarDisciplina((element.textContent.match(/NOME:\s*(.*)\n/)[1]).trim(), parseInt((element.textContent.match(/TURMA:\s*(.*)\n/)[1]).trim()));

                        //Dispara evento no DOM informando a turma selecionada
                        document.dispatchEvent(new CustomEvent("trocaTurmaFormulario", {
                          detail:{
                            turmaID: element.children[1].textContent
                          }
                        }));
                    });
        });
    });
});

function destacarDisciplina(nomeDisc, nTurma){

  let resultadoBusca = document.getElementById("disciplinas");
  let disciplinas = Array.from(resultadoBusca.children);

  disciplinas.forEach(element => {
    if(nomeDisc == (element.textContent.match(/NOME:\s*(.*)\n/)[1]).trim() && nTurma == (element.textContent.match(/TURMA:\s*(.*)\n/)[1]).trim()){
      element.style.backgroundColor="#0080c6";
      element.style.color="#ffffff";
    }
    else{
      element.style.backgroundColor="#ffffff";
      element.style.color="#000000";
    }
  });

}

export async function carregarAlunos(turmaID){
    let turmasLocal = await carregaFormulario();
    
    let turma = turmasLocal.turmas.find(item => item.turmaID == turmaID);
    alunos = turma ? turma.alunos : undefined;
    colocarAlunosTabela();
    caixaTemposFaltosos.children[1].value = turma.temposFaltosos;
    caixaTemposFaltosos.style.visibility = "visible";
}



export function colocarAlunosTabela(){
  let tabela = document.getElementById("alunosTabela");
  tabela.innerHTML = "";
  let numero = 1

  if(!alunos){
    return;
  }

 
  alunos.forEach(element => {
       // Renomeia -0.1 para ter diferenca entre nota 0 e nota nao dada.
    let placeholderP1 = (element.notas.P1 == -0.1)?"":element.notas.P1;
    let placeholderP2 = (element.notas.P2 == -0.1)?"":element.notas.P2;
    let placeholderPF = (element.notas.PF == -0.1)?"":element.notas.PF;

    //Trata display de situação do aluno
    let situacao = element.situacao;
    let corSituacao = 'color:black';

    switch(situacao){
      case "Aprovação":
        corSituacao = 'color: green';
        break;
      case "Reprovação por falta":
        corSituacao = 'color:#FFD700';
        break;
      case "Reprovação por nota":
        corSituacao = 'color: #FF8C00';
        break;
      case "Prova Final":
        corSituacao = 'color: blue';
        break;
      default:
        corSituacao = 'color:black';
        break;
    }
        
    let aluno = document.createElement("tr");
    aluno.innerHTML = 
    `<td>${numero}</td>
      <td>${element.matricula}</td>
      <td>${element.nome}</td>
      <td class= "visao-discentes">${element.email}</td>
      <td class="visao-registros text-end"><input tabIndex ="${numero}" type="text" class="form-control form-control-sm text-end inputNotas" min="-0.1" max="10" step="0.1" value=${trocaPontoFloat(placeholderP1.toString())}></td>
      <td class="visao-registros text-end"><input tabIndex ="${+numero + 1000000}" type="text" class="form-control form-control-sm text-end inputNotas" min="-0.1" max="10" step="0.1" value=${trocaPontoFloat(placeholderP2.toString())}></td>
      <td class="visao-registros text-end"><input tabIndex ="${+numero + 2000000}" type="text" class="form-control form-control-sm text-end inputNotas" min="-0.1" max="10" step="0.1" value=${trocaPontoFloat(placeholderPF.toString())}></td>
      <td class="visao-registros text-end">${trocaPontoFloat(element.notas.mediaFinal.toString())}</td>
      <td class="visao-registros text-end"><input tabIndex ="${+numero + 3000000}" type="text" class="form-control form-control-sm text-end inputFaltas" min="0" step="1" value=${element.faltas}></td>
      <td class="visao-registros situacao-aluno" style="${corSituacao}">${element.situacao}</td>
    `;

      tabela.appendChild(aluno);
      numero = numero + 1;
  });
    document.dispatchEvent(new CustomEvent("novaTabelaAlunos", {}));
    $(document).trigger('tabelaAtualizada');
}

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

/*
  infoDisc.innerHTML =
  `<div class="disciplinaDetalhada d-flex flex-column justify-content-start align-items-start p-1">
    <h1 class="h4">${nomeDisciplina}</h1> <br>
    CÓDIGO: ${jsonDisciplina.codigo} <br> 
    TURMA: ${jsonDisciplina.turmas[0].numero} <br> 
    HORARIO: ${jsonDisciplina.turmas[0].horario} <br>
    EMENTÁRIO: <a href="${jsonDisciplina.ementa}" class="d-inline-block text-truncate w-100">${jsonDisciplina.ementa}</a>
    <span style="display: none;" class = "turmaID">${jsonDisciplina.turmas[0].turmaID}</span>
  </div>
  `
*/

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
    subitem.style.display = "none";
    input.style.borderColor="#adadad";
  }, 100);

  let subitem = document.getElementById("subItens");
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

  let subitens = document.getElementById("subItens");
  subitens.style.display = "none";

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

    let objDisc = encontrarDisciplina(item.textContent.trim());
    if(objDisc && objDisc.turmas.length > 1){
      setTimeout(() => {
        input.focus();
        adicionarSubitem(objDisc);
      }, 100);
      input.style.borderColor="#016ba5";
    }
    else{
      let subItens = document.getElementById("subItens");
      subItens.innerHTML="";
      destacarDisciplina(item.textContent, 1);
      let discSelecionada = document.getElementById("discSelecionada");
      discSelecionada.textContent = item.textContent;

      let objDisc = encontrarDisciplina(item.textContent);
      carregarAlunos(objDisc.turmas[0].turmaID);
    }
  });

  let sugestoes = document.getElementById("sugestoes");
  sugestoes.appendChild(item);
}

function adicionarSubitem(objDisc){
  let subItens = document.getElementById("subItens");
  subItens.innerHTML="";

  let nomeDisc = document.createElement("h4");
  nomeDisc.textContent = "Selecione uma turma:";
  nomeDisc.style.color = "#016ba5";

  subItens.appendChild(nomeDisc);

  for(let i=1; i<objDisc.turmas.length+1; i++){
    let turma = document.createElement("button");
    turma.classList.add("itemSugestao");
    turma.style.display = "block";
    turma.textContent = objDisc.nome + ": "+ " Turma " + i;

    turma.addEventListener('click', () => {

        const regex = turma.textContent.match(/^(.*?):\s*Turma\s+(\d+)$/);

        let nome = regex[1].trim();
        let nTurma = parseInt(regex[2], 10);

        let obj = encontrarDisciplina(nome);
        let codTurma = obj.turmas[nTurma-1].turmaID;
        carregarAlunos(codTurma);
        destacarDisciplina(nome, nTurma);
        let discSelecionada = document.getElementById("discSelecionada");
        discSelecionada.textContent = (nome);
        
     });

    subItens.appendChild(turma);
  }

  subItens.style.display = "block";
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
