/* ============================================
   SCRIPT.JS — Complete Fixed Version
   ============================================ */

/* ── 1. Navbar active link on scroll ── */
function initNavActiveState() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let currentSection = '';
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink(); // run once on load
}

/* ── 2. Smooth scroll for nav links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('hamburger').classList.remove('open');
      }
    });
  });
}

/* ── 3. Typing animation ── */
function initTypingAnimation() {
  const words = [
    'Web Applications',
    'REST APIs',
    'Full Stack Solutions',
    'Backend Systems',
    'React Frontends',
    'Database Solutions',
    'AI-Powered Tools',
  ];

  const el = document.getElementById('typedText');
  if (!el) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }

    if (!isDeleting) {
      el.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isPaused = true;
        setTimeout(type, 100);
      } else {
        setTimeout(type, 100);
      }
    } else {
      el.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
      } else {
        setTimeout(type, 50);
      }
    }
  }

  setTimeout(type, 800);
}

/* ── 4. Counter animation ── */
function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          let current = 0;
          const step = Math.ceil(target / 30);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current;
          }, 50);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach((el) => observer.observe(el));
}

/* ── 5. Skill bar animation ── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const width = el.getAttribute('data-width');
          setTimeout(() => {
            el.style.width = width + '%';
          }, 200);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach((el) => observer.observe(el));
}

/* ── 6. Navbar scroll style ── */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── 7. Hamburger menu ── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

/* ── 8. Cursor glow ── */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ── 9. Background canvas ── */
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

/* ── 10. Section reveal animation ── */
function initSectionReveal() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ── 11. Project Modal ── */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  const cards = document.querySelectorAll('.project-card');

  if (!modal) return;

  // Icon map
  const iconMap = {
    'Smart Banking System': 'fas fa-university',
    'Smart Finance System': 'fas fa-chart-line',
    'AdminSight': 'fas fa-shield-alt',
    'AI Resume Analyser': 'fas fa-robot',
  };

  // Status color map
    // Status color map
  const statusColorMap = {
    'Portfolio Project': 'status-portfolio',
    'In Development': 'status-dev',
    'Live on Render': 'status-live',
    'Completed': 'status-completed',
  };

  cards.forEach((card) => {
    card.addEventListener('click', function (e) {
      // Don't open modal if clicking a link
      if (e.target.closest('a')) return;

      const title = this.getAttribute('data-title');
      const desc = this.getAttribute('data-desc');
      const featuresRaw = this.getAttribute('data-features');
      const stackRaw = this.getAttribute('data-stack');
      const status = this.getAttribute('data-status');
      const github = this.getAttribute('data-github');
      const demo = this.getAttribute('data-demo');

      // Populate modal
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDesc').textContent = desc;

      // Icon
      const iconEl = document.getElementById('modalIcon');
      iconEl.innerHTML = `<i class="${iconMap[title] || 'fas fa-code'}"></i>`;

      // Status
      const statusEl = document.getElementById('modalStatus');
      statusEl.textContent = status;
      statusEl.className = 'modal-status ' + (statusColorMap[status] || '');

      // Features
      const featuresList = document.getElementById('modalFeatures');
      featuresList.innerHTML = '';
      if (featuresRaw) {
        featuresRaw.split('|').forEach((f) => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fas fa-chevron-right"></i> ${f.trim()}`;
          featuresList.appendChild(li);
        });
      }

      // Stack
      const stackEl = document.getElementById('modalStack');
      stackEl.innerHTML = '';
      if (stackRaw) {
        stackRaw.split(',').forEach((tech) => {
          const span = document.createElement('span');
          span.textContent = tech.trim();
          stackEl.appendChild(span);
        });
      }

      // GitHub link
      const githubBtn = document.getElementById('modalGithub');
      githubBtn.href = github || '#';

      // Demo link
      const demoBtn = document.getElementById('modalDemo');
      if (demo) {
        demoBtn.href = demo;
        demoBtn.style.display = 'flex';
      } else {
        demoBtn.style.display = 'none';
      }

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

/* ── 12. Copy email button ── */
function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    navigator.clipboard.writeText('praneshtech1400904@gmail.com').then(() => {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('copied');
      }, 2000);
    });
  });
}

/* ── 13. Tech tags animation ── */
function initTechTags() {
  const tags = document.querySelectorAll('.tech-tag');
  tags.forEach((tag, i) => {
    tag.style.animationDelay = `${i * 0.05}s`;
  });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initCursorGlow();
  initNavbarScroll();
  initNavActiveState();
  initSmoothScroll();
  initHamburger();
  initTypingAnimation();
  initCounters();
  initSkillBars();
  initSectionReveal();
  initProjectModal();
  initCopyEmail();
  initTechTags();
});