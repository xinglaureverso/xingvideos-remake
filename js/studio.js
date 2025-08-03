// studio.ts (convertido pra JS depois)
function verificarConexao() {
  const aviso = document.getElementById('offline-warning');
  aviso.style.display = navigator.onLine ? 'none' : 'block';
}

window.addEventListener('load', verificarConexao);
window.addEventListener('online', verificarConexao);
window.addEventListener('offline', verificarConexao);

function carregarCanal() {
  fetch('data/channel.json')
    .then(res => res.json())
    .then(data => {
      const info = document.getElementById('channel-info');
      info.innerHTML = `
        <h2>@${data.user}</h2>
        <p>Inscritos: ${data.subscribers.length}</p>
        <img src="${data.banner}" alt="Banner">
      `;
    });
}
carregarCanal();
