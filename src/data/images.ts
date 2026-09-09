/**
 * Central photography source list. Every image is referenced by Unsplash
 * photo ID so sizes/crops can be requested on demand from their CDN.
 * Replace `id` values with your own studio photography when ready —
 * everything else (alt text, categories) can stay structured the same way.
 */

function unsplash(id: string, w: number, h?: number, q = 80) {
  const dims = h ? `&w=${w}&h=${h}` : `&w=${w}`;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop${dims}&q=${q}`;
}

export const heroImage = {
  id: '1606490194859-07c18c9f0968',
  alt: 'Bride and groom embracing in golden evening light in an open field',
};

export const brandStatementImage = {
  id: '1606800052052-a08af7148866',
  alt: 'Two gold wedding bands resting on winter greenery',
};

export const aboutPortrait = {
  id: '1580489944761-15a19d654956',
  alt: 'Portrait of the studio’s lead photographer, smiling warmly',
};

export const finalCtaImage = {
  id: '1522673607200-164d1b6ce486',
  alt: 'Two empty wedding chairs decorated with flowers overlooking a lake',
};

export { unsplash };
