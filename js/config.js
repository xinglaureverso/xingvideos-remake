document.getElementById('theme-select').addEventListener('change', function () {
  const theme = this.value;
  document.body.className = theme;
  localStorage.setItem('theme', theme);
});

document.getElementById('lang-select').addEventListener('change', function () {
  const lang = this.value;
  localStorage.setItem('lang', lang);
  // Aqui você pode adicionar lógica para traduzir textos
});

// Carregar configurações salvas
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  const savedLang = localStorage.getItem('lang');
  if (savedTheme) document.body.className = savedTheme;
  if (savedLang) document.getElementById('lang-select').value = savedLang;
};
