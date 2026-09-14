import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faChevronLeft, faChevronRight, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { getSearchAliases } from '../../data/searchAliases';
import { trackEvent } from '../../utils/analytics';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { buildAuthRedirectPath } from '../../utils/authRedirect';
import { subjectStainClass } from '../../data/subjectStains';
import './VisualAtlas.css';
import { atlasPages, type AtlasPage, type TubeVisual } from '../../data/atlasPages';

export { atlasPages };
export type { AtlasPage, TubeVisual };

type VisualNextStep = {
  to: string;
  label: string;
  description: string;
};

type VisualNavigationState = {
  focusVisual?: boolean;
};

const GRAM_POSITIVE_ROADMAP_PATH = '/gram-positive-roadmap';
const GRAM_NEGATIVE_ROADMAP_PATH = '/gram-negative-roadmap';
const ANAEROBE_ROADMAP_PATH = '/obligate-anaerobe-roadmap';
const UNKNOWN_ISOLATE_WORKUP_PATH = '/unknown-isolate-workup';
const STUDY_QUIZ_PATH = '/study-quiz';


const getAlphabetizedAtlasPages = () => (
  [...atlasPages].sort((a, b) => a.title.localeCompare(b.title))
);

const tableHeaders = ['Visual clue', 'Meaning', 'Student shorthand'];
const interpretationHeaders = ['Pattern', 'What to call it', 'How to think about it'];

