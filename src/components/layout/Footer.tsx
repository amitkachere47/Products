import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-primary-950 text-primary-100 border-t border-primary-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl font-bold text-white">
                                Lumina<span className="text-accent-rose">Intimates</span>
                            </span>
                        </Link>
                        <p className="text-sm text-primary-300 mb-6 max-w-xs">
                            Empowering wellness and intimacy with premium, carefully curated products for everyone.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social placeholders */}
                            <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center hover:bg-accent-rose transition-colors cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center hover:bg-accent-rose transition-colors cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center hover:bg-accent-rose transition-colors cursor-pointer" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link href="/shop?category=for-her" className="text-sm hover:text-white transition-colors">For Her</Link></li>
                            <li><Link href="/shop?category=for-him" className="text-sm hover:text-white transition-colors">For Him</Link></li>
                            <li><Link href="/shop?category=for-couples" className="text-sm hover:text-white transition-colors">For Couples</Link></li>
                            <li><Link href="/shop?category=sex-toys" className="text-sm hover:text-white transition-colors">Toys</Link></li>
                            <li><Link href="/shop?category=kink-bdsm" className="text-sm hover:text-white transition-colors">KINK & BDSM</Link></li>
                            <li><Link href="/shop?category=sale" className="text-sm text-accent-rose hover:text-accent-rose/80 transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-sm hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/track" className="text-sm hover:text-white transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Privacy & Trust</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-accent-gold" />
                                <span className="text-sm">100% Discreet Packaging</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-accent-gold" />
                                <span className="text-sm">Anonymous Billing</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-accent-gold" />
                                <span className="text-sm">Secure 256-bit Encryption</span>
                            </li>
                            <li className="mt-4 pt-4 border-t border-primary-800">
                                <Link href="/privacy" className="text-sm hover:text-white transition-colors block mb-2">Privacy Policy</Link>
                                <Link href="/terms" className="text-sm hover:text-white transition-colors block">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-primary-400">
                        &copy; {new Date().getFullYear()} Lumina Intimates. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <span className="text-xs text-primary-400">Over 1M+ Orders</span>
                        <span className="text-primary-800">|</span>
                        <span className="text-xs text-primary-400">13 Years in Business</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
