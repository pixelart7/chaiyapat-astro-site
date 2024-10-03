import { z, defineCollection } from 'astro:content';

const gardenCollection = defineCollection({
  type: 'content',
  schema: z.object({
    created: z.date().optional(),
    updated: z.date().optional(),
    cover: z.string().optional(),
    abstract: z.string().optional(),
    unlisted: z.boolean().optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  'garden': gardenCollection,
};