document.addEventListener('DOMContentLoaded', function() {

    const confirmacaoModalElement = document.getElementById('confirmacaoModal');
    const sucessoModalElement = document.getElementById('sucessoModal');
    const btnConfirmarAcao = document.getElementById('btnConfirmarAcao');

    const confirmacaoModal = new bootstrap.Modal(confirmacaoModalElement);
    const sucessoModal = new bootstrap.Modal(sucessoModalElement);


    if (btnConfirmarAcao) {
        btnConfirmarAcao.addEventListener('click', function() {

            confirmacaoModal.hide();


            setTimeout(() => {
                sucessoModal.show();
            }, 300);

            console.log("Ação confirmada e modal de sucesso disparado.");
        });
    }

});
