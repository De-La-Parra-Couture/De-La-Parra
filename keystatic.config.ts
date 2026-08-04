import { config, collection, fields } from '@keystatic/core';

// =============================================================================
// De la Parra Couture — Keystatic
// - Producción (Vercel): almacenamiento git-backed con login de GitHub
// - Desarrollo local: almacenamiento local sin autenticación
// =============================================================================
const isProduction = process.env.NODE_ENV === 'production';

export default config({
  storage: isProduction
    ? {
        kind: 'github',
        repo: {
          owner: 'De-La-Parra-Couture',
          name: 'De-La-Parra',
        },
      }
    : {
        kind: 'local',
      },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        publishedDate: fields.date({ label: 'Fecha de publicación' }),
        coverImage: fields.image({
          label: 'Imagen de portada',
          directory: 'src/assets/blog',
          publicPath: '@assets/blog/',
        }),
        content: fields.mdx({
          label: 'Contenido',
          extension: 'md',
          options: {
            bold: true,
            italic: true,
            orderedList: true,
            unorderedList: true,
            link: true,
            image: {
              directory: 'src/assets/blog/images',
              publicPath: '@assets/blog/images/',
            },
          },
        }),
      },
    }),
  },
});
