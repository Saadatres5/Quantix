/* ================================================================
   QuantixTools — Main JS v2
   Framer Motion-style animations · Pro UX interactions
   ================================================================ */
(function () {
  'use strict';

  /* ── Nav: hamburger + scroll glass effect ───────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const nav       = document.querySelector('.nav');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburger.textContent = open ? '✕' : '☰';
    });
    // close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        hamburger.textContent = '☰';
      }
    });
  }

  // Nav scroll: add .scrolled for glass effect
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reading Progress Bar ───────────────────────────────────── */
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
  }

  /* ── Scroll Animations (Framer Motion-style) ────────────────── */
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up, .stagger-children').forEach(el => {
    animObserver.observe(el);
  });

  /* ── FAQ Accordion ──────────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Tool Tabs ──────────────────────────────────────────────── */
  document.querySelectorAll('.tool-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tab.closest('.tool-wrapper').querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
      tab.closest('.tool-wrapper').querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Smooth Scroll for anchor links ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Copy to clipboard ──────────────────────────────────────── */
  window.copyResult = function (text, btnEl) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = btnEl || document.querySelector('.copy-btn');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.style.background = 'var(--green-500)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 2000);
    });
  };

  /* ── Table of Contents auto-generate ────────────────────────── */
  const tocContainer = document.getElementById('toc-list');
  if (tocContainer) {
    document.querySelectorAll('article h2').forEach((h, i) => {
      if (!h.id) h.id = 'section-' + i;
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      tocContainer.appendChild(li);
    });
  }

  /* ── Last Updated display ───────────────────────────────────── */
  const lastUpdated = document.querySelector('.last-updated');
  if (lastUpdated && lastUpdated.dataset.date) {
    const d = new Date(lastUpdated.dataset.date);
    lastUpdated.textContent = 'Last updated: ' + d.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  /* ── Active nav link highlight ──────────────────────────────── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') && currentPath.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '/') {
      a.classList.add('active');
    }
  });

  /* ── Card tilt micro-interaction ────────────────────────────── */
  document.querySelectorAll('.home-tool-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

})();
