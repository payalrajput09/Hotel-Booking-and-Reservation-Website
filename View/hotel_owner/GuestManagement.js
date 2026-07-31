/* Page 6 — Guest Management */

document.addEventListener('DOMContentLoaded', () => {

  /* Expand chevron reveals a small detail row under the guest */
  document.querySelectorAll('.chev').forEach(chev => {
    chev.addEventListener('click', () => {
      const row = chev.closest('tr');
      const existingDetail = row.nextElementSibling;
      const isOpen = existingDetail && existingDetail.classList.contains('detail-row');

      // Close any other open detail rows
      document.querySelectorAll('.detail-row').forEach(r => r.remove());
      document.querySelectorAll('.chev').forEach(c => c.textContent = '⌄');

      if (isOpen) return; // was open, now just closed it — leave collapsed

      chev.textContent = '⌃';
      const guestName = row.querySelector('.guest-name').textContent;
      const detail = document.createElement('tr');
      detail.className = 'detail-row';
      detail.innerHTML = `
        <td colspan="6" style="background:#f7f9fd; font-size:13px; color:#667085;">
          Loyalty notes for <strong>${guestName}</strong>: no notes on file yet.
          <a href="#" style="color:#1748c9; font-weight:700; margin-left:8px;">Add a note</a>
        </td>`;
      row.after(detail);
    });
  });

  /* Add New Guest / Filters */
  const addGuestBtn = document.querySelector('.head-actions .btn-primary');
  const filtersBtn = document.querySelector('.head-actions .btn-ghost');
  if (addGuestBtn) addGuestBtn.addEventListener('click', () => window.showToast('Opening "Add New Guest" form'));
  if (filtersBtn) filtersBtn.addEventListener('click', () => window.showToast('Opening guest filters'));

  /* Promo card CTAs (clicking the card acts as its action) */
  document.querySelectorAll('.promo-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      window.showToast(`"${title}" — opening details`);
    });
  });
});
