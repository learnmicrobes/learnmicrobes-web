import React from 'react';
import type { AtlasPage, TubeVisual } from '../../data/atlasPages';

// Bench-card drawings for the parasitology and mycology cards added after the
// first Atlas set. They live outside VisualAtlas.tsx so that file stops growing;
// renderTube() calls renderExpansionVisual() first and falls through when it
// returns null. Every drawing is an original teaching diagram, not a traced photo.

type VisualType = AtlasPage['visualType'];
type Point = [number, number];

const CHROMATIN = '#b0204c';
const PIGMENT = '#3a2a14';
const STIPPLE = '#c2506e';

// Repeatable pseudo-random points inside a circle, so a card looks the same on
// every render and in the pre-rendered HTML.
const scatter = (count: number, seed: number, cx: number, cy: number, radius: number): Point[] => {
  const points: Point[] = [];
  let state = seed;
  const next = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };

  while (points.length < count) {
    const x = next() * 2 - 1;
    const y = next() * 2 - 1;
    if (x * x + y * y <= 1) {
      points.push([Math.round((cx + x * radius) * 10) / 10, Math.round((cy + y * radius) * 10) / 10]);
    }
  }

  return points;
};

const ring = (count: number, cx: number, cy: number, radius: number, offset = 0): Point[] => (
  Array.from({ length: count }, (_, index): Point => {
    const angle = offset + (index / count) * Math.PI * 2;
    return [Math.round((cx + Math.cos(angle) * radius) * 10) / 10, Math.round((cy + Math.sin(angle) * radius) * 10) / 10];
  })
);

const dots = (points: Point[], radius: number, fill: string, opacity = 1) => (
  points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={radius} fill={fill} opacity={opacity} />)
);

const caption = (text: string, fill: string, y = 176) => (
  <text x="100" y={y} textAnchor="middle" fill={fill} fontSize="8" fontFamily="sans-serif" fontWeight="bold">{text}</text>
);

const scaleBar = (label: string, length: number, fill: string) => (
  <g>
    <line x1="18" y1="22" x2={18 + length} y2="22" stroke={fill} strokeWidth="2" />
    <text x="18" y="18" fill={fill} fontSize="7" fontFamily="sans-serif" fontWeight="bold">{label}</text>
  </g>
);

function renderCard(tube: TubeVisual, visualType: VisualType, shapes: React.ReactNode) {
  const bg = tube.colors.slant;
  const detail = tube.colors.base;
  const gradientId = `exp-bg-${visualType}-${tube.id}`;

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#${gradientId})`} stroke="#b8a880" strokeWidth="1.2" />
        {shapes}
        <text x="100" y="190" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

/* ---------- Parasitology ---------- */

function balantidiumShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  if (tube.id === 'B') {
    return (
      <g>
        <circle cx="100" cy="96" r="52" fill={body} fillOpacity="0.22" stroke={detail} strokeWidth="3.4" />
        <circle cx="100" cy="96" r="45" fill="none" stroke={detail} strokeWidth="1.2" opacity="0.6" />
        <path d="M 78 84 C 92 70, 122 76, 124 96 C 125 108, 112 112, 106 102 C 100 92, 88 100, 80 98 C 74 96, 74 88, 78 84 Z" fill={detail} fillOpacity="0.62" />
        <circle cx="96" cy="112" r="3.2" fill={detail} opacity="0.7" />
        {caption('thick wall, macronucleus', detail)}
      </g>
    );
  }

  const ciliaBase = ring(46, 100, 94, 1, -Math.PI / 2);

  return (
    <g>
      {ciliaBase.map(([x, y], index) => {
        const dx = x - 100;
        const dy = y - 94;
        return (
          <line
            key={index}
            x1={100 + dx * 46}
            y1={94 + dy * 62}
            x2={100 + dx * 52}
            y2={94 + dy * 69}
            stroke={detail}
            strokeWidth="1.1"
            opacity="0.75"
          />
        );
      })}
      <ellipse cx="100" cy="94" rx="46" ry="62" fill={body} fillOpacity="0.26" stroke={detail} strokeWidth="2.2" />
      {/* cytostome at the narrower anterior end */}
      <path d="M 92 34 C 96 48, 104 48, 108 34" fill={tube.colors.slant} stroke={detail} strokeWidth="1.8" />
      {/* kidney-shaped macronucleus */}
      <path d="M 80 84 C 92 66, 124 72, 126 96 C 127 110, 113 114, 106 103 C 100 93, 90 102, 82 100 C 75 98, 75 90, 80 84 Z" fill={detail} fillOpacity="0.62" />
      <circle cx="98" cy="112" r="3.4" fill={detail} opacity="0.75" />
      <circle cx="88" cy="134" r="8" fill={tube.colors.slant} stroke={detail} strokeWidth="1" opacity="0.8" />
      <circle cx="116" cy="58" r="6" fill={tube.colors.slant} stroke={detail} strokeWidth="1" opacity="0.8" />
      {caption('cilia + kidney-shaped nucleus', detail)}
    </g>
  );
}

const karyosomeNucleus = (cx: number, cy: number, radius: number, detail: string, bg: string) => (
  <g>
    <circle cx={cx} cy={cy} r={radius} fill={bg} stroke={detail} strokeWidth="1.2" />
    <circle cx={cx} cy={cy} r={radius * 0.5} fill={detail} />
  </g>
);

function freeLivingAmoebaeShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const bg = tube.colors.slant;

  if (tube.id === 'A') {
    return (
      <g>
        <path d="M 48 108 C 40 84, 60 62, 88 66 C 104 68, 110 56, 128 54 C 152 52, 166 72, 160 94 C 156 110, 140 112, 132 124 C 122 140, 96 146, 74 138 C 58 132, 52 122, 48 108 Z" fill={body} fillOpacity="0.3" stroke={detail} strokeWidth="2.2" />
        {/* clear, blunt pseudopod */}
        <path d="M 128 54 C 152 52, 166 72, 160 94 C 148 88, 136 74, 128 54 Z" fill={bg} opacity="0.75" />
        {karyosomeNucleus(88, 104, 13, detail, bg)}
        <circle cx="116" cy="118" r="7" fill={bg} stroke={detail} strokeWidth="0.9" opacity="0.8" />
        <circle cx="68" cy="92" r="5" fill={bg} stroke={detail} strokeWidth="0.9" opacity="0.8" />
        <path d="M 150 44 L 168 38 M 164 34 L 168 38 L 163 42" fill="none" stroke={detail} strokeWidth="1.4" />
        {caption('blunt lobopod, large karyosome', detail)}
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        <path d="M 100 56 C 128 60, 134 104, 118 132 C 110 146, 90 146, 82 132 C 66 104, 72 60, 100 56 Z" fill={body} fillOpacity="0.3" stroke={detail} strokeWidth="2.2" />
        {karyosomeNucleus(100, 80, 11, detail, bg)}
        <path d="M 96 56 C 84 40, 70 44, 60 28" fill="none" stroke={detail} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 104 56 C 116 40, 130 44, 140 28" fill="none" stroke={detail} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="100" cy="122" r="6" fill={bg} stroke={detail} strokeWidth="0.9" opacity="0.8" />
        {caption('two flagella, temporary form', detail)}
      </g>
    );
  }

  if (tube.id === 'C') {
    const spines: Array<[number, number, number, number]> = [
      [58, 76, 44, 62], [72, 62, 64, 44], [92, 56, 90, 38], [114, 58, 120, 40],
      [134, 68, 148, 54], [146, 86, 164, 80], [148, 108, 166, 114], [138, 126, 152, 140],
      [118, 136, 122, 154], [94, 138, 90, 156], [72, 130, 60, 144], [56, 112, 40, 118], [52, 94, 36, 90]
    ];

    return (
      <g>
        {spines.map(([x1, y1, x2, y2], index) => (
          <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={detail} strokeWidth="1.6" strokeLinecap="round" />
        ))}
        <path d="M 54 96 C 52 72, 76 56, 102 58 C 128 56, 150 76, 148 100 C 148 122, 128 138, 104 138 C 78 140, 56 122, 54 96 Z" fill={body} fillOpacity="0.3" stroke={detail} strokeWidth="2.2" />
        {karyosomeNucleus(100, 98, 13, detail, bg)}
        <circle cx="124" cy="112" r="8" fill={bg} stroke={detail} strokeWidth="0.9" opacity="0.8" />
        <circle cx="76" cy="84" r="5" fill={bg} stroke={detail} strokeWidth="0.9" opacity="0.8" />
        {caption('spine-like acanthopodia', detail)}
      </g>
    );
  }

  const outer = ring(18, 100, 96, 1).map(([x, y], index): Point => {
    const reach = index % 2 === 0 ? 54 : 48;
    return [100 + (x - 100) * reach, 96 + (y - 96) * reach];
  });
  const inner = ring(6, 100, 96, 34, Math.PI / 6);

  return (
    <g>
      <polygon points={outer.map((point) => point.join(',')).join(' ')} fill={body} fillOpacity="0.2" stroke={detail} strokeWidth="2.2" strokeLinejoin="round" />
      <polygon points={inner.map((point) => point.join(',')).join(' ')} fill={body} fillOpacity="0.34" stroke={detail} strokeWidth="2.4" strokeLinejoin="round" />
      {karyosomeNucleus(100, 96, 10, detail, tube.colors.slant)}
      {caption('wrinkled outer, polygonal inner wall', detail)}
    </g>
  );
}

function commensalAmoebaeShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const bg = tube.colors.slant;

  if (tube.id === 'A') {
    const nuclei: Point[] = [...ring(7, 100, 98, 38, -Math.PI / 2), [100, 98]];

    return (
      <g>
        {scaleBar('10 um', 44, detail)}
        <circle cx="100" cy="98" r="57" fill={body} fillOpacity="0.2" stroke={detail} strokeWidth="2.6" />
        {nuclei.map(([x, y], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r="10.5" fill={bg} stroke={detail} strokeWidth="2" strokeDasharray="3 1.4" />
            <circle cx={x + 3.2} cy={y - 2.2} r="2.8" fill={detail} />
          </g>
        ))}
        {/* splinter-shaped chromatoid body with pointed ends */}
        <path d="M 76 118 L 96 124 L 78 122 Z" fill={detail} opacity="0.75" />
        {caption('8 nuclei, eccentric karyosomes', detail)}
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        {scaleBar('10 um', 44, detail)}
        <ellipse cx="100" cy="98" rx="17" ry="22" fill={body} fillOpacity="0.24" stroke={detail} strokeWidth="2.2" />
        {dots([[93, 88], [107, 90], [94, 107], [107, 105]], 3.7, detail)}
        {caption('tiny oval, 4 blot-like karyosomes', detail)}
      </g>
    );
  }

  return (
    <g>
      {scaleBar('10 um', 44, detail)}
      <path d="M 72 96 C 70 76, 90 66, 108 70 C 126 74, 134 92, 128 110 C 124 128, 100 132, 84 124 C 74 118, 72 106, 72 96 Z" fill={body} fillOpacity="0.22" stroke={detail} strokeWidth="2.4" />
      <ellipse cx="110" cy="106" rx="13" ry="15" fill="#8a4a16" fillOpacity="0.78" stroke={detail} strokeWidth="1.3" />
      <circle cx="86" cy="86" r="7.5" fill={bg} stroke={detail} strokeWidth="1.1" />
      <circle cx="86" cy="86" r="4.2" fill={detail} />
      {caption('large iodine-brown glycogen vacuole', detail)}
    </g>
  );
}

function chilomastixShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const bg = tube.colors.slant;

  if (tube.id === 'A') {
    return (
      <g>
        {/* lemon outline with the clear anterior knob */}
        <path d="M 100 34 C 108 34, 110 46, 116 54 C 140 70, 146 112, 126 138 C 112 154, 88 154, 74 138 C 54 112, 60 70, 84 54 C 90 46, 92 34, 100 34 Z" fill={body} fillOpacity="0.24" stroke={detail} strokeWidth="2.6" />
        <path d="M 92 46 C 96 38, 104 38, 108 46 C 104 50, 96 50, 92 46 Z" fill={bg} opacity="0.9" />
        <circle cx="92" cy="84" r="11" fill={bg} stroke={detail} strokeWidth="1.4" />
        <circle cx="92" cy="84" r="4" fill={detail} />
        {/* shepherd's crook fibril */}
        <path d="M 116 132 C 118 108, 120 86, 110 76 C 102 70, 100 82, 108 84" fill="none" stroke={detail} strokeWidth="2.2" strokeLinecap="round" />
        {caption('anterior knob, curved fibril', detail)}
      </g>
    );
  }

  return (
    <g>
      <path d="M 96 58 C 80 44, 70 46, 58 32" fill="none" stroke={detail} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 100 56 C 100 40, 104 34, 98 22" fill="none" stroke={detail} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 104 58 C 120 44, 130 46, 142 32" fill="none" stroke={detail} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 100 56 C 130 60, 138 96, 122 122 C 114 136, 106 146, 100 160 C 94 146, 86 136, 78 122 C 62 96, 70 60, 100 56 Z" fill={body} fillOpacity="0.26" stroke={detail} strokeWidth="2.4" />
      <circle cx="94" cy="74" r="9" fill={bg} stroke={detail} strokeWidth="1.3" />
      <circle cx="94" cy="74" r="3.4" fill={detail} />
      {/* cytostome with its recurrent flagellum */}
      <path d="M 112 68 C 124 80, 122 100, 112 108 C 106 98, 106 80, 112 68 Z" fill={bg} stroke={detail} strokeWidth="1.4" opacity="0.9" />
      <path d="M 113 76 C 117 86, 116 94, 112 102" fill="none" stroke={detail} strokeWidth="1" />
      {/* spiral groove */}
      <path d="M 76 104 C 92 112, 110 116, 122 122 M 84 128 C 96 132, 106 134, 112 138" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.6" />
      {caption('cytostome + spiral groove', detail)}
    </g>
  );
}

