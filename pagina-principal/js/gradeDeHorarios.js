const docentesTurmasData = {
    "docentes": [
        {
            "matricula": "91011-1",
            "cpf": "123.456.789-01",
            "turmas": [
                {
                    "turmaID": "IME04-10842 1 2025/1",
                    "disciplina": "IME04-10842",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "IME04-10843 1 2025/1",
                    "disciplina": "IME04-10843",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "23456-7",
            "cpf": "201.302.403-11",
            "turmas": [
                {
                    "turmaID": "IME04-10832 1 2025/1",
                    "disciplina": "IME04-10832",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "IME04-10835 1 2025/1",
                    "disciplina": "IME04-10835",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "91012-2",
            "cpf": "987.654.321-00",
            "turmas": [
                {
                    "turmaID": "IME04-11311 1 2025/1",
                    "disciplina": "IME04-11311",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "IME04-11312 1 2025/1",
                    "disciplina": "IME04-11312",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "34578-9",
            "cpf": "201.302.403-22",
            "turmas": [
                {
                    "turmaID": "IME04-10833 1 2025/1",
                    "disciplina": "IME04-10833",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "IME04-10836 1 2025/1",
                    "disciplina": "IME04-10836",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "IME04-10854 8 2025/1",
                    "disciplina": "IME04-10854",
                    "turma": 8,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "91013-3",
            "cpf": "112.233.445-56",
            "turmas": [
                {
                    "turmaID": "IME01-04827 1 2025/1",
                    "disciplina": "IME01-04827",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "IME02-10815 1 2025/1",
                    "disciplina": "IME02-10815",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "IME02-10818 1 2025/1",
                    "disciplina": "IME02-10818",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "56789-0",
            "cpf": "201.302.403-33",
            "turmas": []
        },
        {
            "matricula": "91014-4",
            "cpf": "667.788.990-00",
            "turmas": [
                {
                    "turmaID": "IME01-06766 1 2025/1",
                    "disciplina": "IME01-06766",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "56780-1",
            "cpf": "201.302.403-44",
            "turmas": [
                {
                    "turmaID": "FIS01-10982 1 2025/1",
                    "disciplina": "FIS01-10982",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "91015-5",
            "cpf": "778.899.001-12",
            "turmas": [
                {
                    "turmaID": "FIS03-10982 1 2025/1",
                    "disciplina": "FIS03-10982",
                    "turma": 1,
                    "periodo": "2025/1"
                },
                {
                    "turmaID": "FIS03-10983 1 2025/1",
                    "disciplina": "FIS03-10983",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        },
        {
            "matricula": "67890-2",
            "cpf": "201.302.403-55",
            "turmas": [
                {
                    "turmaID": "FIS01-10983 1 2025/1",
                    "disciplina": "FIS01-10983",
                    "turma": 1,
                    "periodo": "2025/1"
                }
            ]
        }
    ]
}

async function preencherTabelaHorarios() {
    try {
        // Obter docente logado
        const usuario = JSON.parse(localStorage.getItem('usuarioAutenticado') || "[]");
        const docenteMatricula = usuario.matricula;

        // Usar dados locais em vez de fetch
        const docenteAtual = docentesTurmasData.docentes.find(d => d.matricula === docenteMatricula);

        if (!docenteAtual) {
            console.error("Docente não encontrado");
            return;
        }

        // Criar mapa de turmas do docente
        const turmasDocenteMap = new Map();
        docenteAtual.turmas.forEach(turma => {
            turmasDocenteMap.set(turma.turmaID, turma.turma);
        });

        // Carregar disciplinas (mantido o fetch pois não foi incorporado)
        const disciplinas = await fetch("../../data/NOVO-disciplinas.json")
            .then(r => r.json())
            .then(data => data.disciplinas);

        // Limpar tabela
        document.querySelectorAll('#timetable td').forEach(td => td.textContent = '');

        // Preencher tabela
        disciplinas.forEach(disciplina => {
            docenteAtual.turmas
                .filter(td => td.disciplina === disciplina.codigo)
                .forEach(turmaDocente => {
                    const turmaDisciplina = disciplina.turmas.find(t =>
                        t.turmaID === turmaDocente.turmaID ||
                        (t.turmaID.includes(disciplina.codigo) &&
                            t.turmaID.includes(` ${turmaDocente.turma} `))
                    );

                    if (turmaDisciplina) {
                        const codigoComTurma = `${disciplina.codigo} ${numeroParaCirculado(turmaDocente.turma)}`;

                        turmaDisciplina.horario.forEach(horario => {
                            const [dia, ...periodos] = horario.split(/\s+/);
                            const periodosFormatados = periodos.join('').match(/[A-Z]\d+/g) || [];

                            periodosFormatados.forEach(periodo => {
                                const thPeriodo = document.querySelector(`#timetable th.${periodo}`);
                                if (!thPeriodo) return;

                                const tr = thPeriodo.parentElement;
                                const headerCells = document.querySelectorAll('#timetable thead th');
                                const diaHeader = Array.from(headerCells).find(th =>
                                    th.textContent.trim().toUpperCase().includes(dia.toUpperCase()) ||
                                    th.classList.contains(dia)
                                );

                                if (diaHeader) {
                                    const colIndex = Array.from(headerCells).indexOf(diaHeader);
                                    const td = tr.querySelectorAll('td')[colIndex - 1];
                                    if (td) {
                                        td.innerHTML = td.textContent
                                            ? `${td.innerHTML}<br>${codigoComTurma}`
                                            : codigoComTurma;
                                    }
                                }
                            });
                        });
                    }
                });
        });
    } catch (error) {
        console.error("Erro ao preencher tabela:", error);
    }
}

window.preencherTabelaHorarios = preencherTabelaHorarios;


// Função para números circulados (mantida igual)
function numeroParaCirculado(numero) {
    const circulados = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳'];
    if (numero >= 0 && numero <= 20) return circulados[numero];
}