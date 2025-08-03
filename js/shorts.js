let shortsData = [];
let currentIndex = 0;

async function carregarShorts() {
  const res = await fetch('data/shorts.json');
  shortsData = await res.json();
  mostrarShort(currentIndex);
}

function mostrarShort(index) {
  const container = document.querySelector('.shortsGrid');
  container.innerHTML = '';

  const short = shortsData[index];
  const card = document.createElement('div');
  card.className = 'shortCard';

  card.innerHTML = `
    <video src="assets/shorts/${short.video}" controls muted loop></video>
    <p>“${short.title}”</p>
  `;
  container.appendChild(card);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    currentIndex = (currentIndex + 1) % shortsData.length;
    mostrarShort(currentIndex);
  }
});

carregarShorts();