const redCell = (cx: number, cy: number, rx: number, ry: number, fill: string, opacity = 0.42) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} fillOpacity={opacity} stroke={fill} strokeWidth="1.6" />
);

function plasmodiumVivaxShapes(tube: TubeVisual) {
  const cell = tube.colors.butt;
  const parasite = tube.colors.base;
  const stippling = dots(scatter(46, 7 + tube.id.charCodeAt(0), 112, 106, 50), 1.5, STIPPLE, 0.85);

  const stage = () => {
    if (tube.id === 'A') {
      return (
        <g>
          <circle cx="112" cy="106" r="17" fill="none" stroke={parasite} strokeWidth="4" />
          <circle cx="128" cy="100" r="5.4" fill={CHROMATIN} />
        </g>
      );
    }

    if (tube.id === 'B') {
      return (
        <g>
          <path d="M 84 96 C 92 76, 112 84, 122 74 C 136 66, 150 82, 138 96 C 130 106, 146 116, 134 130 C 122 142, 108 126, 96 134 C 82 140, 74 116, 84 96 Z" fill={parasite} fillOpacity="0.5" stroke={parasite} strokeWidth="1.2" />
          <ellipse cx="112" cy="104" rx="11" ry="9" fill={tube.colors.slant} opacity="0.75" />
          <circle cx="128" cy="88" r="5.4" fill={CHROMATIN} />
          {dots([[96, 112], [118, 124], [136, 108]], 1.8, PIGMENT)}
        </g>
      );
    }

    if (tube.id === 'C') {
      return (
        <g>
          {dots([...ring(11, 112, 106, 34), ...ring(7, 112, 106, 19, 0.4)], 5.6, parasite, 0.55)}
          {dots([...ring(11, 112, 106, 34), ...ring(7, 112, 106, 19, 0.4)], 2.4, CHROMATIN)}
          <circle cx="112" cy="106" r="6" fill={PIGMENT} />
        </g>
      );
    }

    return (
      <g>
        <ellipse cx="112" cy="106" rx="44" ry="42" fill={parasite} fillOpacity="0.46" stroke={parasite} strokeWidth="1.2" />
        <ellipse cx="124" cy="96" rx="11" ry="8" fill={CHROMATIN} opacity="0.9" />
        {dots(scatter(16, 31, 108, 110, 34), 1.8, PIGMENT)}
      </g>
    );
  };

  const labels: Record<string, string> = {
    A: 'large ring, big chromatin dot',
    B: 'enlarged cell, Schuffner dots',
    C: '12-24 merozoites',
    D: 'round, fills the enlarged cell'
  };

  return (
    <g>
      {redCell(42, 46, 26, 26, cell, 0.3)}
      <text x="42" y="49" textAnchor="middle" fill={parasite} fontSize="7" fontFamily="sans-serif">normal</text>
      {redCell(112, 106, 56, 56, cell)}
      {tube.id !== 'A' && stippling}
      {stage()}
      {caption(labels[tube.id] ?? '', parasite)}
    </g>
  );
}

function plasmodiumMalariaeShapes(tube: TubeVisual) {
  const cell = tube.colors.butt;
  const parasite = tube.colors.base;

  const stage = () => {
    if (tube.id === 'A') {
      return (
        <g>
          <rect x="60" y="88" width="88" height="22" rx="9" transform="rotate(-18 104 100)" fill={parasite} fillOpacity="0.56" stroke={parasite} strokeWidth="1.2" />
          <ellipse cx="124" cy="92" rx="10" ry="5" transform="rotate(-18 124 92)" fill={CHROMATIN} />
          {dots([[80, 108], [92, 102], [104, 100], [114, 96], [136, 90]], 2.4, PIGMENT)}
        </g>
      );
    }

    if (tube.id === 'B') {
      return (
        <g>
          {dots(ring(8, 104, 100, 26), 8, parasite, 0.55)}
          {dots(ring(8, 104, 100, 26), 3.2, CHROMATIN)}
          <circle cx="104" cy="100" r="8" fill={PIGMENT} />
        </g>
      );
    }

    return (
      <g>
        <circle cx="104" cy="100" r="37" fill={parasite} fillOpacity="0.46" stroke={parasite} strokeWidth="1.2" />
        <ellipse cx="114" cy="92" rx="10" ry="7" fill={CHROMATIN} opacity="0.9" />
        {dots(scatter(18, 53, 102, 104, 29), 2.3, PIGMENT)}
      </g>
    );
  };

  const labels: Record<string, string> = {
    A: 'band across a normal-size cell',
    B: '6-12 merozoites, central pigment',
    C: 'round, coarse dark pigment'
  };

  return (
    <g>
      {redCell(46, 46, 26, 26, cell, 0.3)}
      <text x="46" y="49" textAnchor="middle" fill={parasite} fontSize="7" fontFamily="sans-serif">normal</text>
      {redCell(104, 100, 42, 42, cell)}
      {stage()}
      {caption(labels[tube.id] ?? '', parasite)}
    </g>
  );
}

function plasmodiumOvaleShapes(tube: TubeVisual) {
  const cell = tube.colors.butt;
  const parasite = tube.colors.base;

  return (
    <g>
      {redCell(40, 44, 24, 24, cell, 0.3)}
      <text x="40" y="47" textAnchor="middle" fill={parasite} fontSize="7" fontFamily="sans-serif">normal</text>
      {/* oval host cell with a ragged, fimbriated end */}
      <path d="M 112 42 L 118 34 L 122 44 L 130 38 L 132 50 C 152 64, 158 98, 148 126 C 140 150, 118 162, 100 154 C 78 146, 68 118, 72 92 C 74 68, 86 50, 98 46 L 100 36 L 106 44 Z" fill={cell} fillOpacity="0.42" stroke={cell} strokeWidth="1.6" strokeLinejoin="round" />
      {dots(scatter(40, 19 + tube.id.charCodeAt(0), 112, 102, 36), 1.6, STIPPLE, 0.85)}
      {tube.id === 'A' ? (
        <g>
          <circle cx="110" cy="104" r="20" fill={parasite} fillOpacity="0.55" stroke={parasite} strokeWidth="1.2" />
          <circle cx="120" cy="94" r="6" fill={CHROMATIN} />
          {dots([[100, 110], [108, 116], [116, 108]], 1.8, PIGMENT)}
        </g>
      ) : (
        <g>
          {dots(ring(8, 110, 104, 22), 7, parasite, 0.55)}
          {dots(ring(8, 110, 104, 22), 2.8, CHROMATIN)}
          <circle cx="110" cy="104" r="7" fill={PIGMENT} />
        </g>
      )}
      {caption(tube.id === 'A' ? 'oval ragged cell, compact parasite' : 'about 8 merozoites', parasite)}
    </g>
  );
}

