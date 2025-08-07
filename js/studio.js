// studio.js

function loadStudio() {
  checkLogin(); // do auth.js

  const user = localStorage.getItem("loggedInUser");
  const profileData = JSON.parse(localStorage.getItem(`profile_${user}`)) || {};

  // Nome do canal
  const channelName = profileData.name || "Seu Canal";
  document.getElementById("channel-name").textContent = channelName;

  // Foto de perfil
  const profilePic = profileData.photo || "../assets/login.jpg";
  document.getElementById("profile-pic").src = profilePic;
}
