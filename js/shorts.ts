interface ShortItem {
  id: string;
  video: string;
  title: string;
  descricao: string;
}

let shortsData: ShortItem[] = [];
let currentIndex: number = 0;

async function carregarShorts() {
  const response = await fetch('/data/shorts.json');
  const data: ShortItem[] = await response.json();
  shortsData = data;
  mostrarShort(currentIndex);
}

function mostrarShort(index: number): void {
  const container = document.querySelector('.shortsGrid') as HTMLElement;
  container.innerHTML = '';

  const short = shortsData[index];
  const div = document.createElement('div');
  div.className = 'shortCard';
  div.innerHTML = `
    <video src="assets/shorts/${short.video}" controls muted loop></video>
    <p>“${short.title}”</p>
  `;
  container.appendChild(div);
}

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    currentIndex = (currentIndex + 1) % shortsData.length;
    mostrarShort(currentIndex);
  }
});

carregarShorts();
