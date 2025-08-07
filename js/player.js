document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("video");
  const user = localStorage.getItem("loggedInUser");

  if (!videoId || !user) {
    document.body.innerHTML = "<h2>❌ Vídeo ou usuário não encontrado.</h2>";
    return;
  }

  const videos = JSON.parse(localStorage.getItem(`videos_${user}`)) || [];
  const videoData = videos.find(v => v.id === videoId);

  if (!videoData) {
    document.body.innerHTML = `<h2>❌ Vídeo com ID <strong>${videoId}</strong> não encontrado.</h2>`;
    return;
  }

  // Atualiza visualizações
  videoData.views++;
  localStorage.setItem(`videos_${user}`, JSON.stringify(videos));

  // Preenche dados
  document.getElementById("video-title").textContent = videoData.title;
  document.getElementById("video-description").textContent = videoData.description;
  document.getElementById("view-count").textContent = videoData.views;
  document.getElementById("video-source").src = `assets/videos/${videoId}.mp4`;

  // Atalhos de teclado
  const video = document.getElementById("player");
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

  // Like system
  const likeBtn = document.getElementById('like-btn');
  const likeCount = document.getElementById('like-count');
  let likes = 0;

  likeBtn.addEventListener('click', () => {
    likes++;
    likeCount.textContent = likes;
  });

  // Comment system
  const commentForm = document.getElementById('comment-form');
  const commentInput = document.getElementById('comment-input');
  const commentList = document.getElementById('comment-list');

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (text !== '') {
      const li = document.createElement('li');
      li.textContent = `👤 Usuário: ${text}`;
      commentList.appendChild(li);
      commentInput.value = '';
    }
  });
});
