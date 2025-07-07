const getBasePath = () => {
  const { hostname, pathname } = window.location;

  if (hostname.endsWith("github.io")) {
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments.length > 0 ? pathSegments[0] : "";
  }
  return "";
};

const BASE_PATH = getBasePath();

function fullPath(relativePath) {
  const cleanRelativePath = relativePath.startsWith("/")
    ? relativePath.substring(1)
    : relativePath;
  return BASE_PATH
    ? `/${BASE_PATH}/${cleanRelativePath}`
    : `/${cleanRelativePath}`;
}

export class Navigate {
  static root() {
    window.location.href = BASE_PATH ? `/${BASE_PATH}/` : "/";
  }

  static login() {
    window.location.href = fullPath("login");
  }

  static home() {
    window.location.href = fullPath("pagina-principal/home.html");
  }

  // static disciplinas() {
  //   window.location.href = fullPath('disciplinas-periodo/disciplinas.html');
  // }

  //layout da página de disciplinas do período
  static disciplinas() {
    window.location.href = fullPath("pagina-principal/subjects.html");
  }

  static discentes() {
    window.location.href = fullPath(
      "discentes-com-matricula-ativa-na-disciplina/index.html"
    );
  }

  static notasEFaltas() {
    window.location.href = fullPath("registro-de-notas-e-faltas/index.html");
  }

  static painel() {
    window.location.href = fullPath("painel");
  }
}
