import type { PortfolioImage } from '../types';

/**
 * Featured portfolio images. `id` is the Unsplash photo ID — swap these
 * for the studio's own photography when available. `featured` marks the
 * large lead image in the editorial grid.
 */
export const portfolioImages: PortfolioImage[] = [
  {
    id: 'veil-field',
    src: '1546032996-6dfacbacbf3f',
    alt: 'Bride and groom sheltering beneath a flowing veil in a golden wheat field',
    category: 'Weddings',
    orientation: 'portrait',
    featured: true,
  },
  {
    id: 'palm-walk',
    src: '1606216794074-735e91aa2c92',
    alt: 'Bride and groom walking hand in hand beneath tall palm trees at dusk',
    category: 'Weddings',
    orientation: 'portrait',
  },
  {
    id: 'confetti-kiss',
    src: '1583939003579-730e3918a45a',
    alt: 'Newlyweds kissing as guests throw confetti around them',
    category: 'Weddings',
    orientation: 'landscape',
  },
  {
    id: 'mandap-ceremony',
    src: '1587271636175-90d58cdad458',
    alt: 'Couple seated beneath a floral mandap during their wedding ceremony',
    category: 'Weddings',
    orientation: 'landscape',
  },
  {
    id: 'black-sand-beach',
    src: '1544078751-58fee2d8a03b',
    alt: 'Bride and groom embracing on a dramatic black sand beach',
    category: 'Pre-Wedding',
    orientation: 'portrait',
  },
  {
    id: 'bridal-makeup',
    src: '1487412947147-5cebf100ffc2',
    alt: 'Makeup artist applying lipstick to a bride during wedding preparations',
    category: 'Bridal',
    orientation: 'landscape',
  },
  {
    id: 'wedding-shoes',
    src: '1509927083803-4bd519298ac4',
    alt: 'Bride and groom’s shoes resting side by side on a wooden floor',
    category: 'Bridal',
    orientation: 'landscape',
  },
  {
    id: 'holding-hands',
    src: '1520854221256-17451cc331bf',
    alt: 'Close-up of a bride and groom holding hands, their shadows forming a heart',
    category: 'Bridal',
    orientation: 'landscape',
  },
  {
    id: 'reception-toast',
    src: '1519671482749-fd09be7ccebf',
    alt: 'Guests raising glasses in a celebratory toast at a wedding reception',
    category: 'Intimate Celebrations',
    orientation: 'landscape',
  },
];

export const portfolioCategories = [
  'All',
  'Weddings',
  'Pre-Wedding',
  'Bridal',
  'Intimate Celebrations',
] as const;
