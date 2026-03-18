export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-primary-950 mb-4">Contact Us</h1>
            <p className="text-primary-600 mb-8 text-lg">We're here to help with perfectly discreet customer service.</p>

            <div className="bg-white p-8 rounded-2xl border border-primary-100 shadow-sm max-w-lg mx-auto">
                <div className="space-y-6 text-left text-primary-700">
                    <div>
                        <h3 className="font-bold text-primary-900 mb-1">Email (Response within 24h)</h3>
                        <p className="text-accent-rose font-medium">support@luminaintimates.example.com</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-primary-900 mb-1">Phone</h3>
                        <p>1-800-LUMINA (Mon-Fri, 9am-5pm EST)</p>
                        <p className="text-xs text-primary-500 mt-1">Our customer service agents will answer simply stating "Lumina Support".</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
