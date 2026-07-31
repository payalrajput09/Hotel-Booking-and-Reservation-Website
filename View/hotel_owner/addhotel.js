/* Page 1 — Add New Property */

document.addEventListener('DOMContentLoaded', () => {

  const steps = document.querySelectorAll('.step');
  const stepCircles = document.querySelectorAll('.step-circle');
  const stepLabels = document.querySelectorAll('.step-label');
  const nextBtn = document.querySelector('.form-footer .btn-primary');
  const saveDraftBtn = document.querySelector('.page-head .btn-outline');

  let currentStep = 1;
  const totalSteps = steps.length;

  const statusRows = document.querySelectorAll('.status-list li');

  function renderStep() {
    stepCircles.forEach((circle, i) => {
      const stepNum = i + 1;
      circle.classList.toggle('active', stepNum <= currentStep);
      circle.textContent = stepNum < currentStep ? '✓' : stepNum;
    });
    stepLabels.forEach((label, i) => {
      label.classList.toggle('active', i + 1 === currentStep);
    });
    statusRows.forEach((row, i) => {
      const check = row.querySelector('.status-check');
      const label = row.querySelector('span');
      const done = i + 1 < currentStep;
      check.classList.toggle('done', done);
      check.textContent = done ? '✓' : '';
      label.classList.toggle('muted', !done);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep += 1;
        renderStep();
        window.showToast(`Moved to step ${currentStep} of ${totalSteps}`);
      } else {
        window.showToast('All steps complete — ready to publish!');
      }
    });
  }

  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', () => {
      window.showToast('Draft saved locally');
    });
  }

  /* Live preview: property name + description update the preview card */
  const nameInput = document.querySelector('.field-input[placeholder^="e.g."]');
  const descInput = document.querySelector('.field-textarea');
  const previewName = document.querySelector('.preview-name');
  const previewDesc = document.querySelector('.preview-desc');

  if (nameInput && previewName) {
    nameInput.addEventListener('input', () => {
      previewName.textContent = nameInput.value.trim() || 'Your Property Name';
    });
  }
  if (descInput && previewDesc) {
    descInput.addEventListener('input', () => {
      previewDesc.textContent = descInput.value.trim() ||
        'Description will appear here after you save the first step.';
    });
  }

  /* Star rating select updates the star preview count */
  const starSelect = document.querySelector('.field-select');
  const previewStars = document.querySelector('.preview-stars');
  if (starSelect && previewStars && starSelect.closest('.two-col')) {
    const ratingSelect = document.querySelectorAll('.field-select')[1];
    if (ratingSelect) {
      ratingSelect.addEventListener('change', () => {
        const num = parseInt(ratingSelect.value) || 5;
        previewStars.textContent = '★'.repeat(num) + '☆'.repeat(5 - num);
      });
    }
  }

  renderStep();
});
