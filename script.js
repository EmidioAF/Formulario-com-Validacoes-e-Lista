// Elementos
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');
const telefone = document.getElementById('telefone');
const termos = document.getElementById('termos');
const salvarBtn = document.getElementById('salvarBtn');
const usuariosLista = document.getElementById('usuariosLista');

// Mensagens de erro
const nomeErro = document.getElementById('nomeErro');
const emailErro = document.getElementById('emailErro');
const senhaErro = document.getElementById('senhaErro');
const confirmarErro = document.getElementById('confirmarErro');
const termosErro = document.getElementById('termosErro');

// Validação simples de e-mail
function validaEmail(valor) {
  return /\S+@\S+\.\S+/.test(valor);
}

// Validação de senha: 8+ caracteres, letras e números
function validaSenha(s) {
  return s.length >= 8 && /[a-zA-Z]/.test(s) && /\d/.test(s);
}

// Máscara telefone (formato BR: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
telefone.addEventListener('input', () => {
  let valor = telefone.value.replace(/\D/g,'');
  if (valor.length > 10) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{4,5})(\d{0,4}).*/, "($1) $2-$3");
  }
  telefone.value = valor.trim();
});

// Validação em tempo real
function validarForm() {
  // Nome
  if (nome.value.length < 3) {
    nomeErro.textContent = "Mínimo 3 caracteres";
    var vNome = false;
  } else {
    nomeErro.textContent = "";
    var vNome = true;
  }

  // E-mail
  if (!validaEmail(email.value)) {
    emailErro.textContent = "E-mail inválido";
    var vEmail = false;
  } else {
    emailErro.textContent = "";
    var vEmail = true;
  }

  // Senha
  if (!validaSenha(senha.value)) {
    senhaErro.textContent = "Mínimo 8 caracteres, letras e números";
    var vSenha = false;
  } else {
    senhaErro.textContent = "";
    var vSenha = true;
  }

  // Confirmar senha
  if (confirmarSenha.value !== senha.value || confirmarSenha.value.length === 0) {
    confirmarErro.textContent = "Senhas diferentes";
    var vConfirmar = false;
  } else {
    confirmarErro.textContent = "";
    var vConfirmar = true;
  }

  // Termos
  if (!termos.checked) {
    termosErro.textContent = "Obrigatório aceitar";
    var vTermos = false;
  } else {
    termosErro.textContent = "";
    var vTermos = true;
  }

  // Botão só habilitado se todos válidos
  salvarBtn.disabled = !(vNome && vEmail && vSenha && vConfirmar && vTermos);
  return vNome && vEmail && vSenha && vConfirmar && vTermos;
}

// Validar em tempo real
[nome, email, senha, confirmarSenha, termos].forEach(el => {
  el.addEventListener('input', validarForm);
  el.addEventListener('change', validarForm);
});

// Salvar usuário na lista
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (validarForm()) {
    const li = document.createElement('li');
    li.textContent = `${nome.value} - ${email.value}`;
    usuariosLista.appendChild(li);
    // Limpar form
    this.reset();
    telefone.value = '';
    validarForm();
  }
});
