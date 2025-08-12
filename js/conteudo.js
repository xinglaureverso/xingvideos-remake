function abrirPopup() {
  document.getElementById('popup').style.display = 'block';
}

function fecharPopup() {
  document.getElementById('popup').style.display = 'none';
}

function postarVideo() {
  const titulo = document.getElementById('titulo').value.trim();
  const id = document.getElementById('idVideo').value.trim();

  if (!titulo || !id) {
    alert("Preencha todos os campos!");
    return;
  }

  const url = `https://xingvideos-remake.vercel.app/watch.html?v=${id}`;

  // Simulação de postagem usando localStorage
  let videos = JSON.parse(localStorage.getItem('videos')) || [];
  videos.push({ titulo, id, url });
  localStorage.setItem('videos', JSON.stringify(videos));

  alert(`Vídeo "${titulo}" postado com sucesso!\nURL: ${url}`);
  fecharPopup();
}
