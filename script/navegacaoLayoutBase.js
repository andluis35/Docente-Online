import { getSession, endSession } from "../auth/auth.js";
import { Navigate } from "../route/routes.js";
import { getDocenteDisciplinas } from "./consultarDados.js";

const userData = getSession();
if (!userData) {
  Navigate.root()
}

const disciplinas = getDocenteDisciplinas(userData.matricula)
console.log(disciplinas)

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