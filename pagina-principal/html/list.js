let turmaSelecionada = null;

const mudaTurma = new CustomEvent("mudaTurma", {
  detail: turmaSelecionada}
));


// Referencia a lista de disciplinas
const container = document.querySelector('.list-group.list-group-flush.border-bottom.scrollarea');

//Ao clicar
container.addEventListener('click', function(event) {
  //Se clicou em algum elemento da lista de disciplinas
  if (event.target.matches('.list-group-item.list-group-item-action.py-3.lh-sm')){
    let textoBotao = event.target.textContent;

    const regexCodigo =
    const regexTurma =
    
    turmaSelecionada = textoBotao.;
    //Envia turma selecionada pro DOM como evento 
    document.dispatchEvent(mudaTurma);
    // You can add more logic here, e.g., event.target.id or dataset info
  }
});


// Cria eventos de acordo com o botao pressionado
document.addEventListener("trocaDeDisciplina", (e) => {
  mudaDisciplina(e.detail);
});


