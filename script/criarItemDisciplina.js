export function criarItemDisciplina(codDisciplina, nomeDisciplina, codTurma, horarios, linkEmenta) {

    let itensHorario = '';
    horarios.forEach(h => {
        itensHorario += `<small class="text-body-secondary">${h}</small>`
    });

    return `
            <div id="${codDisciplina}" class="list-group-item list-group-item-action py-3 lh-sm">
                <div>
                    <a class="text-uerj-amarelo link-primary link-underline-opacity-0" href="#">
                        <div
                            class="d-flex w-100 align-items-center justify-content-between"
                        >
                            <strong class="mb-1 text-uerj-amarelo">${codDisciplina}</strong>
                            <div class="d-flex flex-column text-uerj-amarelo">
                                ${itensHorario}
                            </div>
                        </div>
                        <div class="col-10 mb-1 small text-uerj-amarelo">
                            ${nomeDisciplina} - Turma ${codTurma}
                        </div>
                    </a>
                </div>
                <div class="col-10 mb-1 small text-uerj-amarelo">
                    <a
                        class="text-uerj-laranja"
                        href="${linkEmenta}"
                        target="_blank"
                    >Ementário</a
                    >
                </div>
            </div>
            `
}