function renderCatalaseTest(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`slide-shadow-cat-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Black Bench Surface Background */}
        <rect x="15" y="15" width="170" height="170" fill="#0f172a" rx="8" stroke="#1e293b" strokeWidth="1" />

        {/* Glass Microscope Slide */}
        <rect x="25" y="45" width="150" height="110" fill="#ffffff" fillOpacity="0.1" stroke="#475569" strokeWidth="1.5" filter={`url(#slide-shadow-cat-${tube.id})`} rx="2" />
        {/* Glass frosted end */}
        <rect x="25" y="45" width="30" height="110" fill="#cbd5e1" fillOpacity="0.15" stroke="#475569" strokeWidth="1" />
        <text x="40" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 40 100)" letterSpacing="1">CATALASE</text>

        {/* Reagent Drop of H2O2 */}
        <circle cx="115" cy="100" r="32" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3" />
        <circle cx="115" cy="100" r="30" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.15" />

        {/* Reaction details (bubbling vs smear) */}
        {isPositive ? (
          <>
            {/* Copious frothy white bubbles */}
            <circle cx="115" cy="100" r="22" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="103" cy="94" r="14" fill="#f8fafc" fillOpacity="0.85" />
            <circle cx="127" cy="94" r="13" fill="#f8fafc" fillOpacity="0.85" />
            <circle cx="108" cy="112" r="14" fill="#f8fafc" fillOpacity="0.85" />
            <circle cx="122" cy="110" r="13" fill="#f8fafc" fillOpacity="0.85" />
            
            {/* Individual bubbles overlay */}
            <circle cx="110" cy="90" r="4.5" fill="none" stroke="#475569" strokeWidth="0.75" />
            <circle cx="118" cy="94" r="3" fill="none" stroke="#475569" strokeWidth="0.5" />
            <circle cx="122" cy="86" r="4" fill="none" stroke="#475569" strokeWidth="0.75" />
            <circle cx="100" cy="104" r="3.5" fill="none" stroke="#475569" strokeWidth="0.5" />
            <circle cx="128" cy="102" r="5" fill="none" stroke="#475569" strokeWidth="0.75" />
            <circle cx="112" cy="108" r="3.5" fill="none" stroke="#475569" strokeWidth="0.5" />
            <circle cx="120" cy="116" r="4" fill="none" stroke="#475569" strokeWidth="0.75" />
            <circle cx="98" cy="92" r="2.5" fill="none" stroke="#475569" strokeWidth="0.5" />
            <circle cx="132" cy="90" r="3" fill="none" stroke="#475569" strokeWidth="0.5" />
            <circle cx="104" cy="118" r="2.5" fill="none" stroke="#475569" strokeWidth="0.5" />

            <text x="115" y="103" textAnchor="middle" fill="#1e293b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">BUBBLES</text>
            <text x="115" y="150" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Copious Bubbling</text>
          </>
        ) : (
          <>
            {/* Negative */}
            <path d="M 102,96 Q 115,92 128,102 T 115,108" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
            <text x="115" y="103" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold" fontFamily="sans-serif">NO BUBBLES</text>
            <text x="115" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">No Bubbling</text>
          </>
        )}

        {/* Liquid reflection highlights */}
        <path d="M 90,85 A 25,25 0 0,1 140,85" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.25" strokeLinecap="round" />
        <path d="M 88,115 A 25,25 0 0,0 142,115" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.1" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderBileSolubility(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <linearGradient id={`dish-rim-bs-${tube.id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#e5e7eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Petri Dish Outer Base */}
        <circle cx="100" cy="100" r="95" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />

        {/* Alpha-hemolytic blood agar (dark brownish-red/greenish tint) */}
        <circle cx="100" cy="100" r="90" fill="#521d1d" />

        {/* Alpha-hemolytic halos surrounding colonies (olive-green/brownish zones) */}
        <circle cx="65" cy="80" r="18" fill="#4d5431" opacity="0.6" />
        <circle cx="135" cy="80" r="18" fill="#4d5431" opacity="0.6" />
        <circle cx="100" cy="130" r="18" fill="#4d5431" opacity="0.6" />

        {/* Background/surrounding colonies */}
        <circle cx="50" cy="50" r="3" fill="#8ca08c" opacity="0.8" />
        <circle cx="150" cy="50" r="4" fill="#8ca08c" opacity="0.8" />
        <circle cx="45" cy="140" r="3.5" fill="#8ca08c" opacity="0.8" />
        <circle cx="160" cy="130" r="3" fill="#8ca08c" opacity="0.8" />

        {/* Reagent Drop area (10% Sodium Desoxycholate) in the center of the colonies */}
        <circle cx="100" cy="100" r="45" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="100" cy="100" r="43" fill="none" stroke="#e0f2fe" strokeWidth="1" strokeOpacity="0.2" />

        {/* Colonies under the drop */}
        {isPositive ? (
          <>
            {/* Positive: Streptococcus pneumoniae. The colonies disintegrate (lyse). */}
            <circle cx="100" cy="100" r="6" fill="#485c48" fillOpacity="0.15" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1,2" strokeOpacity="0.3" />
            <path d="M 97,98 C 100,96 103,104 100,102" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" fill="none" />
            
            <circle cx="85" cy="115" r="5" fill="#485c48" fillOpacity="0.15" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1,2" strokeOpacity="0.3" />
            <circle cx="115" cy="115" r="5" fill="#485c48" fillOpacity="0.15" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1,2" strokeOpacity="0.3" />
            
            {/* Annotation text inside the drop */}
            <text x="100" y="80" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">COLONIES LYSED</text>
            <text x="100" y="140" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Bile Soluble</text>
          </>
        ) : (
          <>
            {/* Negative: Viridans Strep / Enterococcus. Colonies remain completely intact. */}
            {/* Colony 1 */}
            <circle cx="100" cy="100" r="6" fill="#819181" stroke="#3f4f3f" strokeWidth="1" />
            <circle cx="98" cy="98" r="2" fill="#ffffff" fillOpacity="0.4" />
            
            {/* Colony 2 */}
            <circle cx="85" cy="115" r="5" fill="#819181" stroke="#3f4f3f" strokeWidth="1" />
            <circle cx="83" cy="113" r="1.5" fill="#ffffff" fillOpacity="0.4" />

            {/* Colony 3 */}
            <circle cx="115" cy="115" r="5.5" fill="#819181" stroke="#3f4f3f" strokeWidth="1" />
            <circle cx="113" cy="113" r="1.8" fill="#ffffff" fillOpacity="0.4" />

            {/* Annotation text */}
            <text x="100" y="80" textAnchor="middle" fill="#d1d5db" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">COLONIES INTACT</text>
            <text x="100" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Insoluble</text>
          </>
        )}

        {/* Liquid reflection highlights */}
        <path d="M 70,75 A 35,35 0 0,1 130,75" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.3" strokeLinecap="round" />
        <path d="M 68,125 A 35,35 0 0,0 132,125" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.15" strokeLinecap="round" />

        {/* Glass Reflection Highlight */}
        <circle cx="100" cy="100" r="93" fill="none" stroke={`url(#dish-rim-bs-${tube.id})`} strokeWidth="3" opacity="0.9" />
        <path d="M 25,45 A 75,75 0 0,1 175,45" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderButyrateDisk(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`slide-shadow-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <filter id={`subtle-blur-butyrate-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* Slide background / surface */}
        <rect x="15" y="15" width="170" height="170" fill="#f8fafc" rx="8" stroke="#e2e8f0" strokeWidth="1" />

        {/* Glass Microscope Slide */}
        <rect x="25" y="45" width="150" height="110" fill="#ffffff" fillOpacity="0.15" stroke="#cbd5e1" strokeWidth="1.5" filter={`url(#slide-shadow-${tube.id})`} rx="2" />
        {/* Glass frosted end */}
        <rect x="25" y="45" width="30" height="110" fill="#e2e8f0" fillOpacity="0.6" stroke="#cbd5e1" strokeWidth="1" />
        <text x="40" y="105" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 40 100)">BUTYRATE</text>

        {/* Paper Disk on Slide */}
        <circle cx="115" cy="100" r="32" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        <circle cx="115" cy="100" r="31" fill="none" stroke="#e2e8f0" strokeWidth="2" />

        {/* Reaction color changes */}
        {isPositive ? (
          <>
            {/* Positive: Deep Indigo Blue color shift diffusing from center */}
            <circle cx="115" cy="100" r="28" fill="#1e3a8a" fillOpacity="0.85" filter={`url(#subtle-blur-butyrate-${tube.id})`} />
            <circle cx="115" cy="100" r="18" fill="#1e40af" filter={`url(#subtle-blur-butyrate-${tube.id})`} />
            {/* Smudged colony texture rubbed on the disk */}
            <path d="M 105,95 Q 115,90 125,100 T 115,110" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
            <text x="115" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Positive</text>
            <text x="115" y="150" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Blue-Violet Color</text>
          </>
        ) : (
          <>
            {/* Negative: Remains white/faint grey-pink colony smear */}
            <path d="M 105,95 Q 115,90 125,100 T 115,110" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" opacity="0.75" />
            <text x="115" y="104" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Negative</text>
            <text x="115" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">No Color Change</text>
          </>
        )}
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderCAMPTest(tube: TubeVisual) {
  return (
    <div className="lia-tube-card lia-camp-card" key={tube.id} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <svg className="lia-plate-svg" viewBox="0 0 220 220" aria-hidden="true" style={{ display: 'block', margin: '0 auto', maxWidth: '280px' }}>
        <defs>
          {/* Glass reflection highlight */}
          <linearGradient id="dish-rim-camp" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#e5e7eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
          </linearGradient>
          {/* Enhanced Hemolysis Radial Gradients (arrows) */}
          <radialGradient id="arrowhead-hemolysis" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#facc15" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#9e1b24" stopOpacity="0" />
          </radialGradient>
          {/* S. aureus hemolysis zone (hazy beta-lysin) */}
          <linearGradient id="sa-hemolysis" x1="0" x2="1">
            <stop offset="0%" stopColor="#9e1b24" stopOpacity="0" />
            <stop offset="45%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#f87171" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#9e1b24" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Petri Dish Base */}
        <circle cx="110" cy="110" r="102" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />

        {/* Sheep Blood Agar */}
        <circle cx="110" cy="110" r="96" fill="#9e1b24" />

        {/* Staphylococcus aureus Beta-lysin Zone (hazy central vertical band) */}
        <rect x="94" y="20" width="32" height="180" fill="url(#sa-hemolysis)" />

        {/* Staphylococcus aureus Streak - golden-yellow growth with wet glossy 3D texture */}
        <line x1="110" y1="20" x2="110" y2="200" stroke="#b45309" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
        <line x1="110" y1="20" x2="110" y2="200" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />
        <line x1="110" y1="20" x2="110" y2="200" stroke="#fffbeb" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />

        {/* Streak A (Left: Streptococcus agalactiae - CAMP Positive) */}
        <line x1="25" y1="85" x2="92" y2="85" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        
        {/* Normal narrow beta-hemolysis surrounding the streak */}
        <rect x="25" y="81" width="67" height="8" fill="#fef08a" fillOpacity="0.3" rx="2" />
        
        {/* Synergistic Hemolysis Arrowhead pointing towards S. aureus */}
        <polygon points="70,85 94,65 94,105" fill="url(#arrowhead-hemolysis)" />
        <polygon points="70,85 94,73 94,97" fill="#fef08a" fillOpacity="0.6" />
        
        {/* Arrow pointer label for students with high-contrast badge */}
        <g stroke="#ffffff" strokeWidth="1.5" fill="none">
          <path d="M 50,55 L 75,72" />
          <polygon points="75,72 70,66 76,66" fill="#ffffff" stroke="none" />
        </g>
        <rect x="20" y="36" width="60" height="15" fill="#1e293b" rx="3" stroke="#94a3b8" strokeWidth="0.5" />
        <text x="50" y="47" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">ARROWHEAD</text>

        {/* Streak B (Right: Streptococcus pyogenes - CAMP Negative) */}
        <line x1="128" y1="135" x2="195" y2="135" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        {/* Normal narrow beta-hemolysis of uniform width, no enhancement */}
        <rect x="128" y="131" width="67" height="8" fill="#fef08a" fillOpacity="0.35" rx="2" />
        
        {/* Annotations */}
        <text x="45" y="103" fill="#cbd5df" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Streak A (GBS)</text>
        <text x="45" y="113" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">CAMP Positive (+)</text>

        <text x="175" y="153" textAnchor="end" fill="#cbd5df" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Streak B (GAS)</text>
        <text x="175" y="163" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">CAMP Negative (-)</text>

        {/* High contrast label for S. aureus streak at bottom */}
        <rect x="62" y="202" width="96" height="14" fill="#1e293b" rx="3" stroke="#cbd5e1" strokeWidth="0.5" />
        <text x="110" y="212" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold" fontFamily="sans-serif">S. AUREUS STREAK</text>

        {/* Glass reflection highlight */}
        <circle cx="110" cy="110" r="100" fill="none" stroke="url(#dish-rim-camp)" strokeWidth="3" opacity="0.9" />
        <path d="M 35,45 A 75,75 0 0,1 185,45" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.2" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderPlate(tube: TubeVisual) {
  const isSusceptible = tube.id === 'A';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`subtle-blur-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <linearGradient id={`dish-rim-${tube.id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#e5e7eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Petri Dish Outer Base */}
        <circle cx="100" cy="100" r="95" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
        
        {/* Blood Agar Layer */}
        <circle cx="100" cy="100" r="90" fill={tube.colors.slant} />
        
        {/* Beta-hemolytic Bacterial Lawn */}
        <circle cx="100" cy="100" r="86" fill={tube.colors.butt} opacity="0.65" />
        
        {/* Streaked Growth Texture Lines */}
        <path d="M 45,70 C 60,40 140,40 155,70 C 170,100 170,140 155,170 C 140,195 60,195 45,170 C 30,140 30,100 45,70 Z" fill="none" stroke="#f5e6b3" strokeWidth="2.5" strokeDasharray="6,18" opacity="0.35" />
        <path d="M 60,90 C 70,60 130,60 140,90 C 150,110 150,130 140,150 C 130,170 70,170 60,150 C 50,130 50,110 60,90 Z" fill="none" stroke="#f5e6b3" strokeWidth="2" strokeDasharray="4,12" opacity="0.45" />
        <path d="M 80,100 C 90,80 110,80 120,100 C 125,110 125,120 120,130 C 115,135 105,135 100,130" fill="none" stroke="#f5e6b3" strokeWidth="1.5" strokeDasharray="3,8" opacity="0.5" />

        {/* Zone of Inhibition (only for susceptible Plate A) */}
        {isSusceptible && (
          <circle cx="100" cy="100" r="40" fill={tube.colors.slant} filter={`url(#subtle-blur-${tube.id})`} />
        )}

        {/* Paper Disk A */}
        <circle cx="100" cy="100" r="12" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
        <text x="100" y="104" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold" fontFamily="sans-serif">A</text>

        {/* Dimension Line and Text */}
        {isSusceptible ? (
          <>
            {/* 14 mm Zone Dimension */}
            <g stroke="#111827" strokeWidth="1" opacity="0.75">
              <line x1="60" y1="145" x2="140" y2="145" />
              <line x1="60" y1="140" x2="60" y2="150" />
              <line x1="140" y1="140" x2="140" y2="150" />
            </g>
            <rect x="75" y="152" width="50" height="15" fill={tube.colors.slant} rx="3" opacity="0.8" />
            <text x="100" y="163" textAnchor="middle" fill="#f8fffd" fontSize="10" fontWeight="bold" fontFamily="sans-serif">14 mm</text>
          </>
        ) : (
          <>
            {/* 6 mm Disk Dimension */}
            <g stroke="#111827" strokeWidth="1" opacity="0.75">
              <line x1="88" y1="145" x2="112" y2="145" />
              <line x1="88" y1="140" x2="88" y2="150" />
              <line x1="112" y1="140" x2="112" y2="150" />
            </g>
            <rect x="82" y="152" width="36" height="15" fill="#f5e6b3" rx="3" opacity="0.85" />
            <text x="100" y="163" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="sans-serif">6 mm</text>
          </>
        )}

        {/* Glass Reflection Highlight */}
        <circle cx="100" cy="100" r="93" fill="none" stroke={`url(#dish-rim-${tube.id})`} strokeWidth="3" opacity="0.9" />
        <path d="M 25,45 A 75,75 0 0,1 175,45" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderCoagulase(tube: TubeVisual) {
  const isSlide = tube.id === 'A' || tube.id === 'B';
  const isPositive = tube.id === 'A' || tube.id === 'C';

  if (isSlide) {
    return (
      <div className="lia-tube-card lia-plate-card" key={tube.id}>
        <div className="lia-letter">{tube.id}</div>
        <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
          <defs>
            <filter id={`slide-shadow-coag-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Slide Background Surface */}
          <rect x="15" y="15" width="170" height="170" fill="#0f172a" rx="8" stroke="#1e293b" strokeWidth="1" />

          {/* Diagnostic Well Card with bright blue plastic rim */}
          <circle cx="100" cy="100" r="65" fill="#1e293b" stroke="#0ea5e9" strokeWidth="6" filter={`url(#slide-shadow-coag-${tube.id})`} />
          <circle cx="100" cy="100" r="59" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />

          {/* Liquid drop of plasma */}
          <circle cx="100" cy="100" r="48" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />

          {isPositive ? (
            <>
              {/* Slide Positive: Clumped particles */}
              <circle cx="100" cy="100" r="42" fill="#e2e8f0" fillOpacity="0.12" />

              {/* Clumps of various shapes and sizes */}
              <circle cx="85" cy="85" r="4.5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="115" cy="85" r="5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
              <circle cx="100" cy="115" r="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
              <circle cx="75" cy="110" r="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="120" cy="110" r="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.5" />
              
              <path d="M 94,90 Q 98,87 101,92 T 96,96 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.5" />
              <path d="M 108,102 Q 112,98 116,104 T 110,108 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
              <path d="M 88,100 Q 82,97 86,103 T 91,101 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.5" />
              
              <circle cx="78" cy="92" r="1.5" fill="#cbd5e1" />
              <circle cx="122" cy="96" r="2" fill="#f8fafc" />
              <circle cx="95" cy="122" r="1.2" fill="#cbd5e1" />
              <circle cx="106" cy="120" r="1.8" fill="#f1f5f9" />
              
              <text x="100" y="103" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">CLUMPING</text>
              <text x="100" y="150" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Slide Positive</text>
            </>
          ) : (
            <>
              {/* Slide Negative: Smooth homogenous suspension */}
              <circle cx="100" cy="100" r="45" fill="#cbd5e1" fillOpacity="0.25" />
              <circle cx="100" cy="100" r="35" fill="#cbd5e1" fillOpacity="0.15" />
              
              <path d="M 75,70 A 30,30 0 0,1 125,70" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
              <path d="M 72,130 A 30,30 0 0,0 128,130" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.1" strokeLinecap="round" />

              <text x="100" y="103" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">SMOOTH</text>
              <text x="100" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Slide Negative</text>
            </>
          )}
        </svg>
        <strong>{tube.label}</strong>
        <span>{tube.name}</span>
        <p>{tube.note}</p>
      </div>
    );
  } else {
    // Tube tests (C and D)
    return (
      <div className="lia-tube-card lia-plate-card" key={tube.id}>
        <div className="lia-letter">{tube.id}</div>
        <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
          <defs>
            <filter id={`slide-shadow-coag-tube-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>
            <linearGradient id={`glass-coag-${tube.id}`} x1="0" x2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          {/* Dark Bench Background */}
          <rect x="15" y="15" width="170" height="170" fill="#0f172a" rx="8" stroke="#1e293b" strokeWidth="1" />

          {/* Tilted Tube Group rotated 60 degrees clockwise */}
          <g transform="rotate(60 100 100)" filter={`url(#slide-shadow-coag-tube-${tube.id})`}>
            {/* Tube Glass Back layer */}
            <path d="M 80,30 L 80,155 A 20,20 0 0,0 120,155 L 120,30" fill="#ffffff" fillOpacity="0.05" />

            {/* Liquid / Clot layer */}
            {isPositive ? (
              // Tube Positive: Solid clot staying at the bottom
              <path d="M 81,115 L 119,115 L 119,155 A 19,19 0 0,1 81,155 Z" fill="#cbd5e1" fillOpacity="0.95" stroke="#cbd5e1" strokeWidth="1" />
            ) : (
              // Tube Negative: Flowing liquid along the lower-right wall
              <path d="M 88,162 L 119,95 L 119,155 A 19,19 0 0,1 88,162 Z" fill="#cbd5e1" fillOpacity="0.5" stroke="#cbd5e1" strokeWidth="0.5" />
            )}

            {/* Glass Tube outline & highlights */}
            <path d="M 80,30 L 80,155 A 20,20 0 0,0 120,155 L 120,30" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <path d="M 85,35 L 85,150" stroke="#ffffff" strokeWidth="2.5" opacity="0.3" />
            <path d="M 115,35 L 115,150" stroke="#1f2937" strokeWidth="1.5" opacity="0.1" />

            {/* Tube Label tape */}
            <rect x="83" y="45" width="34" height="40" fill="#f8f5ee" rx="2" stroke="#e2e8f0" strokeWidth="0.5" />
            <line x1="88" y1="55" x2="112" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="88" y1="65" x2="108" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="88" y1="75" x2="102" y2="75" stroke="#94a3b8" strokeWidth="1.5" />
          </g>

          {/* Annotation overlay */}
          {isPositive ? (
            <>
              <text x="100" y="155" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Firm Clot (Positive)</text>
            </>
          ) : (
            <>
              <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Liquid (Negative)</text>
            </>
          )}
        </svg>
        <strong>{tube.label}</strong>
        <span>{tube.name}</span>
        <p>{tube.note}</p>
      </div>
    );
  }
}

function renderDecarboxylase(tube: TubeVisual) {
  let brothColor = '#6d28d9';
  let brothGlow = '#8b5cf6';
  let labelText = 'Positive';
  
  if (tube.id === 'B' || tube.id === 'C') {
    brothColor = '#ca8a04';
    brothGlow = '#facc15';
    labelText = tube.id === 'B' ? 'Negative' : 'Control';
  } else if (tube.id === 'D') {
    brothColor = '#ea580c';
    brothGlow = '#f97316';
    labelText = 'Base';
  }

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-decarbo-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-decarbo-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothColor} />
            <stop offset="60%" stopColor={brothGlow} />
            <stop offset="100%" stopColor={brothColor} />
          </linearGradient>
          <linearGradient id={`oil-decarbo-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        <rect x="35" y="38" width="50" height="70" rx="3" fill="#f8f5ee" stroke="#cbd5e1" strokeWidth="0.5" />
        <line x1="42" y1="52" x2="78" y2="52" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="42" y1="64" x2="74" y2="64" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="90" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="bold" fontFamily="sans-serif">{labelText}</text>

        <path d="M36 160 L84 160 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-decarbo-${tube.id})`} />

        <path d="M36 160 Q 60 164 84 160" fill="none" stroke={brothGlow} strokeWidth="1.5" opacity="0.8" />

        <path d="M36 135 L84 135 L84 160 Q 60 164 36 160 Z" fill={`url(#oil-decarbo-${tube.id})`} />
        
        <path d="M36 135 Q 60 138 84 135" fill="none" stroke="#facc15" strokeWidth="1.2" opacity="0.6" />
        
        <text x="60" y="151" textAnchor="middle" fill="#854d0e" fontSize="7" fontWeight="bold" fontFamily="sans-serif" opacity="0.75" letterSpacing="0.5">OIL</text>

        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-decarbo-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderDNase(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`slide-shadow-dnase-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <linearGradient id={`dish-rim-dnase-${tube.id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#e5e7eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
          </linearGradient>
          <filter id={`halo-blur-${tube.id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Petri Dish Base */}
        <circle cx="100" cy="100" r="95" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />

        {/* Methyl Green Agar Layer (teal-green) */}
        <circle cx="100" cy="100" r="90" fill="#1e9488" />

        {/* Hydrolysis Zone (Plate A only) */}
        {isPositive ? (
          <>
            <path d="M 60,100 C 60,60 140,60 140,100 C 140,140 60,140 60,100 Z" fill="#b2dfdb" opacity="0.6" filter={`url(#halo-blur-${tube.id})`} />
            <path d="M 75,100 C 75,75 125,75 125,100 C 125,125 75,125 75,100 Z" fill="#e0f2f1" opacity="0.8" filter={`url(#halo-blur-${tube.id})`} />
            
            {/* 3D Cream-colored bacterial growth streak */}
            <path d="M 75,100 Q 100,85 125,100" fill="none" stroke="#f5e6c4" strokeWidth="6.5" strokeLinecap="round" opacity="0.9" />
            <path d="M 75,100 Q 100,85 125,100" fill="none" stroke="#fdfbf7" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
            
            <text x="100" y="65" textAnchor="middle" fill="#e0f2f1" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">ZONE OF HYDROLYSIS</text>
            <text x="100" y="148" textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Cleared Zone (Positive)</text>
          </>
        ) : (
          <>
            {/* Negative Plate: Original green-teal agar up to streak edge */}
            {/* Cream-colored bacterial growth streak */}
            <path d="M 75,100 Q 100,85 125,100" fill="none" stroke="#f5e6c4" strokeWidth="6.5" strokeLinecap="round" opacity="0.9" />
            <path d="M 75,100 Q 100,85 125,100" fill="none" stroke="#fdfbf7" strokeWidth="4" strokeLinecap="round" opacity="0.95" />

            <text x="100" y="65" textAnchor="middle" fill="#0d534b" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5" opacity="0.85">NO COLORLESS ZONE</text>
            <text x="100" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Teal-Green (Negative)</text>
          </>
        )}

        {/* 3D Glass Reflection Highlights */}
        <circle cx="100" cy="100" r="93" fill="none" stroke={`url(#dish-rim-dnase-${tube.id})`} strokeWidth="3" opacity="0.9" />
        <path d="M 25,45 A 75,75 0 0,1 175,45" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderFermentation(tube: TubeVisual) {
  const hasGas = tube.id === 'A';
  const brothLabel = tube.id === 'A' || tube.id === 'B' ? 'Acid' : tube.id === 'C' ? 'No acid' : 'Control';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-ferment-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-ferment-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={tube.colors.slant} />
            <stop offset="58%" stopColor={tube.colors.butt} />
            <stop offset="100%" stopColor={tube.colors.base} />
          </linearGradient>
        </defs>
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />
        <rect x="35" y="38" width="50" height="74" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="94" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="bold" fontFamily="sans-serif">{brothLabel}</text>
        <path d="M36 144 L84 144 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-ferment-${tube.id})`} />
        <path d="M36 144 Q60 148 84 144" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.36" />
        <g transform="translate(0 8)">
          <rect x="48" y="174" width="24" height="100" rx="12" fill="#ffffff" opacity="0.18" stroke="#f8fafc" strokeWidth="2" />
          <path d="M50 220 L70 220 L70 260 Q70 272 60 272 Q50 272 50 260 Z" fill={`url(#broth-ferment-${tube.id})`} opacity="0.82" />
          {hasGas && (
            <>
              <path d="M50 176 L70 176 L70 211 Q60 204 50 211 Z" fill="#ffffff" opacity="0.78" />
              <text x="60" y="200" textAnchor="middle" fill="#245c69" fontSize="8" fontWeight="bold" fontFamily="sans-serif">GAS</text>
            </>
          )}
          {!hasGas && (
            <path d="M50 176 L70 176 L70 220 L50 220 Z" fill={`url(#broth-ferment-${tube.id})`} opacity="0.55" />
          )}
        </g>
        {tube.growth !== 'none' && (
          <g opacity="0.26">
            <circle cx="47" cy="247" r="1.4" fill="#ffffff" />
            <circle cx="72" cy="231" r="1.1" fill="#ffffff" />
            <circle cx="58" cy="266" r="1.2" fill="#ffffff" />
          </g>
        )}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-ferment-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderFlagellaStain(tube: TubeVisual) {
  const isPeritrichous = tube.id === 'A';
  const isPolar = tube.id === 'B';
  const isLophotrichous = tube.id === 'C';
  const cellFill = tube.colors.slant;
  const flagellaStroke = tube.colors.butt;

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`flagella-glow-${tube.id}`} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <radialGradient id={`field-flagella-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="100%" stopColor="#dcebf3" />
          </radialGradient>
        </defs>
        <rect x="12" y="12" width="176" height="176" rx="8" fill={`url(#field-flagella-${tube.id})`} stroke="#cbd5e1" strokeWidth="1.5" />
        <g opacity="0.38">
          <circle cx="36" cy="42" r="2.2" fill="#8b8aa8" />
          <circle cx="158" cy="48" r="1.6" fill="#8b8aa8" />
          <circle cx="48" cy="152" r="1.4" fill="#8b8aa8" />
          <path d="M136 142 C146 138, 150 149, 161 145" fill="none" stroke="#9ca3af" strokeWidth="1.2" />
          <path d="M42 105 C50 100, 58 103, 65 98" fill="none" stroke="#9ca3af" strokeWidth="1.1" />
        </g>
        <g transform="rotate(-18 100 100)">
          {isPeritrichous && (
            <>
              <path d="M85 98 C58 74, 48 50, 58 30" fill="none" stroke={flagellaStroke} strokeWidth="3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
              <path d="M89 110 C56 122, 42 144, 52 166" fill="none" stroke={flagellaStroke} strokeWidth="3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
              <path d="M112 93 C138 74, 154 55, 144 34" fill="none" stroke={flagellaStroke} strokeWidth="3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
              <path d="M117 111 C148 123, 160 146, 149 166" fill="none" stroke={flagellaStroke} strokeWidth="3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
            </>
          )}
          {isPolar && (
            <path d="M120 101 C146 91, 166 76, 171 52" fill="none" stroke={flagellaStroke} strokeWidth="3.3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
          )}
          {isLophotrichous && (
            <>
              <path d="M121 96 C145 82, 162 63, 160 40" fill="none" stroke={flagellaStroke} strokeWidth="3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
              <path d="M123 101 C150 97, 171 84, 181 62" fill="none" stroke={flagellaStroke} strokeWidth="3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
              <path d="M120 106 C143 116, 166 112, 179 94" fill="none" stroke={flagellaStroke} strokeWidth="3" strokeLinecap="round" filter={`url(#flagella-glow-${tube.id})`} />
            </>
          )}
          {!isPeritrichous && !isPolar && !isLophotrichous && (
            <>
              <path d="M58 56 C70 50, 82 59, 94 53" fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.75" />
              <path d="M120 134 C132 126, 142 133, 154 125" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
            </>
          )}
          <path d="M76 100 C80 83, 119 82, 125 99 C130 117, 91 122, 76 100 Z" fill={cellFill} opacity="0.88" stroke="#312e81" strokeWidth="1.5" />
          <path d="M86 94 C96 89, 111 91, 119 99" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.35" strokeLinecap="round" />
        </g>
        <text x="100" y="171" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="sans-serif">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderGelatinHydrolysis(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 220 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`gelatin-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.18" />
          </filter>
          <linearGradient id={`glass-gelatin-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="46%" stopColor="#ffffff" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`medium-gelatin-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={tube.colors.slant} />
            <stop offset="55%" stopColor={tube.colors.butt} />
            <stop offset="100%" stopColor={tube.colors.base} />
          </linearGradient>
        </defs>
        <rect x="16" y="16" width="188" height="168" rx="9" fill="#12313a" opacity="0.95" />
        <g transform="rotate(-28 110 100)" filter={`url(#gelatin-shadow-${tube.id})`}>
          <path d="M83 22 L83 156 A27 27 0 0 0 137 156 L137 22" fill="#ffffff" fillOpacity="0.05" stroke="#cbd5e1" strokeWidth="2.3" />
          {isPositive ? (
            <>
              <path d="M85 82 C99 74, 121 90, 135 79 L135 156 A25 25 0 0 1 85 156 Z" fill={`url(#medium-gelatin-${tube.id})`} opacity="0.92" />
              <path d="M85 82 C99 74, 121 90, 135 79" fill="none" stroke="#fff7d6" strokeWidth="2.2" opacity="0.88" />
              <path d="M96 112 C108 105, 121 113, 130 107" fill="none" stroke="#fff7d6" strokeWidth="1.4" opacity="0.42" />
            </>
          ) : (
            <>
              <path d="M85 78 L135 78 L135 156 A25 25 0 0 1 85 156 Z" fill={`url(#medium-gelatin-${tube.id})`} opacity="0.95" />
              <path d="M86 78 L134 78" stroke="#fff7d6" strokeWidth="2.4" opacity="0.7" />
              <path d="M91 108 L129 108" stroke="#fff7d6" strokeWidth="1.5" opacity="0.28" />
              <path d="M92 136 L128 136" stroke="#fff7d6" strokeWidth="1.3" opacity="0.24" />
            </>
          )}
          <rect x="88" y="34" width="44" height="36" rx="3" fill="#f8f5ee" stroke="#dbe3ea" strokeWidth="0.6" />
          <line x1="94" y1="46" x2="124" y2="46" stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="94" y1="56" x2="119" y2="56" stroke="#94a3b8" strokeWidth="1.4" />
          <path d="M83 22 L83 156 A27 27 0 0 0 137 156 L137 22" fill={`url(#glass-gelatin-${tube.id})`} />
          <path d="M91 29 L91 158" stroke="#ffffff" strokeWidth="2.5" opacity="0.33" />
        </g>
        <text x="110" y="174" textAnchor="middle" fill={isPositive ? '#facc15' : '#cbd5e1'} fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          {isPositive ? 'Liquid after chilling' : 'Firm gel after chilling'}
        </text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderHippurateHydrolysis(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`hippurate-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.16" />
          </filter>
          <linearGradient id={`glass-hippurate-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.56" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`reaction-hippurate-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={tube.colors.slant} />
            <stop offset="55%" stopColor={tube.colors.butt} />
            <stop offset="100%" stopColor={tube.colors.base} />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width="164" height="164" rx="8" fill="#1886b8" opacity="0.9" />
        <g transform="translate(0 0)" filter={`url(#hippurate-shadow-${tube.id})`}>
          <path d="M78 20 L78 154 A22 22 0 0 0 122 154 L122 20" fill="#ffffff" fillOpacity="0.08" stroke="#dbeafe" strokeWidth="2.3" />
          <path d="M80 108 L120 108 L120 154 A20 20 0 0 1 80 154 Z" fill={`url(#reaction-hippurate-${tube.id})`} opacity={isPositive ? 0.98 : 0.9} />
          <path d="M80 108 Q100 112 120 108" fill="none" stroke={isPositive ? '#c084fc' : '#ffffff'} strokeWidth="2.2" opacity="0.72" />
          {isPositive && (
            <>
              <circle cx="92" cy="133" r="2" fill="#c084fc" opacity="0.6" />
              <circle cx="110" cy="123" r="1.8" fill="#ddd6fe" opacity="0.6" />
            </>
          )}
          <rect x="84" y="36" width="32" height="42" rx="3" fill="#f8f5ee" stroke="#dbe3ea" strokeWidth="0.6" />
          <line x1="89" y1="49" x2="111" y2="49" stroke="#94a3b8" strokeWidth="1.3" />
          <line x1="89" y1="60" x2="106" y2="60" stroke="#94a3b8" strokeWidth="1.3" />
          <path d="M78 20 L78 154 A22 22 0 0 0 122 154 L122 20" fill={`url(#glass-hippurate-${tube.id})`} />
          <path d="M86 28 L86 155" stroke="#ffffff" strokeWidth="2.6" opacity="0.38" />
        </g>
        <text x="100" y="178" textAnchor="middle" fill={isPositive ? '#ede9fe' : '#f8fafc'} fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          {isPositive ? 'Deep purple endpoint' : 'No purple endpoint'}
        </text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderIndoleProduction(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`indole-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.16" />
          </filter>
          <linearGradient id={`glass-indole-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-indole-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={tube.colors.butt} />
            <stop offset="58%" stopColor="#fff7d6" />
            <stop offset="100%" stopColor={tube.colors.base} />
          </linearGradient>
          <linearGradient id={`ring-indole-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={tube.colors.slant} />
            <stop offset="54%" stopColor={isPositive ? '#ff5f77' : '#ffe08a'} />
            <stop offset="100%" stopColor={tube.colors.slant} />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width="164" height="164" rx="8" fill="#d6d0bf" opacity="0.72" />
        <g filter={`url(#indole-shadow-${tube.id})`}>
          <path d="M78 20 L78 154 A22 22 0 0 0 122 154 L122 20" fill="#ffffff" fillOpacity="0.07" stroke="#dbe3ea" strokeWidth="2.3" />
          <path d="M80 73 L120 73 L120 154 A20 20 0 0 1 80 154 Z" fill={`url(#broth-indole-${tube.id})`} opacity="0.94" />
          <path d="M80 70 Q100 74 120 70 L120 87 Q100 91 80 87 Z" fill={`url(#ring-indole-${tube.id})`} opacity={isPositive ? 0.98 : 0.85} />
          <path d="M80 70 Q100 74 120 70" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.55" />
          {isPositive && (
            <path d="M84 79 C94 83, 107 82, 117 78" fill="none" stroke="#a11232" strokeWidth="1.4" opacity="0.45" />
          )}
          <rect x="84" y="34" width="32" height="28" rx="3" fill="#f8f5ee" stroke="#dbe3ea" strokeWidth="0.6" />
          <line x1="89" y1="45" x2="111" y2="45" stroke="#94a3b8" strokeWidth="1.3" />
          <line x1="89" y1="54" x2="105" y2="54" stroke="#94a3b8" strokeWidth="1.3" />
          <path d="M78 20 L78 154 A22 22 0 0 0 122 154 L122 20" fill={`url(#glass-indole-${tube.id})`} />
          <path d="M86 28 L86 155" stroke="#ffffff" strokeWidth="2.6" opacity="0.38" />
        </g>
        <text x="100" y="178" textAnchor="middle" fill={isPositive ? '#a11232' : '#7c6b32'} fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          {isPositive ? 'Red/pink ring' : 'No red ring'}
        </text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderLAPTest(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`lap-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.14" />
          </filter>
          <linearGradient id={`lap-stick-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#6c9f91" />
            <stop offset="55%" stopColor={tube.colors.base} />
            <stop offset="100%" stopColor="#4f8176" />
          </linearGradient>
          <radialGradient id={`lap-tip-${tube.id}`} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor={tube.colors.butt} />
            <stop offset="72%" stopColor={tube.colors.slant} />
            <stop offset="100%" stopColor={isPositive ? '#c81e58' : '#dca5ba'} />
          </radialGradient>
        </defs>
        <rect x="18" y="18" width="164" height="164" rx="8" fill="#f4f1eb" />
        <g filter={`url(#lap-shadow-${tube.id})`}>
          <path d="M94 170 C93 134, 92 98, 93 63 C93 51, 107 51, 107 63 C108 98, 107 134, 106 170 Z" fill={`url(#lap-stick-${tube.id})`} opacity="0.95" />
          <path d="M95 67 C96 91, 96 125, 96 164" fill="none" stroke="#c7e7dd" strokeWidth="2" opacity="0.35" />
          <ellipse cx="100" cy="56" rx="23" ry="31" fill={`url(#lap-tip-${tube.id})`} />
          <ellipse cx="94" cy="46" rx="7" ry="12" fill="#ffffff" opacity="0.24" transform="rotate(-24 94 46)" />
          {isPositive && (
            <>
              <ellipse cx="100" cy="39" rx="14" ry="9" fill="#ef4b82" opacity="0.95" />
              <path d="M88 42 C94 48, 108 48, 115 41" fill="none" stroke="#b30d42" strokeWidth="2" opacity="0.35" />
            </>
          )}
          {!isPositive && (
            <ellipse cx="100" cy="39" rx="13" ry="8" fill="#efd6df" opacity="0.72" />
          )}
        </g>
        <text x="100" y="188" textAnchor="middle" fill={isPositive ? '#b30d42' : '#8b6371'} fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          {isPositive ? 'Red endpoint' : 'No red endpoint'}
        </text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderLitmusMilk(tube: TubeVisual) {
  const isClot = tube.id === 'E';
  const isPeptonized = tube.id === 'F';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-litmus-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`milk-litmus-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={tube.colors.slant} />
            <stop offset="58%" stopColor={tube.colors.butt} />
            <stop offset="100%" stopColor={tube.colors.base} />
          </linearGradient>
        </defs>
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="42" y1="54" x2="78" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="42" y1="66" x2="74" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#milk-litmus-${tube.id})`} opacity="0.96" />
        <path d="M36 132 Q60 136 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.34" />
        {isClot && (
          <>
            <path d="M40 204 C50 196, 69 199, 80 190 L80 282 C78 300, 70 310, 60 310 C50 310, 42 300, 40 282 Z" fill="#f7d6c9" opacity="0.72" />
            <path d="M43 230 C54 224, 67 232, 78 225" fill="none" stroke="#a8574f" strokeWidth="1.6" opacity="0.36" />
          </>
        )}
        {isPeptonized && (
          <>
            <path d="M39 134 L81 134 L81 204 Q60 194 39 204 Z" fill="#f8fafc" opacity="0.5" />
            <path d="M44 235 C53 226, 68 229, 76 220 L76 278 C74 296, 68 306, 60 306 C51 306, 45 296, 44 278 Z" fill="#7d6384" opacity="0.58" />
            <path d="M40 206 Q60 196 80 206" fill="none" stroke="#f8fafc" strokeWidth="2" opacity="0.55" />
          </>
        )}
        {tube.id === 'D' && (
          <path d="M42 156 C52 150, 68 154, 78 148" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.45" />
        )}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-litmus-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderMRVP(tube: TubeVisual) {
  const isMR = tube.id === 'A' || tube.id === 'B';
  const isPositive = tube.id === 'A' || tube.id === 'C';
  const brothColor = tube.colors.butt;
  const brothShadow = tube.colors.base;
  const brothHighlight = tube.colors.slant;

  // Reagent layer color for VP tubes: alpha-naphthol sits on top
  const hasReagentLayer = !isMR;
  const reagentColor = isPositive ? '#dc2626' : '#fef08a';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-mrvp-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-mrvp-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothShadow} />
            <stop offset="52%" stopColor={brothColor} />
            <stop offset="100%" stopColor={brothHighlight} />
          </linearGradient>
          {hasReagentLayer && (
            <linearGradient id={`reagent-mrvp-${tube.id}`} x1="0" x2="1">
              <stop offset="0%" stopColor={reagentColor} stopOpacity="0.8" />
              <stop offset="55%" stopColor={reagentColor} stopOpacity="1" />
              <stop offset="100%" stopColor={reagentColor} stopOpacity="0.75" />
            </linearGradient>
          )}
        </defs>

        {/* Tube glass shell */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="90" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          {isMR ? 'MR BROTH' : 'MRVP'}
        </text>

        {/* Broth fill */}
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-mrvp-${tube.id})`} />
        <path d="M36 132 Q60 136 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.38" />

        {/* VP reagent layer on top (alpha-naphthol floats) */}
        {hasReagentLayer && (
          <>
            <path d="M36 132 L84 132 L84 156 Q60 160 36 156 Z" fill={`url(#reagent-mrvp-${tube.id})`} opacity="0.92" />
            <path d="M36 156 Q60 160 84 156" fill="none" stroke={isPositive ? '#991b1b' : '#ca8a04'} strokeWidth="1.5" opacity="0.65" />
            {/* reagent label */}
            <text x="60" y="148" textAnchor="middle" fill={isPositive ? '#fecaca' : '#fef9c3'} fontSize="7" fontWeight="bold" fontFamily="sans-serif" opacity="0.85">REAGENT</text>
          </>
        )}

        {/* MR: add a tiny indicator drop at the meniscus line for visual clarity */}
        {isMR && (
          <ellipse cx="60" cy="133" rx="18" ry="4" fill={isPositive ? '#ef4444' : '#fbbf24'} opacity="0.55" />
        )}

        {/* Turbidity particles indicating growth */}
        <g opacity="0.22">
          <circle cx="48" cy="200" r="1.4" fill="#ffffff" />
          <circle cx="72" cy="220" r="1.1" fill="#ffffff" />
          <circle cx="55" cy="260" r="1.2" fill="#ffffff" />
          <circle cx="68" cy="180" r="1.0" fill="#ffffff" />
        </g>

        {/* Glass sheen */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-mrvp-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderMicrodase(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`slide-shadow-md-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <filter id={`subtle-blur-md-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <radialGradient id={`disk-color-md-${tube.id}`} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor={isPositive ? '#8b5cf6' : '#f8fafc'} />
            <stop offset="55%" stopColor={isPositive ? '#5b21b6' : '#e2e8f0'} />
            <stop offset="100%" stopColor={isPositive ? '#3b0764' : '#cbd5e1'} />
          </radialGradient>
        </defs>

        {/* Dark bench surface */}
        <rect x="15" y="15" width="170" height="170" fill="#0f172a" rx="8" stroke="#1e293b" strokeWidth="1" />

        {/* Glass microscope slide */}
        <rect x="25" y="45" width="150" height="110" fill="#ffffff" fillOpacity="0.08" stroke="#475569" strokeWidth="1.5" filter={`url(#slide-shadow-md-${tube.id})`} rx="2" />
        {/* Frosted label end */}
        <rect x="25" y="45" width="30" height="110" fill="#cbd5e1" fillOpacity="0.15" stroke="#475569" strokeWidth="1" />
        <text x="40" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 40 100)" letterSpacing="1">MICRODASE</text>

        {/* Paper disk base */}
        <circle cx="115" cy="100" r="34" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" filter={`url(#slide-shadow-md-${tube.id})`} />
        <circle cx="115" cy="100" r="33" fill="none" stroke="#e2e8f0" strokeWidth="1" />

        {/* Disk reaction fill */}
        {isPositive ? (
          <>
            {/* Blue-purple oxidase color diffusing across disk */}
            <circle cx="115" cy="100" r="30" fill={`url(#disk-color-md-${tube.id})`} filter={`url(#subtle-blur-md-${tube.id})`} opacity="0.92" />
            {/* Colony smear texture */}
            <path d="M 104,95 Q 115,91 126,101 T 115,110" fill="none" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" opacity="0.28" />
            <text x="115" y="104" textAnchor="middle" fill="#ede9fe" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Positive</text>
            <text x="115" y="151" textAnchor="middle" fill="#7c3aed" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Blue-Purple Color</text>
          </>
        ) : (
          <>
            {/* No color - white/unchanged disk */}
            <circle cx="115" cy="100" r="29" fill="#f8fafc" opacity="0.9" />
            {/* Colony smear texture (grey) */}
            <path d="M 104,95 Q 115,91 126,101 T 115,110" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" opacity="0.75" />
            <text x="115" y="104" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Negative</text>
            <text x="115" y="151" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">No Color Change</text>
          </>
        )}

        {/* Liquid highlight on slide */}
        <path d="M 90,82 A 28,28 0 0,1 140,82" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderMotility(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-motility-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`agar-motility-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fef8d3" />
            <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.85" />
          </linearGradient>
          {isPositive ? (
            <radialGradient id={`growth-motility-${tube.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#fb7185" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#fda4af" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
            </radialGradient>
          ) : (
            <linearGradient id={`stab-motility-${tube.id}`} x1="0" x2="1">
              <stop offset="0%" stopColor="#be123c" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>
          )}
          <filter id={`blur-motility-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Tube glass shell */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="90" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          MOTILITY
        </text>

        {/* Agar fill */}
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#agar-motility-${tube.id})`} />
        {/* Agar meniscus */}
        <path d="M36 132 Q60 136 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />

        {/* Motile (Positive) Growth Visual */}
        {isPositive && (
          <g>
            {/* Diffuse red cloud filling most of the tube */}
            <path 
              d="M40 145 L80 145 L80 286 C80 298, 72 308, 60 308 C48 308, 40 298, 40 286 Z" 
              fill={`url(#growth-motility-${tube.id})`} 
              filter={`url(#blur-motility-${tube.id})`}
              opacity="0.85" 
            />
            {/* Central stab line (faded / spreading) */}
            <line x1="60" y1="135" x2="60" y2="280" stroke="#be123c" strokeWidth="4" filter={`url(#blur-motility-${tube.id})`} opacity="0.6" />
            <line x1="60" y1="135" x2="60" y2="280" stroke="#e11d48" strokeWidth="1.5" opacity="0.8" />
          </g>
        )}

        {/* Non-motile (Negative) Growth Visual */}
        {!isPositive && (
          <g>
            {/* Sharp red stab line strictly in the center */}
            <line x1="60" y1="135" x2="60" y2="275" stroke={`url(#stab-motility-${tube.id})`} strokeWidth="3.5" strokeLinecap="round" />
            {/* Slight unevenness/roughness on the stab line (like a real needle stab) */}
            <path d="M 60,135 Q 59,170 61,205 T 60,275" fill="none" stroke="#be123c" strokeWidth="1" opacity="0.7" />
          </g>
        )}

        {/* Glass sheen */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-motility-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderMRSBroth(tube: TubeVisual) {
  const hasGas = tube.id === 'A';
  const brothColor = '#fbbf24';
  const brothShadow = '#d97706';
  const brothLight = '#fde68a';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-mrs-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-mrs-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothShadow} />
            <stop offset="50%" stopColor={brothColor} />
            <stop offset="100%" stopColor={brothLight} />
          </linearGradient>
          <linearGradient id={`durham-glass-mrs-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          MRS
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          BROTH
        </text>

        {/* Broth fill */}
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-mrs-${tube.id})`} />
        <path d="M36 132 Q60 136 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.38" />

        {/* Turbidity particles (growth) */}
        <g opacity="0.2">
          <circle cx="47" cy="190" r="2" fill="#ffffff" />
          <circle cx="73" cy="215" r="1.6" fill="#ffffff" />
          <circle cx="52" cy="255" r="1.8" fill="#ffffff" />
          <circle cx="69" cy="175" r="1.4" fill="#ffffff" />
          <circle cx="58" cy="240" r="1.3" fill="#ffffff" />
        </g>

        {/* Durham tube (inverted small tube submerged in broth)
             The Durham tube sits near the top of the broth, closed end at top.
             It is narrower than the main tube. */}
        {/* Durham tube body - glass wall */}
        <rect x="50" y="138" width="20" height="64" rx="5" fill="#ffffff" fillOpacity="0.18" stroke="#94a3b8" strokeWidth="1.2" />

        {/* Durham tube interior */}
        {hasGas ? (
          <>
            {/* Gas bubble at sealed top (clear / empty space) */}
            <path d="M51 139 L69 139 L69 157 C69 162, 65 164, 60 164 C55 164, 51 162, 51 157 Z" fill="#f0f9ff" fillOpacity="0.88" />
            {/* Gas-broth interface line */}
            <line x1="52" y1="157" x2="68" y2="157" stroke="#bae6fd" strokeWidth="1.5" opacity="0.85" />
            {/* Bubble label */}
            <text x="60" y="151" textAnchor="middle" fill="#0369a1" fontSize="6" fontWeight="bold" fontFamily="sans-serif">GAS</text>
            {/* Broth fills the rest of the Durham tube below the bubble */}
            <path d="M51 157 L69 157 L69 196 C69 199, 65 201, 60 201 C55 201, 51 199, 51 196 Z" fill={brothColor} opacity="0.7" />
          </>
        ) : (
          /* Broth fills the entire Durham tube - no gas */
          <path d="M51 139 L69 139 L69 196 C69 199, 65 201, 60 201 C55 201, 51 199, 51 196 Z" fill={brothColor} opacity="0.72" />
        )}

        {/* Durham tube glass sheen overlay */}
        <rect x="50" y="138" width="20" height="64" rx="5" fill={`url(#durham-glass-mrs-${tube.id})`} />
        <path d="M54 142 L54 196" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />

        {/* Outer glass sheen */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-mrs-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderMUGTest(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`mug-glow-${tube.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="1" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#1d4ed8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`mug-corona-${tube.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`uv-vignette-${tube.id}`} cx="50%" cy="50%" r="65%">
            <stop offset="55%" stopColor="#020617" stopOpacity="0" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.7" />
          </radialGradient>
          <filter id={`uv-bloom-${tube.id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id={`uv-soft-${tube.id}`} x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <filter id={`disk-shadow-mug-${tube.id}`} x="-8%" y="-8%" width="116%" height="116%">
            <feDropShadow dx="1" dy="2" stdDeviation="3" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* UV viewing chamber - pitch black */}
        <rect x="0" y="0" width="200" height="200" fill="#020617" />
        <rect x="0" y="0" width="200" height="200" fill={`url(#uv-vignette-${tube.id})`} />

        {/* UV label */}
        <text x="100" y="22" textAnchor="middle" fill="#4b5563" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">366 nm UV</text>

        {/* Disk base */}
        <circle cx="100" cy="105" r="42" fill="#f8fafc" filter={`url(#disk-shadow-mug-${tube.id})`} />
        <circle cx="100" cy="105" r="41" fill="#e2e8f0" />

        {isPositive ? (
          <>
            {/* Outer bloom corona */}
            <circle cx="100" cy="105" r="70" fill={`url(#mug-corona-${tube.id})`} filter={`url(#uv-bloom-${tube.id})`} />
            {/* Disk fluorescence core */}
            <circle cx="100" cy="105" r="41" fill={`url(#mug-glow-${tube.id})`} filter={`url(#uv-soft-${tube.id})`} opacity="0.97" />
            {/* Bright specular centre */}
            <circle cx="96" cy="97" r="8" fill="#dbeafe" opacity="0.55" filter={`url(#uv-soft-${tube.id})`} />
            {/* Colony smear patch */}
            <ellipse cx="100" cy="109" rx="16" ry="9" fill="#93c5fd" opacity="0.35" filter={`url(#uv-soft-${tube.id})`} />
            <text x="100" y="172" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Blue Fluorescence</text>
          </>
        ) : (
          <>
            {/* Inert white-grey disk */}
            <circle cx="100" cy="105" r="40" fill="#cbd5e1" opacity="0.6" />
            <ellipse cx="100" cy="109" rx="14" ry="8" fill="#94a3b8" opacity="0.55" />
            <text x="100" y="172" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold" fontFamily="sans-serif">No Fluorescence</text>
          </>
        )}

        {/* Disk rim */}
        <circle cx="100" cy="105" r="42" fill="none" stroke={isPositive ? '#1d4ed8' : '#64748b'} strokeWidth="1" opacity="0.45" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderNitrateReduction(tube: TubeVisual) {
  const hasGas = tube.id === 'B' || tube.id === 'C';
  const hasZinc = tube.id === 'C';
  const isRed = tube.id === 'A' || tube.id === 'B';
  
  const brothColor = isRed ? '#dc2626' : '#fbbf24';
  const brothShadow = isRed ? '#991b1b' : '#d97706';
  const brothLight = isRed ? '#fca5a5' : '#fde68a';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-nitrate-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-nitrate-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothShadow} />
            <stop offset="50%" stopColor={brothColor} />
            <stop offset="100%" stopColor={brothLight} />
          </linearGradient>
          <linearGradient id={`durham-glass-nitrate-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          NITRATE
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          BROTH
        </text>

        {/* Broth fill */}
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-nitrate-${tube.id})`} />
        <path d="M36 132 Q60 136 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.38" />

        {/* Turbidity particles */}
        <g opacity="0.15">
          <circle cx="47" cy="190" r="2" fill="#ffffff" />
          <circle cx="73" cy="215" r="1.6" fill="#ffffff" />
          <circle cx="52" cy="255" r="1.8" fill="#ffffff" />
          <circle cx="69" cy="175" r="1.4" fill="#ffffff" />
          <circle cx="58" cy="240" r="1.3" fill="#ffffff" />
        </g>

        {/* Durham tube */}
        <rect x="50" y="138" width="20" height="64" rx="5" fill="#ffffff" fillOpacity="0.18" stroke="#94a3b8" strokeWidth="1.2" />

        {hasGas ? (
          <>
            <path d="M51 139 L69 139 L69 157 C69 162, 65 164, 60 164 C55 164, 51 162, 51 157 Z" fill="#f0f9ff" fillOpacity="0.88" />
            <line x1="52" y1="157" x2="68" y2="157" stroke="#bae6fd" strokeWidth="1.5" opacity="0.85" />
            <text x="60" y="151" textAnchor="middle" fill="#0369a1" fontSize="6" fontWeight="bold" fontFamily="sans-serif">GAS</text>
            <path d="M51 157 L69 157 L69 196 C69 199, 65 201, 60 201 C55 201, 51 199, 51 196 Z" fill={brothColor} opacity="0.7" />
          </>
        ) : (
          <path d="M51 139 L69 139 L69 196 C69 199, 65 201, 60 201 C55 201, 51 199, 51 196 Z" fill={brothColor} opacity="0.72" />
        )}

        <rect x="50" y="138" width="20" height="64" rx="5" fill={`url(#durham-glass-nitrate-${tube.id})`} />
        <path d="M54 142 L54 196" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />

        {/* Zinc dust pile */}
        {hasZinc && (
          <g opacity="0.9">
            <path d="M42 296 Q 60 284 78 296 Q 74 312 60 314 Q 46 312 42 296 Z" fill="#94a3b8" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="298" r="1.2" fill="#334155" />
            <circle cx="55" cy="303" r="1" fill="#cbd5e1" />
            <circle cx="60" cy="295" r="1.5" fill="#1e293b" />
            <circle cx="65" cy="301" r="1.1" fill="#ffffff" />
            <circle cx="70" cy="297" r="1.3" fill="#64748b" />
            <circle cx="46" cy="302" r="1" fill="#334155" />
            <circle cx="74" cy="301" r="1.2" fill="#cbd5e1" />
            <text x="60" y="278" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">Zn DUST</text>
            <path d="M60 282 L60 290" stroke="#64748b" strokeWidth="0.8" strokeDasharray="1,1" />
          </g>
        )}

        {/* Outer glass sheen */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-nitrate-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderNitriteReduction(tube: TubeVisual) {
  const hasGas = tube.id === 'A';
  const hasZinc = tube.id === 'A';
  const isRed = tube.id === 'B';
  
  const brothColor = isRed ? '#dc2626' : '#fbbf24';
  const brothShadow = isRed ? '#991b1b' : '#d97706';
  const brothLight = isRed ? '#fca5a5' : '#fde68a';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-nitrite-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-nitrite-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothShadow} />
            <stop offset="50%" stopColor={brothColor} />
            <stop offset="100%" stopColor={brothLight} />
          </linearGradient>
          <linearGradient id={`durham-glass-nitrite-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          NITRITE
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          BROTH
        </text>

        {/* Broth fill */}
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-nitrite-${tube.id})`} />
        <path d="M36 132 Q60 136 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.38" />

        {/* Turbidity particles */}
        <g opacity="0.15">
          <circle cx="47" cy="190" r="2" fill="#ffffff" />
          <circle cx="73" cy="215" r="1.6" fill="#ffffff" />
          <circle cx="52" cy="255" r="1.8" fill="#ffffff" />
          <circle cx="69" cy="175" r="1.4" fill="#ffffff" />
          <circle cx="58" cy="240" r="1.3" fill="#ffffff" />
        </g>

        {/* Durham tube */}
        <rect x="50" y="138" width="20" height="64" rx="5" fill="#ffffff" fillOpacity="0.18" stroke="#94a3b8" strokeWidth="1.2" />

        {hasGas ? (
          <>
            <path d="M51 139 L69 139 L69 157 C69 162, 65 164, 60 164 C55 164, 51 162, 51 157 Z" fill="#f0f9ff" fillOpacity="0.88" />
            <line x1="52" y1="157" x2="68" y2="157" stroke="#bae6fd" strokeWidth="1.5" opacity="0.85" />
            <text x="60" y="151" textAnchor="middle" fill="#0369a1" fontSize="6" fontWeight="bold" fontFamily="sans-serif">GAS</text>
            <path d="M51 157 L69 157 L69 196 C69 199, 65 201, 60 201 C55 201, 51 199, 51 196 Z" fill={brothColor} opacity="0.7" />
          </>
        ) : (
          <path d="M51 139 L69 139 L69 196 C69 199, 65 201, 60 201 C55 201, 51 199, 51 196 Z" fill={brothColor} opacity="0.72" />
        )}

        <rect x="50" y="138" width="20" height="64" rx="5" fill={`url(#durham-glass-nitrite-${tube.id})`} />
        <path d="M54 142 L54 196" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />

        {/* Zinc dust pile */}
        {hasZinc && (
          <g opacity="0.9">
            <path d="M42 296 Q 60 284 78 296 Q 74 312 60 314 Q 46 312 42 296 Z" fill="#94a3b8" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="298" r="1.2" fill="#334155" />
            <circle cx="55" cy="303" r="1" fill="#cbd5e1" />
            <circle cx="60" cy="295" r="1.5" fill="#1e293b" />
            <circle cx="65" cy="301" r="1.1" fill="#ffffff" />
            <circle cx="70" cy="297" r="1.3" fill="#64748b" />
            <circle cx="46" cy="302" r="1" fill="#334155" />
            <circle cx="74" cy="301" r="1.2" fill="#cbd5e1" />
            <text x="60" y="278" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">Zn DUST</text>
            <path d="M60 282 L60 290" stroke="#64748b" strokeWidth="0.8" strokeDasharray="1,1" />
          </g>
        )}

        {/* Outer glass sheen */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-nitrite-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderONPGTest(tube: TubeVisual) {
  const isPositive = tube.id === 'A';
  
  const brothColor = isPositive ? '#eab308' : '#f8fafc';
  const brothShadow = isPositive ? '#ca8a04' : '#e2e8f0';
  const brothLight = isPositive ? '#fef08a' : '#ffffff';
  
  const diskColor = isPositive ? '#f59e0b' : '#f1f5f9';
  const diskShadow = isPositive ? '#d97706' : '#cbd5e1';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-onpg-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-onpg-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothShadow} />
            <stop offset="50%" stopColor={brothColor} />
            <stop offset="100%" stopColor={brothLight} />
          </linearGradient>
          <radialGradient id={`disk-onpg-${tube.id}`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor={diskColor} />
            <stop offset="100%" stopColor={diskShadow} />
          </radialGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          ONPG
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          TEST
        </text>

        {/* Saline suspension fill (low volume) */}
        <path d="M36 230 L84 230 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-onpg-${tube.id})`} opacity={isPositive ? "0.9" : "0.5"} />
        <path d="M36 230 Q60 234 84 230" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" />

        {/* Disk at the bottom */}
        <g transform="translate(60, 290)">
          <ellipse cx="0" cy="0" rx="20" ry="10" fill={`url(#disk-onpg-${tube.id})`} />
          <path d="M-20 0 A20 10 0 0 0 20 0 L20 2 A20 10 0 0 1 -20 2 Z" fill={diskShadow} opacity="0.6" />
          <text x="0" y="3" textAnchor="middle" fill={isPositive ? '#9a3412' : '#94a3b8'} fontSize="6" fontWeight="bold" fontFamily="sans-serif" transform="scale(1, 0.5)">
            ONPG
          </text>
        </g>

        {/* Turbidity particles */}
        <g opacity="0.2">
          <circle cx="47" cy="250" r="2" fill="#ffffff" />
          <circle cx="73" cy="275" r="1.6" fill="#ffffff" />
          <circle cx="52" cy="295" r="1.8" fill="#ffffff" />
          <circle cx="69" cy="245" r="1.4" fill="#ffffff" />
          <circle cx="58" cy="280" r="1.3" fill="#ffffff" />
        </g>

      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderOptochinTest(tube: TubeVisual) {
  const isSusceptible = tube.id === 'A';
  
  const agarColor = tube.colors.slant;
  const lawnColor = tube.colors.butt;

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`optochin-blur-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id={`optochin-dish-rim-${tube.id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#e5e7eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Petri Dish Outer Base */}
        <circle cx="100" cy="100" r="95" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
        
        {/* Blood Agar Layer */}
        <circle cx="100" cy="100" r="90" fill={agarColor} />
        
        {/* Alpha-hemolytic Lawn (greenish-brown) */}
        <circle cx="100" cy="100" r="86" fill={lawnColor} opacity="0.8" />
        
        {/* Streaked Growth Texture Lines */}
        <path d="M 45,70 C 60,40 140,40 155,70 C 170,100 170,140 155,170 C 140,195 60,195 45,170 C 30,140 30,100 45,70 Z" fill="none" stroke="#65763b" strokeWidth="2.5" strokeDasharray="6,18" opacity="0.5" />
        <path d="M 60,90 C 70,60 130,60 140,90 C 150,110 150,130 140,150 C 130,170 70,170 60,150 C 50,130 50,110 60,90 Z" fill="none" stroke="#65763b" strokeWidth="2" strokeDasharray="4,12" opacity="0.6" />
        <path d="M 80,100 C 90,80 110,80 120,100 C 125,110 125,120 120,130 C 115,135 105,135 100,130" fill="none" stroke="#65763b" strokeWidth="1.5" strokeDasharray="3,8" opacity="0.6" />

        {/* Zone of Inhibition */}
        {isSusceptible && (
          <circle cx="100" cy="100" r="42" fill={agarColor} filter={`url(#optochin-blur-${tube.id})`} />
        )}

        {/* Paper Disk P */}
        <circle cx="100" cy="100" r="12" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
        <text x="100" y="104" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold" fontFamily="sans-serif">P</text>

        {/* Dimension Line and Text */}
        {isSusceptible ? (
          <>
            <g stroke="#ffffff" strokeWidth="1.2" opacity="0.9">
              <line x1="58" y1="145" x2="142" y2="145" />
              <line x1="58" y1="140" x2="58" y2="150" />
              <line x1="142" y1="140" x2="142" y2="150" />
            </g>
            <rect x="72" y="152" width="56" height="15" fill={agarColor} rx="3" opacity="0.9" stroke="#ffffff" strokeWidth="0.5" />
            <text x="100" y="163" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">{'>= 14 mm'}</text>
          </>
        ) : (
          <>
            <g stroke="#ffffff" strokeWidth="1.2" opacity="0.75">
              <line x1="88" y1="145" x2="112" y2="145" />
              <line x1="88" y1="140" x2="88" y2="150" />
              <line x1="112" y1="140" x2="112" y2="150" />
            </g>
            <rect x="82" y="152" width="36" height="15" fill="#3f4728" rx="3" opacity="0.95" stroke="#ffffff" strokeWidth="0.5" />
            <text x="100" y="163" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">6 mm</text>
          </>
        )}

        {/* Glass Reflection Highlight */}
        <circle cx="100" cy="100" r="93" fill="none" stroke={`url(#optochin-dish-rim-${tube.id})`} strokeWidth="3" opacity="0.9" />
        <path d="M 25,45 A 75,75 0 0,1 175,45" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderOxidaseTest(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`slide-shadow-ox-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <filter id={`subtle-blur-ox-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Dark bench surface */}
        <rect x="15" y="15" width="170" height="170" fill="#0f172a" rx="8" stroke="#1e293b" strokeWidth="1" />

        {/* Glass slide / paper card outline */}
        <rect x="25" y="45" width="150" height="110" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" filter={`url(#slide-shadow-ox-${tube.id})`} rx="3" />
        
        {/* Left half label zone */}
        <rect x="25" y="45" width="55" height="110" fill="#cbd5e0" fillOpacity="0.12" stroke="#4a5568" strokeWidth="1" />
        <text x="52" y="90" textAnchor="middle" fill="#a0aec0" fontSize="10" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">oxidase</text>
        <text x="52" y="115" textAnchor="middle" fill="#718096" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">+/-</text>

        {/* White filter paper triangle */}
        <polygon points="135,55 98,125 172,125" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" filter={`url(#slide-shadow-ox-${tube.id})`} />

        {/* Oxidase reaction smear inside the triangle */}
        {isPositive ? (
          <>
            {/* Deep violet-purple spot */}
            <circle cx="135" cy="100" r="13" fill="#581c87" opacity="0.9" filter={`url(#subtle-blur-ox-${tube.id})`} />
            <circle cx="135" cy="100" r="9" fill="#3b0764" opacity="0.95" />
            <path d="M 128,95 Q 135,90 142,102 T 135,108" fill="none" stroke="#6b21a8" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
            
            <text x="135" y="148" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Positive</text>
          </>
        ) : (
          <>
            {/* Very faint greyish bacterium smear */}
            <circle cx="135" cy="100" r="12" fill="#e2e8f0" opacity="0.45" filter={`url(#subtle-blur-ox-${tube.id})`} />
            <path d="M 128,95 Q 135,90 142,102 T 135,108" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            
            <text x="135" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Negative</text>
          </>
        )}
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderOFMedium(tube: TubeVisual) {
  const isOverlaid = tube.id.endsWith('2');
  const isYellow = tube.id.startsWith('A');
  
  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-of-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-of-${tube.id}`} x1="0" x2="0" y1="0" y2="1">
            {tube.id === 'B1' ? (
              <>
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#eab308" />
                <stop offset="55%" stopColor="#ea580c" />
                <stop offset="75%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </>
            ) : isYellow ? (
              <>
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </>
            )}
          </linearGradient>
          <linearGradient id={`oil-grad-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          OF DEXTROSE
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
          {isOverlaid ? 'OVERLAY' : 'OPEN'}
        </text>

        {/* Medium fill */}
        {isOverlaid ? (
          <>
            {/* Medium portion */}
            <path d="M36 142 L84 142 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-of-${tube.id})`} />
            <path d="M36 142 Q60 145 84 142" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />

            {/* Mineral oil overlay */}
            <path d="M36 118 L84 118 L84 142 L36 142 Z" fill={`url(#oil-grad-${tube.id})`} />
            <path d="M36 118 Q60 121 84 118" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            <text x="60" y="132" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" opacity="0.8">OIL</text>
          </>
        ) : (
          <>
            <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-of-${tube.id})`} />
            <path d="M36 132 Q60 135 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
          </>
        )}

        {/* Stab line representing the inoculation needle pathway */}
        <g stroke="#ffffff" strokeWidth="1" opacity="0.25">
          <line x1="60" y1={isOverlaid ? "142" : "132"} x2="60" y2="240" />
          <path d="M 58,160 Q 60,158 62,160" />
          <path d="M 58,190 Q 60,188 62,190" />
          <path d="M 58,220 Q 60,218 62,220" />
        </g>

        {/* Glass sheen overlay */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-of-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderPhenylalanineDeaminase(tube: TubeVisual) {
  const isPositive = tube.id === 'A';
  
  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-pda-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          {/* Base agar yellow gradient */}
          <linearGradient id={`agar-base-pda-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          {/* Reaction overlay for slant */}
          <linearGradient id={`slant-react-pda-${tube.id}`} x1="1" x2="0" y1="0" y2="1">
            {isPositive ? (
              <>
                <stop offset="0%" stopColor="#022c22" />
                <stop offset="30%" stopColor="#064e3b" />
                <stop offset="65%" stopColor="#0f766e" />
                <stop offset="85%" stopColor="#115e59" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0.1" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          PHENYLALANINE
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          DEAMINASE
        </text>

        {/* Base yellow agar slant */}
        <path d="M36 138 C51 132, 67 126, 84 112 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#agar-base-pda-${tube.id})`} />
        
        {/* Slant surface reaction color overlay */}
        <path d="M36 138 C51 132, 67 126, 84 112 L84 240 C75 250, 45 260, 36 240 Z" fill={`url(#slant-react-pda-${tube.id})`} opacity="0.95" />

        {/* Ferric Chloride puddle at bottom of slant */}
        {isPositive ? (
          <path d="M36 138 C 42 143, 56 145, 68 140 C 65 152, 45 156, 36 146 Z" fill="#115e59" stroke="#134e4a" strokeWidth="0.5" opacity="0.9" />
        ) : (
          <path d="M36 138 C 42 143, 56 145, 68 140 C 65 152, 45 156, 36 146 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" opacity="0.85" />
        )}

        {/* Shiny surface highlight on the slant */}
        <path d="M44 129 C57 125, 70 118, 83 109" fill="none" stroke="#ffffff" strokeWidth="3.5" opacity="0.4" />

      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderPYRTest(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`slide-shadow-pyr-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <filter id={`subtle-blur-pyr-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Dark bench surface */}
        <rect x="15" y="15" width="170" height="170" fill="#0f172a" rx="8" stroke="#1e293b" strokeWidth="1" />

        {/* Slide/card outline */}
        <rect x="25" y="45" width="150" height="110" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" filter={`url(#slide-shadow-pyr-${tube.id})`} rx="3" />
        
        {/* Left half label zone */}
        <rect x="25" y="45" width="55" height="110" fill="#cbd5e0" fillOpacity="0.12" stroke="#4a5568" strokeWidth="1" />
        <text x="52" y="90" textAnchor="middle" fill="#a0aec0" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">Pyr</text>
        <text x="52" y="115" textAnchor="middle" fill="#718096" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">+/-</text>

        {/* White circular paper disk */}
        <circle cx="135" cy="100" r="28" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" filter={`url(#slide-shadow-pyr-${tube.id})`} />

        {/* Reaction smear inside the disk */}
        {isPositive ? (
          <>
            {/* Vibrant cherry red/pink spot */}
            <circle cx="135" cy="100" r="14" fill="#be123c" opacity="0.9" filter={`url(#subtle-blur-pyr-${tube.id})`} />
            <circle cx="135" cy="100" r="9" fill="#9f1239" opacity="0.95" />
            <path d="M 127,95 Q 135,91 143,103 T 135,109" fill="none" stroke="#db2777" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
            
            <text x="135" y="148" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Positive</text>
          </>
        ) : (
          <>
            {/* Faint orange/cream smear */}
            <circle cx="135" cy="100" r="12" fill="#ffedd5" opacity="0.4" filter={`url(#subtle-blur-pyr-${tube.id})`} />
            <path d="M 127,95 Q 135,91 143,103 T 135,109" fill="none" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
            
            <text x="135" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Negative</text>
          </>
        )}
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderPyruvateBroth(tube: TubeVisual) {
  const isPositive = tube.id === 'A';
  
  const brothColor = isPositive ? '#eab308' : '#0d9488';
  const brothShadow = isPositive ? '#ca8a04' : '#0f766e';
  const brothLight = isPositive ? '#fef08a' : '#2dd4bf';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-pyr-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-pyr-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothShadow} />
            <stop offset="50%" stopColor={brothColor} />
            <stop offset="100%" stopColor={brothLight} />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          PYRUVATE
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          BROTH
        </text>

        {/* Broth fill */}
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-pyr-${tube.id})`} />
        <path d="M36 132 Q60 135 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.38" />

        {/* Turbidity / Growth particles */}
        <g opacity={isPositive ? "0.22" : "0.06"}>
          <circle cx="47" cy="190" r="2.2" fill="#ffffff" />
          <circle cx="73" cy="215" r="1.6" fill="#ffffff" />
          <circle cx="52" cy="255" r="2.0" fill="#ffffff" />
          <circle cx="69" cy="175" r="1.4" fill="#ffffff" />
          <circle cx="58" cy="240" r="1.3" fill="#ffffff" />
          <circle cx="64" cy="210" r="1.8" fill="#ffffff" />
          <circle cx="44" cy="235" r="1.5" fill="#ffffff" />
        </g>

        {/* Outer glass sheen */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-pyr-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderSaltTolerance(tube: TubeVisual) {
  const isPositive = tube.id === 'A';
  
  const brothColor = isPositive ? '#eab308' : '#701a75';
  const brothShadow = isPositive ? '#ca8a04' : '#4a044e';
  const brothLight = isPositive ? '#fef08a' : '#d946ef';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-salt-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`broth-salt-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={brothShadow} />
            <stop offset="50%" stopColor={brothColor} />
            <stop offset="100%" stopColor={brothLight} />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          6.5% NaCl
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          BROTH
        </text>

        {/* Broth fill */}
        <path d="M36 132 L84 132 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#broth-salt-${tube.id})`} />
        <path d="M36 132 Q60 135 84 132" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.38" />

        {/* Turbidity / Growth particles */}
        {isPositive ? (
          <g opacity="0.3">
            <path d="M38 140 L82 140 L82 284 C82 298, 72 310, 60 310 C48 310, 38 298, 38 284 Z" fill="#ffffff" opacity="0.25" />
            <circle cx="47" cy="190" r="2.5" fill="#ffffff" />
            <circle cx="73" cy="215" r="1.8" fill="#ffffff" />
            <circle cx="52" cy="255" r="2.2" fill="#ffffff" />
            <circle cx="69" cy="175" r="1.5" fill="#ffffff" />
            <circle cx="58" cy="240" r="1.4" fill="#ffffff" />
            <circle cx="64" cy="210" r="2.0" fill="#ffffff" />
            <circle cx="44" cy="235" r="1.6" fill="#ffffff" />
            <circle cx="76" cy="250" r="1.8" fill="#ffffff" />
            <circle cx="50" cy="165" r="1.5" fill="#ffffff" />
            <circle cx="66" cy="265" r="2.2" fill="#ffffff" />
          </g>
        ) : (
          <g opacity="0.0">
            <circle cx="47" cy="190" r="1.5" fill="#ffffff" />
          </g>
        )}

        {/* Outer glass sheen */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-salt-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderSpotIndole(tube: TubeVisual) {
  const isPositive = tube.id === 'A';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`slide-shadow-sp-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <filter id={`subtle-blur-sp-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Dark bench surface */}
        <rect x="15" y="15" width="170" height="170" fill="#0f172a" rx="8" stroke="#1e293b" strokeWidth="1" />

        {/* Slide/card outline */}
        <rect x="25" y="45" width="150" height="110" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" filter={`url(#slide-shadow-sp-${tube.id})`} rx="3" />
        
        {/* Left half label zone */}
        <rect x="25" y="45" width="55" height="110" fill="#cbd5e0" fillOpacity="0.12" stroke="#4a5568" strokeWidth="1" />
        <text x="52" y="90" textAnchor="middle" fill="#a0aec0" fontSize="10" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">Indole</text>
        <text x="52" y="115" textAnchor="middle" fill="#718096" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">+/-</text>

        {/* White filter paper triangle */}
        <polygon points="135,55 98,125 172,125" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" filter={`url(#slide-shadow-sp-${tube.id})`} />

        {/* Reaction smear inside the triangle */}
        {isPositive ? (
          <>
            {/* Blue-green spot */}
            <circle cx="135" cy="100" r="13" fill="#0ea5e9" opacity="0.9" filter={`url(#subtle-blur-sp-${tube.id})`} />
            <circle cx="135" cy="100" r="9" fill="#0284c7" opacity="0.95" />
            <path d="M 128,95 Q 135,90 142,102 T 135,108" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
            
            <text x="135" y="148" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Positive</text>
          </>
        ) : (
          <>
            {/* Faint pink / colorless bacterium smear */}
            <circle cx="135" cy="100" r="12" fill="#fce7f3" opacity="0.45" filter={`url(#subtle-blur-sp-${tube.id})`} />
            <path d="M 128,95 Q 135,90 142,102 T 135,108" fill="none" stroke="#fbcfe8" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            
            <text x="135" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Negative</text>
          </>
        )}
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTSITest(tube: TubeVisual) {
  const isA = tube.id === 'A';
  const isB = tube.id === 'B';
  const isD = tube.id === 'D';

  const slantColor = isA ? '#fbbf24' : '#dc2626';
  const slantShadow = isA ? '#ca8a04' : '#991b1b';
  const slantLight = isA ? '#fde68a' : '#fca5a5';

  const buttColor = isA ? '#eab308' : isB ? '#1e293b' : '#dc2626';
  const buttShadow = isA ? '#ca8a04' : isB ? '#0f172a' : '#991b1b';
  const buttLight = isA ? '#fef08a' : isB ? '#334155' : '#fca5a5';

  const hasGas = isA || isB;

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-tsi-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`slant-tsi-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={slantShadow} />
            <stop offset="50%" stopColor={slantColor} />
            <stop offset="100%" stopColor={slantLight} />
          </linearGradient>
          <linearGradient id={`butt-tsi-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={buttShadow} />
            <stop offset="50%" stopColor={buttColor} />
            <stop offset="100%" stopColor={buttLight} />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          TSI AGAR
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
          {isD ? 'CONTROL' : 'TEST'}
        </text>

        {/* Agar fill */}
        {hasGas ? (
          <>
            {/* Slant surface and upper butt */}
            <path d="M36 138 C51 132, 67 126, 84 112 L84 270 C84 275, 72 278, 60 278 C48 278, 36 275, 36 270 Z" fill={`url(#slant-tsi-${tube.id})`} />
            
            {/* Lower butt section pushed up by gas gap */}
            <path d="M36 190 C48 185, 72 185, 84 190 L84 270 C84 275, 72 278, 60 278 C48 278, 36 275, 36 270 Z" fill={`url(#butt-tsi-${tube.id})`} opacity="0.95" />

            {/* Cracks and bubble overlays in the agar */}
            <ellipse cx="60" cy="220" rx="10" ry="3" fill="#ffffff" fillOpacity="0.45" stroke="#ffffff" strokeWidth="0.8" />
            <path d="M 40,210 Q 60,205 80,210" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.7" />
            <path d="M 45,245 Q 60,248 75,243" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.7" />
            
            {/* Gas space at bottom */}
            <text x="60" y="304" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" opacity="0.7">GAS GAP</text>
          </>
        ) : (
          <>
            {/* Full solid agar without gas */}
            <path d="M36 138 C51 132, 67 126, 84 112 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#slant-tsi-${tube.id})`} />
            <path d="M36 190 L84 190 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#butt-tsi-${tube.id})`} opacity="0.95" />
          </>
        )}

        {/* Shiny surface highlight on the slant slope */}
        <path d="M44 129 C57 125, 70 118, 83 109" fill="none" stroke="#ffffff" strokeWidth="3.5" opacity="0.45" />

        {/* Glass sheen overlay */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-tsi-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderUreaseTest(tube: TubeVisual) {
  const isPositive = tube.id === 'A';
  
  const buttColor = isPositive ? '#d946ef' : '#fb923c';
  const buttShadow = isPositive ? '#c026d3' : '#ea580c';
  const buttLight = isPositive ? '#ec4899' : '#fdba74';

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-urea-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`agar-urea-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={buttShadow} />
            <stop offset="50%" stopColor={buttColor} />
            <stop offset="100%" stopColor={buttLight} />
          </linearGradient>
        </defs>

        {/* Outer tube glass */}
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />

        {/* Label tape */}
        <rect x="35" y="38" width="50" height="76" rx="4" fill="#f8f5ee" />
        <line x1="43" y1="54" x2="77" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="43" y1="66" x2="73" y2="66" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          UREA
        </text>
        <text x="60" y="97" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          AGAR
        </text>

        {/* Agar slant */}
        <path d="M36 138 C51 132, 67 126, 84 112 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#agar-urea-${tube.id})`} />
        
        {/* Shiny surface highlight on the slant */}
        <path d="M44 129 C57 125, 70 118, 83 109" fill="none" stroke="#ffffff" strokeWidth="3.5" opacity="0.4" />

        {/* Glass sheen overlay */}
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-urea-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderXVFactorTest(tube: TubeVisual) {
  const requiresV = tube.id === 'B';
  const requiresX = tube.id === 'C';
  const requiresNone = tube.id === 'D';

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id={`xv-blur-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id={`xv-shadow-${tube.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0.5" dy="1" stdDeviation="0.8" floodOpacity="0.15" />
          </filter>
          <linearGradient id={`xv-dish-rim-${tube.id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#e5e7eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id={`tsa-agar-${tube.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5d06e" />
            <stop offset="70%" stopColor="#cf9d26" />
            <stop offset="100%" stopColor="#a17511" />
          </radialGradient>
        </defs>
        
        {/* Petri Dish Outer Base */}
        <circle cx="100" cy="100" r="95" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
        
        {/* Trypticase Soy Agar Layer */}
        <circle cx="100" cy="100" r="90" fill={`url(#tsa-agar-${tube.id})`} />
        
        {/* Growth Halos (Rendered as soft blurred cream circles centered at the disks) */}
        {requiresNone && (
          <>
            <circle cx="100" cy="100" r="86" fill="#eae3cb" opacity="0.75" />
            {/* Streaked Growth Texture Lines */}
            <path d="M 45,70 C 60,40 140,40 155,70 C 170,100 170,140 155,170 C 140,195 60,195 45,170 C 30,140 30,100 45,70 Z" fill="none" stroke="#beba97" strokeWidth="2.5" strokeDasharray="6,18" opacity="0.45" />
            <path d="M 60,90 C 70,60 130,60 140,90 C 150,110 150,130 140,150 C 130,170 70,170 60,150 C 50,130 50,110 60,90 Z" fill="none" stroke="#beba97" strokeWidth="2" strokeDasharray="4,12" opacity="0.5" />
          </>
        )}

        {!requiresNone && (
          <>
            {/* XV disk halo (Always present for any factor-requiring species) */}
            <circle cx="100" cy="135" r="28" fill="#eae3cb" opacity="0.85" filter={`url(#xv-blur-${tube.id})`} />
            <circle cx="100" cy="135" r="24" fill="none" stroke="#cbbfa3" strokeWidth="1.5" strokeDasharray="3,6" opacity="0.5" />
            
            {/* V disk halo (Present if requires V only) */}
            {requiresV && (
              <>
                <circle cx="130" cy="75" r="28" fill="#eae3cb" opacity="0.85" filter={`url(#xv-blur-${tube.id})`} />
                <circle cx="130" cy="75" r="24" fill="none" stroke="#cbbfa3" strokeWidth="1.5" strokeDasharray="3,6" opacity="0.5" />
              </>
            )}
            
            {/* X disk halo (Present if requires X only) */}
            {requiresX && (
              <>
                <circle cx="70" cy="75" r="28" fill="#eae3cb" opacity="0.85" filter={`url(#xv-blur-${tube.id})`} />
                <circle cx="70" cy="75" r="24" fill="none" stroke="#cbbfa3" strokeWidth="1.5" strokeDasharray="3,6" opacity="0.5" />
              </>
            )}
          </>
        )}

        {/* Paper Disk X (Top-Left) */}
        <circle cx="70" cy="75" r="10" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" filter={`url(#xv-shadow-${tube.id})`} />
        <text x="70" y="79" textAnchor="middle" fill="#374151" fontSize="9" fontWeight="bold" fontFamily="sans-serif">X</text>

        {/* Paper Disk V (Top-Right) */}
        <circle cx="130" cy="75" r="10" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" filter={`url(#xv-shadow-${tube.id})`} />
        <text x="130" y="79" textAnchor="middle" fill="#374151" fontSize="9" fontWeight="bold" fontFamily="sans-serif">V</text>

        {/* Paper Disk XV (Bottom) */}
        <circle cx="100" cy="135" r="11" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" filter={`url(#xv-shadow-${tube.id})`} />
        <text x="100" y="139" textAnchor="middle" fill="#374151" fontSize="8" fontWeight="bold" fontFamily="sans-serif">XV</text>

        {/* Glass Reflection Highlight */}
        <circle cx="100" cy="100" r="93" fill="none" stroke={`url(#xv-dish-rim-${tube.id})`} strokeWidth="3" opacity="0.9" />
        <path d="M 25,45 A 75,75 0 0,1 175,45" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderGiardia(tube: TubeVisual) {
  const isTrophozoite = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`giardia-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.72" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`giardia-glow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={body} floodOpacity="0.3" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#giardia-bg-${tube.id})`} stroke="#c4beb2" strokeWidth="1.2" />
        <circle cx="34" cy="40" r="5" fill="#b8b0a0" opacity="0.2" />
        <circle cx="166" cy="46" r="4" fill="#b8b0a0" opacity="0.16" />
        <circle cx="164" cy="162" r="5" fill="#b8b0a0" opacity="0.14" />
        {isTrophozoite ? (
          <g filter={`url(#giardia-glow-${tube.id})`}>
            <path d="M 100 44 C 140 44, 158 68, 156 98 C 154 126, 134 150, 100 156 C 66 150, 46 126, 44 98 C 42 68, 60 44, 100 44" fill={body} fillOpacity="0.8" stroke="#3a2d6a" strokeWidth="1.5" />
            <path d="M 68 58 C 56 72, 48 88, 50 106" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.28" strokeLinecap="round" />
            <line x1="100" y1="62" x2="100" y2="150" stroke="#ffffff" strokeWidth="1.6" opacity="0.5" />
            <ellipse cx="84" cy="72" rx="13" ry="11" fill="#ffffff" fillOpacity="0.32" stroke={detail} strokeWidth="1.6" />
            <circle cx="84" cy="72" r="4" fill={detail} opacity="0.9" />
            <ellipse cx="116" cy="72" rx="13" ry="11" fill="#ffffff" fillOpacity="0.32" stroke={detail} strokeWidth="1.6" />
            <circle cx="116" cy="72" r="4" fill={detail} opacity="0.9" />
            <ellipse cx="88" cy="112" rx="8" ry="5" fill="#ffffff" fillOpacity="0.38" stroke={detail} strokeWidth="1.2" transform="rotate(-25 88 112)" />
            <ellipse cx="112" cy="112" rx="8" ry="5" fill="#ffffff" fillOpacity="0.38" stroke={detail} strokeWidth="1.2" transform="rotate(25 112 112)" />
            <path d="M 94 48 C 88 36, 84 26, 80 14" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.62" strokeLinecap="round" />
            <path d="M 106 48 C 112 36, 116 26, 120 14" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.62" strokeLinecap="round" />
            <path d="M 46 92 C 36 86, 24 82, 14 76" fill="none" stroke={detail} strokeWidth="1.1" opacity="0.48" strokeLinecap="round" />
            <path d="M 154 92 C 164 86, 176 82, 186 76" fill="none" stroke={detail} strokeWidth="1.1" opacity="0.48" strokeLinecap="round" />
            <path d="M 94 152 C 88 164, 82 174, 78 186" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.58" strokeLinecap="round" />
            <path d="M 106 152 C 112 164, 118 174, 122 186" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.58" strokeLinecap="round" />
          </g>
        ) : (
          <g filter={`url(#giardia-glow-${tube.id})`}>
            <ellipse cx="100" cy="102" rx="55" ry="43" fill="none" stroke={body} strokeWidth="2.5" opacity="0.45" />
            <ellipse cx="100" cy="102" rx="52" ry="40" fill={body} fillOpacity="0.74" stroke={detail} strokeWidth="1.8" />
            <path d="M 62 80 C 72 72, 84 70, 92 72" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.36" strokeLinecap="round" />
            <ellipse cx="82" cy="83" rx="10" ry="9" fill="#ffffff" fillOpacity="0.28" stroke={detail} strokeWidth="1.8" />
            <circle cx="82" cy="83" r="3.5" fill={detail} opacity="0.9" />
            <ellipse cx="118" cy="83" rx="10" ry="9" fill="#ffffff" fillOpacity="0.28" stroke={detail} strokeWidth="1.8" />
            <circle cx="118" cy="83" r="3.5" fill={detail} opacity="0.9" />
            <ellipse cx="82" cy="121" rx="10" ry="9" fill="#ffffff" fillOpacity="0.28" stroke={detail} strokeWidth="1.8" />
            <circle cx="82" cy="121" r="3.5" fill={detail} opacity="0.9" />
            <ellipse cx="118" cy="121" rx="10" ry="9" fill="#ffffff" fillOpacity="0.28" stroke={detail} strokeWidth="1.8" />
            <circle cx="118" cy="121" r="3.5" fill={detail} opacity="0.9" />
            <path d="M 66 96 C 80 92, 100 102, 120 96" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity="0.42" />
            <path d="M 68 110 C 82 106, 100 112, 122 108" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.3" />
          </g>
        )}
        <text x="100" y="193" textAnchor="middle" fill="#3a2d6a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderCryptosporidium(tube: TubeVisual) {
  const isOocyst = tube.id === 'A';
  const bg = tube.colors.slant;
  const fill = tube.colors.butt;
  const edge = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`crypto-bg-${tube.id}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.82" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#crypto-bg-${tube.id})`} stroke="#8aaab0" strokeWidth="1.2" />
        {isOocyst ? (
          <>
            <circle cx="100" cy="96" r="18" fill={fill} fillOpacity="0.9" stroke={edge} strokeWidth="1.8" />
            <path d="M 88 90 C 92 85, 108 85, 112 90" fill="none" stroke={edge} strokeWidth="1.4" opacity="0.55" />
            <path d="M 88 102 C 92 97, 108 97, 112 102" fill="none" stroke={edge} strokeWidth="1.4" opacity="0.4" />
            <path d="M 76 90 C 80 86, 86 86, 90 90" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.38" strokeLinecap="round" />
            <circle cx="58" cy="72" r="15" fill={fill} fillOpacity="0.84" stroke={edge} strokeWidth="1.6" />
            <path d="M 48 68 C 52 64, 58 64, 62 68" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity="0.34" strokeLinecap="round" />
            <circle cx="144" cy="78" r="16" fill={fill} fillOpacity="0.82" stroke={edge} strokeWidth="1.6" />
            <circle cx="68" cy="136" r="15" fill={fill} fillOpacity="0.80" stroke={edge} strokeWidth="1.5" />
            <circle cx="140" cy="134" r="14" fill={fill} fillOpacity="0.78" stroke={edge} strokeWidth="1.5" />
            <circle cx="166" cy="152" r="11" fill={fill} fillOpacity="0.38" stroke={edge} strokeWidth="1" />
          </>
        ) : (
          <>
            <ellipse cx="96" cy="98" rx="20" ry="18" fill={fill} fillOpacity="0.82" stroke={edge} strokeWidth="1.8" />
            <ellipse cx="118" cy="86" rx="11" ry="10" fill={fill} fillOpacity="0.78" stroke={edge} strokeWidth="1.6" />
            <path d="M 82 92 C 86 88, 92 88, 94 92" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.32" strokeLinecap="round" />
            <ellipse cx="60" cy="70" rx="18" ry="16" fill={fill} fillOpacity="0.74" stroke={edge} strokeWidth="1.6" />
            <ellipse cx="148" cy="80" rx="17" ry="15" fill={fill} fillOpacity="0.72" stroke={edge} strokeWidth="1.5" />
            <ellipse cx="148" cy="65" rx="9" ry="8" fill={fill} fillOpacity="0.65" stroke={edge} strokeWidth="1.4" />
            <ellipse cx="64" cy="140" rx="18" ry="17" fill={fill} fillOpacity="0.70" stroke={edge} strokeWidth="1.5" />
            <ellipse cx="140" cy="146" rx="16" ry="15" fill={fill} fillOpacity="0.68" stroke={edge} strokeWidth="1.4" />
          </>
        )}
        <text x="100" y="193" textAnchor="middle" fill={isOocyst ? '#8a1840' : '#2a5c38'} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderEntamoeba(tube: TubeVisual) {
  const isTrophozoite = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`ameba-bg-${tube.id}`} cx="48%" cy="44%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.68" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`ameba-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={body} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#ameba-bg-${tube.id})`} stroke="#b4c4a4" strokeWidth="1.2" />
        <circle cx="36" cy="44" r="4" fill="#9aae8a" opacity="0.2" />
        <circle cx="164" cy="52" r="3" fill="#9aae8a" opacity="0.16" />
        {isTrophozoite ? (
          <g filter={`url(#ameba-shadow-${tube.id})`}>
            <path d="M 100 44 C 130 40, 155 56, 160 78 C 165 100, 156 126, 142 140 C 126 154, 100 158, 80 150 C 60 142, 46 120, 48 98 C 50 76, 68 56, 84 48 L 78 42 Z" fill={body} fillOpacity="0.76" stroke="#2a4a60" strokeWidth="1.5" />
            <path d="M 84 48 C 78 38, 70 28, 60 20" fill={body} fillOpacity="0.62" stroke="#2a4a60" strokeWidth="1.2" />
            <path d="M 68 60 C 58 74, 50 88, 52 106" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.26" strokeLinecap="round" />
            <circle cx="106" cy="96" r="22" fill="#ffffff" fillOpacity="0.28" stroke={detail} strokeWidth="1.8" />
            {([0, 45, 90, 135, 180, 225, 270, 315] as number[]).map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const nx = 106 + 19 * Math.cos(rad);
              const ny = 96 + 19 * Math.sin(rad);
              return <circle key={angle} cx={nx} cy={ny} r="2.5" fill={detail} opacity="0.82" />;
            })}
            <circle cx="106" cy="96" r="5" fill={detail} opacity="0.95" />
            <circle cx="86" cy="122" r="7" fill="#c83838" fillOpacity="0.72" stroke="#8c2828" strokeWidth="1" />
            <circle cx="124" cy="118" r="6" fill="#c83838" fillOpacity="0.62" stroke="#8c2828" strokeWidth="0.9" />
            <circle cx="106" cy="130" r="5" fill="#c83838" fillOpacity="0.52" stroke="#8c2828" strokeWidth="0.8" />
          </g>
        ) : (
          <g filter={`url(#ameba-shadow-${tube.id})`}>
            <circle cx="100" cy="100" r="52" fill={body} fillOpacity="0.76" stroke={detail} strokeWidth="2" />
            <path d="M 62 72 C 72 62, 86 58, 96 60" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.34" strokeLinecap="round" />
            {([{ cx: 80, cy: 80 }, { cx: 120, cy: 80 }, { cx: 80, cy: 120 }, { cx: 120, cy: 120 }] as Array<{ cx: number; cy: number }>).map(({ cx, cy }) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="13" fill="#ffffff" fillOpacity="0.26" stroke={detail} strokeWidth="1.6" />
                {([0, 60, 120, 180, 240, 300] as number[]).map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const nx = cx + 10 * Math.cos(rad);
                  const ny = cy + 10 * Math.sin(rad);
                  return <circle key={angle} cx={nx} cy={ny} r="2" fill={detail} opacity="0.78" />;
                })}
                <circle cx={cx} cy={cy} r="4" fill={detail} opacity="0.94" />
              </g>
            ))}
            <rect x="84" y="97" width="32" height="7" rx="3" fill={detail} opacity="0.5" transform="rotate(-14 100 100)" />
            <rect x="80" y="104" width="24" height="6" rx="2.5" fill={detail} opacity="0.38" transform="rotate(18 92 107)" />
          </g>
        )}
        <text x="100" y="193" textAnchor="middle" fill="#2a4858" fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTrichomonas(tube: TubeVisual) {
  const isWetMount = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`trich-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity={isWetMount ? '0.55' : '0.72'} />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`trich-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={body} floodOpacity="0.24" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#trich-bg-${tube.id})`} stroke="#b8c8b0" strokeWidth="1.2" />
        <ellipse cx="38" cy="156" rx="22" ry="18" fill="#d4c8a8" fillOpacity="0.3" stroke="#b0a880" strokeWidth="0.8" />
        <ellipse cx="164" cy="152" rx="24" ry="19" fill="#d4c8a8" fillOpacity="0.26" stroke="#b0a880" strokeWidth="0.8" />
        <g filter={`url(#trich-shadow-${tube.id})`}>
          <path d="M 100 46 C 130 46, 150 62, 150 90 C 150 116, 132 142, 110 150 C 104 152, 96 152, 90 150 C 68 142, 50 116, 50 90 C 50 62, 70 46, 100 46" fill={body} fillOpacity={isWetMount ? '0.74' : '0.82'} stroke={detail} strokeWidth="1.6" />
          <path d="M 68 64 C 76 56, 86 52, 94 54" fill="none" stroke="#ffffff" strokeWidth="2.8" opacity={isWetMount ? '0.28' : '0.38'} strokeLinecap="round" />
          <ellipse cx="96" cy="84" rx="18" ry="14" fill="#ffffff" fillOpacity="0.28" stroke={detail} strokeWidth="1.6" />
          <ellipse cx="96" cy="84" rx="8" ry="6" fill={detail} opacity="0.72" />
          <path d="M 142 62 C 150 70, 150 80, 142 90 C 134 100, 134 112, 142 122 C 150 132, 150 142, 142 150" fill="none" stroke={detail} strokeWidth={isWetMount ? '1.8' : '2.2'} opacity="0.55" strokeLinecap="round" />
          {!isWetMount && (
            <path d="M 136 62 C 144 70, 144 80, 136 90 C 128 100, 128 112, 136 122" fill="none" stroke={detail} strokeWidth="1.2" opacity="0.35" strokeLinecap="round" strokeDasharray="3 3" />
          )}
          <path d="M 88 50 C 84 38, 80 26, 74 14" fill="none" stroke={detail} strokeWidth="1.5" opacity="0.68" strokeLinecap="round" />
          <path d="M 96 48 C 94 36, 92 22, 88 10" fill="none" stroke={detail} strokeWidth="1.5" opacity="0.68" strokeLinecap="round" />
          <path d="M 104 48 C 106 36, 108 22, 112 10" fill="none" stroke={detail} strokeWidth="1.5" opacity="0.62" strokeLinecap="round" />
          <path d="M 112 50 C 116 38, 120 26, 126 14" fill="none" stroke={detail} strokeWidth="1.5" opacity="0.62" strokeLinecap="round" />
          <path d="M 100 150 L 100 184" fill="none" stroke={detail} strokeWidth="2.5" opacity="0.58" strokeLinecap="round" />
          <circle cx="100" cy="185" r="1.8" fill={detail} opacity="0.5" />
        </g>
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderEnterobius(tube: TubeVisual) {
  const isFresh = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`entero-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`entero-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.24" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#entero-bg-${tube.id})`} stroke="#c8c0a0" strokeWidth="1.2" />
        <g filter={`url(#entero-shadow-${tube.id})`}>
          {/* D-shaped egg: flat left side, curved right */}
          <path d="M 72 58 L 72 142 C 72 162, 92 170, 108 162 C 148 148, 162 126, 160 100 C 158 74, 142 50, 108 40 C 92 34, 72 38, 72 58" fill={shell} fillOpacity="0.22" stroke={shell} strokeWidth="2.8" />
          {/* Flat side indicator */}
          <line x1="72" y1="60" x2="72" y2="140" stroke={shell} strokeWidth="2.8" strokeLinecap="round" opacity="0.6" />
          {isFresh ? (
            <>
              {/* Larva inside - coiled shape */}
              <path d="M 104 72 C 130 78, 138 95, 128 110 C 118 125, 98 124, 94 108 C 90 92, 108 88, 118 100" fill="none" stroke={detail} strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
              <circle cx="104" cy="70" r="3.5" fill={detail} opacity="0.6" />
            </>
          ) : (
            /* Collapsed/older - faint outline only */
            <ellipse cx="112" cy="100" rx="26" ry="34" fill={detail} fillOpacity="0.1" stroke={detail} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.5" />
          )}
        </g>
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderStrongyloides(tube: TubeVisual) {
  const isRhabditiform = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`strongy-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.45" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`strongy-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={body} floodOpacity="0.2" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#strongy-bg-${tube.id})`} stroke="#c0c8b8" strokeWidth="1.2" />
        <g filter={`url(#strongy-shadow-${tube.id})`}>
          {/* Larval body - elongated worm */}
          <path d={isRhabditiform ? 'M 100 28 C 102 60, 104 90, 100 118 C 96 148, 98 162, 100 175' : 'M 100 22 C 103 55, 105 88, 100 118 C 95 148, 97 164, 100 180'} fill="none" stroke={body} strokeWidth="13" strokeLinecap="round" opacity="0.72" />
          <path d={isRhabditiform ? 'M 100 28 C 102 60, 104 90, 100 118 C 96 148, 98 162, 100 175' : 'M 100 22 C 103 55, 105 88, 100 118 C 95 148, 97 164, 100 180'} fill="none" stroke={bg} strokeWidth="7" strokeLinecap="round" opacity="0.45" />
          {isRhabditiform ? (
            <>
              {/* Short buccal channel */}
              <rect x="93" y="28" width="14" height="10" rx="3" fill={detail} opacity="0.75" />
              {/* Genital primordium (cell cluster mid-body) */}
              <ellipse cx="100" cy="112" rx="9" ry="6" fill={detail} opacity="0.68" />
              <text x="118" y="115" fill={detail} fontSize="8" fontFamily="sans-serif" opacity="0.65">GP</text>
            </>
          ) : (
            <>
              {/* Longer esophagus (filariform) */}
              <rect x="93" y="22" width="14" height="26" rx="3" fill={detail} opacity="0.62" />
              {/* Notched tail */}
              <path d="M 96 172 C 94 178, 100 182, 104 178 C 100 174, 96 172, 96 172" fill={detail} opacity="0.65" stroke={detail} strokeWidth="1" />
            </>
          )}
        </g>
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderHookworm(tube: TubeVisual) {
  const isFresh = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`hook-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`hook-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#hook-bg-${tube.id})`} stroke="#c8b8a0" strokeWidth="1.2" />
        <g filter={`url(#hook-shadow-${tube.id})`}>
          {/* Oval egg shell */}
          <ellipse cx="100" cy="100" rx="44" ry="57" fill={shell} fillOpacity="0.18" stroke={shell} strokeWidth="2.5" />
          {/* Clear space */}
          <ellipse cx="100" cy="100" rx="37" ry="50" fill={bg} fillOpacity="0.65" stroke="none" />
          {isFresh ? (
            <>
              {/* 4-cell morula */}
              <circle cx="87" cy="88" r="12" fill={detail} fillOpacity="0.42" stroke={detail} strokeWidth="1.2" />
              <circle cx="113" cy="88" r="12" fill={detail} fillOpacity="0.42" stroke={detail} strokeWidth="1.2" />
              <circle cx="87" cy="113" r="12" fill={detail} fillOpacity="0.42" stroke={detail} strokeWidth="1.2" />
              <circle cx="113" cy="113" r="12" fill={detail} fillOpacity="0.42" stroke={detail} strokeWidth="1.2" />
              <line x1="100" y1="76" x2="100" y2="125" stroke={detail} strokeWidth="1" opacity="0.35" />
              <line x1="75" y1="100" x2="125" y2="100" stroke={detail} strokeWidth="1" opacity="0.35" />
            </>
          ) : (
            /* Embryonated - larva curled inside */
            <path d="M 100 62 C 128 70, 136 90, 122 108 C 108 126, 84 122, 82 104 C 80 86, 100 82, 108 96" fill="none" stroke={detail} strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
          )}
        </g>
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTrichurisEgg(tube: TubeVisual) {
  const isEmbryonated = tube.id === 'B';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`trichuris-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`trichuris-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#trichuris-bg-${tube.id})`} stroke="#b8a880" strokeWidth="1.2" />
        <g filter={`url(#trichuris-shadow-${tube.id})`}>
          {/* Barrel body */}
          <rect x="50" y="68" width="100" height="64" rx="22" fill={shell} fillOpacity="0.28" stroke={shell} strokeWidth="2.8" />
          {/* Inner content */}
          {isEmbryonated ? (
            <path d="M 88 82 C 110 85, 118 96, 108 108 C 98 120, 82 116, 82 104 C 82 92, 96 90, 104 100" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.58" strokeLinecap="round" />
          ) : (
            <ellipse cx="100" cy="100" rx="28" ry="22" fill={detail} fillOpacity="0.28" stroke={detail} strokeWidth="1" />
          )}
          {/* Left bipolar hyaline plug */}
          <ellipse cx="50" cy="100" rx="15" ry="13" fill="#f8f2d8" stroke={shell} strokeWidth="2" opacity="0.92" />
          {/* Right bipolar hyaline plug */}
          <ellipse cx="150" cy="100" rx="15" ry="13" fill="#f8f2d8" stroke={shell} strokeWidth="2" opacity="0.92" />
        </g>
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderPlasmodium(tube: TubeVisual) {
  const isRingForm = tube.id === 'A';
  const bg = tube.colors.slant;
  const rbc = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`plasmo-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`plasmo-rbc-${tube.id}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={rbc} stopOpacity="0.18" />
            <stop offset="100%" stopColor={rbc} stopOpacity="0.42" />
          </radialGradient>
          <filter id={`plasmo-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={rbc} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#plasmo-bg-${tube.id})`} stroke="#c0a8a0" strokeWidth="1.2" />
        {isRingForm ? (
          <g filter={`url(#plasmo-shadow-${tube.id})`}>
            {/* RBC */}
            <ellipse cx="100" cy="100" rx="66" ry="56" fill={`url(#plasmo-rbc-${tube.id})`} stroke={rbc} strokeWidth="2" />
            {/* Central pallor */}
            <ellipse cx="100" cy="100" rx="28" ry="24" fill={bg} fillOpacity="0.55" stroke="none" />
            {/* Ring 1 - accole at edge */}
            <circle cx="55" cy="80" r="10" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.85" />
            <circle cx="53" cy="77" r="3" fill={detail} opacity="0.85" />
            {/* Ring 2 - double chromatin */}
            <circle cx="138" cy="86" r="10" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.82" />
            <circle cx="134" cy="83" r="2.2" fill={detail} opacity="0.82" />
            <circle cx="141" cy="83" r="2.2" fill={detail} opacity="0.82" />
            {/* Ring 3 - accole at bottom edge */}
            <circle cx="88" cy="148" r="9" fill="none" stroke={detail} strokeWidth="2" opacity="0.75" />
            <circle cx="86" cy="146" r="2.5" fill={detail} opacity="0.75" />
          </g>
        ) : (
          <g filter={`url(#plasmo-shadow-${tube.id})`}>
            {/* Banana/crescent gametocyte */}
            <path d="M 62 108 C 64 66, 96 46, 134 62 C 162 76, 158 122, 134 140 C 106 158, 62 150, 62 108" fill={detail} fillOpacity="0.52" stroke={detail} strokeWidth="2.2" />
            {/* Highlight */}
            <path d="M 78 104 C 80 72, 98 58, 124 70 C 144 80, 142 118, 124 132 C 104 146, 80 142, 78 104" fill={rbc} fillOpacity="0.28" stroke="none" />
            {/* Nucleus */}
            <ellipse cx="100" cy="96" rx="11" ry="9" fill={detail} opacity="0.72" />
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderBabesia(tube: TubeVisual) {
  const isTetrad = tube.id === 'B';
  const bg = tube.colors.slant;
  const rbc = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`bab-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`bab-rbc-${tube.id}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={rbc} stopOpacity="0.18" />
            <stop offset="100%" stopColor={rbc} stopOpacity="0.40" />
          </radialGradient>
          <filter id={`bab-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={rbc} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#bab-bg-${tube.id})`} stroke="#c0a8a0" strokeWidth="1.2" />
        {isTetrad ? (
          <g filter={`url(#bab-shadow-${tube.id})`}>
            {/* RBC */}
            <ellipse cx="100" cy="100" rx="64" ry="54" fill={`url(#bab-rbc-${tube.id})`} stroke={rbc} strokeWidth="2" />
            <ellipse cx="100" cy="100" rx="26" ry="22" fill={bg} fillOpacity="0.5" stroke="none" />
            {/* Maltese cross tetrad - 4 pear-shaped merozoites */}
            <circle cx="100" cy="78" r="10" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.88" />
            <circle cx="100" cy="76" r="3" fill={detail} opacity="0.88" />
            <circle cx="100" cy="122" r="10" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.88" />
            <circle cx="100" cy="124" r="3" fill={detail} opacity="0.88" />
            <circle cx="78" cy="100" r="10" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.88" />
            <circle cx="76" cy="100" r="3" fill={detail} opacity="0.88" />
            <circle cx="122" cy="100" r="10" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.88" />
            <circle cx="124" cy="100" r="3" fill={detail} opacity="0.88" />
            {/* Cross lines connecting them */}
            <line x1="100" y1="88" x2="100" y2="112" stroke={detail} strokeWidth="1.2" opacity="0.4" />
            <line x1="88" y1="100" x2="112" y2="100" stroke={detail} strokeWidth="1.2" opacity="0.4" />
          </g>
        ) : (
          <g filter={`url(#bab-shadow-${tube.id})`}>
            {/* RBC with multiple small rings */}
            <ellipse cx="100" cy="100" rx="65" ry="55" fill={`url(#bab-rbc-${tube.id})`} stroke={rbc} strokeWidth="2" />
            <ellipse cx="100" cy="100" rx="27" ry="23" fill={bg} fillOpacity="0.5" stroke="none" />
            {/* Ring 1 */}
            <circle cx="70" cy="84" r="8" fill="none" stroke={detail} strokeWidth="2" opacity="0.85" />
            <circle cx="69" cy="82" r="2.2" fill={detail} opacity="0.85" />
            {/* Ring 2 */}
            <circle cx="128" cy="88" r="8" fill="none" stroke={detail} strokeWidth="2" opacity="0.82" />
            <circle cx="127" cy="86" r="2.2" fill={detail} opacity="0.82" />
            {/* Ring 3 */}
            <circle cx="82" cy="120" r="7" fill="none" stroke={detail} strokeWidth="2" opacity="0.78" />
            <circle cx="81" cy="118" r="2" fill={detail} opacity="0.78" />
            {/* Extracellular ring - outside RBC */}
            <circle cx="150" cy="140" r="7" fill="none" stroke={detail} strokeWidth="2" opacity="0.7" />
            <circle cx="149" cy="138" r="2" fill={detail} opacity="0.7" />
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTrypanosoma(tube: TubeVisual) {
  const isTrypomastigote = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`tryp-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`tryp-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={body} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#tryp-bg-${tube.id})`} stroke="#c0b0d0" strokeWidth="1.2" />
        {isTrypomastigote ? (
          <g filter={`url(#tryp-shadow-${tube.id})`}>
            {/* C-shaped body */}
            <path d="M 60 148 C 44 130, 44 80, 60 56 C 74 36, 100 30, 118 40 C 138 52, 148 72, 142 92" fill="none" stroke={body} strokeWidth="10" strokeLinecap="round" opacity="0.75" />
            <path d="M 60 148 C 44 130, 44 80, 60 56 C 74 36, 100 30, 118 40 C 138 52, 148 72, 142 92" fill="none" stroke={bg} strokeWidth="4" strokeLinecap="round" opacity="0.4" />
            {/* Undulating membrane */}
            <path d="M 62 144 C 50 126, 48 96, 56 72 C 62 56, 76 44, 96 38" fill="none" stroke={detail} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.55" />
            {/* Large posterior kinetoplast */}
            <ellipse cx="63" cy="148" rx="9" ry="7" fill={detail} opacity="0.82" />
            {/* Anterior free flagellum */}
            <path d="M 142 90 C 152 78, 162 64, 170 48" fill="none" stroke={detail} strokeWidth="2" opacity="0.65" strokeLinecap="round" />
            {/* Nucleus - mid body */}
            <ellipse cx="88" cy="96" rx="9" ry="7" fill={detail} fillOpacity="0.55" stroke={detail} strokeWidth="1" />
          </g>
        ) : (
          <g filter={`url(#tryp-shadow-${tube.id})`}>
            {/* Cell (macrophage outline) */}
            <ellipse cx="100" cy="100" rx="72" ry="62" fill={body} fillOpacity="0.12" stroke={body} strokeWidth="1.8" strokeDasharray="5 3" />
            {/* Amastigotes - small round cells with nucleus + kinetoplast */}
            {[
              [78, 80], [100, 78], [122, 80],
              [70, 100], [92, 100], [114, 100], [134, 100],
              [78, 120], [100, 120], [122, 120]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="8" fill={body} fillOpacity="0.28" stroke={detail} strokeWidth="1.2" />
                <circle cx={cx - 1} cy={cy - 1} r="2.2" fill={detail} opacity="0.75" />
                <rect x={cx + 2} y={cy + 1} width="5" height="2.5" rx="1" fill={detail} opacity="0.68" />
              </g>
            ))}
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderToxoplasma(tube: TubeVisual) {
  const isTachyzoite = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`toxo-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`toxo-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={body} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#toxo-bg-${tube.id})`} stroke="#c0b0d0" strokeWidth="1.2" />
        {isTachyzoite ? (
          <g filter={`url(#toxo-shadow-${tube.id})`}>
            {/* Crescent tachyzoites - group of 2-3 */}
            {/* Tachyzoite 1 */}
            <path d="M 70 88 C 74 72, 94 68, 108 76 C 120 84, 120 100, 108 106 C 94 112, 74 108, 70 92" fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="102" cy="96" rx="7" ry="5" fill={detail} opacity="0.72" />
            {/* Tachyzoite 2 - adjacent, slightly rotated */}
            <path d="M 82 116 C 86 100, 106 96, 120 104 C 132 112, 132 128, 120 134 C 106 140, 86 136, 82 120" fill={body} fillOpacity="0.50" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="114" cy="124" rx="7" ry="5" fill={detail} opacity="0.68" />
            {/* Tachyzoite 3 - partial */}
            <path d="M 48 96 C 52 82, 66 78, 74 86 C 80 94, 78 106, 70 108 C 60 110, 46 104, 48 98" fill={body} fillOpacity="0.42" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="66" cy="97" rx="5" ry="4" fill={detail} opacity="0.62" />
          </g>
        ) : (
          <g filter={`url(#toxo-shadow-${tube.id})`}>
            {/* Tissue cyst - large round with bradyzoites inside */}
            <circle cx="100" cy="100" rx="64" r="62" fill={bg} fillOpacity="0.4" stroke={detail} strokeWidth="2.5" />
            {/* Bradyzoites - small crescent shapes inside cyst */}
            {[
              [74, 80, 0], [94, 75, 15], [114, 80, -15], [130, 92, -30],
              [135, 110, -45], [122, 126, -55], [104, 132, 0], [84, 128, 20],
              [68, 115, 35], [65, 96, 45]
            ].map(([cx, cy, rot], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx="9" ry="4" fill={body} fillOpacity="0.48" stroke={detail} strokeWidth="1" transform={`rotate(${rot} ${cx} ${cy})`} />
            ))}
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderLeishmania(tube: TubeVisual) {
  const isAmastigote = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`leish-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`leish-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={body} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#leish-bg-${tube.id})`} stroke="#c0a898" strokeWidth="1.2" />
        {isAmastigote ? (
          <g filter={`url(#leish-shadow-${tube.id})`}>
            {/* Macrophage/Kupffer cell outline */}
            <ellipse cx="100" cy="100" rx="72" ry="65" fill={body} fillOpacity="0.14" stroke={body} strokeWidth="2" />
            {/* Host nucleus */}
            <ellipse cx="138" cy="72" rx="16" ry="12" fill={body} fillOpacity="0.25" stroke={body} strokeWidth="1.5" />
            {/* Amastigotes - small round with nucleus + kinetoplast */}
            {[
              [68, 80], [88, 80], [108, 80],
              [60, 100], [80, 100], [100, 100], [120, 100],
              [68, 120], [88, 120], [108, 120], [128, 120]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="8.5" fill={body} fillOpacity="0.30" stroke={detail} strokeWidth="1.2" />
                {/* Nucleus */}
                <circle cx={cx - 1} cy={cy - 1} r="2.8" fill={detail} opacity="0.78" />
                {/* Kinetoplast bar - perpendicular to nucleus */}
                <rect x={cx + 2} y={cy - 1} width="5.5" height="2.5" rx="1" fill={detail} opacity="0.72" />
              </g>
            ))}
          </g>
        ) : (
          <g filter={`url(#leish-shadow-${tube.id})`}>
            {/* Promastigote - elongated with anterior flagellum */}
            <path d="M 100 160 C 98 130, 96 100, 100 70 C 102 50, 104 36, 100 24" fill="none" stroke={body} strokeWidth="11" strokeLinecap="round" opacity="0.72" />
            <path d="M 100 160 C 98 130, 96 100, 100 70 C 102 50, 104 36, 100 24" fill="none" stroke={bg} strokeWidth="6" strokeLinecap="round" opacity="0.4" />
            {/* Anterior kinetoplast */}
            <ellipse cx="100" cy="62" rx="8" ry="6" fill={detail} opacity="0.78" />
            {/* Nucleus - mid-body */}
            <ellipse cx="100" cy="100" rx="9" ry="7" fill={detail} fillOpacity="0.55" stroke={detail} strokeWidth="1" />
            {/* Anterior flagellum */}
            <path d="M 100 24 C 108 14, 118 8, 128 4" fill="none" stroke={detail} strokeWidth="2" opacity="0.68" strokeLinecap="round" />
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderAscaris(tube: TubeVisual) {
  const isFertile = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  const bumps = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    return { cx: Math.round(100 + 55 * Math.cos(a)), cy: Math.round(100 + 65 * Math.sin(a)) };
  });
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`asc-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`asc-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#asc-bg-${tube.id})`} stroke="#c8b090" strokeWidth="1.2" />
        {isFertile ? (
          <g filter={`url(#asc-shadow-${tube.id})`}>
            {/* Mammillated (bumpy) outer coat */}
            {bumps.map((b, i) => (
              <circle key={i} cx={b.cx} cy={b.cy} r="6.5" fill={shell} fillOpacity="0.55" />
            ))}
            <ellipse cx="100" cy="100" rx="52" ry="62" fill={shell} fillOpacity="0.28" />
            {/* Inner shell - smooth, thick */}
            <ellipse cx="100" cy="100" rx="43" ry="53" fill={bg} fillOpacity="0.85" stroke={shell} strokeWidth="3" />
            {/* Unsegmented cell content */}
            <ellipse cx="100" cy="102" rx="33" ry="42" fill={shell} fillOpacity="0.28" stroke={detail} strokeWidth="1.2" />
            <ellipse cx="100" cy="103" rx="22" ry="30" fill={detail} fillOpacity="0.26" />
          </g>
        ) : (
          <g filter={`url(#asc-shadow-${tube.id})`}>
            {/* Decorticate / infertile - elongated oval, no outer coat */}
            <ellipse cx="100" cy="100" rx="42" ry="62" fill={shell} fillOpacity="0.18" stroke={shell} strokeWidth="2.5" />
            {/* Disorganized granular content */}
            <ellipse cx="84" cy="76" rx="14" ry="11" fill={detail} fillOpacity="0.26" stroke={detail} strokeWidth="1" />
            <ellipse cx="116" cy="88" rx="12" ry="9" fill={detail} fillOpacity="0.26" stroke={detail} strokeWidth="1" />
            <ellipse cx="88" cy="108" rx="15" ry="10" fill={detail} fillOpacity="0.24" stroke={detail} strokeWidth="1" />
            <ellipse cx="115" cy="120" rx="12" ry="11" fill={detail} fillOpacity="0.26" stroke={detail} strokeWidth="1" />
            <ellipse cx="97" cy="140" rx="11" ry="8" fill={detail} fillOpacity="0.22" stroke={detail} strokeWidth="1" />
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTrichostrongylus(tube: TubeVisual) {
  const isTss = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`tss-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`tss-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#tss-bg-${tube.id})`} stroke="#b8a888" strokeWidth="1.2" />
        {isTss ? (
          <g filter={`url(#tss-shadow-${tube.id})`}>
            {/* Trichostrongylus: elongated, asymmetric - one end tapered */}
            <path d="M 100 30 C 130 30, 152 52, 152 90 C 152 130, 134 162, 100 172 C 80 172, 58 152, 50 118 C 44 90, 54 50, 100 30 Z" fill={bg} fillOpacity="0.82" stroke={shell} strokeWidth="2.5" />
            <path d="M 100 40 C 126 40, 144 60, 144 92 C 144 128, 128 156, 100 164 C 82 164, 62 146, 56 116 C 50 90, 62 56, 100 40 Z" fill="none" stroke={shell} strokeWidth="1" strokeOpacity="0.4" />
            {/* Advanced morula - ~15 cells */}
            {([
              [90, 58], [110, 58],
              [76, 80], [96, 78], [116, 80],
              [72, 102], [92, 100], [112, 100], [130, 102],
              [76, 124], [96, 122], [116, 124],
              [84, 144], [104, 144], [120, 142]
            ] as [number, number][]).map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="11" fill={shell} fillOpacity="0.32" stroke={detail} strokeWidth="1" />
            ))}
          </g>
        ) : (
          <g filter={`url(#tss-shadow-${tube.id})`}>
            {/* Hookworm comparator: rounder oval, symmetric blunt ends */}
            <ellipse cx="100" cy="100" rx="50" ry="60" fill={bg} fillOpacity="0.82" stroke={shell} strokeWidth="2.5" />
            <ellipse cx="100" cy="100" rx="44" ry="54" fill="none" stroke={shell} strokeWidth="1" strokeOpacity="0.4" />
            {/* Early morula - 7 cells */}
            {([
              [88, 78], [112, 78],
              [80, 100], [100, 98], [120, 100],
              [88, 122], [112, 122]
            ] as [number, number][]).map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="12" fill={shell} fillOpacity="0.32" stroke={detail} strokeWidth="1" />
            ))}
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTrichinella(tube: TubeVisual) {
  const isSquash = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`trich-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`trich-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#trich-bg-${tube.id})`} stroke="#c0a880" strokeWidth="1.2" />
        {isSquash ? (
          <g filter={`url(#trich-shadow-${tube.id})`}>
            {/* Striated muscle fibers in background */}
            {[38, 54, 70, 86, 102, 118, 134, 150, 166].map(y => (
              <line key={y} x1="10" y1={y} x2="190" y2={y} stroke={shell} strokeWidth="0.8" strokeOpacity="0.28" />
            ))}
            {/* Nurse cell capsule - oval */}
            <ellipse cx="100" cy="100" rx="72" ry="38" fill={bg} fillOpacity="0.92" stroke={shell} strokeWidth="2.5" />
            <ellipse cx="100" cy="100" rx="66" ry="32" fill="none" stroke={shell} strokeWidth="1" strokeOpacity="0.3" />
            {/* Coiled larva inside */}
            <path d="M 40 96 C 58 78, 80 76, 96 88 C 112 100, 130 118, 152 106 C 158 102, 158 90, 152 84" fill="none" stroke={detail} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 40 96 C 58 78, 80 76, 96 88 C 112 100, 130 118, 152 106 C 158 102, 158 90, 152 84" fill="none" stroke={bg} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
          </g>
        ) : (
          <g filter={`url(#trich-shadow-${tube.id})`}>
            {/* H&E section: spindle capsule + inflammatory cells */}
            <ellipse cx="100" cy="100" rx="74" ry="36" fill={bg} fillOpacity="0.72" stroke={shell} strokeWidth="2" />
            <ellipse cx="100" cy="100" rx="66" ry="29" fill={bg} fillOpacity="0.85" stroke={shell} strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Coiled larva */}
            <path d="M 36 104 C 56 82, 80 80, 97 92 C 114 104, 134 120, 160 100 C 164 96, 162 86, 156 80" fill="none" stroke={detail} strokeWidth="5" strokeLinecap="round" />
            <path d="M 36 104 C 56 82, 80 80, 97 92 C 114 104, 134 120, 160 100 C 164 96, 162 86, 156 80" fill="none" stroke={bg} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
            {/* Inflammatory cells */}
            {([
              [100,65],[78,68],[122,68],[62,78],[138,78],
              [55,92],[145,92],[55,108],[145,108],
              [62,122],[138,122],[78,132],[122,132],[100,135]
            ] as [number,number][]).map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill={shell} fillOpacity="0.62" />
            ))}
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderMicrofilaria(tube: TubeVisual) {
  const isWb = tube.id === 'A';
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const wbNuclei: [number,number][] = [
    [22,152],[30,144],[40,136],[50,128],[61,120],
    [72,113],[83,106],[94,100],[106,94],[118,89],
    [130,85],[142,82],[154,80]
  ];
  const loaNuclei: [number,number][] = [
    [22,152],[30,144],[40,136],[50,128],[61,120],
    [72,113],[83,106],[94,100],[106,94],[118,89],
    [130,85],[142,82],[154,80],[163,76],[170,72],[177,67]
  ];
  const nuclei = isWb ? wbNuclei : loaNuclei;
  const wormPath = "M 16 156 C 38 136, 58 112, 88 96 C 118 80, 148 80, 178 64";
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`mf-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#mf-bg-${tube.id})`} stroke="#c8a898" strokeWidth="1.2" />
        {/* RBC background */}
        {([
          [35,42],[65,38],[95,44],[125,40],[155,46],
          [40,68],[70,72],[100,66],[130,70],[160,65],
          [35,96],[65,90],[95,98],[125,92],[155,100],
          [45,125],[75,130],[105,124],[135,128],[165,120],
          [50,155],[80,160],[110,154],[140,158],[170,152]
        ] as [number,number][]).map(([cx,cy],i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="13" ry="9" fill={body} fillOpacity="0.22" stroke={body} strokeWidth="0.5" strokeOpacity="0.28" />
        ))}
        {/* Sheath */}
        <path d={wormPath} fill="none" stroke={body} strokeWidth="14" strokeLinecap="round" strokeOpacity="0.32" />
        {/* Worm body */}
        <path d={wormPath} fill="none" stroke={detail} strokeWidth="7" strokeLinecap="round" />
        {/* Nuclei */}
        {nuclei.map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2.2" fill={bg} opacity="0.85" />
        ))}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTaeniaEgg(tube: TubeVisual) {
  const isEgg = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  const striations = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    return {
      x1: Math.round(100 + 35 * Math.cos(a)),
      y1: Math.round(100 + 35 * Math.sin(a)),
      x2: Math.round(100 + 52 * Math.cos(a)),
      y2: Math.round(100 + 52 * Math.sin(a))
    };
  });
  const hooklets = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return {
      x1: Math.round(100 + 8 * Math.cos(a)),
      y1: Math.round(100 + 8 * Math.sin(a)),
      x2: Math.round(100 + 22 * Math.cos(a)),
      y2: Math.round(100 + 22 * Math.sin(a))
    };
  });
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`tae-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`tae-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#tae-bg-${tube.id})`} stroke="#c0a870" strokeWidth="1.2" />
        {isEgg ? (
          <g filter={`url(#tae-shadow-${tube.id})`}>
            {/* Outer embryophore */}
            <circle cx="100" cy="100" r="52" fill={shell} fillOpacity="0.28" stroke={shell} strokeWidth="3.5" />
            {/* Radial striations */}
            {striations.map((s, i) => (
              <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={shell} strokeWidth="1.5" strokeOpacity="0.7" />
            ))}
            {/* Inner oncosphere */}
            <circle cx="100" cy="100" r="33" fill={bg} fillOpacity="0.88" stroke={shell} strokeWidth="2" />
            {/* 6 hooklets */}
            {hooklets.map((h, i) => (
              <line key={i} x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} stroke={detail} strokeWidth="1.8" strokeLinecap="round" />
            ))}
          </g>
        ) : (
          <g filter={`url(#tae-shadow-${tube.id})`}>
            {/* Gravid proglottid comparison */}
            <line x1="100" y1="28" x2="100" y2="172" stroke={shell} strokeWidth="1" strokeOpacity="0.45" strokeDasharray="4,3" />
            {/* T. saginata - left half */}
            <rect x="16" y="32" width="80" height="136" rx="4" fill={shell} fillOpacity="0.14" stroke={shell} strokeWidth="1.5" />
            <line x1="56" y1="32" x2="56" y2="168" stroke={detail} strokeWidth="2" />
            {[42,50,58,66,74,82,90,98,106,114,122,130,138,146,154,162].map((y,i) => (
              <g key={i}>
                <line x1="18" y1={y} x2="56" y2={y} stroke={detail} strokeWidth="1" strokeOpacity="0.65" />
                <line x1="56" y1={y} x2="94" y2={y} stroke={detail} strokeWidth="1" strokeOpacity="0.65" />
              </g>
            ))}
            {/* T. solium - right half */}
            <rect x="104" y="32" width="80" height="136" rx="4" fill={shell} fillOpacity="0.14" stroke={shell} strokeWidth="1.5" />
            <line x1="144" y1="32" x2="144" y2="168" stroke={detail} strokeWidth="2" />
            {[48,62,76,90,104,118,132,146,160].map((y,i) => (
              <g key={i}>
                <line x1="106" y1={y} x2="144" y2={y} stroke={detail} strokeWidth="1.8" strokeOpacity="0.65" />
                <line x1="144" y1={y} x2="182" y2={y} stroke={detail} strokeWidth="1.8" strokeOpacity="0.65" />
              </g>
            ))}
            {/* Labels */}
            <text x="56" y="24" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif" fontWeight="bold">T. saginata {'>'}13</text>
            <text x="144" y="24" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif" fontWeight="bold">T. solium 8-13</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderParagonimus(tube: TubeVisual) {
  const isPara = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`par-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`par-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#par-bg-${tube.id})`} stroke="#c0a870" strokeWidth="1.2" />
        {isPara ? (
          <g filter={`url(#par-shadow-${tube.id})`}>
            {/* Paragonimus: large ovoid, shouldered operculum */}
            <ellipse cx="100" cy="108" rx="48" ry="62" fill={shell} fillOpacity="0.20" stroke={shell} strokeWidth="3" />
            {/* Shoulder rim at opercular end */}
            <ellipse cx="100" cy="52" rx="42" ry="8" fill={shell} fillOpacity="0.45" stroke={shell} strokeWidth="2" />
            {/* Operculum cap */}
            <ellipse cx="100" cy="42" rx="28" ry="10" fill={bg} fillOpacity="0.88" stroke={shell} strokeWidth="2" />
            {/* Thickened abopercular wall */}
            <ellipse cx="100" cy="166" rx="42" ry="9" fill={shell} fillOpacity="0.38" stroke={shell} strokeWidth="2" />
            {/* Unembryonated granular content */}
            <ellipse cx="100" cy="110" rx="36" ry="48" fill={shell} fillOpacity="0.18" stroke={detail} strokeWidth="1" />
          </g>
        ) : (
          <g filter={`url(#par-shadow-${tube.id})`}>
            {/* Clonorchis: tiny flask-shaped, prominent opercular shoulders */}
            <path d="M 100 44 C 122 44, 138 62, 138 84 C 138 114, 122 146, 100 154 C 78 146, 62 114, 62 84 C 62 62, 78 44, 100 44 Z" fill={shell} fillOpacity="0.20" stroke={shell} strokeWidth="2.5" />
            {/* Prominent opercular shoulder bumps */}
            <ellipse cx="84" cy="56" rx="12" ry="7" fill={shell} fillOpacity="0.5" stroke={shell} strokeWidth="1.8" />
            <ellipse cx="116" cy="56" rx="12" ry="7" fill={shell} fillOpacity="0.5" stroke={shell} strokeWidth="1.8" />
            {/* Operculum cap */}
            <ellipse cx="100" cy="46" rx="20" ry="9" fill={bg} fillOpacity="0.9" stroke={shell} strokeWidth="2" />
            {/* Abopercular knob */}
            <ellipse cx="100" cy="153" rx="11" ry="6" fill={shell} fillOpacity="0.6" stroke={shell} strokeWidth="1.5" />
            {/* Embryonated inner content */}
            <ellipse cx="100" cy="102" rx="30" ry="42" fill={detail} fillOpacity="0.18" stroke={detail} strokeWidth="1" />
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderSchistosoma(tube: TubeVisual) {
  const isMansoni = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`sch-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`sch-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#sch-bg-${tube.id})`} stroke="#c0a870" strokeWidth="1.2" />
        {isMansoni ? (
          <g filter={`url(#sch-shadow-${tube.id})`}>
            {/* S. mansoni: large elongated egg, prominent lateral spine */}
            <ellipse cx="100" cy="100" rx="45" ry="62" fill={shell} fillOpacity="0.20" stroke={shell} strokeWidth="2.5" />
            {/* Embryonated inner content */}
            <ellipse cx="100" cy="100" rx="36" ry="54" fill={shell} fillOpacity="0.16" stroke={detail} strokeWidth="1" />
            {/* Prominent lateral spine - pointing to the right at mid-posterior */}
            <path d="M 145 118 L 172 108 L 145 102 Z" fill={shell} fillOpacity="0.7" stroke={shell} strokeWidth="1.5" />
            {/* Spine junction */}
            <path d="M 144 110 L 144 110" fill="none" stroke={shell} strokeWidth="1" />
          </g>
        ) : (
          <g filter={`url(#sch-shadow-${tube.id})`}>
            {/* S. haematobium: elongated egg, terminal spine at one end */}
            <ellipse cx="100" cy="100" rx="40" ry="58" fill={shell} fillOpacity="0.20" stroke={shell} strokeWidth="2.5" />
            {/* Embryonated inner content */}
            <ellipse cx="100" cy="100" rx="32" ry="50" fill={shell} fillOpacity="0.16" stroke={detail} strokeWidth="1" />
            {/* Terminal spine - at the bottom pole */}
            <path d="M 92 158 L 100 182 L 108 158 Z" fill={shell} fillOpacity="0.7" stroke={shell} strokeWidth="1.5" />
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderHymenolepis(tube: TubeVisual) {
  const isNana = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  const hooklets = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    const r = isNana ? 18 : 22;
    return {
      x1: Math.round(100 + 8 * Math.cos(a)),
      y1: Math.round(100 + 8 * Math.sin(a)),
      x2: Math.round(100 + r * Math.cos(a)),
      y2: Math.round(100 + r * Math.sin(a))
    };
  });
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`hym-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`hym-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#hym-bg-${tube.id})`} stroke="#c0a870" strokeWidth="1.2" />
        <g filter={`url(#hym-shadow-${tube.id})`}>
          {/* Outer shell */}
          <circle cx="100" cy="100" r={isNana ? 48 : 60} fill={shell} fillOpacity="0.18" stroke={shell} strokeWidth={isNana ? 2 : 3} />
          {/* Inner oncosphere */}
          <circle cx="100" cy="100" r={isNana ? 28 : 38} fill={bg} fillOpacity="0.88" stroke={shell} strokeWidth="2" />
          {/* Hooklets inside oncosphere */}
          {hooklets.map((h, i) => (
            <line key={i} x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} stroke={detail} strokeWidth="1.8" strokeLinecap="round" />
          ))}
          {isNana && (
            /* Polar filaments - 4 thread-like filaments from each pole of oncosphere */
            <>
              {/* Top pole filaments */}
              <line x1="96" y1="72" x2="92" y2="52" stroke={detail} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
              <line x1="100" y1="72" x2="100" y2="52" stroke={detail} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
              <line x1="104" y1="72" x2="108" y2="52" stroke={detail} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
              <line x1="107" y1="74" x2="114" y2="55" stroke={detail} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />
              {/* Bottom pole filaments */}
              <line x1="96" y1="128" x2="92" y2="148" stroke={detail} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
              <line x1="100" y1="128" x2="100" y2="148" stroke={detail} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
              <line x1="104" y1="128" x2="108" y2="148" stroke={detail} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
              <line x1="107" y1="126" x2="114" y2="145" stroke={detail} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />
            </>
          )}
        </g>
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderDiphyllobothrium(tube: TubeVisual) {
  const isDlatum = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`dip-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`dip-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#dip-bg-${tube.id})`} stroke="#c0a870" strokeWidth="1.2" />
        {isDlatum ? (
          <g filter={`url(#dip-shadow-${tube.id})`}>
            {/* D. latum: broadly oval egg, smooth opercular rim, abopercular knob */}
            <ellipse cx="100" cy="100" rx="50" ry="62" fill={shell} fillOpacity="0.20" stroke={shell} strokeWidth="2.5" />
            {/* Smooth opercular rim at top - no shoulder (just flat) */}
            <ellipse cx="100" cy="40" rx="32" ry="8" fill={bg} fillOpacity="0.92" stroke={shell} strokeWidth="2" />
            {/* Unembryonated interior */}
            <ellipse cx="100" cy="108" rx="38" ry="46" fill={shell} fillOpacity="0.15" stroke={detail} strokeWidth="1" />
            {/* Abopercular knob - small button at bottom */}
            <ellipse cx="100" cy="162" rx="12" ry="6" fill={shell} fillOpacity="0.65" stroke={shell} strokeWidth="1.5" />
          </g>
        ) : (
          <g filter={`url(#dip-shadow-${tube.id})`}>
            {/* Comparison card - draw 2 mini eggs for comparison */}
            {/* Left mini: Paragonimus (shouldered, larger) */}
            <ellipse cx="62" cy="95" rx="30" ry="38" fill={shell} fillOpacity="0.18" stroke={shell} strokeWidth="2" />
            <ellipse cx="62" cy="59" rx="26" ry="5" fill={shell} fillOpacity="0.42" stroke={shell} strokeWidth="1.5" />
            <ellipse cx="62" cy="53" rx="17" ry="7" fill={bg} fillOpacity="0.88" stroke={shell} strokeWidth="1.5" />
            <ellipse cx="62" cy="130" rx="25" ry="6" fill={shell} fillOpacity="0.35" stroke={shell} strokeWidth="1.5" />
            <text x="62" y="148" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif" fontWeight="bold">Paragoni.</text>
            <text x="62" y="157" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif">shouldered</text>
            {/* Right mini: Fasciola (largest, no shoulder, no knob) */}
            <ellipse cx="142" cy="90" rx="32" ry="48" fill={shell} fillOpacity="0.18" stroke={shell} strokeWidth="2" />
            <ellipse cx="142" cy="44" rx="18" ry="7" fill={bg} fillOpacity="0.88" stroke={shell} strokeWidth="1.5" />
            <text x="142" y="150" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif" fontWeight="bold">Fasciola</text>
            <text x="142" y="159" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif">largest, no spine</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderEchinococcus(tube: TubeVisual) {
  const isProtoscolex = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`ech-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`ech-shadow-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={shell} floodOpacity="0.22" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#ech-bg-${tube.id})`} stroke="#b8a880" strokeWidth="1.2" />
        {isProtoscolex ? (
          <g filter={`url(#ech-shadow-${tube.id})`}>
            {/* Protoscolex: oval body, 4 suckers, rostellar hooks */}
            {/* Main body */}
            <ellipse cx="100" cy="100" rx="52" ry="62" fill={shell} fillOpacity="0.22" stroke={shell} strokeWidth="2.5" />
            {/* Rostellum at top */}
            <ellipse cx="100" cy="50" rx="22" ry="14" fill={shell} fillOpacity="0.35" stroke={shell} strokeWidth="1.8" />
            {/* 2 rows of hooks on rostellum */}
            {[
              [84,42],[92,38],[100,36],[108,38],[116,42],
              [82,52],[91,48],[100,47],[109,48],[118,52]
            ].map(([cx,cy],i) => (
              <ellipse key={i} cx={cx} cy={cy} rx="3" ry="4.5" fill={detail} fillOpacity="0.7" stroke={detail} strokeWidth="0.5" />
            ))}
            {/* 4 suckers - positioned around the body */}
            {[
              [56, 80], [144, 80], [56, 120], [144, 120]
            ].map(([cx,cy],i) => (
              <g key={i}>
                <ellipse cx={cx} cy={cy} rx="14" ry="11" fill={bg} fillOpacity="0.88" stroke={shell} strokeWidth="2" />
                <ellipse cx={cx} cy={cy} rx="8" ry="6" fill={shell} fillOpacity="0.35" stroke={shell} strokeWidth="1" />
              </g>
            ))}
            {/* Free hooklet */}
            <path d="M 100 155 C 108 150, 118 152, 120 160 C 122 168, 115 172, 108 170" fill="none" stroke={detail} strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : (
          <g filter={`url(#ech-shadow-${tube.id})`}>
            {/* Laminated cyst wall cross-section */}
            {/* Outer fibrous pericyst (host-derived) */}
            <rect x="15" y="30" width="170" height="140" rx="8" fill={shell} fillOpacity="0.12" stroke={shell} strokeWidth="1.5" />
            {/* Laminated layer - multiple wavy eosinophilic layers */}
            {[0,1,2,3,4,5,6].map(n => (
              <path key={n} d={`M 20 ${70+n*8} C 60 ${65+n*8}, 100 ${75+n*8}, 140 ${67+n*8} C 160 ${63+n*8}, 175 ${70+n*8}, 180 ${68+n*8}`} fill="none" stroke={shell} strokeWidth="1.8" strokeOpacity="0.75" />
            ))}
            <rect x="18" y="62" width="164" height="62" rx="4" fill={shell} fillOpacity="0.15" stroke={shell} strokeWidth="2.5" />
            {/* Germinal layer - thin inner nucleated layer */}
            <rect x="18" y="124" width="164" height="18" rx="2" fill={detail} fillOpacity="0.20" stroke={detail} strokeWidth="1.5" />
            {/* Nuclei in germinal layer */}
            {[30,55,80,105,130,155,170].map((x,i) => (
              <circle key={i} cx={x} cy={132} r="4" fill={detail} fillOpacity="0.55" />
            ))}
            {/* Labels */}
            <text x="100" y="55" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Laminated (acellular) layer</text>
            <text x="100" y="151" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Germinal (nucleated) layer</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderPlasmodiumPanel(tube: TubeVisual) {
  const isVivax = tube.id === 'A';
  const bg = tube.colors.slant;
  const rbc = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`pmp-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`pmp-rbc-${tube.id}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={rbc} stopOpacity="0.22" />
            <stop offset="100%" stopColor={rbc} stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#pmp-bg-${tube.id})`} stroke="#c0a890" strokeWidth="1.2" />
        {isVivax ? (
          <g>
            {/* P. vivax: enlarged RBC with Schuffner dots */}
            <ellipse cx="100" cy="96" rx="72" ry="62" fill={`url(#pmp-rbc-${tube.id})`} stroke={rbc} strokeWidth="2.5" />
            {/* central pallor */}
            <ellipse cx="100" cy="96" rx="30" ry="24" fill={bg} fillOpacity="0.4" />
            {/* Schuffner dots - stippling pattern */}
            {[
              [58,70],[72,62],[90,60],[110,62],[126,70],[138,82],
              [60,84],[74,78],[92,75],[112,74],[130,80],[140,92],
              [56,100],[70,96],[88,94],[115,94],[134,98],[142,108],
              [62,112],[78,108],[96,106],[118,106],[136,112],[140,122],
              [70,122],[86,120],[102,118],[120,118],[132,124],
              [80,132],[96,130],[114,130],[126,134]
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2" fill={detail} fillOpacity="0.55" />
            ))}
            {/* Ameboid trophozoite - irregular ring shape */}
            <path d="M 92 78 C 86 72, 82 78, 84 86 C 80 92, 76 96, 82 100 C 86 104, 92 100, 94 96 C 98 104, 106 102, 108 96 C 112 90, 108 80, 102 78 C 100 72, 96 72, 92 78" fill="none" stroke={detail} strokeWidth="2.2" opacity="0.85" />
            <circle cx="90" cy="80" r="3" fill={detail} opacity="0.9" />
            {/* Label: enlarged */}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Enlarged RBC</text>
            <text x="100" y="182" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">+ Schüffner dots</text>
          </g>
        ) : (
          <g>
            {/* P. malariae: normal RBC with band-form trophozoite */}
            <ellipse cx="100" cy="96" rx="58" ry="50" fill={`url(#pmp-rbc-${tube.id})`} stroke={rbc} strokeWidth="2" />
            {/* central pallor */}
            <ellipse cx="100" cy="96" rx="24" ry="20" fill={bg} fillOpacity="0.38" />
            {/* Band-form trophozoite - crosses full RBC width */}
            <path d="M 48 90 L 152 104" stroke={detail} strokeWidth="6" strokeLinecap="round" opacity="0.75" />
            <path d="M 52 88 L 148 102" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
            {/* Chromatin dot */}
            <circle cx="66" cy="91" r="4" fill={detail} opacity="0.9" />
            {/* Label */}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Normal RBC</text>
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">Band-form trophozoite</text>
            <text x="100" y="182" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">(P. malariae)</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderCyclosporaCystoisospora(tube: TubeVisual) {
  const isCyclospora = tube.id === 'A';
  const bg = tube.colors.slant;
  const fill = tube.colors.butt;
  const edge = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`cyc-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.6" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#cyc-bg-${tube.id})`} stroke="#b0b8a0" strokeWidth="1.2" />
        {isCyclospora ? (
          <g>
            {/* Cyclospora: small round oocysts, variable staining - bright, medium, ghost */}
            {/* Bright staining oocyst */}
            <circle cx="72" cy="80" r="16" fill={fill} fillOpacity="0.9" stroke={edge} strokeWidth="2" />
            <circle cx="72" cy="80" r="8" fill="#ffffff" fillOpacity="0.3" stroke="none" />
            {/* Medium staining */}
            <circle cx="114" cy="72" r="15" fill={fill} fillOpacity="0.55" stroke={edge} strokeWidth="1.8" />
            <circle cx="114" cy="72" r="7" fill="#ffffff" fillOpacity="0.25" stroke="none" />
            {/* Ghost oocyst */}
            <circle cx="144" cy="108" r="15" fill={fill} fillOpacity="0.18" stroke={edge} strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Another bright */}
            <circle cx="78" cy="126" r="16" fill={fill} fillOpacity="0.85" stroke={edge} strokeWidth="2" />
            <circle cx="78" cy="126" r="8" fill="#ffffff" fillOpacity="0.28" stroke="none" />
            {/* Faint */}
            <circle cx="120" cy="120" r="14" fill={fill} fillOpacity="0.35" stroke={edge} strokeWidth="1.5" />
            {/* Size label */}
            <line x1="56" y1="110" x2="88" y2="110" stroke={edge} strokeWidth="1" opacity="0.5" />
            <text x="72" y="107" textAnchor="middle" fill={edge} fontSize="7" fontFamily="sans-serif">8-10 um</text>
            {/* Variable staining label */}
            <text x="100" y="162" textAnchor="middle" fill={edge} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Variable acid-fast staining</text>
            <text x="100" y="172" textAnchor="middle" fill={edge} fontSize="7" fontFamily="sans-serif">{'bright -> ghost on same slide'}</text>
          </g>
        ) : (
          <g>
            {/* Cystoisospora: elongated oval oocyst, much larger */}
            {/* Main oocyst body - elongated */}
            <ellipse cx="100" cy="96" rx="40" ry="58" fill={fill} fillOpacity="0.72" stroke={edge} strokeWidth="2.5" />
            {/* Highlight */}
            <ellipse cx="85" cy="76" rx="16" ry="24" fill="#ffffff" fillOpacity="0.25" stroke="none" />
            {/* Single sporoblast inside */}
            <ellipse cx="100" cy="96" rx="24" ry="34" fill={edge} fillOpacity="0.28" stroke={edge} strokeWidth="1.5" />
            {/* Central mass of sporoblast */}
            <ellipse cx="100" cy="96" rx="14" ry="20" fill={edge} fillOpacity="0.45" />
            {/* Size annotation */}
            <line x1="142" y1="38" x2="142" y2="154" stroke={edge} strokeWidth="1" opacity="0.5" />
            <line x1="138" y1="38" x2="146" y2="38" stroke={edge} strokeWidth="1" opacity="0.5" />
            <line x1="138" y1="154" x2="146" y2="154" stroke={edge} strokeWidth="1" opacity="0.5" />
            <text x="158" y="96" textAnchor="middle" fill={edge} fontSize="7" fontFamily="sans-serif" transform="rotate(90 158 96)">25-30 um</text>
            <text x="100" y="168" textAnchor="middle" fill={edge} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Elongated oval</text>
            <text x="100" y="178" textAnchor="middle" fill={edge} fontSize="7" fontFamily="sans-serif">Single sporoblast (immature)</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={edge} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderEntamoebaPanel(tube: TubeVisual) {
  const isHistolytica = tube.id === 'A';
  const bg = tube.colors.slant;
  const cystFill = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`ep-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.55" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#ep-bg-${tube.id})`} stroke="#b8b0a0" strokeWidth="1.2" />
        {isHistolytica ? (
          <g>
            {/* E. histolytica: round cyst, 4 nuclei, central karyosome, blunt chromatoid bars */}
            <circle cx="100" cy="96" r="56" fill={cystFill} fillOpacity="0.28" stroke={cystFill} strokeWidth="2.8" />
            {/* Cyst wall highlight */}
            <path d="M 58 74 C 68 58, 90 50, 108 55" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
            {/* 4 nuclei with CENTRAL karyosome */}
            {[[76,76],[124,76],[76,116],[124,116]].map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="12" fill="#ffffff" fillOpacity="0.25" stroke={detail} strokeWidth="1.8" />
                <circle cx={cx} cy={cy} r="4.5" fill={detail} opacity="0.9" />
              </g>
            ))}
            {/* Blunt chromatoid bar */}
            <rect x="84" y="92" width="32" height="8" rx="4" fill={detail} opacity="0.7" />
            <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">4 nuclei - central karyosome</text>
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">blunt chromatoid bars</text>
          </g>
        ) : (
          <g>
            {/* E. coli: larger cyst, up to 8 nuclei, ECCENTRIC karyosome, splintered chromatoids */}
            <circle cx="100" cy="96" r="60" fill={cystFill} fillOpacity="0.25" stroke={cystFill} strokeWidth="2.5" />
            <path d="M 56 74 C 66 58, 88 50, 108 54" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.28" strokeLinecap="round" />
            {/* 8 nuclei with ECCENTRIC karyosome (dot off-center) */}
            {[
              [72,68],[100,58],[128,68],
              [142,96],[128,124],[100,134],[72,124],[58,96]
            ].map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="10" fill="#ffffff" fillOpacity="0.22" stroke={detail} strokeWidth="1.5" />
                {/* eccentric karyosome - off-center dot */}
                <circle cx={cx+4} cy={cy-3} r="3.5" fill={detail} opacity="0.85" />
              </g>
            ))}
            {/* Splintered chromatoid bars - irregular pointed ends */}
            <path d="M 82 95 L 100 91 L 118 97" fill="none" stroke={detail} strokeWidth="3" strokeLinecap="square" opacity="0.65" />
            <path d="M 84 103 L 100 99 L 116 105" fill="none" stroke={detail} strokeWidth="2.5" strokeLinecap="square" opacity="0.55" />
            <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">{'<=8 nuclei - eccentric karyosome'}</text>
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">splintered chromatoid bars</text>
          </g>
        )}
        <text x="100" y="193" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderOperculated(tube: TubeVisual) {
  const isSizePanel = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`op-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#op-bg-${tube.id})`} stroke="#c0b080" strokeWidth="1.2" />
        {isSizePanel ? (
          <g>
            {/* Size comparison panel: 4 eggs side by side, left to right = smallest to largest */}
            {/* Clonorchis ~30um - tiny flask */}
            <ellipse cx="38" cy="100" rx="8" ry="12" fill={shell} fillOpacity="0.7" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="38" cy="88" rx="10" ry="4" fill={shell} fillOpacity="0.5" stroke={detail} strokeWidth="1" />
            <rect x="33" y="86" width="10" height="3" rx="1" fill={detail} fillOpacity="0.5" />
            <circle cx="38" cy="113" r="2" fill={detail} opacity="0.6" />
            <text x="38" y="125" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Clonorchis</text>
            <text x="38" y="133" textAnchor="middle" fill={detail} fontSize="6" fontFamily="sans-serif">~30 um</text>
            {/* Diphyllobothrium ~65um */}
            <ellipse cx="82" cy="98" rx="13" ry="20" fill={shell} fillOpacity="0.68" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="82" cy="78" rx="15" ry="5" fill={shell} fillOpacity="0.45" stroke={detail} strokeWidth="1" />
            <rect x="76" y="75" width="12" height="4" rx="1.5" fill={detail} fillOpacity="0.45" />
            <circle cx="82" cy="119" r="3" fill={detail} opacity="0.65" />
            <text x="82" y="132" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Diphyllobothrium</text>
            <text x="82" y="140" textAnchor="middle" fill={detail} fontSize="6" fontFamily="sans-serif">~65 um</text>
            {/* Paragonimus ~90um */}
            <ellipse cx="130" cy="95" rx="18" ry="28" fill={shell} fillOpacity="0.75" stroke={detail} strokeWidth="2" />
            <ellipse cx="130" cy="67" rx="21" ry="7" fill={shell} fillOpacity="0.55" stroke={detail} strokeWidth="1.5" />
            <rect x="120" y="63" width="20" height="6" rx="2" fill={detail} fillOpacity="0.45" />
            <circle cx="130" cy="124" r="3.5" fill={detail} opacity="0.65" />
            <text x="130" y="138" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Paragonimus</text>
            <text x="130" y="146" textAnchor="middle" fill={detail} fontSize="6" fontFamily="sans-serif">~90 um</text>
            {/* Fasciola ~140um */}
            <ellipse cx="175" cy="90" rx="13" ry="42" fill={shell} fillOpacity="0.62" stroke={detail} strokeWidth="1.8" />
            <ellipse cx="175" cy="48" rx="15" ry="6" fill={shell} fillOpacity="0.42" stroke={detail} strokeWidth="1.2" />
            <rect x="168" y="44" width="14" height="5" rx="1.5" fill={detail} fillOpacity="0.38" />
            <text x="175" y="144" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Fasciola</text>
            <text x="175" y="152" textAnchor="middle" fill={detail} fontSize="6" fontFamily="sans-serif">~140 um</text>
            {/* Arrow / size ladder */}
            <line x1="22" y1="170" x2="188" y2="170" stroke={detail} strokeWidth="1.5" opacity="0.45" />
            <polygon points="188,166 188,174 195,170" fill={detail} opacity="0.45" />
            <text x="100" y="183" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">{'<- Smallest to Largest ->'}</text>
          </g>
        ) : (
          <g>
            {/* Diagnostic features panel */}
            {/* Shoulder rim detail */}
            <text x="100" y="28" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Key operculated egg features</text>
            {/* Clonorchis detail egg - flask with labeled shoulder rim */}
            <ellipse cx="52" cy="80" rx="10" ry="16" fill={shell} fillOpacity="0.65" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="52" cy="64" rx="13" ry="5" fill={shell} fillOpacity="0.45" stroke={detail} strokeWidth="1.2" />
            <rect x="42" y="61" width="20" height="5" rx="1.5" fill={detail} fillOpacity="0.5" />
            <circle cx="52" cy="97" r="2.5" fill={detail} opacity="0.6" />
            <line x1="65" y1="61" x2="85" y2="52" stroke={detail} strokeWidth="0.8" opacity="0.6" />
            <text x="88" y="51" fill={detail} fontSize="6.5" fontFamily="sans-serif">Shoulder rim</text>
            <line x1="52" y1="100" x2="52" y2="110" stroke={detail} strokeWidth="0.8" opacity="0.6" />
            <text x="36" y="118" fill={detail} fontSize="6" fontFamily="sans-serif">Knob</text>
            <text x="52" y="130" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Clonorchis ~30um</text>

            {/* Paragonimus egg - thick shell, shouldered operculum */}
            <ellipse cx="148" cy="82" rx="22" ry="32" fill={shell} fillOpacity="0.72" stroke={detail} strokeWidth="2.5" />
            <ellipse cx="148" cy="50" rx="26" ry="9" fill={shell} fillOpacity="0.55" stroke={detail} strokeWidth="2" />
            <rect x="124" y="45" width="48" height="9" rx="3" fill={detail} fillOpacity="0.4" />
            <circle cx="148" cy="115" r="4.5" fill={detail} opacity="0.65" />
            {/* thick shell highlight */}
            <path d="M 128 56 C 126 62, 125 70, 125 82" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
            <text x="148" y="130" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Paragonimus ~90um</text>
            <text x="148" y="139" textAnchor="middle" fill={detail} fontSize="6" fontFamily="sans-serif">Thick golden-brown shell</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderBlastocystis(tube: TubeVisual) {
  const isCentralBody = tube.id === 'A';
  const bg = tube.colors.slant;
  const cellFill = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`bla-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.55" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`bla-vac-${tube.id}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor={bg} stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#bla-bg-${tube.id})`} stroke="#b0b0a0" strokeWidth="1.2" />
        {isCentralBody ? (
          <g>
            {/* Central body form: large central vacuole, peripheral nuclei */}
            {/* Outer cell boundary */}
            <circle cx="100" cy="96" r="62" fill={cellFill} fillOpacity="0.2" stroke={cellFill} strokeWidth="2.5" />
            {/* Large central vacuole (~90% of cell) */}
            <circle cx="100" cy="96" r="52" fill={`url(#bla-vac-${tube.id})`} stroke={cellFill} strokeWidth="1.5" />
            {/* Thin peripheral cytoplasm */}
            <circle cx="100" cy="96" r="62" fill="none" stroke={cellFill} strokeWidth="8" opacity="0.2" />
            {/* 3-4 peripheral nuclei at margins */}
            {[[100,36],[152,76],[148,122],[62,130],[50,76]].slice(0,4).map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="8" fill={cellFill} fillOpacity="0.55" stroke={detail} strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r="3.5" fill={detail} opacity="0.8" />
              </g>
            ))}
            {/* Size range annotation */}
            <line x1="40" y1="158" x2="160" y2="158" stroke={detail} strokeWidth="1" opacity="0.5" />
            <line x1="40" y1="154" x2="40" y2="162" stroke={detail} strokeWidth="1" opacity="0.5" />
            <line x1="160" y1="154" x2="160" y2="162" stroke={detail} strokeWidth="1" opacity="0.5" />
            <text x="100" y="170" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif">6-40 um (variable)</text>
            <text x="100" y="181" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">Central vacuole ~90% of cell</text>
          </g>
        ) : (
          <g>
            {/* Granular form: granule-filled vacuole */}
            <circle cx="100" cy="96" r="60" fill={cellFill} fillOpacity="0.18" stroke={cellFill} strokeWidth="2.5" />
            {/* Granule-filled center */}
            <circle cx="100" cy="96" r="48" fill={cellFill} fillOpacity="0.25" stroke={cellFill} strokeWidth="1.5" />
            {/* Granules */}
            {[
              [88,80],[100,76],[112,80],[82,92],[94,88],[106,88],[118,92],
              [80,100],[92,96],[104,96],[116,100],[86,108],[100,106],[114,108],
              [90,116],[102,114],[112,112]
            ].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="3.5" fill={detail} fillOpacity="0.5" />
            ))}
            {/* Peripheral nuclei at margins */}
            {[[100,38],[150,72],[148,120],[62,126],[52,72]].slice(0,4).map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="8" fill={cellFill} fillOpacity="0.5" stroke={detail} strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r="3.5" fill={detail} opacity="0.8" />
              </g>
            ))}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Granular form</text>
            <text x="100" y="182" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">Granule-filled central area</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderDientamoeba(tube: TubeVisual) {
  const isBinucleate = tube.id === 'A';
  const bg = tube.colors.slant;
  const cellFill = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`die-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.55" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#die-bg-${tube.id})`} stroke="#a8b0a0" strokeWidth="1.2" />
        {isBinucleate ? (
          <g>
            {/* Binucleate trophozoite: ameboid body, 2 nuclei, fragmented chromatin */}
            {/* Cell body - ameboid shape */}
            <path d="M 100 46 C 128 44, 148 60, 152 82 C 158 100, 148 118, 136 128 C 122 140, 104 144, 86 138 C 66 132, 50 118, 48 98 C 46 76, 60 58, 80 50 Z" fill={cellFill} fillOpacity="0.28" stroke={cellFill} strokeWidth="2.2" />
            {/* Pseudopod extensions */}
            <path d="M 148 82 C 162 76, 172 68, 178 58" fill="none" stroke={cellFill} strokeWidth="6" strokeLinecap="round" opacity="0.3" />
            <path d="M 86 138 C 84 152, 80 162, 72 172" fill="none" stroke={cellFill} strokeWidth="5" strokeLinecap="round" opacity="0.25" />
            {/* Nucleus 1 - fragmented chromatin, NO karyosome */}
            <circle cx="82" cy="84" r="18" fill="#ffffff" fillOpacity="0.25" stroke={detail} strokeWidth="1.8" />
            {/* Chromatin granules (fragmented) */}
            {[[76,80],[82,75],[88,80],[84,87],[78,87]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="3.5" fill={detail} opacity="0.75" />
            ))}
            {/* Nucleus 2 - same pattern */}
            <circle cx="120" cy="100" r="18" fill="#ffffff" fillOpacity="0.25" stroke={detail} strokeWidth="1.8" />
            {[[114,96],[120,91],[126,96],[122,103],[116,103]].map(([cx,cy],i) => (
              <circle key={i+5} cx={cx} cy={cy} r="3.5" fill={detail} opacity="0.75" />
            ))}
            {/* No-karyosome annotation */}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">2 nuclei - fragmented chromatin</text>
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">No karyosome - No cyst stage</text>
            <text x="100" y="181" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">7-12 um</text>
          </g>
        ) : (
          <g>
            {/* No cyst stage panel - shows crossed-out cyst and reference trophozoite */}
            {/* Label panel */}
            <text x="100" y="40" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">No cyst stage exists</text>
            {/* Cross-out over generic cyst shape */}
            <circle cx="70" cy="100" r="36" fill={cellFill} fillOpacity="0.18" stroke={cellFill} strokeWidth="2" strokeDasharray="5,3" />
            <text x="70" y="88" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif">Cyst?</text>
            <line x1="40" y1="68" x2="100" y2="132" stroke="#c04040" strokeWidth="3" opacity="0.7" />
            <line x1="100" y1="68" x2="40" y2="132" stroke="#c04040" strokeWidth="3" opacity="0.7" />
            {/* Arrow to trophozoite-only */}
            <text x="140" y="88" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif">Only</text>
            <text x="140" y="100" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif">trophozoites</text>
            <text x="140" y="112" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif">in stool</text>
            <circle cx="140" cy="130" r="14" fill={cellFill} fillOpacity="0.3" stroke={detail} strokeWidth="1.5" />
            <circle cx="136" cy="126" r="5" fill={detail} fillOpacity="0.6" stroke={detail} strokeWidth="1" />
            <circle cx="146" cy="134" r="5" fill={detail} fillOpacity="0.6" stroke={detail} strokeWidth="1" />
            <text x="100" y="165" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif">Enterobius co-infection common</text>
            <text x="100" y="175" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">Recommend perianal tape prep</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderClonorchis(tube: TubeVisual) {
  const isEgg = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`clo-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#clo-bg-${tube.id})`} stroke="#c0a870" strokeWidth="1.2" />
        {isEgg ? (
          <g>
            {/* Clonorchis egg: flask shape, shoulder rim, abopercular knob */}
            {/* Egg body - flask/vase shape: wider at top (opercular end), tapered at bottom */}
            <path d="M 84 58 L 116 58 C 128 58, 136 68, 136 82 L 136 130 C 136 148, 120 160, 100 160 C 80 160, 64 148, 64 130 L 64 82 C 64 68, 72 58, 84 58 Z" fill={shell} fillOpacity="0.68" stroke={detail} strokeWidth="2.5" />
            {/* Shell highlight */}
            <path d="M 74 64 C 70 72, 68 82, 68 94" fill="none" stroke="#ffffff" strokeWidth="3.5" opacity="0.32" strokeLinecap="round" />
            {/* Opercular shoulder rim - raised thickening at top */}
            <rect x="62" y="56" width="76" height="10" rx="3" fill={detail} fillOpacity="0.55" />
            {/* Operculum - lid at top */}
            <ellipse cx="100" cy="52" rx="26" ry="8" fill={shell} fillOpacity="0.7" stroke={detail} strokeWidth="2" />
            <path d="M 78 52 C 86 46, 114 46, 122 52" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
            {/* Abopercular knob at bottom */}
            <ellipse cx="100" cy="164" rx="8" ry="5" fill={detail} fillOpacity="0.7" stroke={detail} strokeWidth="1.5" />
            {/* Miracidium inside */}
            <ellipse cx="100" cy="112" rx="22" ry="36" fill={detail} fillOpacity="0.2" stroke={detail} strokeWidth="1" />
            {/* Annotations */}
            <line x1="138" y1="60" x2="162" y2="48" stroke={detail} strokeWidth="0.8" opacity="0.65" />
            <text x="164" y="46" fill={detail} fontSize="7" fontFamily="sans-serif">Shoulder rim</text>
            <line x1="138" y1="56" x2="162" y2="38" stroke={detail} strokeWidth="0.8" opacity="0.65" />
            <text x="164" y="36" fill={detail} fontSize="7" fontFamily="sans-serif">Operculum</text>
            <line x1="108" y1="167" x2="140" y2="175" stroke={detail} strokeWidth="0.8" opacity="0.65" />
            <text x="142" y="178" fill={detail} fontSize="7" fontFamily="sans-serif">Knob</text>
            <text x="100" y="26" textAnchor="middle" fill={detail} fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">~28-35 um</text>
          </g>
        ) : (
          <g>
            {/* Size comparator: Clonorchis (small) vs Diphyllobothrium (larger) */}
            <text x="100" y="26" textAnchor="middle" fill={detail} fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">Size comparison</text>
            {/* Clonorchis - small flask */}
            <path d="M 58 52 L 78 52 C 86 52, 90 60, 90 70 L 90 104 C 90 116, 82 122, 68 122 C 54 122, 46 116, 46 104 L 46 70 C 46 60, 50 52, 58 52 Z" fill={shell} fillOpacity="0.65" stroke={detail} strokeWidth="2" />
            <rect x="44" y="49" width="48" height="7" rx="2" fill={detail} fillOpacity="0.5" />
            <ellipse cx="68" cy="45" rx="16" ry="6" fill={shell} fillOpacity="0.6" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="68" cy="125" rx="5" ry="3" fill={detail} fillOpacity="0.65" />
            <text x="68" y="138" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif" fontWeight="bold">Clonorchis</text>
            <text x="68" y="147" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif">~30 um</text>
            {/* Diphyllobothrium - larger oval */}
            <path d="M 122 38 L 154 38 C 168 38, 178 52, 178 68 L 178 120 C 178 140, 166 152, 148 152 C 130 152, 118 140, 118 120 L 118 68 C 118 52, 122 38, 130 38 Z" fill={shell} fillOpacity="0.55" stroke={detail} strokeWidth="2" />
            <rect x="116" y="34" width="64" height="9" rx="2.5" fill={detail} fillOpacity="0.45" />
            <ellipse cx="148" cy="29" rx="22" ry="8" fill={shell} fillOpacity="0.55" stroke={detail} strokeWidth="1.5" />
            <ellipse cx="148" cy="157" rx="8" ry="5" fill={detail} fillOpacity="0.65" />
            <text x="148" y="169" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif" fontWeight="bold">Diphyllobothrium</text>
            <text x="148" y="178" textAnchor="middle" fill={detail} fontSize="6.5" fontFamily="sans-serif">~65 um</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderFasciola(tube: TubeVisual) {
  const isFasciola = tube.id === 'A';
  const bg = tube.colors.slant;
  const shell = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`fas-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#fas-bg-${tube.id})`} stroke="#c0a860" strokeWidth="1.2" />
        {/* Both panels show essentially identical large egg - annotations differ */}
        {/* Large oval operculated egg ~140um */}
        <ellipse cx="100" cy="96" rx="46" ry="64" fill={shell} fillOpacity="0.58" stroke={detail} strokeWidth="2.5" />
        {/* Thin shell highlight */}
        <path d="M 62 64 C 58 72, 55 82, 55 96" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.28" strokeLinecap="round" />
        {/* Opercular shoulder at top */}
        <rect x="52" y="28" width="96" height="10" rx="3" fill={detail} fillOpacity="0.45" />
        {/* Operculum */}
        <ellipse cx="100" cy="24" rx="34" ry="9" fill={shell} fillOpacity="0.65" stroke={detail} strokeWidth="2" />
        {/* Interior - vitelline cells */}
        {[
          [86,60],[100,55],[114,60],[78,72],[92,68],[108,68],[122,72],
          [82,84],[96,80],[110,80],[124,86],[80,96],[94,92],[110,92],[126,96],
          [84,108],[98,104],[114,104],[78,118],[94,116],[108,118],[122,116],
          [88,128],[100,126],[112,128]
        ].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={detail} fillOpacity="0.3" />
        ))}
        {/* Annotation: thin shell */}
        <line x1="146" y1="60" x2="170" y2="50" stroke={detail} strokeWidth="0.8" opacity="0.6" />
        <text x="172" y="48" fill={detail} fontSize="7" fontFamily="sans-serif">Thin shell</text>
        <line x1="134" y1="24" x2="170" y2="30" stroke={detail} strokeWidth="0.8" opacity="0.6" />
        <text x="172" y="33" fill={detail} fontSize="7" fontFamily="sans-serif">Operculum</text>
        {isFasciola ? (
          <g>
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Fasciola hepatica</text>
            <text x="100" y="181" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">Liver/biliary disease - eosinophilia</text>
          </g>
        ) : (
          <g>
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Fasciolopsis buski</text>
            <text x="100" y="181" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">Intestinal disease - SE Asia</text>
          </g>
        )}
        <text x="100" y="18" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">~130-150 um - Morphologically identical</text>
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderDipylidium(tube: TubeVisual) {
  const isEggPacket = tube.id === 'A';
  const bg = tube.colors.slant;
  const fill = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`dip-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#dip-bg-${tube.id})`} stroke="#b8a868" strokeWidth="1.2" />
        {isEggPacket ? (
          <g>
            {/* Egg capsule: outer membrane containing multiple oncospheres */}
            {/* Outer capsule membrane */}
            <ellipse cx="100" cy="96" rx="66" ry="58" fill={fill} fillOpacity="0.18" stroke={fill} strokeWidth="2.5" strokeDasharray="6,3" />
            {/* Oncospheres inside - arranged in a cluster */}
            {[
              [80,70],[100,64],[120,70],[68,86],[86,82],[102,80],[118,82],[134,88],
              [64,100],[80,96],[98,94],[116,94],[132,100],[146,98],
              [68,114],[84,110],[100,108],[116,110],[132,114],
              [78,124],[96,122],[112,122],[126,124]
            ].slice(0,18).map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="10" fill={fill} fillOpacity="0.55" stroke={detail} strokeWidth="1.5" />
                {/* 3 hooklets inside each oncosphere */}
                <line x1={cx-4} y1={cy} x2={cx+4} y2={cy-6} stroke={detail} strokeWidth="1" opacity="0.5" />
                <line x1={cx} y1={cy-2} x2={cx+5} y2={cy+4} stroke={detail} strokeWidth="1" opacity="0.5" />
                <line x1={cx-3} y1={cy+4} x2={cx+2} y2={cy-4} stroke={detail} strokeWidth="1" opacity="0.5" />
              </g>
            ))}
            <text x="100" y="168" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Egg capsule / packet</text>
            <text x="100" y="178" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">5-30 oncospheres per capsule</text>
          </g>
        ) : (
          <g>
            {/* Cucumber-seed proglottid with double genital pores */}
            {/* Proglottid body - elongated oval */}
            <ellipse cx="100" cy="96" rx="30" ry="60" fill={fill} fillOpacity="0.45" stroke={detail} strokeWidth="2.5" />
            {/* Proglottid highlight */}
            <path d="M 76 60 C 74 68, 72 78, 72 96" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.28" strokeLinecap="round" />
            {/* Double genital pores - one on each side */}
            <circle cx="70" cy="96" r="6" fill={bg} stroke={detail} strokeWidth="2" />
            <circle cx="130" cy="96" r="6" fill={bg} stroke={detail} strokeWidth="2" />
            <circle cx="70" cy="96" r="3" fill={detail} opacity="0.7" />
            <circle cx="130" cy="96" r="3" fill={detail} opacity="0.7" />
            {/* Annotation lines */}
            <line x1="64" y1="96" x2="40" y2="76" stroke={detail} strokeWidth="0.8" opacity="0.7" />
            <text x="12" y="74" fill={detail} fontSize="6.5" fontFamily="sans-serif">Genital</text>
            <text x="12" y="83" fill={detail} fontSize="6.5" fontFamily="sans-serif">pore</text>
            <line x1="136" y1="96" x2="160" y2="76" stroke={detail} strokeWidth="0.8" opacity="0.7" />
            <text x="162" y="74" fill={detail} fontSize="6.5" fontFamily="sans-serif">Genital</text>
            <text x="162" y="83" fill={detail} fontSize="6.5" fontFamily="sans-serif">pore</text>
            {/* Uterine/egg packet contents */}
            {[100,82,68,58,52,60,70,82,96,110,122,132,140,138,128,116,106].slice(0,8).map((_,i) => {
              const angle = (i * Math.PI * 2) / 8;
              const cx = 100 + Math.round(14 * Math.cos(angle));
              const cy = 96 + Math.round(36 * Math.sin(angle));
              return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="4" fill={detail} fillOpacity="0.3" stroke={detail} strokeWidth="0.8" />;
            })}
            <text x="100" y="168" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">Cucumber-seed proglottid</text>
            <text x="100" y="178" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">Double genital pores = D. caninum</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTaeniaScolex(tube: TubeVisual) {
  const isSolium = tube.id === 'A';
  const bg = tube.colors.slant;
  const bodyFill = tube.colors.butt;
  const detail = tube.colors.base;
  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`tsc-bg-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.5" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#tsc-bg-${tube.id})`} stroke="#b8a880" strokeWidth="1.2" />
        {/* Scolex body */}
        <ellipse cx="100" cy="110" rx="44" ry="56" fill={bodyFill} fillOpacity="0.3" stroke={bodyFill} strokeWidth="2.5" />
        {/* Body highlight */}
        <path d="M 64 80 C 62 90, 60 100, 60 112" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.28" strokeLinecap="round" />
        {/* 4 suckers - positioned around the scolex */}
        {[[66,90],[134,90],[66,130],[134,130]].map(([cx,cy],i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="16" ry="13" fill={bg} fillOpacity="0.9" stroke={bodyFill} strokeWidth="2" />
            <ellipse cx={cx} cy={cy} rx="9" ry="7" fill={bodyFill} fillOpacity="0.35" stroke={bodyFill} strokeWidth="1" />
          </g>
        ))}
        {isSolium ? (
          <g>
            {/* T. solium: rostellum with 2 rows of hooks */}
            <ellipse cx="100" cy="58" rx="22" ry="16" fill={bodyFill} fillOpacity="0.45" stroke={bodyFill} strokeWidth="2" />
            {/* Row 1 of hooks - larger */}
            {[72,81,90,100,110,119,128].map((x,i) => (
              <path key={i} d={`M ${x} 46 C ${x-3} 40, ${x+1} 36, ${x+2} 42`} fill="none" stroke={detail} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            ))}
            {/* Row 2 of hooks - smaller */}
            {[78,87,96,105,114,122].map((x,i) => (
              <path key={i+7} d={`M ${x} 54 C ${x-2} 48, ${x+1} 45, ${x+2} 50`} fill="none" stroke={detail} strokeWidth="2" strokeLinecap="round" opacity="0.65" />
            ))}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">T. solium (ARMED)</text>
            <text x="100" y="182" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">Rostellum + 2 rows of hooks</text>
          </g>
        ) : (
          <g>
            {/* T. saginata: smooth rounded apex, no rostellum, no hooks */}
            {/* Smooth rounded apex */}
            <ellipse cx="100" cy="60" rx="28" ry="18" fill={bodyFill} fillOpacity="0.32" stroke={bodyFill} strokeWidth="2" />
            {/* Smooth highlight - no hooks */}
            <path d="M 80 50 C 88 44, 112 44, 120 50" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.35" strokeLinecap="round" />
            {/* NO hooks indicator */}
            <line x1="72" y1="36" x2="128" y2="36" stroke={detail} strokeWidth="2" opacity="0.3" strokeDasharray="4,3" />
            <text x="100" y="28" textAnchor="middle" fill={detail} fontSize="7.5" fontFamily="sans-serif">No rostellum - No hooks</text>
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">T. saginata (UNARMED)</text>
            <text x="100" y="182" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">4 suckers only - Smooth apex</text>
          </g>
        )}
        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderMycologyRecognitionCard(tube: TubeVisual) {
  if (!tube.recognitionImage) {
    return null;
  }

  return (
    <div className="lia-tube-card lia-plate-card mycology-recognition-card" key={tube.id}>
      <div className="mycology-recognition-card-id" aria-label={`Visual ${tube.id}`}>{tube.id}</div>
      <div className="mycology-recognition-heading">
        <span>Microscopy recognition</span>
        <strong><em>{tube.label}</em></strong>
      </div>
      <figure className="mycology-recognition-image">
        <img src={tube.recognitionImage.src} alt={tube.recognitionImage.alt} loading="eager" />
      </figure>
      <strong className="mycology-recognition-differentiator">{tube.name}</strong>
      <p className="mycology-recognition-note">{tube.note}</p>
      {tube.benchTip && (
        <aside className="mycology-recognition-tip">
          <span aria-hidden="true"><FontAwesomeIcon icon={faMicroscope} /></span>
          <p>{tube.benchTip}</p>
        </aside>
      )}
      {tube.structureMap && (
        <figure className="mycology-structure-map">
          <img src={tube.structureMap.src} alt={tube.structureMap.alt} loading="lazy" />
        </figure>
      )}
    </div>
  );
}

function renderMycology(tube: TubeVisual, visualType: AtlasPage['visualType']) {
  if (tube.recognitionImage) {
    return renderMycologyRecognitionCard(tube);
  }

  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const isMucorales = visualType === 'mycology-mucorales';
  const isAspergillus = visualType === 'mycology-aspergillus-fumigatus';
  const isHistoplasma = visualType === 'mycology-histoplasma';
  const isBlastomyces = visualType === 'mycology-blastomyces';
  const isCoccidioides = visualType === 'mycology-coccidioides';
  const isDermatophyte = visualType === 'mycology-dermatophyte-panel';
  const isCandida = visualType === 'mycology-candida-germ-tube';
  const isCryptococcus = visualType === 'mycology-cryptococcus';
  const isSporothrix = visualType === 'mycology-sporothrix';
  const isParacoccidioides = visualType === 'mycology-paracoccidioides';
  const isFusarium = visualType === 'mycology-fusarium';
  const isPenicilliumTalaromyces = visualType === 'mycology-penicillium-talaromyces';
  const isScopulariopsis = visualType === 'mycology-scopulariopsis';
  const isPaecilomyces = visualType === 'mycology-paecilomyces';
  const isScedosporium = visualType === 'mycology-scedosporium';
  const isTrichosporon = visualType === 'mycology-trichosporon';
  const isDematiaceous = visualType === 'mycology-dematiaceous-panel';
  const isAspergillusComparison = visualType === 'mycology-aspergillus-comparison';
  const isScleroticBodies = visualType === 'mycology-sclerotic-bodies';
  const isBipolarisExserohilum = visualType === 'mycology-bipolaris-exserohilum';
  const isCladosporium = visualType === 'mycology-cladosporium';
  const isChromoAgents = visualType === 'mycology-chromo-agents';
  const isExophiala = visualType === 'mycology-exophiala';
  const hyphaStroke = isMucorales ? 8 : 3;

  const renderHyphalField = () => (
    <g fill="none" stroke={body} strokeLinecap="round">
      <path d="M 22 62 C 54 70, 82 78, 112 70 C 144 62, 166 70, 184 88" strokeWidth={hyphaStroke} opacity="0.7" />
      <path d="M 30 136 C 66 116, 94 112, 126 124 C 154 134, 172 124, 186 112" strokeWidth={hyphaStroke} opacity="0.58" />
      <path d="M 84 76 C 96 96, 108 112, 130 126" strokeWidth={hyphaStroke} opacity="0.5" />
      <path d="M 116 70 C 126 52, 140 42, 164 36" strokeWidth={hyphaStroke} opacity="0.48" />
      {!isMucorales && (
        <>
          {[54, 78, 104, 132, 154].map((x) => <line key={x} x1={x} y1="66" x2={x + 8} y2="76" stroke={detail} strokeWidth="1" opacity="0.55" />)}
          <path d="M 98 88 L 128 56" strokeWidth="2.4" opacity="0.72" />
        </>
      )}
    </g>
  );

  const renderConidiaDots = (points: Array<[number, number]>, size = 5) => (
    points.map(([cx, cy], index) => (
      <circle key={`${cx}-${cy}-${index}`} cx={cx} cy={cy} r={size} fill={body} stroke={detail} strokeWidth="0.8" opacity="0.82" />
    ))
  );

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`myc-bg-${visualType}-${tube.id}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bg} stopOpacity="0.62" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`myc-shadow-${visualType}-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor={detail} floodOpacity="0.18" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#myc-bg-${visualType}-${tube.id})`} stroke="rgba(36, 92, 105, 0.22)" strokeWidth="1.2" />

        {isMucorales && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 52 154 C 74 130, 88 106, 98 72" fill="none" stroke={body} strokeWidth="8" strokeLinecap="round" opacity="0.7" />
            <circle cx="106" cy="54" r="28" fill={detail} fillOpacity="0.84" stroke="#1e3432" strokeWidth="2" />
            {renderConidiaDots([[96,46],[108,42],[118,54],[104,62],[92,58]], 3)}
            <path d="M 56 154 C 44 160, 34 166, 24 176" fill="none" stroke={detail} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
            <path d="M 56 154 C 56 168, 54 178, 48 188" fill="none" stroke={detail} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
            <path d="M 56 154 C 70 164, 82 174, 92 184" fill="none" stroke={detail} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
            <text x="112" y="94" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">sporangium</text>
            <text x="56" y="144" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">rhizoids</text>
          </g>
        )}

        {isMucorales && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">broad pauci-septate hyphae</text>
          </g>
        )}

        {isAspergillus && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            <path d="M 98 88 L 132 54" fill="none" stroke={detail} strokeWidth="2" strokeLinecap="round" />
            <text x="104" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">septate, acute-angle branching</text>
          </g>
        )}

        {isAspergillus && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 98 158 C 96 124, 98 92, 102 68" fill="none" stroke={detail} strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="106" cy="56" rx="18" ry="24" fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="2" />
            {Array.from({ length: 17 }).map((_, index) => {
              const angle = (-145 + index * 17) * Math.PI / 180;
              const x1 = 106 + Math.cos(angle) * 14;
              const y1 = 56 + Math.sin(angle) * 18;
              const x2 = 106 + Math.cos(angle) * 42;
              const y2 = 56 + Math.sin(angle) * 40;
              return (
                <g key={index}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={detail} strokeWidth="1.4" opacity="0.64" />
                  <circle cx={x2} cy={y2} r="4.5" fill={body} stroke={detail} strokeWidth="0.8" />
                </g>
              );
            })}
            <text x="100" y="178" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">compact conidial head</text>
          </g>
        )}

        {isHistoplasma && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <ellipse cx="102" cy="96" rx="58" ry="46" fill={body} fillOpacity="0.18" stroke={detail} strokeWidth="2" />
            {renderConidiaDots([[80,84],[94,78],[110,88],[118,108],[96,112],[74,104],[128,82]], 4)}
            <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">tiny yeasts inside macrophage</text>
          </g>
        )}

        {isHistoplasma && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            {[72, 120, 150].map((cx, index) => (
              <g key={index}>
                <circle cx={cx} cy={index === 1 ? 76 : 112} r="18" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="2" />
                {renderConidiaDots([[cx - 12, index === 1 ? 68 : 104],[cx + 12, index === 1 ? 68 : 104],[cx - 10, index === 1 ? 86 : 122],[cx + 10, index === 1 ? 86 : 122]], 3)}
              </g>
            ))}
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">tuberculate macroconidia</text>
          </g>
        )}

        {isBlastomyces && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <circle cx="90" cy="100" r="34" fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="4" />
            <circle cx="132" cy="92" r="22" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="3.4" />
            <path d="M 111 93 C 116 86, 124 84, 132 86" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.32" strokeLinecap="round" />
            <text x="102" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">broad-based bud</text>
          </g>
        )}

        {isBlastomyces && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            {renderConidiaDots([[70,72],[94,96],[128,66],[150,118]], 7)}
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">lateral oval conidia</text>
          </g>
        )}

        {isCoccidioides && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <circle cx="100" cy="96" r="50" fill={body} fillOpacity="0.42" stroke={detail} strokeWidth="3.5" />
            {renderConidiaDots([[84,82],[100,78],[116,84],[78,100],[94,98],[110,100],[124,104],[90,116],[106,120],[120,118]], 5)}
            <text x="100" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">spherule with endospores</text>
          </g>
        )}

        {isCoccidioides && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 38 78 C 68 78, 88 86, 112 86 C 136 86, 154 78, 178 78" fill="none" stroke={detail} strokeWidth="2" strokeLinecap="round" />
            {[54, 78, 102, 126, 150].map((cx, index) => (
              <rect key={index} x={cx - 9} y={index % 2 === 0 ? 66 : 92} width="18" height="24" rx="5" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="1.6" transform={`rotate(${index % 2 === 0 ? -8 : 8} ${cx} ${index % 2 === 0 ? 78 : 104})`} />
            ))}
            <text x="100" y="160" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">barrel arthroconidia</text>
            <text x="100" y="171" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">safety-sensitive culture clue</text>
          </g>
        )}

        {isDermatophyte && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            {renderConidiaDots([[58,64],[70,70],[84,76],[98,82],[112,88],[126,94],[140,100]], 4)}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">microconidia along hyphae</text>
          </g>
        )}

        {isDermatophyte && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[62, 104, 146].map((cx, index) => (
              <g key={index} transform={`rotate(${index === 1 ? -8 : 12} ${cx} 96)`}>
                <path d={`M ${cx - 10} 52 C ${cx + 18} 62, ${cx + 22} 130, ${cx - 8} 142 C ${cx - 24} 116, ${cx - 24} 78, ${cx - 10} 52 Z`} fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="2" />
                <line x1={cx - 8} y1="76" x2={cx + 12} y2="82" stroke={detail} strokeWidth="1" opacity="0.55" />
                <line x1={cx - 10} y1="98" x2={cx + 14} y2="104" stroke={detail} strokeWidth="1" opacity="0.55" />
              </g>
            ))}
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">rough spindle macroconidia</text>
          </g>
        )}

        {isDermatophyte && tube.id === 'C' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[70, 104, 138].map((cx, index) => (
              <path key={index} d={`M ${cx - 14} 62 C ${cx + 18} 58, ${cx + 28} 126, ${cx - 8} 142 C ${cx - 28} 118, ${cx - 24} 78, ${cx - 14} 62 Z`} fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="2" />
            ))}
            <text x="100" y="170" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">smooth club macroconidia</text>
            <text x="100" y="181" textAnchor="middle" fill={detail} fontSize="7" fontFamily="sans-serif">no microconidia</text>
          </g>
        )}

        {isCandida && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <ellipse cx="72" cy="112" rx="28" ry="24" fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="2.4" />
            <path d="M 92 94 C 116 72, 138 62, 164 58" fill="none" stroke={body} strokeWidth="15" strokeLinecap="round" opacity="0.6" />
            <path d="M 94 94 C 118 74, 140 66, 162 62" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.22" />
            <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">no constriction at base</text>
          </g>
        )}

        {isCandida && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[62,118],[86,104],[110,90],[134,78]].map(([cx, cy], index) => (
              <ellipse key={index} cx={cx} cy={cy} rx="18" ry="14" fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="2" transform={`rotate(-30 ${cx} ${cy})`} />
            ))}
            {[76,100,124].map((x) => <line key={x} x1={x} y1={110 - (x - 76) * 0.6} x2={x + 8} y2={103 - (x - 76) * 0.6} stroke={detail} strokeWidth="2.4" opacity="0.72" />)}
            <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">pinched chain</text>
          </g>
        )}

        {isCryptococcus && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <circle cx="92" cy="96" r="38" fill="#ffffff" fillOpacity="0.38" stroke={detail} strokeWidth="1.5" />
            <circle cx="92" cy="96" r="24" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="2" />
            <circle cx="126" cy="86" r="13" fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="1.8" />
            <path d="M 108 90 C 112 86, 118 84, 124 84" fill="none" stroke={detail} strokeWidth="1.4" opacity="0.8" />
            {tube.id === 'A' && <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">capsule halo</text>}
            {tube.id === 'B' && <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">narrow-based bud</text>}
          </g>
        )}

        {isSporothrix && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[72, 108, 138].map((cx, index) => (
              <ellipse key={index} cx={cx} cy={index === 1 ? 92 : 112} rx="10" ry="28" fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="2" transform={`rotate(${index === 1 ? 58 : 38} ${cx} ${index === 1 ? 92 : 112})`} />
            ))}
            <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">cigar-shaped yeast</text>
          </g>
        )}

        {isSporothrix && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 152 C 98 120, 100 92, 108 66" fill="none" stroke={detail} strokeWidth="3.5" strokeLinecap="round" />
            {[[-26,-12],[-14,-24],[0,-28],[14,-22],[26,-10],[-18,4],[0,8],[18,4]].map(([dx, dy], index) => (
              <ellipse key={index} cx={108 + dx} cy={66 + dy} rx="7" ry="11" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="1.4" transform={`rotate(${dx * 2} ${108 + dx} ${66 + dy})`} />
            ))}
            <text x="100" y="170" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">flowerette conidia</text>
          </g>
        )}

        {isParacoccidioides && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <circle cx="100" cy="96" r="34" fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="3" />
            {Array.from({ length: 8 }).map((_, index) => {
              const angle = index * Math.PI / 4;
              const cx = 100 + Math.cos(angle) * 42;
              const cy = 96 + Math.sin(angle) * 36;
              return <circle key={index} cx={cx} cy={cy} r="12" fill={body} fillOpacity="0.48" stroke={detail} strokeWidth="2" />;
            })}
            <text x="100" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">multiple peripheral buds</text>
          </g>
        )}

        {isParacoccidioides && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <circle cx="88" cy="100" r="32" fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="3" />
            <circle cx="130" cy="90" r="21" fill={body} fillOpacity="0.48" stroke={detail} strokeWidth="2.8" />
            <text x="100" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">single broad bud comparator</text>
          </g>
        )}

        {isFusarium && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[74, 122].map((cx, index) => (
              <g key={index} transform={`rotate(${index === 0 ? -22 : 28} ${cx} 98)`}>
                <path d={`M ${cx - 42} 92 C ${cx - 12} 54, ${cx + 42} 58, ${cx + 48} 110 C ${cx + 8} 92, ${cx - 20} 98, ${cx - 42} 92 Z`} fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="2" />
                <line x1={cx - 22} y1="82" x2={cx - 14} y2="98" stroke={detail} strokeWidth="1" opacity="0.6" />
                <line x1={cx} y1="76" x2={cx + 4} y2="100" stroke={detail} strokeWidth="1" opacity="0.6" />
                <line x1={cx + 22} y1="82" x2={cx + 20} y2="104" stroke={detail} strokeWidth="1" opacity="0.6" />
              </g>
            ))}
            <text x="100" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">sickle macroconidia</text>
          </g>
        )}

        {isFusarium && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            <text x="100" y="170" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">hyaline septate hyphae</text>
          </g>
        )}

        {isPenicilliumTalaromyces && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 158 C 98 126, 100 96, 104 68" fill="none" stroke={detail} strokeWidth="3.6" strokeLinecap="round" />
            {[-36,-24,-12,0,12,24,36].map((dx) => (
              <g key={dx}>
                <line x1="104" y1="68" x2={104 + dx} y2="44" stroke={detail} strokeWidth="2" opacity="0.72" />
                {renderConidiaDots([[104 + dx, 36],[104 + dx, 28]], 4)}
              </g>
            ))}
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">brush-like conidiophore</text>
          </g>
        )}

        {isPenicilliumTalaromyces && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[72, 108, 138].map((cx, index) => (
              <g key={index}>
                <ellipse cx={cx} cy={index === 1 ? 86 : 112} rx="16" ry="24" fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="2" transform={`rotate(${index === 1 ? -20 : 15} ${cx} ${index === 1 ? 86 : 112})`} />
                <line x1={cx - 12} y1={index === 1 ? 86 : 112} x2={cx + 12} y2={index === 1 ? 86 : 112} stroke={detail} strokeWidth="1.8" opacity="0.72" />
              </g>
            ))}
            <text x="100" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">fission yeast septum</text>
          </g>
        )}

        {isScopulariopsis && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 160 C 98 130, 100 100, 104 74" fill="none" stroke={detail} strokeWidth="3.6" strokeLinecap="round" />
            {[-30,-18,-6,6,18,30].map((dx) => (
              <g key={dx}>
                <path d={`M 104 74 C ${104 + dx * 0.5} 62, ${104 + dx} 56, ${104 + dx} 48`} fill="none" stroke={detail} strokeWidth="2.4" opacity="0.72" />
                {renderConidiaDots([[104 + dx, 42],[104 + dx, 32]], 4)}
              </g>
            ))}
            <text x="100" y="176" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">penicillus-like brush</text>
          </g>
        )}

        {isScopulariopsis && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[70,90],[102,84],[134,92],[86,118],[118,116]].map(([cx, cy], index) => (
              <g key={index}>
                <path d={`M ${cx} ${cy - 16} C ${cx + 13} ${cy - 12}, ${cx + 13} ${cy + 10}, ${cx} ${cy + 14} C ${cx - 13} ${cy + 10}, ${cx - 13} ${cy - 12}, ${cx} ${cy - 16} Z`} fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="2" />
                <line x1={cx - 9} y1={cy + 14} x2={cx + 9} y2={cy + 14} stroke={detail} strokeWidth="1.8" opacity="0.8" />
                {[[-6,-6],[5,-7],[7,3],[-5,4],[0,8]].map(([sx, sy], si) => (
                  <line key={si} x1={cx + sx} y1={cy + sy} x2={cx + sx * 1.5} y2={cy + sy * 1.5} stroke={detail} strokeWidth="1" opacity="0.6" />
                ))}
              </g>
            ))}
            <text x="100" y="166" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">rough lemon-shaped conidia</text>
          </g>
        )}

        {isPaecilomyces && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 160 C 98 132, 100 104, 102 84" fill="none" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
            {[-34,-14,8,30].map((dx, index) => (
              <path key={index} d={`M 102 84 C ${102 + dx * 0.4} 70, ${102 + dx} 60, ${102 + dx * 1.4} 40`} fill="none" stroke={detail} strokeWidth="2.6" opacity="0.74" />
            ))}
            <text x="100" y="176" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">long tapering phialides</text>
          </g>
        )}

        {isPaecilomyces && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[60,70,18],[96,58,-14],[132,72,22]].map(([x0, y0, ang], index) => (
              <g key={index} transform={`rotate(${ang} ${x0} ${y0})`}>
                {renderConidiaDots([[x0, y0],[x0, y0 + 16],[x0, y0 + 32],[x0, y0 + 48]], 4)}
              </g>
            ))}
            <text x="100" y="170" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">divergent conidial chains</text>
          </g>
        )}

        {isScedosporium && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[72,118],[110,124],[146,116]].map(([cx, cy], index) => (
              <g key={index}>
                <path d={`M ${cx} ${cy} C ${cx + 11} ${cy - 6}, ${cx + 9} ${cy - 30}, ${cx} ${cy - 42} C ${cx - 9} ${cy - 30}, ${cx - 11} ${cy - 6}, ${cx} ${cy} Z`} fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="2" />
                <ellipse cx={cx} cy={cy - 50} rx="8" ry="11" fill={body} fillOpacity="0.7" stroke={detail} strokeWidth="1.6" />
              </g>
            ))}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">flask cells, single tip conidia</text>
          </g>
        )}

        {isScedosporium && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            <text x="100" y="170" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">hyaline septate hyphae</text>
          </g>
        )}

        {isTrichosporon && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[40,70,100,130].map((x, index) => (
              <rect key={index} x={x} y="84" width="28" height="22" rx="3" fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="2" transform={`rotate(${index % 2 === 0 ? -6 : 6} ${x + 14} 95)`} />
            ))}
            <text x="100" y="146" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">rectangular arthroconidia</text>
          </g>
        )}

        {isTrichosporon && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <ellipse cx="84" cy="104" rx="26" ry="22" fill={body} fillOpacity="0.56" stroke={detail} strokeWidth="2.4" />
            <ellipse cx="120" cy="84" rx="15" ry="13" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="2" />
            <ellipse cx="138" cy="70" rx="9" ry="8" fill={body} fillOpacity="0.46" stroke={detail} strokeWidth="1.6" />
            <text x="100" y="160" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">budding blastoconidia</text>
          </g>
        )}

        {isDematiaceous && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[72,108],[112,84]].map(([cx, cy], index) => (
              <g key={index}>
                <path d={`M ${cx - 18} ${cy + 14} C ${cx - 20} ${cy - 14}, ${cx + 14} ${cy - 18}, ${cx + 18} ${cy - 4} L ${cx + 34} ${cy - 22}`} fill="none" stroke={detail} strokeWidth="1.4" opacity="0.6" />
                <path d={`M ${cx - 18} ${cy + 14} C ${cx - 22} ${cy - 16}, ${cx + 16} ${cy - 20}, ${cx + 18} ${cy - 2} C ${cx + 8} ${cy + 10}, ${cx - 10} ${cy + 14}, ${cx - 18} ${cy + 14} Z`} fill={body} fillOpacity="0.6" stroke={detail} strokeWidth="2" />
                <line x1={cx - 14} y1={cy - 2} x2={cx + 14} y2={cy - 6} stroke={detail} strokeWidth="1" opacity="0.6" />
                <line x1={cx - 2} y1={cy - 14} x2={cx} y2={cy + 12} stroke={detail} strokeWidth="1" opacity="0.6" />
                <path d={`M ${cx + 18} ${cy - 2} L ${cx + 36} ${cy - 22}`} stroke={detail} strokeWidth="2.4" opacity="0.7" />
              </g>
            ))}
            <text x="100" y="168" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">muriform conidia with beak</text>
          </g>
        )}

        {isDematiaceous && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[70,96,-18],[120,100,16]].map(([cx, cy, ang], index) => (
              <g key={index} transform={`rotate(${ang} ${cx} ${cy})`}>
                <path d={`M ${cx - 34} ${cy} C ${cx - 26} ${cy - 26}, ${cx + 26} ${cy - 26}, ${cx + 34} ${cy} C ${cx + 24} ${cy + 6}, ${cx - 24} ${cy + 6}, ${cx - 34} ${cy} Z`} fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="2" />
                {[-17,-2,15].map((dx) => <line key={dx} x1={cx + dx} y1={cy - 12} x2={cx + dx} y2={cy + 4} stroke={detail} strokeWidth="1" opacity="0.6" />)}
                <path d={`M ${cx - 4} ${cy - 18} C ${cx + 8} ${cy - 22}, ${cx + 10} ${cy + 2}, ${cx - 2} ${cy + 4}`} fill={detail} fillOpacity="0.18" stroke="none" />
              </g>
            ))}
            <text x="100" y="170" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">curved, swollen central cell</text>
          </g>
        )}

        {isAspergillusComparison && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 158 C 98 128, 100 96, 102 72" fill="none" stroke={detail} strokeWidth="4" strokeLinecap="round" />
            {tube.id === 'A' && (
              <g>
                <ellipse cx="104" cy="62" rx="14" ry="18" fill={body} fillOpacity="0.7" stroke={detail} strokeWidth="2" />
                {Array.from({ length: 9 }).map((_, index) => {
                  const angle = (-120 + index * 15) * Math.PI / 180;
                  return <line key={index} x1={104 + Math.cos(angle) * 12} y1={56 + Math.sin(angle) * 16} x2={104 + Math.cos(angle) * 30} y2={56 + Math.sin(angle) * 34} stroke={detail} strokeWidth="1.4" opacity="0.66" />;
                })}
                {renderConidiaDots([[96,26],[104,22],[112,26],[100,16]], 4)}
                <text x="100" y="180" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">compact columnar (uniseriate)</text>
              </g>
            )}
            {tube.id === 'B' && (
              <g>
                <circle cx="104" cy="56" r="16" fill={body} fillOpacity="0.66" stroke={detail} strokeWidth="2" />
                {Array.from({ length: 16 }).map((_, index) => {
                  const angle = index * 22.5 * Math.PI / 180;
                  const x2 = 104 + Math.cos(angle) * 40;
                  const y2 = 56 + Math.sin(angle) * 40;
                  return <g key={index}><line x1={104 + Math.cos(angle) * 15} y1={56 + Math.sin(angle) * 15} x2={x2} y2={y2} stroke={detail} strokeWidth="1.2" opacity="0.6" /><circle cx={x2} cy={y2} r="4" fill={detail} fillOpacity="0.7" stroke={detail} strokeWidth="0.6" /></g>;
                })}
                <text x="100" y="184" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">radiate biseriate, dark conidia</text>
              </g>
            )}
            {tube.id === 'C' && (
              <g>
                <circle cx="104" cy="58" r="15" fill={body} fillOpacity="0.6" stroke={detail} strokeWidth="2" />
                {Array.from({ length: 11 }).map((_, index) => {
                  const angle = (-150 + index * 27) * Math.PI / 180;
                  const x2 = 104 + Math.cos(angle) * 38;
                  const y2 = 58 + Math.sin(angle) * 38;
                  return <g key={index}><line x1={104 + Math.cos(angle) * 14} y1={58 + Math.sin(angle) * 14} x2={x2} y2={y2} stroke={detail} strokeWidth="1.2" opacity="0.6" /><circle cx={x2} cy={y2} r="4" fill={body} stroke={detail} strokeWidth="0.7" /></g>;
                })}
                {[78,90,102,114].map((y) => <line key={y} x1="98" y1={y} x2="106" y2={y + 2} stroke={detail} strokeWidth="1.6" opacity="0.6" />)}
                <text x="100" y="182" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">radiate, rough stalk</text>
              </g>
            )}
            {tube.id === 'D' && (
              <g>
                <ellipse cx="104" cy="60" rx="12" ry="15" fill={body} fillOpacity="0.66" stroke={detail} strokeWidth="2" />
                {Array.from({ length: 7 }).map((_, index) => {
                  const angle = (-110 + index * 18) * Math.PI / 180;
                  return <line key={index} x1={104 + Math.cos(angle) * 10} y1={56 + Math.sin(angle) * 13} x2={104 + Math.cos(angle) * 26} y2={56 + Math.sin(angle) * 30} stroke={detail} strokeWidth="1.3" opacity="0.64" />;
                })}
                {renderConidiaDots([[62,110],[58,128],[150,104],[152,124],[70,150]], 5)}
                <text x="100" y="182" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">compact head plus aleurioconidia</text>
              </g>
            )}
          </g>
        )}

        {isScleroticBodies && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[78,80],[104,74],[92,100],[118,96],[76,118],[106,120]].map(([cx, cy], index) => (
              <g key={index}>
                <circle cx={cx} cy={cy} r="15" fill={body} fillOpacity="0.72" stroke={detail} strokeWidth="2" />
                <line x1={cx - 13} y1={cy} x2={cx + 13} y2={cy} stroke={detail} strokeWidth="1.4" opacity="0.85" />
                <line x1={cx} y1={cy - 13} x2={cx} y2={cy + 13} stroke={detail} strokeWidth="1.4" opacity="0.85" />
              </g>
            ))}
            <text x="100" y="164" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">muriform sclerotic bodies</text>
          </g>
        )}

        {isScleroticBodies && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            {[58,98,138].map((x) => <line key={x} x1={x} y1="64" x2={x + 6} y2="76" stroke={detail} strokeWidth="2" opacity="0.7" />)}
            <ellipse cx="150" cy="120" rx="12" ry="9" fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="1.8" />
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">pigmented septate hyphae</text>
          </g>
        )}

        {isBipolarisExserohilum && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 30 150 C 60 140, 56 120, 84 112 C 110 104, 104 84, 130 78 C 150 74, 152 60, 168 54" fill="none" stroke={detail} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            {[[60,134,30],[100,108,18],[138,80,8]].map(([cx, cy, ang], index) => (
              <g key={index} transform={`rotate(${ang} ${cx} ${cy})`}>
                <rect x={cx - 26} y={cy - 9} width="52" height="18" rx="9" fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="2" />
                {[-13,0,13].map((dx) => <line key={dx} x1={cx + dx} y1={cy - 9} x2={cx + dx} y2={cy + 9} stroke={detail} strokeWidth="1" opacity="0.6" />)}
                {tube.id === 'B' && <ellipse cx={cx - 26} cy={cy} rx="4" ry="5" fill={body} stroke={detail} strokeWidth="1.4" />}
              </g>
            ))}
            {tube.id === 'A' && <text x="100" y="178" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">poroconidia, flat hilum</text>}
            {tube.id === 'B' && <text x="100" y="178" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">poroconidia, protruding hilum</text>}
          </g>
        )}

        {isCladosporium && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 158 C 98 130, 100 104, 104 84" fill="none" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
            {[[104,84,-22],[104,84,22]].map(([cx, cy, dx], index) => (
              <g key={index}>
                <ellipse cx={cx + dx} cy={cy - 14} rx="11" ry="8" fill={body} fillOpacity="0.62" stroke={detail} strokeWidth="2" transform={`rotate(${dx} ${cx + dx} ${cy - 14})`} />
                <circle cx={cx + dx * 1.4} cy={cy - 26} r="3" fill={detail} />
                <circle cx={cx + dx * 1.7} cy={cy - 34} r="3" fill={detail} />
              </g>
            ))}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">shield cells with scars</text>
          </g>
        )}

        {isCladosporium && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {[[56,72,12],[96,60,-10],[132,84,20]].map(([x0, y0, ang], index) => (
              <g key={index} transform={`rotate(${ang} ${x0} ${y0})`}>
                {[0,1,2,3].map((n) => (
                  <ellipse key={n} cx={x0} cy={y0 + n * 17} rx="9" ry="7" fill={body} fillOpacity="0.58" stroke={detail} strokeWidth="1.8" />
                ))}
              </g>
            ))}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">fragile branching chains</text>
          </g>
        )}

        {isChromoAgents && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 158 C 98 132, 100 108, 102 90" fill="none" stroke={detail} strokeWidth="3.4" strokeLinecap="round" />
            <path d="M 90 90 C 90 76, 114 76, 114 90" fill="none" stroke={detail} strokeWidth="2.4" />
            <path d="M 86 90 C 86 84, 118 84, 114 90" fill="none" stroke={detail} strokeWidth="2" opacity="0.8" />
            {renderConidiaDots([[96,76],[104,72],[112,78],[100,66]], 4)}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">collarette phialides</text>
          </g>
        )}

        {isChromoAgents && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 158 C 98 130, 102 100, 106 78" fill="none" stroke={detail} strokeWidth="3.2" strokeLinecap="round" />
            {[-28,-12,8,26].map((dx) => (
              <g key={dx}>
                <line x1="106" y1="78" x2={106 + dx} y2={64 - Math.abs(dx) * 0.2} stroke={detail} strokeWidth="1.6" opacity="0.7" />
                <ellipse cx={106 + dx} cy={56 - Math.abs(dx) * 0.2} rx="6" ry="8" fill={body} fillOpacity="0.6" stroke={detail} strokeWidth="1.4" />
              </g>
            ))}
            <text x="100" y="172" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">denticulate mixed sporulation</text>
          </g>
        )}

        {isChromoAgents && tube.id === 'C' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <path d="M 100 158 C 98 134, 100 112, 102 96" fill="none" stroke={detail} strokeWidth="3.2" strokeLinecap="round" />
            {[[102,96,-8],[102,96,14]].map(([x0, y0, ang], index) => (
              <g key={index} transform={`rotate(${ang} ${x0} ${y0})`}>
                {[0,1,2,3,4].map((n) => (
                  <ellipse key={n} cx={x0} cy={y0 - 12 - n * 14} rx="7" ry="6" fill={body} fillOpacity="0.56" stroke={detail} strokeWidth="1.6" />
                ))}
              </g>
            ))}
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">long fragile chains</text>
          </g>
        )}

        {isExophiala && tube.id === 'A' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            <ellipse cx="88" cy="106" rx="24" ry="20" fill={body} fillOpacity="0.66" stroke={detail} strokeWidth="2.4" />
            <ellipse cx="120" cy="86" rx="14" ry="12" fill={body} fillOpacity="0.56" stroke={detail} strokeWidth="2" />
            <ellipse cx="138" cy="72" rx="8" ry="7" fill={body} fillOpacity="0.5" stroke={detail} strokeWidth="1.6" />
            <line x1="104" y1="96" x2="110" y2="92" stroke={detail} strokeWidth="1.6" opacity="0.8" />
            <text x="100" y="158" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">dark budding yeast</text>
          </g>
        )}

        {isExophiala && tube.id === 'B' && (
          <g filter={`url(#myc-shadow-${visualType}-${tube.id})`}>
            {renderHyphalField()}
            {[[78,70,-32],[126,86,28]].map(([x0, y0, ang], index) => (
              <g key={index} transform={`rotate(${ang} ${x0} ${y0})`}>
                <path d={`M ${x0 - 6} ${y0 + 26} C ${x0 - 4} ${y0 + 4}, ${x0 + 2} ${y0 - 16}, ${x0} ${y0 - 30}`} fill="none" stroke={detail} strokeWidth="3.2" strokeLinecap="round" />
                {renderConidiaDots([[x0 - 6, y0 - 34],[x0 + 4, y0 - 36],[x0, y0 - 44]], 3)}
              </g>
            ))}
            <text x="100" y="174" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">tapered annellophores</text>
          </g>
        )}

        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderVirology(tube: TubeVisual, visualType: AtlasPage['visualType']) {
  const bg = tube.colors.slant;
  const body = tube.colors.butt;
  const detail = tube.colors.base;
  const isCpePanel = visualType === 'virology-cpe-panel';
  const isHerpes = visualType === 'virology-herpesvirus-cpe';
  const isCmv = visualType === 'virology-cmv-inclusion';
  const isNaat = visualType === 'virology-respiratory-naat';
  const isHbv = visualType === 'virology-hepatitis-b-serology';
  const isHiv = visualType === 'virology-hiv-screening';
  const isEm = visualType === 'virology-em-morphology';

  const emHexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return `${(100 + 44 * Math.cos(angle)).toFixed(1)},${(92 + 44 * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

  const renderCellField = () => (
    <>
      {[
        [42, 52], [70, 44], [104, 50], [136, 58],
        [50, 92], [84, 86], [120, 96], [152, 90],
        [64, 132], [100, 136], [138, 130]
      ].map(([cx, cy], index) => (
        <g key={index}>
          <ellipse cx={cx} cy={cy} rx="12" ry="9" fill="#ffffff" fillOpacity="0.45" stroke={body} strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="3.5" fill={detail} fillOpacity="0.5" />
        </g>
      ))}
    </>
  );

  const markerColors = isHbv
    ? tube.id === 'A'
      ? ['#d8d0bd', '#d8d0bd', '#d8d0bd']
      : tube.id === 'B'
        ? ['#d8d0bd', '#3f8a55', tube.label.includes('Immune') ? '#d8d0bd' : '#3f8a55']
        : ['#a44a5f', '#d8d0bd', '#a44a5f']
    : [];

  return (
    <div className="lia-tube-card lia-plate-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-plate-svg" viewBox="0 0 200 200" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`viro-bg-${visualType}-${tube.id}`} cx="50%" cy="42%" r="72%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.58" />
            <stop offset="100%" stopColor={bg} stopOpacity="1" />
          </radialGradient>
          <filter id={`viro-shadow-${visualType}-${tube.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0f172a" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect x="8" y="8" width="184" height="184" rx="10" fill={`url(#viro-bg-${visualType}-${tube.id})`} stroke="#b8c6c9" strokeWidth="1.2" />

        {isCpePanel && tube.id === 'A' && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            {[[58,66],[92,56],[128,68],[70,106],[112,106],[144,118]].map(([cx, cy], index) => (
              <g key={index}>
                <circle cx={cx} cy={cy} r="14" fill={body} fillOpacity="0.68" stroke={detail} strokeWidth="1.4" />
                <circle cx={cx + 3} cy={cy - 2} r="4" fill={detail} fillOpacity="0.62" />
              </g>
            ))}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">rounded refractile cells</text>
          </g>
        )}

        {isCpePanel && tube.id === 'B' && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <path d="M 52 92 C 62 48, 126 44, 148 82 C 176 128, 110 154, 70 128 C 52 116, 46 104, 52 92 Z" fill={body} fillOpacity="0.55" stroke={detail} strokeWidth="2" />
            {[80,98,116,132].map((cx, index) => (
              <circle key={index} cx={cx} cy={index % 2 ? 96 : 82} r="7" fill={detail} fillOpacity="0.64" />
            ))}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">fused multinucleated cell</text>
          </g>
        )}

        {isCpePanel && tube.id === 'C' && (
          <g>
            {renderCellField()}
            <ellipse cx="104" cy="94" rx="48" ry="34" fill={bg} fillOpacity="0.9" stroke={detail} strokeWidth="2" strokeDasharray="5,4" />
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">cleared plaque focus</text>
          </g>
        )}

        {isCpePanel && tube.id === 'D' && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            {[[70,84],[118,92],[98,126]].map(([cx, cy], index) => (
              <g key={index}>
                <ellipse cx={cx} cy={cy} rx="25" ry="19" fill={body} fillOpacity="0.38" stroke={body} strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r="11" fill="#ffffff" fillOpacity="0.65" stroke={detail} strokeWidth="1.7" />
                <circle cx={cx} cy={cy} r="5" fill={detail} fillOpacity="0.78" />
              </g>
            ))}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">inclusion-like change</text>
          </g>
        )}

        {isHerpes && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <ellipse cx="100" cy="94" rx="50" ry="40" fill={body} fillOpacity="0.42" stroke={detail} strokeWidth="2" />
            {tube.id === 'A' && [[78,88],[98,82],[120,94],[102,112]].map(([cx, cy], index) => (
              <circle key={index} cx={cx} cy={cy} r="11" fill="#ffffff" fillOpacity="0.74" stroke={detail} strokeWidth="1.5" />
            ))}
            {tube.id === 'B' && [[82,92],[100,88],[118,92]].map(([cx, cy], index) => (
              <ellipse key={index} cx={cx} cy={cy} rx="15" ry="12" fill="#ffffff" fillOpacity="0.74" stroke={detail} strokeWidth="1.5" />
            ))}
            {tube.id === 'C' && [[82,92],[112,94]].map(([cx, cy], index) => (
              <g key={index}>
                <circle cx={cx} cy={cy} r="16" fill="#ffffff" fillOpacity="0.72" stroke={detail} strokeWidth="1.6" />
                <circle cx={cx} cy={cy} r="10" fill="none" stroke={detail} strokeWidth="3.2" opacity="0.72" />
                <circle cx={cx} cy={cy} r="4" fill={detail} fillOpacity="0.4" />
              </g>
            ))}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">{tube.label.toLowerCase()}</text>
          </g>
        )}

        {isCmv && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <ellipse cx="100" cy="96" rx={tube.id === 'A' ? 54 : 48} ry={tube.id === 'A' ? 42 : 38} fill={body} fillOpacity="0.42" stroke={detail} strokeWidth="2" />
            <circle cx="100" cy="96" r={tube.id === 'A' ? 18 : 24} fill="#ffffff" fillOpacity="0.74" stroke={detail} strokeWidth="1.8" />
            {tube.id === 'B' && <circle cx="100" cy="96" r="11" fill={detail} fillOpacity="0.82" />}
            {tube.id === 'A' && <circle cx="100" cy="96" r="7" fill={detail} fillOpacity="0.58" />}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">{tube.id === 'A' ? 'enlarged cell' : 'halo plus inclusion'}</text>
          </g>
        )}

        {isNaat && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            {tube.id === 'A' ? (
              <>
                <rect x="56" y="62" width="88" height="58" rx="12" fill="#ffffff" fillOpacity="0.55" stroke={detail} strokeWidth="1.6" />
                <path d="M 76 82 C 96 68, 112 98, 132 82" fill="none" stroke={body} strokeWidth="4" strokeLinecap="round" />
                <path d="M 76 100 C 96 86, 112 116, 132 100" fill="none" stroke={detail} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              </>
            ) : tube.id === 'B' ? (
              <>
                <polyline points="42,134 70,122 96,106 122,74 154,54" fill="none" stroke={detail} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="42" y1="134" x2="158" y2="134" stroke={detail} strokeWidth="1.5" opacity="0.35" />
                <circle cx="122" cy="74" r="7" fill={body} stroke={detail} strokeWidth="2" />
              </>
            ) : (
              <>
                <polyline points="42,118 72,118 100,118 128,118 158,118" fill="none" stroke={detail} strokeWidth="4" strokeLinecap="round" />
                <line x1="42" y1="134" x2="158" y2="134" stroke={detail} strokeWidth="1.5" opacity="0.35" />
                <circle cx="126" cy="118" r="7" fill={bg} stroke={detail} strokeWidth="2" />
              </>
            )}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">{tube.label.toLowerCase()}</text>
          </g>
        )}

        {isHbv && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            {['HBsAg', 'anti-HBs', 'anti-HBc'].map((marker, index) => (
              <g key={marker}>
                <rect x="38" y={52 + index * 34} width="124" height="22" rx="11" fill="#ffffff" fillOpacity="0.64" stroke={detail} strokeWidth="1" />
                <circle cx="52" cy={63 + index * 34} r="7" fill={markerColors[index]} stroke={detail} strokeWidth="1" />
                <text x="68" y={67 + index * 34} fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{marker}</text>
              </g>
            ))}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">{tube.label.toLowerCase()}</text>
          </g>
        )}

        {isHiv && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <rect x="36" y="58" width="128" height="82" rx="14" fill="#ffffff" fillOpacity="0.56" stroke={detail} strokeWidth="1.4" />
            {tube.id === 'A' && (
              <>
                <circle cx="72" cy="98" r="17" fill={body} fillOpacity="0.44" stroke={detail} strokeWidth="1.7" />
                <text x="72" y="102" textAnchor="middle" fill={detail} fontSize="11" fontFamily="sans-serif" fontWeight="bold">Ag</text>
                <circle cx="124" cy="98" r="17" fill={body} fillOpacity="0.26" stroke={detail} strokeWidth="1.7" />
                <text x="124" y="102" textAnchor="middle" fill={detail} fontSize="11" fontFamily="sans-serif" fontWeight="bold">Ab</text>
              </>
            )}
            {tube.id === 'B' && (
              <>
                <rect x="58" y="76" width="84" height="14" rx="7" fill={body} fillOpacity="0.35" stroke={detail} strokeWidth="1" />
                <rect x="58" y="106" width="84" height="14" rx="7" fill={body} fillOpacity="0.18" stroke={detail} strokeWidth="1" />
                <text x="100" y="86" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">HIV-1</text>
                <text x="100" y="116" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">HIV-2</text>
              </>
            )}
            {tube.id === 'C' && (
              <>
                <path d="M 54 102 C 70 72, 90 132, 106 102 S 138 72, 154 102" fill="none" stroke={detail} strokeWidth="4" strokeLinecap="round" />
                <text x="100" y="126" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">RNA target</text>
              </>
            )}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">{tube.label.toLowerCase()}</text>
          </g>
        )}

        {isEm && tube.id === 'A' && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <circle cx="100" cy="92" r="46" fill={body} fillOpacity="0.4" stroke={detail} strokeWidth="2.4" />
            <circle cx="100" cy="92" r="15" fill="#ffffff" fillOpacity="0.7" stroke={detail} strokeWidth="1.8" />
            {Array.from({ length: 16 }, (_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return (
                <line key={i} x1={100 + 15 * Math.cos(a)} y1={92 + 15 * Math.sin(a)} x2={100 + 44 * Math.cos(a)} y2={92 + 44 * Math.sin(a)} stroke={detail} strokeWidth="2" opacity="0.7" />
              );
            })}
            {Array.from({ length: 16 }, (_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return <circle key={i} cx={100 + 46 * Math.cos(a)} cy={92 + 46 * Math.sin(a)} r="3.4" fill={detail} fillOpacity="0.7" />;
            })}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">wheel-like capsid</text>
          </g>
        )}

        {isEm && tube.id === 'B' && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <circle cx="100" cy="92" r="34" fill={body} fillOpacity="0.42" stroke={detail} strokeWidth="2" />
            <circle cx="100" cy="92" r="12" fill="#ffffff" fillOpacity="0.5" stroke={detail} strokeWidth="1.3" opacity="0.7" />
            {Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              const x2 = 100 + 48 * Math.cos(a);
              const y2 = 92 + 48 * Math.sin(a);
              return (
                <g key={i}>
                  <line x1={100 + 34 * Math.cos(a)} y1={92 + 34 * Math.sin(a)} x2={x2} y2={y2} stroke={detail} strokeWidth="2" />
                  <circle cx={x2} cy={y2} r="3.6" fill={detail} fillOpacity="0.8" />
                </g>
              );
            })}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">club-shaped spikes</text>
          </g>
        )}

        {isEm && tube.id === 'C' && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <polygon points={emHexPoints} fill={body} fillOpacity="0.42" stroke={detail} strokeWidth="2.4" />
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              return <line key={i} x1="100" y1="92" x2={100 + 44 * Math.cos(a)} y2={92 + 44 * Math.sin(a)} stroke={detail} strokeWidth="1.2" opacity="0.45" />;
            })}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              return <circle key={i} cx={100 + 44 * Math.cos(a)} cy={92 + 44 * Math.sin(a)} r="3.4" fill={detail} fillOpacity="0.78" />;
            })}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">icosahedral capsid</text>
          </g>
        )}

        {isEm && tube.id === 'D' && (
          <g filter={`url(#viro-shadow-${visualType}-${tube.id})`}>
            <circle cx="100" cy="92" r="30" fill={body} fillOpacity="0.45" stroke={detail} strokeWidth="2" />
            {[[90, 82], [110, 84], [100, 96], [86, 98], [114, 100], [100, 74], [92, 108], [112, 110]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#ffffff" fillOpacity="0.55" stroke={detail} strokeWidth="1" />
            ))}
            {Array.from({ length: 20 }, (_, i) => {
              const a = (i / 20) * Math.PI * 2;
              return <line key={i} x1={100 + 30 * Math.cos(a)} y1={92 + 30 * Math.sin(a)} x2={100 + 35 * Math.cos(a)} y2={92 + 35 * Math.sin(a)} stroke={detail} strokeWidth="1.3" opacity="0.6" />;
            })}
            <text x="100" y="162" textAnchor="middle" fill={detail} fontSize="8" fontFamily="sans-serif" fontWeight="bold">cup-pitted surface</text>
          </g>
        )}

        <text x="100" y="195" textAnchor="middle" fill={detail} fontSize="9" fontFamily="sans-serif" fontWeight="bold">{tube.label}</text>
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

