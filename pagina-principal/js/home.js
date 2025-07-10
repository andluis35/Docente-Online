// import { Navigate } from "../../route/routes.js";
import { getDocenteDisciplinas } from "../../script/buscarDados.js";

$(document).on('click', '#btn-calendario-academico', function(event) {
  console.log("calendario academico");
});

let disciplinasCarregadas = false;
if (!disciplinasCarregadas){
  let docenteDisciplinas = getDocenteDisciplinas(usuarioLogado.matricula);
  disciplinasCarregadas = true;
}
