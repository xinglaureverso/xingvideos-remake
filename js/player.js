// player.js
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoFile = urlParams.get("video") || "1.mp4";
  const video = document.getElementById("player");

  video.src = videoFile;

  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      e.preventDefault(); // impedir scroll
      video.paused ? video.play() : video.pause();
    }
    if (e.key.toLowerCase() === "m") {
      video.muted = !video.muted;
    }
    if (e.key.toLowerCase() === "f") {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
    }
  });
});
