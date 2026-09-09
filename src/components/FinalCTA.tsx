import { finalCtaImage, unsplash } from '../data/images';
import Reveal from './Reveal';

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden bg-charcoal" aria-label="Book your date">
      <img
        src={unsplash(finalCtaImage.id, 1800, 1100)}
        alt={finalCtaImage.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,14,12,0.55) 0%, rgba(18,14,12,0.72) 55%, rgba(18,14,12,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      <Reveal className="container-editorial relative z-10 mx-auto max-w-2xl py-28 text-center text-ivory">
        <h2 className="font-display text-4xl leading-[1.15] text-ivory sm:text-5xl md:text-6xl">
          Your day will pass in a heartbeat.
          <br /> Let&rsquo;s make the memories last.
        </h2>
        <a
          href="#contact"
          className="mt-10 inline-flex items-center justify-center bg-ivory px-9 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-champagne-soft"
        >
          Check Your Date
        </a>
      </Reveal>
    </section>
  );
}
