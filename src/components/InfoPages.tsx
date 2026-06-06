import React, { useState } from 'react';
import './About.css';

type InfoPageKey = 'disclaimer' | 'terms' | 'privacy' | 'faq' | 'mission';

type InfoPageProps = {
  page: InfoPageKey;
};

const infoPages: Record<InfoPageKey, {
  kicker: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
}> = {
  disclaimer: {
    kicker: 'Disclaimer',
    title: 'Educational review, not medical or exam-policy advice',
    intro: 'Learn Microbes is built for clinical microbiology learning and review. It is not a substitute for professional judgment, institutional procedures, or official certification requirements.',
    sections: [
      {
        title: 'Educational use',
        body: 'Content is intended for study support, bench-concept review, and classroom-style learning. It should not be used as the sole source for clinical decisions.'
      },
      {
        title: 'Certification review',
        body: 'Learn Microbes is not an official ASCP product and does not replace ASCP content guidelines, eligibility rules, exam policies, or official study materials.'
      },
      {
        title: 'Clinical practice',
        body: 'Laboratory work should follow validated procedures, current standards, local policies, supervisor guidance, and appropriate safety escalation.'
      }
    ]
  },
  terms: {
    kicker: 'Terms of Use',
    title: 'Use Learn Microbes as a learning resource',
    intro: 'These plain-language terms describe the expected use of Learn Microbes during beta.',
    sections: [
      {
        title: 'Acceptable use',
        body: 'Use the site for personal study, education, teaching support, and clinical microbiology review. Do not misuse the platform, interfere with service availability, or attempt unauthorized access.'
      },
      {
        title: 'Content limits',
        body: 'Content may change as the beta improves. We aim for accuracy, but errors can occur, and official or local sources should be used when requirements matter.'
      },
      {
        title: 'Ownership',
        body: 'Learn Microbes text, diagrams, visuals, and interface elements are provided for educational use and should not be copied into a competing product without permission.'
      }
    ]
  },
  privacy: {
    kicker: 'Privacy Policy',
    title: 'A practical privacy summary for beta users',
    intro: 'Learn Microbes uses account features to save study progress, bookmarks, and quiz history.',
    sections: [
      {
        title: 'Account data',
        body: 'When you sign in, we may store your email address, profile record, bookmarks, Learn progress, and quiz attempts so your study activity can follow your account.'
      },
      {
        title: 'Authentication',
        body: 'Authentication is handled through Supabase. Google sign-in is available, and password resets are sent to the email associated with your account.'
      },
      {
        title: 'Feedback and contact',
        body: 'If you send feedback or email Learn Microbes, the information you provide may be used to respond, troubleshoot, and improve the beta experience.'
      }
    ]
  },
  faq: {
    kicker: 'FAQ',
    title: 'Common Learn Microbes questions',
    intro: 'Quick answers for beta users, students, and clinical microbiology learners.',
    sections: [
      {
        title: 'Is Learn Microbes official ASCP content?',
        body: 'No. Learn Microbes is independent educational review. Use official ASCP resources for final certification requirements and exam policies.'
      },
      {
        title: 'Do I need a username?',
        body: 'No separate username is used. Sign in with your email/password account or Google sign-in.'
      },
      {
        title: 'What is still beta?',
        body: 'Some tools are placeholders or still being polished, including expanded flashcards, case simulation, and deeper saved-progress workflows.'
      }
    ]
  },
  mission: {
    kicker: 'Mission and Vision',
    title: 'Make clinical microbiology easier to reason through',
    intro: 'Learn Microbes is designed around bench logic: what you see, what it means, what to test next, and when to escalate.',
    sections: [
      {
        title: 'Mission',
        body: 'Help learners build practical microbiology reasoning through clear roadmaps, visual reactions, biochemical interpretation, safety cues, and focused practice.'
      },
      {
        title: 'Vision',
        body: 'Become a premium clinical microbiology study platform that feels like a bench reference, a lab notebook, and a guided review path in one place.'
      },
      {
        title: 'Product direction',
        body: 'The beta prioritizes useful study workflows, saved progress, quiz history, organism identification support, and polished mobile-friendly review tools.'
      }
    ]
  }
};

export default function InfoPage({ page }: InfoPageProps) {
  const content = infoPages[page];
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  if (page === 'faq') {
    return (
      <div className="about-container">
        <div className="about-header-card">
          <div className="about-subtitle">{content.kicker}</div>
          <h1 className="about-title">{content.title}</h1>
          <p className="about-description">{content.intro}</p>
        </div>

        <div className="faq-accordion-card">
          {content.sections.map((section, index) => {
            const isOpen = openFaqIndex === index;
            const panelId = `faq-answer-${index}`;

            return (
              <div className={`faq-accordion-item ${isOpen ? 'open' : ''}`} key={section.title}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                >
                  <span>{section.title}</span>
                  <span className="faq-accordion-icon" aria-hidden="true">{isOpen ? '-' : '+'}</span>
                </button>
                {isOpen && (
                  <p id={panelId}>{section.body}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="about-container">
      <div className="about-header-card">
        <div className="about-subtitle">{content.kicker}</div>
        <h1 className="about-title">{content.title}</h1>
        <p className="about-description">{content.intro}</p>
      </div>

      <div className="about-statement-card">
        {content.sections.map((section) => (
          <div className="about-statement" key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
