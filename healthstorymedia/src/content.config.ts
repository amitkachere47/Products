import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './site.config';

const categoryKeys = Object.keys(CATEGORIES) as [string, ...string[]];

const product = z.object({
  name: z.string(),
  bestFor: z.string().optional(),
  price: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  link: z.string(), // e.g. /go/oura/ or full affiliate URL
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  summary: z.string().optional(),
});

const articles = defineCollection({
  // Files live at src/content/articles/<category>/<slug>.md -> URL /<category>/<slug>/
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    category: z.enum(categoryKeys),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('editorial'),
    reviewer: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    affiliate: z.boolean().default(false),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    quickPick: product.optional(),
    products: z.array(product).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
  }),
});

const pages = defineCollection({
  // Trust/legal pages: src/content/pages/<slug>.md -> URL /<slug>/
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { articles, pages };
