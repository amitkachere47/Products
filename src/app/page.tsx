'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/trpc/react';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  ShieldCheckIcon,
  TruckIcon,
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  NewspaperIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const { data: featuredProducts, isLoading } = api.product.getFeatured.useQuery();
  const { data: categories } = api.product.getCategories.useQuery();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-950 text-white min-h-[60vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 to-primary-900/50 z-10" />
          <Image
            src="/images/products/hero_intimacy_lifestyle.png"
            alt="Lumina Intimates Lifestyle"
            fill
            className="object-cover mix-blend-overlay opacity-60"
            priority
            unoptimized
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Elevate Your <span className="text-accent-rose">Intimacy</span> & Wellness
            </h1>
            <p className="text-lg sm:text-xl text-primary-200 mb-8 max-w-xl line-relaxed">
              Discover our premium collection of carefully curated products designed for pleasure, connection, and self-care. Delivered with 100% discretion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full text-primary-950 bg-accent-rose hover:bg-accent-rose/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Shop Collection
              </Link>
              <Link
                href="/shop?category=for-couples"
                className="inline-flex justify-center items-center px-8 py-3.5 border border-primary-200 text-base font-medium rounded-full text-white hover:bg-primary-800 transition-all"
              >
                For Couples
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-primary-50 dark:bg-neutral-900 py-8 border-y border-primary-100 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary-900 mb-1">1M+</span>
              <span className="text-xs text-primary-600 uppercase tracking-wider font-semibold">Orders Shipped</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary-900 mb-1">4.8/5</span>
              <span className="text-xs text-primary-600 uppercase tracking-wider font-semibold">Average Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary-900 mb-1">100%</span>
              <span className="text-xs text-primary-600 uppercase tracking-wider font-semibold">Discreet Packaging</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary-900 mb-1">13 Yrs</span>
              <span className="text-xs text-primary-600 uppercase tracking-wider font-semibold">Industry Trust</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Featured Favorites</h2>
              <p className="text-foreground/60 max-w-2xl">Our highest-rated premium selections loved by thousands.</p>
            </div>
            <Link href="/shop" className="hidden sm:flex text-primary-600 hover:text-primary-800 font-medium items-center group">
              View All
              <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="bg-primary-100 rounded-xl aspect-[4/5] w-full" />
                  <div className="h-4 bg-primary-100 rounded w-3/4" />
                  <div className="h-4 bg-primary-100 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-10 sm:hidden flex justify-center">
            <Link href="/shop" className="text-primary-600 hover:text-primary-800 font-medium">
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Curated Collections - NEW 1 */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Curated for Your Journey</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto italic font-serif text-lg">"Intimacy is a personal map; we provide the premium guide."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/shop?category=for-her" className="group relative h-[450px] overflow-hidden rounded-3xl bg-primary-900">
              <Image
                src="/images/products/cat_for_her.png"
                alt="Premium Collections"
                fill
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/20 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-accent-rose font-bold tracking-widest uppercase text-sm mb-2 block">The Essentials</span>
                <h3 className="text-4xl font-bold mb-4">Solo Exploration</h3>
                <button className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white hover:text-primary-950 transition-all font-semibold">View Selection</button>
              </div>
            </Link>

            <div className="grid grid-rows-2 gap-8">
              <Link href="/shop?category=for-couples" className="group relative overflow-hidden rounded-3xl bg-primary-800">
                <Image
                  src="/images/products/cat_couples.png"
                  alt="Couples Collection"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/40 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-center items-start text-white">
                  <h3 className="text-3xl font-bold mb-2">Better Together</h3>
                  <p className="text-primary-200 mb-4 max-w-xs">Enhance connection with our most loved couple sets.</p>
                  <span className="text-accent-gold font-bold flex items-center gap-2">Explore Sets <span>&rarr;</span></span>
                </div>
              </Link>
              <Link href="/shop?category=kink-bdsm" className="group relative overflow-hidden rounded-3xl bg-neutral-900">
                <Image
                  src="/images/products/cat_bdsm.png"
                  alt="Modern BDSM"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-center items-start text-white">
                  <h3 className="text-3xl font-bold mb-2">Modern Kink</h3>
                  <p className="text-primary-200 mb-4 max-w-xs">Elegantly designed tools for boundary-pushing play.</p>
                  <span className="text-accent-rose font-bold flex items-center gap-2">Discover More <span>&rarr;</span></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Excellence - NEW 2 */}
      <section className="py-24 bg-primary-50 dark:bg-neutral-950 border-y border-primary-100 dark:border-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-950 dark:text-white">Medical Grade Quality</h3>
              <p className="text-primary-600 dark:text-primary-400 leading-relaxed">Every item in our boutique is strictly tested and certified to be 100% body-safe and non-porous.</p>
            </div>
            <div className="flex flex-col items-center md:items-start p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent-rose/10 rounded-2xl flex items-center justify-center mb-6">
                <SparklesIcon className="w-8 h-8 text-accent-rose" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-950 dark:text-white">Curated by Experts</h3>
              <p className="text-primary-600 dark:text-primary-400 leading-relaxed">Our selection isn't automated. We personally evaluate every vibrator, lotion, and accessory for performance.</p>
            </div>
            <div className="flex flex-col items-center md:items-start p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <UserGroupIcon className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-950 dark:text-white">Discreet Community</h3>
              <p className="text-primary-600 dark:text-primary-400 leading-relaxed">Join 1M+ members who enjoy absolute privacy, dedicated support, and educational wellness resources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journal - NEW 3 */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">The Intimacy Journal</h2>
              <p className="text-foreground/60 max-w-xl">Deepening knowledge, sharing stories, and celebrating self-discovery.</p>
            </div>
            <Link href="/journal" className="px-8 py-3 dark:bg-neutral-900 bg-white border border-primary-200 dark:border-neutral-800 rounded-full font-bold hover:bg-primary-50 transition-colors">Read All Articles</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <div key={post} className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-primary-100 mb-6">
                  <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-primary-900/0 transition-colors z-10" />
                  <Image
                    src={post === 1 ? '/images/products/hero_intimacy_lifestyle.png' : post === 2 ? '/images/products/cat_lingerie.png' : '/images/products/cat_essentials.png'}
                    alt="Journal Post"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-rose">Wellness & Care</span>
                  <h4 className="text-xl font-bold text-primary-950 dark:text-white group-hover:text-accent-rose transition-colors leading-snug">
                    {post === 1 ? 'Elevating Connection: The New Science of Intimate Wellness' : post === 2 ? 'Finding Your Fit: A Guide to Sustainable Premium Lingerie' : 'Material Matters: Why Medical-Grade Silicone is Non-Negotiable'}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 text-sm line-clamp-2">
                    {post === 1 ? 'Exploring how modern design thinking is revolutionizing the way we experience pleasure and emotional connection at home.' : post === 2 ? 'Discover the intersection of comfort and confidence with our curated guide to selecting pieces that empower your ritual.' : 'Navigating the technical side of intimate toys. Learn how to spot high-quality materials for a safer experience.'}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold text-foreground/40 pt-2">
                    <span>March 2024</span>
                    <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                    <span>6 min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Stories - NEW 4 */}
      <section className="py-24 bg-primary-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-rose/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif italic text-accent-gold">Verified Experiences</h2>
            <div className="flex justify-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} className="w-6 h-6 text-accent-gold" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute -inset-4 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-0 bg-primary-900 rounded-full overflow-hidden border-8 border-white/5">
                <Image src="/images/products/cat_couples.png" alt="Happy Customer" fill className="object-cover" unoptimized />
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px]">
                <ChatBubbleBottomCenterTextIcon className="w-10 h-10 text-accent-rose mb-6" />
                <p className="text-2xl font-medium leading-relaxed mb-8 italic">
                  "I was hesitant about ordering online, but the discreet packaging and premium quality completely won me over. Lumina isn't just a store; it's an elevated experience."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center font-bold text-accent-gold">S.A</div>
                  <div>
                    <h5 className="font-bold">Sarah A.</h5>
                    <span className="text-sm text-white/50">Verified Pulse Member</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-all">&larr;</button>
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-all">&rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - NEW 5 */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-accent-rose/5 dark:bg-neutral-900 border border-accent-rose/20 dark:border-neutral-800 rounded-[50px] p-8 md:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-rose/10 blur-[80px] rounded-full" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <NewspaperIcon className="w-12 h-12 text-accent-rose" />
              </div>
              <h2 className="text-4xl font-bold text-primary-950 dark:text-white mb-4">Join the Inner Circle</h2>
              <p className="text-primary-700 dark:text-primary-400 mb-10 leading-relaxed">
                Step into a world of curated intimacy. Receive exclusive early access to drops, expert wellness guides, and 10% off your first premium order.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email discreetly"
                  className="flex-1 px-8 py-4 rounded-full bg-white dark:bg-neutral-800 border-2 border-primary-100 dark:border-neutral-700 focus:outline-none focus:border-accent-rose transition-all"
                />
                <button className="px-10 py-4 bg-primary-950 dark:bg-accent-rose text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">Join Pulse</button>
              </form>
              <p className="mt-6 text-xs text-primary-400">By joining, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>. Zero spam, absolute discretion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Gallery - NEW 6 */}
      <section className="py-24 bg-background border-t border-primary-100 dark:border-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <HeartIcon className="w-8 h-8 text-accent-rose mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">Aesthetically Yours</h2>
          <p className="text-foreground/60">Follow our curated visual journey @LuminaIntimates</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 px-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="relative aspect-square group overflow-hidden cursor-pointer">
              <Image
                src={i % 2 === 0 ? '/images/products/cat_lingerie.png' : '/images/products/hero_intimacy_lifestyle.png'}
                alt="Instagram Lifestyle"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                unoptimized
              />
              <div className="absolute inset-0 bg-accent-rose/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Guarantee Block */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent-gold">Our Privacy Guarantee</h2>
          <p className="text-primary-100 mb-8 leading-relaxed">
            We understand that privacy is paramount. Every order is shipped in plain, unmarked packaging with no identifying branding. Your credit card statement will show a generic corporate name to ensure absolute discretion from checkout to delivery.
          </p>
        </div>
      </section>
    </div>
  );
}
