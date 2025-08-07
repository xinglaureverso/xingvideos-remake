document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("video");

  const videoEl = document.getElementById("player");
  const titleEl = document.getElementById("video-title");
  const descEl = document.getElementById("video-description");
  const viewsEl = document.getElementById("video-views");
  const likeBtn = document.getElementById("like-btn");
  const likeCount = document.getElementById("like-count");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("comment-list");

  let foundVideo = null;
  let videoKey = null;

  // Procurar vídeo em todos os usuários
  const allUsers = Object.keys(localStorage).filter(k => k.startsWith("videos_"));
  for (const key of allUsers) {
    const videos = JSON.parse(localStorage.getItem(key));
    const match = videos.find(v => v.id === videoId);
    if (match) {
      foundVideo = match;
      videoKey = key;
      break;
    }
  }

  if (!foundVideo) {
    document.body.innerHTML = `<h2>❌ Vídeo não encontrado.</h2>
      <p>O vídeo com ID <strong>${videoId || "desconhecido"}</strong> não existe ou foi removido.</p>`;
    return;
  }

  // Atualizar visualizações
  foundVideo.views++;
  atualizarVideo(videoKey, foundVideo);

  // Exibir dados
  videoEl.src = `uploads/${foundVideo.link}`;
  titleEl.textContent = foundVideo.title;
  descEl.textContent = foundVideo.description;
  viewsEl.textContent = `${foundVideo.views} visualizações`;
  likeCount.textContent = foundVideo.likes;

  // Exibir comentários
  foundVideo.comments.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `👤 ${c}`;
    commentList.appendChild(li);
  });

  // Curtir
  likeBtn.addEventListener("click", () => {
    foundVideo.likes++;
    likeCount.textContent = foundVideo.likes;
    atualizarVideo(videoKey, foundVideo);
  });

  // Comentar
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (text !== "") {
      foundVideo.comments.push(text);
      const li = document.createElement("li");
      li.textContent = `👤 ${text}`;
      commentList.appendChild(li);
      commentInput.value = "";
      atualizarVideo(videoKey, foundVideo);
    }
  });

  // Função para atualizar vídeo no localStorage
  function atualizarVideo(key, videoAtualizado) {
    const videos = JSON.parse(localStorage.getItem(key));
    const index = videos.findIndex(v => v.id === videoAtualizado.id);
    if (index !== -1) {
      videos[index] = videoAtualizado;
      localStorage.setItem(key, JSON.stringify(videos));
    }
  }
});
