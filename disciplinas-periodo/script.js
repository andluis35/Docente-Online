// Enquanto não há um json oficial com as disciplinas, vou usar um local para a base de testes.


let input = document.getElementById("busca");
atualizaSugestoes(input.value);

input.addEventListener("input", () => {
  atualizaSugestoes(input.value);
});

input.addEventListener("focus", () => {
  exibirSugestoes(true);
});

input.addEventListener("blur", () => {
  exibirSugestoes(false);
});


function atualizaSugestoes(conteudoBusca){
  let sugestoes = document.getElementById("sugestoes");
  sugestoes.innerHTML = "";

    fetch('./disciplinas.json')
      .then(response => response.json())
      .then(data => {

        let disciplinas = data;

        if(conteudoBusca != ""){
          filtrarSugestoes(disciplinas, conteudoBusca)
        }
        
      })
      .catch(error => {
        console.error("Erro ao carregar JSON:", error);
      });
}

function filtrarSugestoes(disciplinas, conteudoBusca){
  disciplinas.forEach(element => {

    let busca = conteudoBusca.toLowerCase();

    let nomeDisciplina = element.nome.toLowerCase();
    let codigoDisciplina = element.codigo.toLowerCase();

    if(nomeDisciplina.includes(busca)){
      requestAnimationFrame(() => {      
        adicionarSugestao(element.nome);
      });
    }

    else if(codigoDisciplina.includes(busca)){
      requestAnimationFrame(() => {      
        adicionarSugestao(element.nome);
      });
    }          
  });
}

function adicionarSugestao(texto){
  let item = document.createElement("button");
  item.textContent = texto;
  item.classList.add("itemSugestao");

  sugestoes.appendChild(item);
}

function exibirSugestoes(buscaSelecionada){
  let sugestoes = document.getElementById("sugestoes");

  if(buscaSelecionada){
    sugestoes.style.display = "block";
  }
  else{
    sugestoes.style.display = "none";
  }
}