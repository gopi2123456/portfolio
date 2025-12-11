// Basic interactivity: mobile nav, theme toggle, modals, contact handler, smooth scroll
(function () {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const themeToggle = document.getElementById('themeToggle');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const yearEl = document.getElementById('year');

  // Year
  yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
      nav.style.display = '';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
    }
  });

  // Theme toggle (persist in localStorage)
  const root = document.documentElement;
  if (localStorage.getItem('theme') === 'light') root.classList.add('light');

  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');
    const isLight = root.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href').slice(1);
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (window.innerWidth < 900 && nav.style.display === 'flex') nav.style.display = '';
      }
    });
  });

  // Project details (simple modal)
  const projectMap = {
    proj1: {
      title: 'Road Classification & Pothole Detection',
      body: `<p><strong>Tech:</strong> Python, YOLOv8, Google Colab</p>
             <p>Developed a real-time pothole detection pipeline trained on 8,000+ annotated images. Implemented data augmentation, preprocessing and fine-tuned YOLO for high recall in diverse Indian road conditions.</p>
             <p><strong>Outcomes:</strong> Improved detection robustness and architecture prototypes for Level 3 autonomy support.</p>`
    },
    proj2: {
      title: 'Java Mini E-Commerce App',
      body: `<p><strong>Tech:</strong> Java, JSP, Servlets, MySQL</p>
             <p>Built MVC-based e-commerce features: product listing, search, add-to-cart, order flow, secure session management and DAO layers. Deployed on Tomcat and tested all user flows.</p>`
    }
  };

  document.querySelectorAll('[data-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-proj');
      const data = projectMap[id];
      if (!data) return;
      modalBody.innerHTML = `<h3>${data.title}</h3>${data.body}`;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // Basic contact form handler using mailto (no backend)
  window.handleContact = function (ev) {
    ev.preventDefault();
    const form = ev.target;
    const name = encodeURIComponent(form.name.value.trim());
    const email = encodeURIComponent(form.email.value.trim());
    const message = encodeURIComponent(form.message.value.trim());
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailto = `mailto:gopiavala702@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    return false;
  };
})();
