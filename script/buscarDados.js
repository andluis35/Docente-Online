export function getDocenteTurmas(matricula) {
    /**Parametro: Matricula do docente
     * Retorna uma lista com o ID turmas exemplo: ["IME04-12345 1 2025/1", "IME04-12345 4 2023/2"] */
    const docenteTurmas = localStorage.getItem('docenteTurmas');

    if (!docenteTurmas) {
        return fetch('../data/docentes-turmas.json')
        .then(response => response.json())
        .then(data => {
            const docentes = data.docentes.find(
                d => d.matricula == matricula
            )
            const turmas = docentes.turmas.map (turma => turma.turmaID);
            
            localStorage.setItem('docenteTurmas', JSON.stringify(turmas)); 
            return turmas;

        }).catch(error => {
            console.error('Erro ao carregar o arquivo', error);
        });
    }else {
        return Promise.resolve(JSON.parse(docenteTurmas));
    }
}

export function getDisciplina(codigoDisciplina) {
    /** Função para buscar disciplina:
     * Retorna um objeto da disciplina:   
        nome: nome da disciplina (ex: "Computação Gráfica")  
        turma: número identificador da turma (ex: 1)
        horario: lista com os dias e horários das aulas (ex: ["TER M1 M2", "QUI M1 M2"])
        link: URL para a ementa oficial da disciplina (ex: "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10842"
    */

    return fetch('../data/NOVO-disciplinas.json')
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

export function getAlunos(codigoDisciplina, numeroTurma) {
    //implementar função para obter todos os alunos dessa turma
    // Retornando dados mocados é só pra teste
    return Promise.resolve([
    {
        "nome": "Aluno1",
        "matricula": 202512345610,
        "email": "aluno1@grad.uni"
    },
    {
        "nome": "Aluno2",
        "matricula": 202512345611,
        "email": "aluno2@grad.uni"
    },
    {
        "nome": "Aluno3",
        "matricula": 202512345612,
        "email": "aluno3@grad.uni"
    },
    {
        "nome": "Aluno4",
        "matricula": 202512345613,
        "email": "aluno4@grad.uni"
    }
]);

    
}
