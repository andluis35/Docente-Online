import { getSession, endSession } from "../auth/auth.js";
import { Navigate } from "../route/routes.js";
import { getDocenteDisciplinas, getDisciplina } from "./buscarDados.js";
import { criarItemDisciplina } from "./criarItemDisciplina.js"

const usuarioLogado = getSession();
if (!usuarioLogado) {
  Navigate.root()
}


/** Função responsável por preencher a lista de disciplinas do docente no menu lateral*/
let listaDiscipCarregada = false;
$(document).on('show.bs.offcanvas', '#offcanvasList', function(event) {

	if (!listaDiscipCarregada) {
		getDocenteDisciplinas(usuarioLogado.matricula)
			.then(docenteDisciplinas => {
				
				/* Pega o id do comonente onde vai ser injetado a lista de disciplinas */	
				const containerDisciplinas = document.getElementById('container-lista-discip');
				containerDisciplinas.innerHTML = ''
				
				docenteDisciplinas.forEach(codigo => {
	
					
					getDisciplina(codigo).then( disciplina => {

						/* Cria o item html que será injetado */
						const item = criarItemDisciplina(disciplina.codigo, disciplina.nome, disciplina.turma, disciplina.horario, disciplina.link);
						
						/* Injeta o item no componente.*/
						containerDisciplinas.insertAdjacentHTML('beforeend', item)
					});

				});

			});
		}

		listaDiscipCarregada = true;
});


/**
 * Função de click para o item da lista do menu lateral:
 * Essa função obtem o id do item clicado e salva no local storage com a chave "disciplinaClicada"  
 */
$(document).on('click', '.list-group-item', function(event) {
//   console.log(event.currentTarget.id);
	event.preventDefault(); 
	
	/*	Quando um item da lista é criado o seu id é definido como o codigo da disciplina.
		Para obter esse id ao clicar usamos event.currentTarget.id */
	localStorage.setItem("disciplinaClicada",event.currentTarget.id)	
	Navigate.discentes()});


/** Daqui pra baixo são funções de click para os botões do header e do footer */
$(document).on('click', '#btn-profile', function(event) {
  event.preventDefault();
  alert(
    'Nome: ' + usuarioLogado.nome+ '\n' +
    'CPF: ' + usuarioLogado.cpf + '\n' +
    'Matrícula: ' + usuarioLogado.matricula
  );
  console.log('Botão profile clicado.');
});

$(document).on('click', '#btn-logout', function(event) {
  event.preventDefault();
  endSession();
});

$(document).on('click', '.btn-home', function(event) {
  event.preventDefault();
  Navigate.home();
});

$(document).on('click', '.btn-disciplinas-periodo', function(event) {
  event.preventDefault(); 
  Navigate.disciplinas();
});

$(document).on('click', '.btn-discentes-ativos', function(event) {
  event.preventDefault();
  localStorage.setItem("isDiscentesAtivo", 'true')
  Navigate.controleDiscentes();
});

$(document).on('click', '.btn-registro-notas', function(event) {
  event.preventDefault();
  localStorage.setItem("isDiscentesAtivo", 'false')
  Navigate.controleDiscentes();
});

$(document).on('click', '.btn-voltar', function(event) {
  event.preventDefault();
  history.back();
});