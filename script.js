(function() {
    const usuarioString = localStorage.getItem('usuarioAutenticado');
    console.log(usuarioString)

    if (!usuarioString) {
        window.location.href = 'login/index.html';
        return;
    } else {
        window.location.href = 'painel/index.html';
    }
})();