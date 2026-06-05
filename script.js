/* ================================================================
   JINGLAN WU — PORTFOLIO SCRIPTS
   ================================================================ */

/* ── Nav: transparent → solid on scroll ─────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');

  function updateNav() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

/* ── Mobile hamburger menu ───────────────────────────────────── */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close on any link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ── Active nav link on scroll ───────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  function setActive() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ── Scroll-reveal (Intersection Observer) ───────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // Stagger siblings that appear in the same frame
          const siblings = [...e.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
          const idx = siblings.indexOf(e.target);
          setTimeout(() => e.target.classList.add('visible'), idx * 80);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => io.observe(el));
})();

/* ── Hero typing animation ───────────────────────────────────── */
(function () {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Marketing Coordination',
    'Content Marketing',
    'Social Media Strategy',
    'Growth Marketing',
    'Brand Marketing',
  ];

  let phrase = 0, char = 0, deleting = false, paused = false;

  function tick() {
    const full = phrases[phrase];

    if (paused) {
      paused = false;
      deleting = true;
      setTimeout(tick, 1400);
      return;
    }

    if (!deleting) {
      char++;
      el.textContent = full.slice(0, char);
      if (char === full.length) {
        paused = true;
        setTimeout(tick, 80);
        return;
      }
      setTimeout(tick, 70 + Math.random() * 40);
    } else {
      char--;
      el.textContent = full.slice(0, char);
      if (char === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 38);
    }
  }

  setTimeout(tick, 900);
})();

/* ── Counter animation (hero stats) ─────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.hstat-n[data-target]');
  if (!counters.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1400;
      const step   = 16;
      const steps  = dur / step;
      let cur = 0;

      const timer = setInterval(() => {
        cur = Math.min(cur + target / steps, target);
        el.textContent = Math.floor(cur);
        if (cur >= target) clearInterval(timer);
      }, step);

      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ── Contact form (client-side) ──────────────────────────────── */
(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled   = true;
    btn.textContent = 'Sending…';

    // Simulate async send (replace with real endpoint / EmailJS / Formspree as needed)
    setTimeout(() => {
      form.reset();
      btn.disabled    = false;
      btn.innerHTML   = 'Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
      success.classList.remove('hidden');

      setTimeout(() => success.classList.add('hidden'), 6000);
    }, 900);
  });
})();

/* ── Smooth anchor offset correction ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
