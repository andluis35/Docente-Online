const clicaNovaTurma = new CustomEvent("clicaNovaTurma");

// Referencia a lista de disciplinas
const container = document.querySelector('.list-group.list-group-flush.border-bottom.scrollarea');


//Tira "?" do final do pathname, para facilitar comparacao
function ajeitaPath(path) {
  return path.replace(/\?$/, "").replace(/\/$/, "");
}

//Ao clicar
container.addEventListener('click', function(evento) {
  //Se clicou em algum elemento da lista de disciplinas
  if (evento.target.matches('.list-group-item.list-group-item-action.py-3.lh-sm')){

    let textoBotao = evento.target.textContent;

    //Pega URL da página, tentando deduzir qual html esta aberto no momento
    const paginaAtual = ajeitaPath(window.location.pathname);

    //Salva a turma selecionada no localStorage, para carregar depois no outro script
    localStorage.setItem("turmaAtualInfo", textoBotao);
    
    //Se a pagina de registro de notas nao for a atual, vai ate a pagina de registro de notas
    if(paginaAtual !== "/Docente-Online/registro-de-notas-e-faltas/index.html"){
      window.location.href = "/Docente-Online/registro-de-notas-e-faltas/index.html"
    }
    //Se a pagina atual ja e a de registro de notas, somente avisa que a turma deve ser alterada 
    else{
      //Envia a turma selecionada pro DOM como evento, atualizando na propria pagina.
      document.dispatchEvent(clicaNovaTurma);
    }
  }
});
