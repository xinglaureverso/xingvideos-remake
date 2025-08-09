const abrirUploadBtn = document.getElementById('abrirUpload');
const uploadPopup = document.getElementById('uploadPopup');

abrirUploadBtn.addEventListener('click', () => {
  uploadPopup.classList.remove('hidden');
  nextStep(1);
});

function nextStep(step) {
  document.querySelectorAll('.step').forEach(el => el.classList.add('hidden'));
  document.getElementById(`step${step}`).classList.remove('hidden');
}

function postarVideo() {
  const videoFile = document.getElementById('videoFile').files[0];
  const thumbFile = document.getElementById('thumbFile').files[0];
  const title = document.getElementById('videoTitle').value;
  const visibility = document.querySelector('input[name="visibility"]:checked').value;

  if (!videoFile || !title || !thumbFile) {
    alert('Preencha todos os campos!');
    return;
  }

  const videoURL = URL.createObjectURL(videoFile);
  const thumbURL = URL.createObjectURL(thumbFile);

  if (visibility === 'privado') {
    const novoVideo = {
      title,
      video: videoURL,
      thumb: thumbURL,
    };
    const videos = JSON.parse(localStorage.getItem('meusVideos') || '[]');
    videos.push(novoVideo);
    localStorage.setItem('meusVideos', JSON.stringify(videos));
    alert('Vídeo salvo como privado!');
    mostrarVideos();
  } else {
    alert('Função de vídeo público ainda não implementada.');
    // Aqui você pode integrar com uma API real
  }

  uploadPopup.classList.add('hidden');
}

function mostrarVideos() {
  const container = document.getElementById('videoContainer');
  container.innerHTML = '<h2>Meus Vídeos Privados</h2>';
  const videos = JSON.parse(localStorage.getItem('meusVideos') || '[]');

  videos.forEach(v => {
    const el = document.createElement('div');
    el.innerHTML = `
      <h3>${v.title}</h3>
      <img src="${v.thumb}" width="200" />
      <video src="${v.video}" controls width="300"></video>
    `;
    container.appendChild(el);
  });
}

window.addEventListener('load', mostrarVideos);
function postarVideo() {
  const videoFile = document.getElementById('videoFile').files[0];
  const thumbFile = document.getElementById('thumbFile').files[0];
  const title = document.getElementById('videoTitle').value;
  const visibility = document.querySelector('input[name="visibility"]:checked').value;

  if (!videoFile || !title || !thumbFile) {
    alert('Preencha todos os campos!');
    return;
  }

  const videoURL = URL.createObjectURL(videoFile);
  const thumbURL = URL.createObjectURL(thumbFile);
  const novoVideo = { title, video: videoURL, thumb: thumbURL };

  if (visibility === 'privado') {
    const privados = JSON.parse(localStorage.getItem('meusVideos') || '[]');
    privados.push(novoVideo);
    localStorage.setItem('meusVideos', JSON.stringify(privados));
    alert('Vídeo salvo como privado!');
    mostrarVideos();
  } else {
    const publicos = JSON.parse(localStorage.getItem('videosPublicos') || '[]');
    publicos.push(novoVideo);
    localStorage.setItem('videosPublicos', JSON.stringify(publicos));
    alert('Vídeo enviado ao Watch!');
    // Aqui você pode chamar uma função para atualizar o Watch
  }

  uploadPopup.classList.add('hidden');
}
