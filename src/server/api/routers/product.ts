import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { MOCK_DB } from '../../mock-db/data';

export const productRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({
            categoryId: z.string().optional(),
            search: z.string().optional(),
            sortBy: z.enum(['newest', 'price-asc', 'price-desc', 'rating']).optional(),
        }).optional())
        .query(({ input }) => {
            let filtered = [...MOCK_DB.products];

            if (input?.categoryId) {
                filtered = filtered.filter(p => p.categoryId === input.categoryId);
            }

            if (input?.search) {
                const query = input.search.toLowerCase();
                filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
            }

            if (input?.sortBy) {
                switch (input.sortBy) {
                    case 'price-asc':
                        filtered.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-desc':
                        filtered.sort((a, b) => b.price - a.price);
                        break;
                    case 'rating':
                        filtered.sort((a, b) => b.rating - a.rating);
                        break;
                    case 'newest':
                    default:
                        // Mock newest by keeping original order or id desc
                        break;
                }
            }

            return filtered;
        }),

    getFeatured: publicProcedure.query(() => {
        return MOCK_DB.products.filter(p => p.isFeatured).slice(0, 4);
    }),

    getCategories: publicProcedure.query(() => {
        return MOCK_DB.categories;
    }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(({ input }) => {
            return MOCK_DB.products.find(p => p.slug === input.slug);
        }),
});
