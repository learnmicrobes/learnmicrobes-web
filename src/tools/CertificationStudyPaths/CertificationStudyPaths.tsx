import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CertificationStudyPaths.css';

type ExamPath = {
  badge: string;
  title: string;
  audience: string;
  focus: string[];
};

type StudyArea = {
  title: string;
  status: 'Covered' | 'Partial' | 'Coming soon';
  mFocus: string;
  smFocus: string;
  tools: { label: string; path: string }[];
};

const examPaths: ExamPath[] = [
  {
    badge: 'M',
    title: 'M(ASCP) Scientist in Microbiology',
    audience: 'Best first path for students, new microbiology learners, exam takers, and new bench professionals.',
    focus: [
      'Core organism identification',
      'Specimen and culture workflow',
      'Test principles and expected reactions',
      'Foundational mycology, parasitology, virology, and molecular methods'
    ]
  },
  {
    badge: 'SM',
    title: 'SM(ASCP) Specialist in Microbiology',
    audience: 'Advanced path for experienced microbiology professionals building specialist-level depth.',
    focus: [
      'Advanced interpretation and troubleshooting',
      'Method limits, validation, QC, and safety',
      'Consultation-level organism and syndrome patterns',
      'Laboratory operations and administration depth'
    ]
  }
];

const studyAreas: StudyArea[] = [
  {
    title: 'Preanalytic + Safety',
    status: 'Covered',
    mFocus: 'Specimen quality, rejection logic, transport, setup, and basic safety choices.',
    smFocus: 'Escalation decisions, exposure risk, workflow policy, and consult-level specimen guidance.',
    tools: [
      { label: 'Syndrome Path', path: '/syndrome-diagnostic-path' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' }
    ]
  },
  {
    title: 'Bacteriology',
    status: 'Covered',
    mFocus: 'Gram stain, colony morphology, common biochemical tests, and routine organism branches.',
    smFocus: 'Fastidious organisms, unusual patterns, mixed cultures, resistance clues, and advanced workup strategy.',
    tools: [
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Anaerobe Roadmap', path: '/obligate-anaerobe-roadmap' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' }
    ]
  },
  {
    title: 'Mycobacteriology + Nocardia',
    status: 'Partial',
    mFocus: 'AFB logic, safety, stains, culture basics, and when molecular methods matter.',
    smFocus: 'MTB/NTM interpretation, slow growth pitfalls, rule-out safety, and reference testing decisions.',
    tools: [
      { label: 'Special Pathogens Hub', path: '/special-pathogens' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Guides', path: '/guides?guide=mycobacteria' }
    ]
  },
  {
    title: 'Mycology',
    status: 'Partial',
    mFocus: 'Yeast and mold basics, morphology language, dimorphic clues, and clinically important patterns.',
    smFocus: 'Advanced mold ID, antifungal interpretation, reference decisions, and uncommon organism patterns.',
    tools: [
      { label: 'Guides', path: '/guides?guide=fungal-identification-overview' },
      { label: 'Search', path: '/search' }
    ]
  },
  {
    title: 'Parasitology',
    status: 'Partial',
    mFocus: 'Specimen choice, ova and parasite methods, blood parasite basics, and high-yield organism recognition.',
    smFocus: 'Advanced life-cycle interpretation, uncommon parasites, method limitations, and consult support.',
    tools: [
      { label: 'Guides', path: '/guides?guide=parasitology-lab-methods-overview' },
      { label: 'Search', path: '/search' }
    ]
  },
  {
    title: 'Virology',
    status: 'Partial',
    mFocus: 'Syndrome-based method selection, antigen/NAAT/serology basics, and result timing.',
    smFocus: 'Complex interpretation, viral load/resistance context, transplant patterns, and molecular limits.',
    tools: [
      { label: 'Guides', path: '/guides?guide=virology-methods-and-strategies' },
      { label: 'Syndrome Path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    title: 'Molecular Microbiology',
    status: 'Partial',
    mFocus: 'NAAT principles, direct detection, resistance targets, and when molecular testing beats culture.',
    smFocus: 'Validation, contamination control, result limitations, and advanced interpretation.',
    tools: [
      { label: 'Guides', path: '/guides?guide=nucleic-acid-based-analysis' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ]
  },
  {
    title: 'Lab Operations + QC',
    status: 'Partial',
    mFocus: 'Quality control basics, test performance, safety, instrumentation, and workflow awareness.',
    smFocus: 'Quality management, validation, risk management, personnel, budget, and administration topics.',
    tools: [
      { label: 'Biochemical Tests', path: '/biochemical-tests' },
      { label: 'Study Quiz', path: '/study-quiz' }
    ]
  }
];

const statusClass = (status: StudyArea['status']) => status.toLowerCase().replace(/\s+/g, '-');

const CertificationStudyPaths: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="cert-path-page">
      <header className="cert-path-hero">
        <span className="cert-path-kicker">Certification study paths</span>
        <h1>M first, SM later: build your microbiology study map by exam goal.</h1>
        <p>
          Use this alpha pathway to connect ASCP microbiology content areas to Learn Microbes tools. Start with
          M(ASCP) if you are a student or new learner, then use the SM(ASCP) layer for specialist-level depth.
        </p>
      </header>

      <section className="cert-path-choice" aria-label="Choose your certification path">
        {examPaths.map((path) => (
          <article className="cert-exam-card" key={path.badge}>
            <span className="cert-exam-badge">{path.badge}</span>
            <h2>{path.title}</h2>
            <p>{path.audience}</p>
            <ul>
              {path.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="cert-path-how" aria-labelledby="cert-path-how-title">
        <div>
          <span className="cert-path-kicker">How to use it</span>
          <h2 id="cert-path-how-title">Study in passes, not piles.</h2>
          <p>
            First pass: cover the M-level core. Second pass: use weak areas and SM notes to deepen interpretation,
            troubleshooting, and lab operations.
          </p>
        </div>
        <div className="cert-path-steps">
          <span>1. Choose M or SM focus</span>
          <span>2. Open the weakest content area</span>
          <span>3. Use linked tools, then quiz</span>
        </div>
      </section>

      <section className="cert-area-section" aria-labelledby="cert-area-title">
        <div className="cert-area-heading">
          <span className="cert-path-kicker">Content map</span>
          <h2 id="cert-area-title">Shared study areas, different depth.</h2>
          <p>
            Coverage labels are intentionally honest for alpha. Some areas already have strong tools; others need
            dedicated practice sets and deeper visual ID work.
          </p>
        </div>

        <div className="cert-area-grid">
          {studyAreas.map((area) => (
            <article className="cert-area-card" key={area.title}>
              <div className="cert-area-card-top">
                <h3>{area.title}</h3>
                <span className={`cert-status ${statusClass(area.status)}`}>{area.status}</span>
              </div>
              <div className="cert-level-columns">
                <div>
                  <span>M focus</span>
                  <p>{area.mFocus}</p>
                </div>
                <div>
                  <span>SM focus</span>
                  <p>{area.smFocus}</p>
                </div>
              </div>
              <div className="cert-tool-links" aria-label={`${area.title} Learn Microbes tools`}>
                {area.tools.map((tool) => (
                  <button key={`${area.title}-${tool.label}`} type="button" onClick={() => navigate(tool.path)}>
                    {tool.label}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cert-source-note" aria-label="Certification source note">
        <h2>Official-outline note</h2>
        <p>
          This page is a Learn Microbes study organizer, not an official ASCP product. Always verify eligibility,
          content guidelines, and reading lists with ASCP before scheduling an exam.
        </p>
        <div>
          <a
            href="https://ascpcontentwebsite.blob.core.windows.net/boccontent/docs/default-source/explore-credentials/content-guidelines/ascp_ascpi_m_sm_content_guideline2eefb50b-d1b5-4206-9347-7f21af63bf1d.pdf?sfvrsn=b3fa9d78_1"
            target="_blank"
            rel="noopener noreferrer"
          >
            ASCP M/SM content guideline
          </a>
          <a href="https://www.ascp.org/boc/explore-credentials/view-all-credentials/M" target="_blank" rel="noopener noreferrer">
            M(ASCP) credential
          </a>
          <a href="https://www.ascp.org/boc/explore-credentials/view-all-credentials/SM" target="_blank" rel="noopener noreferrer">
            SM(ASCP) credential
          </a>
        </div>
      </section>
    </div>
  );
};

export default CertificationStudyPaths;