function renderTube(tube: TubeVisual, visualType: AtlasPage['visualType']) {
  if (visualType === 'litmus-milk') {
    return renderLitmusMilk(tube);
  }
  if (visualType === 'lap-test') {
    return renderLAPTest(tube);
  }
  if (visualType === 'indole-production') {
    return renderIndoleProduction(tube);
  }
  if (visualType === 'hippurate-hydrolysis') {
    return renderHippurateHydrolysis(tube);
  }
  if (visualType === 'gelatin-hydrolysis') {
    return renderGelatinHydrolysis(tube);
  }
  if (visualType === 'flagella-stain') {
    return renderFlagellaStain(tube);
  }
  if (visualType === 'fermentation') {
    return renderFermentation(tube);
  }
  if (visualType === 'dnase') {
    return renderDNase(tube);
  }
  if (visualType === 'decarboxylase') {
    return renderDecarboxylase(tube);
  }
  if (visualType === 'coagulase') {
    return renderCoagulase(tube);
  }
  if (visualType === 'disk-susceptibility') {
    return renderPlate(tube);
  }
  if (visualType === 'bile-solubility') {
    return renderBileSolubility(tube);
  }
  if (visualType === 'butyrate-disk') {
    return renderButyrateDisk(tube);
  }
  if (visualType === 'camp-test') {
    return renderCAMPTest(tube);
  }
  if (visualType === 'catalase') {
    return renderCatalaseTest(tube);
  }
  if (visualType === 'mrvp') {
    return renderMRVP(tube);
  }
  if (visualType === 'microdase') {
    return renderMicrodase(tube);
  }
  if (visualType === 'motility') {
    return renderMotility(tube);
  }
  if (visualType === 'mrs-broth') {
    return renderMRSBroth(tube);
  }
  if (visualType === 'mug-test') {
    return renderMUGTest(tube);
  }
  if (visualType === 'nitrate-reduction') {
    return renderNitrateReduction(tube);
  }
  if (visualType === 'nitrite-reduction') {
    return renderNitriteReduction(tube);
  }
  if (visualType === 'onpg-test') {
    return renderONPGTest(tube);
  }
  if (visualType === 'optochin-test') {
    return renderOptochinTest(tube);
  }
  if (visualType === 'oxidase-test') {
    return renderOxidaseTest(tube);
  }
  if (visualType === 'of-medium') {
    return renderOFMedium(tube);
  }
  if (visualType === 'phenylalanine-deaminase') {
    return renderPhenylalanineDeaminase(tube);
  }
  if (visualType === 'pyr-test') {
    return renderPYRTest(tube);
  }
  if (visualType === 'pyruvate-broth') {
    return renderPyruvateBroth(tube);
  }
  if (visualType === 'salt-tolerance') {
    return renderSaltTolerance(tube);
  }
  if (visualType === 'spot-indole') {
    return renderSpotIndole(tube);
  }
  if (visualType === 'tsi-test') {
    return renderTSITest(tube);
  }
  if (visualType === 'urease-test') {
    return renderUreaseTest(tube);
  }
  if (visualType === 'xv-factor-test') {
    return renderXVFactorTest(tube);
  }
  if (visualType === 'microscope-giardia') return renderGiardia(tube);
  if (visualType === 'microscope-cryptosporidium') return renderCryptosporidium(tube);
  if (visualType === 'microscope-entamoeba') return renderEntamoeba(tube);
  if (visualType === 'microscope-trichomonas') return renderTrichomonas(tube);
  if (visualType === 'microscope-enterobius') return renderEnterobius(tube);
  if (visualType === 'microscope-strongyloides') return renderStrongyloides(tube);
  if (visualType === 'microscope-hookworm') return renderHookworm(tube);
  if (visualType === 'microscope-trichuris') return renderTrichurisEgg(tube);
  if (visualType === 'microscope-plasmodium') return renderPlasmodium(tube);
  if (visualType === 'microscope-babesia') return renderBabesia(tube);
  if (visualType === 'microscope-trypanosoma') return renderTrypanosoma(tube);
  if (visualType === 'microscope-toxoplasma') return renderToxoplasma(tube);
  if (visualType === 'microscope-leishmania') return renderLeishmania(tube);
  if (visualType === 'microscope-ascaris') return renderAscaris(tube);
  if (visualType === 'microscope-trichostrongylus') return renderTrichostrongylus(tube);
  if (visualType === 'microscope-trichinella') return renderTrichinella(tube);
  if (visualType === 'microscope-microfilaria') return renderMicrofilaria(tube);
  if (visualType === 'microscope-taenia-egg') return renderTaeniaEgg(tube);
  if (visualType === 'microscope-paragonimus') return renderParagonimus(tube);
  if (visualType === 'microscope-schistosoma') return renderSchistosoma(tube);
  if (visualType === 'microscope-hymenolepis') return renderHymenolepis(tube);
  if (visualType === 'microscope-diphyllobothrium') return renderDiphyllobothrium(tube);
  if (visualType === 'microscope-echinococcus') return renderEchinococcus(tube);
  if (visualType === 'microscope-plasmodium-panel') return renderPlasmodiumPanel(tube);
  if (visualType === 'microscope-cyclospora-cystoisospora') return renderCyclosporaCystoisospora(tube);
  if (visualType === 'microscope-entamoeba-panel') return renderEntamoebaPanel(tube);
  if (visualType === 'microscope-operculated-eggs') return renderOperculated(tube);
  if (visualType === 'microscope-blastocystis') return renderBlastocystis(tube);
  if (visualType === 'microscope-dientamoeba') return renderDientamoeba(tube);
  if (visualType === 'microscope-clonorchis') return renderClonorchis(tube);
  if (visualType === 'microscope-fasciola') return renderFasciola(tube);
  if (visualType === 'microscope-dipylidium') return renderDipylidium(tube);
  if (visualType === 'microscope-taenia-scolex') return renderTaeniaScolex(tube);
  if (isMycologyVisualType(visualType)) return renderMycology(tube, visualType);
  if (isVirologyVisualType(visualType)) return renderVirology(tube, visualType);
  const growth = tube.growth ?? 'none';
  const isSlant = visualType === 'utilization' || visualType === 'esculin-hydrolysis' || visualType === 'growth-temperature' || visualType === 'bile-esculin' || visualType === 'cetrimide' || visualType === 'citrate';
  // microdase handled above

  return (
    <div className="lia-tube-card" key={tube.id}>
      <div className="lia-letter">{tube.id}</div>
      <svg className="lia-tube-svg" viewBox="0 0 120 360" aria-hidden="true">
        <defs>
          <linearGradient id={`glass-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ba8b6" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`agar-${tube.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor={tube.colors.butt} stopOpacity="0.98" />
            <stop offset="54%" stopColor={tube.colors.slant} stopOpacity="0.88" />
            <stop offset="100%" stopColor={tube.colors.base} stopOpacity="0.98" />
          </linearGradient>
        </defs>
        <rect x="31" y="22" width="58" height="300" rx="18" className="tube-glass" />
        <rect x="35" y="38" width="50" height="86" rx="4" fill="#f8f5ee" />
        {isSlant ? (
          <>
            <path d="M36 138 C51 132, 67 126, 84 112 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={`url(#agar-${tube.id})`} />
            {(growth === 'heavy' || growth === 'light') && (
              <g className={`slant-growth ${growth}`}>
                <path d="M43 137 C55 133, 68 126, 81 117" />
                <path d="M44 151 C57 146, 67 140, 80 132" />
                <path d="M45 166 C58 160, 68 153, 80 145" />
              </g>
            )}
          </>
        ) : (
          <>
            <path d="M36 137 C50 132, 65 126, 84 112 L84 284 C84 302, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={tube.colors.slant} opacity="0.72" />
            <path d="M36 178 L84 178 L84 286 C84 303, 72 316, 60 316 C47 316, 36 304, 36 286 Z" fill={tube.colors.butt} opacity="0.95" />
            <rect x="41" y="214" width="38" height="92" rx="16" fill={tube.colors.base} opacity="0.72" />
          </>
        )}
        <path d="M44 129 C57 125, 70 118, 83 109" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.45" />
        <rect x="31" y="22" width="58" height="300" rx="18" fill={`url(#glass-${tube.id})`} />
        <path d="M42 43 L42 302" stroke="#ffffff" strokeWidth="3" opacity="0.36" />
        <path d="M78 44 L78 303" stroke="#1f2937" strokeWidth="2" opacity="0.08" />
      </svg>
      <strong>{tube.label}</strong>
      <span>{tube.name}</span>
      <p>{tube.note}</p>
    </div>
  );
}

const utilizationStageTypes: AtlasPage['visualType'][] = [
  'utilization',
  'esculin-hydrolysis',
  'growth-temperature',
  'bile-esculin',
  'cetrimide',
  'citrate',
  'motility',
  'mrs-broth',
  'nitrite-reduction',
  'onpg-test',
  'phenylalanine-deaminase',
  'pyruvate-broth',
  'salt-tolerance',
  'urease-test'
];

const diskStageTypes: AtlasPage['visualType'][] = [
  'disk-susceptibility',
  'optochin-test',
  'lap-test',
  'indole-production',
  'hippurate-hydrolysis',
  'gelatin-hydrolysis',
  'bile-solubility',
  'butyrate-disk',
  'catalase',
  'dnase',
  'mug-test',
  'microdase',
  'oxidase-test',
  'pyr-test',
  'spot-indole'
];

const coagulaseStageTypes: AtlasPage['visualType'][] = [
  'litmus-milk',
  'flagella-stain',
  'fermentation',
  'coagulase',
  'decarboxylase',
  'mrvp',
  'nitrate-reduction',
  'tsi-test',
  'xv-factor-test'
];

const isParasiteVisualType = (visualType: AtlasPage['visualType']) => visualType.startsWith('microscope-');
const isMycologyVisualType = (visualType: AtlasPage['visualType']) => visualType.startsWith('mycology-');
const isVirologyVisualType = (visualType: AtlasPage['visualType']) => visualType.startsWith('virology-');

const intestinalParasiteTypes: AtlasPage['visualType'][] = [
  'microscope-giardia',
  'microscope-cryptosporidium',
  'microscope-entamoeba',
  'microscope-enterobius',
  'microscope-strongyloides',
  'microscope-hookworm',
  'microscope-trichuris',
  'microscope-ascaris',
  'microscope-trichostrongylus',
  'microscope-taenia-egg',
  'microscope-hymenolepis',
  'microscope-diphyllobothrium',
  'microscope-cyclospora-cystoisospora',
  'microscope-entamoeba-panel',
  'microscope-blastocystis',
  'microscope-dientamoeba',
  'microscope-dipylidium',
  'microscope-taenia-scolex'
];

const bloodParasiteTypes: AtlasPage['visualType'][] = [
  'microscope-plasmodium',
  'microscope-babesia',
  'microscope-trypanosoma',
  'microscope-microfilaria',
  'microscope-schistosoma',
  'microscope-plasmodium-panel'
];

const tissueParasiteTypes: AtlasPage['visualType'][] = [
  'microscope-toxoplasma',
  'microscope-leishmania',
  'microscope-trichinella',
  'microscope-echinococcus'
];

const trematodeEggTypes: AtlasPage['visualType'][] = [
  'microscope-paragonimus',
  'microscope-operculated-eggs',
  'microscope-clonorchis',
  'microscope-fasciola'
];

const dimorphicFungusTypes: AtlasPage['visualType'][] = [
  'mycology-histoplasma',
  'mycology-blastomyces',
  'mycology-coccidioides',
  'mycology-sporothrix',
  'mycology-paracoccidioides',
  'mycology-penicillium-talaromyces'
];

const hyalineMoldTypes: AtlasPage['visualType'][] = [
  'mycology-aspergillus-fumigatus',
  'mycology-aspergillus-comparison'
];

const yeastFormTypes: AtlasPage['visualType'][] = [
  'mycology-candida-germ-tube',
  'mycology-cryptococcus',
  'mycology-trichosporon'
];

const opportunisticMoldTypes: AtlasPage['visualType'][] = [
  'mycology-fusarium',
  'mycology-scopulariopsis',
  'mycology-paecilomyces',
  'mycology-scedosporium'
];

const dematiaceousMoldTypes: AtlasPage['visualType'][] = [
  'mycology-dematiaceous-panel',
  'mycology-sclerotic-bodies',
  'mycology-bipolaris-exserohilum',
  'mycology-cladosporium',
  'mycology-chromo-agents',
  'mycology-exophiala'
];

const viralCpeTypes: AtlasPage['visualType'][] = [
  'virology-cpe-panel',
  'virology-herpesvirus-cpe'
];

const viralMolecularTypes: AtlasPage['visualType'][] = [
  'virology-respiratory-naat'
];

const viralSerologyTypes: AtlasPage['visualType'][] = [
  'virology-hepatitis-b-serology',
  'virology-hiv-screening'
];

const getAtlasStageClass = (visualType: AtlasPage['visualType']) => {
  if (utilizationStageTypes.includes(visualType)) {
    return 'utilization-stage';
  }

  if (visualType === 'of-medium') {
    return 'of-stage';
  }

  if (diskStageTypes.includes(visualType)) {
    return 'disk-stage';
  }

  if (visualType === 'camp-test') {
    return 'camp-stage';
  }

  if (coagulaseStageTypes.includes(visualType)) {
    return 'coagulase-stage';
  }

  if (isParasiteVisualType(visualType)) {
    return 'parasite-stage';
  }

  if (isMycologyVisualType(visualType)) {
    if (visualType === 'mycology-aspergillus-comparison') return 'mycology-stage mycology-comparison-stage';
    return visualType === 'mycology-dermatophyte-panel' ? 'mycology-stage dermatophyte-stage' : 'mycology-stage';
  }

  if (isVirologyVisualType(visualType)) {
    return viralSerologyTypes.includes(visualType) ? 'virology-stage virology-serology-stage' : 'virology-stage';
  }

  return '';
};

type MiniAtlasVisualProps = {
  page?: AtlasPage;
  slug?: string;
  showFullLink?: boolean;
};

export function MiniAtlasVisual({ page: providedPage, slug, showFullLink = true }: MiniAtlasVisualProps) {
  const page = providedPage ?? atlasPages.find((atlasPage) => atlasPage.slug === slug);

  if (!page) {
    return null;
  }

  return (
    <aside className="mini-atlas-visual" aria-label={`${page.title} visual preview`}>
      <div className="mini-atlas-copy">
        <span>{`Visual Atlas / ${visualDisciplineLabels[getDiscipline(page)]}`}</span>
        <h3>{page.boardTitle}</h3>
        <p>{page.boardNote}</p>
      </div>
      <div className={`lia-stage mini-atlas-stage ${getAtlasStageClass(page.visualType)}`} role="img" aria-label={page.ariaLabel}>
        {page.tubes.map((tube) => renderTube(tube, page.visualType))}
        <div className="mini-atlas-signature" aria-hidden="true">
          Learn Microbes | learnmicrobes.com
        </div>
      </div>
      {showFullLink && (
        <Link className="mini-atlas-link" to={`/visuals/${page.slug}`}>
          Open full visual
        </Link>
      )}
    </aside>
  );
}

function getVisualCategory(page: AtlasPage) {
  if (page.visualType === 'flagella-stain') {
    return 'Stains';
  }

  if (page.visualType === 'disk-susceptibility' || page.visualType === 'butyrate-disk' || page.visualType === 'catalase' || page.visualType === 'lap-test') {
    return 'Disk and spot tests';
  }

  if (page.visualType === 'growth-temperature') {
    return 'Growth conditions';
  }

  if (page.visualType === 'bile-esculin' || page.visualType === 'cetrimide' || page.visualType === 'citrate' || page.visualType === 'fermentation' || page.visualType === 'litmus-milk' || page.visualType === 'lia') {
    return 'Media reactions';
  }

  if (intestinalParasiteTypes.includes(page.visualType)) {
    return 'Intestinal Parasites';
  }

  if (page.visualType === 'microscope-trichomonas') {
    return 'Urogenital Parasites';
  }

  if (bloodParasiteTypes.includes(page.visualType)) {
    return 'Blood Parasites';
  }

  if (tissueParasiteTypes.includes(page.visualType)) {
    return 'Tissue Parasites';
  }

  if (trematodeEggTypes.includes(page.visualType)) {
    return 'Trematode Eggs';
  }

  if (page.visualType === 'mycology-mucorales') {
    return 'Mucorales';
  }

  if (hyalineMoldTypes.includes(page.visualType)) {
    return 'Hyaline Molds';
  }

  if (yeastFormTypes.includes(page.visualType)) {
    return 'Yeast Forms';
  }

  if (dimorphicFungusTypes.includes(page.visualType)) {
    return 'Systemic Mycoses';
  }

  if (opportunisticMoldTypes.includes(page.visualType)) {
    return 'Opportunistic Molds';
  }

  if (dematiaceousMoldTypes.includes(page.visualType)) {
    return 'Dematiaceous Molds';
  }

  if (page.visualType === 'mycology-dermatophyte-panel') {
    return 'Dermatophytes';
  }

  if (viralCpeTypes.includes(page.visualType)) {
    return 'Cytopathic Effects';
  }

  if (page.visualType === 'virology-cmv-inclusion') {
    return 'Inclusion Patterns';
  }

  if (page.visualType === 'virology-em-morphology') {
    return 'Electron Microscopy';
  }

  if (viralMolecularTypes.includes(page.visualType)) {
    return 'Molecular Panels';
  }

  if (viralSerologyTypes.includes(page.visualType)) {
    return 'Serology Patterns';
  }

  return 'Biochemical tests';
}

type VisualDiscipline = 'bacteriology' | 'parasitology' | 'mycology' | 'virology';

const visualDisciplineLabels: Record<VisualDiscipline, string> = {
  bacteriology: 'Bacteriology',
  parasitology: 'Parasitology',
  mycology: 'Mycology',
  virology: 'Virology'
};

const visualDisciplineSlugs = Object.keys(visualDisciplineLabels) as VisualDiscipline[];

const visualDisciplineSearchPlaceholders: Record<VisualDiscipline, string> = {
  bacteriology: 'Try indole, purple, Durham, 42 C, blackening...',
  parasitology: 'Try cyst, trophozoite, acid-fast, egg, ring form...',
  mycology: 'Try broad hyphae, spherule, macroconidia, germ tube...',
  virology: 'Try CPE, syncytia, inclusion, NAAT, serology...'
};

function getDiscipline(page: AtlasPage): VisualDiscipline {
  if (isParasiteVisualType(page.visualType)) {
    return 'parasitology';
  }

  if (isMycologyVisualType(page.visualType)) {
    return 'mycology';
  }

  if (isVirologyVisualType(page.visualType)) {
    return 'virology';
  }

  return 'bacteriology';
}

const gramPositiveLearnSlugs = new Set([
  'staphylococcus-micrococcus',
  'streptococcus-enterococcus',
  'gram-positive-bacilli-overview'
]);

const gramNegativeLearnSlugs = new Set([
  'enterobacterales',
  'gram-negative-rods-overview',
  'neisseria-moraxella',
  'nonfermenting-gram-negative-rods'
]);

const anaerobeTerms = [
  'anaerobe',
  'obligate anaerobe',
  'bacteroides',
  'clostridium',
  'fusobacterium',
  'prevotella',
  'porphyromonas'
];

function getVisualNextStep(page: AtlasPage): VisualNextStep {
  const discipline = getDiscipline(page);
  const textForMapping = [
    page.title,
    page.summary,
    page.boardTitle,
    page.boardNote,
    page.relatedLearnSlug ?? ''
  ].join(' ').toLowerCase();

  if (discipline === 'bacteriology') {
    if (anaerobeTerms.some((term) => textForMapping.includes(term))) {
      return {
        to: ANAEROBE_ROADMAP_PATH,
        label: 'Open the Anaerobe roadmap',
        description: 'Use the anaerobe workflow when the pattern points toward oxygen-sensitive organisms.'
      };
    }

    if (page.relatedLearnSlug && gramPositiveLearnSlugs.has(page.relatedLearnSlug)) {
      return {
        to: GRAM_POSITIVE_ROADMAP_PATH,
        label: 'Open the Gram Positive roadmap',
        description: 'Carry this visual clue into the Gram-positive bench workflow.'
      };
    }

    if (page.relatedLearnSlug && gramNegativeLearnSlugs.has(page.relatedLearnSlug)) {
      return {
        to: GRAM_NEGATIVE_ROADMAP_PATH,
        label: 'Open the Gram Negative roadmap',
        description: 'Carry this visual clue into the Gram-negative bench workflow.'
      };
    }

    return {
      to: UNKNOWN_ISOLATE_WORKUP_PATH,
      label: 'Build an unknown isolate path',
      description: 'Use this reaction as one clue in a stepwise bench workup.'
    };
  }

  return {
    to: STUDY_QUIZ_PATH,
    label: 'Practice related review questions',
    description: 'Reinforce this visual pattern with mixed clinical microbiology questions.'
  };
}

function groupPagesByFirstLetter(pages: AtlasPage[]) {
  return pages.reduce<Array<{ letter: string; pages: AtlasPage[] }>>((groups, page) => {
    const letter = page.title[0].toUpperCase();
    const current = groups[groups.length - 1];

    if (current?.letter === letter) {
      current.pages.push(page);
    } else {
      groups.push({ letter, pages: [page] });
    }

    return groups;
  }, []);
}

function VisualAtlasHub({ initialDiscipline = 'bacteriology' }: { initialDiscipline?: VisualDiscipline }) {
  const navigate = useNavigate();
  const [discipline, setDiscipline] = useState<VisualDiscipline>(initialDiscipline);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedAtlasPages = useMemo(() => getAlphabetizedAtlasPages(), []);

  const disciplinePages = useMemo(
    () => sortedAtlasPages.filter((page) => getDiscipline(page) === discipline),
    [sortedAtlasPages, discipline]
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(disciplinePages.map((page) => getVisualCategory(page))))],
    [disciplinePages]
  );

  const filteredPages = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return disciplinePages.filter((page) => {
      const category = getVisualCategory(page);
      const categoryMatches = activeCategory === 'All' || category === activeCategory;
      const searchableText = [
        page.title,
        page.summary,
        page.boardNote,
        page.trapTitle,
        page.tubes.map((tube) => `${tube.label} ${tube.name}`).join(' '),
        page.readoutRows.flat().join(' '),
        page.interpretationRows.flat().join(' '),
        getSearchAliases(page.slug, page.title).join(' ')
      ].join(' ').toLowerCase();

      return categoryMatches && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, searchQuery, disciplinePages]);

  const groupedPages = useMemo(() => groupPagesByFirstLetter(filteredPages), [filteredPages]);
  const availableLetters = useMemo(() => groupPagesByFirstLetter(disciplinePages).map((group) => group.letter), [disciplinePages]);
  const benchCardGroups = useMemo(() => (
    categories
      .filter((category) => category !== 'All')
      .map((category) => ({
        category,
        count: disciplinePages.filter((page) => getVisualCategory(page) === category).length
      }))
  ), [categories, disciplinePages]);

  useEffect(() => {
    setDiscipline(initialDiscipline);
    setActiveCategory('All');
    setSearchQuery('');
  }, [initialDiscipline]);

  const handleDisciplineChange = (nextDiscipline: VisualDiscipline) => {
    navigate(`/visuals/${nextDiscipline}`);
  };

  return (
    <div className="visual-atlas-shell">
      <header className="visual-atlas-hero">
        <span className="visual-kicker">Visual Atlas / Bench Cards</span>
        <h1>Bench Cards for visual microbiology review</h1>
        <p>
          Original Learn Microbes cards for media reactions, biochemical patterns, stains, growth clues, and practical interpretation anchors.
        </p>
      </header>

      <div className="visual-discipline-tabs" role="tablist" aria-label="Visual section">
        {visualDisciplineSlugs.map((d) => (
          <button
            key={d}
            role="tab"
            aria-selected={discipline === d}
            className={`${discipline === d ? 'active' : ''} ${subjectStainClass(d)}`.trim()}
            onClick={() => handleDisciplineChange(d)}
          >
            <i className="subject-stain-drop" aria-hidden="true" />
            {visualDisciplineLabels[d]}
          </button>
        ))}
      </div>

      <section className="bench-card-strip" aria-label="Bench card collections">
        {benchCardGroups.map((group) => (
          <button
            type="button"
            key={group.category}
            aria-pressed={activeCategory === group.category}
            onClick={() => setActiveCategory(group.category)}
          >
            <span>{group.count}</span>
            {group.category}
          </button>
        ))}
      </section>

      <section className="visual-atlas-controls" aria-label="Visual Atlas filters">
        <div className="visual-search-row">
          <label htmlFor="visual-atlas-search">Search visuals</label>
          <input
            id="visual-atlas-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={visualDisciplineSearchPlaceholders[discipline]}
          />
        </div>
        <div className="visual-filter-chips" aria-label="Filter visual categories">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? 'active' : ''}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="visual-alpha-jump" aria-label="Alphabetical visual sections">
          {availableLetters.map((letter) => (
            <a href={`#visual-letter-${letter}`} key={letter}>{letter}</a>
          ))}
        </div>
      </section>

      <section className="visual-atlas-index" aria-label="Visual Atlas pages">
        {groupedPages.length > 0 ? groupedPages.map((group) => (
          <div className="visual-letter-group" id={`visual-letter-${group.letter}`} key={group.letter}>
            <h2>{group.letter}</h2>
            <div className="visual-letter-grid">
              {group.pages.map((page) => (
                <Link className="visual-index-card" to={`/visuals/${page.slug}`} key={page.slug}>
                  <span className="visual-card-category">{getVisualCategory(page)}</span>
                  <h3>{page.title}</h3>
                  <p>{page.summary}</p>
                  <small>Bench card</small>
                </Link>
              ))}
            </div>
          </div>
        )) : (
          <div className="visual-empty-state">
            <h2>No visuals found</h2>
            <p>Try a different test name, color clue, organism, or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function VisualAtlasPage({ page }: { page: AtlasPage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { bookmarkError, isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarkStatusMessage, setBookmarkStatusMessage] = useState('');
  const [isBoardNoteExpanded, setIsBoardNoteExpanded] = useState(false);
  const [expandedAnchorIds, setExpandedAnchorIds] = useState<string[]>([]);
  const visualSequenceRef = useRef<HTMLElement>(null);
  const visualBoardRef = useRef<HTMLElement>(null);
  const isVisualBookmarked = isBookmarked('visual', page.slug);
  const shouldFocusVisual = Boolean((location.state as VisualNavigationState | null)?.focusVisual);
  const visualPosition = useMemo(() => {
    const pageDiscipline = getDiscipline(page);
    const sortedAtlasPages = getAlphabetizedAtlasPages().filter((p) => getDiscipline(p) === pageDiscipline);
    const index = sortedAtlasPages.findIndex((item) => item.slug === page.slug);

    return {
      current: index + 1,
      total: sortedAtlasPages.length,
      previousPage: index > 0 ? sortedAtlasPages[index - 1] : null,
      nextPage: index >= 0 && index < sortedAtlasPages.length - 1 ? sortedAtlasPages[index + 1] : null
    };
  }, [page.slug]);

  useEffect(() => {
    setIsBoardNoteExpanded(false);
    setExpandedAnchorIds([]);
    trackEvent('visual_card_opened', {
      visual_slug: page.slug,
      visual_title: page.title,
      visual_type: page.visualType
    });
  }, [page.slug, page.title, page.visualType]);

  useEffect(() => {
    const shouldUseStudyPosition = shouldFocusVisual
      || (typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 900px)').matches);

    if (!shouldUseStudyPosition) {
      return undefined;
    }

    let timeoutId: number | undefined;
    const animationFrameId = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        (visualSequenceRef.current ?? visualBoardRef.current)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 0);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [page.slug, shouldFocusVisual]);

  const handleBookmarkClick = async () => {
    if (!user) {
      navigate(buildAuthRedirectPath('/login', `${location.pathname}${location.search}`));
      return;
    }

    setBookmarkStatusMessage('');

    const result = await toggleBookmark({
      itemType: 'visual',
      itemSlug: page.slug,
      itemTitle: page.title,
      itemPath: `/visuals/${page.slug}`,
      itemSummary: page.summary
    });

    setBookmarkStatusMessage(result.message);
  };

  const renderVisualSequence = (placement: 'top' | 'bottom') => (
    <nav
      ref={placement === 'top' ? visualSequenceRef : undefined}
      className={`visual-sequence visual-sequence-${placement}`}
      aria-label="Previous and next Visual Atlas cards"
    >
      {visualPosition.previousPage ? (
        <Link className="visual-sequence-link previous" to={`/visuals/${visualPosition.previousPage.slug}`} state={{ focusVisual: true }}>
          <span className="visual-seq-icon" aria-hidden="true"><FontAwesomeIcon icon={faChevronLeft} /></span>
          <span className="visual-seq-text">
            <small>Previous visual</small>
            <strong>{visualPosition.previousPage.title}</strong>
          </span>
        </Link>
      ) : (
        <Link className="visual-sequence-link previous" to="/visuals">
          <span className="visual-seq-icon" aria-hidden="true"><FontAwesomeIcon icon={faChevronLeft} /></span>
          <span className="visual-seq-text">
            <small>Back to atlas</small>
            <strong>Visual Atlas index</strong>
          </span>
        </Link>
      )}

      <div className="visual-sequence-status" aria-label={`Visual ${visualPosition.current} of ${visualPosition.total}`}>
        <span>Visual</span>
        <strong>{visualPosition.current} / {visualPosition.total}</strong>
      </div>

      {visualPosition.nextPage ? (
        <Link className="visual-sequence-link next" to={`/visuals/${visualPosition.nextPage.slug}`} state={{ focusVisual: true }}>
          <span className="visual-seq-text">
            <small>Next visual</small>
            <strong>{visualPosition.nextPage.title}</strong>
          </span>
          <span className="visual-seq-icon" aria-hidden="true"><FontAwesomeIcon icon={faChevronRight} /></span>
        </Link>
      ) : (
        <Link className="visual-sequence-link next" to="/visuals">
          <span className="visual-seq-text">
            <small>Finished set</small>
            <strong>Back to atlas</strong>
          </span>
          <span className="visual-seq-icon" aria-hidden="true"><FontAwesomeIcon icon={faChevronRight} /></span>
        </Link>
      )}
    </nav>
  );

  const disciplineKicker = `Visual Atlas / ${visualDisciplineLabels[getDiscipline(page)]}`;
  const isLongBoardNote = page.boardNote.length > 230;
  const boardNoteText = isLongBoardNote && !isBoardNoteExpanded
    ? `${page.boardNote.slice(0, 230).trim()}...`
    : page.boardNote;
  const visualNextStep = getVisualNextStep(page);
  const toggleAnchorNote = (anchorId: string) => {
    setExpandedAnchorIds((currentIds) => (
      currentIds.includes(anchorId)
        ? currentIds.filter((id) => id !== anchorId)
        : [...currentIds, anchorId]
    ));
  };

  return (
    <div className="visual-atlas-shell">
      <header className="visual-atlas-hero">
        <span className="visual-kicker">{disciplineKicker}</span>
        <h1>{page.title}</h1>
        <p>{page.summary}</p>
        <div className="visual-hero-actions">
          {getDiscipline(page) === 'bacteriology' && (
            <button
              type="button"
              onClick={() => navigate(page.biochemicalTestId ? `/biochemical-tests?test=${page.biochemicalTestId}` : '/biochemical-tests')}
            >
              Open procedure/QC reference
            </button>
          )}
          <button
            type="button"
            className={`visual-bookmark-toggle ${isVisualBookmarked ? 'saved' : ''}`}
            onClick={handleBookmarkClick}
            aria-pressed={isVisualBookmarked}
          >
            <FontAwesomeIcon icon={faBookmark} />
            {user ? (isVisualBookmarked ? 'Saved Bookmark' : 'Save Bookmark') : 'Sign in to Bookmark'}
          </button>
          {page.relatedLearnSlug && <Link to={`/learn/${page.relatedLearnSlug}`}>Read concept page</Link>}
        </div>
        <div className="visual-next-step">
          <div>
            <span>Next step</span>
            <p>{visualNextStep.description}</p>
          </div>
          <Link to={visualNextStep.to}>{visualNextStep.label}</Link>
        </div>
        {(bookmarkStatusMessage || bookmarkError) && (
          <p className={`visual-bookmark-status ${bookmarkError ? 'error' : ''}`} role={bookmarkError ? 'alert' : 'status'}>
            {bookmarkError || bookmarkStatusMessage}
          </p>
        )}
      </header>

      {renderVisualSequence('top')}

      <section ref={visualBoardRef} className="visual-board" aria-labelledby="visual-board-title">
        <div className="visual-board-heading">
          <div>
            <span className="visual-kicker">Bench card visual</span>
            <h2 id="visual-board-title">{page.boardTitle}</h2>
          </div>
        </div>

        <div className="visual-board-read-first">
          <span>Read first</span>
          <p>{boardNoteText}</p>
          {isLongBoardNote && (
            <button
              type="button"
              className="visual-note-toggle"
              onClick={() => setIsBoardNoteExpanded((expanded) => !expanded)}
            >
              {isBoardNoteExpanded ? 'Show less' : 'Show full note'}
            </button>
          )}
        </div>

        <div className={`lia-stage ${getAtlasStageClass(page.visualType)}`} role="img" aria-label={page.ariaLabel}>
          {page.tubes.map((tube) => renderTube(tube, page.visualType))}
          <div className="visual-board-signature" aria-hidden="true">
            Learn Microbes | learnmicrobes.com
          </div>
        </div>
        <div className="visual-result-anchors" aria-label="Visual result anchors">
          {page.tubes.map((tube) => {
            const isAnchorExpanded = expandedAnchorIds.includes(tube.id);
            const isLongAnchorNote = tube.note.length > 165;
            const anchorNote = isLongAnchorNote && !isAnchorExpanded
              ? `${tube.note.slice(0, 165).trim()}...`
              : tube.note;

            return (
              <div className="visual-result-anchor" key={tube.id}>
                <span>{tube.label}</span>
                <strong>{tube.name}</strong>
                <p>{anchorNote}</p>
                {isLongAnchorNote && (
                  <button
                    type="button"
                    className="visual-note-toggle"
                    onClick={() => toggleAnchorNote(tube.id)}
                  >
                    {isAnchorExpanded ? 'Show less' : 'Show detail'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="visual-panel">
        <span className="visual-kicker">What to look for</span>
        <h2>{page.readoutTitle}</h2>
        <table className="visual-table">
          <thead>
            <tr>
              {tableHeaders.map((heading) => <th key={heading}>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {page.readoutRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => <td key={cell}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <aside className="visual-panel visual-callout visual-trap-panel">
        <span className="visual-kicker">Common trap</span>
        <h2>{page.trapTitle}</h2>
        <p>{page.trapBody}</p>
        <ul>
          {page.trapBullets.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </aside>

      <section className="visual-panel">
        <span className="visual-kicker">Interpretation table</span>
        <h2>{page.interpretationTitle}</h2>
        <table className="visual-table">
          <thead>
            <tr>
              {interpretationHeaders.map((heading) => <th key={heading}>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {page.interpretationRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => <td key={cell}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="visual-takeaways">
        <div>
          <span className="visual-kicker">Key takeaways</span>
          <ul>
            {page.takeaways.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="visual-remember">
          <strong>Remember</strong>
          <p>{page.remember}</p>
        </div>
      </section>

      {renderVisualSequence('bottom')}
    </div>
  );
}

const VisualAtlas: React.FC = () => {
  const { slug } = useParams();
  const disciplineSlug = visualDisciplineSlugs.find((discipline) => discipline === slug);
  const page = atlasPages.find((item) => item.slug === slug);

  if (!slug) {
    return <VisualAtlasHub />;
  }

  if (disciplineSlug) {
    return <VisualAtlasHub initialDiscipline={disciplineSlug} />;
  }

  if (!page) {
    return <VisualAtlasHub />;
  }

  return <VisualAtlasPage page={page} />;
};

export default VisualAtlas;
