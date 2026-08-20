import { useCallback, useRef } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import type { GalleryItem } from '../lib/types';

interface GalleryProps {
  items: GalleryItem[];
  isMobile: boolean;
  sectionRef: RefObject<HTMLElement | null>;
}

/** Scattered case-file wall: looks scale in as they enter, out as they leave. */
export default function Gallery({ items, isMobile, sectionRef }: GalleryProps) {
  const settledRef = useRef(0);
  const total = items.length;

  const handleSettled = useCallback(() => {
    settledRef.current += 1;
    if (settledRef.current >= total) {
      // images changed size once loaded — re-measure all triggers
      ScrollTrigger.refresh();
    }
  }, [total]);

  // mobile: evenly staggered two-column scatter, spacing adapts to item count
  const mobileStep = total > 1 ? 75 / (total - 1) : 0;

  const styleFor = (item: GalleryItem, i: number): CSSProperties => {
    if (isMobile) {
      return {
        top: `${5 + i * mobileStep}%`,
        left: i % 2 === 0 ? '6%' : '36%',
        width: '58%',
      };
    }
    return {
      top: `${item.pos_top}%`,
      left: `${item.pos_left}%`,
      width: `${item.width}%`,
    };
  };

  useGSAP(
    () => {
      gsap.fromTo(
        '.gallery-head',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.gallery-head',
            start: 'top bottom-=2%',
            end: 'top 75%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      const itemEls = gsap.utils.toArray<HTMLElement>('.gallery-item');
      itemEls.forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0, y: 90 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=2%',
              end: 'top 62%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
        gsap.to(el, {
          scale: 0.6,
          opacity: 0,
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'bottom 38%',
            end: 'bottom top+=2%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section ref={sectionRef} className="relative z-10 bg-ink" style={{ height: '460vh' }}>
      <div className="gallery-head absolute left-1/2 top-[1.5%] w-full -translate-x-1/2 px-6 text-center">
        <div className="text-[10px] uppercase tracking-[0.45em] text-gold/50">
          {items.length > 0
            ? `selected work — ${String(items.length).padStart(2, '0')} case files`
            : 'selected work'}
        </div>
      </div>

      {items.map((item, i) => (
        <figure key={item.id} className="gallery-item absolute will-change-transform" style={styleFor(item, i)}>
          <div
            className="overflow-hidden border border-gold/15 bg-neutral-900"
            style={{ transform: `rotate(${isMobile ? item.rotation * 0.5 : item.rotation}deg)` }}
          >
            <img
              src={item.image_url}
              alt={`${item.title} — ${item.category}`}
              className="block h-auto w-full"
              style={{ minHeight: '180px', objectFit: 'cover' }}
              loading="eager"
              decoding="async"
              draggable={false}
              onLoad={handleSettled}
              onError={handleSettled}
            />
          </div>
          <figcaption className="mt-2 flex items-baseline justify-between px-0.5 text-[9px] uppercase tracking-[0.25em] md:text-[10px]">
            <span className="text-gold/70">{item.title}</span>
            <span className="text-cream/40">{item.category}</span>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
