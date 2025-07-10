import { Navigate } from "../../route/routes.js";
import { getDocenteTurmas } from "../../script/buscarDados.js";
import { getSession } from "../../auth/auth.js";

const usuarioLogado = getSession();
if (!usuarioLogado) {
  Navigate.root()
}

$(document).on('click', '#btn-calendario-academico', function(event) {
  console.log("calendario academico");
});

let docenteTurmas = getDocenteTurmas(usuarioLogado.matricula);
