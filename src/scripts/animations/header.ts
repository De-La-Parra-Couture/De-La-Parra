// =============================================================================
// De la Parra Couture — Header Menu + Scroll State
// Toggle del menú overlay + header shrinking/hiding con vanilla JS + GSAP
// =============================================================================

import gsap from 'gsap';

// ── Estado ────────────────────────────────────────────────────────────────────
let isOpen = false;
let isScrolled = false;
let isHeaderHidden = false;
let lastScrollY = 0;
let lastWindowWidth = 0;

// ── Elementos DOM ─────────────────────────────────────────────────────────────
let overlay: HTMLElement | null = null;
let header: HTMLElement | null = null;
let gradient: HTMLElement | null = null;
let toggle: HTMLElement | null = null;
let line1: HTMLElement | null = null;
let line2: HTMLElement | null = null;
let navLinks: NodeListOf<HTMLElement> | null = null;

// ── Animación ─────────────────────────────────────────────────────────────────
let scrollTimeline: gsap.core.Timeline | null = null;

// ── Menu ──────────────────────────────────────────────────────────────────────

function openMenu(): void {
  isOpen = true;

  overlay?.classList.add('dlp-header__overlay--open');
  line1?.classList.add('dlp-header__menu-line--active');
  line2?.classList.add('dlp-header__menu-line--active');
  toggle?.setAttribute('aria-expanded', 'true');

  const tl = gsap.timeline();

  tl.to(overlay, {
    opacity: 1,
    duration: 0.7,
    ease: 'power2.inOut',
  });

  if (navLinks) {
    tl.to(
      navLinks,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.05,
      },
      '-=0.4',
    );
  }

  const footer = overlay?.querySelector('.dlp-header__overlay-footer');
  if (footer) {
    tl.to(
      footer,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3',
    );
  }
}

function closeMenu(): void {
  isOpen = false;

  line1?.classList.remove('dlp-header__menu-line--active');
  line2?.classList.remove('dlp-header__menu-line--active');
  toggle?.setAttribute('aria-expanded', 'false');

  const tl = gsap.timeline({
    onComplete: () => {
      overlay?.classList.remove('dlp-header__overlay--open');
    },
  });

  if (navLinks) {
    tl.to(navLinks, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in',
      stagger: 0.02,
    });
  }

  const footer = overlay?.querySelector('.dlp-header__overlay-footer');
  if (footer) {
    tl.to(
      footer,
      {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: 'power2.in',
      },
      '-=0.2',
    );
  }

  tl.to(
    overlay,
    {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    },
    '-=0.1',
  );
}

function toggleMenu(): void {
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

// ── Scroll State ──────────────────────────────────────────────────────────────

function getIsMobile(): boolean {
  return window.innerWidth < 768;
}

function createScrollTimeline(): void {
  if (!header || !gradient) return;

  // Matar la timeline anterior si existe
  if (scrollTimeline) {
    scrollTimeline.kill();
    scrollTimeline = null;
  }

  scrollTimeline = gsap.timeline({ paused: true });

  if (getIsMobile()) {
    // Mobile: solo el slide — el gradiente se controla en handleScroll()
    scrollTimeline.to(
      header,
      {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.in',
      },
      0,
    );
  } else {
    // Desktop: shrink padding + fade in gradiente
    scrollTimeline.to(
      header,
      {
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        duration: 0.8,
        ease: 'power3.out',
      },
      0,
    );

    scrollTimeline.to(
      gradient,
      {
        opacity: 1,
        duration: 1.0,
        ease: 'power2.inOut',
      },
      0,
    );
  }
}

function handleScroll(): void {
  if (!header) return;

  const currentY = window.scrollY;
  const isMobile = getIsMobile();
  const scrollingDown = currentY > lastScrollY;

  if (isMobile) {
    // Gradiente: basado en posición (independiente del slide)
    if (currentY > 100) {
      gsap.to(gradient, { opacity: 1, duration: 0.4, ease: 'power2.inOut' });
    } else {
      gsap.to(gradient, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
    }

    // Slide: basado en dirección
    if (scrollingDown && currentY > 100 && !isOpen && !isHeaderHidden) {
      isHeaderHidden = true;
      gsap.to(header, { yPercent: -100, duration: 0.4, ease: 'power3.in' });
    } else if (!scrollingDown && isHeaderHidden) {
      isHeaderHidden = false;
      gsap.to(header, { yPercent: 0, duration: 0.4, ease: 'power3.out' });
    }
  } else {
    // Desktop: shrink + gradiente después de 100px
    if (currentY > 100 && !isScrolled) {
      isScrolled = true;
      scrollTimeline?.play();
    } else if (currentY <= 100 && isScrolled) {
      isScrolled = false;
      scrollTimeline?.reverse();
    }
  }

  lastScrollY = currentY;
}

function handleResize(): void {
  const currentWidth = window.innerWidth;

  // Solo recalcular si el breakpoint cambió (mobile ↔ desktop)
  if (currentWidth !== lastWindowWidth) {
    lastWindowWidth = currentWidth;

    // Resetear estados al cambiar de modo
    isScrolled = false;
    isHeaderHidden = false;
    lastScrollY = window.scrollY;

    // Resetear header a su estado natural
    if (header) {
      gsap.set(header, {
        yPercent: 0,
        paddingTop: '',
        paddingBottom: '',
      });
    }
    if (gradient) {
      gsap.set(gradient, { opacity: 0 });
    }

    // Recrear timeline para el nuevo modo
    createScrollTimeline();
  }
}

function initScrollDetection(): void {
  if (!header) return;

  lastWindowWidth = window.innerWidth;
  createScrollTimeline();

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
}

// ── Init ──────────────────────────────────────────────────────────────────────

export function initHeader(): void {
  header = document.getElementById('dlp-header');
  gradient = document.getElementById('dlp-header-gradient');
  overlay = document.getElementById('dlp-main-navigation');
  toggle = document.getElementById('dlp-menu-toggle');
  line1 = document.getElementById('dlp-menu-line-1');
  line2 = document.getElementById('dlp-menu-line-2');
  navLinks = overlay?.querySelectorAll('.dlp-header__nav-item') ?? null;

  if (!toggle || !overlay) return;

  toggle.addEventListener('click', toggleMenu);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Close on nav link click
  const navLinkEls = overlay.querySelectorAll('[data-dlp-nav-link]');
  navLinkEls.forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) closeMenu();
    });
  });

  // Inicializar detección de scroll
  initScrollDetection();
}
