import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from './lib/gsap';
import { useGSAP } from '@gsap/react';
import { AnimatePresence } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Stats from './components/Stats';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Outro from './components/Outro';
import { fetchBrand, fetchGallery, fetchServices, fetchStats, fetchTicker } from './lib/api';
import type { BrandHero, GalleryItem, Service, Stat, TickerItem } from './lib/types';

export default function App() {
  const [brand, setBrand] = useState<BrandHero | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [ticker, setTicker] = useState<TickerItem[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [outroVisible, setOutroVisible] = useState(false);
  const [outroActive, setOutroActive] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  const outroRef = useRef<HTMLDivElement | null>(null);

  // start each visit at the top of the experience
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // responsive layout switch
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, s, sv, t, g] = await Promise.all([
        fetchBrand(),
        fetchStats(),
        fetchServices(),
        fetchTicker(),
        fetchGallery(),
      ]);
      setBrand(b);
      setStats(s);
      setServices(sv);
      setTicker(t);
      setItems(g);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const ready =
    !loading &&
    !error &&
    !!brand &&
    items.length > 0 &&
    stats.length > 0 &&
    services.length > 0 &&
    ticker.length > 0;

  // golden finale scrub — owned here because it spans gallery -> overlay
  useGSAP(
    () => {
      if (!ready) return;
      gsap.set(outroRef.current, { autoAlpha: 0 });
      gsap.to(outroRef.current, {
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: 'bottom bottom+=100%',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            setOutroVisible(self.progress > 0.5);
            setOutroActive(self.progress > 0.9);
          },
        },
      });
    },
    { scope: rootRef, dependencies: [ready, isMobile] }
  );

  // ------------------------------------------------------------ navigation
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  const scrollToGallery = useCallback(() => {
    const el = gallerySectionRef.current;
    window.scrollTo({ top: el ? el.offsetTop : window.innerHeight * 2, behavior: 'smooth' });
  }, []);

  const scrollToEnd = useCallback(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  }, []);

  // ---------------------------------------------------------------- render
  return (
    <div ref={rootRef} className="min-h-screen bg-ink text-cream">
      <CustomCursor />

      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {error && !loading && (
        <div className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-ink px-6 text-center">
          <div className="font-display text-2xl uppercase tracking-[0.3em] text-cream">Monarch</div>
          <p className="max-w-xs text-[11px] uppercase tracking-[0.25em] text-cream/50">
            the empire couldn't load — {error}
          </p>
          <button
            onClick={load}
            data-cursor
            className="mt-2 border border-gold/50 px-9 py-3 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            retry
          </button>
        </div>
      )}

      {ready && brand && (
        <main>
          <Hero
            brand={brand}
            lookCount={items.length}
            onScrollToTop={scrollToTop}
            onScrollToGallery={scrollToGallery}
            onScrollToEnd={scrollToEnd}
          />
          <Ticker items={ticker} />
          <Stats stats={stats} />
          <Services services={services} />
          <Gallery items={items} isMobile={isMobile} sectionRef={gallerySectionRef} />
          <Outro
            overlayRef={outroRef}
            visible={outroVisible}
            active={outroActive}
            brand={brand}
            lookCount={items.length}
            onCta={scrollToTop}
          />
        </main>
      )}
    </div>
  );
}
