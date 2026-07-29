/* Page 7 — Revenue Analytics */

document.addEventListener('DOMContentLoaded', () => {

  /* Date range button cycles through a few demo ranges */
  const ranges = ['Last 30 Days', 'Last 90 Days', 'This Year', 'Last 7 Days'];
  let rangeIndex = 0;
  const rangeBtn = document.querySelector('.topbar-actions .btn-ghost');
  if (rangeBtn) {
    rangeBtn.addEventListener('click', () => {
      rangeIndex = (rangeIndex + 1) % ranges.length;
      rangeBtn.innerHTML = `📅 ${ranges[rangeIndex]}`;
      window.showToast(`Showing data for: ${ranges[rangeIndex]}`);
    });
  }

  /* Property selector link */
  const propertyLink = document.querySelector('.property-link');
  if (propertyLink) {
    propertyLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast('Opening property selector');
    });
  }

  /* Export report */
  const exportLink = document.querySelector('.table-head .link');
  if (exportLink) {
    exportLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast('Preparing report export...');
    });
  }

  /* Bars: hover shows a lightweight value tooltip via title attr */
  document.querySelectorAll('.bar, .bar-part').forEach(bar => {
    bar.style.cursor = 'pointer';
    bar.addEventListener('click', () => {
      const col = bar.closest('.bar-col');
      const label = col ? col.querySelector('span').textContent : '';
      window.showToast(`Revenue detail for ${label}`);
    });
  });

  /* Source bars */
  document.querySelectorAll('.source-col').forEach(col => {
    col.style.cursor = 'pointer';
    col.addEventListener('click', () => {
      const name = col.querySelector('.source-head').textContent.trim();
      const amount = col.querySelector('.source-amount').textContent;
      window.showToast(`${name}: ${amount} this period`);
    });
  });

  const fab = document.querySelector('.fab');
  if (fab) {
    fab.addEventListener('click', () => window.showToast('Add a custom report widget'));
  }
});
