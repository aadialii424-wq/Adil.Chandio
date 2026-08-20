import { Crown } from 'lucide-react';
import type { TickerItem } from '../lib/types';

/** Tilted infinite gold marquee — pure CSS, buttery smooth. */
export default function Ticker({ items }: { items: TickerItem[] }) {
  // two identical halves => seamless -50% loop
  const seq = [...items, ...items, ...items, ...items];

  return (
    <div className="relative z-10 -mx-[5%] w-[110%] -rotate-1 border-y border-gold/25 bg-ink py-3 md:py-4">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex w-max items-center">
          {seq.map((t, i) => (
            <span key={`${t.id}-${i}`} className="flex items-center whitespace-nowrap">
              <span className="font-display px-6 text-sm uppercase tracking-[0.3em] text-gold md:px-8 md:text-base">
                {t.text}
              </span>
              <Crown className="h-3.5 w-3.5 shrink-0 text-gold/50" strokeWidth={1.5} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
