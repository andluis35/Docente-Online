import { getTurma } from "../script/buscarDados.js";
import { construirCabecalhoTabelaAlunos, preencherTabelaAlunos, trocaPontoFloat } from "./script.js";

const turmaClicada = localStorage.getItem("turma-clicada");
console.log("Turma clicada: " + turmaClicada);

getTurma(turmaClicada).then(turma => {
    preencherInfoDisciplina(
        turma.codigo,
        turma.nome,
        turma.numero,
        turma.horario,
        turma.ementa
    );
    console.log("AlunosInscritos.js getDisciplina \n" + JSON.stringify(turma, null, 2));

    // A construção do cabeçalho e preenchimento da tabela
    // agora são responsabilidades do script.js ou funções auxiliares exportadas.
    const componenteTabela = document.getElementById('tabelaAlunos');
    construirCabecalhoTabelaAlunos(componenteTabela);
    preencherTabelaAlunos(turma.alunos, trocaPontoFloat); // Passa a lista de alunos e a função de formatação
}).then(() => {
    localStorage.setItem("isDiscentesAtivo", 'true');
    $(document).trigger('tabelaAtualizada');
    console.log("Tabela atualizada - lista-disciplinas.");
});

function preencherInfoDisciplina(codigoDiscip, nome, numeroTurma, listaHorarios, urlEmenta) {
    const componenteInfoDiscip = document.getElementById('infoDisc');

    let horarios = '';
    listaHorarios.forEach(h => {
        horarios += `${h}\n`;
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