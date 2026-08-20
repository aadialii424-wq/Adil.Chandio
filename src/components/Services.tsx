import { motion } from 'motion/react';
import { Bot, Rocket, TrendingUp, DollarSign, Crown, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Service } from '../lib/types';

const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  rocket: Rocket,
  chart: TrendingUp,
  dollar: DollarSign,
  crown: Crown,
};

/** The arsenal — service cards with staggered reveal + hover lift. */
export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="relative z-10 bg-ink px-6 py-24 md:px-16 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-4 text-[10px] uppercase tracking-[0.45em] text-gold/60">the arsenal</div>
          <h2 className="font-display text-3xl uppercase tracking-wide text-cream md:text-5xl">
            What I <span className="gold-text">Do</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                data-cursor
                className="group relative overflow-hidden border border-cream/10 bg-cream/[0.03] p-6 transition-colors duration-300 hover:border-gold/60 md:p-8"
              >
                {/* gold glow that fades in on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
                </div>

                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-gold group-hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-cream">{service.title}</h3>
                  <p className="text-xs leading-relaxed text-cream/50">{service.description}</p>
                  <div className="mt-6 font-display text-[10px] tracking-[0.3em] text-gold/40">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
