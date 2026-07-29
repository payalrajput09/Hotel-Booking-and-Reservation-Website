/* ===================================================
   BookMyStay — Shared Frontend Behaviors (no backend)
   Include this on every page BEFORE the page-specific JS.
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sidebar nav: click to activate ---------- */
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* ---------- Notification bell: clear the red dot ---------- */
  document.querySelectorAll('.icon-btn').forEach(btn => {
    const dot = btn.querySelector('.dot');
    if (!dot) return;
    btn.addEventListener('click', () => {
      dot.style.display = 'none';
    });
  });

  /* ---------- Generic filter-chip / segmented control toggler ----------
     Any group of buttons sharing the same parent with class
     "filter-chip", "seg", or "tab" will behave as single-select. */
  const toggleGroups = ['.filter-chip', '.seg', '.tab'];
  toggleGroups.forEach(selector => {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const siblings = btn.parentElement.querySelectorAll(selector);
        siblings.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  /* ---------- Generic pagination ---------- */
  document.querySelectorAll('.pagination').forEach(pagination => {
    const pageButtons = pagination.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Ignore prev/next arrows for the active-state toggle
        if (isNaN(parseInt(btn.textContent))) return;
        pageButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  /* ---------- Generic toggle switch (On/Off pill) ---------- */
  document.querySelectorAll('.toggle input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      console.log('Toggle is now:', input.checked ? 'ON' : 'OFF');
    });
  });

  /* ---------- Lightweight toast helper, reused by page scripts ---------- */
  window.showToast = function (message) {
    let toast = document.querySelector('.bms-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'bms-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(window.__bmsToastTimer);
    window.__bmsToastTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2200);
  };
});

/* Minimal injected styles for the toast (kept in JS so no CSS file edit is required) */
(function injectToastStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .bms-toast {
      position: fixed;
      left: 50%;
      bottom: 28px;
      transform: translateX(-50%) translateY(20px);
      background: #0e2a63;
      color: #fff;
      padding: 12px 22px;
      border-radius: 999px;
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-weight: 600;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      z-index: 9999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    }
    .bms-toast.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);
})();
