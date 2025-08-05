let users = JSON.parse(localStorage.getItem("xingUsers")) || {};

function recover() {
  const recoverUser = document.getElementById("recoverUser").value;
  const status = document.getElementById("status");

  if (!recoverUser) {
    status.textContent = "Digite o nome de usuário.";
    return;
  }

  if (users[recoverUser]) {
    status.textContent = `Senha de ${recoverUser}: ${users[recoverUser]}`;
  } else {
    status.textContent = "Usuário não encontrado.";
  }
}
