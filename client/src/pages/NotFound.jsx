import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream text-navy px-6">
      <div className="text-center">
        <div className="font-display text-7xl font-extrabold text-gold mb-3">404</div>
        <h1 className="font-display text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-mid mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 rounded-full bg-navy text-cream font-semibold hover:bg-gold hover:text-navy transition-colors inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
