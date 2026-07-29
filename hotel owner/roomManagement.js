/* Page 3 — Room Management */

(function injectMiniMenuStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .mini-menu {
      position: absolute;
      right: 0;
      bottom: 44px;
      background: #ffffff;
      border: 1px solid #e4e8f0;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(16,24,40,0.15);
      overflow: hidden;
      z-index: 20;
      min-width: 180px;
    }
    .mini-menu button {
      display: block;
      width: 100%;
      text-align: left;
      padding: 10px 14px;
      background: none;
      border: none;
      font-size: 13.5px;
      font-weight: 600;
      color: #344054;
      font-family: inherit;
    }
    .mini-menu button:hover { background: #f4f7fe; }
    .mini-menu button[data-action="delete"] { color: #d0342c; }
  `;
  document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* Edit Details buttons */
  document.querySelectorAll('.room-card .btn-light').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('.room-card').querySelector('h3').textContent;
      window.showToast(`Opening editor for "${name}"`);
    });
  });

  /* Overflow (⋮) menu buttons — simple demo menu */
  document.querySelectorAll('.room-card .dots').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllMenus();
      const menu = document.createElement('div');
      menu.className = 'mini-menu';
      menu.innerHTML = `
        <button data-action="duplicate">Duplicate room type</button>
        <button data-action="archive">Archive</button>
        <button data-action="delete">Delete</button>
      `;
      btn.parentElement.style.position = 'relative';
      btn.parentElement.appendChild(menu);

      menu.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', () => {
          const name = btn.closest('.room-card').querySelector('h3').textContent;
          window.showToast(`${item.textContent} — "${name}"`);
          menu.remove();
        });
      });
    });
  });

  function closeAllMenus() {
    document.querySelectorAll('.mini-menu').forEach(m => m.remove());
  }
  document.addEventListener('click', closeAllMenus);

  /* Add New Room card */
  const addRoomCard = document.querySelector('.add-room-card');
  if (addRoomCard) {
    addRoomCard.addEventListener('click', () => {
      window.showToast('Opening "Add Room Type" form');
    });
  }

  /* Header actions */
  const addRoomTypeBtn = document.querySelector('.head-actions .btn-primary');
  const seasonalBtn = document.querySelector('.head-actions .btn-outline');
  if (addRoomTypeBtn) {
    addRoomTypeBtn.addEventListener('click', () => window.showToast('Opening "Add Room Type" form'));
  }
  if (seasonalBtn) {
    seasonalBtn.addEventListener('click', () => window.showToast('Opening seasonal pricing settings'));
  }

  /* Search rooms box (visual only — filters demo cards by name) */
  const searchBox = document.querySelector('.search-box');
  if (searchBox) {
    searchBox.setAttribute('contenteditable', 'false');
  }
});
