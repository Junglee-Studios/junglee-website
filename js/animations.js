/* =====================================================
   Junglee Studios — Site-wide Motion System
   Counters, typewriter, grain overlay
   ====================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------
     1. ANIMATED STAT COUNTERS
  ------------------------------------------------- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
    var duration = 2000;

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
      var current = easeOutExpo(progress) * target;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
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
      var prefix = el.getAttribute('data-count-prefix') || '';
      var suffix = el.getAttribute('data-count-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
      el.textContent = prefix + (0).toFixed(decimals) + suffix;
      counterObserver.observe(el);
    });
  }

  /* -------------------------------------------------
     2. TYPEWRITER EFFECT (homepage hero only)
  ------------------------------------------------- */
  function initTypewriter() {
    var el = document.querySelector('.typewriter-word');
    if (!el) return;

    var words = ['brands', 'creators'];
    var typingSpeed = 60;
    var deletingSpeed = 40;
    var holdTime = 2500;
    var pauseTime = 400;

    if (prefersReducedMotion) {
      el.textContent = words[0];
      return;
    }

    var wordIndex = 0;
    var isDeleting = true;
    var charIndex = words[0].length;
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

    setTimeout(tick, holdTime);
  }

  /* -------------------------------------------------
     3. GRAIN OVERLAY
  ------------------------------------------------- */
  function initGrainOverlay() {
    if (document.getElementById('grain-overlay')) return;
    var overlay = document.createElement('div');
    overlay.id = 'grain-overlay';
    document.body.appendChild(overlay);
  }

  /* -------------------------------------------------
     INIT
  ------------------------------------------------- */
  function init() {
    initCounters();
    initTypewriter();
    initGrainOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
