import type { MouseEvent, RefObject } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Crown } from 'lucide-react';
import type { BrandHero } from '../lib/types';

interface OutroProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  visible: boolean;
  active: boolean;
  brand: BrandHero;
  lookCount: number;
  onCta: () => void;
}

/** White finale: fades in over the last viewport of scroll, magnetic "view" CTA inside. */
export default function Outro({ overlayRef, visible, active, brand, lookCount, onCta }: OutroProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 14 });
  const springY = useSpring(y, { stiffness: 160, damping: 14 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.4);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#f5f1e8] opacity-0 ${
        active ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* faint royal watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[26vw] font-bold uppercase leading-none text-ink/[0.04]"
      >
        Monarch
      </div>

      <div className="relative flex flex-col items-center px-6 text-center text-ink">
        <motion.div
          initial={false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Crown className="mx-auto mb-6 h-9 w-9 text-gold drop-shadow-[0_0_16px_rgba(212,175,55,0.4)]" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[10px] uppercase tracking-[0.45em] text-gold-deep"
        >
          end of preview — {String(lookCount).padStart(2, '0')} case files
        </motion.div>

        <motion.h2
          initial={false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[12vw] font-bold uppercase leading-[0.95] md:text-[6vw]"
        >
          The Throne
          <br />
          Awaits
        </motion.h2>

        <motion.button
          onClick={onCta}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          data-cursor
          initial={false}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
          whileTap={{ scale: 0.93 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: springX, y: springY }}
          className="mt-10 bg-ink px-16 py-5 text-sm uppercase tracking-[0.45em] text-gold-light shadow-[0_18px_50px_rgba(6,5,4,0.3)] md:mt-12"
        >
          {brand.cta_label}
        </motion.button>

        <motion.div
          initial={false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-[10px] uppercase tracking-[0.35em] text-ink/45"
        >
          {brand.brand} — {brand.alias}
        </motion.div>
      </div>
    </div>
  );
}
