import { locationLabel, profile } from './profile.js';

// Public filenames shared by the static artwork, prerenderer and client head.
const wordmarkSuffix = 'speed';
export const brand = {
  name: `JO${wordmarkSuffix}`,
  wordmarkSuffix,
  mark: '/brand/jospeed-mark.svg',
  logo: '/brand/jospeed-logo.png',
  logoSize: 512,
  shareImage: '/share/jospeed-portfolio.jpg',
  shareAlt: `${profile.name} — ${profile.role}, ${locationLabel}. The JOspeed wordmark beside a sculpture wearing a citron visor.`,
};
export const cardSize = { width: 1200, height: 630 };
export const brandLogo = (origin) => ({
  '@type': 'ImageObject',
  url: new URL(brand.logo, origin).href,
  width: brand.logoSize,
  height: brand.logoSize,
});
