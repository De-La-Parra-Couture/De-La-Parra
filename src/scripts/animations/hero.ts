// =============================================================================
// De la Parra Couture — Hero Animation
// GSAP timeline para la entrada del hero
// =============================================================================

import gsap from 'gsap';

export function initHero(): void {
  const pretitle = document.querySelector('[data-dlp-hero-pretitle]');
  const title = document.querySelector('[data-dlp-hero-title]');
  const subtitle = document.querySelector('[data-dlp-hero-subtitle]');
  const cta = document.querySelector('[data-dlp-hero-cta]');

  if (!pretitle || !title || !subtitle || !cta) return;

  const tl = gsap.timeline({ delay: 0.3 });

  tl.to(pretitle, {
    y: 0,
    opacity: 0.6,
    duration: 1,
    ease: 'power2.out',
  });

  tl.to(
    title,
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
    '-=0.7',
  );

  tl.to(
    subtitle,
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
    '-=0.5',
  );

  tl.to(
    cta,
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
    '-=0.5',
  );
}
