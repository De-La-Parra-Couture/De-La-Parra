// =============================================================================
// De la Parra Couture — Utilidades compartidas del blog (El Diario)
// =============================================================================

// ── Fechas ───────────────────────────────────────────────────────────────────
const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

// ── Extracto del contenido ───────────────────────────────────────────────────
export function getExcerpt(body: string, maxLength = 200): string {
  const text = body
    .replace(/^---[\s\S]*?---\n?/, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/^\s*>\s?/gm, ' ')
    .replace(/^\s*[-*+]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')
    .replace(/(\*\*|__|\*|_|~~|`)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

// ── URLs ─────────────────────────────────────────────────────────────────────
function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function getBlogUrl(slug: string): string {
  return withBase(`blog/${slug}`);
}

export function getBlogListUrl(): string {
  return withBase('blog');
}
