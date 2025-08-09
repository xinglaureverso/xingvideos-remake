function mostrarPublicos() {
  const container = document.getElementById('watchContainer');
  container.innerHTML = '<h2>Vídeos Públicos</h2>';
  const publicos = JSON.parse(localStorage.getItem('videosPublicos') || '[]');

  publicos.forEach(v => {
    const el = document.createElement('div');
    el.innerHTML = `
      <h3>${v.title}</h3>
      <img src="${v.thumb}" width="200" />
      <video src="${v.video}" controls width="300"></video>
    `;
    container.appendChild(el);
  });
}

window.addEventListener('load', mostrarPublicos);
