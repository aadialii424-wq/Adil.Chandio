import { motion } from 'motion/react';
import { Crown } from 'lucide-react';

export default function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <Crown className="mb-5 h-10 w-10 text-gold" strokeWidth={1.5} />
        <div className="font-display text-2xl uppercase tracking-[0.35em] text-cream md:text-3xl">
          Monarch
        </div>
      </motion.div>

      <div className="mt-7 h-px w-44 overflow-hidden bg-gold/15">
        <motion.div
          className="h-full w-full origin-left bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 text-[10px] uppercase tracking-[0.35em] text-gold/50"
      >
        summoning the empire
      </motion.div>
    </motion.div>
  );
}
