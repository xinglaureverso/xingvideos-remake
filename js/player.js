document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoName = urlParams.get("video") || "1.mp4"; // padrão se não tiver nada
  const video = document.getElementById("player");

  video.src = `assets/videos/${videoName}`;

  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      e.preventDefault();
      video.paused ? video.play() : video.pause();
    }
    if (e.key.toLowerCase() === "m") {
      video.muted = !video.muted;
    }
    if (e.key.toLowerCase() === "f") {
      if (video.requestFullscreen) video.requestFullscreen();
    }
  });
});
