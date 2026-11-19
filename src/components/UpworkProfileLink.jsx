import { recordUpworkClick } from '../utils/portfolioAnalytics.js';

const UPWORK_PROFILE = 'https://www.upwork.com/freelancers/~01a476791ed9f8b084?mp_source=share';

// Both entry points open the same public profile. Never attach brief or form data.
export default function UpworkProfileLink({ children, ...props }) {
  return (
    <a {...props} href={UPWORK_PROFILE} target="_blank" rel="noopener noreferrer" onClick={recordUpworkClick}>
      {children}
    </a>
  );
}
