'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/solid';
import { api } from '@/trpc/react';

type Product = {
    id: string;
    name: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    numReviews: number;
    slug: string;
    categoryId: string;
    imageUrl?: string;
};

export function ProductCard({ product }: { product: Product }) {
    const trpc = api.useUtils();
    const addToCartMutation = api.cart.addToCart.useMutation({
        onSuccess: () => {
            trpc.cart.getCart.invalidate();
            // In a real app we might show a toast notification here
        }
    });

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCartMutation.mutate({ productId: product.id, quantity: 1 });
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-primary-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all hover:shadow-lg">
            <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-primary-50 dark:bg-neutral-800">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={true}
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-primary-50 dark:from-neutral-800 dark:to-neutral-700 opacity-60 transition-opacity group-hover:opacity-40" />
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="w-full h-full border-2 border-dashed border-primary-200 dark:border-neutral-600 rounded flex items-center justify-center">
                                <span className="text-primary-300 dark:text-neutral-500 text-sm font-medium">Image coming soon</span>
                            </div>
                        </div>
                    </>
                )}

                {discount > 0 && (
                    <div className="absolute left-2 top-2 rounded bg-accent-rose px-2 py-1 text-xs font-bold text-white shadow-sm">
                        Save {discount}%
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-accent-gold" />
                        <span className="text-xs font-medium text-foreground">{product.rating.toFixed(1)}</span>
                        <span className="text-xs text-foreground/50">({product.numReviews})</span>
                    </div>
                </div>

                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-medium leading-tight text-foreground transition-colors group-hover:text-primary-600 line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-foreground/50 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={addToCartMutation.isPending}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 dark:bg-neutral-800 text-primary-900 dark:text-primary-100 transition-colors hover:bg-primary-900 dark:hover:bg-neutral-700 hover:text-white disabled:opacity-50"
                        aria-label="Add to cart"
                    >
                        {addToCartMutation.isPending ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                            <ShoppingBagIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
