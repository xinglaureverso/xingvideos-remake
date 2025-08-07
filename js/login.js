// auth.js

// Função de cadastro
function registerUser() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;

  if (!username || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    alert("Usuário já existe.");
    return;
  }

  users[username] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

// Função de login
function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username].password === password) {
    localStorage.setItem("loggedInUser", username);
    alert("Login bem-sucedido!");
    window.location.href = "studio.html"; // ou outra página
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

// Função de logout
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Verifica se está logado
function checkLogin() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
  }
}
