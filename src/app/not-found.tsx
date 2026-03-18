export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-foreground/60 mb-8">We couldn't find the page you're looking for.</p>
        </div>
    );
}
