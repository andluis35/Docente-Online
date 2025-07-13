/**
 * Este módulo gerencia a troca de contexto de visualização em uma página,
 * alternando entre "Discentes com Matrícula Ativa" e "Registro de Notas e Faltas".
 * Ele manipula dinamicamente o texto de um botão e a visibilidade de elementos
 * de classe css 'visao-registros' na interface do usuário usando jQuery.
 * O módulo aguarda um evento lançado pelo script (registro-de-notas-e-faltas/script.js)
 * que atualiza a tabela. Ao detectar o evento, atualiza a visualização de acordo com o modo atual.
 * Razão: Sincronização.
 */

$(function() {
    let isDiscentesAtivo = false;

    function exibirVersaoDiscentes() {
        isDiscentesAtivo = true;
        $('.visao-registros').hide();
        $('#troca-contexto').text('Registro de notas e faltas');
        $('#troca-contexto-titulo').text('Registro de notas e faltas');
        $('#troca-contexto-cabecalho').text('Registro de notas e faltas');
        console.log('Contexto: Discentes com matrícula ativa');
    }

    function exibirVersaoRegistros() {
        isDiscentesAtivo = false;
        $('.visao-registros').show();
        $('#troca-contexto').text('Discentes com matrícula ativa');
        $('#troca-contexto-titulo').text('Discentes com matrícula ativa');
        $('#troca-contexto-cabecalho').text('Discentes com matrícula ativa');
        console.log('Contexto: Registro de motas e faltas');
    }


    $('#troca-contexto-btn').on('click', function(event) {
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