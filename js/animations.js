/* =====================================================
   Junglee Studios — Site-wide Motion System
   Counters, typewriter, staggered reveals, hover glow
   ====================================================== */

(function () {
  'use strict';

  // Respect reduced-motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------
     1. ANIMATED STAT COUNTERS
     Elements with [data-count-to] count up on scroll.
     Attributes:
       data-count-to   – target number (e.g. "1.3")
       data-count-prefix – text before the number (e.g. "$")
       data-count-suffix – text after the number (e.g. "B+")
       data-count-decimals – decimal places (default 0)
   ------------------------------------------------- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
    var duration = 2000; // 2 seconds

    if (prefersReducedMotion) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }

    var startTime = null;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = easeOutExpo(progress);
      var current = easedProgress * target;

      el.textContent = prefix + current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (prefersReducedMotion) {
      counters.forEach(function (el) { animateCounter(el); });
      return;
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) {
      // Set initial display to prefix + 0 + suffix
      var prefix = el.getAttribute('data-count-prefix') || '';
      var suffix = el.getAttribute('data-count-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
      el.textContent = prefix + (0).toFixed(decimals) + suffix;
      counterObserver.observe(el);
    });
  }

  /* -------------------------------------------------
     2. TYPEWRITER EFFECT (homepage hero only)
     Cycles through words with type/delete animation.
   ------------------------------------------------- */
  function initTypewriter() {
    var el = document.querySelector('.typewriter-word');
    if (!el) return;

    var words = ['brands', 'creators'];
    var typingSpeed = 60;   // ms per character
    var deletingSpeed = 40; // ms per character
    var holdTime = 2500;    // pause after full word
    var pauseTime = 400;    // pause between delete and next word

    if (prefersReducedMotion) {
      // Just show the first word statically
      el.textContent = words[0];
      return;
    }

    var wordIndex = 0;
    var isDeleting = true; // Start by deleting the initial word
    var charIndex = words[0].length;

    // Start with the first word already displayed, then begin cycling
    el.textContent = words[0];

    function tick() {
      var currentWord = words[wordIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, pauseTime);
          return;
        }
        setTimeout(tick, deletingSpeed);
      } else {
        charIndex++;
        el.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(tick, holdTime);
          return;
        }
        setTimeout(tick, typingSpeed);
      }
    }

    // Begin after the initial hold
    setTimeout(tick, holdTime);
  }

  /* -------------------------------------------------
     3. STAGGERED SCROLL REVEAL ANIMATIONS
     Enhances the existing .reveal pattern.
     Adds staggered delays to children of grids.
   ------------------------------------------------- */
  function initStaggeredReveals() {
    if (prefersReducedMotion) return;

    // Only run if js-reveal-ready is active
    if (!document.documentElement.classList.contains('js-reveal-ready')) return;

    var grids = document.querySelectorAll('.grid2, .grid3, .tierGrid, .status, .miniGrid');

    var staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var children = entry.target.children;
          for (var i = 0; i < children.length; i++) {
            (function (child, delay) {
              child.style.transitionDelay = delay + 'ms';
              // Force a tiny layout read so the delay takes effect before adding class
              void child.offsetHeight;
              child.classList.add('stagger-visible');
            })(children[i], i * 100);
          }
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    grids.forEach(function (grid) {
      // Mark children for stagger animation
      var children = grid.children;
      for (var i = 0; i < children.length; i++) {
        children[i].classList.add('stagger-item');
      }
      staggerObserver.observe(grid);
    });
  }

  /* -------------------------------------------------
     4. SECTION HEADING REVEAL
     Slide-up + fade-in for headings and leads
     inside .reveal sections (enhancing existing pattern)
   ------------------------------------------------- */
  function initHeadingReveals() {
    if (prefersReducedMotion) return;
    if (!document.documentElement.classList.contains('js-reveal-ready')) return;

    var headings = document.querySelectorAll('.reveal h2, .reveal .lead');

    var headingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('heading-visible');
          headingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    headings.forEach(function (el) {
      el.classList.add('heading-reveal');
      headingObserver.observe(el);
    });
  }

  /* -------------------------------------------------
     5. GRAIN OVERLAY
     Injects a fixed noise texture overlay for film grain.
   ------------------------------------------------- */
  function initGrainOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'grain-overlay';
    document.body.appendChild(overlay);
  }

  /* -------------------------------------------------
     INIT — Run everything after DOM is ready
   ------------------------------------------------- */
  function init() {
    initCounters();
    initTypewriter();
    initStaggeredReveals();
    initHeadingReveals();
    initGrainOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
