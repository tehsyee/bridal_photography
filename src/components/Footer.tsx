import { Mail, MessageCircle } from 'lucide-react';

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Packages', href: '#packages' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ivory-deep text-charcoal">
      <div className="container-editorial grid grid-cols-1 gap-14 py-20 md:grid-cols-[1.3fr_1fr_1fr] md:py-24">
        <div>
          <a href="#home" className="font-display text-2xl text-charcoal">
            Marlowe <span className="text-champagne-deep">&amp;</span> Ash
          </a>
          <p className="mt-5 max-w-xs font-sans text-sm font-light leading-relaxed text-charcoal-soft">
            Timeless, editorial wedding and bridal photography for couples across Singapore
            and destinations worldwide.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://instagram.com/marloweandash"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Marlowe & Ash on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-champagne-deep hover:text-champagne-deep"
            >
              <InstagramIcon />
            </a>
            <a
              href="mailto:hello@marloweandash.com"
              aria-label="Email Marlowe & Ash"
              className="inline-flex h-10 w-10 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-champagne-deep hover:text-champagne-deep"
            >
              <Mail size={17} strokeWidth={1.5} />
            </a>
            <a
              href="https://wa.me/6581234567"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Message Marlowe & Ash on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-champagne-deep hover:text-champagne-deep"
            >
              <MessageCircle size={17} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="label-eyebrow mb-5">Navigate</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-sans text-sm font-light text-charcoal-soft transition-colors hover:text-champagne-deep">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label-eyebrow mb-5">Contact</p>
          <ul className="space-y-3 font-sans text-sm font-light text-charcoal-soft">
            <li>hello@marloweandash.com</li>
            <li>+65 8123 4567</li>
            <li>Singapore · Worldwide by arrangement</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal/10">
        <div className="container-editorial flex flex-col gap-3 py-8 font-sans text-xs font-light text-charcoal-faint md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Marlowe &amp; Ash Photography. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-champagne-deep">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-champagne-deep">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
