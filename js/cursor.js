/* =====================================================
   Junglee Studios — Custom Cursor
   Dot + ring follow with lerp, hover/click states
   ====================================================== */

(function () {
  'use strict';

  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var dot = document.createElement('div');
  dot.id = 'cursor-dot';
  var ring = document.createElement('div');
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Signal CSS to hide default cursor
  document.body.classList.add('custom-cursor-ready');

  var mouseX = -100;
  var mouseY = -100;
  var ringX = -100;
  var ringY = -100;
  var lerpFactor = 0.12;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows exactly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Lerp loop for ring
  function animateRing() {
    ringX += (mouseX - ringX) * lerpFactor;
    ringY += (mouseY - ringY) * lerpFactor;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Hover state on interactive elements
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a, button, .btn')) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('a, button, .btn')) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Click state
  document.addEventListener('mousedown', function () {
    document.body.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', function () {
    document.body.classList.remove('cursor-click');
  });
})();
