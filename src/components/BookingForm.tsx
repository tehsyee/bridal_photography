import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import type { BookingFormData, BookingFormErrors } from '../types';
import { submitBookingEnquiry } from '../lib/submitBooking';
import { validateBooking, todayIsoDate } from '../lib/validateBooking';
import { PACKAGE_SELECT_EVENT } from '../lib/packageSelection';
import Reveal from './Reveal';

const GUEST_COUNT_OPTIONS = ['Under 50', '50–100', '100–200', '200–300', '300+'] as const;
const PACKAGE_OPTIONS = ['Not sure yet', 'The Essential', 'The Signature', 'The Heirloom', 'Custom Package'] as const;
const REFERRAL_OPTIONS = [
  'Instagram',
  'Google Search',
  'Recommended by a friend',
  'Wedding vendor / planner',
  'Pinterest',
  'Other',
];

const INITIAL_DATA: BookingFormData = {
  fullName: '',
  partnerName: '',
  email: '',
  phone: '',
  weddingDate: '',
  venue: '',
  guestCount: '',
  package: '',
  instagram: '',
  referralSource: '',
  message: '',
  priorities: '',
};

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

function Field({ label, htmlFor, required, error, children, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.14em] text-charcoal-soft">
        {label} {required && <span className="text-champagne-deep" aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 flex items-center gap-1.5 font-sans text-[0.8rem] font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses = (hasError?: boolean) =>
  `w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-charcoal-faint/70 focus:border-champagne-deep ${
    hasError ? 'border-red-500' : 'border-line'
  }`;

interface SelectFieldProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  hasError?: boolean;
  placeholder: string;
  options: readonly string[];
}

function SelectField({ id, value, onChange, hasError, placeholder, options }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`${inputClasses(hasError)} appearance-none pr-7`}
      >
        <option value="" disabled className="text-charcoal">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-charcoal">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-champagne-soft"
      />
    </div>
  );
}

