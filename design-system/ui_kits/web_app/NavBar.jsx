/* global React */
// Learn Microbes — product top nav (sticky teal bar)
const { Pill } = window.LearnMicrobesDesignSystem_92bf69;

function NavBar({ active, onNav, onCreate }) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'Tools' },
    { id: 'learn', label: 'Learn' },
    { id: 'visuals', label: 'Visual atlas' },
    { id: 'practice', label: 'Practice' },
  ];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 24, padding: '0.7rem 1.5rem',
      background: 'var(--color-brand)', color: '#f6fbf8',
      boxShadow: '0 2px 14px rgba(20,58,52,0.22)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => onNav('home')}>
        <img src="../../assets/brand-mark.svg" alt="" width="40" height="40" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.18))' }} />
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontWeight: 800, fontSize: '1.12rem', letterSpacing: '0.01em' }}>Learn Microbes</div>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: 'rgba(244,239,228,0.82)', marginTop: 2 }}>Clinical Bench Reference</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
        {links.map((l) => (
          <button key={l.id} type="button" onClick={() => onNav(l.id)} style={{
            border: 'none', cursor: 'pointer', background: active === l.id ? 'rgba(255,255,255,0.14)' : 'transparent',
            color: active === l.id ? '#fff' : 'rgba(244,239,228,0.86)',
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.9rem',
            padding: '0.5rem 0.9rem', borderRadius: 'var(--radius-pill)',
            transition: 'background var(--dur-fast), color var(--dur-fast)',
          }}>{l.label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button type="button" aria-label="Toggle theme" style={{
          width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,0.14)', color: '#fff', fontSize: '0.95rem',
        }}><i className="fa-solid fa-moon" /></button>
        <button type="button" onClick={onCreate} style={{
          border: 'none', cursor: 'pointer', background: '#fff', color: 'var(--color-brand-strong)',
          fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.88rem',
          padding: '0.55rem 1.1rem', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-sm)',
        }}>Create free account</button>
      </div>
    </nav>
  );
}

Object.assign(window, { NavBar });
