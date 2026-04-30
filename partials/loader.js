(function () {
  var page = document.body.getAttribute('data-page') || '';

  var header = document.getElementById('site-header');
  if (header && page) {
    header.querySelectorAll('[data-page="' + page + '"]').forEach(function (a) {
      a.setAttribute('aria-current', 'page');
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var btn = document.getElementById('menuBtn');
  var panel = document.getElementById('mobilePanel');

  if (btn && panel) {
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal — guarded so elements stay visible if observer can't catch up
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  document.documentElement.classList.add('js-reveal-ready');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });

  // Safety: also reveal on scroll (covers fast-scroll cases)
  function revealNearby() {
    revealEls.forEach(function (el) {
      if (el.classList.contains('visible')) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealNearby, { passive: true });
  setTimeout(revealNearby, 100);
})();
