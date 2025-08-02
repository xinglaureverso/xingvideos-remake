const slug = new URLSearchParams(window.location.search).get("=");
const videoElement = document.getElementById("player");

fetch("data/videos.json")
  .then(res => res.json())
  .then(data => {
    const video = data.find(v => v.slug === slug) || data.find(v => v.slug === "erro_busca");
    videoElement.src = `assets/videos/${video.file}`;
  });

// Controles por teclado
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    videoElement.paused ? videoElement.play() : videoElement.pause();
  }
  if (e.key.toLowerCase() === "m") {
    videoElement.muted = !videoElement.muted;
  }
});