export default function BookingForm() {
  const [data, setData] = useState<BookingFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) {
        setData((prev) => ({ ...prev, package: detail as BookingFormData['package'] }));
      }
    };
    window.addEventListener(PACKAGE_SELECT_EVENT, handler);
    return () => window.removeEventListener(PACKAGE_SELECT_EVENT, handler);
  }, []);

  const updateField = (field: keyof BookingFormData) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const validationErrors = validateBooking(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const result = await submitBookingEnquiry(data);
      setStatus(result.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <section id="contact" className="bg-charcoal py-24 text-ivory md:py-36" aria-label="Enquiry received">
        <div className="container-editorial mx-auto max-w-2xl text-center">
          <p className="label-eyebrow mb-6 justify-center text-champagne-soft">Enquiry Received</p>
          <h2 className="font-display text-4xl leading-tight text-ivory md:text-5xl">Thank you, {data.fullName.split(' ')[0]}.</h2>
          <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/80">
            We&rsquo;ve received your enquiry and will be in touch shortly — usually within 1–2 business days.
          </p>

          <dl className="mx-auto mt-10 flex max-w-md flex-col gap-4 border-y border-ivory/15 py-8 text-left">
            <div className="flex items-center justify-between gap-4">
              <dt className="font-sans text-xs uppercase tracking-[0.14em] text-ivory/60">Your date</dt>
              <dd className="font-display text-lg text-ivory">
                {new Date(`${data.weddingDate}T00:00:00`).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="font-sans text-xs uppercase tracking-[0.14em] text-ivory/60">Selected package</dt>
              <dd className="font-display text-lg text-ivory">{data.package}</dd>
            </div>
          </dl>

          <a
            href="#home"
            onClick={handleReset}
            className="mt-10 inline-flex items-center justify-center border border-ivory/70 px-8 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:bg-ivory hover:text-charcoal"
          >
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-charcoal py-24 text-ivory md:py-36" aria-label="Booking enquiry form">
      <div className="container-editorial mx-auto max-w-3xl" ref={formTopRef}>
        <Reveal className="mb-14 text-center md:mb-16">
          <p className="label-eyebrow mb-5 justify-center text-champagne-soft">Get In Touch</p>
          <h2 className="font-display text-4xl leading-tight text-ivory md:text-5xl">
            Let&rsquo;s make something beautiful together.
          </h2>
          <p className="mx-auto mt-6 max-w-md font-sans text-[0.95rem] font-light leading-relaxed text-ivory/75">
            Tell us a little about your plans. We&rsquo;ll get back to you within 1–2 business days.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form noValidate onSubmit={handleSubmit} className="[&_input]:text-ivory [&_select]:text-ivory [&_textarea]:text-ivory">
            <fieldset disabled={status === 'submitting'} className="contents">
              <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="fullName" required error={errors.fullName}>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={data.fullName}
                    onChange={updateField('fullName')}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    className={inputClasses(Boolean(errors.fullName))}
                    placeholder="Jane Tan"
                  />
                </Field>

                <Field label="Partner's Name" htmlFor="partnerName">
                  <input
                    id="partnerName"
                    name="partnerName"
                    type="text"
                    value={data.partnerName}
                    onChange={updateField('partnerName')}
                    className={inputClasses()}
                    placeholder="Optional"
                  />
                </Field>

                <Field label="Email Address" htmlFor="email" required error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={data.email}
                    onChange={updateField('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={inputClasses(Boolean(errors.email))}
                    placeholder="jane@email.com"
                  />
                </Field>

                <Field label="Phone / WhatsApp" htmlFor="phone" required error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={data.phone}
                    onChange={updateField('phone')}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={inputClasses(Boolean(errors.phone))}
                    placeholder="+65 8123 4567"
                  />
                </Field>

                <Field label="Wedding Date" htmlFor="weddingDate" required error={errors.weddingDate}>
                  <input
                    id="weddingDate"
                    name="weddingDate"
                    type="date"
                    min={todayIsoDate()}
                    value={data.weddingDate}
                    onChange={updateField('weddingDate')}
                    aria-invalid={Boolean(errors.weddingDate)}
                    aria-describedby={errors.weddingDate ? 'weddingDate-error' : undefined}
                    className={inputClasses(Boolean(errors.weddingDate))}
                  />
                </Field>

                <Field label="Venue / Location" htmlFor="venue" required error={errors.venue}>
                  <input
                    id="venue"
                    name="venue"
                    type="text"
                    autoComplete="address-level2"
                    value={data.venue}
                    onChange={updateField('venue')}
                    aria-invalid={Boolean(errors.venue)}
                    aria-describedby={errors.venue ? 'venue-error' : undefined}
                    className={inputClasses(Boolean(errors.venue))}
                    placeholder="Capella Singapore"
                  />
                </Field>

                <Field label="Estimated Guest Count" htmlFor="guestCount" required error={errors.guestCount}>
                  <SelectField
                    id="guestCount"
                    value={data.guestCount}
                    onChange={updateField('guestCount')}
                    hasError={Boolean(errors.guestCount)}
                    placeholder="Select a range"
                    options={GUEST_COUNT_OPTIONS}
                  />
                </Field>

                <Field label="Photography Package" htmlFor="package" required error={errors.package}>
                  <SelectField
                    id="package"
                    value={data.package}
                    onChange={updateField('package')}
                    hasError={Boolean(errors.package)}
                    placeholder="Select a package"
                    options={PACKAGE_OPTIONS}
                  />
                </Field>

                <Field label="Instagram Handle" htmlFor="instagram">
                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    value={data.instagram}
                    onChange={updateField('instagram')}
                    className={inputClasses()}
                    placeholder="@janeandtom"
                  />
                </Field>

                <Field label="How did you hear about us?" htmlFor="referralSource" required error={errors.referralSource}>
                  <SelectField
                    id="referralSource"
                    value={data.referralSource}
                    onChange={updateField('referralSource')}
                    hasError={Boolean(errors.referralSource)}
                    placeholder="Select an option"
                    options={REFERRAL_OPTIONS}
                  />
                </Field>

                <Field label="Tell us about your wedding" htmlFor="message" className="sm:col-span-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={data.message}
                    onChange={updateField('message')}
                    className={`${inputClasses()} resize-none`}
                    placeholder="A little about your celebration, your love story, or anything else we should know."
                  />
                </Field>

                <Field label="What matters most to you about your photography?" htmlFor="priorities" className="sm:col-span-2">
                  <textarea
                    id="priorities"
                    name="priorities"
                    rows={4}
                    value={data.priorities}
                    onChange={updateField('priorities')}
                    className={`${inputClasses()} resize-none`}
                    placeholder="Optional — the more we know, the better we can help."
                  />
                </Field>
              </div>

              <p className="mt-8 font-sans text-xs font-light text-ivory/50">
                <span className="text-champagne-deep">*</span> Required fields
              </p>

              {status === 'error' && (
                <p role="alert" className="mt-4 font-sans text-sm font-medium text-red-400">
                  Something went wrong sending your enquiry. Please try again, or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-ivory px-8 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-champagne-soft disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === 'submitting' && (
                  <span
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-charcoal/30 border-t-charcoal"
                    aria-hidden="true"
                  />
                )}
                {status === 'submitting' ? 'Sending your enquiry…' : 'Send Enquiry'}
              </button>
            </fieldset>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
