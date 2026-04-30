/* =====================================================
   Junglee Studios — Motion System
   Counters, scroll reveal triggers, marquee duplication
   ====================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
    var duration = 1800;

    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = prefix + (isNaN(target) ? el.textContent : target.toFixed(decimals)) + suffix;
      return;
    }

    var startTime = null;
    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var v = easeOutExpo(p) * target;
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    counters.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var prefix = el.getAttribute('data-count-prefix') || '';
      var suffix = el.getAttribute('data-count-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
      // If already in view on load, animate immediately; otherwise reset to 0 and observe.
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        animateCounter(el);
      } else {
        el.textContent = prefix + (0).toFixed(decimals) + suffix;
        observer.observe(el);
      }
    });
  }

  /* ---------- Marquee: clone children for seamless loop ---------- */
  function initMarquees() {
    document.querySelectorAll('[data-marquee]').forEach(function (track) {
      if (track.dataset.marqueeReady) return;
      var originals = Array.prototype.slice.call(track.children);
      var frag = document.createDocumentFragment();
      originals.forEach(function (node) {
        var clone = node.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        frag.appendChild(clone);
      });
      track.appendChild(frag);
      track.dataset.marqueeReady = '1';
    });
  }

  /* ---------- Init ---------- */
  function init() {
    initMarquees();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
