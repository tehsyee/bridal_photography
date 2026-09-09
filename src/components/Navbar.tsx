import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Packages', href: '#packages' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen
          ? 'bg-ivory/95 backdrop-blur-sm border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container-editorial flex h-20 items-center justify-between md:h-24" aria-label="Primary">
        <a
          href="#home"
          className="font-display text-2xl tracking-wide text-charcoal md:text-[1.7rem]"
        >
          Marlowe <span className="text-champagne-deep">&amp;</span> Ash
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-[0.8rem] font-medium uppercase tracking-[0.14em] text-charcoal-soft transition-colors hover:text-champagne-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden shrink-0 border border-charcoal px-6 py-3 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory lg:inline-block"
        >
          Check Availability
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-charcoal lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-20 z-40 origin-top bg-ivory transition-all duration-300 ease-editorial lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        style={{ height: menuOpen ? 'calc(100dvh - 5rem)' : '0' }}
      >
        <ul className="container-editorial flex h-full flex-col justify-center gap-2 pb-24">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className="border-b border-line py-4"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <a
                href={link.href}
                onClick={handleNavClick}
                className="font-display text-3xl text-charcoal"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="inline-block w-full border border-charcoal px-6 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-charcoal"
            >
              Check Availability
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
