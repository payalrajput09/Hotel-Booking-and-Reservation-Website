/* Page 4 — Availability Calendar */

(function injectSelectedCellStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .cal-cell.selected { outline: 2px solid #1748c9; outline-offset: -2px; }
  `;
  document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* Month navigation (demo — just relabels the month, no real date math needed) */
  const monthLabel = document.querySelector('.cal-month-nav h2');
  const months = ['January','February','March','April','May','June','July','August',
                   'September','October','November','December'];
  let monthIndex = 9; // October
  let year = 2024;

  document.querySelectorAll('.nav-arrow').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      monthIndex += (i === 0 ? -1 : 1);
      if (monthIndex < 0) { monthIndex = 11; year -= 1; }
      if (monthIndex > 11) { monthIndex = 0; year += 1; }
      monthLabel.textContent = `${months[monthIndex]} ${year}`;
      window.showToast(`Viewing ${months[monthIndex]} ${year}`);
    });
  });

  const todayBtn = document.querySelector('.cal-toolbar .btn-ghost');
  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      monthIndex = 9; year = 2024;
      monthLabel.textContent = `${months[monthIndex]} ${year}`;
      window.showToast('Jumped back to today');
    });
  }

  /* Clicking a calendar cell selects it (for the "block dates" panel) */
  document.querySelectorAll('.cal-cell:not(.muted)').forEach(cell => {
    cell.addEventListener('click', () => {
      document.querySelectorAll('.cal-cell').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
    });
  });

  /* Quick Block Dates form */
  const blockBtn = document.querySelector('.side-col .btn-primary');
  const fromInput = document.querySelector('input[type="date"]');
  const toInput = document.querySelectorAll('input[type="date"]')[1];
  const reasonInput = document.querySelectorAll('.side-col .field-input')[0];

  if (blockBtn) {
    blockBtn.addEventListener('click', () => {
      if (fromInput && toInput && fromInput.value && toInput.value && fromInput.value > toInput.value) {
        window.showToast('"To" date must be after "From" date');
        return;
      }
      const reason = reasonInput ? reasonInput.value || 'Maintenance' : 'Maintenance';
      window.showToast(`Dates blocked for: ${reason}`);
    });
  }

  /* Bulk pricing links */
  document.querySelectorAll('.pricing-item .link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const title = link.closest('.pricing-item').querySelector('.pricing-row span').textContent;
      window.showToast(`Opening rate settings for "${title}"`);
    });
  });

  /* Floating action button */
  const fab = document.querySelector('.fab');
  if (fab) {
    fab.addEventListener('click', () => window.showToast('Quick-add booking panel would open here'));
  }
});
