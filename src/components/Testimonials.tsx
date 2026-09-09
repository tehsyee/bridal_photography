import { testimonials } from '../data/testimonials';
import Reveal from './Reveal';

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ivory-soft py-24 md:py-36" aria-label="Testimonials">
      <div className="container-editorial">
        <Reveal className="mx-auto mb-16 max-w-xl text-center md:mb-20">
          <p className="label-eyebrow mb-5 justify-center">Kind Words</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            From couples we&rsquo;ve had the honour of photographing.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={index * 130}
              as="figure"
              className="flex flex-col items-center text-center"
            >
              <span aria-hidden="true" className="font-display text-6xl leading-none text-champagne-soft">
                &ldquo;
              </span>
              <blockquote className="mt-2 font-display text-xl italic leading-[1.5] text-charcoal md:text-[1.35rem]">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 font-sans text-sm text-charcoal-soft">
                <span className="font-medium uppercase tracking-[0.12em] text-charcoal">
                  {testimonial.names}
                </span>
                {testimonial.location && (
                  <span className="mt-1 block text-xs font-light text-charcoal-faint">
                    {testimonial.location}
                  </span>
                )}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
