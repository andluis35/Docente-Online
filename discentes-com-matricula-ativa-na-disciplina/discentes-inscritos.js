fetch('../disciplinas-perioso/turmas.json') // Adjust the path as needed
  .then(response => response.json())
  .then(turmas => {
    console.log(turmas);
  })
  .catch(error => console.error('Error loading JSON:', error));







//Inicia página pela primeira vez
function iniciaPag(){}



//Array de todos os alunos na disciplina
var alunosTabela = []

//Posição do primeiro aluno da visualização atual da tabela no array de alunos 
var alunoCimaTabela = 0
  
//"< 10 Anteriores"
function antPag(){}

//"Proximos 10 >"
function proxPag(){}


//Aciona ao clicar nos botões de cada disciplina
function mudaDisciplina(){}

