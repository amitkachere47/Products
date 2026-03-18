'use client';

export const dynamic = 'force-dynamic';
import { useParams } from 'next/navigation';
import { api } from '@/trpc/react';
import Link from 'next/link';
import NextImage from 'next/image';
import {
    ShoppingBagIcon,
    StarIcon,
    ShieldCheckIcon,
    TruckIcon,
    SparklesIcon,
    ArrowPathIcon,
    QuestionMarkCircleIcon,
    CheckBadgeIcon,
    LifebuoyIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const trpc = api.useUtils();

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    // Use the specific getBySlug query for better performance and reliability
    const { data: product, isLoading } = api.product.getBySlug.useQuery({ slug });

    const addToCartMutation = api.cart.addToCart.useMutation({
        onSuccess: () => {
            trpc.cart.getCart.invalidate();
        }
    });

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 animate-pulse">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="w-full md:w-1/2 aspect-square bg-primary-50 rounded-2xl" />
                    <div className="w-full md:w-1/2 space-y-6 pt-8">
                        <div className="h-10 bg-primary-50 rounded w-3/4" />
                        <div className="h-6 bg-primary-50 rounded w-1/4" />
                        <div className="h-24 bg-primary-50 rounded w-full" />
                        <div className="h-12 bg-primary-100 rounded-full w-48" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold text-primary-900 mb-4">Product Not Found</h1>
                <p className="text-primary-600 mb-8">The product you are looking for does not exist or has been removed.</p>
                <Link href="/shop" className="inline-flex items-center px-8 py-3 bg-primary-900 text-white rounded-full font-medium hover:bg-primary-800 transition-colors">
                    Return to Shop
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCartMutation.mutate({
            productId: product.id,
            quantity,
        });
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="bg-primary-50/50 border-b border-primary-100 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-sm text-primary-600 flex items-center gap-2">
                    <Link href="/" className="hover:text-primary-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-primary-900 transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-primary-900 font-medium truncate">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Image Gallery Mock */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden bg-primary-50 border border-primary-100 group">
                            {product.imageUrl ? (
                                <NextImage
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    unoptimized
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/40 to-primary-50/40 dark:from-neutral-800/80 dark:to-neutral-900/40 mix-blend-multiply" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-primary-300 dark:text-neutral-500 font-medium tracking-widest uppercase border-2 border-primary-200 dark:border-neutral-600 border-dashed rounded-xl p-12 backdrop-blur-sm bg-white/30 dark:bg-neutral-800/30">
                                            Premium Product Image
                                        </div>
                                    </div>
                                </>
                            )}
                            {discount > 0 && (
                                <div className="absolute top-6 left-6 bg-accent-rose text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md z-10">
                                    Save {discount}%
                                </div>
                            )}
                        </div>

                        {/* Thumbnail mocks */}
                        <div className="flex gap-4 mt-4 overflow-x-auto pb-2 custom-scrollbar">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl shrink-0 cursor-pointer overflow-hidden border-2 ${i === 1 ? 'border-primary-500 bg-primary-100' : 'border-transparent bg-primary-50 hover:border-primary-200'} transition-all`}>
                                    <div className="w-full h-full flex items-center justify-center text-primary-300 text-xs text-center p-2">
                                        View {i}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-950 mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-accent-gold' : 'text-primary-200'}`} />
                                    ))}
                                    <span className="ml-2 font-medium text-foreground">{product.rating.toFixed(1)}</span>
                                </div>
                                <span className="text-primary-300">|</span>
                                <span className="text-primary-600 underline decoration-primary-200 underline-offset-4 cursor-pointer hover:text-primary-900 transition-colors">
                                    {product.numReviews} Reviews
                                </span>
                            </div>

                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold text-primary-900">₹{product.price.toLocaleString('en-IN')}</span>
                                {product.originalPrice && (
                                    <span className="text-lg text-primary-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-primary-700 text-lg leading-relaxed mb-8">
                            Experience unparalleled satisfaction and wellness with this beautifully designed, premium intimate product. Crafted with body-safe materials and engineered for exceptional pleasure.
                        </p>

                        {/* Add to Cart Section */}
                        <div className="bg-primary-50 dark:bg-neutral-900 p-6 rounded-2xl border border-primary-100 dark:border-neutral-800 mb-8">
                            <div className="font-semibold text-primary-900 dark:text-primary-100 mb-4 block">Quantity</div>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="flex items-center border-2 border-primary-200 dark:border-neutral-700 rounded-full bg-white dark:bg-neutral-800 h-14 w-full sm:w-40 justify-between px-2 w-full">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-50 dark:hover:bg-neutral-700 text-primary-700 dark:text-primary-300 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="font-bold text-lg text-primary-900 w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-50 text-primary-700 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={addToCartMutation.isPending}
                                    className="h-14 flex-1 w-full bg-accent-rose hover:bg-accent-rose/90 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {addToCartMutation.isPending ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Adding...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <ShoppingBagIcon className="w-6 h-6" />
                                            Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 shadow-sm">
                                <ShieldCheckIcon className="w-6 h-6 text-accent-gold shrink-0" />
                                <div>
                                    <h4 className="font-bold text-sm text-primary-900 dark:text-primary-100">100% Discreet</h4>
                                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Plain packaging, anonymous billing.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 shadow-sm">
                                <TruckIcon className="w-6 h-6 text-primary-500 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-sm text-primary-900 dark:text-primary-100">Free Shipping</h4>
                                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">On all orders over ₹1500.</p>
                                </div>
                            </div>
                        </div>

                        {/* Accordion List */}
                        <div className="mt-10 border-t border-primary-200 dark:border-neutral-800 divide-y divide-primary-200 dark:divide-neutral-800">
                            <div className="py-4">
                                <h3
                                    className="font-bold text-primary-900 dark:text-primary-100 flex justify-between items-center group-hover:text-accent-rose transition-colors cursor-pointer"
                                    onClick={() => toggleAccordion('details')}
                                >
                                    Product Details
                                    <span className="text-primary-400 dark:text-primary-600">{openAccordion === 'details' ? '−' : '+'}</span>
                                </h3>
                                {openAccordion === 'details' && (
                                    <div className="mt-4 text-sm text-primary-700 dark:text-primary-300 leading-relaxed animate-in fade-in slide-in-from-top-2">
                                        Made with 100% medical-grade silicone for a velvety smooth touch. Completely waterproof for aquatic fun and easy cleaning. USB rechargeable for long-lasting power. Features ultra-quiet motors for absolute discretion.
                                    </div>
                                )}
                            </div>
                            <div className="py-4">
                                <h3
                                    className="font-bold text-primary-900 dark:text-primary-100 flex justify-between items-center group-hover:text-accent-rose transition-colors cursor-pointer"
                                    onClick={() => toggleAccordion('shipping')}
                                >
                                    Shipping & Returns
                                    <span className="text-primary-400 dark:text-primary-600">{openAccordion === 'shipping' ? '−' : '+'}</span>
                                </h3>
                                {openAccordion === 'shipping' && (
                                    <div className="mt-4 text-sm text-primary-700 dark:text-primary-300 leading-relaxed animate-in fade-in slide-in-from-top-2">
                                        Enjoy free standard shipping on all orders over ₹1500. Orders are dispatched within 24 hours in unmarked, generic boxes. For hygiene reasons, intimate products cannot be returned once the security seal is broken unless defective.
                                    </div>
                                )}
                            </div>
                            <div className="py-4">
                                <h3
                                    className="font-bold text-primary-900 dark:text-primary-100 flex justify-between items-center group-hover:text-accent-rose transition-colors cursor-pointer"
                                    onClick={() => toggleAccordion('care')}
                                >
                                    How to Use & Care
                                    <span className="text-primary-400 dark:text-primary-600">{openAccordion === 'care' ? '−' : '+'}</span>
                                </h3>
                                {openAccordion === 'care' && (
                                    <div className="mt-4 text-sm text-primary-700 dark:text-primary-300 leading-relaxed animate-in fade-in slide-in-from-top-2">
                                        Use only with premium water-based lubricants. Avoid silicone-based lubricants as they may degrade the material. Clean thoroughly before and after every use with warm water and antibacterial toy cleaner. Store in a cool, dry place away from direct sunlight.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Smart Bundles - NEW 1 */}
                        <div className="mt-12 bg-accent-rose/5 dark:bg-neutral-900 border border-accent-rose/20 dark:border-neutral-800 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-primary-950 dark:text-white mb-6 flex items-center gap-2">
                                <SparklesIcon className="w-5 h-5 text-accent-rose" />
                                Smart Bundle & Save
                            </h3>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-primary-100 dark:bg-neutral-800 shrink-0">
                                        <NextImage src="/images/products/cat_essentials.png" alt="Bundle item" fill className="object-cover" unoptimized />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm text-primary-950 dark:text-white">Premium Silk Lubricant (100ml)</h4>
                                        <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Perfect companion for silicone.</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-accent-rose">₹899</span>
                                            <button className="text-xs font-bold text-primary-700 dark:text-primary-400 hover:text-accent-rose transition-colors">+ Add to Bundle</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-primary-100 dark:border-neutral-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-primary-600 dark:text-primary-400 uppercase font-bold tracking-wider">Bundle Total</p>
                                        <p className="text-xl font-bold text-primary-950 dark:text-white">₹{(product.price + 899).toLocaleString('en-IN')}</p>
                                    </div>
                                    <button className="bg-primary-950 dark:bg-accent-rose text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">Add Bundle to Cart</button>
                                </div>
                            </div>
                        </div>

                        {/* Technical Comparison - NEW 2 */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-primary-950 dark:text-white mb-8">Performance Comparison</h3>
                            <div className="overflow-hidden rounded-2xl border border-primary-100 dark:border-neutral-800">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-primary-50 dark:bg-neutral-900">
                                        <tr>
                                            <th className="p-4 font-bold text-primary-950 dark:text-white">Feature</th>
                                            <th className="p-4 font-bold text-accent-rose">This {product.name}</th>
                                            <th className="p-4 font-extralight text-primary-400">Standard Models</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary-100 dark:divide-neutral-800">
                                        <tr>
                                            <td className="p-4 text-primary-700 dark:text-primary-300">Material</td>
                                            <td className="p-4 font-bold text-primary-950 dark:text-white">Silky Medical Silicone</td>
                                            <td className="p-4 text-primary-700 dark:text-primary-400">Standard ABS Plastic</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary-700 dark:text-primary-300">Vibration Modes</td>
                                            <td className="p-4 font-bold text-primary-950 dark:text-white">12 Whisper-Quiet</td>
                                            <td className="p-4 text-primary-700 dark:text-primary-400">3-5 Standard</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary-700 dark:text-primary-300">Battery Life</td>
                                            <td className="p-4 font-bold text-primary-950 dark:text-white">Up to 3 Hours</td>
                                            <td className="p-4 text-primary-700 dark:text-primary-400">45-60 Minutes</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary-700 dark:text-primary-300">Waterproof Rating</td>
                                            <td className="p-4 font-bold text-primary-950 dark:text-white">IPX7 (Submersible)</td>
                                            <td className="p-4 text-primary-700 dark:text-primary-400">Splash-proof only</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Lifestyle Visual Block - NEW 3 */}
            <div className="bg-primary-950 py-24 mt-20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-transparent to-primary-950 z-10" />
                <NextImage
                    src="/images/products/hero_intimacy_lifestyle.png"
                    alt="Design Philosophy"
                    fill
                    className="object-cover opacity-30 mix-blend-luminosity"
                    unoptimized
                />
                <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
                    <span className="text-accent-rose font-bold tracking-[0.3em] uppercase mb-6 block text-sm">Design Meets Desire</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-10 leading-tight">
                        "Elegance is the only beauty that never fades."
                    </h2>
                    <p className="text-primary-200 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                        We believe that intimate wellness products should be as beautiful as they are functional. Pieces that you are proud to own, and even prouder to use.
                    </p>
                    <div className="flex flex-wrap justify-center gap-12">
                        <div className="flex flex-col items-center">
                            <CheckBadgeIcon className="w-10 h-10 text-accent-gold mb-4" />
                            <span className="text-white font-bold">Award Winning</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <SparklesIcon className="w-10 h-10 text-accent-rose mb-4" />
                            <span className="text-white font-bold">Patented Tech</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <ShieldCheckIcon className="w-10 h-10 text-primary-400 mb-4" />
                            <span className="text-white font-bold">Body Safe Labs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expert Advice Block - NEW 4 */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="bg-primary-50 dark:bg-neutral-900 rounded-[50px] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16 border border-primary-100 dark:border-neutral-800">
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-950 dark:text-white mb-6">Unsure if this is right for you?</h2>
                        <p className="text-primary-700 dark:text-primary-400 text-lg mb-10 leading-relaxed">
                            Our team of discreet intimacy specialists is available 24/7. Whether you have questions about materials, sensations, or shipping, we're here to help you choose with absolute confidence.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <button className="bg-primary-950 dark:bg-accent-rose text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all">Chat Discreetly Now</button>
                            <button className="bg-white dark:bg-neutral-800 text-primary-950 dark:text-white border-2 border-primary-100 dark:border-neutral-700 px-10 py-4 rounded-full font-bold hover:bg-primary-50 transition-all transition-colors">WhatsApp Concierge</button>
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60 grayscale items-center">
                            <div className="flex items-center gap-2"><LifebuoyIcon className="w-5 h-5" /> <span className="text-xs font-bold uppercase">24/7 Support</span></div>
                            <div className="flex items-center gap-2"><QuestionMarkCircleIcon className="w-5 h-5" /> <span className="text-xs font-bold uppercase">Discreet Billing</span></div>
                            <div className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5" /> <span className="text-xs font-bold uppercase">Hassle Free Replacements</span></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="relative aspect-square rounded-[40px] overflow-hidden bg-primary-100 dark:bg-neutral-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <NextImage src="/images/products/cat_for_her.png" alt="Support Specialist" fill className="object-cover" unoptimized />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendation Slider - NEW 5 */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary-950 dark:text-white mb-2">You May Also Adore</h2>
                        <p className="text-primary-600 dark:text-primary-400">Hand-picked additions based on your current selection.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Placeholder for similar products */}
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-primary-50 dark:bg-neutral-800 mb-4">
                                <NextImage src={`/images/products/${i % 2 === 0 ? 'cat_sex_toys.png' : 'cat_lingerie.png'}`} alt="Recommended" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ShoppingBagIcon className="w-5 h-5 text-primary-900 dark:text-white text-center" />
                                </div>
                            </div>
                            <h4 className="font-bold text-primary-950 dark:text-white group-hover:text-accent-rose transition-colors">Premium Collection Item {i}</h4>
                            <p className="text-sm text-primary-600 dark:text-primary-400">₹{(2999 + (i * 500)).toLocaleString('en-IN')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
