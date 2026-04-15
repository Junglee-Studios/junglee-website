(function () {
  var page = document.body.getAttribute('data-page') || '';

  function load(url, target) {
    return fetch(url)
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(function (html) { target.innerHTML = html; })
      .catch(function (err) { console.warn('Failed to load ' + url + ':', err); });
  }

  var header = document.getElementById('site-header');
  var footer = document.getElementById('site-footer');

  var navReady = header
    ? load('partials/nav.html', header).then(function () {
        // Mark active nav link
        if (page) {
          header.querySelectorAll('[data-page="' + page + '"]').forEach(function (a) {
            a.setAttribute('aria-current', 'page');
          });
        }

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
      })
    : Promise.resolve();

  var footerReady = footer
    ? load('partials/footer.html', footer).then(function () {
        var y = document.getElementById('year');
        if (y) y.textContent = new Date().getFullYear();
      })
    : Promise.resolve();

  // Scroll-triggered reveal animations
  document.documentElement.classList.add('js-reveal-ready');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();
