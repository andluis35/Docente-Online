import { getSession, endSession } from "../auth/auth.js";
import { Navigate } from "../route/routes.js";
import { getDocenteDisciplinas, getDisciplina } from "./buscarDados.js";
import { criarItemDisciplina } from "./criarItemDisciplina.js"

const userData = getSession();
if (!userData) {
  Navigate.root()
}


let listaDiscipCarregada = false;
$(document).on('show.bs.offcanvas', '#offcanvasList', function(event) {

	if (!listaDiscipCarregada) {
		getDocenteDisciplinas(userData.matricula)
			.then(docenteDisciplinas => {
				
				/* Pega o id do comonente onde vai ser injetado a lista de disciplinas */	
				const containerDisciplinas = document.getElementById('container-lista-discip');
				containerDisciplinas.innerHTML = ''
				
				let count = 0;
				docenteDisciplinas.forEach(codigo => {
	
					
					getDisciplina(codigo).then( disciplina => {

						/* Cria o item html que será injetado */
						const item = criarItemDisciplina(disciplina.codigo, disciplina.nome, disciplina.turma, disciplina.horario, disciplina.link);
						
						/* Injeta o item no componente.*/
						containerDisciplinas.insertAdjacentHTML('beforeend', item)
					});
					count +=1
				});
				console.log(count)
			});
		}

		listaDiscipCarregada = true;
});

$(document).on('click', '#btn-profile', function(event) {
  event.preventDefault();
  alert(
    'Nome: ' + userData.nome+ '\n' +
    'CPF: ' + userData.cpf + '\n' +
    'Matrícula: ' + userData.matricula
  );
  console.log('Botão profile clicado.');
});

$(document).on('click', '#btn-logout', function(event) {
  event.preventDefault();
  endSession();
});

$(document).on('click', '#btn_home', function(event) {
  event.preventDefault();
  Navigate.home();
});

$(document).on('click', '#btn-disciplinas-periodo', function(event) {
  event.preventDefault(); 
  Navigate.disciplinas();
});

$(document).on('click', '#btn-discentes-ativos', function(event) {
  event.preventDefault();
  Navigate.discentes();
});

$(document).on('click', '#btn-registro-notas', function(event) {
  event.preventDefault();
  Navigate.notasEFaltas();
});

$(document).on('click', '#footer-btn-disciplinas', function(event) {
  event.preventDefault();
  Navigate.disciplinas()
  console.log('Botão de rodapé "Disciplinas" clicado.');
});

$(document).on('click', '#footer-btn-discentes', function(event) {
  event.preventDefault();
  Navigate.discentes()
  console.log('Botão de rodapé "Discentes" clicado.');
});

$(document).on('click', '#footer-btn-registro', function(event) {
  event.preventDefault();
  Navigate.notasEFaltas()
  console.log('Botão de rodapé "Registro" clicado.');
});