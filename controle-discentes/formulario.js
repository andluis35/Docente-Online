import {carregarAlunos, colocarAlunosTabela} from "./script.js"


let turmaIDAtual = null;


/*
window.addEventListener("DOMContentLoaded", () => {
	console.log("DOM carregado");
	// Evento de zerar campo
	setTimeout(() => {
		const inputs = document.querySelectorAll('.form-control.form-control-sm');

		inputs.forEach((input) => {
			input.addEventListener("dblclick", () => {
				console.log("~ Input clicado 2x! ~");
				let minValue = parseFloat(input.min);
				if (minValue == -0.1){		// Usa máscara de N/A para campos com mínimo de -0.1
					input.value = "N/A";
				}
				else{ input.value = minValue; }
			});
		});
	}, 1000);
	
	//Fim do evento de zerar campo
});
*/

document.addEventListener("novaTabelaAlunos", () => {
	console.log("tabela carregada!");
	// Evento de zerar campo
	const inputs = document.querySelectorAll('.form-control.form-control-sm');

	inputs.forEach((input) => {
		input.addEventListener("dblclick", () => {
			console.log("~ Input clicado 2x! ~");
			let minValue = parseFloat(input.min);
			if (minValue == -0.1){		// Usa máscara de N/A para campos com mínimo de -0.1
				input.value = "N/A";
			}
			else{ input.value = minValue; }
		});
	});
	//Fim do evento de zerar campo
});

document.addEventListener("trocaTurmaFormulario", function(e) {
	console.log("turma trocada!");
	turmaIDAtual = e.detail.turmaID;
});

function trocaVirgulaFloat(str) {
  return str.replace(",", ".");
}

export async function carregaFormulario(){
	//Se turmasLocal foi atualizado antes, pega do localStorage. Senao, da fetch no json de turmasLocal e salva em variavel e no localStorage
	let existeNovoTurmas = (localStorage.getItem("turmasLocal") !== null);
	if (existeNovoTurmas){
		const updatedTurmas = localStorage.getItem("turmasLocal");
		return JSON.parse(updatedTurmas);
	}
	try{
		const response = await fetch('../data/turmas.json');
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
	btnEnvia.addEventListener("click", async () => {
		console.log("botao salva clicado!");
		try{
			checaFormulario();
			await carregarAlunos(turmaIDAtual);
		} catch(error){
			console.error("Erro!: ", error);
		}
	});
});


