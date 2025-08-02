const slug = new URLSearchParams(window.location.search).get("=");
fetch("data/shorts.json")
  .then(res => res.json())
  .then(data => {
    const short = data.find(v => v.slug === slug);
    if (!short) return;

    const container = document.getElementById("shortContainer");
    container.innerHTML = `
      <div class="video-wrapper">
        <video src="assets/shorts/${short.file}" autoplay muted loop></video>
        <div class="overlay">
          <div class="title">${short.title}</div>
          <div class="profile">
            <img src="assets/profiles/${short.music}" alt="Foto de perfil musical">
            <span>${short.username}</span>
          </div>
        </div>
        <div class="actions">
          <button onclick="likeShort()">👍</button>
          <button onclick="dislikeShort()">👎</button>
          <button onclick="shareShort()">🔗</button>
        </div>
      </div>
    `;
  });

function likeShort() {
  alert("Você deu LIKE na marmita 💥");
}

function dislikeShort() {
  alert("Você deu DISLIKE... marmita fria 😬");
}

function shareShort() {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copiado! Compartilha no zap da firma 🤝");
}
