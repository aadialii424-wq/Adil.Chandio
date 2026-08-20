import { useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import type { Stat } from '../lib/types';

/** Animated count-up empire numbers with a giant outlined watermark. */
export default function Stats({ stats }: { stats: Stat[] }) {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const blocks = scopeRef.current?.querySelectorAll<HTMLElement>('.stat-block');
      if (blocks && blocks.length) {
        gsap.fromTo(
          blocks,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: scopeRef.current, start: 'top 80%', once: true },
          }
        );
      }

      scopeRef.current?.querySelectorAll<HTMLElement>('[data-stat]').forEach((el) => {
        const target = parseFloat(el.dataset.value || '0');
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const decimals = target % 1 === 0 ? 0 : 1;
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 2.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${state.v.toFixed(decimals)}${suffix}`;
          },
        });
      });
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative z-10 overflow-hidden bg-ink py-24 md:py-36">
      <div
        aria-hidden
        className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[24vw] font-bold uppercase leading-none"
      >
        Monarch
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center text-[10px] uppercase tracking-[0.45em] text-gold/60 md:mb-16">
          the numbers don't lie
        </div>

        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.id} className="stat-block flex flex-col items-center text-center">
              <div
                data-stat
                data-value={s.value}
                data-prefix={s.prefix}
                data-suffix={s.suffix}
                className="gold-text font-display text-4xl font-bold md:text-6xl"
              >
                {s.prefix}0{s.suffix}
              </div>
              <div className="mt-3 max-w-[12rem] text-[10px] uppercase tracking-[0.25em] text-cream/45 md:text-[11px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
