import { aboutPortrait, unsplash } from '../data/images';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="bg-ivory py-24 md:py-36" aria-label="About the photographer">
      <div className="container-editorial grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={unsplash(aboutPortrait.id, 760, 950)}
              alt={aboutPortrait.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 border border-champagne-deep/60 md:block" aria-hidden="true" />
        </Reveal>

        <Reveal delay={120}>
          <p className="label-eyebrow mb-5">About the Photographer</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Hello, I&rsquo;m Adeline Marlowe.
          </h2>

          <div className="mt-8 space-y-5 font-sans text-[0.95rem] font-light leading-[1.85] text-charcoal-soft md:text-base">
            <p>
              I&rsquo;m drawn to the in-between moments — the nervous laughter, the hand squeeze
              beneath the table, the look you give each other when nobody else is watching.
            </p>
            <p>
              After ten years and over two hundred weddings, I&rsquo;ve learned that the best
              photographs happen when nobody is posing for them. My approach is documentary at
              heart and editorial in eye — I stay close, stay quiet, and let your day unfold
              exactly as it should.
            </p>
            <p>
              On the day itself, you won&rsquo;t find me directing traffic. You&rsquo;ll find me
              somewhere near the edges of the room, waiting for the moment that makes you
              reach for each other.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center justify-center border border-charcoal px-7 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory"
          >
            Meet Your Photographer
          </a>
        </Reveal>
      </div>
    </section>
  );
}
