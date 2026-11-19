import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';
import BrandLockup from './BrandLockup.jsx';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from './BrandIcons.jsx';

const socials = [
  ['GitHub', GithubIcon, 'https://github.com/JosephOnifade1'],
  ['LinkedIn', LinkedinIcon, 'https://www.linkedin.com/in/joseph-onifade-ol'],
  ['X', XIcon, 'https://x.com/buildwithjospeed'],
  ['Discord', DiscordIcon, 'https://discord.com/users/1278856822555414549'],
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-layout">
        <div>
          <Link className="brand-link" to="/">
            <BrandLockup />
          </Link>
          <p>© {profile.name}</p>
        </div>
        <nav aria-label="Footer navigation">
          {[
            ['All projects', '/work'],
            ['About', '/#about'],
            ['Blog', '/blog'],
            ['Contact', '/#contact'],
          ].map(([label, url]) => (
            <Link key={url} to={url}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="footer-socials">
          {socials.map(([label, Icon, url]) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} title={label}>
              <Icon size={17} color="currentColor" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
