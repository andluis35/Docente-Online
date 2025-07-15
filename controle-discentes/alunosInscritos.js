import { getDisciplina, getAlunos, getTurma } from "../script/buscarDados.js";
import { trocaPontoFloat} from "./script.js";

// const codigoDisciplina = localStorage.getItem("disciplinaClicada");
const turmaClicada = localStorage.getItem("turma-clicada");
console.log("Turma clicada: " + turmaClicada)

getTurma(turmaClicada).then( turma => {
    preencherInfo(
        turma.codigo, 
        turma.nome,
        turma.numero,
        turma.horario,
        turma.ementa
    );
    console.log("AlunosInscritos.js getDisciplina \n" + JSON.stringify(turma, null, 2))
    construirTabela(turma.codigo, turma.numero);
    $(document).trigger('tabelaAtualizada');
})


function preencherInfo(codigoDiscip, nome, numeroTurma, listaHorarios, urlEmenta){
    const componenteInfoDiscip = document.getElementById('infoDisc')

    let horarios = '';
    listaHorarios.forEach(h => {
        horarios += `${h}\n`
    });
    
componenteInfoDiscip.innerHTML = `
  <div class="p-2">
    <div style="display: grid; grid-template-columns: max-content 1fr; gap: 2px 16px; text-align: left;">
      <span class="h5"><strong>DISCIPLINA:</strong></span>  <span class="h5">${codigoDiscip}</span>
      <span class="h5"><strong>NOME:</strong></span>         <span class="h5">${nome}</span>
      <span class="h5"><strong>TURMA:</strong></span>        <span class="h5">${numeroTurma}</span>
      <span class="h5"><strong>HORÁRIOS:</strong></span>     <span class="h5" style="white-space: pre;">${horarios}</span>
      <span class="h5"><strong>EMENTA:</strong></span>       <span class="h5"><a href="${urlEmenta}" target="_blank">CONSULTAR EMENTA</a></span>
    </div>
  </div>
`;


}


function construirTabela(codigoDisciplina, turma) {
    const componenteTabela = document.getElementById('tabelaAlunos')
    const tbody = construirCabecalho(componenteTabela)

    // Buscar lista de alunos, 
    // OBS não está implementada, 
    // Implementar a função getAlunos() em /script/buscarDados.js
    getAlunos(codigoDisciplina, turma).then(alunos => {
        alunos.forEach((aluno, index) => {
            let placeholderP1 = (aluno.notas.P1 == -0.1)?"":aluno.notas.P1;
            let placeholderP2 = (aluno.notas.P2 == -0.1)?"":aluno.notas.P2;
            let placeholderPF = (aluno.notas.PF == -0.1)?"":aluno.notas.PF;
            let linhaAluno = document.createElement("tr");
            linhaAluno.innerHTML =
                `<td>${index + 1}</td>
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td class="visao-discentes">${aluno["e-mail"]}</td>`;
            tbody.appendChild(linhaAluno);
        });
    });
}


function construirCabecalho(componenteTabela) {
    componenteTabela.innerHTML =
        `<table class="table table-sm table-striped table-hover table-bordered">
            <thead> 
                <tr>
                    <th scope="col">Número</th>
                    <th scope="col">Matricula</th>
                    <th scope="col">Nome</th>
                    <th scope="col" class="visao-discentes">email</th>
                </tr>
            </thead>
    
            <tbody id="alunosTabela"></tbody>
        </table>`;
    const tbody = componenteTabela.querySelector("#alunosTabela");
    return tbody;
}