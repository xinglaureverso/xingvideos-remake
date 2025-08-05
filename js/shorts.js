// Lista de vídeos disponíveis
const videos = ["1.mp4", "2.mp4", "3.mp4"];
let current = 0;

// Seleciona o player
const player = document.getElementById("shortPlayer");

// Lê o parâmetro da URL
const params = new URLSearchParams(window.location.search);
const videoParam = params.get("video");

// Função para carregar vídeo
function loadVideo(indexOrFile) {
  let src;
  if (typeof indexOrFile === "string") {
    src = `assets/shorts/${indexOrFile}`;
  } else {
    current = indexOrFile;
    src = `assets/shorts/${videos[current]}`;
  }
  player.src = src;
  player.play();
}

// Botões de navegação
document.getElementById("nextBtn").onclick = () => {
  if (current < videos.length - 1) loadVideo(current + 1);
};

document.getElementById("prevBtn").onclick = () => {
  if (current > 0) loadVideo(current - 1);
};

// Atalhos de teclado
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " ":
      e.preventDefault();
      player.paused ? player.play() : player.pause();
      break;
    case "m":
    case "M":
      player.muted = !player.muted;
      break;
    case "ArrowDown":
      if (current < videos.length - 1) loadVideo(current + 1);
      break;
    case "ArrowUp":
      if (current > 0) loadVideo(current - 1);
      break;
  }
});

// Carrega vídeo inicial
if (videoParam) {
  loadVideo(videoParam);
} else {
  loadVideo(current);
}
