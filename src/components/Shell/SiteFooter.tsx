import React from 'react';
import { Link } from 'react-router-dom';
import { ALPHA_SIGNUP_FORM_URL } from '../../config/forms';
import { SUPPORT_URL } from '../../config/support';
import { trackEvent } from '../../utils/analytics';
import './Shell.css';

const socialLinks = [
  { label: 'Learn Microbes on Instagram', href: 'https://www.instagram.com/learn.microbes/', icon: 'fab fa-instagram', external: true },
  { label: 'Learn Microbes on Facebook', href: 'https://www.facebook.com/profile.php?id=61575016503288', icon: 'fab fa-facebook-f', external: true },
  { label: 'Learn Microbes on X', href: 'https://x.com/learn_microbes', icon: 'fab fa-twitter', external: true },
  { label: 'Email Learn Microbes', href: 'mailto:learnmicrobes@outlook.com?subject=Question%20About%20LearnMicrobes', icon: 'fas fa-envelope', external: false }
];

const pageLinks = [
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
          {/* Phones show only the heart, in the row of social icons. The label
              is in aria-label so it survives the text being hidden there. */}
          <a
            className="lm-footer-support"
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Support Learn Microbes"
            title="Support Learn Microbes"
            onClick={() => trackEvent('support_clicked', { location: 'footer', destination: 'kofi' })}
          >
            <i className="fas fa-heart" aria-hidden="true" />
            <span className="lm-footer-support-text">Support Learn Microbes</span>
          </a>
        </div>

        <nav className="lm-footer-links" aria-label="Footer links">
          <span className="lm-footer-copy">&copy; 2026 LearnMicrobes.com</span>
          {pageLinks.map((link) => (
            <Link key={link.path} to={link.path}>{link.label}</Link>
          ))}
          <a
            href={ALPHA_SIGNUP_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('alpha_join_clicked', { location: 'footer', destination: ALPHA_SIGNUP_FORM_URL });
              trackEvent('lead_form_viewed', { location: 'footer', form_name: 'beta_tester_form' });
            }}
          >
            Join Beta
          </a>
        </nav>

        <p className="lm-footer-note">
          &copy; 2026 LearnMicrobes.com
          <br />
          Built by a working micro lab tech. Free to use.
        </p>
      </div>
    </footer>
  );
}
