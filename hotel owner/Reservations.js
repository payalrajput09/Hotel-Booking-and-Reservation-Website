/* Page 5 — Reservations */

document.addEventListener('DOMContentLoaded', () => {

  /* Clear Filters */
  const clearLink = document.querySelector('.clear-link');
  const filterSelects = document.querySelectorAll('.filters-row .field-select');
  const dateRangeInput = document.querySelector('.filters-row .field-input');
  const originalDateValue = dateRangeInput ? dateRangeInput.value : '';

  if (clearLink) {
    clearLink.addEventListener('click', (e) => {
      e.preventDefault();
      filterSelects.forEach(sel => { sel.selectedIndex = 0; });
      if (dateRangeInput) dateRangeInput.value = originalDateValue;
      window.showToast('Filters cleared');
    });
  }

  /* New Booking / Export CSV */
  const newBookingBtn = document.querySelector('.head-actions .btn-primary');
  const exportBtn = document.querySelector('.head-actions .btn-outline');
  if (newBookingBtn) newBookingBtn.addEventListener('click', () => window.showToast('Opening new booking form'));
  if (exportBtn) exportBtn.addEventListener('click', () => window.showToast('Exporting reservations to CSV...'));

  /* Row actions: check-in arrow, message, overflow */
  document.querySelectorAll('.row-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      const guest = row.querySelector('.guest-name').textContent;
      if (btn.classList.contains('primary')) {
        window.showToast(`Checking in ${guest}...`);
      } else if (btn.textContent.includes('💬')) {
        window.showToast(`Opening messages with ${guest}`);
      } else {
        window.showToast(`More actions for ${guest}`);
      }
    });
  });
});
