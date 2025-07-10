/**
 * Este módulo gerencia a troca de contexto de visualização em uma página,
 * alternando entre "Discentes com Matrícula Ativa" e "Registro de Notas e Faltas".
 * Ele manipula dinamicamente o texto de um botão e a visibilidade de elementos
 * de classe css 'celula-registros' na interface do usuário usando jQuery.
 * O módulo aguarda um evento lançado pelo script (registro-de-notas-e-faltas/script.js)
 * que atualiza a tabela. Ao detectar o evento, atualiza a visualização de acordo com o modo atual.
 * Razão: Sincronização.
 */

$(function() {
    let isDiscentesAtivo = false;

    function exibirVersaoDiscentes() {
        isDiscentesAtivo = true;
        console.log('Contexto: Discentes com Matrícula Ativa');
        $('#troca-contexto').text('Registro de Notas e Faltas');
        $('.celula-registros').hide();
    }

    function exibirVersaoRegistros() {
        isDiscentesAtivo = false;
        console.log('Contexto: Registro de Notas e Faltas');
        $('#troca-contexto').text('Discentes com Matrícula Ativa');
        $('.celula-registros').show();
    }


    $('#troca-contexto').on('click', function(event) {
        event.preventDefault();

        if (isDiscentesAtivo) {
            exibirVersaoRegistros();
        } else {
            exibirVersaoDiscentes();
        }
    });


    $(document).on('tabelaAtualizada', function(event) {
        if (isDiscentesAtivo) {
            exibirVersaoDiscentes();
        }else{
            exibirVersaoRegistros();
        }
    });

    exibirVersaoRegistros();
});