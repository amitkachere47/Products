import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const checkoutRouter = createTRPCRouter({
    createOrder: publicProcedure
        .input(z.object({
            address: z.object({
                street: z.string(),
                city: z.string(),
                state: z.string(),
                zipCode: z.string(),
                country: z.string(),
            }),
            items: z.array(z.object({
                productId: z.string(),
                quantity: z.number(),
                price: z.number(),
            })),
            totalAmount: z.number(),
        }))
        .mutation(() => {
            // Mock successful order creation
            return {
                success: true,
                orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                status: 'PENDING',
            };
        }),
});
