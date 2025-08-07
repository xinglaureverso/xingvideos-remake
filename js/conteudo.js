// conteudo.js

document.getElementById("postar-btn").addEventListener("click", () => {
  document.getElementById("popup-postar").classList.remove("hidden");
});

// Exemplo de carregamento de vídeos (fictício)
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
        <img src="${video.thumb}" alt="Thumbnail">
        <h3>${video.title}</h3>
        <p>${video.views} visualizações</p>
      `;
      container.appendChild(div);
    });
  }
};
function fecharPopup() {
  document.getElementById("popup-postar").classList.add("hidden");
}

document.querySelector(".select-btn").addEventListener("click", () => {
  document.getElementById("video-input").click();
});

document.getElementById("video-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    alert(`Arquivo selecionado: ${file.name}`);
    // Aqui você pode adicionar lógica para salvar ou pré-visualizar o vídeo
  }
});
document.getElementById("video-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    // Simula geração de link
    const fakeLink = "https://xingvids.com/watch/" + Math.random().toString(36).substring(7);
    document.getElementById("video-link").href = fakeLink;
    document.getElementById("video-link").textContent = fakeLink;

    // Avança para etapa de detalhes
    document.querySelector(".upload-popup").classList.add("hidden");
    document.getElementById("etapa-detalhes").classList.remove("hidden");
  }
});

function voltarUpload() {
  document.getElementById("etapa-detalhes").classList.add("hidden");
  document.querySelector(".upload-popup").classList.remove("hidden");
}

function salvarVideo() {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const link = document.getElementById("video-link").href;

  if (!titulo) return alert("O título é obrigatório.");

  const user = localStorage.getItem("loggedInUser");
  const videos = JSON.parse(localStorage.getItem(`videos_${user}`)) || [];

  videos.push({
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
