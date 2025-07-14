import { Navigate } from "../route/routes.js";

export function getSession() {
    /**Obtem os dados do usuario logado salvos no localStorage 
    * Retorna um objeto: { nome: string, cpf: string, matricula: string } */
    const userAuth = localStorage.getItem('usuarioAutenticado');

    if (!userAuth) {
        return null
    }
    
    return JSON.parse(userAuth);
}

export function endSession() {
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('docenteTurmas'); 
    // alert('Você foi desconectado.');
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
    /** Salva no local Storage os dados do usuario*/
    const userData = {
        nome: user.nome,
        cpf: user.cpf,
        matricula: user.matricula
    };
    
    localStorage.setItem('usuarioAutenticado', JSON.stringify(userData));
}

function buscarCredenciais(usuario, senha) {
    /** Busca nos dados de usuarios se as credenciais passadas como argumento estão corretas
     *  Retorna os dados do usuario encontrado caso as credenciais estejam corretas */
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