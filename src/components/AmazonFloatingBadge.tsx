```jsx
import { useState } from 'react';
import { X } from 'lucide-react';

const AMAZON_URL = 'https://amzn.in/d/06uRIQsp';

const AmazonFloatingBadge = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-float px-4">
      
      <div className="relative w-fit">

        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Also available on Amazon"
          className="block transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/amazon-badge.png"
            alt="Also available on Amazon"
            className="
              w-[260px]
              sm:w-[320px]
              md:w-[380px]
              lg:w-[420px]
              h-auto
              object-contain
              drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]
            "
          />
        </a>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
          aria-label="Dismiss"
          className="
            absolute
            -top-2
            -right-2
            w-7
            h-7
            rounded-full
            bg-white
            border
            border-black/10
            flex
            items-center
            justify-center
            shadow-md
            hover:scale-110
            transition-all
          "
        >
          <X className="w-4 h-4 text-black" />
        </button>

      </div>
    </div>
  );
};

export default AmazonFloatingBadge;
```
