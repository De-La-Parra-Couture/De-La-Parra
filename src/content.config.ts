import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishedDate: z.coerce.date(),
      coverImage: image().optional(),
    }),
});

export const collections = { blog };
