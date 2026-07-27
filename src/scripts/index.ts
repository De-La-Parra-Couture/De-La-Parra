// =============================================================================
// De la Parra Couture — Scripts Entry Point
// =============================================================================

import { initAnimations } from './animations';

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();

  // Footer year
  const yearSpan = document.getElementById('dlp-current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }
});
