const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const menuBackdrop = document.querySelector('.menu-backdrop');
const navLinks = document.querySelectorAll('.main-nav a');
const topButton = document.querySelector('.top-button');
const sections = document.querySelectorAll('main section[id]');

function setMenu(open) {
  mainNav.classList.toggle('open', open);
  menuToggle.classList.toggle('active', open);
  menuBackdrop.classList.toggle('show', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  document.body.classList.toggle('menu-open', open);
}

menuToggle.addEventListener('click', () => {
  setMenu(!mainNav.classList.contains('open'));
});

menuBackdrop.addEventListener('click', () => setMenu(false));

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 960) {
    setMenu(false);
  }
});

window.addEventListener('scroll', () => {
  topButton.classList.toggle('show', window.scrollY > 500);

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
