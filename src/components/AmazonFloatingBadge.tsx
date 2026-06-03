```jsx id="z7m4pa"
import React, { useState } from "react";

export default function AmazonFloatingBadge() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    >
      <div style={{ position: "relative" }}>

        <a
          href="https://amzn.in/d/06uRIQsp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/amazon-badge.png"
            alt="Available on Amazon"
            style={{
              width: "320px",
              maxWidth: "90vw",
              height: "auto",
              display: "block",
            }}
          />
        </a>

        <button
          onClick={() => setVisible(false)}
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ×
        </button>

      </div>
    </div>
  );
}
```
