document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const navbar = document.getElementById('mainNavbar');

  // Funzione per applicare il tema
  function applyTheme(theme) {
    html.setAttribute('data-bs-theme', theme);

    if (theme === 'light') {
      navbar.classList.remove('bg-dark', 'navbar-dark');
      navbar.classList.add('bg-light', 'navbar-light');
      toggle.checked = true;
    } else {
      navbar.classList.remove('bg-light', 'navbar-light');
      navbar.classList.add('bg-dark', 'navbar-dark');
      toggle.checked = false;
    }
  }

  // Carica tema da localStorage o imposta default (dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  // Cambia tema al toggle
  toggle.addEventListener('change', () => {
    const newTheme = toggle.checked ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
});