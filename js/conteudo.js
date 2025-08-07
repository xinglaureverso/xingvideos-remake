// Abrir popup de envio
document.getElementById("postar-btn").addEventListener("click", () => {
  document.getElementById("popup-postar").classList.remove("hidden");
});

// Carregamento de vídeos salvos
window.onload = () => {
  const user = localStorage.getItem("loggedInUser");
  const videos = JSON.parse(localStorage.getItem(`videos_${user}`)) || [];

  const container = document.querySelector(".video-list");
  const semVideos = document.getElementById("sem-videos");

  if (videos.length > 0) {
    semVideos.style.display = "none";
    videos.forEach(video => {
      const div = document.createElement("div");
      div.className = "video-item";
      div.innerHTML = `
        <a href="player.html?video=${video.id}" target="_blank">
          <img src="${video.thumb}" alt="Thumbnail">
          <h3>${video.title}</h3>
        </a>
        <p>${video.views} visualizações</p>
      `;
      container.appendChild(div);
    });
  }
};

// Fechar popup
function fecharPopup() {
  document.getElementById("popup-postar").classList.add("hidden");
}

// Selecionar arquivo
document.querySelector(".select-btn").addEventListener("click", () => {
  document.getElementById("video-input").click();
});

// Pré-visualização e geração de link
document.getElementById("video-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    alert(`Arquivo selecionado: ${file.name}`);

    // Gera ID único para o vídeo
    const videoId = Math.random().toString(36).substring(7);
    const fakeLink = `player.html?video=${videoId}`;

    // Exibe link gerado
    document.getElementById("video-link").href = fakeLink;
    document.getElementById("video-link").textContent = fakeLink;
    document.getElementById("video-link").dataset.id = videoId;

    // Avança para etapa de detalhes
    document.querySelector(".upload-popup").classList.add("hidden");
    document.getElementById("etapa-detalhes").classList.remove("hidden");
  }
});

// Voltar para etapa de upload
function voltarUpload() {
  document.getElementById("etapa-detalhes").classList.add("hidden");
  document.querySelector(".upload-popup").classList.remove("hidden");
}

// Salvar vídeo
function salvarVideo() {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const link = document.getElementById("video-link").href;
  const id = document.getElementById("video-link").dataset.id;
const link = `${id}.mp4`;

  if (!titulo) return alert("O título é obrigatório.");

  const user = localStorage.getItem("loggedInUser");
  const videos = JSON.parse(localStorage.getItem(`videos_${user}`)) || [];

  videos.push({
    id: id,
    title: titulo,
    description: descricao,
    link: link,
    thumb: "assets/thumb-default.png",
    views: 0
  });

  localStorage.setItem(`videos_${user}`, JSON.stringify(videos));
  alert("Vídeo publicado com sucesso!");
  location.reload();
}
