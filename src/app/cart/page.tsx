'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { TrashIcon, PlusIcon, MinusIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const router = useRouter();
    const trpc = api.useUtils();
    const { data: cartItems, isLoading } = api.cart.getCart.useQuery();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const updateQuantityMutation = api.cart.updateQuantity.useMutation({
        onSuccess: () => trpc.cart.getCart.invalidate(),
    });

    const removeItemMutation = api.cart.removeFromCart.useMutation({
        onSuccess: () => trpc.cart.getCart.invalidate(),
    });

    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantityMutation.mutate({ itemId, quantity: newQuantity });
    };

    const handleRemoveItem = (itemId: string) => {
        removeItemMutation.mutate({ itemId });
    };

    const applyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        if (promoCode.toUpperCase() === 'LUMINA10') {
            setDiscount(0.1); // 10% off
        } else {
            alert('Invalid promo code');
            setDiscount(0);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-pulse h-8 w-64 bg-primary-100 mx-auto rounded mb-8" />
                <div className="max-w-4xl mx-auto space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="h-24 bg-primary-50 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-2xl">
                <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        <span className="text-4xl">🛍️</span>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4 text-primary-900">Your Cart is Empty</h1>
                <p className="text-primary-600 mb-8 text-lg">
                    Looks like you haven't added anything yet. Discover our premium collection of intimate wellness products.
                </p>
                <Link
                    href="/shop"
                    className="inline-flex items-center px-8 py-3 bg-accent-rose text-white rounded-full font-medium hover:bg-accent-rose/90 transition-all shadow-md hover:shadow-lg"
                >
                    Explore Collection
                </Link>
            </div>
        );
    }

    const subtotal = cartItems?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) ?? 0;
    const discountAmount = subtotal * discount;
    const shipping = subtotal > 1500 ? 0 : 150;
    const total = subtotal - discountAmount + shipping;

    return (
        <div className="container mx-auto px-4 py-10 lg:py-16">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-2/3 space-y-6">
                    {/* Cart Items List */}
                    <div className="bg-white rounded-2xl border border-primary-100 overflow-hidden shadow-sm">
                        <ul className="divide-y divide-primary-100">
                            {cartItems.map((item) => (
                                <li key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:bg-primary-50/50 transition-colors">
                                    <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                                        <span className="text-primary-300 text-xs">Image</span>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Link href={`/product/${item.product.slug}`} className="text-lg font-bold text-foreground hover:text-primary-600 transition-colors">
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-sm text-foreground/60 mt-1">Discreet Packaging Included</p>
                                            </div>
                                            <p className="text-lg font-bold whitespace-nowrap ml-4">₹{item.product.price.toLocaleString('en-IN')}</p>
                                        </div>

                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                            <div className="flex items-center border border-primary-200 rounded-full bg-white shadow-sm overflow-hidden">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                                                    className="px-3 py-1 hover:bg-primary-50 disabled:opacity-50 transition-colors text-primary-800"
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <span className="w-10 text-center font-semibold text-primary-900 border-x border-primary-100 py-1">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    disabled={updateQuantityMutation.isPending}
                                                    className="px-3 py-1 hover:bg-primary-50 disabled:opacity-50 transition-colors text-primary-800"
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                disabled={removeItemMutation.isPending}
                                                className="text-primary-600 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center"
                                                aria-label="Remove item"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                                <span className="ml-1 text-sm font-medium hidden sm:inline">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
                        <ShieldCheckIcon className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-primary-900 mb-1">100% Anonymous Billing & Returns</h4>
                            <p className="text-sm text-primary-700 leading-relaxed">Your credit card statement will show a generic corporate name. Returns are processed without questions to ensure complete discretion.</p>
                        </div>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-primary-950 text-white rounded-2xl p-6 md:p-8 sticky top-24 shadow-xl">
                        <h2 className="text-xl font-bold mb-6 text-primary-50 border-b border-primary-800 pb-4">Order Summary</h2>

                        <dl className="space-y-4 text-sm mb-6 pb-6 border-b border-primary-800">
                            <div className="flex justify-between items-center text-primary-200">
                                <dt>Subtotal ({cartItems?.reduce((acc, item) => acc + item.quantity, 0) ?? 0} items)</dt>
                                <dd className="font-medium text-white">₹{subtotal.toLocaleString('en-IN')}</dd>
                            </div>

                            {discountAmount > 0 && (
                                <div className="flex justify-between items-center text-accent-rose">
                                    <dt>Discount</dt>
                                    <dd>-₹{discountAmount.toLocaleString('en-IN')}</dd>
                                </div>
                            )}

                            <div className="flex justify-between items-center text-primary-200">
                                <dt className="flex items-center">
                                    Shipping
                                    {subtotal > 1500 && <span className="ml-2 text-[10px] bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Free</span>}
                                </dt>
                                <dd className="font-medium text-white">{shipping === 0 ? 'Free' : `₹${shipping}`}</dd>
                            </div>
                        </dl>

                        <div className="flex justify-between items-end mb-8">
                            <dt className="text-lg font-bold text-primary-50">Estimated Total</dt>
                            <dd className="text-2xl font-bold text-white">₹{total.toLocaleString('en-IN')}</dd>
                        </div>

                        <form onSubmit={applyPromo} className="mb-6">
                            <label htmlFor="promo" className="block text-xs uppercase tracking-wider font-semibold text-primary-400 mb-2">Promo Code</label>
                            <div className="flex gap-2">
                                <input
                                    id="promo"
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="e.g. LUMINA10"
                                    className="flex-1 bg-primary-900 border border-primary-700 rounded-lg px-4 py-2 text-white placeholder-primary-500 focus:outline-none focus:ring-1 focus:ring-accent-gold"
                                />
                                <button
                                    type="submit"
                                    className="bg-primary-800 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        </form>

                        <Link
                            href="/checkout"
                            className="w-full block text-center py-4 bg-accent-gold text-primary-950 font-bold rounded-xl hover:bg-[#ebd06b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-4 text-lg"
                        >
                            Secure Checkout &rarr;
                        </Link>

                        <p className="text-center text-xs text-primary-400 flex items-center justify-center gap-1.5">
                            <ShieldCheckIcon className="w-4 h-4" />
                            Secure 256-bit encrypted checkout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
