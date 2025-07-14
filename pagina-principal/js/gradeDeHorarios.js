const dadosCompletos = {
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
    ],
    disciplinas: [
        {
            "codigo": "IME04-10842",
            "nome": "Computação Gráfica",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10842",
            "turmas": [ 
                        {    
                            "numero": 1,
                            "turmaID": "IME04-10842 1 2025/1",
                            "horario": ["TER M1 M2", "QUI M1 M2"]
                        }
            ]
        },
        {
            "codigo": "IME04-10843",
            "nome": "Inteligência Artificial",            
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10843",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-10843 1 2025/1",
                            "horario": ["SEG M5 M6", "QUA M5 M6"]
                        }
            ]
        },
        {
            "codigo": "IME04-11312",
            "nome": "Otimização em Grafos",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=11312",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-11312 1 2025/1",
                            "horario": ["SEX M2 M3 M4"]
                        }
            ]
        },
        {
            "codigo": "IME04-11311",
            "nome": "Algoritmos em Grafos",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=11311",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-11311 1 2025/1",
                            "horario": ["SEX N2N3N4"]
                        }

            ]
        },
        {
            "codigo": "IME04-10833",
            "nome": "Análise e Projeto de Sistemas",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10833",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-10833 1 2025/1",
                            "horario": ["TER M1M2", "QUI M1M2"]
                        }
            ]
        },
        {
            "codigo": "IME04-10836",
            "nome": "Arquitetura de Computadores II",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10836",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-10836 1 2025/1",
                            "horario": ["TER M3M4", "QUI M3M4"]
                        }

            ]
        },
        {
            "codigo": "IME04-10854",
            "nome": "Aspectos Práticos em Ciência da Computação I",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10854",
            "turmas":[
                        {
                            "numero": 8,
                            "turmaID": "IME04-10854 8 2025/1",
                            "horario": ["TER M5M6", "QUI M5M6"]
                        }
            ]
        },
        {
            "codigo": "IME04-10832",
            "nome": "Banco de Dados I",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10832",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-10832 1 2025/1",
                            "horario": ["QUA M3M4", "SEX M5M6"]
                        }
            ]
        },
        {
            "codigo": "IME04-10835",
            "nome": "Sistemas Operacionais I",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10835",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-10835 1 2025/1",
                            "horario": ["SEG M5M6", "QUA M5M6"]
                        }

            ]
        },
        {
            "codigo": "IME01-04827",
            "nome": "Cálculo I",            
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=04827",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME01-04827 1 2025/1",
                            "horario": ["SEG M5M6", "TER M5M6", "QUI M5M6"]
                        }

            ]
        },
        {
            "codigo": "IME01-06766",
            "nome": "Cálculo II",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=06766",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME01-06766 1 2025/1",
                            "horario": ["SEG N1N2", "QUI N1N2"]
                        }

            ]
        },
        {
            "codigo": "IME02-10815",
            "nome": "Álgebra",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10815",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME02-10815 1 2025/1",
                            "horario": ["SEG M5M6", "SEX M5M6"]
                        }

            ]
        },
        {
            "codigo": "IME02-10818",
            "nome": "Álgebra Linear",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10818",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME02-10818 1 2025/1",
                            "horario": ["TER T6N1N2", "QUI T6N1N2"]
                        }

            ]
        },
        {
            "codigo": "IME04-10834",
            "nome": "Estrutura de Linguagens",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10834",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "IME04-10834 1 2025/1",
                            "horario": ["TER M5M6", "QUI M5M6"]
                        }
            ]
        },
        {
            "codigo": "FIS01-10982",
            "nome": "Física I",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10982",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "FIS01-10982 1 2025/1",
                            "horario": ["TER M1M2", "QUI M1M2", "SEX M3M4"]
                        }

            ]
        },
        {
            "codigo": "FIS03-10983",
            "nome": "Física II",
            "ementa": "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10983",
            "turmas":[
                        {
                            "numero": 1,
                            "turmaID": "FIS03-10983 1 2025/1",
                            "horario": ["SEG M5M6", "QUI M3M4", "SEX M5M6"]
                        }
                        
            ]
        }
    ]
}

function preencherTabelaHorarios() {
  try {
    // Obter docente logado
    const usuario = JSON.parse(localStorage.getItem('usuarioAutenticado') || "[]");
    const docenteMatricula = usuario.matricula;

    // Encontrar docente atual
    const docenteAtual = dadosCompletos.docentes.find(d => d.matricula === docenteMatricula);
    
    if (!docenteAtual) {
      console.error("Docente não encontrado");
      return;
    }

    // Limpar tabela
    const limparTabela = () => {
      const cells = document.querySelectorAll('#timetable td');
      cells.forEach(td => td.textContent = '');
    };
    limparTabela();

    // Preencher tabela
    docenteAtual.turmas.forEach(turmaDocente => {
      // Encontrar disciplina correspondente
      const disciplina = dadosCompletos.disciplinas.find(d => d.codigo === turmaDocente.disciplina);
      if (!disciplina) return;

      // Encontrar turma específica
      const turma = disciplina.turmas.find(t => t.turmaID === turmaDocente.turmaID);
      if (!turma) return;

      // Formatar código com número circulado
      const codigoComTurma = `${disciplina.codigo} ${numeroParaCirculado(turmaDocente.turma)}`;

      // Processar horários
      turma.horario.forEach(horario => {
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