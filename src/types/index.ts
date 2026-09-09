export interface PackageFeature {
  label: string;
}

export interface PhotographyPackage {
  id: string;
  name: string;
  priceFrom: number;
  currency: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  names: string;
  location?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  srcLarge?: string;
  alt: string;
  category: PortfolioCategory;
  orientation: 'portrait' | 'landscape';
  featured?: boolean;
}

export type PortfolioCategory =
  | 'Weddings'
  | 'Pre-Wedding'
  | 'Bridal'
  | 'Intimate Celebrations';

export interface ExperienceStep {
  number: string;
  title: string;
  description: string;
}

export type GuestCountRange =
  | 'Under 50'
  | '50–100'
  | '100–200'
  | '200–300'
  | '300+';

export type PackageChoice =
  | 'Not sure yet'
  | 'The Essential'
  | 'The Signature'
  | 'The Heirloom'
  | 'Custom Package';

export interface BookingFormData {
  fullName: string;
  partnerName?: string;
  email: string;
  phone: string;
  weddingDate: string;
  venue: string;
  guestCount: GuestCountRange | '';
  package: PackageChoice | '';
  instagram?: string;
  referralSource: string;
  message?: string;
  priorities?: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

export interface BookingSubmissionResult {
  success: boolean;
  message?: string;
}
