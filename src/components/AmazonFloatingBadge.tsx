```jsx id="v7n4ks"
import { useState } from "react";
import { X } from "lucide-react";

const AMAZON_URL = "https://amzn.in/d/06uRIQsp";

export default function AmazonFloatingBadge() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="
        fixed
        bottom-4
        left-1/2
        -translate-x-1/2
        z-50
        px-4
      "
    >
      <div className="relative">

        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:scale-105 transition duration-300"
        >
          <img
            src="/amazon-badge.png"
            alt="Available on Amazon"
            className="
              w-[240px]
              sm:w-[300px]
              md:w-[360px]
              lg:w-[400px]
              h-auto
              rounded-full
              shadow-lg
            "
          />
        </a>

        <button
          onClick={() => setVisible(false)}
          className="
            absolute
            -top-2
            -right-2
            w-7
            h-7
            rounded-full
            bg-white
            border
            shadow
            flex
            items-center
            justify-center
          "
        >
          <X size={14} />
        </button>

      </div>
    </div>
  );
}
```
