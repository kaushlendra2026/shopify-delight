import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package } from 'lucide-react';

interface DeliveryCounterProps {
  count?: number;
  label?: string;
  className?: string;
}

function useAnimatedCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

export default function DeliveryCounter({ count = 5000, label = "Products Delivered", className = "" }: DeliveryCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animatedCount = useAnimatedCounter(count, 2200, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex items-center gap-4 glass-card px-6 py-4 rounded-xl w-fit ${className}`}
    >
      <div className="p-3 rounded-full bg-primary/10">
        <Package className="w-6 h-6 text-primary" />
      </div>
      <div>
        <div className="font-display font-black text-3xl md:text-4xl text-foreground tabular-nums">
          {animatedCount.toLocaleString()}+
        </div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      </div>
    </motion.div>
  );
}
