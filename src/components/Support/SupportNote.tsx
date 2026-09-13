import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { SUPPORT_URL } from '../../config/support';
import { trackEvent } from '../../utils/analytics';
import './SupportNote.css';

type SupportNoteProps = {
  location: string;
};

// A quiet ask shown only after someone has finished something. Kept to one line
// so it never competes with the screen's own next-step actions.
export default function SupportNote({ location }: SupportNoteProps) {
  return (
    <div className="support-note">
      Found this useful? Learn Microbes is free to use.{' '}
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('support_clicked', { location, destination: 'kofi' })}
      >
        Support it on Ko-fi
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
      </a>
    </div>
  );
}
