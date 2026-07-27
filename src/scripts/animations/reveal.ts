// =============================================================================
// De la Parra Couture — Reveal on Scroll
// IntersectionObserver para animaciones de entrada
// =============================================================================

export function initReveal(): void {
  const reveals = document.querySelectorAll<HTMLElement>('.dlp-reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('dlp-reveal--visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  reveals.forEach((el) => observer.observe(el));
}
