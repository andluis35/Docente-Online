const container = document.getElementById('noticias');

function carregarNoticias() {
    fetch('../data/noticias.json')
    .then(response => response.json())
    .then(data => {
        data.noticias.forEach(noticia => {
            container.insertAdjacentHTML(
                'beforeend', 
                `<div class="linha">
                    <a target="_blank" href="${noticia.link}">
                        <img src="${noticia.imagem}"></img>
                        <div class="linha-col-dir">
                            <h4>${noticia.titulo}</h4>
                            <div class="linha-data-hora">
                                <p>${noticia.data}</p>
                                <p>${noticia.hora}</p>
                            </div>
                        <div>
                    </a>
                </div>
                `
            );
        })
    }).catch(error => {
        console.error('Erro ao carregar o arquivo "data/noticias.json":', error);
      });
}
carregarNoticias()