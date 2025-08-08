// Extrai o ID do vídeo da URL
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("video");

// Simulação de vídeos locais
const localVideos = {
  1: {
    title: "1 Vídeo",
    src: "../assets/videos/1.mp4",
    description: "Esse é o vídeo local número 1",
    views: 10,
    likes: 5,
    comments: []
  },
  2: {
    title: "Vídeo Local 2",
    src: "../assets/videos/video2.mp4",
    description: "Esse é o vídeo local número 2",
    views: 0,
    likes: 0,
    comments: []
  }
};

// Busca vídeos postados no localStorage
const postedVideos = JSON.parse(localStorage.getItem("videos")) || {};

// Junta os dois
const allVideos = { ...localVideos, ...postedVideos };

// Verifica se o vídeo existe
const videoData = allVideos[videoId];

if (!videoData) {
  document.body.innerHTML = `<h2>Esse vídeo ou usuário ${videoId} não existe 😢</h2>`;
} else {
  // Atualiza o player
  const player = document.getElementById("player");
  player.src = videoData.src;

  // Atualiza informações visuais
  document.getElementById("video-title").textContent = videoData.title;
  document.getElementById("video-description").textContent = videoData.description;
  document.getElementById("video-views").textContent = `${videoData.views} visualizações`;
  document.getElementById("like-count").textContent = videoData.likes;

  // Incrementa visualizações
  videoData.views++;
  document.getElementById("video-views").textContent = `${videoData.views} visualizações`;

  // Atualiza no localStorage se for vídeo postado
  if (postedVideos[videoId]) {
    postedVideos[videoId] = videoData;
    localStorage.setItem("videos", JSON.stringify(postedVideos));
  }

  // Like button
  document.getElementById("like-btn").addEventListener("click", () => {
    videoData.likes++;
    document.getElementById("like-count").textContent = videoData.likes;

    if (postedVideos[videoId]) {
      postedVideos[videoId] = videoData;
      localStorage.setItem("videos", JSON.stringify(postedVideos));
    }
  });

  // Comentários
  const commentList = document.getElementById("comment-list");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");

  function renderComments() {
    commentList.innerHTML = "";
    videoData.comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment;
      commentList.appendChild(li);
    });
  }

  renderComments();

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const comment = commentInput.value.trim();
    if (comment) {
      videoData.comments.push(comment);
      commentInput.value = "";
      renderComments();

      if (postedVideos[videoId]) {
        postedVideos[videoId] = videoData;
        localStorage.setItem("videos", JSON.stringify(postedVideos));
      }
    }
  });
}
document.addEventListener("keydown", (e) => {
  const player = document.getElementById("player");

  switch (e.key) {
    case " ": // Espaço
      e.preventDefault();
      player.paused ? player.play() : player.pause();
      break;
    case "ArrowRight":
      player.currentTime += 5;
      break;
    case "ArrowLeft":
      player.currentTime -= 5;
      break;
    case "ArrowUp":
      player.volume = Math.min(player.volume + 0.1, 1);
      break;
    case "ArrowDown":
      player.volume = Math.max(player.volume - 0.1, 0);
      break;
    case "f":
    case "F":
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
      break;
    case "m":
    case "M":
      player.muted = !player.muted;
      break;
    default:
      // Teclas numéricas 0–9 para pular para % do vídeo
      if (!isNaN(e.key) && e.key >= "0" && e.key <= "9") {
        const percent = parseInt(e.key) / 10;
        player.currentTime = player.duration * percent;
      }
      break;
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menu-button");

  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});
