async function preencherTabelaHorarios() {
  try {
    // Obter docente logado
    const usuario = JSON.parse(localStorage.getItem('usuarioAutenticado') || "[]");
    const docenteMatricula = usuario.matricula;

    // Carregar turmas do docente
    const docentesTurmas = await fetch("../../data/docentes-turmas.json").then(r => r.json());
    const docenteAtual = docentesTurmas.docentes.find(d => d.matricula === docenteMatricula);
    
    if (!docenteAtual) {
      console.error("Docente não encontrado");
      return;
    }

    // Criar mapa de turmas do docente {turmaID: numeroTurma}
    const turmasDocenteMap = new Map();
    docenteAtual.turmas.forEach(turma => {
      turmasDocenteMap.set(turma.turmaID, turma.turma);
    });

    // Carregar disciplinas
    const { disciplinas } = await fetch("../../data/NOVO-disciplinas.json").then(r => r.json());

    // Limpar tabela
    document.querySelectorAll('#timetable td').forEach(td => td.textContent = '');

    // Preencher tabela apenas com turmas atribuídas
    disciplinas.forEach(disciplina => {
      disciplina.turmas.forEach(turma => {
        // Verifica se esta turma específica está atribuída ao docente
        if (turmasDocenteMap.has(turma.turmaID)) {
          const numeroTurma = turmasDocenteMap.get(turma.turmaID);
          const codigoComTurma = `${disciplina.codigo} ${numeroParaCirculado(numeroTurma)}`;
          
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
        }
      });
    });
  } catch (error) {
    console.error("Erro ao preencher tabela:", error);
  }
}

// Função para números circulados (mantida igual)
function numeroParaCirculado(numero) {
  const circulados = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
  if (numero >= 0 && numero <= 10) return circulados[numero];
  return numero.toString().split('').map(d => circulados[parseInt(d)]).join('');
}