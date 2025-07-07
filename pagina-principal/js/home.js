import { getSession, endSession } from "../../auth/auth.js";
import { Navigate } from "../../route/routes.js";

const userData = getSession();

if (!userData) {
  Navigate.root()
}

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

$(document).on('click', '#btn-disciplinas-periodo', function(event) {
  event.preventDefault(); // Impede que o '#' seja adicionado à URL
  console.log('Botão "Disciplinas do período" clicado.');
});

$(document).on('click', '#btn-discentes-ativos', function(event) {
  event.preventDefault();
  console.log('Botão "Discentes com matrícula ativa" clicado.');
});

$(document).on('click', '#btn-registro-notas', function(event) {
  event.preventDefault();
  console.log('Botão "Registro de notas e faltas" clicado.');
});

$(document).on('click', '#footer-btn-disciplinas', function(event) {
  event.preventDefault();
  console.log('Botão de rodapé "Disciplinas" clicado.');
});

$(document).on('click', '#footer-btn-discentes', function(event) {
  event.preventDefault();
  console.log('Botão de rodapé "Discentes" clicado.');
});

$(document).on('click', '#footer-btn-registro', function(event) {
  event.preventDefault();
  console.log('Botão de rodapé "Registro" clicado.');
});