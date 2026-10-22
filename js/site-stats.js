/* Junglee Studios — single source of truth for headline stats.
   Edit the numbers HERE ONLY. Every page that marks an element with
   data-stat="key" (website stat strips and the partner deck) picks the
   value up on load. Keep the HTML fallback text in sync for no-JS readers.
   Load with `defer` BEFORE js/animations.js so count-up animations use these
   values. */
(function () {
  var STATS = {
    sales:    { prefix: '$', value: 1.3, suffix: 'B+', decimals: 1, label: 'D2C Sales Operated' },
    live:     { prefix: '$', value: 700, suffix: 'M+', decimals: 0, label: 'LIVE GMV' },
    brands:   { prefix: '',  value: 400, suffix: '+',  decimals: 0, label: 'Brands Supported by Our Team' },
    creators: { prefix: '',  value: 300, suffix: '+',  decimals: 0, label: 'Creators Supported' }
  };
  window.JUNGLEE_STATS = STATS;
  function fmt(s) {
    return s.prefix + s.value.toLocaleString('en-US', { minimumFractionDigits: s.decimals, maximumFractionDigits: s.decimals }) + s.suffix;
  }
  function apply() {
    document.querySelectorAll('[data-stat]').forEach(function (el) {
      var s = STATS[el.getAttribute('data-stat')];
      if (!s) return;
      el.textContent = fmt(s);
      if (el.hasAttribute('data-count-to')) {
        el.setAttribute('data-count-to', String(s.value));
        el.setAttribute('data-count-prefix', s.prefix);
        el.setAttribute('data-count-suffix', s.suffix);
        el.setAttribute('data-count-decimals', String(s.decimals));
      }
    });
    document.querySelectorAll('[data-stat-label]').forEach(function (el) {
      var s = STATS[el.getAttribute('data-stat-label')];
      if (s) el.textContent = s.label;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
