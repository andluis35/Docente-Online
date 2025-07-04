let divDisciplinas = document.querySelector("#disciplinas");

fetch("./disciplinas.json").then((response) => {
    response.json().then((disciplinas) => {
        console.log(disciplinas)
    })
})