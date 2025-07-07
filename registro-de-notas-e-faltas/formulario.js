export function carregaFormulario(turmasLocal){
	//Se turmasLocal foi atualizado antes, pega do localStorage. Senao, da fetch no json de turmasLocal e salva em variavel e no localStorage
	let existeNovoTurmas = (localStorage.getItem("turmasLocal") !== null);
	if (existeNovoTurmas){
		turmasLocal = localStorage.getItem("turmasLocal");
	}
	else{
		fetch('./turmasLocal.json')
      			.then(response => {
        			if (!response.ok) throw new Error("Falha no carregamento");
        			return response.json();
      			})
      			.then(json => {
        			turmasLocal = json;
        			localStorage.setItem("turmasLocal", JSON.stringfy(json));
        			console.log("JSON de turma carregado e salvo");
      			})
      			.catch(error => {
        			console.error("Erro ao carregar JSON:", error);
      			});
	}

	return turmasLocal;
}

export let turmasLocal = carregaFormulario(turmasLocal);
let tbody = null;
let disciplinaDet = null;
//Assim que carregar a pagina
document.addEventListener("DOMContentLoaded", () => {
	tbody = document.getElementById("alunosTabela");
	disciplinaDet = document.getElementById("disciplinaDetalhada");
});

function salvaFormulario(turma){
	for(const child of tbody.children){
		let matricula = child.children[1].textContent;		// Le matricula do aluno na tabela
		let aluno = turma.alunos.find(aluno => aluno.matricula === matricula)	// Procura aluno na lista de alunos da turma usando matricula

		let notaP1 = (child.children[4].value === "")?aluno.P1:child.children[4].value;
		let notaP2 = (child.children[5].value === "")?aluno.P2:child.children[5].value;
		let notaPF = (child.children[6].value === "")?aluno.PF:child.children[6].value; 

		let notaMF = (notaP1+notaP2)/2;

		aluno.P1 = notaP1;
		aluno.P2 = notaP2;
		aluno.PF = notaPF;
		aluno.mediaFinal = notaMF;
	}

	// Salva JSON atualizado no localStorage
	localStorage.setItem("turmasLocal", JSON.stringfy(turmasLocal));
}

function checaFormulario(){
	let turmaIDAtual = disciplinaDet.querySelector(".turmaID");	//Pega turmaID da turma atualizada
		
	let turma = turmasLocal.turmas.find(turma => turma.turmaID === turmaIDAtual);	// Procura turma na lista de turmasLocal usando turmaID 

	for(const child of tbody.children){
		let matricula = child.children[1].textContent;		// Le matricula do aluno na tabela
		let aluno = turma.alunos.find(aluno => aluno.matricula === matricula)	// Procura aluno na lista de alunos da turma usando matricula


		let notaP1 = (child.children[4].value === "")?aluno.P1:child.children[4].value;
		let notaP2 = (child.children[5].value === "")?aluno.P2:child.children[5].value;
		let notaPF = (child.children[6].value === "")?aluno.PF:child.children[6].value; 

		let notaMF = (notaP1+notaP2)/2;
		
		
		if((notaMF>=7) && (notaPF !== 0)){ //Aluno aprovado direto nao pode ter PF
			throw new Error("Nota PF diferente de 0, mas P1 e P2 já aprovam! ((P1+P2)/2 >=7)");
		}
			
		}
		if((notaMF<4) && (notaPF !== 0)){	//Aluno reprovado direto nao pode ter PF
			throw new Error("Nota PF diferente de 0, mas aluno já está reprovado! ((P1+P2)/2 <4)");
		}
	}
	// Se nenhum erro foi encontrado, guarda novas notas
	salvaFormulario(turma);
}
