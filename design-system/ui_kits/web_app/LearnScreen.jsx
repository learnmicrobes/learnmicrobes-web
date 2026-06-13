/* global React */
// Learn Microbes — Learn hub / Visual atlas listing
function LearnScreen({ mode = 'learn', onNav }) {
  const NS = window.LearnMicrobesDesignSystem_92bf69;
  const { Kicker, Tag, SpecimenFrame } = NS;

  const topics = [
    { title: 'Intro to Clinical Microbiology', meta: 'Beginner path · 8 lessons', accent: 'sage' },
    { title: 'Bacterial ID Strategy', meta: 'Workflow · Gram → media → tests', accent: 'teal' },
    { title: 'Streptococcus & Enterococcus', meta: 'Gram-positive cocci', accent: 'gramPos' },
    { title: 'Enterobacterales', meta: 'Gram-negative rods', accent: 'gramNeg' },
    { title: 'Gram Stain', meta: 'Foundations · morphology', accent: 'teal' },
    { title: 'Anaerobes', meta: 'Aerotolerance & disks', accent: 'anaerobe' },
  ];

  const visuals = [
    { label: 'Blood agar · β-hemolysis', grad: 'linear-gradient(135deg,#7a1f1f,#3a0f0f)' },
    { label: 'TSI · A/A with gas', grad: 'linear-gradient(135deg,#caa23a,#9c6b1f)' },
    { label: 'MacConkey · LF colonies', grad: 'linear-gradient(135deg,#b23a6b,#6b1f3f)' },
    { label: 'Chocolate agar', grad: 'linear-gradient(135deg,#5a3a22,#2e1c10)' },
  ];

  const isVisual = mode === 'visuals';

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.8rem 1.5rem 3rem' }}>
      <Kicker tone="sage">{isVisual ? 'Visual atlas' : 'Learn hub'}</Kicker>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.1rem', color: 'var(--text-heading)', margin: '6px 0 6px', letterSpacing: '-0.015em' }}>{isVisual ? 'Original bench visuals' : 'Learn it the way the bench thinks'}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: '0 0 22px', maxWidth: 620 }}>{isVisual ? 'Real plates and reactions, framed and labelled — built from the bench, not stock photography.' : 'Short, sequenced lessons that move from specimen and Gram stain to media, key tests, and the safest next step.'}</p>

      {isVisual ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {visuals.map((v) => (
            <div key={v.label} style={{ cursor: 'pointer' }} onClick={() => onNav('visuals')}>
              <SpecimenFrame ratio="1 / 1" label="Atlas">
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 12, boxSizing: 'border-box', background: v.grad }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{v.label}</span>
                </div>
              </SpecimenFrame>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {topics.map((t, i) => (
            <button key={t.title} type="button" onClick={() => onNav('learn')} style={{
              textAlign: 'left', cursor: 'pointer', background: 'var(--surface-card)', border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '1.3rem 1.2rem', display: 'flex', flexDirection: 'column', gap: 10,
              transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'var(--lift-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--lm-ink-300)', fontSize: '1.1rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <Tag accent={t.accent} dot>{t.meta}</Tag>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)' }}>{t.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LearnScreen });
