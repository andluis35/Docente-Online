export function getDocenteDisciplinas(matricula) {
    const docenteDiscip = localStorage.getItem('docenteDiscip')

    if (!docenteDiscip) {
        return fetch('../data/docentes-turmas.json')
        .then(response => response.json())
        .then(data => {
            const docentes = data.docentes.find(
                d => d.matricula === matricula
            )
            const disciplinas = docentes.turmas.map (turmas => turmas.disciplina);
            
            localStorage.setItem('docenteDiscip', JSON.stringify(disciplinas)); 
            return disciplinas;

        }).catch(error => {
            console.error('Erro ao carregar o arquivo', error);
        });
    }else {
        return Promise.resolve(JSON.parse(docenteDiscip));
    }
}

export function getDisciplina(codigoDisciplina) {

    return fetch('../data/disciplinas.json')
    .then(response => response.json())
    .then(data => {
        const disciplina = data.disciplinas.find(
            d => d.codigo === codigoDisciplina
        )
        return disciplina;

    }).catch(error => {
        console.error('Erro ao carregar o arquivo', error);
    });
}
