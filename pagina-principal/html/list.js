const clicaNovaTurma = new CustomEvent("clicaNovaTurma");

// Referencia a lista de disciplinas
const container = document.querySelector('.list-group.list-group-flush.border-bottom.scrollarea');

//Ao clicar
container.addEventListener('click', function(evento) {
  //Se clicou em algum elemento da lista de disciplinas
  if (evento.target.matches('.list-group-item.list-group-item-action.py-3.lh-sm')){

    let textoBotao = evento.target.textContent;

    //Pega URL da página, tentando deduzir qual html esta aberto no momento
    const paginaAtual = window.location.pathname;

    //Se a pagina dos discentes por disciplina nao estiver aberta, salva a turma selecionada no localStorage e carrega depois que abrir la
    if(paginaAtual !== "/Docente-Online/registro-de-notas-e-faltas/index.html"){
      localStorage.setItem("turmaAtualInfo", textoBotao);

      //Vai pra pagina dos discentes por disciplina
      window.location.href = "/Docente-Online/registro-de-notas-e-faltas/index.html"
    }
    //Se a pagina atual ja e a de discentes por disciplina
    else{
      //Envia a turma selecionada pro DOM como evento, atualizando na propria pagina.
      document.dispatchEvent(clicaNovaTurma);
    }
  }
});
