import { portfolioImages } from '../data/portfolio';
import { unsplash } from '../data/images';
import Reveal from './Reveal';

const layout: Record<string, string> = {
  'veil-field': 'lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-2',
  'palm-walk': 'lg:col-start-6 lg:col-span-3 lg:row-start-1 lg:row-span-2',
  'confetti-kiss': 'lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-1',
  'mandap-ceremony': 'lg:col-start-9 lg:col-span-4 lg:row-start-2 lg:row-span-1',
  'black-sand-beach': 'lg:col-start-1 lg:col-span-3 lg:row-start-3 lg:row-span-2',
  'bridal-makeup': 'lg:col-start-4 lg:col-span-5 lg:row-start-3 lg:row-span-1',
  'wedding-shoes': 'lg:col-start-4 lg:col-span-5 lg:row-start-4 lg:row-span-1',
  'holding-hands': 'lg:col-start-9 lg:col-span-4 lg:row-start-3 lg:row-span-1',
  'reception-toast': 'lg:col-start-9 lg:col-span-4 lg:row-start-4 lg:row-span-1',
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-ivory-soft py-24 md:py-36" aria-label="Portfolio">
      <div className="container-editorial">
        <Reveal className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-eyebrow mb-5">Featured Work</p>
            <h2 className="max-w-xl font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
              A story told in
              <br /> quiet, honest moments.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-charcoal-soft">
            A selection from recent weddings, pre-wedding sessions and bridal portraits —
            each one a small piece of a much longer story.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[15rem] lg:gap-5">
          {portfolioImages.map((image, index) => (
            <Reveal
              key={image.id}
              delay={(index % 4) * 90}
              className={`group relative overflow-hidden bg-charcoal/5 ${
                layout[image.id] ?? ''
              } ${image.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]'} lg:aspect-auto`}
            >
              <img
                src={unsplash(image.src, 900, image.orientation === 'portrait' ? 1125 : 675)}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ivory">
                  {image.category}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
