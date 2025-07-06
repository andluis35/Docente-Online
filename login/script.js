import { Navigate } from "../route/routes.js";
import { getSession , rememberAuthUser } from "../auth/auth.js"

const inputMatriculaCpf = document.getElementById('matriculaCpf');

if (getSession()) {
  Navigate.root()
}


// Máscara para matrícula (6 dígitos) e CPF (11 dígitos)
inputMatriculaCpf.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, ''); // remove tudo que não for número

  if (value.length <= 6) {
    // Formato matrícula #####-#
    value = value.replace(/^(\d{5})(\d{0,1})/, '$1-$2');
  } else {
    // Formato CPF ###.###.###-##
    value = value.slice(0, 11); // limita a 11 dígitos
    value = value.replace(/^(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/, function (_, p1, p2, p3, p4) {
      let result = p1;
      if (p2) result += '.' + p2;
      if (p3) result += '.' + p3;
      if (p4) result += '-' + p4;
      return result;
    });
  }

  this.value = value;
  });

  document.addEventListener('DOMContentLoaded', function () {
  const inputUsuario = document.getElementById('matriculaCpf');
  const inputSenha = document.getElementById('senha');
  const botao = document.querySelector('button');

  botao.addEventListener('click', function () {
    const usuarioDigitado = inputUsuario.value.trim();
    const senhaDigitada = inputSenha.value.trim();

    fetch('../data/usuarios.json')
      .then(response => response.json())
      .then(usuarios => {
        const usuarioEncontrado = usuarios.find(user =>
          (user.cpf === usuarioDigitado || user.matricula === usuarioDigitado ) && user.senha === senhaDigitada 
        );

        if (usuarioEncontrado) {
          rememberAuthUser(usuarioEncontrado);
          Navigate.root();
        } else {
          alert('Usuário ou senha inválidos.');
        }
      })
      .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
        alert('Erro ao autenticar. Tente novamente.');
      });
  });
});
