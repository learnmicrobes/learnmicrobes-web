/* global React */
// Learn Microbes — Tools / ToolBox grid (colored bench tools)
const LMDS_TOOLS = window.LearnMicrobesDesignSystem_92bf69;

function ToolsScreen({ onNav }) {
  const { Kicker, Pill } = LMDS_TOOLS;
  const tools = [
    { name: 'Unknown Isolate Workup', desc: 'Walk an unknown from first observations to the safest next step.', icon: 'fa-solid fa-microscope', accent: 'var(--lm-teal-600)', tag: 'Identification' },
    { name: 'Gram-Positive Roadmap', desc: 'Branch GPC and GPR by catalase, hemolysis, and key tests.', icon: 'fa-solid fa-diagram-project', accent: 'var(--lm-gram-pos)', tag: 'Roadmap' },
    { name: 'Gram-Negative Roadmap', desc: 'Lactose, oxidase, and TSI logic for the Enterobacterales and beyond.', icon: 'fa-solid fa-diagram-project', accent: 'var(--lm-gram-neg)', tag: 'Roadmap' },
    { name: 'Anaerobe Roadmap', desc: 'Aerotolerance, special-potency disks, and Gram reaction clues.', icon: 'fa-solid fa-diagram-project', accent: 'var(--lm-anaerobe)', tag: 'Roadmap' },
    { name: 'Biochemical Tests', desc: 'Reactions, QC organisms, expected results, and interpretation traps.', icon: 'fa-solid fa-flask', accent: 'var(--lm-biochem)', tag: 'Reference' },
    { name: 'Enterics Calculator', desc: 'Enter reactions, get the closest Enterobacterales match.', icon: 'fa-solid fa-calculator', accent: 'var(--lm-sage-600)', tag: 'Calculator' },
    { name: 'Special Pathogens Hub', desc: 'Sentinel-level organisms and the safest handling notes.', icon: 'fa-solid fa-shield-virus', accent: 'var(--lm-clay)', tag: 'Safety' },
    { name: 'Do Not Routine Culture', desc: 'Specimens and organisms that need a different workflow.', icon: 'fa-solid fa-ban', accent: 'var(--lm-caution)', tag: 'Safety' },
    { name: 'Study Quiz', desc: 'Bench and exam-style prompts with weak-area tracking.', icon: 'fa-solid fa-clipboard-question', accent: 'var(--lm-gram-pos)', tag: 'Practice' },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.8rem 1.5rem 3rem' }}>
      <Kicker tone="sage">The bench</Kicker>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.1rem', color: 'var(--text-heading)', margin: '6px 0 6px', letterSpacing: '-0.015em' }}>Tools &amp; roadmaps</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: '0 0 22px', maxWidth: 600 }}>Branching ID roadmaps, bench-reference tools, and calculators — each one follows the workflow, not a wall of facts.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {tools.map((t) => (
          <button key={t.name} type="button" onClick={() => onNav(t.name === 'Study Quiz' ? 'practice' : 'tools')} style={{
            position: 'relative', textAlign: 'left', cursor: 'pointer', overflow: 'hidden',
            background: 'var(--surface-card)', border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '1.3rem 1.2rem 1.2rem',
            display: 'flex', flexDirection: 'column', gap: 9,
            transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'var(--lift-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: t.accent }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ width: 42, height: 42, borderRadius: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', background: t.accent + '1a', color: t.accent }}><i className={t.icon} /></span>
              <span style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.accent }}>{t.tag}</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-heading)', marginTop: 2 }}>{t.name}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{t.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ToolsScreen });
