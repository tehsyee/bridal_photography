import { Check } from 'lucide-react';
import { packages } from '../data/packages';
import { requestPackage } from '../lib/packageSelection';
import Reveal from './Reveal';

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Packages() {
  return (
    <section id="packages" className="bg-ivory-soft py-24 md:py-36" aria-label="Signature packages">
      <div className="container-editorial">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <p className="label-eyebrow mb-5 justify-center">Signature Packages</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Coverage built around how you want to be remembered.
          </h2>
          <p className="mx-auto mt-6 max-w-md font-sans text-[0.95rem] font-light leading-relaxed text-charcoal-soft">
            Every wedding is different, so every package can be tailored. These are simply a
            starting point.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-0">
          {packages.map((pkg, index) => (
            <Reveal
              key={pkg.id}
              delay={index * 120}
              className={`relative flex flex-col border border-line bg-ivory p-10 lg:p-12 ${
                pkg.recommended
                  ? 'z-10 border-charcoal lg:-my-6 lg:py-16 lg:shadow-[0_24px_60px_-24px_rgba(36,31,28,0.25)]'
                  : ''
              } ${index === 0 ? 'lg:border-r-0' : ''} ${index === 2 ? 'lg:border-l-0' : ''}`}
            >
              {pkg.recommended && (
                <span className="absolute -top-3 left-10 bg-charcoal px-3 py-1 font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ivory">
                  Most Loved
                </span>
              )}

              <h3 className="font-display text-2xl text-charcoal">{pkg.name}</h3>
              <p className="mt-2 font-sans text-sm font-light text-charcoal-faint">{pkg.tagline}</p>

              <p className="mt-8 font-display text-4xl text-charcoal">
                {formatPrice(pkg.priceFrom, pkg.currency)}
                <span className="ml-2 font-sans text-sm font-light text-charcoal-faint">from</span>
              </p>

              <ul className="mt-8 flex-1 space-y-4 border-t border-line pt-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-sans text-sm font-light text-charcoal-soft">
                    <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne-deep" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => requestPackage(pkg.name)}
                className={`mt-10 inline-flex items-center justify-center px-6 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                  pkg.recommended
                    ? 'bg-charcoal text-ivory hover:bg-charcoal-soft'
                    : 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory'
                }`}
              >
                Enquire About This Package
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
