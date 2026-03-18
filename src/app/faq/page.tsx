export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-primary-950 mb-8">Frequently Asked Questions</h1>
            <div className="space-y-6">
                <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                    <h3 className="font-bold text-primary-900 mb-2">How discreet is your shipping?</h3>
                    <p className="text-primary-700">100% discreet. We use completely plain packaging without any logos, branding, or hints of what's inside. The return address only states "L. Solutions".</p>
                </div>
                <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                    <h3 className="font-bold text-primary-900 mb-2">What will appear on my bank statement?</h3>
                    <p className="text-primary-700">Charges will appear under the corporate name "LUMINA INC". There will be no mention of intimacy products or our website name.</p>
                </div>
                <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                    <h3 className="font-bold text-primary-900 mb-2">Are your products safe to use?</h3>
                    <p className="text-primary-700">Absolutely. We meticulously curate our collection ensuring all products are made from body-safe, non-toxic materials like medical-grade silicone.</p>
                </div>
            </div>
        </div>
    );
}
