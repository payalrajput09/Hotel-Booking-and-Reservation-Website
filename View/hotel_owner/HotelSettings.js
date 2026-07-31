/* Page 8 — Hotel Settings */

document.addEventListener('DOMContentLoaded', () => {

  /* Tabs: General Settings / Financials & Payouts / User Management
     (demo — only "General Settings" has real content, others show a toast) */
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (!tab.classList.contains('active')) {
        window.showToast(`Switched to "${tab.textContent}" (demo content not included)`);
      }
    });
  });

  /* Track changes so Save/Discard behave meaningfully */
  const inputs = document.querySelectorAll('.field-input, .field-select');
  const originalValues = new Map();
  inputs.forEach(el => originalValues.set(el, el.value));

  const saveBtn = document.querySelector('.head-actions .btn-primary');
  const discardBtn = document.querySelector('.head-actions .btn-outline');

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      inputs.forEach(el => originalValues.set(el, el.value));
      window.showToast('All changes saved');
    });
  }

  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      inputs.forEach(el => { el.value = originalValues.get(el); });
      window.showToast('Changes discarded');
    });
  }

  /* Pro tip link */
  const tipLink = document.querySelector('.tip-link');
  if (tipLink) {
    tipLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast('Opening timezone sync guide');
    });
  }
});
