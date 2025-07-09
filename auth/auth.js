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
    localStorage.removeItem('docenteDiscip'); 
    alert('Você foi desconectado.');
    Navigate.root()
}

export function fazerLogin(usuario, senha) {  
    return buscarCredenciais(usuario, senha).then( docente => {
        if (!docente){
            // alert('Usuário ou senha inválidos.');
            return;
        }
        rememberAuthUser(docente);
        Navigate.root();
        return true;
    }).catch(() => {
        alert('Erro ao autenticar. Tente novamente.');
    });
}

function rememberAuthUser(user) {
    const userData = {
        nome: user.nome,
        cpf: user.cpf,
        matricula: user.matricula
    };
    
    localStorage.setItem('usuarioAutenticado', JSON.stringify(userData));
}

function buscarCredenciais(usuario, senha) {
    return fetch('../data/usuarios.json')
        .then(response => response.json())
        .then(usuarios => {
            const usuarioEncontrado = usuarios.find(user =>
                (user.cpf === usuario || user.matricula === usuario) &&
                user.senha === senha
            );
            if (usuarioEncontrado) {
                return usuarioEncontrado;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}