import { experienceSteps } from '../data/experience';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="bg-ivory py-24 md:py-36" aria-label="The client experience">
      <div className="container-editorial">
        <Reveal className="mb-16 max-w-2xl md:mb-24">
          <p className="label-eyebrow mb-5">The Experience</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            From first hello to your final photograph.
          </h2>
        </Reveal>

        <ol className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
          {experienceSteps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 110} className="border-t border-line pt-8">
              <span className="font-display text-3xl text-champagne-deep">{step.number}</span>
              <h3 className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                {step.title}
              </h3>
              <p className="mt-4 font-sans text-[0.92rem] font-light leading-relaxed text-charcoal-soft">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
