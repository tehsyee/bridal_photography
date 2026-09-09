import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqItems } from '../data/faq';
import Reveal from './Reveal';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="bg-ivory py-24 md:py-36" aria-label="Frequently asked questions">
      <div className="container-editorial mx-auto max-w-3xl">
        <Reveal className="mb-14 text-center md:mb-20">
          <p className="label-eyebrow mb-5 justify-center">Questions</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Everything you might want to know.
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <Reveal as="div" key={item.id} delay={Math.min(index * 45, 220)} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-sans transition-colors hover:text-champagne-deep"
                  >
                    <span className="text-base font-medium text-charcoal md:text-lg">{item.question}</span>
                    <Plus
                      size={20}
                      strokeWidth={1.5}
                      className={`shrink-0 text-champagne-deep transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-editorial"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-2xl pb-6 font-sans text-[0.95rem] font-light leading-relaxed text-charcoal-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
