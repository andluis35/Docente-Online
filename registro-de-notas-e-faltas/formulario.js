let turmas = null;
let tbody = null;
let turmaAtual = null;
let disciplinaDet = null;
//Assim que carregar a pagina
document.addEventListener("DOMContentLoaded", () => {
	
	tbody = document.getElementById("alunosTabela");
	disciplinaDet = document.getElementById("disciplinaDetalhada");
	
	//Se turmas foi atualizado antes, pega do localStorage. Senao, da fetch no json de turmas e salva em variavel e no localStorage
	let existeNovoTurmas = (localStorage.getItem("turmas") !== null);
	if (existeNovoTurmas){
		turmas = localStorage.getItem("turmas");
	}
	else{
    fetch('./turmas.json')
      .then(response => {
        if (!response.ok) throw new Error("Falha no carregamento");
        return response.json();
      })
      .then(json => {
        turmas = json;
        localStorage.setItem("turmas", JSON.stringfy(json));
        console.log("JSON de turma carregado e salvo");
      })
      .catch(error => {
        console.error("Erro ao carregar JSON:", error);
      });
  }
});

function salvaFormulario(){
	
	let turmaIDAtual = disciplinaDet.querySelector(".turmaID");	//Pega turmaID da turma atualizada
		
	let turma = turmas.turmas.find(turma => turma.turmaID === turmaIDAtual);	// Procura turma na lista de turmas usando turmaID
	
	for(const child of tbody.children){
		let matricula = child.children[1].textContent;		// Le matricula do aluno na tabela
		let aluno = turma.alunos.find(aluno => aluno.matricula === matricula)	// Procura aluno na lista de alunos da turma usando matricula


		let notaP1 = (child.children[4].value === "")?aluno.P1:child.children[4].value;
		let notaP2 = (child.children[5].value === "")?aluno.P2:child.children[5].value;
		let notaPF = (child.children[6].value === "")?aluno.PF:child.children[6].value; 

		let notaMF = (notaP1+notaP2)/2;
		
		
		if((notaMF>=7) && (notaPF !== 0)){ //Aluno aprovado direto nao pode ter PF
			/* Erro! Aluno nao pode fazer PF! */
		}
			
		}
		if((notaMF<4) && (notaPF !== 0)){	//Aluno reprovado direto nao pode ter PF
			/* Erro! Aluno nao pode fazer PF! */
		}

		// Se nenhum erro foi encontrado, guarda novas notas
		aluno.P1 = notaP1;
		aluno.P2 = notaP2;
		aluno.PF = notaPF;
		aluno.mediaFinal = notaMF;

		// Salva no localStorage a cada iteracao bem sucedida. Para na primeira mal sucedida
		localStorage.setItem("turmas", JSON.stringfy(turmas));
	}
}

function carregaFormulario(){
		/* Função que será chamada pelo buscador de disciplinas, para pegar o JSON atualizado de notas e faltas*/
	
}
