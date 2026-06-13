/* global React */
// Learn Microbes — Home dashboard
const LMDS_HOME = window.LearnMicrobesDesignSystem_92bf69;

function HomeScreen({ onNav }) {
  const { Kicker, Button, SearchField, Pill, BenchCard, StatChip } = LMDS_HOME;

  const actions = [
    { label: 'Learn from scratch', detail: 'Start with the beginner microbiology path.', icon: 'fa-solid fa-graduation-cap' },
    { label: 'Identify an unknown', detail: 'Use Gram stain, colony clues, and branch tests.', icon: 'fa-solid fa-microscope' },
    { label: 'Review biochemical tests', detail: 'Look up reactions, QC, and interpretation traps.', icon: 'fa-solid fa-flask' },
    { label: 'Study for M(ASCP) / SM(ASCP)', detail: 'Run an ASCP review loop: paths, quizzes, visuals.', icon: 'fa-solid fa-book' },
    { label: 'Look up a visual', detail: 'Browse original bench cards and reaction visuals.', icon: 'fa-solid fa-images' },
    { label: 'Practice questions', detail: 'Check recall with bench and exam-style prompts.', icon: 'fa-solid fa-clipboard-list' },
  ];
  const startHere = [
    { label: 'I am new to micro', detail: 'Taxonomy, Gram stain logic, and the first bench clues.' },
    { label: 'I am reviewing for ASCP', detail: 'Quizzes, visuals, and weak-area loops in the M(ASCP) hub.' },
    { label: 'I am learning bench workflow', detail: 'Follow an unknown to the safest next step.' },
    { label: 'I need biochemical help', detail: 'Reactions, QC organisms, expected results, traps.' },
  ];
  const startPath = [
    { step: '01', label: 'Read the beginner path' },
    { step: '02', label: 'Practice an unknown' },
    { step: '03', label: 'Use a bench card' },
  ];

  const panel = {
    background: 'var(--surface-card)', border: '1px solid var(--border-card)',
    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: 'var(--space-6)',
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1.5rem 3rem', display: 'grid', gap: 16 }}>

      {/* Cover hero */}
      <section style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)', minHeight: 300, background: '#fbfaf7' }}>
        <img src="../../assets/bench-cover.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 36%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(251,250,247,0.98) 0%, rgba(251,250,247,0.9) 32%, rgba(251,250,247,0.42) 62%, rgba(251,250,247,0.08) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 560, padding: '2.2rem' }}>
          <Kicker tone="teal">Clinical microbiology &amp; ASCP review</Kicker>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: 'var(--text-heading)', margin: '0.3rem 0 0.5rem', lineHeight: 1.05, letterSpacing: '-0.018em' }}>Learn Microbes</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.5, margin: '0 0 1.1rem', maxWidth: 460 }}>
            Learn clinical microbiology the way the bench actually thinks: follow Gram stain, colony clues, media, key tests, and the next safest step.
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <Button variant="primary">Create free account</Button>
            <Button variant="secondary" onClick={() => onNav('learn')}>Browse the path</Button>
          </div>
          <SearchField style={{ maxWidth: 460 }} />
        </div>
      </section>

      {/* What are you trying to do */}
      <section style={{ ...panel, padding: '0.8rem 1rem' }}>
        <Kicker tone="muted">What are you trying to do?</Kicker>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pick the closest study task and jump straight to the page, bench card, roadmap, or tool that fits.</p>
      </section>

      {/* Start here */}
      <section style={panel}>
        <Kicker tone="sage">New here?</Kicker>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-heading)', margin: '6px 0 16px', letterSpacing: '-0.01em' }}>Start with the path that matches your goal.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {startHere.map((s) => (
            <button key={s.label} type="button" onClick={() => onNav('learn')} style={{
              textAlign: 'left', cursor: 'pointer', background: 'var(--surface-sunken)', border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)', padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: 4,
              transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'var(--lift-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)' }}>{s.label}</span>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{s.detail}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Action grid */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {actions.map((a) => (
            <button key={a.label} type="button" onClick={() => onNav(a.label.includes('Practice') ? 'practice' : a.label.includes('biochem') ? 'tools' : 'tools')} style={{
              textAlign: 'left', cursor: 'pointer', background: 'var(--surface-card)', border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: 8,
              transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'var(--lift-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--lm-sage-200)', color: 'var(--lm-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}><i className={a.icon} /></span>
              <span style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--text-heading)' }}>{a.label}</span>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{a.detail}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Lower grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 16, alignItems: 'start' }}>
        <div style={panel}>
          <Kicker tone="sage">Start path</Kicker>
          <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-heading)', margin: '6px 0 14px' }}>Your first three steps</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {startPath.map((s) => (
              <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.7rem 0.85rem', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--lm-sage-600)', fontSize: '1rem', width: 28 }}>{s.step}</span>
                <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-body)' }}>{s.label}</span>
                <i className="fa-solid fa-chevron-right" style={{ marginLeft: 'auto', color: 'var(--lm-ink-300)', fontSize: '0.8rem' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <StatChip icon="fa-solid fa-rotate" value="145+" label="quiz reps" />
            <StatChip icon="fa-solid fa-layer-group" value="60+" label="bench cards" />
          </div>
        </div>

        <BenchCard kicker="Featured bench card · Gram-positive" title="Streptococcus pyogenes"
          source="Pediatric throat swab · sore throat &amp; fever, 3 days · pure growth at 24 h"
          findings={['Sheep blood agar', 'β-hemolytic', 'GPC in chains', 'Catalase-negative']}
          nextStep="PYR or bacitracin (A-disk) to confirm Group A Strep" accent="gramPos" />
      </section>
    </div>
  );
}

Object.assign(window, { HomeScreen });
