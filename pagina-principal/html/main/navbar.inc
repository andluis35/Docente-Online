<nav class="navbar navbar-expand-lg navbar-dark bg-uerj-azul-escuro rounded">
    <a class="navbar-brand btn-home" href="#">
      <img
        src="../assets/png/logo-branca.png"
        class="img-fluid"
        alt="Logo UERJ"
        style="max-height: 100px"
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbars"
      aria-controls="navbars"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbars">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">


<li class="nav-item d-flex align-items-center ms-2">

</li>







        <li class="nav-item">
          <a
            class="nav-link text-white active btn-disciplinas-periodo"
            aria-current="page"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-alarm-fill"
              viewBox="0 0 25 25"
            >
              <title>table-clock</title>
              <path
                d="M16.5 15.82L18.94 17.23L18.19 18.53L15 16.69V13H16.5V15.82M20 10.26V5C20 3.9 19.11 3 18 3H4C2.9 3 2 3.9 2 5V17C2 18.11 2.9 19 4 19H9.68C10.81 21.36 13.21 23 16 23C19.87 23 23 19.87 23 16C23 13.62 21.81 11.53 20 10.26M18 7V9.29C17.37 9.11 16.7 9 16 9C14.5 9 13.13 9.47 12 10.26V7H18M4 7H10V11H4V7M4 17V13H9.68C9.25 13.91 9 14.93 9 16C9 16.34 9.03 16.67 9.08 17H4M16 21C13.24 21 11 18.76 11 16S13.24 11 16 11 21 13.24 21 16 18.76 21 16 21Z"
              />
            </svg>
            Disciplinas do período
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white active btn-discentes-ativos"
            aria-current="page"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-people-fill"
              viewBox="0 0 25 25"
            >
              <title>account-group</title>
              <path
                d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"
              />
            </svg>
            Discentes com matrícula ativa na disciplina
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white active btn-registro-notas"
            aria-current="page"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-clipboard2-check-fill"
              viewBox="0 0 25 25"
            >
              <title>clipboard-check-outline</title>
              <path
                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
              />
            </svg>
            Registro de notas e faltas
          </a>
        </li>

<li class="nav-item d-flex align-items-center ms-2">
      <button
    id="btn-docente-discip"
    class="btn btn-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasList"
    aria-label="Abrir lista de disciplinas"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
</svg></i> Lista de Disciplinas
  </button>
</li>



      </ul>
    </div>
  </div>
</nav>
