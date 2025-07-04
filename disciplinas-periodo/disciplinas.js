let divDisciplinas = document.querySelector("#disciplinas");

fetch("./disciplinas.json").then((response) => {
    response.json().then((info) => {
        info.disciplinas.map((disciplina) => {
            divDisciplinas.innerHTML += `<li> ${disciplina.nome} </li>`
        })
    })
})