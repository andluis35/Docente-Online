let divDisciplinas = document.querySelector("#disciplinas");

fetch("./disciplinas.json").then((response) => {
    response.json().then((info) => {
        info.disciplinas.map((disciplina) => {
            divDisciplinas.innerHTML += `<li> CÓDIGO: ${disciplina.codigo} <br> NOME: ${disciplina.nome} <br> TURMA: ${disciplina.turma} <br> HORÁRIO: ${disciplina.horario} <br> EMENTÁRIO: ${disciplina.link}</li>`
        })
    })
})