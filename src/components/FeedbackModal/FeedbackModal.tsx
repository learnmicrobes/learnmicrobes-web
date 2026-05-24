import React, { useState } from 'react';
import './FeedbackModal.css';

interface FeedbackModalProps {
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Learn Microbes Feedback');
    const body = encodeURIComponent(message);
    const mailto = `mailto:learnmicrobes@outlook.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={e => e.stopPropagation()}>
        <h2>Report a Discrepancy / Suggest a Pearl</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your feedback…"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            rows={5}
          />
          <div className="feedback-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
