(function() {
    const usuarioString = localStorage.getItem('usuarioAutenticado');
    console.log(usuarioString)

    if (!usuarioString) {
        alert('Acesso negado. Faça o login para continuar.');
        window.location.href = '../login/index.html';
        return;
    }

    const usuario = JSON.parse(usuarioString);
    document.getElementById('welcome-message').textContent = `Bem-vindo, ${usuario.nome}!`;

    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('usuarioAutenticado');
        alert('Você foi desconectado.');
        window.location.href = '../login/index.html';
    });
})();