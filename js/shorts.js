const videos = ["1.mp4", "2.mp4", "3.mp4"]; // lista de shorts
let current = 0;
const player = document.getElementById("shortPlayer");

function loadVideo(index) {
  current = index;
  player.src = `../assets/shorts/${videoFile}`;
  player.play();
}

document.getElementById("nextBtn").onclick = () => {
  if (current < videos.length - 1) loadVideo(current + 1);
};

document.getElementById("prevBtn").onclick = () => {
  if (current > 0) loadVideo(current - 1);
};

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    player.paused ? player.play() : player.pause();
  }
  if (e.key.toLowerCase() === "m") {
    player.muted = !player.muted;
  }
  if (e.key === "ArrowDown") {
    if (current < videos.length - 1) loadVideo(current + 1);
  }
  if (e.key === "ArrowUp") {
    if (current > 0) loadVideo(current - 1);
  }
});

loadVideo(current); // inicia com o primeiro short
