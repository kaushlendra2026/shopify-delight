import { useState } from 'react';
import { X } from 'lucide-react';

const AMAZON_URL = 'https://amzn.in/d/06uRIQsp';

const AmazonFloatingBadge = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-float pointer-events-none">
      <div className="relative pointer-events-auto">
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Also available on Amazon"
          className="block transition-transform duration-300 hover:scale-105 drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          <img
            src="/amazon-badge.png"
            alt="Also available on Amazon"
            className="h-24 sm:h-32 md:h-40 w-auto"
          />
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AmazonFloatingBadge;