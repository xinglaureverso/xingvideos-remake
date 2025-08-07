// Realce de thumbs com foco de teclado
document.querySelectorAll(".thumbs a").forEach(thumb => {
  thumb.addEventListener("focus", () => {
    thumb.querySelector("img").style.outline = "3px solid #cc0000";
  });
  thumb.addEventListener("blur", () => {
    thumb.querySelector("img").style.outline = "none";
  });
});

// Mensagem de boas-vindas no console (só pra dev vibes)
console.log("🚀 XingVideos Remake carregado. Prepare a marmita digital.");
document.getElementById("searchBar").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".thumbs a").forEach(thumb => {
    const alt = thumb.querySelector("img").alt.toLowerCase();
    thumb.style.display = alt.includes(query) ? "inline-block" : "none";
  });
});
// service-worker.js (pode estar vazio para começar)
self.addEventListener('fetch', () => {});
// No seu script principal
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou instalar');
      }
      deferredPrompt = null;
    });
  }
});
