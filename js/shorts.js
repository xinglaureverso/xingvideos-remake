// Lista de IDs dos shorts disponíveis
const shortsList = [
  "1",
  "2",
  "AbCdEf456"
];

let currentIndex = 0;

// Função para carregar o short atual
function loadShort(index) {
  const shortId = shortsList[index];
  const video = document.getElementById("shortPlayer");
  video.src = `/assets/shorts/${shortId}.mp4`;
}

// Botão: anterior
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + shortsList.length) % shortsList.length;
  loadShort(currentIndex);
});

// Botão: próximo
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % shortsList.length;
  loadShort(currentIndex);
});

// Botão: curtir
document.getElementById("likeBtn").addEventListener("click", () => {
  alert("Você curtiu esse short!");
});

// Botão: não curtir
document.getElementById("dislikeBtn").addEventListener("click", () => {
  alert("Você não curtiu esse short.");
});

// Botão: compartilhar
document.getElementById("shareBtn").addEventListener("click", () => {
  const shortId = shortsList[currentIndex];
  const url = `${window.location.origin}/shorts?q=${shortId}`;
  navigator.clipboard.writeText(url);
  alert("Link copiado para a área de transferência!");
});

// Botão: comentários
document.getElementById("commentBtn").addEventListener("click", () => {
  alert("Sistema de comentários em breve!");
});

// Botão: menu lateral
document.getElementById("menuBtn").addEventListener("click", () => {
  window.location.href = "/menu.html"; // ou a página principal do remake
});

// Carrega o primeiro short ao abrir
loadShort(currentIndex);
