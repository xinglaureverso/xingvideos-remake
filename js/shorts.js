// Lista de vídeos disponíveis
const shortsData = {
  banana: {
    src: "../assets/shorts/banana.mp4",
    title: "3 NÍVEIS DE BANANA!",
    channel: "@CheffOtto",
    likes: "376 mil",
    comments: "5.163"
  },
  segundo: {
    src: "videos/segundo.mp4",
    title: "SEGUNDO VÍDEO",
    channel: "@OutroCanal",
    likes: "1.200",
    comments: "300"
  }
};

// Pega o parâmetro da URL
const params = new URLSearchParams(window.location.search);
const videoKey = params.get("video");

// Elementos
const player = document.getElementById("shorts-player");
const title = document.getElementById("video-title");
const channel = document.getElementById("video-channel");
const likeCount = document.getElementById("like-count");
const commentCount = document.getElementById("comment-count");

// Carrega o vídeo
if (videoKey && shortsData[videoKey]) {
  const data = shortsData[videoKey];
  player.src = data.src;
  title.textContent = data.title;
  channel.textContent = data.channel;
  likeCount.textContent = data.likes;
  commentCount.textContent = data.comments;
} else {
  title.textContent = "Vídeo não encontrado";
  channel.textContent = "@Desconhecido";
}

// Atalhos de teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "l") alert("Você curtiu!");
  if (e.key === "c") alert("Abrir comentários...");
  if (e.key === "s") alert("Compartilhar vídeo...");
});
