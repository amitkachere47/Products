import Link from 'next/link';
import { UserIcon, ShoppingBagIcon, HeartIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function AccountPage() {
    return (
        <div className="bg-primary-50 min-h-screen py-10 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <h1 className="text-3xl font-bold text-primary-950 mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary-100">
                                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                                    JD
                                </div>
                                <div>
                                    <div className="font-bold text-primary-900">Jane Doe</div>
                                    <div className="text-sm text-primary-500">jane@example.com</div>
                                </div>
                            </div>

                            <nav className="space-y-2 text-sm font-medium">
                                <Link href="/account" className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-primary-50 text-accent-rose">
                                    <UserIcon className="w-5 h-5" />
                                    Dashboard
                                </Link>
                                <Link href="/account/orders" className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-900 transition-colors">
                                    <ShoppingBagIcon className="w-5 h-5" />
                                    Order History
                                </Link>
                                <Link href="/account/wishlist" className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-900 transition-colors">
                                    <HeartIcon className="w-5 h-5" />
                                    Wishlist
                                </Link>
                                <Link href="/account/settings" className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-900 transition-colors">
                                    <Cog6ToothIcon className="w-5 h-5" />
                                    Settings
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3 space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
                            <h2 className="text-xl font-bold text-primary-900 mb-6">Recent Orders</h2>
                            <div className="text-center py-12 border-2 border-dashed border-primary-100 rounded-xl">
                                <ShoppingBagIcon className="w-12 h-12 text-primary-300 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold text-primary-900 mb-1">No orders yet</h3>
                                <p className="text-primary-500 mb-6">When you place an order, it will appear here discreetly.</p>
                                <Link href="/shop" className="inline-block bg-primary-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-800 transition-colors">
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
