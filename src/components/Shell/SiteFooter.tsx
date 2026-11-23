import React from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_EMAIL } from '../../config/contact';
import './Shell.css';

const socialLinks = [
  { label: 'Learn Microbes on Instagram', href: 'https://www.instagram.com/learn.microbes/', icon: 'fab fa-instagram', external: true },
  { label: 'Learn Microbes on Facebook', href: 'https://www.facebook.com/profile.php?id=61575016503288', icon: 'fab fa-facebook-f', external: true },
  { label: 'Learn Microbes on X', href: 'https://x.com/learn_microbes', icon: 'fab fa-twitter', external: true }
];

const pageLinks = [
  { label: "What's next", path: '/pro' },
  { label: 'About', path: '/about' },
  { label: 'Mission', path: '/mission' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Disclaimer', path: '/disclaimer' },
  { label: 'Terms', path: '/terms' },
  { label: 'Privacy', path: '/privacy' }
];

export default function SiteFooter() {
  return (
    <footer className="lm-footer">
      <div className="lm-footer-inner">
        <div className="lm-footer-connect">
          <span className="lm-footer-label">Connect with us</span>
          <span className="lm-footer-divider" aria-hidden="true" />
          <div className="lm-footer-social">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                <i className={link.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
          {/* The envelope carries the address as text on wider screens, so
              nobody has to click to find out where their mail would go. Phones
              keep the icon alone. */}
          <a
            className="lm-footer-email"
            href={`mailto:${SUPPORT_EMAIL}?subject=Question%20About%20LearnMicrobes`}
            aria-label={`Email Learn Microbes at ${SUPPORT_EMAIL}`}
            title={SUPPORT_EMAIL}
          >
            <i className="fas fa-envelope" aria-hidden="true" />
            <span className="lm-footer-email-text">{SUPPORT_EMAIL}</span>
          </a>
        </div>

        <nav className="lm-footer-links" aria-label="Footer links">
          <span className="lm-footer-copy">&copy; 2026 LearnMicrobes.com</span>
          {pageLinks.map((link) => (
            <Link key={link.path} to={link.path}>{link.label}</Link>
          ))}
        </nav>

        <p className="lm-footer-note">
          &copy; 2026 LearnMicrobes.com
        </p>
      </div>
    </footer>
  );
}
