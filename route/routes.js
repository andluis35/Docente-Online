export class Navigate {
  static root() {
    window.location.href = '/';
  }
  static login() {
    window.location.href = '/login';
  }
  static home() {
    window.location.href = '/pagina-principal/home.html';
  }
  static disciplinas() {
    window.location.href = '/disciplinas-periodo/disciplinas.html';
  }
  static discentes() {
    window.location.href = '/discentes-com-matricula-ativa-na-disciplina/discentes-com-matricula-ativa-na-disciplina.html';
  }
  static painel() {
    window.location.href = '/painel';
  }
}