import { useEffect, useState } from 'react';

const CHARS = 'MONARCH$#&01✦';

/** Decodes `text` from random glyphs, left to right — AI-terminal style. */
export function useScramble(text: string, start: boolean, speed = 26) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!start) {
      setOutput('');
      return;
    }
    let revealed = 0;
    let frame = 0;
    const total = text.length;
    const id = window.setInterval(() => {
      frame += 1;
      if (frame % 2 === 0) revealed = Math.min(total, revealed + 1);
      const tail = Array.from({ length: total - revealed }, () =>
        CHARS.charAt(Math.floor(Math.random() * CHARS.length))
      ).join('');
      setOutput(text.slice(0, revealed) + tail);
      if (revealed >= total) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, start, speed]);

  return output;
}
