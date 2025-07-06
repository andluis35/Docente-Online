import { getSession, endSession } from "../auth/auth.js";
import { Navigate } from "../route/routes.js";

const userData = getSession()

if (!userData) {
    alert('Acesso negado. Faça o login para continuar.');
    Navigate.root()
}

document.getElementById('welcome-message').textContent = `Bem-vindo, ${userData.nome}!`;

document.getElementById('logout-button').addEventListener('click', function() {
    endSession(); 
});