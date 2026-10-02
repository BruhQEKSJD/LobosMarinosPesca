document.addEventListener('DOMContentLoaded', () => {
  // AOS — animaciones al hacer scroll
  AOS.init({
    duration: 850,
    easing: 'ease-out-cubic',
    once: true,
    offset: 70,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });

  const nav = document.querySelector('.glass-nav');
  const progress = document.getElementById('readingProgress');
  const themeToggle = document.getElementById('themeToggle');
  const year = document.getElementById('year');

  year.textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? (scrollTop / height) * 100 : 0;
    progress.style.width = `${percent}%`;
    nav.classList.toggle('scrolled', scrollTop > 40);
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  // Modo claro/oscuro. Se guarda solo en el navegador.
  const savedTheme = localStorage.getItem('mar-abierto-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');

  const refreshThemeButton = () => {
    const isDark = document.body.classList.contains('dark');
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun me-1"></i>Claro'
      : '<i class="fa-solid fa-moon me-1"></i>Modo';
  };
  refreshThemeButton();

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('mar-abierto-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    refreshThemeButton();
  });

  // Cierra el menú móvil al navegar.
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mainNav');
      if (menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
