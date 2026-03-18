import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { MOCK_DB } from '../../mock-db/data';

// In-memory mock cart data
let mockCartItems: Array<{ id: string, cartId: string, productId: string, quantity: number, product: any }> = [];

export const cartRouter = createTRPCRouter({
    getCart: publicProcedure.query(() => {
        return mockCartItems;
    }),

    addToCart: publicProcedure
        .input(z.object({
            productId: z.string(),
            quantity: z.number().min(1),
        }))
        .mutation(({ input }) => {
            const product = MOCK_DB.products.find(p => p.id === input.productId);
            if (!product) throw new Error('Product not found');

            const existingItem = mockCartItems.find(item => item.productId === input.productId);

            if (existingItem) {
                existingItem.quantity += input.quantity;
                return existingItem;
            }

            const newItem = {
                id: Math.random().toString(36).substr(2, 9),
                cartId: 'mock-cart-1',
                productId: input.productId,
                quantity: input.quantity,
                product,
            };

            mockCartItems.push(newItem);
            return newItem;
        }),

    updateQuantity: publicProcedure
        .input(z.object({
            itemId: z.string(),
            quantity: z.number().min(1),
        }))
        .mutation(({ input }) => {
            const item = mockCartItems.find(i => i.id === input.itemId);
            if (item) {
                item.quantity = input.quantity;
            }
            return item;
        }),

    removeFromCart: publicProcedure
        .input(z.object({
            itemId: z.string(),
        }))
        .mutation(({ input }) => {
            mockCartItems = mockCartItems.filter(item => item.id !== input.itemId);
            return { success: true };
        }),

    clearCart: publicProcedure.mutation(() => {
        mockCartItems = [];
        return { success: true };
    }),
});
