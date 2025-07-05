//Função para auxiliar na reutilização de trechos HTML.
//Funcionamento: O trecho importado é carregado e inserido em um elemento com id passado como argumento.
//              Caso não seja possível carregar o conteúdo, será exibida uma mensagem de erro.
//Argumentos:
//          String caminhoHTML: caminho para o .html que deseja importar.
//          String idDoElementoContainer: id do elemento que o html será injetado.
//Sem retorno.

function importHTML(caminhoHTML, idDoElementoContainer) {
    document.addEventListener('DOMContentLoaded', function() {
        fetch(caminhoHTML)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o arquivo: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById(idDoElementoContainer).innerHTML = html;
            })
            .catch(error => {
                console.error('Houve um problema com a operação fetch:', error);
                document.getElementById(idDoElementoContainer).innerHTML = '<p style="color: red;">Não foi possível carregar o conteúdo.</p>';
            });
    });
}
