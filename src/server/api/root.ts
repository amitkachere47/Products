import { createTRPCRouter } from './trpc';
import { productRouter } from './routers/product';
import { cartRouter } from './routers/cart';
import { checkoutRouter } from './routers/checkout';

export const appRouter = createTRPCRouter({
    product: productRouter,
    cart: cartRouter,
    checkout: checkoutRouter,
});

export type AppRouter = typeof appRouter;
