import { getDisciplina, getAlunos } from "../script/buscarDados.js";


const codigoDisciplina = localStorage.getItem("disciplinaClicada");

getDisciplina(codigoDisciplina).then( disciplina => {
    preencherInfo(
        codigoDisciplina, 
        disciplina.nome,
        disciplina.turma,
        disciplina.horario,
        disciplina.link
    );
    construirTabela(disciplina.turma, disciplina.turma);
})


function preencherInfo(codigoDiscip, nome, turma, listaHorarios, urlEmenta){
    const componenteInfoDiscip = document.getElementById('info-disciplina')

    let horarios = '';
    listaHorarios.forEach(h => {
        horarios += `${h}\t`
    });
    
    componenteInfoDiscip.innerHTML =  `
        <h2>Disciplina: ${codigoDiscip}</h2>
        <h2>Nome: ${nome}</h2>
        <h3>Turma: ${turma}</h3>
        <h3 style="white-space: pre;">Horários: ${horarios}</h3>
        <h3><a href="${urlEmenta}">Ementa</a></h3>
        <br>
        <h4>
            <a href="" class="btn btn-primary">Registro de faltas e notas da disciplina</a>
        </h4>`;
}


function construirTabela(codigoDisciplina, turma) {
    const componenteTabela = document.getElementById('tabela-container')
    const tbody = construirCabecalho(componenteTabela)

    // Buscar lista de alunos, 
    // OBS não está implementada, 
    // Implementar a função getAlunos() em /script/buscarDados.js
    getAlunos(codigoDisciplina, turma).then(alunos => {
        alunos.forEach((aluno, index) => {
            let linhaAluno = document.createElement("tr");
            linhaAluno.innerHTML = `
                <td>${index + 1}</td>
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
            `;
            tbody.appendChild(linhaAluno);
        });
    });
}


function construirCabecalho(componenteTabela) {
    componenteTabela.innerHTML = `
    <table class="table table-sm table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th>Número</th>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody id="alunosTabela"></tbody>
    </table>
    `;
    const tbody = componenteTabela.querySelector("#alunosTabela");
    return tbody;
}