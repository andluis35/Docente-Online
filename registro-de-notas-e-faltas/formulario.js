import {carregarAlunos, colocarAlunosTabela} from "./script.js"


export async function carregaFormulario(){
	//Se turmasLocal foi atualizado antes, pega do localStorage. Senao, da fetch no json de turmasLocal e salva em variavel e no localStorage
	let existeNovoTurmas = (localStorage.getItem("turmasLocal") !== null);
	if (existeNovoTurmas){
		const updatedTurmas = localStorage.getItem("turmasLocal");
		return JSON.parse(updatedTurmas);
	}
	try{
		const response = await fetch('./turmas.json');
    		if (!response.ok) throw new Error("Falha no carregamento");

    		const json = await response.json();
    		localStorage.setItem("turmasLocal", JSON.stringify(json));
    		console.log("JSON de turma carregado e salvo");
    		return json;
  	} catch (error) {
    		console.error("Falha no carregamento do JSON!: ", error);
    		return null;
	}
}

let turmasLocal = null;
let tbody = null;
//Assim que carregar a pagina
document.addEventListener("DOMContentLoaded", async () => {
	tbody = document.getElementById("alunosTabela");
	turmasLocal = await carregaFormulario();

	let btnEnvia = document.querySelector(".btn.btn-success");
	btnEnvia.addEventListener("click", () => {
		console.log("botao salva clicado!");
		try{
			checaFormulario();
		} catch(error){
			console.error("Erro!: ", error);
		}
		carregarAlunos();
		colocarAlunosTabela();
	});
});

function consomeCamposTabela(){
	for(const child in tbody.children){
		child.children[4].value = "";
		child.children[5].value = "";
		child.children[6].value = "";
	}
}




function salvaFormulario(turma){
	for(const child of tbody.children){
		let matricula = child.children[1].textContent;		// Le matricula do aluno na tabela
		
		console.log("Procurando matricula: ", matricula);
		
		let aluno = turma.alunos.find(aluno => aluno.matricula == matricula)	// Procura aluno na lista de alunos da turma usando matricula

		let notaP1 = (child.children[4].value === "")?aluno.P1:child.children[4].value;
		let notaP2 = (child.children[5].value === "")?aluno.P2:child.children[5].value;
		let notaPF = (child.children[6].value === "")?aluno.PF:child.children[6].value; 

		let notaMF = (notaP1+notaP2)/2;

		aluno.notas.P1 = notaP1;
		aluno.notas.P2 = notaP2;
		aluno.notas.PF = notaPF;
		aluno.notas.mediaFinal = notaMF;
		console.log("Aluno salvo!");
	}
	// Salva JSON atualizado no localStorage
	try{
		localStorage.setItem("turmasLocal", JSON.stringify(turmasLocal));
	}catch(error){
		console.error("Erro ao salvar no localStorage!:", error);
	}
	console.log("JSON salvo!");
	console.log("localStorage: ", turmasLocal);
	console.log("turmasLocal: ", JSON.parse(localStorage.getItem("turmasLocal")));
}

function checaFormulario(){
	let disciplinaDet = document.getElementsByClassName("disciplinaDetalhada")[0];
	let turmaIDAtual = disciplinaDet.querySelector(".turmaID").textContent;	//Pega turmaID da turma atualizada
		
	let turma = turmasLocal.turmas.find(turma => turma.turmaID === turmaIDAtual);	// Procura turma na lista de turmasLocal usando turmaID 

	for(const child of tbody.children){
		let matricula = child.children[1].textContent;		// Le matricula do aluno na tabela
		let aluno = turma.alunos.find(aluno => aluno.matricula === matricula)	// Procura aluno na lista de alunos da turma usando matricula


		let notaP1 = (child.children[4].value === "")?aluno.notas.P1:child.children[4].value;
		let notaP2 = (child.children[5].value === "")?aluno.notas.P2:child.children[5].value;
		let notaPF = (child.children[6].value === "")?aluno.notas.PF:child.children[6].value; 

		let notaMF = (notaP1+notaP2)/2;
		
		
		if((notaMF>=7) && (notaPF !== 0)){ //Aluno aprovado direto nao pode ter PF
			throw new Error("Nota PF diferente de 0, mas P1 e P2 já aprovam! ((P1+P2)/2 >=7)");
		}
		
		if((notaMF<4) && (notaPF !== 0)){	//Aluno reprovado direto nao pode ter PF
			throw new Error("Nota PF diferente de 0, mas aluno já está reprovado! ((P1+P2)/2 <4)");
		}
		console.log("Aluno checado!");
	}
	console.log("Toda a turma foi checada!");
	// Se nenhum erro foi encontrado, guarda novas notas
	salvaFormulario(turma);
	consomeCamposTabela();
}
