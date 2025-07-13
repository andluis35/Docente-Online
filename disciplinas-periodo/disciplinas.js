// =-=-=-=-=-=-=-=-=-= Código relacionado ao filtro =-=-=-=-=-=-=-=-=-= //

const INPUT_BUSCA = document.getElementById('busca');
let divDisciplinas = document.querySelector("#disciplinas");


fetch ("./NOVO-disciplinas.json").then((response) => {
    response.json().then((info) => {
        info.disciplinas.map((disciplina) => {
            divDisciplinas.innerHTML += `<li> CÓDIGO: ${disciplina.codigo} <br> NOME: ${disciplina.nome} <br> TURMA: ${disciplina.turmas[0].numero} <br> HORARIO: ${disciplina.turmas[0].horario} <br> EMENTÁRIO: <a href="${disciplina.ementa}">${disciplina.ementa}</a></li>`
        })
    })
})

INPUT_BUSCA.addEventListener("input", () => {
  filtrarDisciplinas();
});

function filtrarDisciplinas(){
  let expressaoDigitada = INPUT_BUSCA.value.toUpperCase();
    let listaDisciplinas = divDisciplinas.getElementsByTagName('li');

    for (let posicao in listaDisciplinas) {
        if (isNaN(posicao)) {
            continue;
        }
        let disciplina = listaDisciplinas[posicao].innerText.toUpperCase();
        
        if (disciplina.includes(expressaoDigitada)) {
            listaDisciplinas[posicao].style.display = '';
        }
        else {
            listaDisciplinas[posicao].style.display = 'none';
        }
    }
}

// =-=-=-=-=-=-=-=-=-= Código relacionado ao histórico =-=-=-=-=-=-=-=-=-= //

let input = document.getElementById("busca");
let sugestoes = document.getElementById("sugestoes");


input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarHistorico(input.value);
    sugestoes.style.display = "none";
  }
});

// =-=-=-=-=-=-=-=-=-= Código relacionado ao autocomplete =-=-=-=-=-=-=-=-=-= //

let disciplinas = [];

// Eventos

input.addEventListener("input", () => {
  filtrarSugestoes(input.value);
  exibirSugestoes(true);  
});

input.addEventListener("focus", () => {
  exibirSugestoes(true);
  filtrarSugestoes(input.value);
});

input.addEventListener("blur", () => {
  setTimeout(() => {
    exibirSugestoes(false);
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
    fetch('./NOVO-disciplinas.json')
      .then(response => response.json())
      .then(data => {

        item = data.disciplinas;

        item.forEach(element => {
          adicionarSugestao(element.nome);

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
  if(codigo.includes(info.toLowerCase())){
    return true;
  }

  let turma = disciplina.turmas;

  for(var j=0; j<turma.length;j++){
    let infoLC = info.toLowerCase();
    horario = turma[j].horario;

    for(var i=0; i<horario.length; i++){
      if(horario[i].toLowerCase().includes(infoLC)){
        return true;
      }
    }
  }

  return false;
}

function encontrarDisciplina(nomeDisciplina) {
  return disciplinas.find(element => {

    if(element.nome == nomeDisciplina){
      return element;
    }
    return null;
  });
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

  resultado = false;
  itens.forEach(element => {
    if(element.className == "itemHistorico"){
      resultado = true;
    }
  })
  return resultado;
}