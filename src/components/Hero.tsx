import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { Crown } from 'lucide-react';
import type { BrandHero } from '../lib/types';
import { useScramble } from '../lib/useScramble';

interface HeroProps {
  brand: BrandHero;
  lookCount: number;
  onScrollToTop: () => void;
  onScrollToGallery: () => void;
  onScrollToEnd: () => void;
}

export default function Hero({
  brand,
  lookCount,
  onScrollToTop,
  onScrollToGallery,
  onScrollToEnd,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const uiRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelLabelRef = useRef<HTMLSpanElement | null>(null);

  const letters = brand.brand.toUpperCase().split('');

  // decode the role line a beat after the title lands
  const [decode, setDecode] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setDecode(true), 1200);
    return () => window.clearTimeout(t);
  }, []);
  const role = useScramble(brand.role, decode);

  // deterministic gold-dust field
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: 3 + (i % 3) * 2,
        dur: `${3.2 + (i % 5) * 0.9}s`,
        delay: `${i * 0.45}s`,
      })),
    []
  );

  // pinned hero: black panel slides up from below and covers the video
  useGSAP(
    () => {
      gsap.set(panelRef.current, { yPercent: 100 });
      const cover = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      cover
        .to(panelRef.current, { yPercent: 0, ease: 'none', duration: 1 }, 0)
        .to(videoWrapRef.current, { scale: 0.94, ease: 'none', duration: 1 }, 0)
        .to(uiRef.current, { opacity: 0, ease: 'none', duration: 0.55 }, 0.1)
        .to(panelLabelRef.current, { opacity: 1, ease: 'none', duration: 0.4 }, 0.6);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative z-0 h-screen overflow-hidden bg-ink">
      {/* full-screen video — swap video_url in the DB to feature your own face/character */}
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <div className="relative h-full w-full overflow-hidden bg-neutral-950">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={brand.video_url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>

      {/* readability + royal gold tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14),transparent_65%)]" />

      {/* floating gold dust */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="gold-particle"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--dur': p.dur,
              '--delay': p.delay,
            } as React.CSSProperties
          }
        />
      ))}

      {/* overlaid UI */}
      <div ref={uiRef} className="absolute inset-0 z-10 flex flex-col justify-between p-5 md:p-9">
        <header className="flex items-center justify-between gap-4">
          <button onClick={onScrollToTop} data-cursor className="flex items-center gap-2.5">
            <Crown className="h-5 w-5 text-gold" strokeWidth={1.75} />
            <span className="font-display text-base uppercase tracking-[0.3em] text-cream md:text-lg">
              {brand.brand}
            </span>
          </button>

          <nav className="flex items-center gap-5 text-[10px] uppercase tracking-[0.25em] text-cream/70 md:gap-8 md:text-[11px]">
            <span className="hidden text-gold/80 md:inline">aka {brand.alias}</span>
            <button onClick={onScrollToGallery} data-cursor className="transition-colors hover:text-gold">
              work
            </button>
            <button onClick={onScrollToEnd} data-cursor className="transition-colors hover:text-gold">
              contact
            </button>
          </nav>
        </header>

        {/* center stage */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Crown className="mb-4 h-9 w-9 text-gold drop-shadow-[0_0_18px_rgba(212,175,55,0.55)] md:h-11 md:w-11" strokeWidth={1.5} />
          </motion.div>

          <h1 className="relative font-display leading-none">
            <span className="flex overflow-hidden pb-[0.1em]">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="gold-text inline-block will-change-transform text-[clamp(3rem,13vw,11rem)] tracking-[0.06em]"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="title-shine" />
          </h1>

          <div className="mt-4 h-5 text-[10px] uppercase tracking-[0.45em] text-gold/90 md:text-sm">
            {role || '\u00A0'}
          </div>
        </div>

        <footer className="flex items-end justify-between gap-6">
          <div className="max-w-md">
            <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold/70">
              portfolio — {String(lookCount).padStart(2, '0')} case files
            </div>
            <h2 className="mb-3 text-xl leading-tight text-cream md:text-3xl">{brand.headline}</h2>
            <p className="text-xs leading-relaxed text-cream/55 md:text-sm">{brand.bio}</p>
          </div>

          <div className="flex flex-col items-end gap-2 pb-1 text-[10px] uppercase tracking-[0.3em] text-gold/60">
            <span>scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-sm leading-none text-gold"
            >
              ↓
            </motion.span>
          </div>
        </footer>
      </div>

      {/* black panel that slides up over the video */}
      <div ref={panelRef} className="absolute inset-0 z-20 bg-ink will-change-transform">
        <div className="flex h-full w-full items-center justify-center">
          <span
            ref={panelLabelRef}
            className="font-display text-[11px] uppercase tracking-[0.45em] text-gold/50 opacity-0"
          >
            entering — the empire
          </span>
        </div>
      </div>
    </section>
  );
}
