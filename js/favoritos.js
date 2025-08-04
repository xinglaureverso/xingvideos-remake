// Exemplo de lista de favoritos guardada no localStorage
const favoritos = JSON.parse(localStorage.getItem("xing_favoritos")) || [];

// Container onde os cards serão inseridos
const container = document.querySelector(".favoritos-container");

// Função que cria cada card do vídeo favorito
function criarCard(video) {
  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <img src="${video.thumb}" alt="Miniatura do vídeo">
    <div class="video-info">
      <h3>${video.titulo}</h3>
      <button class="btn-assistir" onclick="assistirVideo('${video.id}')">▶ Assistir</button>
      <button class="btn-remover" onclick="removerFavorito('${video.id}')">🗑 Remover</button>
    </div>
  `;

  container.appendChild(card);
}

// Renderiza todos os vídeos favoritados
favoritos.forEach(video => criarCard(video));

// Função para assistir (leva pro player)
function assistirVideo(id) {
  window.location.href = `player.html?=${id}`;
}

// Função para remover favorito
function removerFavorito(id) {
  const atualizado = favoritos.filter(v => v.id !== id);
  localStorage.setItem("xing_favoritos", JSON.stringify(atualizado));
  location.reload();
}
