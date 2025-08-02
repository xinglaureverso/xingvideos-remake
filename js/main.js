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
