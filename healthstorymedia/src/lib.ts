import { getCollection } from 'astro:content';

// Published articles, newest first. Drafts show only in `npm run dev`.
export async function getArticles() {
  const all = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort(
    (a, b) =>
      (b.data.updatedDate ?? b.data.publishDate).valueOf() - (a.data.updatedDate ?? a.data.publishDate).valueOf(),
  );
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
