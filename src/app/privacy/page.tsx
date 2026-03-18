export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-primary-950 mb-8">Privacy Policy</h1>
            <div className="prose prose-rose max-w-none text-primary-700">
                <p>At Lumina Intimates, we take your privacy extremely seriously. We utilize industry-standard 256-bit encryption for all transactions.</p>
                <p><strong>Data Collection:</strong> We only collect data necessary to process your order. We never sell or share your personal information with third-party marketing agencies.</p>
                <p><strong>Order History:</strong> Your order history is maintained securely and can be permanently deleted upon request by contacting our customer service team.</p>
                <p><strong>Communication:</strong> All email communications from us will be sent from entirely generic email addresses and will never explicitly list the products you purchased in unencrypted subjects or plaintext formats.</p>
            </div>
        </div>
    );
}
