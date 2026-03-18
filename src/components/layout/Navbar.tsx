'use client';

import Link from 'next/link';
import { ShoppingBagIcon, UserIcon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { api } from '@/trpc/react';

export function Navbar() {
    const { data: cartItems } = api.cart.getCart.useQuery();
    const cartItemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white dark:bg-neutral-900 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <button type="button" className="p-2 mr-2 text-foreground/60 lg:hidden hover:text-foreground">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                                Lumina<span className="text-accent-rose">Intimates</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-8">
                        <Link href="/shop" className="text-sm font-semibold leading-6 hover:text-primary-600 transition-colors">
                            Shop All
                        </Link>
                        <Link href="/shop?category=for-her" className="text-sm font-semibold leading-6 hover:text-accent-rose transition-colors">
                            For Her
                        </Link>
                        <Link href="/shop?category=for-couples" className="text-sm font-semibold leading-6 hover:text-primary-600 transition-colors">
                            Couples
                        </Link>
                        <Link href="/shop?category=sale" className="text-sm font-semibold leading-6 text-accent-rose hover:text-red-500 transition-colors">
                            Sale
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:block relative">
                            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/50" />
                            <input
                                type="search"
                                placeholder="Search discreetly..."
                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 pl-9 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
                            />
                        </div>

                        <Link href="/account" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors hidden sm:block">
                            <UserIcon className="h-5 w-5" />
                        </Link>
                        <Link href="/cart" className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors group">
                            <ShoppingBagIcon className="h-5 w-5 group-hover:text-primary-600" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-rose rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Privacy banner */}
            <div className="bg-primary-900 text-white py-2 text-center text-xs font-medium tracking-wide">
                <span className="opacity-90">100% DISCREET BILLING & PACKAGING</span>
                <span className="mx-2 opacity-50">|</span>
                <span className="text-accent-gold">FREE SHIPPING OVER ₹1500</span>
            </div>
        </nav>
    );
}
