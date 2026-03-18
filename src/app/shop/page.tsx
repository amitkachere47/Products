'use client';

export const dynamic = 'force-dynamic';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { ProductCard } from '@/components/ui/ProductCard';
import {
    SparklesIcon,
    FireIcon,
    HandRaisedIcon,
    RocketLaunchIcon,
    ChatBubbleLeftRightIcon,
    ShieldCheckIcon,
    CheckBadgeIcon,
    CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

function ShopContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const queryCategory = searchParams.get('category');
    const querySort = searchParams.get('sort');
    const querySearch = searchParams.get('q');

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
        queryCategory || undefined
    );

    const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating' | undefined>(
        (querySort as any) || 'newest'
    );

    const [searchQuery, setSearchQuery] = useState(querySearch || '');

    const { data: categories } = api.product.getCategories.useQuery();
    const { data: products, isLoading } = api.product.getAll.useQuery({
        categoryId: categories?.find(c => c.slug === selectedCategory)?.id,
        sortBy: sortBy,
        search: searchQuery || undefined,
    });

    const handleCategorySelect = (slug: string | undefined) => {
        setSelectedCategory(slug);
        const params = new URLSearchParams(searchParams);
        if (slug) {
            params.set('category', slug);
        } else {
            params.delete('category');
        }
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as any;
        setSortBy(value);
        const params = new URLSearchParams(searchParams);
        params.set('sort', value);
        router.push(`/shop?${params.toString()}`);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (searchQuery) {
            params.set('q', searchQuery);
        } else {
            params.delete('q');
        }
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Promotional Hero - NEW 1 */}
            <div className="relative rounded-[40px] overflow-hidden bg-primary-900 mb-12 h-48 md:h-64 flex items-center">
                <div className="absolute inset-0 z-0">
                    <Image src="/images/products/hero_intimacy_lifestyle.png" alt="Promo" fill className="object-cover opacity-40 mix-blend-luminosity" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/60 to-transparent" />
                </div>
                <div className="relative z-10 p-8 md:p-12 max-w-xl">
                    <span className="text-accent-rose font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Seasonal Edit</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Art of Connection</h2>
                    <p className="text-primary-200 text-sm md:text-base">Explore our curated pairings designed to deepen intimacy. 15% off for Pulse members.</p>
                </div>
            </div>

            {/* Experience Filters - NEW 2 */}
            <div className="mb-12">
                <h3 className="text-sm font-bold text-primary-900 dark:text-primary-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <CursorArrowRaysIcon className="w-5 h-5 text-accent-rose" />
                    Shop by Experience
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 hover:border-accent-rose dark:hover:border-accent-rose transition-all group">
                        <div className="w-10 h-10 rounded-full bg-accent-rose/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <FireIcon className="w-5 h-5 text-accent-rose" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm text-primary-950 dark:text-white">Intensity</p>
                            <p className="text-[10px] text-primary-500 uppercase font-bold tracking-tighter">High Performance</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 hover:border-accent-gold dark:hover:border-accent-gold transition-all group">
                        <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <SparklesIcon className="w-5 h-5 text-accent-gold" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm text-primary-950 dark:text-white">Wellness</p>
                            <p className="text-[10px] text-primary-500 uppercase font-bold tracking-tighter">Care & Balance</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 hover:border-primary-500 transition-all group">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <HandRaisedIcon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm text-primary-950 dark:text-white">Relaxation</p>
                            <p className="text-[10px] text-primary-500 uppercase font-bold tracking-tighter">Slow & Sensory</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 hover:border-accent-rose transition-all group">
                        <div className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <RocketLaunchIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm text-primary-950 dark:text-white">Innovation</p>
                            <p className="text-[10px] text-primary-500 uppercase font-bold tracking-tighter">Latest Technology</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {selectedCategory
                            ? categories?.find(c => c.slug === selectedCategory)?.name || 'Collection'
                            : 'All Products'}
                    </h1>
                    <p className="text-foreground/60 mt-1">
                        {products?.length || 0} {products?.length === 1 ? 'Product' : 'Products'} found
                    </p>
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                    <form onSubmit={handleSearchSubmit} className="relative flex-grow sm:flex-grow-0">
                        <input
                            type="search"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 px-3 py-2 rounded-md border border-input focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        />
                    </form>
                    <select
                        value={sortBy}
                        onChange={handleSortSelect}
                        className="h-10 px-3 py-2 rounded-md border border-input focus:ring-1 focus:ring-primary-500 focus:outline-none bg-background cursor-pointer"
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 bg-primary-50 dark:bg-neutral-900 rounded-xl p-6 border border-primary-100 dark:border-neutral-800">
                        <h3 className="font-bold text-lg mb-4 text-foreground border-b border-primary-200 dark:border-neutral-800 pb-2">Categories</h3>
                        <ul className="space-y-3 mt-4 text-sm">
                            <li>
                                <button
                                    onClick={() => handleCategorySelect(undefined)}
                                    className={`w-full text-left transition-colors ${!selectedCategory ? 'font-bold text-accent-rose' : 'text-foreground/70 hover:text-foreground'}`}
                                >
                                    All Categories
                                </button>
                            </li>
                            {categories?.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => handleCategorySelect(cat.slug)}
                                        className={`w-full text-left transition-colors ${selectedCategory === cat.slug ? 'font-bold text-accent-rose' : 'text-foreground/70 hover:text-foreground'}`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Added privacy reminder in sidebar */}
                        <div className="mt-8 pt-6 border-t border-primary-200 dark:border-neutral-800">
                            <h4 className="font-semibold text-sm mb-2 opacity-80 uppercase tracking-widest text-primary-900 dark:text-primary-100">Privacy First</h4>
                            <p className="text-xs text-primary-700 dark:text-primary-300 leading-relaxed">
                                Your order is entirely discreet. Anonymous billing and unmarked packaging guaranteed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="animate-pulse flex flex-col gap-4">
                                    <div className="bg-primary-100 rounded-xl aspect-[4/5] w-full" />
                                    <div className="h-4 bg-primary-100 rounded w-3/4" />
                                    <div className="h-4 bg-primary-100 rounded w-1/4" />
                                </div>
                            ))}
                        </div>
                    ) : products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-primary-50 dark:bg-neutral-900 rounded-xl border border-primary-100 dark:border-neutral-800 border-dashed">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold mb-2">No products found</h3>
                            <p className="text-foreground/60 mb-6">Try adjusting your category filters or search query.</p>
                            <button
                                onClick={() => {
                                    handleCategorySelect(undefined);
                                    setSearchQuery('');
                                    router.push('/shop');
                                }}
                                className="px-6 py-2 bg-primary-900 text-white rounded-full font-medium hover:bg-primary-800 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Expert Concierge banner - NEW 3 */}
            <div className="mt-24 p-8 md:p-16 rounded-[40px] bg-primary-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-rose/10 blur-[100px] rounded-full translate-x-1/2" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 italic font-serif">A more personal way to shop.</h2>
                        <p className="text-primary-200 text-lg mb-10 max-w-2xl mx-auto lg:mx-0">
                            Our specialists are deeply knowledgeable and completely non-judgmental. Experience expert guidance from the comfort of your screen.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <button className="bg-accent-rose px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                Start Anonymous Chat
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
                        <div className="flex flex-col items-center gap-2">
                            <ShieldCheckIcon className="w-8 h-8 text-accent-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-center">Encrypted<br />Dialogue</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <CheckBadgeIcon className="w-8 h-8 text-primary-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-center">Verified<br />Experts</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conscious Choice Footer - NEW 4 */}
            <div className="mt-24 text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-primary-950 dark:text-white mb-4">Lumina Conscious Choice</h3>
                <p className="text-primary-600 dark:text-primary-400 mb-8 leading-relaxed">
                    We select brands that prioritize sustainability, body-safe materials, and ethical manufacturing. Every product in this gallery is a step towards a healthier, more conscious lifestyle.
                </p>
                <div className="flex items-center justify-center gap-8 opacity-40">
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">100% Medical Grade</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Eco-Safe Packaging</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Cruelty Free</span>
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="container mx-auto p-12 text-center">Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}
