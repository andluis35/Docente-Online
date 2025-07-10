// import { Navigate } from "../../route/routes.js";
import { getDocenteTurmas } from "../../script/buscarDados.js";

$(document).on('click', '#btn-calendario-academico', function(event) {
  console.log("calendario academico");
});

let docenteTurmas = getDocenteTurmas(usuarioLogado.matricula);