function microsporidiaShapes(tube: TubeVisual) {
  const spore = tube.colors.butt;
  const detail = tube.colors.base;

  const sporeAt = ([x, y]: Point, index: number, striped: boolean) => {
    const angle = (index * 47) % 180;
    return (
      <g key={index} transform={`rotate(${angle} ${x} ${y})`}>
        <ellipse cx={x} cy={y} rx="4.6" ry="7.4" fill={spore} fillOpacity="0.72" stroke={detail} strokeWidth="1.3" />
        {striped && <line x1={x - 4.2} y1={y} x2={x + 4.2} y2={y} stroke="#fbeef0" strokeWidth="1.6" />}
      </g>
    );
  };

  if (tube.id === 'A') {
    const points: Point[] = [[50, 58], [78, 44], [112, 56], [146, 48], [62, 92], [96, 84], [130, 96], [156, 82], [48, 128], [82, 122], [114, 134], [146, 126], [100, 110], [70, 150], [128, 154]];

    return (
      <g>
        {scaleBar('5 um', 34, detail)}
        {points.map((point, index) => sporeAt(point, index, index % 3 !== 1))}
        {caption('pink-red spores, belt-like stripe', detail)}
      </g>
    );
  }

  const yeast: Array<[number, number, number]> = [[66, 72, 15], [128, 68, 17], [92, 124, 16], [146, 122, 14]];

  return (
    <g>
      {scaleBar('5 um', 34, detail)}
      {yeast.map(([x, y, r], index) => (
        <g key={index}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 1.18} fill={spore} fillOpacity="0.56" stroke={detail} strokeWidth="1.4" />
          <ellipse cx={x + r * 0.95} cy={y - r * 0.95} rx={r * 0.46} ry={r * 0.54} fill={spore} fillOpacity="0.56" stroke={detail} strokeWidth="1.2" />
        </g>
      ))}
      {sporeAt([40, 150], 2, true)}
      <text x="50" y="153" fill={detail} fontSize="7" fontFamily="sans-serif">spore, for scale</text>
      {caption('larger, budding, no stripe', detail, 172)}
    </g>
  );
}

function sarcoptesShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  if (tube.id === 'A') {
    const frontLegs: Array<[number, number, number, number]> = [[78, 58, 68, 45], [92, 50, 88, 35], [108, 50, 112, 35], [122, 58, 132, 45]];
    const rearLegs: Array<[number, number, number, number]> = [[76, 136, 68, 147], [90, 146, 86, 156], [110, 146, 114, 156], [124, 136, 132, 147]];
    const spines: Point[] = [[84, 86], [100, 80], [116, 86], [78, 104], [94, 100], [108, 100], [122, 104], [88, 118], [102, 120], [114, 116]];

    return (
      <g>
        {frontLegs.map(([x1, y1, x2, y2], index) => (
          <line key={`f${index}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={detail} strokeWidth="5" strokeLinecap="round" />
        ))}
        {rearLegs.map(([x1, y1, x2, y2], index) => (
          <g key={`r${index}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={detail} strokeWidth="4.4" strokeLinecap="round" />
            <line x1={x2} y1={y2} x2={x2 + (x2 - x1) * 0.9} y2={y2 + 12} stroke={detail} strokeWidth="0.9" />
          </g>
        ))}
        <ellipse cx="100" cy="98" rx="48" ry="52" fill={body} fillOpacity="0.36" stroke={detail} strokeWidth="2.4" />
        <path d="M 92 48 C 94 36, 106 36, 108 48 Z" fill={body} stroke={detail} strokeWidth="1.8" />
        <path d="M 64 78 C 86 70, 114 70, 136 78 M 58 96 C 84 90, 116 90, 142 96 M 62 126 C 86 132, 114 132, 138 126" fill="none" stroke={detail} strokeWidth="0.9" opacity="0.5" />
        {spines.map(([x, y], index) => (
          <path key={index} d={`M ${x - 2.6} ${y + 3} L ${x} ${y - 4} L ${x + 2.6} ${y + 3} Z`} fill={detail} opacity="0.8" />
        ))}
        {caption('round body, 8 short legs', detail)}
      </g>
    );
  }

  return (
    <g>
      <path d="M 26 60 C 60 50, 90 66, 120 54 C 146 44, 168 56, 176 50 M 24 138 C 54 128, 92 146, 124 134 C 150 126, 166 136, 178 130" fill="none" stroke={detail} strokeWidth="0.9" opacity="0.3" />
      <ellipse cx="70" cy="84" rx="30" ry="19" transform="rotate(-20 70 84)" fill={tube.colors.slant} stroke={detail} strokeWidth="2.2" />
      <ellipse cx="70" cy="84" rx="20" ry="11" transform="rotate(-20 70 84)" fill={body} fillOpacity="0.4" />
      <ellipse cx="128" cy="70" rx="28" ry="18" transform="rotate(24 128 70)" fill={tube.colors.slant} stroke={detail} strokeWidth="2.2" />
      <ellipse cx="128" cy="70" rx="18" ry="10" transform="rotate(24 128 70)" fill={body} fillOpacity="0.4" />
      {dots([[92, 128], [104, 122], [112, 134], [100, 140], [122, 126], [88, 142], [116, 146], [130, 138]], 5, '#8a5a14', 0.85)}
      <text x="68" y="116" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">eggs</text>
      <text x="148" y="150" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">scybala</text>
      {caption('either one confirms scabies', detail, 172)}
    </g>
  );
}

function liceShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  if (tube.id === 'A') {
    const legs: Array<[number, number, number, number, number, number]> = [
      [88, 62, 66, 52, 54, 62], [112, 62, 134, 52, 146, 62],
      [86, 72, 60, 72, 50, 84], [114, 72, 140, 72, 150, 84],
      [88, 82, 64, 92, 58, 106], [112, 82, 136, 92, 142, 106]
    ];

    return (
      <g>
        {legs.map(([x1, y1, x2, y2, x3, y3], index) => (
          <g key={index}>
            <path d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`} fill="none" stroke={detail} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d={`M ${x3 - 4} ${y3 + 2} Q ${x3} ${y3 + 8} ${x3 + 4} ${y3 + 2}`} fill="none" stroke={detail} strokeWidth="1.6" />
          </g>
        ))}
        <path d="M 94 34 L 84 22 M 106 34 L 116 22" fill="none" stroke={detail} strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="100" cy="42" rx="10" ry="12" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="2" />
        <ellipse cx="100" cy="70" rx="16" ry="18" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="2" />
        <ellipse cx="100" cy="122" rx="24" ry="40" fill={body} fillOpacity="0.4" stroke={detail} strokeWidth="2.2" />
        {[100, 112, 124, 136, 148].map((y) => (
          <path key={y} d={`M ${100 - Math.sqrt(Math.max(0, 1 - ((y - 122) / 40) ** 2)) * 24} ${y} L ${100 + Math.sqrt(Math.max(0, 1 - ((y - 122) / 40) ** 2)) * 24} ${y}`} stroke={detail} strokeWidth="0.9" opacity="0.5" />
        ))}
        {caption('elongated, legs similar in size', detail)}
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        {/* thin first pair */}
        <path d="M 84 62 L 64 48 L 58 56 M 116 62 L 136 48 L 142 56" fill="none" stroke={detail} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* heavy second and third pairs with large claws */}
        {[[70, 86, 40, 78, 32, 96], [130, 86, 160, 78, 168, 96], [66, 108, 38, 116, 34, 136], [134, 108, 162, 116, 166, 136]].map(([x1, y1, x2, y2, x3, y3], index) => (
          <g key={index}>
            <path d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`} fill="none" stroke={detail} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d={`M ${x3 - 8} ${y3 - 2} Q ${x3} ${y3 + 14} ${x3 + 8} ${y3 - 2}`} fill="none" stroke={detail} strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        <path d="M 94 44 L 86 32 M 106 44 L 114 32" fill="none" stroke={detail} strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="100" cy="52" rx="10" ry="11" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="2" />
        <path d="M 100 62 C 136 62, 148 92, 138 122 C 132 144, 114 152, 100 152 C 86 152, 68 144, 62 122 C 52 92, 64 62, 100 62 Z" fill={body} fillOpacity="0.42" stroke={detail} strokeWidth="2.2" />
        <path d="M 66 112 C 88 118, 112 118, 134 112 M 72 130 C 90 136, 110 136, 128 130" fill="none" stroke={detail} strokeWidth="0.9" opacity="0.5" />
        {caption('crab shape, large claws on legs 2-3', detail)}
      </g>
    );
  }

  return (
    <g>
      <line x1="46" y1="164" x2="150" y2="28" stroke={detail} strokeWidth="9" strokeLinecap="round" opacity="0.8" />
      {/* cement sheath wrapping the hair */}
      <path d="M 86 112 L 96 99 L 108 108 L 98 121 Z" fill={body} stroke={detail} strokeWidth="1.2" opacity="0.9" />
      <ellipse cx="128" cy="98" rx="34" ry="16" transform="rotate(18 128 98)" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="2.2" />
      {/* operculum at the free end */}
      <path d="M 153 92 C 162 96, 164 108, 158 116" fill="none" stroke={detail} strokeWidth="2.4" strokeLinecap="round" />
      {dots([[156, 98], [159, 104], [157, 110]], 1.3, detail)}
      <text x="70" y="60" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">hair shaft</text>
      {caption('cemented to the hair, capped end', detail)}
    </g>
  );
}

/* ---------- Mycology ---------- */

function pneumocystisShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  if (tube.id === 'A') {
    const round: Point[] = [[70, 66], [96, 58], [120, 72], [84, 90], [110, 96], [134, 100], [72, 116], [100, 122]];
    const cups: Array<[number, number, number]> = [[58, 92, 20], [128, 124, -30], [142, 76, 60], [90, 142, 10]];

    return (
      <g>
        {round.map(([x, y], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r="11" fill={body} fillOpacity="0.5" stroke="#161616" strokeWidth="2.6" />
            <path d={`M ${x - 3} ${y - 4} Q ${x + 3} ${y} ${x - 2} ${y + 4}`} fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
        {cups.map(([x, y, angle], index) => (
          <path
            key={index}
            transform={`rotate(${angle} ${x} ${y})`}
            d={`M ${x - 11} ${y - 4} C ${x - 10} ${y + 12}, ${x + 10} ${y + 12}, ${x + 11} ${y - 4} C ${x + 5} ${y + 4}, ${x - 5} ${y + 4}, ${x - 11} ${y - 4} Z`}
            fill={body}
            fillOpacity="0.62"
            stroke="#161616"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        ))}
        {caption('round, cup, crescent; no buds', detail, 172)}
      </g>
    );
  }

  const bubbles = scatter(26, 91, 100, 96, 46);

  return (
    <g>
      <path d="M 44 96 C 40 62, 74 40, 104 44 C 138 42, 164 70, 158 102 C 156 134, 126 152, 98 148 C 68 152, 46 128, 44 96 Z" fill={body} fillOpacity="0.2" />
      {bubbles.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={9 + (index % 3) * 2} fill="#ffffff" fillOpacity="0.5" stroke={body} strokeWidth="1" />
      ))}
      {dots(scatter(34, 17, 100, 96, 48), 1.9, detail)}
      {/* one cyst outline with its intracystic bodies */}
      <circle cx="100" cy="96" r="15" fill="#ffffff" fillOpacity="0.72" stroke={body} strokeWidth="1.2" />
      {dots(ring(8, 100, 96, 9), 2.2, detail)}
      {caption('foamy cluster, wall unstained', detail, 172)}
    </g>
  );
}

const pseudohypha = (x1: number, y1: number, x2: number, y2: number, cells: number, stroke: string, fill: string, width = 9) => {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const cellLength = length / cells;

  return (
    <g transform={`rotate(${angle} ${x1} ${y1})`}>
      {Array.from({ length: cells }, (_, index) => (
        <ellipse
          key={index}
          cx={x1 + cellLength * (index + 0.5)}
          cy={y1}
          rx={cellLength / 2}
          ry={width / 2}
          fill={fill}
          fillOpacity="0.36"
          stroke={stroke}
          strokeWidth="1.3"
        />
      ))}
    </g>
  );
};

function candidaCornmealShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  if (tube.id === 'A') {
    const clusters: Point[] = [[66, 70], [104, 82], [70, 128], [112, 138]];

    return (
      <g>
        {pseudohypha(28, 58, 142, 94, 3, detail, body)}
        {pseudohypha(34, 116, 150, 152, 3, detail, body)}
        {clusters.map(([x, y], index) => (
          <g key={index}>{dots(scatter(9, 11 + index, x, y - 8, 11), 4.2, body, 0.8)}</g>
        ))}
        {[[156, 98], [164, 158]].map(([x, y], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r="13" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="3.2" />
            <circle cx={x} cy={y} r="7.5" fill="none" stroke={detail} strokeWidth="0.9" opacity="0.6" />
          </g>
        ))}
        {caption('terminal chlamydospores', detail, 28)}
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        {pseudohypha(20, 56, 180, 76, 5, detail, body)}
        {pseudohypha(20, 108, 180, 96, 5, detail, body)}
        {pseudohypha(22, 150, 178, 138, 5, detail, body)}
        {dots([[54, 48], [118, 60], [150, 86], [84, 92], [50, 140], [112, 132], [146, 148]], 4.6, body, 0.85)}
        {caption('blastoconidia scattered singly', detail, 28)}
      </g>
    );
  }

  if (tube.id === 'C') {
    const branches = ['M 60 96 C 54 78, 62 62, 48 50', 'M 82 96 C 90 76, 80 62, 94 46', 'M 106 96 C 100 80, 112 66, 104 52', 'M 128 96 C 138 82, 132 66, 148 56', 'M 70 100 C 62 118, 74 132, 60 146', 'M 96 100 C 104 118, 92 134, 104 150', 'M 122 100 C 114 116, 128 130, 120 146', 'M 144 100 C 154 114, 146 130, 160 140'];

    return (
      <g>
        <line x1="24" y1="98" x2="176" y2="98" stroke={detail} strokeWidth="3" opacity="0.45" />
        {branches.map((d, index) => (
          <path key={index} d={d} fill="none" stroke={detail} strokeWidth="2" strokeLinecap="round" />
        ))}
        <ellipse cx="148" cy="124" rx="16" ry="8" transform="rotate(30 148 124)" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="1.6" />
        <text x="162" y="160" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">giant cell</text>
        {caption('fine, short, curved pseudohyphae', detail, 28)}
      </g>
    );
  }

  const cells = scatter(20, 5, 100, 100, 62);

  return (
    <g>
      {cells.map(([x, y], index) => (
        <g key={index}>
          <ellipse cx={x} cy={y} rx="5.4" ry="6.6" fill={body} fillOpacity="0.6" stroke={detail} strokeWidth="1.2" />
          {index % 3 === 0 && <ellipse cx={x + 6} cy={y - 6} rx="3" ry="3.6" fill={body} fillOpacity="0.6" stroke={detail} strokeWidth="1" />}
        </g>
      ))}
      {caption('small yeast only, no pseudohyphae', detail, 28)}
    </g>
  );
}

function malasseziaShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  if (tube.id === 'A') {
    const hyphae = ['M 36 62 C 50 52, 62 66, 74 56', 'M 112 44 C 126 56, 138 44, 150 54', 'M 44 118 C 58 126, 66 110, 80 120', 'M 124 96 C 134 108, 148 98, 158 108', 'M 88 150 C 102 142, 110 156, 124 148', 'M 86 82 C 96 92, 104 80, 114 88'];
    const clusters: Array<[number, number, number]> = [[66, 88, 3], [136, 72, 7], [104, 122, 13], [150, 140, 21], [50, 148, 29]];

    return (
      <g>
        {hyphae.map((d, index) => (
          <path key={index} d={d} fill="none" stroke={detail} strokeWidth="5.4" strokeLinecap="round" opacity="0.8" />
        ))}
        {clusters.map(([x, y, seed], index) => (
          <g key={index}>
            {scatter(6, seed, x, y, 10).map(([px, py], inner) => (
              <circle key={inner} cx={px} cy={py} r="5.6" fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="1.5" />
            ))}
          </g>
        ))}
        {caption('short hyphae + round yeast clusters', detail, 28)}
      </g>
    );
  }

  const cells: Array<[number, number, number]> = [[70, 78, -20], [130, 70, 25], [96, 128, 5], [146, 132, -35]];

  return (
    <g>
      {cells.map(([x, y, angle], index) => (
        <g key={index} transform={`rotate(${angle} ${x} ${y})`}>
          <ellipse cx={x} cy={y + 6} rx="15" ry="20" fill={body} fillOpacity="0.56" stroke={detail} strokeWidth="2" />
          <ellipse cx={x} cy={y - 22} rx="8.6" ry="9.6" fill={body} fillOpacity="0.56" stroke={detail} strokeWidth="1.8" />
          {/* collarette at the broad bud base */}
          <path d={`M ${x - 10} ${y - 13} L ${x + 10} ${y - 13}`} stroke={detail} strokeWidth="2.8" strokeLinecap="round" />
        </g>
      ))}
      {caption('bottle shape, broad-based bud', detail, 28)}
    </g>
  );
}

function mucoralesComparisonShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  const rhizoids = (x: number, y: number) => (
    <g fill="none" stroke={detail} strokeWidth="2" strokeLinecap="round">
      <path d={`M ${x} ${y} L ${x - 12} ${y + 18} L ${x - 20} ${y + 30} M ${x - 12} ${y + 18} L ${x - 6} ${y + 32}`} />
      <path d={`M ${x} ${y} L ${x + 2} ${y + 22} L ${x - 2} ${y + 34} M ${x + 2} ${y + 22} L ${x + 10} ${y + 32}`} />
      <path d={`M ${x} ${y} L ${x + 14} ${y + 16} L ${x + 24} ${y + 28} M ${x + 14} ${y + 16} L ${x + 16} ${y + 32}`} />
    </g>
  );

  const roundSporangium = (x: number, y: number, r: number) => (
    <g>
      <circle cx={x} cy={y} r={r} fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="2" />
      <path d={`M ${x - r * 0.5} ${y + r * 0.86} C ${x - r * 0.5} ${y}, ${x + r * 0.5} ${y}, ${x + r * 0.5} ${y + r * 0.86}`} fill={tube.colors.slant} fillOpacity="0.5" stroke={detail} strokeWidth="1" />
    </g>
  );

  if (tube.id === 'A') {
    return (
      <g>
        <path d="M 16 124 C 56 112, 76 122, 100 124 C 126 122, 150 112, 184 124" fill="none" stroke={detail} strokeWidth="5" strokeLinecap="round" />
        <path d="M 100 124 L 76 56 M 100 124 L 100 46 M 100 124 L 126 58" fill="none" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
        {roundSporangium(74, 46, 13)}
        {roundSporangium(100, 34, 14)}
        {roundSporangium(128, 48, 13)}
        {rhizoids(100, 126)}
        <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">rhizoids at the node</text>
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        <path d="M 16 136 C 60 126, 130 144, 184 132" fill="none" stroke={detail} strokeWidth="5" strokeLinecap="round" />
        <path d="M 58 134 L 56 58 M 124 138 L 126 70 M 125 104 L 152 78" fill="none" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
        {roundSporangium(56, 46, 14)}
        {roundSporangium(126, 58, 13)}
        {roundSporangium(158, 70, 10)}
        <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">no rhizoids</text>
      </g>
    );
  }

  const pyriform = (x: number, y: number) => (
    <g>
      {/* funnel-shaped apophysis under a small pear-shaped sporangium */}
      <path d={`M ${x - 3} ${y + 22} L ${x - 9} ${y + 8} L ${x + 9} ${y + 8} L ${x + 3} ${y + 22} Z`} fill={body} fillOpacity="0.4" stroke={detail} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={`M ${x - 9} ${y + 8} C ${x - 14} ${y - 4}, ${x - 8} ${y - 14}, ${x} ${y - 14} C ${x + 8} ${y - 14}, ${x + 14} ${y - 4}, ${x + 9} ${y + 8} Z`} fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="2" />
    </g>
  );

  return (
    <g>
      <path d="M 30 128 C 60 92, 140 92, 170 128" fill="none" stroke={detail} strokeWidth="5" strokeLinecap="round" />
      <path d="M 100 101 L 100 60 M 100 82 L 74 62 M 100 76 L 128 56" fill="none" stroke={detail} strokeWidth="3.2" strokeLinecap="round" />
      {pyriform(100, 40)}
      {pyriform(72, 42)}
      {pyriform(130, 36)}
      {rhizoids(30, 128)}
      {rhizoids(170, 128)}
      <text x="100" y="176" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">stalks between the rhizoids</text>
    </g>
  );
}

function arthroconidiaShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  const chain = (x: number, y: number, angle: number, count: number, alternating: boolean) => (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      {Array.from({ length: count }, (_, index) => {
        const isEmpty = alternating && index % 2 === 1;
        const cellX = x + index * (alternating ? 17 : 21);

        return isEmpty ? (
          <rect key={index} x={cellX + 3} y={y - 5} width="11" height="10" fill="none" stroke={detail} strokeWidth="0.9" opacity="0.7" />
        ) : (
          <rect key={index} x={cellX} y={y - 8} width={alternating ? 17 : 19} height="16" rx={alternating ? 6 : 2} fill={body} fillOpacity="0.62" stroke={detail} strokeWidth={alternating ? 2.4 : 1.6} />
        );
      })}
    </g>
  );

  if (tube.id === 'A') {
    return (
      <g>
        {chain(24, 60, 6, 9, true)}
        {chain(30, 112, -8, 9, true)}
        {/* a freed arthroconidium keeps wall fragments on both ends */}
        <g>
          <rect x="88" y="140" width="18" height="16" rx="6" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="2.4" />
          <path d="M 88 143 L 82 141 M 88 153 L 82 155 M 106 143 L 112 141 M 106 153 L 112 155" stroke={detail} strokeWidth="1" />
        </g>
        {caption('barrel cells alternate with empty cells', detail, 28)}
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        {chain(22, 62, 5, 7, false)}
        {chain(26, 108, -6, 7, false)}
        {/* hockey-stick germination from one corner */}
        <g>
          <rect x="74" y="140" width="19" height="16" rx="2" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="1.6" />
          <path d="M 93 141 C 106 132, 122 134, 138 126" fill="none" stroke={detail} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        </g>
        {caption('consecutive rectangles, no buds', detail, 28)}
      </g>
    );
  }

  return (
    <g>
      {chain(22, 66, 5, 7, false)}
      {chain(26, 118, -6, 7, false)}
      {[[52, 52], [96, 54], [140, 62], [70, 132], [118, 126], [150, 100], [44, 96]].map(([x, y], index) => (
        <g key={index}>
          <ellipse cx={x} cy={y} rx="6.4" ry="8" fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="1.4" />
          {index % 2 === 0 && <ellipse cx={x + 7} cy={y - 7} rx="3.4" ry="4.2" fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="1.1" />}
        </g>
      ))}
      {caption('arthroconidia plus budding cells', detail, 28)}
    </g>
  );
}

function tissueYeastShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const bg = tube.colors.slant;

  // One scale for all four panels: 3 px per micrometer.
  if (tube.id === 'A') {
    const yeasts = scatter(15, 23, 104, 106, 40).filter(([x, y]) => Math.hypot(x - 78, y - 86) > 24);

    return (
      <g>
        {scaleBar('10 um', 30, detail)}
        <path d="M 44 104 C 40 70, 70 44, 104 46 C 138 44, 166 72, 162 106 C 160 138, 132 160, 102 158 C 70 160, 46 136, 44 104 Z" fill={body} fillOpacity="0.18" stroke={body} strokeWidth="1.6" />
        <path d="M 60 82 C 68 62, 96 66, 96 84 C 96 96, 84 96, 80 104 C 74 112, 58 104, 60 82 Z" fill={body} fillOpacity="0.5" />
        {yeasts.map(([x, y], index) => (
          <g key={index}>
            <ellipse cx={x} cy={y} rx="6.4" ry="7.4" fill={bg} opacity="0.95" />
            <ellipse cx={x} cy={y} rx="3.8" ry="4.8" fill={detail} opacity="0.85" />
          </g>
        ))}
        {caption('2-4 um, inside a macrophage', detail, 176)}
      </g>
    );
  }

  if (tube.id === 'B') {
    const yeasts: Array<[number, number, number]> = [[66, 70, 7], [122, 62, 14], [92, 112, 10], [146, 116, 6], [58, 134, 12]];

    return (
      <g>
        {scaleBar('10 um', 30, detail)}
        {yeasts.map(([x, y, r], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r={r + 9} fill="#ffffff" fillOpacity="0.62" stroke={body} strokeWidth="0.9" strokeDasharray="2 2" />
            <circle cx={x} cy={y} r={r} fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="1.6" />
          </g>
        ))}
        {/* narrow-based bud */}
        <circle cx="140" cy="46" r="5" fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="1.4" />
        <line x1="133" y1="53" x2="136" y2="50" stroke={detail} strokeWidth="1.6" />
        {caption('4-10 um, capsule, mixed sizes', detail, 176)}
      </g>
    );
  }

  if (tube.id === 'C') {
    return (
      <g>
        {scaleBar('10 um', 30, detail)}
        {[[78, 96, 20, 101, 79, 14], [130, 124, 19, 107, 136, 13]].map(([x, y, r, bx, by, br], index) => (
          <g key={index}>
            <circle cx={bx} cy={by} r={br} fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="3.4" />
            <circle cx={x} cy={y} r={r} fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="3.4" />
            <circle cx={x} cy={y} r={r - 5} fill="none" stroke={detail} strokeWidth="0.9" opacity="0.6" />
            <circle cx={bx} cy={by} r={br - 4.5} fill="none" stroke={detail} strokeWidth="0.9" opacity="0.6" />
          </g>
        ))}
        {caption('8-15 um, thick wall, broad base', detail, 176)}
      </g>
    );
  }

  return (
    <g>
      {scaleBar('10 um', 30, detail)}
      <circle cx="102" cy="98" r="66" fill={body} fillOpacity="0.2" stroke={detail} strokeWidth="4" />
      <circle cx="102" cy="98" r="60" fill="none" stroke={detail} strokeWidth="0.9" opacity="0.6" />
      {scatter(54, 41, 102, 98, 53).map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r="5" fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="1" />
      ))}
      {caption('spherule with endospores', detail, 180)}
    </g>
  );
}

function trichophytonShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;

  if (tube.id === 'A') {
    const along = (y: number, tilt: number) => [34, 56, 78, 100, 122, 144, 166].map((x, index) => {
      const hyphaY = y + (x - 100) * tilt;
      const side = index % 2 === 0 ? -1 : 1;
      return (
        <ellipse
          key={`${y}-${x}`}
          cx={x}
          cy={hyphaY + side * 11}
          rx="4"
          ry="7.4"
          transform={`rotate(${side * 14} ${x} ${hyphaY + side * 11})`}
          fill={body}
          fillOpacity="0.8"
          stroke={detail}
          strokeWidth="1.2"
        />
      );
    });

    return (
      <g>
        <line x1="20" y1="62" x2="180" y2="78" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
        <line x1="20" y1="128" x2="180" y2="112" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
        {along(70, 0.1)}
        {along(120, -0.1)}
        {/* rare pencil-shaped macroconidium */}
        <g transform="rotate(-8 100 156)">
          <rect x="66" y="151" width="68" height="10" rx="5" fill={body} fillOpacity="0.4" stroke={detail} strokeWidth="1.3" />
          {[80, 94, 108, 122].map((x) => <line key={x} x1={x} y1="151" x2={x} y2="161" stroke={detail} strokeWidth="0.9" />)}
        </g>
        {caption('teardrops singly along the hyphae', detail, 28)}
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        <path d="M 20 132 C 60 120, 110 138, 180 120" fill="none" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
        {[[58, 104, 3], [118, 108, 9], [156, 96, 15]].map(([x, y, seed], index) => (
          <g key={index}>
            {scatter(10, seed, x, y, 13).map(([px, py], inner) => (
              <circle key={inner} cx={px} cy={py} r="4.6" fill={body} fillOpacity="0.8" stroke={detail} strokeWidth="1.1" />
            ))}
          </g>
        ))}
        {/* spiral hypha */}
        <path d="M 40 66 C 40 46, 70 46, 70 62 C 70 76, 48 76, 48 64 C 48 54, 62 54, 62 62 C 62 68, 54 68, 54 63" fill="none" stroke={detail} strokeWidth="2.4" strokeLinecap="round" />
        {/* cigar-shaped macroconidium */}
        <g transform="rotate(12 132 58)">
          <ellipse cx="132" cy="58" rx="30" ry="8" fill={body} fillOpacity="0.4" stroke={detail} strokeWidth="1.3" />
          {[116, 127, 138, 149].map((x) => <line key={x} x1={x} y1="51" x2={x} y2="65" stroke={detail} strokeWidth="0.9" />)}
        </g>
        {caption('grape-like clusters, spiral hyphae', detail, 28)}
      </g>
    );
  }

  const mixed: Array<[number, number, number, number]> = [[40, 58, 4, 7], [62, 100, 9, 11], [84, 56, 5, 9], [106, 104, 4, 6], [128, 54, 11, 13], [150, 100, 5, 10], [168, 62, 4, 7], [48, 142, 5, 8], [92, 146, 10, 12], [140, 142, 4, 8]];

  return (
    <g>
      <line x1="20" y1="80" x2="180" y2="80" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
      <line x1="20" y1="124" x2="180" y2="124" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
      {mixed.map(([x, y, rx, ry], index) => {
        const hyphaY = y < 110 ? 80 : 124;
        return (
          <g key={index}>
            <line x1={x} y1={hyphaY} x2={x} y2={y} stroke={detail} strokeWidth="1.2" />
            <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={body} fillOpacity="0.8" stroke={detail} strokeWidth="1.2" />
          </g>
        );
      })}
      {caption('mixed sizes, balloon forms', detail, 28)}
    </g>
  );
}

function hairInvasionShapes(tube: TubeVisual) {
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const rows = [28, 44, 60, 76, 92, 108, 124, 140, 156];

  const shaft = (intact: boolean) => (
    <g>
      <rect x="72" y="18" width="56" height="150" fill={body} fillOpacity="0.36" />
      <line x1="72" y1="18" x2="72" y2="168" stroke={detail} strokeWidth={intact ? 3 : 1.6} strokeDasharray={intact ? undefined : '5 4'} />
      <line x1="128" y1="18" x2="128" y2="168" stroke={detail} strokeWidth={intact ? 3 : 1.6} strokeDasharray={intact ? undefined : '5 4'} />
    </g>
  );

  if (tube.id === 'A') {
    return (
      <g>
        {shaft(false)}
        {rows.map((y, index) => (
          <g key={y}>
            {dots([[58 + (index % 2) * 3, y], [66 - (index % 2) * 2, y + 8], [134 + (index % 2) * 2, y], [142 - (index % 2) * 3, y + 8], [50 + (index % 3) * 2, y + 4], [150 - (index % 3) * 2, y + 4]], 4.2, detail, 0.82)}
          </g>
        ))}
        <text x="100" y="96" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">hair shaft</text>
      </g>
    );
  }

  if (tube.id === 'B') {
    return (
      <g>
        {shaft(true)}
        {rows.map((y) => (
          <g key={y}>{dots([[82, y], [94, y + 3], [106, y], [118, y + 3], [88, y + 9], [100, y + 11], [112, y + 9]], 4.4, detail, 0.82)}</g>
        ))}
      </g>
    );
  }

  return (
    <g>
      {shaft(true)}
      <path d="M 84 22 C 78 50, 92 70, 84 100 C 78 126, 90 144, 86 166 M 104 22 C 112 46, 98 74, 106 98 C 114 124, 100 146, 108 166 M 120 24 C 114 56, 122 86, 116 116 C 112 138, 120 152, 118 166" fill="none" stroke={detail} strokeWidth="2.4" strokeLinecap="round" />
      {[[96, 48, 7, 11], [112, 82, 6, 10], [92, 122, 8, 12], [106, 146, 5, 8]].map(([x, y, rx, ry], index) => (
        <ellipse key={index} cx={x} cy={y} rx={rx} ry={ry} fill="#ffffff" fillOpacity="0.85" stroke={detail} strokeWidth="1" />
      ))}
      <text x="156" y="86" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">air spaces</text>
    </g>
  );
}

const expansionRenderers: Partial<Record<VisualType, (tube: TubeVisual) => React.ReactNode>> = {
  'microscope-balantidium': balantidiumShapes,
  'microscope-free-living-amoebae': freeLivingAmoebaeShapes,
  'microscope-commensal-amoebae': commensalAmoebaeShapes,
  'microscope-chilomastix': chilomastixShapes,
  'microscope-plasmodium-vivax': plasmodiumVivaxShapes,
  'microscope-plasmodium-malariae': plasmodiumMalariaeShapes,
  'microscope-plasmodium-ovale': plasmodiumOvaleShapes,
  'microscope-microsporidia': microsporidiaShapes,
  'microscope-sarcoptes': sarcoptesShapes,
  'microscope-lice': liceShapes,
  'mycology-pneumocystis': pneumocystisShapes,
  'mycology-candida-cornmeal': candidaCornmealShapes,
  'mycology-malassezia': malasseziaShapes,
  'mycology-mucorales-comparison': mucoralesComparisonShapes,
  'mycology-arthroconidia-comparison': arthroconidiaShapes,
  'mycology-tissue-yeast-comparison': tissueYeastShapes,
  'mycology-trichophyton-comparison': trichophytonShapes,
  'mycology-hair-invasion': hairInvasionShapes
};

export function renderExpansionVisual(tube: TubeVisual, visualType: VisualType) {
  const shapes = expansionRenderers[visualType];
  return shapes ? renderCard(tube, visualType, shapes(tube)) : null;
}
