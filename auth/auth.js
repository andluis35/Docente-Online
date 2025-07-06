import { Navigate } from "../route/routes.js";

export function getSession() {
    const userAuth = localStorage.getItem('usuarioAutenticado');

    if (!userAuth) {
        return null
    }
    
    return JSON.parse(userAuth);
}

export function endSession() {
    localStorage.removeItem('usuarioAutenticado');
    alert('Você foi desconectado.');
    Navigate.root()
}

export function rememberAuthUser(user) {
    const userData = {
        nome: user.nome,
        cpf: user.cpf,
        matricula: user.matricula
    };
    
    localStorage.setItem('usuarioAutenticado', JSON.stringify(userData));
}