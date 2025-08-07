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
