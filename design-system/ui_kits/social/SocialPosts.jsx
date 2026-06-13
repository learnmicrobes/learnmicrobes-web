/* global React */
// Learn Microbes — social & educational post templates.
// Square (1080) and 4:5 (1080×1350) canvases built from the design system.
const LMDS_SOCIAL = window.LearnMicrobesDesignSystem_92bf69;

// --- shared bits -------------------------------------------------------
function DotGrid({ color = 'var(--lm-teal-400)', opacity = 0.45 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 7px)', gap: 12 }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: color, opacity }} />
      ))}
    </div>
  );
}

function BrandRow({ onDark = false }) {
  const sub = onDark ? 'rgba(244,239,228,0.7)' : 'var(--text-muted)';
  const name = onDark ? '#f6fbf8' : 'var(--text-heading)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src={onDark ? '../../assets/brand-mark-flask.svg' : '../../assets/brand-mark.svg'} width="56" height="56" alt="" style={{ borderRadius: 16 }} />
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.45rem', color: name }}>Learn Microbes</div>
        <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: sub, marginTop: 4 }}>Clinical Bench Reference</div>
      </div>
    </div>
  );
}

// --- 01 · Cover (deep teal, 4:5) --------------------------------------
function CoverSlide() {
  const { Kicker, Pill, ProgressDots } = LMDS_SOCIAL;
  return (
    <div style={{ width: 432, height: 540, background: 'var(--lm-teal-700)', borderRadius: 14, padding: '28px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <BrandRow onDark />
        <ProgressDots total={8} current={0} variant="counter" onDark />
      </div>
      <div style={{ position: 'absolute', top: 28, right: 30, opacity: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Kicker tone="onDark" style={{ marginBottom: 14 }}>One year of building</Kicker>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', lineHeight: 1.04, letterSpacing: '-0.02em', color: '#f6fbf8', margin: '0 0 16px' }}>
          It started as one free calculator. Now it&#39;s a whole bench.
        </h1>
        <p style={{ color: 'rgba(244,239,228,0.82)', fontSize: '0.98rem', lineHeight: 1.5, margin: 0, maxWidth: 340 }}>
          Visual bench cards, branching ID roadmaps, ASCP review, and 145+ quiz reps — built by a working micro lab tech, free to use.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pill tone="onDark" dot uppercase={false}>LearnMicrobes.com</Pill>
        <span style={{ color: '#f6fbf8', fontWeight: 800, fontSize: '0.92rem' }}>Swipe&nbsp;→</span>
      </div>
    </div>
  );
}

// --- 02 · Pop-quiz question (cream, square) ---------------------------
function QuizQuestionSlide() {
  const { Kicker, Pill, QuizOption } = LMDS_SOCIAL;
  return (
    <div style={{ width: 480, height: 480, background: 'var(--cream-150)', borderRadius: 14, padding: '26px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <BrandRow />
        <Pill tone="dark">Pop quiz</Pill>
      </div>
      <Kicker tone="sage" style={{ margin: '20px 0 8px' }}>Question</Kicker>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.85rem', lineHeight: 1.12, letterSpacing: '-0.015em', color: 'var(--text-heading)', margin: '0 0 18px' }}>
        TSI shows a yellow slant, yellow butt, and cracked agar. What does the crack tell you?
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 'auto' }}>
        {['H₂S production', 'Gas production', 'Lactose fermentation', 'Contamination'].map((o, i) => (
          <QuizOption key={i} letter={'ABCD'[i]} style={{ minHeight: 78 }}>{o}</QuizOption>
        ))}
      </div>
    </div>
  );
}

// --- 03 · Pop-quiz answer (deep teal, square) -------------------------
function QuizAnswerSlide() {
  const { Pill, Badge, Callout } = LMDS_SOCIAL;
  return (
    <div style={{ width: 480, height: 480, background: 'var(--lm-teal-700)', borderRadius: 14, padding: '26px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <BrandRow onDark />
        <Pill tone="sage">Answer</Pill>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '26px 0 16px' }}>
        <Badge variant="sage" size="lg" style={{ width: 52, height: 52, fontSize: 24 }}>B</Badge>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.3rem', color: '#f6fbf8' }}>Gas production</span>
      </div>
      <p style={{ color: 'rgba(244,239,228,0.85)', fontSize: '1rem', lineHeight: 1.5, margin: '0 0 18px' }}>
        Cracks, splits, or bubbles in the agar mean the organism made enough CO₂ / H₂ to fracture the medium — classic for <em>E. coli</em> and many coliforms.
      </p>
      <Callout eyebrow="Don't confuse it with" onDark style={{ marginTop: 'auto' }}>
        H₂S — that&#39;s the black precipitate along the stab, not a crack.
      </Callout>
    </div>
  );
}

// --- 04 · Name this isolate (challenge, square) -----------------------
function ChallengeSlide() {
  const { Pill, Kicker, SpecimenFrame } = LMDS_SOCIAL;
  return (
    <div style={{ width: 480, height: 480, background: 'var(--cream-150)', borderRadius: 14, padding: '24px 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 26, right: 28 }}><DotGrid /></div>
      <BrandRow />
      <div style={{ display: 'flex', gap: 10, margin: '16px 0 10px' }}>
        <Pill tone="dark">Micro challenge #06</Pill>
        <Pill tone="sage">Intermediate</Pill>
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.1rem', letterSpacing: '-0.02em', color: 'var(--text-heading)', margin: '0 0 4px' }}>Name this isolate.</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: '0 0 12px' }}>Pediatric throat swab · sore throat &amp; fever, 3 days · pure growth at 24 h</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {['Sheep blood agar', 'β-hemolytic', 'GPC in chains', 'Catalase-negative'].map((c) => (
          <LMDS_SOCIAL.Tag key={c}>{c}</LMDS_SOCIAL.Tag>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <SpecimenFrame label="Specimen A" ratio="16 / 9" style={{ height: '100%' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 45% 40%, #8d2424, #3a0f0f 75%)', color: '#f0cccc', fontSize: 13, fontWeight: 600 }}>blood agar plate</div>
        </SpecimenFrame>
      </div>
    </div>
  );
}

// --- 05 · CTA (deep teal, 4:5) ----------------------------------------
function CTASlide() {
  const { Kicker, Pill, Button } = LMDS_SOCIAL;
  return (
    <div style={{ width: 432, height: 540, background: 'var(--lm-teal-700)', borderRadius: 14, padding: '28px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <BrandRow onDark />
        <span style={{ color: 'rgba(244,239,228,0.6)', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.04em' }}>08 / 08</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Kicker tone="onDark" style={{ marginBottom: 12 }}>Free to start</Kicker>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1.02, letterSpacing: '-0.02em', color: '#f6fbf8', margin: '0 0 14px' }}>Start free. Learn the patterns.</h1>
        <p style={{ color: 'rgba(244,239,228,0.82)', fontSize: '0.98rem', lineHeight: 1.5, margin: '0 0 20px', maxWidth: 340 }}>
          New to micro or prepping for the boards, start anywhere. If a tool would help your bench, message me and I&#39;ll build it.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="accent" pill>Try it</Button>
          <Button variant="ghost-dark" pill>Save this post</Button>
          <Button variant="ghost-dark" pill>Tag a colleague</Button>
        </div>
      </div>
      <Pill tone="onDark" dot uppercase={false}>LearnMicrobes.com</Pill>
    </div>
  );
}

function SocialKit() {
  const posts = [
    { label: '01 · Cover (4:5)', el: <CoverSlide /> },
    { label: '02 · Pop quiz — question (1:1)', el: <QuizQuestionSlide /> },
    { label: '03 · Pop quiz — answer (1:1)', el: <QuizAnswerSlide /> },
    { label: '04 · Name this isolate (1:1)', el: <ChallengeSlide /> },
    { label: '08 · CTA (4:5)', el: <CTASlide /> },
  ];
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 24px 48px' }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-brand)' }}>Educational &amp; social</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.9rem', color: 'var(--text-heading)', margin: '6px 0 0', letterSpacing: '-0.015em' }}>Post templates</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '6px 0 0', maxWidth: 640 }}>Carousel covers, pop-quiz question/answer pairs, bench challenges, and CTAs — the recurring Learn Microbes social formats, built from the same components as the product.</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26, alignItems: 'flex-start' }}>
        {posts.map((p) => (
          <div key={p.label}>
            {p.el}
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginTop: 10 }}>{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { SocialKit });
