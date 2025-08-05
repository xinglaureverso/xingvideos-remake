let users = JSON.parse(localStorage.getItem("xingUsers")) || {};

function register() {
  const newUser = document.getElementById("newUser").value;
  const newPass = document.getElementById("newPass").value;
  const status = document.getElementById("status");

  if (!newUser || !newPass) {
    status.textContent = "Preencha todos os campos.";
    return;
  }

  if (users[newUser]) {
    status.textContent = "Usuário já existe!";
    return;
  }

  users[newUser] = newPass;
  localStorage.setItem("xingUsers", JSON.stringify(users));
  status.textContent = "Cadastro realizado com sucesso!";
}
