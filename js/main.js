const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const menuBackdrop = document.querySelector('.menu-backdrop');
const navLinks = document.querySelectorAll('.main-nav a');
const topButton = document.querySelector('.top-button');
const sections = document.querySelectorAll('main section[id]');
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.querySelector('#contactForm');
const projectModal = document.querySelector('#projectModal');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

function setMenu(open) {
  mainNav.classList.toggle('open', open);
  menuToggle.classList.toggle('active', open);
  menuBackdrop.classList.toggle('show', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  document.body.classList.toggle('menu-open', open);
}

function openProjectModal(project) {
  modalTitle.textContent = project.dataset.title;
  modalDescription.textContent = project.dataset.desc;
  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
  projectModal.querySelector('.modal-close').focus();
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
  setMenu(!mainNav.classList.contains('open'));
});

menuBackdrop.addEventListener('click', () => setMenu(false));
navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
    closeProjectModal();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 960) setMenu(false);
});

window.addEventListener('scroll', () => {
  topButton.classList.toggle('show', window.scrollY > 500);

  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    projects.forEach((project) => {
      const shouldShow = filter === 'all' || project.dataset.category === filter;
      project.classList.toggle('hide', !shouldShow);
    });
  });
});

projects.forEach((project) => {
  project.addEventListener('click', () => openProjectModal(project));
  project.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal(project);
    }
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', closeProjectModal);
});


const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));
