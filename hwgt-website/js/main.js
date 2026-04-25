/* HWGT — main.js — 2026 */
(function () {
  'use strict';

  /* ── Nav: add .scrolled class on scroll ───────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const checkScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
  }

  /* ── Mobile nav toggle ────────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ── Hero video: pause when scrolled out of view ─────────── */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(heroVideo);

    // Subtle parallax on the hero video
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroSection = heroVideo.closest('.hero');
      if (heroSection && scrollY < window.innerHeight * 1.5) {
        heroVideo.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ── Scroll-in animations (fade-up) ──────────────────────── */
  const fadeEls = document.querySelectorAll('.card, .page-body h2, .page-body p, .section-label, .wide-p');

  if ('IntersectionObserver' in window && fadeEls.length) {
    fadeEls.forEach(el => el.classList.add('fade-up'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px 0px 0px' }
    );

    fadeEls.forEach(el => {
      // Immediately reveal anything already in the viewport at load time
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        io.observe(el);
      }
    });
  }

  /* ── Hero fade overlay on scroll (optional cinematic fade) ── */
  const fadeOverlay = document.getElementById('heroFadeOverlay');
  if (fadeOverlay) {
    window.addEventListener('scroll', () => {
      const ratio = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
      fadeOverlay.style.opacity = (ratio * 0.7).toString();
    }, { passive: true });
  }

})();
