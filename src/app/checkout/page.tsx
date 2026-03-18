'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheckIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function CheckoutPage() {
    const router = useRouter();
    const { data: cartItems, isLoading } = api.cart.getCart.useQuery();
    const createOrderMutation = api.checkout.createOrder.useMutation();
    const clearCartMutation = api.cart.clearCart.useMutation();

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'IN',
        cardNumber: '',
        expDate: '',
        cvv: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cartItems || cartItems.length === 0) return;

        setIsProcessing(true);

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const subtotal = cartItems?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) ?? 0;
        const shipping = subtotal > 1500 ? 0 : 150;
        const totalAmount = subtotal + shipping;

        try {
            const order = await createOrderMutation.mutateAsync({
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
                items: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                totalAmount,
            });

            await clearCartMutation.mutateAsync();
            setOrderComplete(order.orderId);
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Checkout failed. Please try again later.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return <div className="container mx-auto px-4 py-24 text-center">Loading secure checkout...</div>;
    }

    if (orderComplete) {
        return (
            <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-primary-900 mb-4">Order Confirmed!</h1>
                <p className="text-lg text-primary-700 mb-2">Thank you for your purchase.</p>
                <p className="text-primary-600 mb-8 bg-primary-50 py-3 rounded-lg border border-primary-100 font-medium">
                    Order Reference: <span className="text-primary-900 font-bold">{orderComplete}</span>
                </p>

                <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-8 text-left mb-8">
                    <h2 className="font-bold text-lg mb-4 flex items-center">
                        <ShieldCheckIcon className="w-5 h-5 text-primary-500 mr-2" />
                        Discreet Shipping Promise
                    </h2>
                    <p className="text-primary-600 text-sm leading-relaxed mb-4">
                        We are preparing your items. They will be shipped in a completely plain, unmarked package using the return address "L. Solutions".
                    </p>
                    <p className="text-primary-600 text-sm leading-relaxed">
                        Your credit card statement will show a charge from "LUMINA INC" to protect your privacy.
                    </p>
                </div>

                <Link
                    href="/shop"
                    className="inline-flex items-center px-8 py-3 bg-primary-900 text-white rounded-full font-medium hover:bg-primary-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        router.push('/cart');
        return null;
    }

    const subtotal = cartItems?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) ?? 0;
    const shipping = subtotal > 1500 ? 0 : 150;
    const total = subtotal + shipping;

    return (
        <div className="bg-primary-50 min-h-screen pb-16">
            <div className="bg-white border-b border-primary-100 py-6">
                <div className="container mx-auto px-4 text-center flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-primary-900">Secure Checkout</h1>
                    <p className="text-sm font-medium text-emerald-600 flex items-center gap-1 mt-2">
                        <LockClosedIcon className="w-4 h-4" /> 256-bit SSL Encrypted
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 lg:py-12 max-w-6xl">
                <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    <div className="w-full lg:w-2/3 space-y-8">
                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden">
                            <div className="bg-primary-950 px-6 py-4 border-b border-primary-800">
                                <h2 className="text-lg font-bold text-white">1. Contact Information</h2>
                            </div>
                            <div className="p-6 sm:p-8 space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-1.5">Email Address</label>
                                    <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow" placeholder="For order updates only" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-semibold text-primary-900 mb-1.5">First Name</label>
                                        <input required type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-semibold text-primary-900 mb-1.5">Last Name</label>
                                        <input required type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden">
                            <div className="bg-primary-950 px-6 py-4 border-b border-primary-800">
                                <h2 className="text-lg font-bold text-white flex justify-between items-center">
                                    <span>2. Shipping Address</span>
                                    <span className="text-xs font-normal text-primary-300 bg-primary-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                        <ShieldCheckIcon className="w-3.5 h-3.5" /> 100% Discreet Packaging
                                    </span>
                                </h2>
                            </div>
                            <div className="p-6 sm:p-8 space-y-6">
                                <div>
                                    <label htmlFor="street" className="block text-sm font-semibold text-primary-900 mb-1.5">Street Address</label>
                                    <input required type="text" id="street" name="street" value={formData.street} onChange={handleChange} className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow" placeholder="House number and street name" />
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    <div className="col-span-2">
                                        <label htmlFor="city" className="block text-sm font-semibold text-primary-900 mb-1.5">City</label>
                                        <input required type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow" />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="state" className="block text-sm font-semibold text-primary-900 mb-1.5">State</label>
                                        <input required type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow" />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="zipCode" className="block text-sm font-semibold text-primary-900 mb-1.5">PIN Code</label>
                                        <input required type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden relative">
                            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center cursor-not-allowed hidden">
                                <span className="bg-white px-4 py-2 rounded-lg font-bold text-primary-900 shadow-md">Complete Shipping First</span>
                            </div>
                            <div className="bg-primary-950 px-6 py-4 border-b border-primary-800">
                                <h2 className="text-lg font-bold text-white flex justify-between items-center">
                                    <span>3. Payment Method</span>
                                    <span className="text-xs font-normal text-primary-300 bg-primary-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                        <ShieldCheckIcon className="w-3.5 h-3.5" /> Anonymous Billing
                                    </span>
                                </h2>
                            </div>
                            <div className="p-6 sm:p-8 bg-neutral-50/50">
                                <div className="bg-white border rounded-xl p-6 border-accent-gold ring-1 ring-accent-gold/20">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" checked readOnly className="w-5 h-5 accent-accent-gold" />
                                            <span className="font-semibold text-primary-900">Credit / Debit Card</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-5 bg-neutral-200 rounded" />
                                            <div className="w-8 h-5 bg-neutral-200 rounded" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card Number" className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow font-mono" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input required type="text" name="expDate" value={formData.expDate} onChange={handleChange} placeholder="MM / YY" className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow font-mono text-center" />
                                            <input required type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" className="w-full rounded-md border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow font-mono text-center" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6 md:p-8 sticky top-24">
                            <h3 className="text-xl font-bold text-primary-900 mb-6 border-b border-primary-100 pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 rounded-md bg-primary-50 shrink-0 border border-primary-100" />
                                        <div className="flex-1 text-sm">
                                            <h4 className="font-semibold text-primary-900 line-clamp-2 leading-tight mb-1">{item.product.name}</h4>
                                            <p className="text-primary-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-primary-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                                    </div>
                                ))}
                            </div>

                            <dl className="space-y-3 text-sm border-t border-primary-100 py-6 mb-2">
                                <div className="flex justify-between text-primary-700">
                                    <dt>Subtotal</dt>
                                    <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
                                </div>
                                <div className="flex justify-between text-primary-700">
                                    <dt>Shipping</dt>
                                    <dd>{shipping === 0 ? 'Free' : `₹${shipping}`}</dd>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-primary-900 pt-3 mt-3 border-t border-primary-100">
                                    <dt>Total</dt>
                                    <dd>₹{total.toLocaleString('en-IN')}</dd>
                                </div>
                            </dl>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full flex justify-center items-center py-4 bg-primary-900 text-white font-bold rounded-xl hover:bg-primary-800 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed mb-4 text-lg"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>Pay ₹{total.toLocaleString('en-IN')}</>
                                )}
                            </button>

                            <div className="text-center text-xs text-primary-500 space-y-2">
                                <p>By placing your order, you agree to our Terms and Privacy Policy.</p>
                                <p className="flex justify-center items-center gap-1 font-medium text-primary-600">
                                    <ShieldCheckIcon className="w-4 h-4 text-accent-gold" />
                                    Your privacy is 100% guaranteed.
                                </p>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
