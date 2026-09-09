import { ChevronDown } from 'lucide-react';
import { heroImage, unsplash } from '../data/images';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal"
      aria-label="Introduction"
    >
      <img
        src={unsplash(heroImage.id, 2200)}
        srcSet={`${unsplash(heroImage.id, 900)} 900w, ${unsplash(heroImage.id, 1600)} 1600w, ${unsplash(heroImage.id, 2200)} 2200w`}
        sizes="100vw"
        alt={heroImage.alt}
        className="absolute inset-0 h-full w-full object-cover object-[80%_32%]"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,12,10,0.4) 0%, rgba(15,12,10,0.1) 20%, rgba(15,12,10,0.58) 42%, rgba(15,12,10,0.85) 66%, rgba(15,12,10,0.93) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-editorial relative z-10 flex w-full flex-col gap-8 pb-20 pt-32 text-ivory md:pb-24 lg:pb-28">
        <p className="label-eyebrow text-champagne-soft">Singapore &amp; Destination Weddings</p>

        <h1 className="max-w-4xl font-display text-[2.75rem] leading-[1.05] tracking-wide text-ivory sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Your story,
          <br />
          beautifully preserved.
        </h1>

        <p className="max-w-md font-sans text-base font-light leading-relaxed text-ivory/85 md:max-w-lg md:text-lg">
          Timeless wedding photography for couples who want to remember not just how it looked
          — but how it felt.
        </p>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-ivory px-8 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-champagne-soft"
          >
            Check Your Date
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center border border-ivory/70 px-8 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory/10"
          >
            View Portfolio
          </a>
        </div>
      </div>

      <a
        href="#brand-statement"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/80 transition-colors hover:text-ivory md:flex"
        aria-label="Scroll to next section"
      >
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em]">Scroll</span>
        <ChevronDown size={18} strokeWidth={1.25} className="animate-bounce" />
      </a>
    </section>
  );
}