function salvaFormulario(turma){
	for(const child of tbody.children){
		let matricula = child.children[1].textContent;		// Le matricula do aluno na tabela
		
		console.log("Procurando matricula: ", matricula);
		
		let aluno = turma.alunos.find(aluno => aluno.matricula == matricula); // Procura aluno na lista de alunos da turma usando matricula

		let notaP1 = (child.children[4].children[0].value === "")?aluno.notas.P1:child.children[4].children[0].value;
		let notaP2 = (child.children[5].children[0].value === "")?aluno.notas.P2:child.children[5].children[0].value;
		let notaPF = (child.children[6].children[0].value === "")?aluno.notas.PF:child.children[6].children[0].value; 
		let faltas = (child.children[8].children[0].value === "")?aluno.faltas:child.children[8].children[0].value;

		if (notaP1 == "N/A".trim()){
			notaP1 = -0.1;
		}
		if (notaP2 == "N/A".trim()){
			notaP2 = -0.1;
		}
		if (notaPF == "N/A".trim()){
			notaPF = -0.1;
		}
		
		notaP1 = trocaVirgulaFloat(notaP1.toString());
		notaP2 = trocaVirgulaFloat(notaP2.toString());
		notaPF = trocaVirgulaFloat(notaPF.toString());

		notaP1 = Number(notaP1);
		notaP2 = Number(notaP2);
		notaPF = Number(notaPF);
		
		//Numeros nao nulos pra conta da media final
		let notaP1Conta = (notaP1 == -0.1)?0.0:notaP1;
		let notaP2Conta = (notaP2 == -0.1)?0.0:notaP2;

		let notaMF = (+notaP1Conta + +notaP2Conta)/2;
		
		if ((notaMF >= 4) && (notaMF < 7) && (notaPF != -0.1)){
			notaMF = (+notaMF + +notaPF)/2;
		}

		if (notaMF < 0) notaMF = 0;

		aluno.notas.P1 = notaP1;
		aluno.notas.P2 = notaP2;
		aluno.notas.PF = notaPF;
		aluno.notas.mediaFinal = notaMF;
		aluno.faltas = faltas;
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
		
	let turma = turmasLocal.turmas.find(t => t.turmaID == turmaIDAtual);	// Procura turma na lista de turmasLocal usando turmaID 

	for(const child of tbody.children){
		let matricula = child.children[1].textContent;		// Le matricula do aluno na tabela
		let aluno = turma.alunos.find(aluno => aluno.matricula == matricula)	// Procura aluno na lista de alunos da turma usando matricula


		let notaP1 = (child.children[4].children[0].value === "")?aluno.notas.P1:child.children[4].children[0].value;
		let notaP2 = (child.children[5].children[0].value === "")?aluno.notas.P2:child.children[5].children[0].value;
		let notaPF = (child.children[6].children[0].value === "")?aluno.notas.PF:child.children[6].children[0].value; 
		let faltas = (child.children[8].children[0].value === "")?aluno.faltas:child.children[8].children[0].value;
		
		if (notaP1 == "N/A".trim()){
			notaP1 = -0.1;
		}
		if (notaP2 == "N/A".trim()){
			notaP2 = -0.1;
		}
		if (notaPF == "N/A".trim()){
			notaPF = -0.1;
		}

		notaP1 = trocaVirgulaFloat(notaP1.toString());
		notaP2 = trocaVirgulaFloat(notaP2.toString());
		notaPF = trocaVirgulaFloat(notaPF.toString());
		
		// Checa se todos os campos são numéricos
		if ( (isNaN(notaP1)) || (isNaN(notaP2)) || (isNaN(notaPF)) || (isNaN(faltas)) ){
			throw new Error("Existe(m) valor(es) não númericos no formulário. (Erro no(a) Aluno(a) " + child.children[0].textContent + ").");
		}

		notaP1 = Number(notaP1);
		notaP2 = Number(notaP2);
		notaPF = Number(notaPF);
		
		//Numeros nao nulos pra conta da media final
		let notaP1Conta = (notaP1 == -0.1)?0.0:notaP1;
		let notaP2Conta = (notaP2 == -0.1)?0.0:notaP2;

		let notaMF = (+notaP1Conta + +notaP2Conta)/2;
		
		console.log("child atual:", child);
		console.log("P1:", notaP1);
		console.log("P2:", notaP2);
		console.log("MF:", notaMF);

		if ((notaP1<0) && (notaP1 != -0.1)
		    || (notaP2<0) && (notaP2 != -0.1)
		    || (notaPF<0) && (notaPF != -0.1)){
				throw new Error("Existe(m) nota(s) negativa(s). (Erro no(a) Aluno(a) " + child.children[0].textContent + ").");
		    }

		if ((notaP1>10)
		    || (notaP2>10)
		    || (notaPF>10)){
				throw new Error("Existe(m) nota(s) acima de 10. (Erro no(a) Aluno(a) " + child.children[0].textContent + ").");
		    }
		
		if((notaMF>=7) && (notaPF != -0.1)){ //Aluno aprovado direto nao pode ter PF
			throw new Error("Nota PF diferente de N/A, mas P1 e P2 já aprovam sozinhas! ((P1+P2)/2 >=7). (Erro no(a) Aluno(a) " + child.children[0].textContent + ").");
		}
		
		if((notaMF<4) && (notaPF != -0.1)){	//Aluno reprovado direto nao pode ter PF
			throw new Error("Nota PF diferente de N/A, mas P1 e P2 já reprovam sozinhas! ((P1+P2)/2 <4). (Erro no(a) Aluno(a) " + child.children[0].textContent + ").");
		}


		
					/* CHECA FALTAS */

		if(faltas < 0){
			throw new Error("Número de faltas não pode ser negativo! (Erro no(a) Aluno(a) " + child.children[0].textContent + ").");
		}

		if ((faltas % 1) != 0){
			throw new Error("Número de faltas deve ser inteiro! (Erro no(a) Aluno(a) " + child.children[0].textContent + ").");
		}

		
		console.log("Aluno checado!");
	}
	console.log("Toda a turma foi checada!");
	// Se nenhum erro foi encontrado, guarda novas notas
	salvaFormulario(turma);
}
