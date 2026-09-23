import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream text-navy px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-2">Something went wrong</h1>
            <p className="text-mid mb-6">Please refresh the page. If the problem continues, contact the site administrator.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-navy text-cream font-semibold hover:bg-gold hover:text-navy transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
