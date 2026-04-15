(function () {
  var page = document.body.getAttribute('data-page') || '';

  // Mark active nav link (nav is now baked inline — no fetch needed)
  var header = document.getElementById('site-header');
  if (header && page) {
    header.querySelectorAll('[data-page="' + page + '"]').forEach(function (a) {
      a.setAttribute('aria-current', 'page');
    });
  }

  // Set footer copyright year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
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

  // Scroll-triggered reveal animations — guard ensures elements stay visible if observer fails
  if (typeof IntersectionObserver !== 'undefined') {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    var revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(function (el) {
      observer.observe(el);
    });

    // Only hide elements after observer is watching them
    if (revealEls.length) {
      document.documentElement.classList.add('js-reveal-ready');
    }
  }
})();
