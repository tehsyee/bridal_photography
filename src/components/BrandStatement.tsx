import { brandStatementImage, unsplash } from '../data/images';
import Reveal from './Reveal';

export default function BrandStatement() {
  return (
    <section id="brand-statement" className="bg-ivory py-24 md:py-36" aria-label="Our philosophy">
      <div className="container-editorial grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
        <Reveal>
          <p className="label-eyebrow mb-6">Our Philosophy</p>
          <h2 className="max-w-2xl font-display text-3xl leading-[1.2] sm:text-4xl md:text-[2.75rem]">
            Because the moments you remember most
            <br className="hidden sm:block" /> are rarely the ones you planned.
          </h2>
          <p className="mt-8 max-w-xl font-sans text-[0.95rem] font-light leading-[1.85] text-charcoal-soft md:text-base">
            We believe wedding photography should feel effortless, intimate and true to you.
            From the quiet anticipation before the ceremony to the laughter that fills the dance
            floor, we document the fleeting moments that make your celebration uniquely yours —
            so that years from now, you can return to your day and feel it all again.
          </p>
        </Reveal>

        <Reveal delay={150} className="mx-auto w-full max-w-xs lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={unsplash(brandStatementImage.id, 700, 875)}
              alt={brandStatementImage.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-charcoal/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
