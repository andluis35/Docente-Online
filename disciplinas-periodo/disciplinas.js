const INPUT_BUSCA = document.getElementById('busca');
let divDisciplinas = document.querySelector("#disciplinas");


fetch ("./disciplinas.json").then((response) => {
    response.json().then((info) => {
        info.disciplinas.map((disciplina) => {
            divDisciplinas.innerHTML += `<li> CÓDIGO: ${disciplina.codigo} <br> NOME: ${disciplina.nome} <br> TURMA: ${disciplina.turma} <br> HORÁRIO: ${disciplina.horario} <br> EMENTÁRIO: <a href="${disciplina.link}">${disciplina.link}</a></li>`
        })
    })
})

INPUT_BUSCA.addEventListener('keyup', () => {
    let expressaoDigitada = INPUT_BUSCA.value.toUpperCase();
    let listaDisciplinas = divDisciplinas.getElementsByTagName('li');

    for (let posicao in listaDisciplinas) {
        if (isNaN(posicao)) {
            continue;
        }
        let disciplina = listaDisciplinas[posicao].innerText.toUpperCase();
        
        if (disciplina.includes(expressaoDigitada)) {
            listaDisciplinas[posicao].style.display = '';
        }
        else {
            listaDisciplinas[posicao].style.display = 'none';
        }
    }

});