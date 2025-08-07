document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoName = urlParams.get("video");
  const video = document.getElementById("player");

  // Verifica se o vídeo existe na lista de vídeos salvos
  let found = false;
  const allUsers = Object.keys(localStorage).filter(k => k.startsWith("videos_"));

  for (const key of allUsers) {
    const videos = JSON.parse(localStorage.getItem(key));
    if (videos.some(v => v.link.includes(videoName))) {
      found = true;
      break;
    }
  }

  if (videoName && found) {
    video.src = `assets/videos/${videoName}.mp4`;
  } else {
    document.body.innerHTML = `<h2>❌ Vídeo não encontrado.</h2>
      <p>O vídeo com ID <strong>${videoName || "desconhecido"}</strong> não existe ou foi removido.</p>`;
    return;
  }

  // Atalhos de teclado
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

  // Like button
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

  // Share popup
  const shareBtn = document.getElementById('share-btn');
  const sharePopup = document.getElementById('share-popup');
  const closeShare = document.getElementById('close-share');

  shareBtn.addEventListener('click', () => {
    sharePopup.style.display = 'block';
  });
  closeShare.addEventListener('click', () => {
    sharePopup.style.display = 'none';
  });

  // Embed code
  const embedBtn = document.getElementById('embed-btn');
  const embedCode = document.getElementById('embed-code');

  embedBtn.addEventListener('click', () => {
    const iframe = `<iframe src="${window.location.href}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
    embedCode.value = iframe;
  });

  // Copy link
  const copyBtn = document.getElementById('copy-btn');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('🔗 Link copiado!'))
      .catch(() => alert('❌ Erro ao copiar'));
  });
});
