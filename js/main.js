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
