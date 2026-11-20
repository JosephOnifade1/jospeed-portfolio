import { brand } from '../data/brand.js';

export default function BrandLockup() {
  return (
    <span className="brand-wordmark" role="img" aria-label={brand.name}>
      <img src={brand.mark} width="29" height="19" alt="" />
      speed
    </span>
  );
}
