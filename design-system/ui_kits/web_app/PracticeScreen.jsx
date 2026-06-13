/* global React */
// Learn Microbes — Practice (interactive pop-quiz)
const LMDS_PRACTICE = window.LearnMicrobesDesignSystem_92bf69;

function PracticeScreen() {
  const { Kicker, Pill, QuizOption, Button, Tag } = LMDS_PRACTICE;

  const questions = [
    {
      prompt: 'TSI shows a yellow slant, yellow butt, and cracked agar. What does the crack tell you?',
      flag: 'Enterics',
      options: ['H₂S production', 'Gas production', 'Lactose fermentation', 'Contamination'],
      correct: 1,
      explain: 'Cracks, splits, or bubbles mean the organism produced enough CO₂ / H₂ to fracture the medium — classic for E. coli and many coliforms.',
      confuse: 'H₂S — that\u2019s the black precipitate along the stab, not a crack.',
    },
    {
      prompt: 'β-hemolytic GPC in chains, catalase-negative, from a pediatric throat swab. Most likely?',
      flag: 'Gram-positive',
      options: ['Staphylococcus aureus', 'Streptococcus pyogenes', 'Enterococcus faecalis', 'Streptococcus agalactiae'],
      correct: 1,
      explain: 'Catalase-negative GPC in chains with β-hemolysis from a throat points to Group A Strep — confirm with PYR or a bacitracin (A) disk.',
      confuse: 'S. agalactiae is Group B (CAMP / hippurate +), usually from a different source.',
    },
  ];

  const [qi, setQi] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const q = questions[qi];
  const answered = pick !== null;

  const stateFor = (i) => {
    if (!answered) return 'default';
    if (i === q.correct) return 'correct';
    if (i === pick) return 'incorrect';
    return 'default';
  };

  const next = () => { setPick(null); setQi((qi + 1) % questions.length); };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '1.8rem 1.5rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <Kicker tone="sage">Practice · Question {qi + 1} of {questions.length}</Kicker>
        <Pill tone="dark">Pop quiz</Pill>
      </div>

      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 'var(--space-8)' }}>
        <div style={{ marginBottom: 14 }}><Tag accent="biochem" dot>{q.flag}</Tag></div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.9rem', color: 'var(--text-heading)', margin: '0 0 22px', lineHeight: 1.18, letterSpacing: '-0.015em' }}>{q.prompt}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {q.options.map((o, i) => (
            <QuizOption key={i} letter={'ABCD'[i]} state={stateFor(i)} onClick={() => !answered && setPick(i)}>{o}</QuizOption>
          ))}
        </div>

        {answered && (
          <div style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '1rem 1.1rem', background: 'var(--lm-sage-100)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--lm-sage-500)' }}>
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--lm-sage-600)', marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{q.options[q.correct]}</div>
                <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.5, marginTop: 3 }}>{q.explain}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 12, padding: '0.85rem 1.1rem', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Don't confuse it with</div>
                <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.5, marginTop: 3 }}>{q.confuse}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
              <Button variant="primary" icon="fa-solid fa-arrow-right" iconRight onClick={next}>Next question</Button>
            </div>
          </div>
        )}
        {!answered && (
          <p style={{ marginTop: 20, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pick an answer to see the reasoning and the classic look-alike trap.</p>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { PracticeScreen });
