import { brand } from '../data/brand.js';

export default function BrandLockup() {
  return (
    <>
      <img src={brand.mark} width="39" height="25" alt="" />
      {brand.name}
    </>
  );
}
