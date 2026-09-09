import type { PhotographyPackage } from '../types';

/**
 * Signature package data. Update pricing, hours and inclusions here —
 * every component that renders package details reads from this file.
 */
export const packages: PhotographyPackage[] = [
  {
    id: 'essential',
    name: 'The Essential',
    priceFrom: 1800,
    currency: 'USD',
    tagline: 'For intimate weddings and elopements.',
    features: [
      '6 hours of coverage',
      '1 photographer',
      'Private online gallery',
      'High-resolution digital images',
    ],
  },
  {
    id: 'signature',
    name: 'The Signature',
    priceFrom: 2800,
    currency: 'USD',
    tagline: 'Our most-loved full-day experience.',
    features: [
      '8 hours of coverage',
      '2 photographers',
      'Engagement / pre-wedding session',
      'Private online gallery',
      'High-resolution digital images',
      'Premium linen-bound album',
    ],
    recommended: true,
  },
  {
    id: 'heirloom',
    name: 'The Heirloom',
    priceFrom: 4200,
    currency: 'USD',
    tagline: 'For couples who want every moment held.',
    features: [
      'Full-day coverage',
      '2 photographers',
      'Pre-wedding session',
      'Fine-art heirloom album',
      'Private online gallery',
      'High-resolution digital images',
      'Complimentary planning consultation',
    ],
  },
];
