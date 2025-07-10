import { Navigate } from "../../route/routes.js";
import { getDocenteTurmas } from "../../script/buscarDados.js";
import { getSession } from "../../auth/auth.js";

const usuarioLogado = getSession();
if (!usuarioLogado) {
  Navigate.root()
}


export function getSession() {
    /**Obtem os dados do usuario logado salvos no localStorage 
    * Retorna um objeto: { nome: string, cpf: string, matricula: string } */
    const userAuth = localStorage.getItem('usuarioAutenticado');

    if (!userAuth) {
        return null
    }
    
    return JSON.parse(userAuth);
}

$(document).on('click', '#btn-calendario-academico', function(event) {
  console.log("calendario academico");
});

let docenteTurmas = getDocenteTurmas(usuarioLogado.matricula);
