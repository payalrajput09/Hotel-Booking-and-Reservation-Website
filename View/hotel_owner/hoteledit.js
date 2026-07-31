/* Page 2 — Editing Hotel */

document.addEventListener('DOMContentLoaded', () => {

  /* Live Preview toggle */
  const liveToggle = document.querySelector('.toggle input[type="checkbox"]');
  if (liveToggle) {
    liveToggle.addEventListener('change', () => {
      window.showToast(liveToggle.checked ? 'Live preview enabled' : 'Live preview disabled');
    });
  }

  /* Save / Discard changes */
  const saveBtn = document.querySelector('.btn-save');
  const discardBtn = document.querySelector('.visibility-actions .btn-ghost');
  const inputs = document.querySelectorAll('.field-input, .field-select, .field-textarea');
  const originalValues = new Map();
  inputs.forEach(el => originalValues.set(el, el.value));

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      inputs.forEach(el => originalValues.set(el, el.value));
      window.showToast('Changes saved');
    });
  }

  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      inputs.forEach(el => { el.value = originalValues.get(el); });
      window.showToast('Changes discarded');
    });
  }

  /* Amenity tag: "+ More" reveals extra tags (demo set) */
  const moreTag = document.querySelector('.tag-outline');
  if (moreTag) {
    moreTag.addEventListener('click', () => {
      const extras = ['🚗 Parking', '🐾 Pet Friendly', '🧺 Laundry'];
      extras.forEach(text => {
        const span = document.createElement('span');
        span.className = 'tag tag-light';
        span.textContent = text;
        moreTag.parentElement.insertBefore(span, moreTag);
      });
      moreTag.remove();
    });
  }

  /* Room category actions: edit (✎) and delete (🗑) */
  document.querySelectorAll('.actions-cell .icon-btn.small').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      const roomName = row.querySelector('.room-name').textContent.trim();
      if (btn.textContent.includes('✎')) {
        window.showToast(`Editing "${roomName}"`);
      } else {
        row.style.opacity = '0.4';
        window.showToast(`"${roomName}" marked for removal`);
      }
    });
  });

  /* + New Category button */
  const newCategoryBtn = document.querySelector('.room-cat-head .btn-primary');
  if (newCategoryBtn) {
    newCategoryBtn.addEventListener('click', () => {
      window.showToast('Opening new room category form...');
    });
  }

  /* + Add Media link */
  const addMediaLink = document.querySelector('.add-link');
  if (addMediaLink) {
    addMediaLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast('Media upload dialog would open here');
    });
  }
});
