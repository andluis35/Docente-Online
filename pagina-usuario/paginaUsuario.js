let janelaAberta = false;

export function constroiPaginaUsuario(usuario) {
    if (!janelaAberta) {
        const pagina = document.getElementById("usuario-container");
        const componente = constroiPagina(usuario) 
        pagina.innerHTML = componente;
        console.log(pagina)
        
        const btnFechar = pagina.querySelector("#btn-fechar");
        const btnSalvar = pagina.querySelector("#btn-salvar");
        
        const telInput1 = document.getElementById('tel-1');
        const telInput2 = document.getElementById('tel-2');

        const emailInput1 = document.getElementById('email-input-1');
        const emailInput2 = document.getElementById('email-input-2');
        
        const cepInput = document.getElementById('cep-input');        
        

        mascaraTelefone(telInput1);
        mascaraTelefone(telInput2);
        mascaraCEP(cepInput);

        console.log(btnFechar)
        btnFechar.addEventListener("click", () => {
            fecharPagina(pagina);
            pagina.innerHTML = ""
        })
        btnSalvar.addEventListener("click", () => {
            fecharPagina(pagina);
            pagina.innerHTML = ""
        })

        abrirPagina(pagina);
    }
}



function abrirPagina(pagina) {
  pagina.classList.add('pg-user-mostrar');
  console.log("ABRIR!")
  janelaAberta = true;
}

function fecharPagina(pagina) {
  pagina.classList.remove('pg-user-mostrar');
    console.log("FECHAR!")
  janelaAberta = false
}


function mascaraTelefone(input) {
  input.addEventListener('input', function(event) {
    let valor = event.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor.length > 10) { 
      valor = valor.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (valor.length > 6) { 
      valor = valor.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (valor.length > 2) { 
      valor = valor.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else { 
      valor = valor.replace(/^(\d*)/, '($1');
    }
    event.target.value = valor;
  });
}

function mascaraCEP(input) {
  input.addEventListener('input', function(event) {
    let valor = event.target.value;
    
    valor = valor.replace(/\D/g, '');

    if (valor.length > 8) {
      valor = valor.substring(0, 8);
    }

    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
    }
    event.target.value = valor;
  });
}

function constroiPagina(usuario) {
    return `
<div id="janela-visivel">
    <div class="pg-user-body">
    
        <div class="button-container">
            <a id="btn-fechar" href="#">
                <svg class="pg_user_icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                </svg>
            </a>
        </div>
        <div class="info-container">
        <div 
        style="display: grid; 
        grid-template-columns: max-content 1fr; 
        gap: 4px 6vh; 
        text-align: left;"
        >
        <span><strong>NOME:</strong></span>   <span>${usuario.nome}</span>
        <span><strong>CPF:</strong></span>     <span>${usuario.cpf}</span>
        <span><strong>MATRICULA:</strong></span>    <span>${usuario.matricula}</span>
        <span><strong>INGRESSO:</strong></span>  <span>${usuario.admissao}</span>
        </div>
        <img 
            id="profile-pic" 
            src="${usuario.foto}" 
            alt="Foto de perfil"
        >
        </div>
        <br><br>
        <div class="formularios">
            <h1>Dados para contato</h1>
            <h3 style="white-space: pre;"><strong>Mantenha atualizado o seu cadastro.</strong> \nCorrija ou complemente os dados abaixo.</h3>
            <form class="user-form tel-form form-duplo">
                <input id="tel-1" type="tel" class="tel" placeholder="Telefone 1*">
                <input id="tel-2" type="tel" class="tel" placeholder="Telefone 2" >
            </form>
            <form class="user-form email-form form-duplo">
                <input type="email" id="email-input-1" placeholder="E-mail 1*">
                <input type="email" id="email-input-2" placeholder="E-mail 2">
            </form>
            <form class="user-form">
                <div class="address_field">
                    <input id="cep-input" type="text" placeholder="CEP" id="user-cpf" alt="cep">
                    <input id="uf-input" type="text" placeholder="RJ" maxlength="2">
                    <select placeholder="UF" id="uf-select"></select>
                </div>
                <input type="text" placeholder="Municipio"  alt="municipio">
                <input type="text" placeholder="Bairro" alt="bairro">
            </form>
        </div>
    </div>
    <div class="user-pg-botton-btn-container">
        <a id="btn-salvar" href="#">SALVAR</a>
    </div>
</div>
    `;
}