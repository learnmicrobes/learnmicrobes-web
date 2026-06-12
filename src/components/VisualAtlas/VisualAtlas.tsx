import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getSearchAliases } from '../../data/searchAliases';
import { trackEvent } from '../../utils/analytics';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { buildAuthRedirectPath } from '../../utils/authRedirect';
import './VisualAtlas.css';

export type TubeVisual = {
  id: string;
  label: string;
  name: string;
  colors: {
    slant: string;
    butt: string;
    base: string;
  };
  note: string;
  growth?: 'heavy' | 'light' | 'none';
};

export type AtlasPage = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  boardTitle: string;
  boardNote: string;
  ariaLabel: string;
  visualType: 'lia' | 'utilization' | 'disk-susceptibility' | 'esculin-hydrolysis' | 'fermentation' | 'flagella-stain' | 'gelatin-hydrolysis' | 'growth-temperature' | 'hippurate-hydrolysis' | 'indole-production' | 'lap-test' | 'litmus-milk' | 'bile-esculin' | 'bile-solubility' | 'butyrate-disk' | 'camp-test' | 'catalase' | 'cetrimide' | 'citrate' | 'coagulase' | 'decarboxylase' | 'dnase' | 'mrvp' | 'microdase' | 'motility' | 'mrs-broth' | 'mug-test' | 'nitrate-reduction' | 'nitrite-reduction' | 'onpg-test' | 'optochin-test' | 'oxidase-test' | 'of-medium' | 'phenylalanine-deaminase' | 'pyr-test' | 'pyruvate-broth' | 'salt-tolerance' | 'spot-indole' | 'tsi-test' | 'urease-test' | 'xv-factor-test' | 'microscope-giardia' | 'microscope-cryptosporidium' | 'microscope-entamoeba' | 'microscope-trichomonas' | 'microscope-enterobius' | 'microscope-strongyloides' | 'microscope-hookworm' | 'microscope-trichuris' | 'microscope-plasmodium' | 'microscope-babesia' | 'microscope-trypanosoma' | 'microscope-toxoplasma' | 'microscope-leishmania' | 'microscope-ascaris' | 'microscope-trichostrongylus' | 'microscope-trichinella' | 'microscope-microfilaria' | 'microscope-taenia-egg' | 'microscope-paragonimus' | 'microscope-schistosoma' | 'microscope-hymenolepis' | 'microscope-diphyllobothrium' | 'microscope-echinococcus' | 'microscope-plasmodium-panel' | 'microscope-cyclospora-cystoisospora' | 'microscope-entamoeba-panel' | 'microscope-operculated-eggs' | 'microscope-blastocystis' | 'microscope-dientamoeba' | 'microscope-clonorchis' | 'microscope-fasciola' | 'microscope-dipylidium' | 'microscope-taenia-scolex' | 'mycology-mucorales' | 'mycology-aspergillus-fumigatus' | 'mycology-histoplasma' | 'mycology-blastomyces' | 'mycology-coccidioides' | 'mycology-dermatophyte-panel' | 'mycology-candida-germ-tube' | 'mycology-cryptococcus' | 'mycology-sporothrix' | 'mycology-paracoccidioides' | 'mycology-fusarium' | 'mycology-penicillium-talaromyces' | 'mycology-scopulariopsis' | 'mycology-paecilomyces' | 'mycology-scedosporium' | 'mycology-trichosporon' | 'mycology-dematiaceous-panel' | 'mycology-aspergillus-comparison' | 'mycology-sclerotic-bodies' | 'mycology-bipolaris-exserohilum' | 'mycology-cladosporium' | 'mycology-chromo-agents' | 'mycology-exophiala' | 'virology-cpe-panel' | 'virology-herpesvirus-cpe' | 'virology-cmv-inclusion' | 'virology-respiratory-naat' | 'virology-hepatitis-b-serology' | 'virology-hiv-screening';
  tubes: TubeVisual[];
  readoutTitle: string;
  readoutRows: string[][];
  trapTitle: string;
  trapBody: string;
  trapBullets: string[];
  interpretationTitle: string;
  interpretationRows: string[][];
  takeaways: string[];
  remember: string;
  biochemicalTestId?: string;
  relatedLearnSlug?: string;
  divr?: {
    detect: string;
    identify: string[];
    verify: string;
    report: string;
  };
};

type VisualNextStep = {
  to: string;
  label: string;
  description: string;
};

const GRAM_POSITIVE_ROADMAP_PATH = '/gram-positive-roadmap';
const GRAM_NEGATIVE_ROADMAP_PATH = '/gram-negative-roadmap';
const ANAEROBE_ROADMAP_PATH = '/obligate-anaerobe-roadmap';
const UNKNOWN_ISOLATE_WORKUP_PATH = '/unknown-isolate-workup';
const STUDY_QUIZ_PATH = '/study-quiz';

export const atlasPages: AtlasPage[] = [
  {
    slug: 'lysine-iron-agar',
    title: 'Lysine Iron Agar Reaction Guide',
    eyebrow: 'Visual Atlas Prototype',
    summary: 'An original Learn Microbes bench visual for reading LIA tube patterns without relying on textbook photos.',
    boardTitle: 'LIA tubes A-E',
    boardNote: 'Read the slant first, then the butt, then H2S blackening.',
    ariaLabel: 'Illustrated lysine iron agar tube reactions A through E',
    visualType: 'lia',
    tubes: [
      {
        id: 'A',
        label: 'K/K',
        name: 'Alkaline slant / alkaline butt',
        colors: { slant: '#b735a0', butt: '#c01893', base: '#d63aaa' },
        note: 'No glucose fermentation pattern; lysine readout is not supported without acid butt first.'
      },
      {
        id: 'B',
        label: 'K/K + H2S',
        name: 'Alkaline slant / blackened butt',
        colors: { slant: '#b53d9b', butt: '#151313', base: '#080808' },
        note: 'Hydrogen sulfide blackening can mask the butt reaction.'
      },
      {
        id: 'C',
        label: 'K/A',
        name: 'Alkaline slant / acid butt',
        colors: { slant: '#c14692', butt: '#f4a51f', base: '#f2a01b' },
        note: 'Glucose fermented, lysine decarboxylase negative.'
      },
      {
        id: 'D',
        label: 'R/A',
        name: 'Red slant / acid butt',
        colors: { slant: '#c42632', butt: '#f3a51e', base: '#eda11e' },
        note: 'Red slant suggests lysine deamination.'
      },
      {
        id: 'E',
        label: 'Control',
        name: 'Uninoculated medium',
        colors: { slant: '#d769bb', butt: '#c01593', base: '#c11691' },
        note: 'Use the baseline color to judge true reaction shifts.'
      }
    ],
    readoutTitle: 'Color-to-result anchors',
    readoutRows: [
      ['Purple slant', 'Alkaline reaction', 'Usually written as K'],
      ['Yellow butt', 'Acid from glucose fermentation', 'Usually written as A'],
      ['Purple butt after early acid', 'Lysine decarboxylase positive', 'Supports LDC-positive interpretation'],
      ['Red slant', 'Lysine deaminase activity', 'Think Proteeae-style deamination logic'],
      ['Blackening', 'H2S production', 'May obscure the butt color']
    ],
    trapTitle: 'Do not read LIA as one color',
    trapBody: 'LIA is a pattern read. The slant, butt, and blackening answer different questions, so one dramatic color can hide the full interpretation.',
    trapBullets: [
      'Blackening means H2S is present.',
      'Red slant points toward deamination.',
      'Yellow butt means acid remains in the butt.'
    ],
    interpretationTitle: 'LIA study readout',
    interpretationRows: [
      ['K/A', 'Lysine decarboxylase negative', 'Glucose fermented, butt stays acid/yellow.'],
      ['K/K', 'Lysine decarboxylase positive when glucose was fermented first', 'Butt returns alkaline/purple after decarboxylation.'],
      ['K/K + H2S', 'H2S positive', 'Black precipitate can cover the butt color; report H2S separately.'],
      ['R/A', 'Lysine deaminase positive', 'Red slant with acid butt; separates deaminating organisms.'],
      ['Control', 'Baseline medium', 'Do not interpret as a patient isolate reaction.']
    ],
    takeaways: [
      'Always separate slant, butt, and H2S.',
      'LIA is especially useful in Enterobacterales branch logic.',
      'Use LIA with TSI/KIA, indole, urease, motility, and organism context.'
    ],
    remember: 'Original visuals should teach the concept, not recreate a textbook figure.',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'acetamide-utilization',
    title: 'Acetamide Utilization Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'A bench-card style visual for recognizing acetamide utilization as growth plus alkalinization, not just a pretty blue-green tube.',
    boardTitle: 'Acetamide slants A-B',
    boardNote: 'Positive means the organism grows and shifts the medium blue from alkaline products.',
    ariaLabel: 'Illustrated acetamide utilization slants showing positive and negative reactions',
    visualType: 'utilization',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Growth with blue alkaline shift',
        colors: { slant: '#18a2be', butt: '#167c9f', base: '#0b6f91' },
        note: 'Acetamide is used; ammonia raises pH and pushes the indicator blue.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'No growth or green unchanged medium',
        colors: { slant: '#25b788', butt: '#16a36f', base: '#0f8c62' },
        note: 'No meaningful utilization; read with the control and organism context.',
        growth: 'none'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Visible growth', 'The isolate can grow using the available substrate', 'Required before trusting the color shift'],
      ['Blue medium', 'Alkaline products raised the pH', 'Supports a positive acetamide result'],
      ['Green medium', 'No alkaline shift', 'Usually negative if growth is absent or minimal'],
      ['Heavy inoculum', 'Can drag nutrients into the tube', 'May create a misleading result']
    ],
    trapTitle: 'Do not over-inoculate the slant',
    trapBody: 'Utilization tests ask whether the organism can use a specific substrate under limited conditions. Carryover from a heavy inoculum can blur that question.',
    trapBullets: [
      'Use a light inoculum from a pure culture.',
      'Judge growth and color together.',
      'Treat a weak or delayed reaction as organism- and method-dependent.'
    ],
    interpretationTitle: 'Acetamide study readout',
    interpretationRows: [
      ['Positive', 'Growth with blue alkalinization', 'Classically useful in nonfermenting Gram-negative rod workups such as Pseudomonas-style branch logic.'],
      ['Negative', 'No growth or green unchanged medium', 'Does not support acetamide utilization; correlate with oxidase, pigment, cetrimide, and growth temperature.'],
      ['Equivocal', 'Weak growth or delayed color change', 'Repeat or extend only according to local procedure; do not force a call from a faint tube.']
    ],
    takeaways: [
      'Acetamide positive is a growth-plus-blue pattern.',
      'A green tube with no meaningful growth is negative.',
      'Use acetamide as one branch point, not as a stand-alone ID.'
    ],
    remember: 'The teaching target is the decision rule: growth first, color second, profile always.',
    biochemicalTestId: 'acetamide',
    relatedLearnSlug: 'nonfermenting-gram-negative-rods'
  },
  {
    slug: 'acetate-utilization',
    title: 'Acetate Utilization Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original acetate slant visual for reading growth and blue alkalinization in enteric and related bench profiles.',
    boardTitle: 'Acetate slants A-B',
    boardNote: 'A positive acetate reaction needs visible growth, often with a blue alkaline shift.',
    ariaLabel: 'Illustrated acetate utilization slants showing positive and negative reactions',
    visualType: 'utilization',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Growth with blue alkaline medium',
        colors: { slant: '#168fd0', butt: '#1179bc', base: '#0a629f' },
        note: 'The organism uses acetate and produces alkaline change.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Green medium without meaningful growth',
        colors: { slant: '#34bd8a', butt: '#21a871', base: '#16895c' },
        note: 'No usable acetate pattern; faint surface haze should be interpreted cautiously.',
        growth: 'light'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Growth on the slant', 'The organism tolerated the medium and used the carbon source', 'Needed for a positive call'],
      ['Blue color', 'Alkaline products shifted the indicator', 'Positive when paired with growth'],
      ['Green color', 'No alkaline shift', 'Negative when growth is absent or poor'],
      ['Delayed change', 'Some organisms may be slow or variable', 'Follow validated incubation timing']
    ],
    trapTitle: 'Acetate is not a single-organism answer',
    trapBody: 'Acetate is a profile-building test. It is most useful when combined with the Gram stain, colony behavior, oxidase, MacConkey growth, and the rest of the biochemical pattern.',
    trapBullets: [
      'Separate growth from color before interpreting.',
      'Do not use acetate alone to name an isolate.',
      'A faint haze is not the same as clear positive growth.'
    ],
    interpretationTitle: 'Acetate study readout',
    interpretationRows: [
      ['Positive', 'Growth with blue alkalinization', 'Supports acetate utilization in the correct organism context.'],
      ['Negative', 'No growth or unchanged green medium', 'Does not support acetate utilization; use with the rest of the profile.'],
      ['Delayed or weak', 'Subtle growth or late color shift', 'Check timing and controls before assigning significance.']
    ],
    takeaways: [
      'Read acetate as growth plus indicator change.',
      'Green without meaningful growth is negative.',
      'Use acetate to strengthen a profile, especially when separating similar Gram-negative branches.'
    ],
    remember: 'For students, the clean mental model is: substrate use creates growth; alkaline products turn the tube blue.',
    biochemicalTestId: 'acetate',
    relatedLearnSlug: 'gram-negative-rods-overview'
  },
  {
    slug: 'bacitracin-susceptibility',
    title: 'Bacitracin Susceptibility (A Disk)',
    eyebrow: 'Visual Atlas',
    summary: 'An original bench-card visual demonstrating bacitracin susceptibility for presumptive Group A strep identification.',
    boardTitle: 'Bacitracin plates A-B',
    boardNote: 'Compare the zone of inhibition around the 0.04-unit bacitracin (A) disk.',
    ariaLabel: 'Illustrated bacitracin susceptibility plates showing susceptible and resistant reactions',
    visualType: 'disk-susceptibility',
    tubes: [
      {
        id: 'A',
        label: 'Susceptible (Positive)',
        name: 'Streptococcus pyogenes',
        colors: { slant: '#9e1b24', butt: '#ebd78d', base: '#9e1b24' },
        note: 'Clear zone of inhibition >10 mm around disk A; presumptive identification for Group A Strep.'
      },
      {
        id: 'B',
        label: 'Resistant (Negative)',
        name: 'Streptococcus agalactiae',
        colors: { slant: '#9e1b24', butt: '#ebd78d', base: '#9e1b24' },
        note: 'No zone of inhibition; growth right up to the 6 mm disk edge.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Zone of Inhibition', 'Clear area around the disk where bacterial growth is inhibited', 'Shorthand: Zone (S)'],
      ['No Zone of Inhibition', 'Bacterial growth right up to the edge of the 6 mm disk', 'Shorthand: No Zone (R)'],
      ['Beta-Hemolysis', 'Complete lysis of red blood cells in agar, creating a cleared/yellowish appearance', 'Look for transparency around lawn'],
      ['0.04 U Disk (Taxo A)', 'Paper disk impregnated with 0.04 units of bacitracin', 'Labeled with "A"']
    ],
    trapTitle: 'Do not use bacitracin as a universal Strep ID',
    trapBody: 'Bacitracin susceptibility is only a presumptive test. It must only be performed on beta-hemolytic streptococci, as other organisms can be susceptible or resistant without clinical significance for Group A differentiation.',
    trapBullets: [
      'Perform only on pure cultures showing beta-hemolysis.',
      'Other beta-hemolytic strep (like Groups C and G) can occasionally be susceptible.',
      'Always confirm with serological typing (Lancefield groups) or PYR testing.'
    ],
    interpretationTitle: 'Bacitracin study readout',
    interpretationRows: [
      ['Susceptible (Positive)', 'Any zone of inhibition (>10 mm)', 'Presumptive Streptococcus pyogenes (Group A streptococci) or Micrococcus luteus.'],
      ['Resistant (Negative)', 'No zone of inhibition (growth up to disk)', 'Presumptive Streptococcus agalactiae (Group B streptococci) or Staphylococcus aureus.'],
      ['Beta-Hemolytic Context', 'Must pair with morphology and catalase', 'Catalase-negative, Gram-positive cocci in chains; confirms it is streptococci first.']
    ],
    takeaways: [
      'Presumptively differentiates S. pyogenes (susceptible) from S. agalactiae (resistant).',
      'Requires a lawn of beta-hemolytic streptococci on sheep blood agar (SBA).',
      'The PYR test is more specific and has largely replaced bacitracin in modern labs, but bacitracin remains high-yield for exams (ASCP/ASCPi).'
    ],
    remember: 'PYR is positive for Group A Strep and Enterococci; use PYR alongside Bacitracin to secure your exam prep.',
    biochemicalTestId: 'bacitracin',
    relatedLearnSlug: 'streptococcus-enterococcus'
  },
  {
    slug: 'bile-esculin',
    title: 'Bile Esculin Reaction Guide',
    eyebrow: 'Visual Atlas',
    summary: 'A visual reference for recognizing esculin hydrolysis in the presence of 4% bile salts as a key marker for Enterococci and Group D Streptococci.',
    boardTitle: 'Bile Esculin slants A-B',
    boardNote: 'Hydrolysis of esculin in the presence of bile creates a dark brown to black complex.',
    ariaLabel: 'Bile Esculin agar slants showing positive and negative reactions',
    visualType: 'bile-esculin',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Enterococcus faecalis',
        colors: { slant: '#121212', butt: '#181818', base: '#0a0a0a' },
        note: 'Growth and complete blackening of the slant medium.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Streptococcus pyogenes',
        colors: { slant: '#ca9e54', butt: '#b8893d', base: '#996f2a' },
        note: 'No growth and no color change (medium remains honey-amber).',
        growth: 'none'
      }
    ],
    readoutTitle: 'Color-to-result anchors',
    readoutRows: [
      ['Black precipitate', 'Esculin hydrolyzed to esculetin, reacting with ferric ions', 'Shorthand: Positive (+)'],
      ['Honey-amber medium', 'Esculin was not hydrolyzed; no ferric complex formed', 'Shorthand: Negative (-)'],
      ['Bile resistance', 'Ability to grow in 4% bile salts', 'Differentiates from other sensitive streptococci']
    ],
    trapTitle: 'Beware of weak/delayed reactions',
    trapBody: 'Some viridans streptococci can slowly hydrolyze esculin but are usually inhibited by the 4% bile salts. Do not misinterpret a slight brown tint on the slant surface as a solid positive reaction.',
    trapBullets: [
      'Positive requires >50% of the tube to be blackened.',
      'Check growth capability on selective media if esculin is weak.',
      'Ensure standard 24-48 hour incubation is complete before calling negative.'
    ],
    interpretationTitle: 'Bile Esculin study readout',
    interpretationRows: [
      ['Positive', 'Growth with blackening (>50% of tube)', 'Presumptive Enterococcus species or Streptococcus bovis group.'],
      ['Negative', 'No growth or growth with no color change', 'Bile-sensitive or esculin-negative streptococci (e.g. S. pyogenes).'],
      ['Quality Control', 'Use E. faecalis and S. pyogenes', 'Confirms both the selectivity and differential reactivity of the agar slant.']
    ],
    takeaways: [
      'Differentiates Group D Streptococci and Enterococci from other streptococci.',
      'Requires both survival in 4% bile salts and active esculin hydrolysis.',
      'Always correlate with Gram stain morphology (GPC in pairs/chains) and catalase status (negative).'
    ],
    remember: 'PYR is also positive for Enterococcus, separating it from the S. bovis group (PYR negative).',
    biochemicalTestId: 'bile-esculin',
    relatedLearnSlug: 'streptococcus-enterococcus'
  },
  {
    slug: 'esculin-hydrolysis',
    title: 'Esculin Hydrolysis Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original bench visual for reading esculin hydrolysis without confusing the plain esculin test with bile esculin.',
    boardTitle: 'Esculin slants A-B',
    boardNote: 'Positive reactions darken as esculetin reacts with ferric ions; negative tubes stay tan/amber.',
    ariaLabel: 'Esculin hydrolysis slants showing positive blackening and negative unchanged medium',
    visualType: 'esculin-hydrolysis',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Blackened slant',
        colors: { slant: '#17130f', butt: '#0e0d0b', base: '#080808' },
        note: 'Esculin is hydrolyzed; esculetin complexes with iron and darkens the medium.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Unchanged tan medium',
        colors: { slant: '#d39a55', butt: '#c98945', base: '#b67635' },
        note: 'No blackening; the tube keeps the baseline amber/tan appearance.',
        growth: 'none'
      }
    ],
    readoutTitle: 'Color-to-result anchors',
    readoutRows: [
      ['Dark brown to black medium', 'Esculin hydrolysis produced esculetin, which reacted with ferric ions', 'Positive esculin hydrolysis'],
      ['Tan or amber medium', 'No visible ferric esculetin complex formed', 'Negative reaction'],
      ['Fluorescence loss under Wood lamp', 'Esculin fluorescence can disappear when hydrolysis occurs', 'Supportive positive clue when used by the method'],
      ['No fluorescence loss', 'Esculin remains unhydrolyzed', 'Supports negative result with no blackening']
    ],
    trapTitle: 'Plain esculin is not bile esculin',
    trapBody: 'Esculin hydrolysis detects substrate breakdown, while bile esculin also tests whether the organism can grow in bile. Keep those ideas separate when studying tables and workflows.',
    trapBullets: [
      'Plain esculin does not add the selective bile question.',
      'Call a positive from clear blackening, not a faint surface shadow.',
      'Use controls and timing before deciding a slow or weak tube.'
    ],
    interpretationTitle: 'Esculin hydrolysis study readout',
    interpretationRows: [
      ['Positive', 'Blackening of the medium, often with fluorescence loss if checked', 'The organism hydrolyzes esculin; interpret with the organism group and other biochemical tests.'],
      ['Negative', 'No blackening and unchanged baseline medium', 'Esculin hydrolysis is not demonstrated.'],
      ['Bile esculin comparison', 'Bile-containing medium adds bile tolerance to the readout', 'Use the bile esculin page for Enterococcus/Group D Strep-style logic.']
    ],
    takeaways: [
      'Esculin hydrolysis is a substrate breakdown test.',
      'Blackening is the easiest visual anchor for a positive result.',
      'Do not merge plain esculin logic with bile esculin selectivity.'
    ],
    remember: 'The clean mental split: esculin asks "can it hydrolyze esculin?"; bile esculin asks that plus "can it tolerate bile?"',
    biochemicalTestId: 'esculin',
    relatedLearnSlug: 'gram-negative-rods-overview'
  },
  {
    slug: 'bile-solubility',
    title: 'Bile Solubility Test Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original bench reference illustrating the dissolution of Streptococcus pneumoniae colonies under 10% sodium desoxycholate.',
    boardTitle: 'Bile Solubility plates A-B',
    boardNote: 'Observe colony integrity inside the drop of 10% sodium desoxycholate after 30 minutes.',
    ariaLabel: 'Illustrated colony reactions showing lysis (positive) and intact colonies (negative) under reagent drops',
    visualType: 'bile-solubility',
    tubes: [
      {
        id: 'A',
        label: 'Soluble (Positive)',
        name: 'Streptococcus pneumoniae',
        colors: { slant: '#521d1d', butt: '#8ca08c', base: '#521d1d' },
        note: 'Colonies completely dissolve (lyse) under the reagent drop, leaving only flat shiny imprints.'
      },
      {
        id: 'B',
        label: 'Insoluble (Negative)',
        name: 'Streptococcus agalactiae',
        colors: { slant: '#521d1d', butt: '#819181', base: '#521d1d' },
        note: 'Colonies remain completely intact, raised, and solid under the reagent drop.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Colony Lysis', 'Bile salts lower surface tension, activating intracellular autolytic enzymes (amidase)', 'Shorthand: Soluble (+)'],
      ['Intact Colonies', 'Lack of autolytic response; colonies remain distinct and raised', 'Shorthand: Insoluble (-)'],
      ['Reagent Drop', '10% sodium desoxycholate applied directly on active growth', 'Requires active incubation']
    ],
    trapTitle: 'Do not wash colonies away',
    trapBody: 'When applying the 10% sodium desoxycholate, gently place the drop onto the colonies rather than washing them down the agar surface. Agitation can mimic lysis by physically displacing the colonies.',
    trapBullets: [
      'Gently place 1-2 drops directly onto a well-isolated colony.',
      'Keep the plate horizontal during incubation.',
      'Old cultures may lose autolytic activity, giving false-negative results.'
    ],
    interpretationTitle: 'Bile Solubility study readout',
    interpretationRows: [
      ['Soluble (Positive)', 'Colonies disintegrate completely within 30 minutes', 'Confirms Streptococcus pneumoniae (pneumococci).'],
      ['Insoluble (Negative)', 'Colonies remain fully intact and visible', 'Presumptive alpha-hemolytic viridans streptococci or enterococci.'],
      ['Method note', 'Can also be run in tube broth', 'Broth clearing is positive; persistent turbidity is negative.']
    ],
    takeaways: [
      'Specifically identifies S. pneumoniae among alpha-hemolytic streptococci.',
      'Relies on desoxycholate-activated autolysis, not direct chemical dissolution.',
      'Correlate with optochin susceptibility (P-disk) for full presumptive confirmation.'
    ],
    remember: 'S. pneumoniae is optochin susceptible (zone >= 14 mm) and bile soluble.',
    biochemicalTestId: 'bile-solubility',
    relatedLearnSlug: 'streptococcus-enterococcus'
  },
  {
    slug: 'fermentation-media',
    title: 'Fermentation Media Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original broth-tube visual for reading carbohydrate fermentation as acid production, with gas captured separately in a Durham tube.',
    boardTitle: 'Fermentation broths A-D',
    boardNote: 'Read color for acid, then inspect the Durham tube for gas. The two observations answer different questions.',
    ariaLabel: 'Illustrated fermentation broth tubes showing acid with gas, acid without gas, negative broth, and uninoculated control',
    visualType: 'fermentation',
    tubes: [
      {
        id: 'A',
        label: 'Acid + gas',
        name: 'Pink or yellow acid shift with bubble',
        colors: { slant: '#e84f90', butt: '#f18aac', base: '#e84f90' },
        note: 'Carbohydrate is fermented and gas is trapped in the Durham tube.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Acid only',
        name: 'Acid color change, no bubble',
        colors: { slant: '#f4c542', butt: '#f6d66f', base: '#f4c542' },
        note: 'Fermentation produced acid, but gas is not detected.',
        growth: 'heavy'
      },
      {
        id: 'C',
        label: 'Negative',
        name: 'No acid color change',
        colors: { slant: '#6b4aa5', butt: '#8467b8', base: '#6b4aa5' },
        note: 'Growth without acid shift or gas. Interpret only after the validated incubation time.',
        growth: 'light'
      },
      {
        id: 'D',
        label: 'Control',
        name: 'Uninoculated baseline',
        colors: { slant: '#eee1b5', butt: '#f2e8c9', base: '#e7d7a4' },
        note: 'Use the baseline tube to judge true color movement.',
        growth: 'none'
      }
    ],
    readoutTitle: 'Read acid and gas separately',
    readoutRows: [
      ['Pink/yellow acid shift', 'Carbohydrate fermentation produced acid', 'Fermentation positive'],
      ['Bubble in Durham tube', 'Gas was produced during metabolism', 'Gas positive'],
      ['No color shift', 'No acid detected from that carbohydrate', 'Fermentation negative or delayed'],
      ['Unchanged control', 'Baseline appearance for the medium and indicator', 'Do not report as an isolate reaction']
    ],
    trapTitle: 'Do not call it too early',
    trapBody: 'Some fermentation broths can look falsely nonreactive early, while later peptone use can push the medium back toward alkaline color. Timing matters.',
    trapBullets: [
      'Use the validated read window for the organism group.',
      'Record acid color and gas as separate observations.',
      'A bubble without a clear acid pattern still needs method and control review.'
    ],
    interpretationTitle: 'Fermentation study readout',
    interpretationRows: [
      ['Acid + gas', 'Fermentation positive, gas positive', 'Report acid production and gas production for the tested carbohydrate.'],
      ['Acid only', 'Fermentation positive, gas negative', 'The carbohydrate was fermented, but gas was not produced or detected.'],
      ['No acid, no gas', 'Fermentation negative or delayed', 'Interpret with incubation time, growth, and organism group.'],
      ['Late alkaline shift', 'Possible peptone use after carbohydrate is exhausted', 'Do not let late reversion erase an earlier valid acid result unless your method says to.']
    ],
    takeaways: [
      'Fermentation media answer whether a specific carbohydrate produced acid.',
      'The Durham tube answers whether gas was produced.',
      'Indicator systems differ, so learn the color logic for the medium in front of you.'
    ],
    remember: 'Best mental model: color is acid; Durham bubble is gas; timing decides whether the read is valid.',
    biochemicalTestId: 'fermentation',
    relatedLearnSlug: 'bacterial-identification-principles'
  },
  {
    slug: 'flagella-stain-wet-mount',
    title: 'Flagella Stain Wet Mount Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original schematic guide for recognizing flagellar arrangements after wet mount flagella staining.',
    boardTitle: 'Flagella patterns A-D',
    boardNote: 'Focus on attachment pattern first: around the cell, at one pole, in a tuft, or not convincingly visible.',
    ariaLabel: 'Illustrated flagella stain patterns showing peritrichous, polar, lophotrichous, and no clear flagella',
    visualType: 'flagella-stain',
    tubes: [
      {
        id: 'A',
        label: 'Peritrichous',
        name: 'Flagella around the cell',
        colors: { slant: '#55348a', butt: '#a78bfa', base: '#d8c9ff' },
        note: 'Multiple flagella arise around the bacterial cell perimeter.'
      },
      {
        id: 'B',
        label: 'Polar',
        name: 'Single flagellum at one pole',
        colors: { slant: '#255c99', butt: '#93c5fd', base: '#dbeafe' },
        note: 'One visible flagellum extends from one end of the cell.'
      },
      {
        id: 'C',
        label: 'Lophotrichous',
        name: 'Tuft at one pole',
        colors: { slant: '#0f766e', butt: '#5eead4', base: '#ccfbf1' },
        note: 'Several flagella emerge together from the same pole.'
      },
      {
        id: 'D',
        label: 'Not seen',
        name: 'No convincing attached flagella',
        colors: { slant: '#6b7280', butt: '#cbd5e1', base: '#f1f5f9' },
        note: 'Background stain or debris is not enough; look for an attached, hairlike structure.'
      }
    ],
    readoutTitle: 'Pattern anchors',
    readoutRows: [
      ['Peritrichous', 'Flagella distributed around the cell', 'Think many attachment points'],
      ['Polar monotrichous', 'One flagellum at one end', 'Single tail at a pole'],
      ['Lophotrichous', 'Tuft of flagella at one pole', 'Several tails from the same end'],
      ['No clear flagella', 'No attached hairlike structure is confidently visible', 'Do not call debris positive']
    ],
    trapTitle: 'Do not count loose stain as flagella',
    trapBody: 'Flagella stains are delicate. Precipitate, scratches, dried edges, and smeared cells can produce lines that look tempting but are not truly attached flagella.',
    trapBullets: [
      'Look for a continuous attachment to the bacterial cell.',
      'Scan thin areas of the wet mount rather than thick clumps.',
      'Treat a poor preparation as noninterpretable, not negative.'
    ],
    interpretationTitle: 'Flagella stain study readout',
    interpretationRows: [
      ['Flagella present', 'One or more attached hairlike structures are visible', 'Record arrangement when it is clear: polar, peritrichous, lophotrichous, or amphitrichous.'],
      ['Flagella not seen', 'No convincing attached flagella are observed', 'May be truly absent or may reflect technique, growth phase, or staining quality.'],
      ['Quality issue', 'Heavy precipitate, dried mount, or detached filaments', 'Repeat with a fresh young culture and gentle wet mount technique.']
    ],
    takeaways: [
      'Flagella stain is a morphology and arrangement read, not just a positive/negative checkbox.',
      'Attachment to the cell is the key clue.',
      'Wet mount technique matters because harsh mixing can shear flagella from the cell.'
    ],
    remember: 'Best mental model: find the cell body first, then ask where the attached flagella come from.',
    biochemicalTestId: 'flagella',
    relatedLearnSlug: 'hanging-drop-preparation'
  },
  {
    slug: 'gelatin-hydrolysis',
    title: 'Gelatin Hydrolysis Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original deep-tube visual for reading gelatinase activity by liquefaction after chilling.',
    boardTitle: 'Gelatin deeps A-B',
    boardNote: 'After incubation, chill the tube. Liquid after refrigeration is the key positive read.',
    ariaLabel: 'Illustrated gelatin hydrolysis tubes showing liquefied positive gelatin and solid negative gelatin after chilling',
    visualType: 'gelatin-hydrolysis',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Liquefied after chilling',
        colors: { slant: '#d29f4b', butt: '#f3d38a', base: '#b8732b' },
        note: 'Gelatinase digested gelatin, so the medium remains liquid after refrigeration.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Firm gel after chilling',
        colors: { slant: '#d8b36a', butt: '#f1d99a', base: '#c89445' },
        note: 'The medium solidifies after refrigeration; gelatin hydrolysis is not demonstrated.',
        growth: 'none'
      }
    ],
    readoutTitle: 'Liquefaction anchors',
    readoutRows: [
      ['Liquid after chilling', 'Gelatin was hydrolyzed and cannot reform a gel', 'Positive gelatinase'],
      ['Solid after chilling', 'Gelatin remains intact and gels at cold temperature', 'Negative reaction'],
      ['Partial liquefaction', 'Only part of the column stays liquid', 'Positive if confirmed by the method'],
      ['Warm liquid before chilling', 'Gelatin melts at incubation temperature', 'Not enough to call positive']
    ],
    trapTitle: 'Always chill before the final read',
    trapBody: 'Nutrient gelatin can be liquid simply because it is warm. The result is decided after refrigeration, when intact gelatin should solidify again.',
    trapBullets: [
      'Do not invert or tip warm tubes to force an interpretation.',
      'Compare with an uninoculated control tube after chilling.',
      'Some organisms grow slowly, so follow the full validated incubation window.'
    ],
    interpretationTitle: 'Gelatin hydrolysis study readout',
    interpretationRows: [
      ['Positive', 'Partial or complete liquefaction after chilling', 'Gelatinase is present; the medium remains fluid after refrigeration.'],
      ['Negative', 'Tube solidifies after chilling', 'Gelatinase activity is not demonstrated.'],
      ['Control', 'Uninoculated tube becomes firm after chilling', 'Confirms the medium can gel and the read is valid.']
    ],
    takeaways: [
      'The positive result is liquefaction, not a color change.',
      'Chilling separates true gelatin hydrolysis from temperature-related melting.',
      'Use gelatin hydrolysis as one enzyme clue within a broader identification profile.'
    ],
    remember: 'Best mental model: warm gelatin can melt; hydrolyzed gelatin cannot gel again when cold.',
    biochemicalTestId: 'gelatin',
    relatedLearnSlug: 'bacterial-identification-principles'
  },
  {
    slug: 'growth-at-42-c',
    title: 'Growth at 42 C Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original temperature-tolerance visual for comparing growth at routine temperature with growth at 42 C.',
    boardTitle: '42 C growth slants A-B',
    boardNote: 'Positive means the organism still grows well at 42 C; negative means the 42 C tube lacks growth despite routine-temperature viability.',
    ariaLabel: 'Illustrated growth at 42 C slants showing good growth and no growth',
    visualType: 'growth-temperature',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Good growth at 42 C',
        colors: { slant: '#d7b65f', butt: '#e8d27d', base: '#c8973f' },
        note: 'Visible growth on the 42 C slant supports temperature tolerance.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'No growth at 42 C',
        colors: { slant: '#d8d0a6', butt: '#eee7c4', base: '#c8bd8a' },
        note: 'The 42 C slant remains clear or shows no meaningful growth.',
        growth: 'none'
      }
    ],
    readoutTitle: 'Growth comparison anchors',
    readoutRows: [
      ['Good growth at 42 C', 'The organism tolerates elevated incubation temperature', 'Positive 42 C growth'],
      ['No growth at 42 C', 'The organism does not grow at the elevated temperature', 'Negative 42 C growth'],
      ['Growth at 35 C control', 'Confirms the inoculum was viable', 'Required comparison'],
      ['Weak growth', 'May reflect stress, temperature drift, or organism variability', 'Interpret with controls and timing']
    ],
    trapTitle: 'Do not read 42 C alone',
    trapBody: 'The elevated-temperature tube only makes sense if the same isolate grows under routine conditions. No growth at both temperatures is an invalid comparison, not a 42 C negative.',
    trapBullets: [
      'Run or confirm a routine-temperature growth control.',
      'Use the validated incubation time and temperature.',
      'Treat weak growth as a profile clue, not a stand-alone species ID.'
    ],
    interpretationTitle: 'Growth at 42 C study readout',
    interpretationRows: [
      ['Positive', 'Good growth at both routine temperature and 42 C', 'Supports a thermotolerant profile such as Pseudomonas aeruginosa in the correct context.'],
      ['Negative', 'Growth at routine temperature but no growth at 42 C', 'Supports non-42 C-tolerant pseudomonads such as P. fluorescens/putida-style patterns.'],
      ['Invalid', 'No growth in the routine-temperature comparison', 'Repeat or troubleshoot viability, inoculum, medium, or incubation conditions.']
    ],
    takeaways: [
      'Growth at 42 C is a temperature-tolerance test, not a color reaction.',
      'The routine-temperature control protects against false interpretation.',
      'Use this with oxidase, pigment, cetrimide, acetamide, and organism context.'
    ],
    remember: 'Best mental model: same organism, two temperatures; the 42 C tube only answers tolerance if the control proves viability.',
    biochemicalTestId: 'growth42',
    relatedLearnSlug: 'nonfermenting-gram-negative-rods'
  },
  {
    slug: 'hippurate-hydrolysis',
    title: 'Hippurate Hydrolysis Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original reagent-tube visual for reading hippurate hydrolysis after ninhydrin is added.',
    boardTitle: 'Hippurate tubes A-B',
    boardNote: 'After incubation with substrate, ninhydrin reveals glycine as a deep purple endpoint.',
    ariaLabel: 'Illustrated hippurate hydrolysis tubes showing deep purple positive and pale negative reactions',
    visualType: 'hippurate-hydrolysis',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Deep purple after ninhydrin',
        colors: { slant: '#24103f', butt: '#5b21b6', base: '#2e1065' },
        note: 'Hippuricase released glycine, and ninhydrin produced a deep purple color.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'No purple color',
        colors: { slant: '#f1e6d3', butt: '#f8f2e8', base: '#d9c5aa' },
        note: 'No deep purple endpoint; pale yellow, pink, or colorless is read as negative.',
        growth: 'none'
      }
    ],
    readoutTitle: 'Ninhydrin endpoint anchors',
    readoutRows: [
      ['Deep purple', 'Glycine from hippurate hydrolysis reacted with ninhydrin', 'Positive hippurate hydrolysis'],
      ['No purple', 'Glycine was not detected by the reagent endpoint', 'Negative reaction'],
      ['Pale yellow or pink', 'Background reagent color without a strong purple endpoint', 'Read as negative'],
      ['Late color development', 'Over-incubation with ninhydrin can create misleading color', 'Respect the read window']
    ],
    trapTitle: 'Do not over-read the ninhydrin step',
    trapBody: 'The ninhydrin endpoint is time-sensitive. A false-positive appearance can occur if the reagent incubation runs too long or if the tube is read outside the validated window.',
    trapBullets: [
      'Use a heavy suspension only as the method requires.',
      'Read the tube during the stated ninhydrin window.',
      'Call only a clear deep purple endpoint positive.'
    ],
    interpretationTitle: 'Hippurate hydrolysis study readout',
    interpretationRows: [
      ['Positive', 'Deep purple after ninhydrin', 'Supports hippuricase activity; classically useful for Group B strep and selected Campylobacter workups.'],
      ['Negative', 'No deep purple color', 'Hippurate hydrolysis is not demonstrated.'],
      ['Questionable', 'Weak or late purple tint', 'Repeat or interpret cautiously with controls and organism context.']
    ],
    takeaways: [
      'Hippurate hydrolysis is detected indirectly through glycine plus ninhydrin.',
      'Deep purple is positive; pale yellow, pink, or colorless is negative.',
      'Timing matters after ninhydrin is added.'
    ],
    remember: 'Best mental model: hippurate breakdown releases glycine; ninhydrin makes the glycine visible as purple.',
    biochemicalTestId: 'hippurate',
    relatedLearnSlug: 'streptococcus-enterococcus'
  },
  {
    slug: 'indole-production',
    title: 'Indole Production Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original reagent-layer visual for reading indole production after Kovac or Ehrlich reagent is added.',
    boardTitle: 'Indole tubes A-B',
    boardNote: 'Read the reagent layer at the top: a red to pink ring is positive; no red ring is negative.',
    ariaLabel: 'Illustrated indole production tubes showing red ring positive and yellow no-ring negative reactions',
    visualType: 'indole-production',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Red/pink reagent ring',
        colors: { slant: '#d81f45', butt: '#f5e8b8', base: '#e8d99c' },
        note: 'Tryptophanase produced indole, which reacts with the reagent to form a red to pink top layer.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'No red ring',
        colors: { slant: '#f4d35e', butt: '#f5e8b8', base: '#e8d99c' },
        note: 'No red top layer forms after reagent is added.',
        growth: 'none'
      }
    ],
    readoutTitle: 'Ring-read anchors',
    readoutRows: [
      ['Red or pink top ring', 'Indole reacted with aldehyde reagent', 'Indole positive'],
      ['Yellow reagent layer', 'No indole color complex formed', 'Indole negative'],
      ['Reagent layer at top', 'Kovac or Ehrlich reagent sits above the aqueous broth', 'Read the interface, not the whole tube'],
      ['Wrong medium', 'Insufficient tryptophan may weaken the reaction', 'Use validated tryptophan-rich medium']
    ],
    trapTitle: 'Read the ring, not broth turbidity',
    trapBody: 'Indole is a reagent endpoint. Growth or cloudy broth does not by itself mean indole positive; the visible red to pink ring at the reagent layer is the readout.',
    trapBullets: [
      'Use the reagent and extraction step required by the method.',
      'Do not shake the tube after the reagent layer forms.',
      'Kovac and Ehrlich methods are interpreted in their validated organism contexts.'
    ],
    interpretationTitle: 'Indole production study readout',
    interpretationRows: [
      ['Positive', 'Red to pink ring at the top layer', 'Tryptophanase activity is demonstrated; indole is produced from tryptophan.'],
      ['Negative', 'No red color after reagent addition', 'Indole production is not demonstrated.'],
      ['Method context', 'Kovac, Ehrlich, and spot indole differ', 'Match the reagent system to the organism group and local procedure.']
    ],
    takeaways: [
      'Indole production detects tryptophanase activity.',
      'The positive visual cue is a red or pink reagent ring.',
      'Use indole as part of IMViC and broader Gram-negative identification logic.'
    ],
    remember: 'Best mental model: tryptophanase makes indole; reagent makes indole visible as a red ring.',
    biochemicalTestId: 'indole-tube',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'leucine-aminopeptidase-lap-test',
    title: 'Leucine Aminopeptidase LAP Test Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original applicator-tip visual for reading LAP disk reactions after cinnamaldehyde reagent is added.',
    boardTitle: 'LAP reactions A-B',
    boardNote: 'Positive develops red color quickly after reagent; negative stays unchanged or slightly yellow.',
    ariaLabel: 'Illustrated LAP test applicator tips showing red positive and no-color negative reactions',
    visualType: 'lap-test',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Red color on disk/tip',
        colors: { slant: '#df356d', butt: '#f3b1c5', base: '#7aa697' },
        note: 'LAP activity releases beta-naphthylamine, which forms red color after cinnamaldehyde reagent.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'No color or slight yellow',
        colors: { slant: '#e8b7c9', butt: '#f3d9e3', base: '#7aa697' },
        note: 'No red endpoint develops during the expected read window.',
        growth: 'none'
      }
    ],
    readoutTitle: 'Timed endpoint anchors',
    readoutRows: [
      ['Red color', 'Cinnamaldehyde detected beta-naphthylamine released by LAP', 'Positive LAP'],
      ['No color change', 'No detectable LAP reaction', 'Negative LAP'],
      ['Slight yellow', 'Background reagent color without red endpoint', 'Read as negative'],
      ['Delayed red', 'Color outside the read window may be unreliable', 'Use validated timing']
    ],
    trapTitle: 'Keep the disk damp, not flooded',
    trapBody: 'The LAP disk depends on substrate integrity and a concentrated colony rub. Too much water or poor disk storage can wash out or weaken the endpoint.',
    trapBullets: [
      'Moisten the disk lightly; do not supersaturate it.',
      'Use a visible colony rub from a pure culture.',
      'Read the red endpoint within the method window after reagent is added.'
    ],
    interpretationTitle: 'LAP test study readout',
    interpretationRows: [
      ['Positive', 'Red color develops after cinnamaldehyde', 'Supports LAP-positive catalase-negative Gram-positive cocci such as Enterococcus in the correct workup.'],
      ['Negative', 'No red color or only slight yellow', 'Supports LAP-negative branches such as Aerococcus/Leuconostoc-style separation in the right context.'],
      ['Invalid or weak', 'Poor disk condition, flooding, or weak inoculum', 'Repeat with a fresh disk and proper colony load.']
    ],
    takeaways: [
      'LAP is a rapid enzyme disk test.',
      'The key visual endpoint is red color after reagent.',
      'Use LAP with catalase, PYR, bile esculin, vancomycin behavior, and organism morphology.'
    ],
    remember: 'Best mental model: LAP frees the target compound; cinnamaldehyde turns that product red.',
    biochemicalTestId: 'lap',
    relatedLearnSlug: 'streptococcus-enterococcus'
  },
  {
    slug: 'litmus-milk-medium',
    title: 'Litmus Milk Medium Visual Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original multi-tube visual for separating litmus milk color reactions from clot, digestion, and peptonization patterns.',
    boardTitle: 'Litmus milk patterns A-F',
    boardNote: 'Read both appearance and color: litmus milk can show acid, alkaline, reduction, clot, digestion, or peptonization.',
    ariaLabel: 'Illustrated litmus milk tubes showing acid, alkaline, no change, reduction, clot, and peptonization reactions',
    visualType: 'litmus-milk',
    tubes: [
      {
        id: 'A',
        label: 'Acid',
        name: 'Pink milk',
        colors: { slant: '#eab0a2', butt: '#f2c9bd', base: '#d98f84' },
        note: 'Lactose fermentation acidifies the milk and shifts litmus toward pink.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Alkaline',
        name: 'Blue to violet milk',
        colors: { slant: '#9a88bd', butt: '#c0aed8', base: '#8170a8' },
        note: 'Alkaline products shift the indicator toward blue or violet.',
        growth: 'heavy'
      },
      {
        id: 'C',
        label: 'No change',
        name: 'Baseline purple-pink',
        colors: { slant: '#d9a1a8', butt: '#ecc4c7', base: '#c98995' },
        note: 'The tube remains close to the uninoculated control color.',
        growth: 'none'
      },
      {
        id: 'D',
        label: 'Reduction',
        name: 'White/decolorized',
        colors: { slant: '#f1e6c8', butt: '#fff4d6', base: '#e4d4af' },
        note: 'Reduction of litmus decolorizes the medium independent of pH.',
        growth: 'heavy'
      },
      {
        id: 'E',
        label: 'Clot',
        name: 'Solid coagulated milk',
        colors: { slant: '#e4a69a', butt: '#f1c3b7', base: '#d28b80' },
        note: 'Acid or enzyme activity coagulates casein into a visible clot.',
        growth: 'heavy'
      },
      {
        id: 'F',
        label: 'Peptonization',
        name: 'Clearing with shrunken clot',
        colors: { slant: '#9c7aa4', butt: '#c6b0cb', base: '#745d7a' },
        note: 'Casein digestion creates clearing or watery fluid with a shrunken clot.',
        growth: 'heavy'
      }
    ],
    readoutTitle: 'Color and consistency anchors',
    readoutRows: [
      ['Pink or mauve', 'Acid production from lactose fermentation', 'Record acid reaction'],
      ['Blue or violet', 'Alkaline reaction', 'Record alkaline reaction'],
      ['White/decolorized', 'Reduction of litmus indicator', 'Record reduction separately from pH'],
      ['Clot or clearing', 'Casein coagulation or digestion changed the milk texture', 'Record appearance, not just color']
    ],
    trapTitle: 'Do not reduce litmus milk to one result',
    trapBody: 'Litmus milk is a pattern medium. A tube can show color change, reduction, clotting, gas, digestion, or peptonization across the observation period.',
    trapBullets: [
      'Record each visible change, not just positive or negative.',
      'Color and milk consistency answer different questions.',
      'Use follow-up tests because litmus milk patterns are not species-specific.'
    ],
    interpretationTitle: 'Litmus milk study readout',
    interpretationRows: [
      ['Acid', 'Pink/mauve color', 'Lactose fermentation lowered pH.'],
      ['Alkaline', 'Blue/violet color', 'Alkaline products raised pH.'],
      ['Reduction', 'White or decolorized medium', 'Litmus dye was reduced; this may mask pH color.'],
      ['Clot/digestion/peptonization', 'Texture changes in the milk', 'Casein was coagulated, digested, or peptonized; record the appearance.']
    ],
    takeaways: [
      'Litmus milk is a multi-reaction medium.',
      'Read pH color and milk consistency separately.',
      'Patterns support identification but should not be used alone.'
    ],
    remember: 'Best mental model: litmus reports color chemistry, while the milk reports casein changes.',
    biochemicalTestId: 'litmus',
    relatedLearnSlug: 'bacterial-identification-principles'
  },
  {
    slug: 'butyrate-disk',
    title: 'Butyrate Esterase Disk Guide',
    eyebrow: 'Visual Atlas',
    summary: 'A bench reference for rapid spot-test identification of Moraxella catarrhalis based on butyrate esterase activity.',
    boardTitle: 'Butyrate spot tests A-B',
    boardNote: 'Read the color shift on the bromo-chloro-indolyl butyrate disk within 5 minutes of incubation.',
    ariaLabel: 'Butyrate esterase disks showing positive blue-violet color and negative no color change',
    visualType: 'butyrate-disk',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Moraxella catarrhalis',
        colors: { slant: '#ffffff', butt: '#1e3a8a', base: '#ffffff' },
        note: 'Development of a distinct blue-violet/indigo color from indoxyl release.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Neisseria gonorrhoeae',
        colors: { slant: '#ffffff', butt: '#cbd5e1', base: '#ffffff' },
        note: 'No color change; disk remains white/grey with rubbed colony smear.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Blue-Violet Color', 'Butyrate esterase hydrolyzes substrate, releasing indoxyl which oxidizes to indigo', 'Shorthand: Positive (+)'],
      ['No Color Change', 'Substrate remains unhydrolyzed; no indoxyl release', 'Shorthand: Negative (-)'],
      ['Rubbed Inoculum', 'Heavy smear of fresh colonies applied to a moistened disk', 'Must read within 5 minutes']
    ],
    trapTitle: 'Incubation timing is critical',
    trapBody: 'Do not read the butyrate disk beyond the 5-minute incubation limit. Prolonged exposure to air and light can cause false-positive blue shifts or muddy grey discoloration.',
    trapBullets: [
      'Always read strictly within 5 minutes.',
      'Apply a heavy, fresh inoculum (18-24 hour culture).',
      'Pairs with microdase, oxidase, and Gram-negative diplococci morphology.'
    ],
    interpretationTitle: 'Butyrate study readout',
    interpretationRows: [
      ['Positive', 'Development of blue-violet color within 5 mins', 'Presumptive Moraxella catarrhalis (highly useful in respiratory isolates).'],
      ['Negative', 'No color change within 5 mins', 'Presumptive Neisseria species (e.g. N. gonorrhoeae, N. meningitidis).'],
      ['Differential logic', 'Separates Moraxella from Neisseria', 'M. catarrhalis is butyrate (+), DNase (+), and carbohydrate fermenter negative (asaccharolytic).']
    ],
    takeaways: [
      'Rapidly separates M. catarrhalis from fastidious Neisseria species.',
      'Moraxella catarrhalis is routinely isolated in otitis media, sinusitis, and COPD exacerbations.',
      'Always confirm diplococci morphology on Gram stain before reporting.'
    ],
    remember: 'M. catarrhalis shows a hockey-puck colony behavior, sliding intact across the agar surface.',
    biochemicalTestId: 'butyrate',
    relatedLearnSlug: 'neisseria-moraxella'
  },
  {
    slug: 'camp-test',
    title: 'CAMP Test Synergistic Hemolysis Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original sheep blood agar bench diagram illustrating synergistic beta-hemolysis arrowheads for Group B Streptococci.',
    boardTitle: 'CAMP reaction board',
    boardNote: 'Enhanced synergistic hemolysis occurs at the intersection of Group B Strep and beta-lysin producing S. aureus.',
    ariaLabel: 'A sheep blood agar plate showing synergistic arrowhead hemolysis for Streptococcus agalactiae',
    visualType: 'camp-test',
    tubes: [
      {
        id: 'Plate',
        label: 'CAMP Hemolysis Plate',
        name: 'Streptococcus agalactiae (A) vs Streptococcus pyogenes (B)',
        colors: { slant: '#9e1b24', butt: '#ebd78d', base: '#9e1b24' },
        note: 'Streak A (GBS) shows complete arrowhead hemolysis. Streak B (GAS) shows no synergistic enhancement.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Arrowhead Hemolysis', 'Enhanced zone of complete lysis where GBS CAMP factor meets S. aureus beta-lysin', 'Shorthand: CAMP Positive (+)'],
      ['Uniform Hemolysis', 'Standard narrow zone of beta-hemolysis without enhancement at the intersection', 'Shorthand: CAMP Negative (-)'],
      ['Central Streak', 'Inoculation line of beta-lysin producing Staphylococcus aureus', 'Creates the baseline lysin gradient']
    ],
    trapTitle: 'Do not let streaks touch',
    trapBody: 'Keep the test organism streaks perpendicular but strictly separate (2-3 mm) from the central S. aureus streak. If the streaks touch, physical mixing of colonies can make the hemolysis pattern difficult to interpret.',
    trapBullets: [
      'Draw the perpendicular streaks within 2-3 mm of the S. aureus line but do not cross it.',
      'Use a known beta-lysin producing S. aureus strain.',
      'Incubate overnight in ambient air (CO2 can cause false positives in Group A strep).'
    ],
    interpretationTitle: 'CAMP study readout',
    interpretationRows: [
      ['Positive (+)', 'Clear arrowhead-shaped zone of complete lysis', 'Presumptive Streptococcus agalactiae (Group B strep) or Listeria monocytogenes (matchbox shape).'],
      ['Negative (-)', 'No enhancement of lysis at the juncture', 'Presumptive Streptococcus pyogenes (Group A) or other beta-hemolytic streptococci.'],
      ['Listeria variant', 'L. monocytogenes produces a block or matchbox shape', 'Used to confirm Listeria identification alongside tumbling motility.']
    ],
    takeaways: [
      'Presumptively identifies Streptococcus agalactiae (Group B streptococci).',
      'Group B strep is a leading cause of neonatal sepsis, meningitis, and pneumonia.',
      'PYR negative and CAMP positive confirms presumptive Group B strep status.'
    ],
    remember: 'Group B strep is hippurate hydrolysis positive as well; use both tests for confirmation.',
    biochemicalTestId: 'camp',
    relatedLearnSlug: 'streptococcus-enterococcus'
  },
  {
    slug: 'catalase-test',
    title: 'Catalase Test Reaction Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original slide-test bench reference for observing rapid oxygen bubble evolution to differentiate staphylococci from streptococci.',
    boardTitle: 'Catalase spot tests A-B',
    boardNote: 'Apply 3% hydrogen peroxide (H2O2) to colonies on a glass slide and check for immediate bubbling.',
    ariaLabel: 'Glass slides showing positive catalase bubbling and negative no bubbles',
    visualType: 'catalase',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Staphylococcus aureus',
        colors: { slant: '#0f172a', butt: '#f8fafc', base: '#0f172a' },
        note: 'Immediate, copious elaboration of white oxygen bubbles forming a frothy foam.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Streptococcus pyogenes',
        colors: { slant: '#0f172a', butt: '#cbd5e1', base: '#0f172a' },
        note: 'No bubble production; colony smear remains suspended in clear liquid.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Vigorous Bubbling', 'Catalase enzyme breaks down hydrogen peroxide into oxygen gas and water', 'Shorthand: Positive (+)'],
      ['No Bubbles', 'Lack of catalase enzyme; hydrogen peroxide remains unhydrolyzed', 'Shorthand: Negative (-)'],
      ['3% H2O2 Reagent', 'Standard hydrogen peroxide solution applied directly to colony smear', 'Must use fresh reagent']
    ],
    trapTitle: 'Beware of blood agar carryover',
    trapBody: 'Red blood cells contain catalase. If you scrape too close to the blood agar surface and carry agar into the drop of H2O2, it can produce a weak false-positive bubbling reaction.',
    trapBullets: [
      'Take colonies strictly from the top of the growth, avoiding the agar.',
      'Perform on a clean glass slide, not directly on the blood agar plate.',
      'Weak pseudocatalase reactions can occur in rare enterococci; confirm with Gram stain.'
    ],
    interpretationTitle: 'Catalase study readout',
    interpretationRows: [
      ['Positive', 'Copious, immediate bubble production', 'Presumptive Staphylococci, Micrococci, Listeria, Bacillus, or Corynebacterium.'],
      ['Negative', 'No bubble production (or trace delayed bubbles)', 'Presumptive Streptococci, Enterococci, or Lactobacilli.'],
      ['Neisseria exception', '30% H2O2 (Superoxol) is positive for N. gonorrhoeae', 'Differentiation tool for fastidious Gram-negative diplococci.']
    ],
    takeaways: [
      'Core first-pass branch point for Gram-positive cocci.',
      'Differentiates Staphylococcaceae (positive) from Streptococcaceae (negative).',
      'Extremely rapid spot test giving results within seconds.'
    ],
    remember: 'S. aureus is catalase positive and coagulase positive; S. pyogenes is catalase negative and PYR positive.',
    biochemicalTestId: 'catalase',
    relatedLearnSlug: 'staphylococcus-micrococcus'
  },
  {
    slug: 'cetrimide-agar',
    title: 'Cetrimide Selective Agar Slant',
    eyebrow: 'Visual Atlas',
    summary: 'A bench reference illustrating growth and fluorescent pigment production of Pseudomonas aeruginosa on selective cetrimide agar.',
    boardTitle: 'Cetrimide agar slants A-B',
    boardNote: 'Cetrimide is highly selective for Pseudomonas aeruginosa, which exhibits yellow-green to blue-green pigment growth.',
    ariaLabel: 'Cetrimide agar slants showing positive pigmented growth and negative no growth',
    visualType: 'cetrimide',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Pseudomonas aeruginosa',
        colors: { slant: '#4ade80', butt: '#22c55e', base: '#15803d' },
        note: 'Vigorous growth with glowing blue-green (pyocyanin) and yellow-green (pyoverdine) pigments.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Escherichia coli',
        colors: { slant: '#ebd893', butt: '#dfc87a', base: '#ca9e54' },
        note: 'Complete inhibition of growth; agar slant remains its original clear cream-yellow color.',
        growth: 'none'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Visible Growth', 'Resistant to the toxic detergent cetrimide', 'Shorthand: Positive (+)'],
      ['Yellow-Green Pigment', 'Fluorescein (pyoverdine) and pyocyanin pigments diffuse into the medium', 'Exhibits bright green color'],
      ['Complete Inhibition', 'Growth is fully blocked by cetrimide', 'Shorthand: Negative (-)']
    ],
    trapTitle: 'Look for pigment diffusion',
    trapBody: 'While a few other enteric rods can occasionally grow weakly on cetrimide agar, they do not produce the classic water-soluble green/blue pigments characteristic of Pseudomonas aeruginosa. Always evaluate both growth and pigmentation together.',
    trapBullets: [
      'Confirm fluorescent pigment under UV light if weak under ambient light.',
      'Check for characteristic sweet grape-like or tortilla odor (due to aminoacetophenone).',
      'Always correlate with a positive oxidase reaction.'
    ],
    interpretationTitle: 'Cetrimide study readout',
    interpretationRows: [
      ['Positive', 'Growth with green-blue water-soluble pigmentation', 'Presumptive Pseudomonas aeruginosa.'],
      ['Negative', 'No growth or growth without pigment', 'Does not support P. aeruginosa identification; correlate with oxidase and glucose oxidation.'],
      ['Method note', 'Also useful for isolating pure cultures', 'Maintains selective inhibition of typical skin and respiratory flora in sputum workups.']
    ],
    takeaways: [
      'Specifically isolates and presumptively identifies Pseudomonas aeruginosa.',
      'Selects via cetrimide (cetyltrimethylammonium bromide) which disrupts membranes.',
      'P. aeruginosa is a major nonfermenting Gram-negative opportunistic pathogen.'
    ],
    remember: 'P. aeruginosa is oxidase (+), cetrimide (+), Grows at 42°C (+), and is ADH (+).',
    biochemicalTestId: 'cetrimide',
    relatedLearnSlug: 'nonfermenting-gram-negative-rods'
  },
  {
    slug: 'citrate-utilization',
    title: 'Citrate Utilization (Simmons Citrate)',
    eyebrow: 'Visual Atlas',
    summary: 'An original Simmons Citrate slant guide for reading alkalinization in Enterobacterales and other Gram-negative rod profiles.',
    boardTitle: 'Simmons Citrate slants A-B',
    boardNote: 'Organisms capable of utilizing sodium citrate grow and shift the pH indicator to deep royal blue.',
    ariaLabel: 'Simmons Citrate agar slants showing positive blue alkalinization and negative unchanged green',
    visualType: 'citrate',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Enterobacter aerogenes',
        colors: { slant: '#1d4ed8', butt: '#1e40af', base: '#172554' },
        note: 'Growth with a deep royal blue color shift throughout the medium.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Escherichia coli',
        colors: { slant: '#166534', butt: '#14532d', base: '#064e3b' },
        note: 'No growth; medium remains its original forest green color.',
        growth: 'none'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Royal Blue Medium', 'Alkaline products shift bromothymol blue indicator at alkaline pH (>7.6)', 'Shorthand: Positive (+)'],
      ['Visible Growth', 'Survival and replication on citrate slant', 'Can be positive even with trace green'],
      ['Forest Green Medium', 'Medium remains unshifted (neutral pH)', 'Shorthand: Negative (-)']
    ],
    trapTitle: 'Do not use a heavy inoculum',
    trapBody: 'Using a heavy inoculum from a rich broth or colony can carry over organic nutrients and dead cell debris. The organism will feed on this carryover material, causing a false-positive color change or mock growth.',
    trapBullets: [
      'Inoculate lightly from a pure colony using a needle, not a loop.',
      'Touch only the tip of the colony.',
      'Read as a growth-plus-color pattern.'
    ],
    interpretationTitle: 'Citrate study readout',
    interpretationRows: [
      ['Positive', 'Growth with royal blue color shift', 'Presumptive Klebsiella, Enterobacter, Serratia, Citrobacter, or Salmonella species.'],
      ['Negative', 'No growth and unchanged forest green medium', 'Presumptive Escherichia coli, Shigella, Morganella, or Yersinia species.'],
      ['Trace Positive', 'Growth on slant without intense blue color', 'Interpret as positive if clear growth is visible; check controls.']
    ],
    takeaways: [
      'Key component of the classic IMViC profile (Indole, Methyl Red, Voges-Proskauer, Citrate).',
      'E. coli is classically Citrate negative; Klebsiella pneumoniae is Citrate positive.',
      'Differentiates closely related Gram-negative rods in fecal workups.'
    ],
    remember: 'E. coli is IMViC (++--); Klebsiella pneumoniae is IMViC (--++).',
    biochemicalTestId: 'citrate',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'coagulase-test',
    title: 'Coagulase Test Guide (Slide and Tube)',
    eyebrow: 'Visual Atlas',
    summary: 'An original Learn Microbes bench guide for evaluating bound coagulase (slide clumping factor) and free coagulase (tube clotting) to identify Staphylococcus aureus.',
    boardTitle: 'Coagulase Reaction Board',
    boardNote: 'Read slide tests immediately for macroscopic clumping. Tilt tube tests to check for a solid fibrin clot.',
    ariaLabel: 'Illustrated slide and tube coagulase test reactions showing positive and negative results',
    visualType: 'coagulase',
    tubes: [
      {
        id: 'A',
        label: 'Slide: Positive',
        name: 'Clumping Factor Present',
        colors: { slant: '', butt: '', base: '' },
        note: 'Rapid macroscopic clumping of bacterial cells in rabbit plasma within 10-15 seconds.'
      },
      {
        id: 'B',
        label: 'Slide: Negative',
        name: 'No Clumping (Milky)',
        colors: { slant: '', butt: '', base: '' },
        note: 'Smooth, homogenous, milky suspension with no visible particles; must confirm with a tube test.'
      },
      {
        id: 'C',
        label: 'Tube: Positive',
        name: 'Free Coagulase Present',
        colors: { slant: '', butt: '', base: '' },
        note: 'Milky suspension forms a firm, solid fibrin clot that remains at the bottom of the tube when tilted at 45 degrees.'
      },
      {
        id: 'D',
        label: 'Tube: Negative',
        name: 'Free Coagulase Absent',
        colors: { slant: '', butt: '', base: '' },
        note: 'No clot forms; suspension remains entirely liquid and flows freely along the wall of the tilted tube.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Macroscopic Clumping', 'Bound coagulase cross-links fibrinogen, agglutinating the cells', 'Positive slide reaction'],
      ['Homogenous Mixture', 'No bound coagulase present; cells stay in a uniform suspension', 'Negative slide reaction (requires tube backup)'],
      ['Firm Fibrin Clot', 'Free coagulase activates prothrombin/CRF, converting fibrinogen to a solid clot', 'Positive tube reaction (S. aureus confirmed)'],
      ['Free Flowing Liquid', 'No free coagulase; plasma remains liquid when the tube is tilted', 'Negative tube reaction (CNS confirmed)']
    ],
    trapTitle: 'Never report a negative slide test as final',
    trapBody: 'Some strains of Staphylococcus aureus only produce free coagulase (lack bound coagulase) and will test negative on a slide. Always confirm negative slide tests with a tube test.',
    trapBullets: [
      'Read slide tests within 10-15 seconds to avoid false-positive autoagglutination.',
      'Perform slide test using a water/saline control drop next to the plasma drop to rule out autoagglutination.',
      'Read tube tests at 4 hours; some strains produce fibrinolysin which can dissolve the clot by 24 hours.'
    ],
    interpretationTitle: 'Coagulase study readout',
    interpretationRows: [
      ['Slide (+), Saline (-)', 'Staphylococcus aureus', 'Bound coagulase is present. Confirms S. aureus presumptively.'],
      ['Slide (-), Saline (-)', 'Pending tube test', 'Cannot rule out S. aureus; run tube test immediately.'],
      ['Tube (+)', 'Staphylococcus aureus', 'Free coagulase is present. Solid clot formed; definitive identification.'],
      ['Tube (-)', 'Coag-Negative Staph (CNS)', 'No free coagulase. Usually S. epidermidis, S. saprophyticus, etc.'],
      ['Slide (+), Saline (+)', 'Invalid / Autoagglutination', 'The strain is autoagglutinating; must use tube test to resolve.']
    ],
    takeaways: [
      'Differentiates Staphylococcus aureus (positive) from coagulase-negative staphylococci (CNS like S. epidermidis).',
      'Slide test detects bound coagulase (clumping factor); tube test detects free extracellular coagulase.',
      'A saline control is essential on the slide to identify autoagglutinating strains.'
    ],
    remember: 'A negative slide test is only a presumptive negative. The tube test remains the gold standard referee.',
    biochemicalTestId: 'coagulase',
    relatedLearnSlug: 'staphylococcus-micrococcus'
  },
  {
    slug: 'decarboxylase-tests',
    title: 'Decarboxylase Tests (Moeller\'s Method)',
    eyebrow: 'Visual Atlas',
    summary: 'An original Learn Microbes bench guide for reading amino acid decarboxylation (Lysine, Ornithine, Arginine) reactions using Moeller\'s broth and mineral oil.',
    boardTitle: 'Decarboxylase tubes A-D',
    boardNote: 'Always read the specific amino acid tube alongside the control tube (no amino acid). A valid test requires the control tube to be acid (yellow).',
    ariaLabel: 'Illustrated Moeller\'s decarboxylase broth tubes showing positive, negative, control, and uninoculated states',
    visualType: 'decarboxylase',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Decarboxylase Active (Purple)',
        colors: { slant: '', butt: '', base: '' },
        note: 'Organism fermented glucose (acid/yellow) first, then decarboxylated the amino acid, releasing alkaline amines and shifting the pH back to purple.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Decarboxylase Inactive (Yellow)',
        colors: { slant: '', butt: '', base: '' },
        note: 'Organism fermented glucose to produce acid (yellow), but lacked the specific decarboxylase enzyme, so the broth remains yellow.'
      },
      {
        id: 'C',
        label: 'Control',
        name: 'Base Control (Yellow)',
        colors: { slant: '', butt: '', base: '' },
        note: 'Control broth contains glucose but no amino acid. Must turn yellow (acid) to validate glucose fermentation. If the control is purple, the test is invalid!'
      },
      {
        id: 'D',
        label: 'Uninoculated',
        name: 'Initial Medium (Orange)',
        colors: { slant: '', butt: '', base: '' },
        note: 'Uninoculated Moeller\'s broth sits at pH 6.0 and exhibits an orange-amber color.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Purple broth', 'Alkaline reaction (decarboxylation positive)', 'The specific decarboxylase enzyme is active'],
      ['Yellow broth in amino acid tube', 'Acid reaction (decarboxylation negative)', 'The specific decarboxylase is inactive; glucose was fermented'],
      ['Yellow broth in control tube', 'Valid control test', 'Proves glucose was fermented and organism grew successfully'],
      ['Purple/Orange broth in control tube', 'Invalid test result', 'Either the organism did not grow or failed to ferment glucose; do not report results'],
      ['Translucent oil overlay', 'Sterile mineral oil barrier', 'Creates anaerobic conditions required for active decarboxylation']
    ],
    trapTitle: 'Do not ignore a purple control tube',
    trapBody: 'Decarboxylase reactions are a comparative read. The amino acid tube must be compared to the control tube. If the control tube remains purple, the test is invalid because we cannot prove the organism grew or fermented glucose.',
    trapBullets: [
      'A yellow control tube is mandatory to validate a positive purple test result.',
      'Always overlay Moeller\'s broth with at least 4 mm of sterile mineral oil prior to incubation.',
      'Without the oil overlay, oxygen exposure can cause false-positive alkaline shifts at the broth surface.'
    ],
    interpretationTitle: 'Coagulase study readout',
    interpretationRows: [
      ['Test (+) / Control (-)', 'Decarboxylase Positive', 'The organism grew, fermented glucose (yellow), and decarboxylated the amino acid (purple).'],
      ['Test (-) / Control (-)', 'Decarboxylase Negative', 'Both tubes turned yellow; glucose was fermented, but the specific amino acid was not decarboxylated.'],
      ['Test (+) / Control (+)', 'Invalid Test Result', 'Both tubes are purple. Either no growth occurred, glucose was not fermented, or the organism is nonfermenting.'],
      ['Uninoculated', 'Baseline Orange-Amber', 'Broth sits at pH 6.0 prior to inoculation. Do not interpret as a patient test.']
    ],
    takeaways: [
      'Differentiates decarboxylase-producing Enterobacteriaceae from other Gram-negative rods.',
      'Measures enzymatic ability to decarboxylate an amino acid (Lysine, Ornithine, or Arginine) to form alkaline amines.',
      'Requires an anaerobic environment created by overlaying with sterile mineral oil.'
    ],
    remember: 'A yellow control tube is your reference validation. A purple control tube voids the entire test run.',
    biochemicalTestId: 'decarboxylase',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'dnase-test',
    title: 'DNA Hydrolysis (DNase Test Agar)',
    eyebrow: 'Visual Atlas',
    summary: 'An original Learn Microbes bench guide for recognizing deoxyribonuclease (DNase) activity on methyl green agar to differentiate key staphylococci, enterics, and respiratory cocci.',
    boardTitle: 'DNase agar plates A-B',
    boardNote: 'Look for a clear, colorless zone surrounding the streak of growth, indicating DNA-methyl green complex degradation.',
    ariaLabel: 'Illustrated DNase test agar plates showing positive cleared zone and negative unchanged green agar reactions',
    visualType: 'dnase',
    tubes: [
      {
        id: 'A',
        label: 'Positive Reaction',
        name: 'DNase Enzyme Present',
        colors: { slant: '', butt: '', base: '' },
        note: 'A wide, colorless/clear zone surrounds the streak of growth because DNA hydrolysis has released methyl green from the complex.'
      },
      {
        id: 'B',
        label: 'Negative Reaction',
        name: 'DNase Enzyme Absent',
        colors: { slant: '', butt: '', base: '' },
        note: 'No DNA hydrolysis occurs; the agar medium remains its original pale green-teal color right up to the edge of the growth streak.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Colorless cleared zone', 'DNA hydrolyzed, releasing methyl green indicator', 'Positive reaction (DNase present)'],
      ['Unchanged teal-green agar', 'DNA-methyl green complex remains intact', 'Negative reaction (DNase absent)'],
      ['Cream-colored growth streak', 'Bacterial multiplication and colony formation', 'Confirms strain viability and growth']
    ],
    trapTitle: 'Do not confuse weak growth with a true zone',
    trapBody: 'A valid DNase positive result requires a clear, colorless zone extending significantly beyond the edge of the colony streak. A faint, narrow shadow directly beneath the growth is often just light scattering and should not be reported as positive.',
    trapBullets: [
      'Ensure you have heavy growth of an 18-24 hour culture before reading.',
      'Use a dark, non-reflective background underneath the plate to clearly judge the colorless halo.',
      'Some coagulase-negative staphylococci (like S. schleiferi) can produce DNase; always correlate with a coagulase test.'
    ],
    interpretationTitle: 'Coagulase study readout',
    interpretationRows: [
      ['Wide colorless zone', 'DNase Positive', 'Confirms Staphylococcus aureus (separates from CNS) or Serratia marcescens (separates from Enterobacter).'],
      ['No colorless zone (agar stays teal)', 'DNase Negative', 'Confirms coagulase-negative staphylococcus (e.g. S. epidermidis) or Enterobacter aerogenes (non-degrading).'],
      ['Moraxella vs Neisseria', 'Moraxella catarrhalis (+)', 'Moraxella catarrhalis is DNase positive, while pathogenic Neisseria species are DNase negative.']
    ],
    takeaways: [
      'Differentiates DNase-producing Staphylococcus aureus and Serratia marcescens from non-producing relatives.',
      'Measures active enzymatic hydrolysis of deoxyribonucleic acid (DNA).',
      'Uses methyl green dye complexed with highly polymerized DNA as a color indicator at pH 7.5.'
    ],
    remember: 'A clear colorless halo around the colony is positive. Light scattering under thick growth is not a zone.',
    biochemicalTestId: 'dnase',
    relatedLearnSlug: 'staphylococcus-micrococcus'
  },
  {
    slug: 'methyl-red-voges-proskauer',
    title: 'Methyl Red / Voges-Proskauer (MRVP) Reaction Guide',
    eyebrow: 'Visual Atlas',
    summary: 'An original four-tube bench visual for reading the Methyl Red and Voges-Proskauer combination test used to separate members of the Enterobacteriaceae family.',
    boardTitle: 'MRVP tubes A-D',
    boardNote: 'Read MR first (color with reagent added), then VP separately. Each tube answers a different metabolic question.',
    ariaLabel: 'Illustrated MRVP broth tubes showing MR positive bright red, MR negative yellow, VP positive red after reagents, VP negative yellow',
    visualType: 'mrvp',
    tubes: [
      {
        id: 'A',
        label: 'MR Positive',
        name: 'Bright red after methyl red',
        colors: { slant: '#d01b2a', butt: '#e03040', base: '#c01525' },
        note: 'Mixed acid fermentation lowered pH below 4.4; methyl red indicator turns bright red.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'MR Negative',
        name: 'Yellow-orange after methyl red',
        colors: { slant: '#d97706', butt: '#fbbf24', base: '#b45309' },
        note: 'pH remains above 6.0; indicator stays yellow or red-orange. Not a mixed acid pattern.',
        growth: 'heavy'
      },
      {
        id: 'C',
        label: 'VP Positive',
        name: 'Red after alpha-naphthol and KOH',
        colors: { slant: '#b91c1c', butt: '#ef4444', base: '#991b1b' },
        note: 'Acetoin is oxidized to diacetyl, which reacts with creatine under KOH to produce a red complex.',
        growth: 'heavy'
      },
      {
        id: 'D',
        label: 'VP Negative',
        name: 'Yellow after reagents',
        colors: { slant: '#ca8a04', butt: '#facc15', base: '#a16207' },
        note: 'No acetoin production; the broth remains yellow after both reagents are added.',
        growth: 'heavy'
      }
    ],
    readoutTitle: 'Color-to-result anchors',
    readoutRows: [
      ['Bright red (MR)', 'Mixed acid fermentation sustained; pH dropped below 4.4', 'MR positive — classic E. coli pattern'],
      ['Yellow or orange (MR)', 'Mixed acid pathway not dominant; buffering kept pH higher', 'MR negative — classic Klebsiella/Enterobacter pattern'],
      ['Red after KOH/alpha-naphthol (VP)', 'Acetoin oxidized to diacetyl; creatine forms red complex', 'VP positive — 2,3-butanediol pathway active'],
      ['Yellow after reagents (VP)', 'No acetoin produced; no diacetyl complex formed', 'VP negative'],
      ['Timing', 'MR should not be read before 48 hours of incubation', 'Early reads may be falsely MR negative']
    ],
    trapTitle: 'Do not read MR and VP from the same tube',
    trapBody: 'MR and VP are designed as a matched pair but they must be read from separate aliquots of the same broth culture. Reading both from one tube after adding MR reagent will prevent a valid VP endpoint.',
    trapBullets: [
      'Split the MRVP broth into two tubes before adding any reagent.',
      'Add alpha-naphthol first, then KOH for the VP test; shake and wait 30 minutes.',
      'Do not report MR positive before 48 hours of incubation.'
    ],
    interpretationTitle: 'MRVP study readout',
    interpretationRows: [
      ['MR (+) VP (-)', 'E. coli pattern', 'Mixed acid fermentation organism; classic IMViC profile of (+)(-).'],
      ['MR (-) VP (+)', 'Klebsiella / Enterobacter pattern', '2,3-Butanediol pathway; classic IMViC profile of (-)(+).'],
      ['MR (+) VP (+)', 'Unusual or organism-dependent', 'Some organisms can test positive for both; correlate with colony and Gram stain.'],
      ['MR (-) VP (-)', 'Non-fermenter or slow fermenter', 'Repeat if growth is questionable; correlate with the full biochemical profile.']
    ],
    takeaways: [
      'MR and VP are always read as a pair and from separate tube aliquots.',
      'MR detects mixed acid fermentation; VP detects acetoin (2,3-butanediol pathway).',
      'E. coli is MR positive, VP negative; Klebsiella pneumoniae is MR negative, VP positive.'
    ],
    remember: 'Best mental model: MR asks if the organism makes and keeps mixed acids; VP asks if it converts those acids to a neutral product (acetoin/2,3-butanediol).',
    biochemicalTestId: 'methyl-red',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'microdase-test',
    title: 'Microdase Test (Modified Oxidase)',
    eyebrow: 'Visual Atlas',
    summary: 'An original disk bench visual for reading modified oxidase activity to rapidly differentiate Micrococcus from Staphylococcus among catalase-positive Gram-positive cocci.',
    boardTitle: 'Microdase disks A-B',
    boardNote: 'Read the disk at exactly 2 minutes. Blue to purple-blue is positive; no color change is negative.',
    ariaLabel: 'Illustrated microdase disks showing blue-purple positive Micrococcus reaction and unchanged white negative Staphylococcus reaction',
    visualType: 'microdase',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Micrococcus luteus',
        colors: { slant: '#ffffff', butt: '#5b21b6', base: '#ffffff' },
        note: 'Development of blue to purple-blue color within 2 minutes; oxidase enzyme reacted with cytochrome C to form indophenol.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Staphylococcus aureus',
        colors: { slant: '#ffffff', butt: '#e2e8f0', base: '#ffffff' },
        note: 'No color change on the disk after 2 minutes; oxidase is absent.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Blue to purple-blue disk', 'Oxidase enzyme oxidized the reagent with cytochrome C to form indophenol', 'Positive — Micrococcus'],
      ['No color change', 'Oxidase enzyme is absent; reagent remains uncolored', 'Negative — Staphylococcus'],
      ['Read at 2 minutes', 'Strictly timed endpoint prevents false-positive results from air exposure', 'Do not read after 2 minutes'],
      ['Colony smear on disk', 'Rub several colonies from blood agar onto the dry disk surface', 'Do not rehydrate the disk before use']
    ],
    trapTitle: 'Do not rehydrate the disk or read too late',
    trapBody: 'The microdase disk must be used dry. Adding water or reading the disk beyond the 2-minute window can produce a misleading color development that resembles a positive result.',
    trapBullets: [
      'Rub colonies directly onto a dry disk; do not moisten it first.',
      'Read strictly at 2 minutes; discard any color appearing after that window.',
      'Use only colonies grown on blood agar; growth from selective media may give unreliable results.'
    ],
    interpretationTitle: 'Microdase study readout',
    interpretationRows: [
      ['Positive', 'Blue to purple-blue color within 2 minutes', 'Presumptive Micrococcus species; correlate with Gram stain (GPC in tetrads) and colony morphology.'],
      ['Negative', 'No color change within 2 minutes', 'Presumptive Staphylococcus species; continue workup with coagulase, novobiocin, or PYR as appropriate.'],
      ['Limitations', 'S. sciuri, S. lentus, S. vitulus may be positive', 'Confirm species-level identification with additional tests when clinical context requires.']
    ],
    takeaways: [
      'Microdase (modified oxidase) rapidly separates Micrococcus (positive) from Staphylococcus (negative).',
      'Both genera are catalase-positive Gram-positive cocci, so catalase does not separate them.',
      'The 2-minute read window is mandatory; late color development should not be reported.'
    ],
    remember: 'Best mental model: Micrococcus has cytochrome oxidase and turns the disk purple; Staphylococcus lacks it and the disk stays white.',
    biochemicalTestId: 'microdase',
    relatedLearnSlug: 'staphylococcus-micrococcus'
  },
  {
    slug: 'motility-testing',
    title: 'Motility Testing',
    eyebrow: 'Visual Atlas',
    summary: 'A bench visual for reading semisolid motility medium deeps containing TTC indicator, used to determine whether bacterial species are motile.',
    boardTitle: 'Motility tubes A-B',
    boardNote: 'Diffuse red growth radiating from the stab line indicates motility. Growth restricted to the stab line indicates non-motility.',
    ariaLabel: 'Illustrated motility tubes showing diffuse red growth of E. coli (motile) and sharp red line of growth of S. aureus (non-motile)',
    visualType: 'motility',
    tubes: [
      {
        id: 'A',
        label: 'Positive (Motile)',
        name: 'Escherichia coli',
        colors: { slant: '#fec9c9', butt: '#ef4444', base: '#eab308' },
        note: 'Diffuse, cloudy red growth spreading outward from the central stab line throughout the medium.'
      },
      {
        id: 'B',
        label: 'Negative (Non-motile)',
        name: 'Staphylococcus aureus',
        colors: { slant: '#fef9c3', butt: '#fef08a', base: '#eab308' },
        note: 'Sharp, well-defined red growth restricted strictly along the path of the stab inoculation, with surrounding medium remaining clear.'
      }
    ],
    readoutTitle: 'Visual cues & outcomes',
    readoutRows: [
      ['Diffuse red cloudiness throughout', 'Organism has flagella and migrated away from the inoculation path, reducing TTC to red formazan along the way.', 'Positive — Motile (e.g., E. coli)'],
      ['Sharp red growth line only', 'Organism lacks motility; growth and TTC reduction occur strictly where the needle penetrated the agar.', 'Negative — Non-motile (e.g., S. aureus)'],
      ['No red color but cloudy', 'TTC indicator might be absent or not reduced. Check growth or check under microscope if in doubt.', 'Inconclusive — repeat test']
    ],
    trapTitle: 'Watch out for 2D spreading and loose stabs',
    trapBody: 'A wobbly needle during stabbing can create a wide path of growth that mimics motility. Always check the outer edges of the tube for a clear boundary to distinguish a "loose stab" from true active motility.',
    trapBullets: [
      'Use a straight inoculating needle, never a loop.',
      'Stab straight down the center and withdraw along the exact same path.',
      'Compare against an uninoculated control tube if the medium has background turbidity.'
    ],
    interpretationTitle: 'Clinical and taxonomic significance',
    interpretationRows: [
      ['E. coli / Enterobacterales', 'Usually motile (except Shigella and Klebsiella)', 'Helps differentiate Klebsiella (non-motile) from Enterobacter (motile).'],
      ['Bacillus species', 'B. anthracis (non-motile) vs. B. cereus (motile)', 'Crucial biodefense and diagnostic distinction.'],
      ['Listeria monocytogenes', 'Umbrella-like motility at 25°C, non-motile at 35°C', 'Temperature-dependent motility is highly diagnostic.']
    ],
    takeaways: [
      'Motility testing requires a semisolid medium (usually 0.4% agar) to allow flagellated cells to swim.',
      'TTC (triphenyltetrazolium chloride) is often added as an electron acceptor; reduced TTC forms insoluble red formazan, highlighting growth.',
      'Non-motile bacteria only grow along the stab line; motile bacteria render the entire tube cloudy.'
    ],
    remember: 'Best mental model: If the red color spreads out like a cloud, the bacteria can swim; if it is a sharp pencil line, they are stuck in place.',
    biochemicalTestId: 'motility',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'mrs-broth',
    title: 'MRS Broth (de Man, Rogosa, Sharpe)',
    eyebrow: 'Visual Atlas',
    summary: 'An original two-tube bench visual for reading gas production in MRS broth, differentiating gas-producing Leuconostoc sp. from non-gas-producing Lactobacillus sp.',
    boardTitle: 'MRS broth tubes A-B',
    boardNote: 'Confirm growth by turbidity first, then examine the Durham tube for trapped gas.',
    ariaLabel: 'Illustrated MRS broth tubes showing an inverted Durham tube with a gas bubble in tube A for Leuconostoc and a fully filled Durham tube with no gas in tube B for Lactobacillus',
    visualType: 'mrs-broth',
    tubes: [
      {
        id: 'A',
        label: 'Positive with Gas',
        name: 'Leuconostoc sp.',
        colors: { slant: '#f59e0b', butt: '#fbbf24', base: '#d97706' },
        note: 'Growth present (turbid broth) and a gas bubble is trapped at the closed top of the Durham tube, indicating gas production during glucose fermentation.',
        growth: 'heavy'
      },
      {
        id: 'B',
        label: 'Positive, No Gas',
        name: 'Lactobacillus sp.',
        colors: { slant: '#f59e0b', butt: '#fbbf24', base: '#d97706' },
        note: 'Growth present (turbid broth) but the Durham tube is completely filled with broth and contains no gas bubble; organism ferments glucose homofermentatively.',
        growth: 'heavy'
      }
    ],
    readoutTitle: 'What to examine',
    readoutRows: [
      ['Turbid amber broth + gas bubble in Durham tube', 'Organism produced CO2 during heterofermentative glucose fermentation; gas displaced broth from the inverted tube.', 'Positive with gas — Leuconostoc'],
      ['Turbid amber broth + no gas in Durham tube', 'Growth occurred but fermentation was homofermentative; no CO2 produced.', 'Positive, no gas — Lactobacillus'],
      ['Clear broth, no growth', 'Organism does not grow in MRS medium at all.', 'Negative — not a lactic acid bacterium'],
      ['Tiny bubbles vs. large bubble', 'Only a bubble displacing at least 10% of the Durham tube volume is a confirmed positive gas result.', 'Small wisps are not reportable']
    ],
    trapTitle: 'Gas in Durham tube vs. false air bubble',
    trapBody: 'Air bubbles can become trapped during inoculation or autoclaving and may be mistaken for a gas-positive result. Always compare against an uninoculated MRS broth control containing a Durham tube to confirm the baseline.',
    trapBullets: [
      'Check the control tube: a bubble in the control means gas was introduced during setup, not fermentation.',
      'Read after a full 24–48 hours; early reads may miss slower gas producers.',
      'MRS is selective for lactic acid bacteria; contamination or false positives from non-target organisms should prompt Gram stain confirmation.'
    ],
    interpretationTitle: 'MRS broth study readout',
    interpretationRows: [
      ['Turbid + gas (Durham)', 'Heterofermentative; produces CO2, ethanol, and lactic acid from glucose', 'Leuconostoc sp.; also some heterofermentative Lactobacillus species'],
      ['Turbid + no gas', 'Homofermentative; produces only lactic acid from glucose', 'Lactobacillus sp. (e.g., L. acidophilus, L. lactis)'],
      ['Clear, no growth', 'Not a lactic acid bacterium; or inhibited by selective agents', 'E. coli and other non-lactobacilli are inhibited']
    ],
    takeaways: [
      'MRS broth selects for lactic acid bacteria (lactobacilli, leuconostocs) by providing rich nutrients and acetate/citrate as selective inhibitors.',
      'The Durham tube inside the broth tube traps gas produced during fermentation at the closed (inverted) end.',
      'Gas in the Durham tube = heterofermentative (Leuconostoc pattern); no gas = homofermentative (Lactobacillus pattern).'
    ],
    remember: 'Best mental model: If the Durham tube has a clear space at its sealed top, the organism is a heterofermentor and made CO2; if it is fully submerged and filled, the organism ferments without making gas.',
    biochemicalTestId: 'mrs-broth',
    relatedLearnSlug: 'lactobacillus'
  },
  {
    slug: 'mug-test',
    title: 'MUG Test (4-Methylumbelliferyl-β-D-Glucuronide)',
    eyebrow: 'Visual Atlas',
    summary: 'A UV-fluorescence bench visual for reading the MUG disk test, used to presumptively identify β-glucuronidase-producing E. coli and other Enterobacteriaceae.',
    boardTitle: 'MUG disks A-B under 366 nm UV',
    boardNote: 'Observe disks in a darkened environment using a 366 nm long-wave UV light. Electric blue fluorescence is positive.',
    ariaLabel: 'Illustrated MUG test disks under UV light showing electric blue fluorescence for E. coli positive and no fluorescence for Klebsiella negative',
    visualType: 'mug-test',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Escherichia coli',
        colors: { slant: '#3b82f6', butt: '#60a5fa', base: '#1d4ed8' },
        note: 'Electric blue fluorescence develops on the disk within 2 hours; β-glucuronidase hydrolyzed the MUG substrate to produce the fluorescent 4-methylumbelliferyl moiety.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Klebsiella pneumoniae',
        colors: { slant: '#f1f5f9', butt: '#e2e8f0', base: '#cbd5e1' },
        note: 'No fluorescence on the disk; β-glucuronidase is absent in this organism.'
      }
    ],
    readoutTitle: 'How to read under UV',
    readoutRows: [
      ['Electric blue fluorescence on disk', 'β-glucuronidase hydrolyzed MUG substrate; 4-methylumbelliferyl moiety fluoresces at 366 nm', 'Positive — presumptive E. coli'],
      ['No fluorescence (disk stays white)', 'β-glucuronidase absent; MUG substrate remains intact and does not fluoresce', 'Negative — not E. coli pattern'],
      ['Read time', 'Incubate 35–37 °C for up to 2 hours before UV observation', 'Do not read after 2 hours'],
      ['UV wavelength', '366 nm long-wave UV only; short-wave UV (254 nm) will not show this reaction', 'Always use a long-wave UV lamp']
    ],
    trapTitle: 'Do not use colonies from EMB or MAC agar',
    trapBody: 'Colonies isolated from media containing certain dyes (EMB, MAC) may fluoresce naturally under UV light regardless of β-glucuronidase activity, leading to a false-positive interpretation. Additionally, some oxidase-negative organisms naturally fluoresce without MUG hydrolysis.',
    trapBullets: [
      'Always use colonies from a non-fluorescent medium such as blood agar or tryptic soy agar.',
      'Only test oxidase-negative organisms; oxidase-positive organisms may give misleading background fluorescence.',
      'Verotoxin-producing E. coli strains (O157:H7) are typically MUG-negative despite being E. coli; a negative result does NOT rule out VTEC.'
    ],
    interpretationTitle: 'MUG test study readout',
    interpretationRows: [
      ['Positive (fluorescent)', 'E. coli or MUG-positive Enterobacteriaceae', 'Presumptive E. coli; confirm with IMViC or additional biochemicals.'],
      ['Negative (no fluorescence)', 'Klebsiella, Enterobacter, Proteus, or most non-E. coli Enterobacteriaceae', 'Rule out VTEC (O157:H7) separately; they are MUG-negative.'],
      ['Positive limitations', 'Some non-E. coli species are MUG-positive; use with clinical context', 'Citrobacter freundii and some Salmonella are occasionally MUG-positive.']
    ],
    takeaways: [
      'MUG detects β-glucuronidase, the enzyme that hydrolyzes the fluorescent MUG substrate to 4-methylumbelliferone.',
      'Positive = electric blue fluorescence under 366 nm UV; negative = no fluorescence.',
      'Most E. coli (90–95%) are MUG-positive, but verotoxin-producing strains (VTEC/O157:H7) are characteristically MUG-negative.'
    ],
    remember: 'Best mental model: If the disk glows blue under UV, β-glucuronidase is present and the organism behaves like E. coli. If the disk stays dark, look for other organisms — or be alert for VTEC.',
    biochemicalTestId: 'mug-test',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'nitrate-reduction',
    title: 'Nitrate Reduction Test',
    eyebrow: 'Visual Atlas',
    summary: 'A visual guide to the nitrate reduction test, illustrating the three distinct metabolic endpoints (reduction to nitrite, reduction to nitrogen gas, or no reduction) using a Durham tube and zinc dust.',
    boardTitle: 'Nitrate Reduction Broths A-D',
    boardNote: 'Differentiate reduction of nitrate to nitrite, complete reduction to gaseous nitrogen (N2), and negative reactions after adding reagents A & B and zinc dust.',
    ariaLabel: 'Four tubes of nitrate broth showing positive and negative reactions with gas bubbles and zinc dust',
    visualType: 'nitrate-reduction',
    tubes: [
      {
        id: 'A',
        label: 'A',
        name: 'Positive (NO3- to NO2-)',
        colors: { slant: '#ef4444', butt: '#dc2626', base: '#991b1b' },
        note: 'Red color after adding sulfanilic acid (Reagent A) and alpha-naphthylamine (Reagent B); indicates reduction of nitrate (NO3-) to nitrite (NO2-). Durham tube has no gas.'
      },
      {
        id: 'B',
        label: 'B',
        name: 'Positive (NO3- to NO2- with Gas)',
        colors: { slant: '#ef4444', butt: '#dc2626', base: '#991b1b' },
        note: 'Red color after adding Reagents A and B, with a gas bubble in the Durham tube. Indicates nitrate reduction to nitrite plus gas production from fermentation.'
      },
      {
        id: 'C',
        label: 'C',
        name: 'Positive (NO3- to N2 Gas)',
        colors: { slant: '#fef08a', butt: '#eab308', base: '#ca8a04' },
        note: 'No color after Reagents A & B, and remains colorless after adding zinc dust. Gas bubble in Durham tube indicates complete reduction to nitrogen gas (denitrification).'
      },
      {
        id: 'D',
        label: 'D',
        name: 'Uninoculated Broth',
        colors: { slant: '#fef08a', butt: '#eab308', base: '#ca8a04' },
        note: 'Baseline medium. Amber broth, no gas bubble in Durham tube, serving as a negative control.'
      }
    ],
    readoutTitle: 'Deciphering the reaction steps',
    readoutRows: [
      ['Red color after Reagents A & B', 'Nitrate reduced to nitrite (NO2-); reacts with sulfanilic acid & alpha-naphthylamine to form red azo dye', 'Positive (NO3+ to NO2-)'],
      ['No color after Reagents A & B', 'Either nitrate is unreduced, OR reduced beyond nitrite to nongaseous/gaseous products', 'Inconclusive; must add zinc'],
      ['Red color after Zinc dust', 'Zinc chemically reduced remaining nitrate to nitrite, which then reacted with Reagents A & B', 'Negative (NO3- not reduced)'],
      ['No color after Zinc dust', 'No nitrate remained for zinc to reduce; nitrate was biologically reduced to N2, NH3, or other products', 'Positive (NO3+ to N2 or NH3)'],
      ['Gas bubble in Durham tube', 'Gaseous nitrogen (N2) or fermentation gas produced', 'Gas production indicator']
    ],
    trapTitle: 'Do not assume "no color change" means a negative test',
    trapBody: 'A colorless tube after adding Reagents A and B is the most common student pitfall. It does not mean the test is negative. You must perform the zinc dust confirmation step to determine if nitrate is still present.',
    trapBullets: [
      'Always add zinc dust to any colorless tube after adding Reagents A and B.',
      'Zinc dust is a chemical reducing agent; a red color AFTER zinc means the organism did NOT reduce the nitrate.',
      'Check for gas in the Durham tube BEFORE adding reagents. If the organism is a glucose fermenter (like many Enterobacteriaceae), gas might be from fermentation, not denitrification.'
    ],
    interpretationTitle: 'Nitrate Reduction Interpretive Matrix',
    interpretationRows: [
      ['Red after Reagents A & B', 'Nitrate reduced to Nitrite (NO3+)', 'Organism produces nitrate reductase. Common in Escherichia coli (positive control).'],
      ['Colorless after A & B, Colorless after Zinc, Gas present', 'Nitrate reduced to Nitrogen Gas (NO3+, gas+)', 'Denitrification complete. Common in Pseudomonas aeruginosa (positive control).'],
      ['Colorless after A & B, Colorless after Zinc, No gas', 'Nitrate reduced to Ammonia/other nongaseous products (NO3+)', 'Nitrate reduced beyond nitrite to nongaseous end products.'],
      ['Colorless after A & B, Red after Zinc', 'Negative for nitrate reduction', 'Nitrate remained intact in broth; zinc reduced it to nitrite. Common in Acinetobacter baumannii.'],
      ['Uninoculated Control', 'No reaction', 'Baseline comparison for color changes and Durham tube integrity.']
    ],
    takeaways: [
      'Nitrate reduction determines the ability of an organism to reduce nitrate (NO3-) to nitrite (NO2-) or other nitrogenous compounds.',
      'The test requires a sequential two-step reagent addition: Reagents A & B first, followed by zinc dust if no color develops.',
      'Enterobacteriaceae typically reduce nitrate to nitrite. Non-fermenters like Pseudomonas aeruginosa often perform complete denitrification to nitrogen gas.'
    ],
    remember: 'Best mental model: Reagents A & B detect nitrite (red = positive). Zinc dust detects nitrate (red = negative). If neither is detected, nitrate was reduced completely beyond nitrite (colorless = positive).',
    biochemicalTestId: 'nitrate-reduction',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'nitrite-reduction',
    title: 'Nitrite Reduction Test',
    eyebrow: 'Visual Atlas',
    summary: 'A visual guide to the nitrite reduction test, used to determine whether an organism can reduce nitrites to gaseous nitrogen or other nitrogenous compounds.',
    boardTitle: 'Nitrite Reduction Broths A-B',
    boardNote: 'Differentiate reduction of nitrite to nitrogen gas (colorless, gas positive) from a negative reaction (red) after adding reagents A & B.',
    ariaLabel: 'Two tubes of nitrite broth showing positive (colorless with gas) and negative (red) reactions',
    visualType: 'nitrite-reduction',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Proteus mirabilis',
        colors: { slant: '#fef08a', butt: '#eab308', base: '#ca8a04' },
        note: 'No color change after adding Reagents A and B (and zinc dust); gas bubble present in the Durham tube. Nitrite was reduced to gaseous nitrogen.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Acinetobacter baumannii',
        colors: { slant: '#ef4444', butt: '#dc2626', base: '#991b1b' },
        note: 'Broth becomes red after addition of Reagents A and B; no gas production. Nitrite remains in the medium and is unreduced.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['No color change to red', 'Nitrite has been reduced to gaseous nitrogen or other compounds', 'Positive — nitrite reduced'],
      ['Gas in Durham tube', 'Gaseous nitrogen produced from nitrite reduction', 'Positive gas indicator'],
      ['Red color', 'Nitrite is still present and reacted with reagents A and B', 'Negative — nitrite not reduced'],
      ['Zinc dust addition', 'Added if no color and no gas to check for oxidation to nitrate; red after zinc indicates oxidation occurred', 'Confirms negative if red']
    ],
    trapTitle: 'Read carefully to avoid confusing with Nitrate test',
    trapBody: 'The nitrite reduction test starts with nitrite in the broth, unlike the nitrate reduction test. Therefore, the color interpretations are the opposite of the nitrate test.',
    trapBullets: [
      'In Nitrite Reduction: Red = Negative (nitrite is still there).',
      'In Nitrate Reduction: Red (after reagents A & B) = Positive (nitrate was reduced to nitrite).',
      'Always verify which broth (nitrate vs. nitrite) you are inoculating to prevent completely inverted interpretations.'
    ],
    interpretationTitle: 'Nitrite Reduction Interpretive Matrix',
    interpretationRows: [
      ['Colorless, gas present', 'Positive', 'Nitrite reduced to gaseous nitrogen (e.g., Proteus mirabilis).'],
      ['Colorless, no gas (stays colorless after zinc)', 'Positive', 'Nitrite reduced to nongaseous nitrogen compounds.'],
      ['Red after Reagents A & B', 'Negative', 'Nitrite remains unreduced (e.g., Acinetobacter baumannii).'],
      ['Red after Zinc dust', 'Invalid/Negative', 'Nitrite was oxidized to nitrate during incubation.']
    ],
    takeaways: [
      'This test specifically asks if an organism can reduce nitrite (NO2-) further down the denitrification pathway.',
      'A red color means nitrite is still present (Negative).',
      'A colorless broth with gas means nitrite was completely reduced to nitrogen gas (Positive).'
    ],
    remember: 'Nitrite test logic: Red means the starting ingredient (nitrite) is still there, so the organism didn\'t use it. Red = Negative.',
    biochemicalTestId: 'nitrite-reduction',
    relatedLearnSlug: 'nonfermenting-gram-negative-rods'
  },
  {
    slug: 'onpg-test',
    title: 'ONPG Test',
    eyebrow: 'Visual Atlas',
    summary: 'A bench visual for the ONPG test, used to detect β-galactosidase activity to differentiate late lactose fermenters from true non-lactose fermenters.',
    boardTitle: 'ONPG Tubes A-B',
    boardNote: 'An ONPG disk is added to a saline suspension of the organism. A yellow color shift indicates β-galactosidase hydrolyzed the substrate.',
    ariaLabel: 'Two ONPG test tubes showing a yellow positive reaction and a colorless negative reaction',
    visualType: 'onpg-test',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Shigella sonnei',
        colors: { slant: '#fde047', butt: '#eab308', base: '#ca8a04' },
        note: 'The suspension and disk turn yellow; β-galactosidase hydrolyzed ONPG to yield galactose and the yellow compound o-nitrophenol.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Salmonella typhimurium',
        colors: { slant: '#f8fafc', butt: '#f1f5f9', base: '#e2e8f0' },
        note: 'The suspension and disk remain colorless; the organism does not produce β-galactosidase.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Yellow fluid or disk', 'o-nitrophenol was released from the ONPG substrate', 'Positive for β-galactosidase'],
      ['Colorless fluid and disk', 'ONPG substrate remained intact', 'Negative for β-galactosidase'],
      ['Read time', 'Usually read at 1 to 4 hours, up to 24 hours depending on the protocol', 'Delayed positives can occur']
    ],
    trapTitle: 'Do not confuse lactose permease and β-galactosidase',
    trapBody: 'True lactose fermenters possess both lactose permease (to bring lactose into the cell) and β-galactosidase (to cleave it). Late lactose fermenters lack the permease but have the internal enzyme. ONPG is a small molecule that enters the cell without permease, revealing the hidden enzyme.',
    trapBullets: [
      'ONPG detects late lactose fermenters that appear negative on MacConkey agar at 24 hours.',
      'Organisms like Shigella sonnei or some Citrobacter species are classic late fermenters (ONPG positive).',
      'True non-fermenters (like Salmonella) lack both enzymes and are ONPG negative.'
    ],
    interpretationTitle: 'ONPG Test Interpretive Matrix',
    interpretationRows: [
      ['Yellow', 'Positive', 'Organism produces β-galactosidase. Correlates with late or rapid lactose fermentation.'],
      ['Colorless', 'Negative', 'Organism does not produce β-galactosidase. Correlates with true non-lactose fermentation.']
    ],
    takeaways: [
      'ONPG stands for o-Nitrophenyl-β-D-Galactopyranoside.',
      'The test bypasses the need for lactose permease by directly testing for the intracellular β-galactosidase enzyme.',
      'It is a high-yield test for differentiating Salmonella (ONPG-) from Shigella sonnei or Citrobacter (ONPG+).'
    ],
    remember: 'If it turns yellow, it has the enzyme to break down lactose, even if it looked like a non-fermenter on your MAC plate yesterday.',
    biochemicalTestId: 'onpg',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'optochin-test',
    title: 'Optochin (P Disk) Susceptibility Test',
    eyebrow: 'Visual Atlas',
    summary: 'A visual guide to the Optochin susceptibility test, key for the presumptive identification of Streptococcus pneumoniae.',
    boardTitle: 'Optochin plates A-B',
    boardNote: 'Compare the zone of inhibition around the ethyl hydrocupreine hydrochloride (P) disk on blood agar.',
    ariaLabel: 'Two blood agar plates showing Optochin susceptibility (zone of inhibition) and resistance (growth to disk)',
    visualType: 'optochin-test',
    tubes: [
      {
        id: 'A',
        label: 'Susceptible (Positive)',
        name: 'Streptococcus pneumoniae',
        colors: { slant: '#9e1b24', butt: '#555d3e', base: '#9e1b24' },
        note: 'Optochin-sensitive organism showing a zone of inhibition ≥14 mm. Growth is inhibited, leaving the surrounding blood agar unhemolyzed (red).'
      },
      {
        id: 'B',
        label: 'Resistant (Negative)',
        name: 'Streptococcus pyogenes',
        colors: { slant: '#9e1b24', butt: '#555d3e', base: '#9e1b24' },
        note: 'Optochin-resistant organism showing growth right up to the 6 mm disk edge. The alpha or beta hemolytic lawn extends to the disk.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Zone of Inhibition ≥14 mm', 'Growth is inhibited by Optochin; agar remains blood red around the disk', 'Susceptible (Presumptive S. pneumoniae)'],
      ['Zone <14 mm', 'Questionable for S. pneumoniae; needs confirmation with a bile-solubility test', 'Equivocal reaction'],
      ['No Zone of Inhibition', 'Organism grows up to the disk edge; growth converts blood to olive-green methemoglobin (alpha-hemolysis)', 'Resistant (Other viridans/alpha-strep)']
    ],
    trapTitle: 'Beware of Incubation Conditions',
    trapBody: 'Optochin plates must be incubated in a 5% CO2 incubator (or candle jar) for 18 to 24 hours. Streptococcus pneumoniae grows poorly in ambient air, which can cause falsely large, non-standardized zones of inhibition.',
    trapBullets: [
      'Incubation in CO2 is mandatory for a standardized zone diameter cut-off (14 mm).',
      'Always confirm equivocal zones (9–13 mm) using the bile-solubility test.',
      'S. pneumoniae lyses in Optochin because Optochin disrupts ATPase activity in the cell membrane.'
    ],
    interpretationTitle: 'Optochin Susceptibility Interpretive Matrix',
    interpretationRows: [
      ['Zone ≥14 mm (6 mm disk)', 'Susceptible', 'Presumptive Streptococcus pneumoniae.'],
      ['Zone <14 mm (6 mm disk)', 'Equivocal', 'Perform bile-solubility test; some S. pneumoniae are atypical or zones are borderline.'],
      ['No zone (growth to disk)', 'Resistant', 'Presumptive viridans Streptococcus or other alpha-hemolytic species.']
    ],
    takeaways: [
      'Optochin is ethyl hydrocupreine hydrochloride, a detergent-like compound that selectively lyses pneumococci.',
      'A zone of inhibition ≥14 mm using a standard 6 mm disk indicates susceptibility.',
      'The test is specifically used to differentiate S. pneumoniae from other alpha-hemolytic viridans streptococci.'
    ],
    remember: 'P is for Pneumoniae (and P-disk). Susceptible = Pneumoniae. Resistant = Other viridans strep.',
    biochemicalTestId: 'optochin-susceptibility',
    relatedLearnSlug: 'gram-positive-cocci'
  },
  {
    slug: 'oxidase-test',
    title: 'Oxidase Test (Kovac\'s Method)',
    eyebrow: 'Visual Atlas',
    summary: 'A bench guide to Kovac\'s oxidase test, detecting cytochrome c oxidase activity to separate Pseudomonas (positive) from Enterobacteriaceae (negative).',
    boardTitle: 'Oxidase reaction cards A-B',
    boardNote: 'Bacterial colonies are rubbed onto filter paper saturated with Kovac\'s reagent. A dark purple color within 10 seconds is positive.',
    ariaLabel: 'Two oxidase test cards showing a dark purple positive reaction and a colorless negative reaction',
    visualType: 'oxidase-test',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Pseudomonas aeruginosa',
        colors: { slant: '#f8fafc', butt: '#581c87', base: '#3b0764' },
        note: 'Development of a deep purple/violet color within 10 seconds. Cytochrome c oxidase oxidized Kovac\'s reagent to indophenol.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Escherichia coli',
        colors: { slant: '#f8fafc', butt: '#ffffff', base: '#cbd5e1' },
        note: 'Absence of color change after rubbing the colony onto the filter paper. The organism is oxidase-negative.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Dark purple color', 'Cytochrome c oxidase oxidizes the substrate to purple indophenol', 'Positive (within 10 seconds)'],
      ['No color change / white paper', 'Reagent remains reduced (colorless)', 'Negative reaction'],
      ['10-second window', 'Must be read within 10-15 seconds; auto-oxidation can cause false-positive purple coloration later', 'Timing is critical']
    ],
    trapTitle: 'Avoid Nickel-Base Alloy Loops',
    trapBody: 'Always use a platinum inoculating wire or a sterile wooden stick. Nickel-base alloy wires containing chromium and iron (such as nichrome) can catalyze the reaction and produce a false-positive color change on the filter paper.',
    trapBullets: [
      'Nichrome loops can auto-oxidize Kovac\'s reagent, yielding false-positive purple spots.',
      'Only use colonies grown on non-selective media (avoid colonies from MacConkey agar as lactose fermentation acids can suppress oxidase reaction).',
      'The reagent is 1% tetramethyl-p-phenylenediamine dihydrochloride.'
    ],
    interpretationTitle: 'Oxidase Interpretive Matrix',
    interpretationRows: [
      ['Deep blue or purple (≤10s)', 'Positive', 'Cytochrome oxidase present. Typical for Pseudomonas, Neisseria, Campylobacter.'],
      ['No color change', 'Negative', 'Cytochrome oxidase absent. Typical for Escherichia, Klebsiella, Salmonella.']
    ],
    takeaways: [
      'The oxidase test detects cytochrome c oxidase, a key enzyme in the aerobic respiratory chain.',
      'A positive result is a deep purple/indigo spot appearing within 10 seconds.',
      'This test is a cornerstone for separating Enterobacteriaceae (all are oxidase negative) from aerobic Gram-negative rods like Pseudomonas (oxidase positive).'
    ],
    remember: 'Purple in 10s = Positive. Enterobacteriaceae are all oxidase-negative (like E. coli). Pseudomonas is oxidase-positive.',
    biochemicalTestId: 'oxidase',
    relatedLearnSlug: 'nonfermenting-gram-negative-rods'
  },
  {
    slug: 'of-medium',
    title: 'Oxidation/Fermentation (OF) Medium (CDC Method)',
    eyebrow: 'Visual Atlas',
    summary: 'A visual guide to the OF medium test, used to classify bacteria as fermenters, oxidizers, or non-utilizers based on their carbohydrate metabolism under aerobic and anaerobic conditions.',
    boardTitle: 'OF Dextrose Tubes A-C',
    boardNote: 'Compare the open (aerobic) and oil-overlaid (anaerobic) tube pairs. Phenol red turns yellow under acid conditions.',
    ariaLabel: 'Three pairs of OF dextrose tubes showing Fermentation (both yellow), Oxidation (only open yellow at top), and Non-utilization (both red)',
    visualType: 'of-medium',
    tubes: [
      {
        id: 'A1',
        label: 'Fermenter (Open)',
        name: 'Escherichia coli',
        colors: { slant: '#eab308', butt: '#eab308', base: '#ca8a04' },
        note: 'Open tube turns completely yellow due to acid production from glucose fermentation and oxidation.'
      },
      {
        id: 'A2',
        label: 'Fermenter (Oil Overlaid)',
        name: 'Escherichia coli',
        colors: { slant: '#eab308', butt: '#eab308', base: '#ca8a04' },
        note: 'Oil-overlaid anaerobic tube turns completely yellow, demonstrating fermentative metabolism in the absence of oxygen.'
      },
      {
        id: 'B1',
        label: 'Oxidizer (Open)',
        name: 'Pseudomonas aeruginosa',
        colors: { slant: '#eab308', butt: '#dc2626', base: '#991b1b' },
        note: 'Open tube shows acid production (yellow color) restricted to the oxygen-exposed top surface layer only.'
      },
      {
        id: 'B2',
        label: 'Oxidizer (Oil Overlaid)',
        name: 'Pseudomonas aeruginosa',
        colors: { slant: '#dc2626', butt: '#dc2626', base: '#991b1b' },
        note: 'Overlaid tube remains completely red. The organism cannot ferment carbohydrate anaerobically.'
      },
      {
        id: 'C1',
        label: 'Non-utilizer (Open)',
        name: 'Moraxella sp.',
        colors: { slant: '#dc2626', butt: '#dc2626', base: '#991b1b' },
        note: 'Open tube remains completely red; no acid is produced aerobically.'
      },
      {
        id: 'C2',
        label: 'Non-utilizer (Oil Overlaid)',
        name: 'Moraxella sp.',
        colors: { slant: '#dc2626', butt: '#dc2626', base: '#991b1b' },
        note: 'Oil-overlaid tube remains completely red; no acid is produced anaerobically.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Yellow color (Acid)', 'Carbohydrate is metabolized to acid byproducts, lowering pH', 'Positive reaction (A)'],
      ['Red or Alkaline color', 'No carbohydrate metabolism; peptone utilization may turn medium deep red', 'Negative or Neutral (K)'],
      ['Mineral Oil Overlay', 'Creates an anaerobic environment inside the overlaid tube', 'Differentiates fermentation from oxidation'],
      ['Yellow top, red bottom', 'Acid produced exclusively at the aerobic surface through oxidative pathways', 'Oxidation pattern']
    ],
    trapTitle: 'Timing and Screwcaps',
    trapBody: 'If screwcap tubes are used, you must loosen the caps of the open tubes during incubation. Tight caps restrict air exchange and can prevent the alkaline reaction in control tubes or inhibit oxidation, leading to false or weakly positive interpretations.',
    trapBullets: [
      'Always loosen the screwcap of the open tube to permit adequate oxygen exposure.',
      'Slow-growing organisms may require up to 7 days of incubation before acid accumulates.',
      'A control tube of OF base without carbohydrate is inoculated alongside to confirm no alkaline base shift is misread.'
    ],
    interpretationTitle: 'OF Dextrose Interpretive Matrix',
    interpretationRows: [
      ['Open: Yellow / Overlaid: Yellow', 'Fermentation (F)', 'Organism can ferment glucose anaerobically (e.g., E. coli).'],
      ['Open: Yellow (top) / Overlaid: Red', 'Oxidation (O)', 'Organism uses glucose oxidatively only (e.g., P. aeruginosa).'],
      ['Open: Red / Overlaid: Red', 'Non-utilizer (Asaccharolytic)', 'Organism does not metabolize glucose (e.g., Moraxella).']
    ],
    takeaways: [
      'OF medium uses Hugh and Leifson\'s formulation: high carbohydrate-to-peptone ratio to prevent alkaline peptone amines from masking weak acid.',
      'Fermenters turn both tubes completely yellow (e.g., Escherichia coli).',
      'Oxidizers turn only the open tube yellow at the top, leaving the overlaid tube red (e.g., Pseudomonas aeruginosa).'
    ],
    remember: 'F is for Fermentation = both yellow. O is for Oxidation = open top yellow only. Non-utilizer = both red.',
    biochemicalTestId: 'of-glucose',
    relatedLearnSlug: 'nonfermenting-gram-negative-rods'
  },
  {
    slug: 'phenylalanine-deaminase',
    title: 'Phenylalanine Deaminase Agar',
    eyebrow: 'Visual Atlas',
    summary: 'A bench guide to Phenylalanine Deaminase Agar, used to differentiate Proteus, Morganella, and Providencia (positive) from other Enterobacteriaceae (negative) by adding ferric chloride.',
    boardTitle: 'Phenylalanine slants A-B',
    boardNote: '4 to 5 drops of 10% ferric chloride are added to incubated slants. A green color shift indicates phenylalanine deaminase activity.',
    ariaLabel: 'Two phenylalanine deaminase agar slants showing positive (dark green) and negative (amber-yellow) reactions',
    visualType: 'phenylalanine-deaminase',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Proteus mirabilis',
        colors: { slant: '#042f1a', butt: '#eab308', base: '#ca8a04' },
        note: 'Slant turns a deep forest green color immediately after adding 10% ferric chloride. Phenylpyruvic acid formed a colored complex with ferric iron.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Escherichia coli',
        colors: { slant: '#f59e0b', butt: '#eab308', base: '#ca8a04' },
        note: 'Slant remains original amber/yellow color after adding 10% ferric chloride. Ferric chloride creates a temporary yellow puddle but no green complex.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Forest green slant', 'Phenylpyruvic acid (from phenylalanine deamination) binds with ferric chloride', 'Positive result'],
      ['Amber/Yellow slant', 'Phenylalanine remains intact; no phenylpyruvic acid produced', 'Negative result'],
      ['Reagent addition', 'Requires adding 10% ferric chloride (FeCl3) post-incubation; color fades within 10-15 minutes', 'Read immediately']
    ],
    trapTitle: 'Read Phenylalanine Immediately',
    trapBody: 'The green reaction product is highly unstable and will fade quickly. You must examine the slants and record results within 1-5 minutes after applying the ferric chloride drops to prevent reading a false negative.',
    trapBullets: [
      'The green colored complex (between phenylpyruvic acid and Fe3+) fades rapidly.',
      'Always roll the ferric chloride drops directly over the bacterial growth on the slant surface.',
      'Differentiates Proteus, Morganella, and Providencia (all positive) from other Enterobacteriaceae (negative).'
    ],
    interpretationTitle: 'Deaminase Interpretive Matrix',
    interpretationRows: [
      ['Deep green color on slant', 'Positive', 'Organism produces phenylalanine deaminase (e.g., Proteus mirabilis).'],
      ['No color change (amber/yellow)', 'Negative', 'Organism lacks phenylalanine deaminase (e.g., Escherichia coli).']
    ],
    takeaways: [
      'Phenylalanine deaminase removes the amine group (NH2) from phenylalanine, yielding phenylpyruvic acid and ammonia.',
      'Ferric chloride reacts directly with phenylpyruvic acid to form a green coordination compound.',
      'This test is a classic tool for identifying the Proteus-Morganella-Providencia tribe within Enterobacteriaceae.'
    ],
    remember: 'P is for Proteus (and Providencia/Phenylalanine). Green = Positive. Yellow = Negative (like E. coli).',
    biochemicalTestId: 'phenylalanine-deaminase',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'pyr-test',
    title: 'L-Pyrrolidonyl Arylamidase (PYR) Test',
    eyebrow: 'Visual Atlas',
    summary: 'A bench guide to the PYR test, used for the presumptive identification of Group A streptococci (S. pyogenes) and Enterococci by detecting PYRase activity.',
    boardTitle: 'PYR reaction cards A-B',
    boardNote: 'Organisms are rubbed onto a dry PYR disk, incubated for 2 minutes, and then treated with detector reagent. A red color is positive.',
    ariaLabel: 'Two PYR reaction cards showing a red positive reaction and a colorless negative reaction',
    visualType: 'pyr-test',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Streptococcus pyogenes',
        colors: { slant: '#f8fafc', butt: '#be123c', base: '#9f1239' },
        note: 'Development of a bright cherry-red color within 1 minute after adding the detector reagent. PYR was hydrolyzed to β-naphthylamine.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Streptococcus agalactiae',
        colors: { slant: '#f8fafc', butt: '#ffffff', base: '#cbd5e1' },
        note: 'No color change or a faint yellow/orange hue on the disk after adding the detector reagent. The organism is PYR-negative.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Bright red/pink color', 'β-naphthylamine reacted with the N,N-dimethylaminocinnamaldehyde reagent', 'Positive for PYRase'],
      ['No color change / orange color', 'Substrate remained unhydrolyzed; orange color is simply the reagent\'s natural color', 'Negative reaction'],
      ['2-minute incubation', 'The slide must incubate dry for 2 minutes before the drop of developer reagent is added', 'Method constraint']
    ],
    trapTitle: 'Watch out for false negatives due to poor inoculation',
    trapBody: 'The PYR test requires a heavy inoculum. Rubbing too few colonies onto the disk can result in a false-negative or equivocal reaction. Ensure a visible, thick paste of bacterial growth is transferred from a fresh (18-24 hour) culture.',
    trapBullets: [
      'Always use a heavy inoculum of colonies.',
      'Moisten the disk slightly, but do not flood it; excess water dilutes the reacted product and weakens the red color.',
      'Do not read after 5 minutes; weak auto-coloration can eventually occur.'
    ],
    interpretationTitle: 'PYR Interpretive Matrix',
    interpretationRows: [
      ['Bright red color within 1 min', 'Positive', 'Organism produces L-pyrrolidonyl arylamidase. Presumptive S. pyogenes or Enterococcus.'],
      ['Colorless, cream, or orange', 'Negative', 'Organism lacks L-pyrrolidonyl arylamidase. Presumptive Streptococcus agalactiae (Group B).']
    ],
    takeaways: [
      'The PYR test detects L-pyrrolidonyl arylamidase, which cleaves the L-pyrrolidonyl-β-naphthylamide substrate.',
      'A positive result is a vibrant cherry red/pink spot forming on the white disk.',
      'This is one of the most reliable tests for presumptive identification of Group A Strep and Enterococci.'
    ],
    remember: 'PYR positive = Streptococcus pyogenes (Group A) and Enterococcus. PYR negative = Streptococcus agalactiae (Group B). Red = Positive.',
    biochemicalTestId: 'pyr',
    relatedLearnSlug: 'gram-positive-cocci'
  },
  {
    slug: 'pyruvate-broth',
    title: 'Pyruvate Broth Utilization',
    eyebrow: 'Visual Atlas',
    summary: 'A bench guide to Pyruvate Broth, used to differentiate Enterococcus faecalis (positive) from Enterococcus faecium (negative) based on their ability to utilize pyruvate.',
    boardTitle: 'Pyruvate tubes A-B',
    boardNote: 'Differentiate pyruvate utilization (yellow) from a negative reaction (green) in a carbohydrate-free, nutrient-limited medium.',
    ariaLabel: 'Two tubes of pyruvate broth showing positive (yellow) and negative (green) reactions',
    visualType: 'pyruvate-broth',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Enterococcus faecalis',
        colors: { slant: '#fef08a', butt: '#eab308', base: '#ca8a04' },
        note: 'The bromthymol blue indicator changes from green to yellow, demonstrating the production of metabolic acids from pyruvate utilization.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Enterococcus faecium',
        colors: { slant: '#0d9488', butt: '#0f766e', base: '#115e59' },
        note: 'Broth remains deep green/blue-green, indicating the organism cannot utilize pyruvate (yellow-green is regarded as negative).'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Yellow color', 'Acid accumulation from the utilization of pyruvic acid, lowering pH', 'Positive reaction'],
      ['Deep green/blue-green', 'No pyruvate utilization; pH remains neutral/basic', 'Negative reaction'],
      ['Yellow-green color', 'Weak, clinically insignificant shift; must be interpreted as negative', 'Regarded as negative']
    ],
    trapTitle: 'Read Yellow-Green as Negative',
    trapBody: 'Bromthymol blue is extremely sensitive. Some organisms can slightly metabolize traces of organic nitrogen, causing a weak, yellow-green color shift. Do not misinterpret this as a positive reaction. Only a distinct, clear yellow color indicates a positive result.',
    trapBullets: [
      'Yellow-green is a negative result.',
      'This test is a critical differentiator for Enterococcus species: E. faecalis (+) vs. E. faecium (-).',
      'The medium is completely carbohydrate-free; acid is solely produced from pyruvate.'
    ],
    interpretationTitle: 'Pyruvate Interpretive Matrix',
    interpretationRows: [
      ['Bright yellow broth', 'Positive', 'Organism utilizes pyruvate (e.g., Enterococcus faecalis).'],
      ['Green, blue-green, or yellow-green', 'Negative', 'Organism does not utilize pyruvate (e.g., Enterococcus faecium).']
    ],
    takeaways: [
      'Pyruvate broth tests the ability to utilize pyruvate as an energy source in a carbohydrate-free, nutrient-limited medium.',
      'Bromthymol blue is the pH indicator: yellow is acid (positive), green is neutral/alkaline (negative).',
      'It is highly specific for separating Enterococcus species in clinical diagnostic paths.'
    ],
    remember: 'Pyruvate = Yellow (Positive) for Enterococcus faecalis. Green = Negative for Enterococcus faecium.',
    biochemicalTestId: 'pyruvate-utilization',
    relatedLearnSlug: 'gram-positive-cocci'
  },
  {
    slug: 'salt-tolerance',
    title: 'Salt Tolerance Test (6.5% NaCl)',
    eyebrow: 'Visual Atlas',
    summary: 'A bench guide to the 6.5% NaCl salt tolerance test, used to differentiate salt-tolerant Enterococci (positive) from salt-sensitive nonenterococci (negative).',
    boardTitle: 'Salt tolerance tubes A-B',
    boardNote: 'Organisms are inoculated into brain-heart infusion broth with 6.5% NaCl. Growth (turbidity) and acid (yellow) are positive.',
    ariaLabel: 'Two salt tolerance tubes showing positive (yellow and turbid) and negative (purple and clear) reactions',
    visualType: 'salt-tolerance',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Enterococcus faecalis',
        colors: { slant: '#fde68a', butt: '#eab308', base: '#ca8a04' },
        note: 'Heavy visible growth (turbidity) accompanied by a color shift from purple to yellow, indicating active glucose fermentation in 6.5% NaCl.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Streptococcus bovis',
        colors: { slant: '#d946ef', butt: '#701a75', base: '#4a044e' },
        note: 'No growth (completely clear broth) and no color change (stays deep purple/magenta). The high salt concentration completely inhibited growth.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Visible Turbidity / Cloudiness', 'Growth of the bacteria in high salt concentration', 'Primary indicator of positivity'],
      ['Yellow color shift', 'Acid produced from glucose fermentation in the BHI base', 'Confirms active metabolic growth'],
      ['Clear Purple broth', 'No bacterial growth; high salt fully inhibited the organism', 'Negative reaction']
    ],
    trapTitle: 'Turbidity is the Primary Metric',
    trapBody: 'A positive salt tolerance test is defined by growth (turbidity), with or without a color change to yellow. While most salt-tolerant organisms ferment glucose and turn the medium yellow, a turbid purple tube is still positive. A negative tube must be completely clear (no turbidity) and unchanged in color.',
    trapBullets: [
      'Always hold the tube up to a light source to check for subtle turbidity.',
      'A light inoculum is recommended to avoid confusing inoculation density with true growth.',
      'This test differentiates Enterococcus (+) from Group D Streptococci like S. bovis (-).'
    ],
    interpretationTitle: 'Salt Tolerance Interpretive Matrix',
    interpretationRows: [
      ['Turbid broth (with or without yellow)', 'Positive', 'Salt tolerant. Differentiates Enterococci (positive) from Group D Streptococci.'],
      ['Clear broth (no turbidity, stays purple)', 'Negative', 'Salt sensitive. Typical for Streptococcus bovis, Streptococcus pneumoniae.']
    ],
    takeaways: [
      'The 6.5% NaCl broth is both selective (inhibiting most Gram-positive cocci) and differential (detecting glucose fermenters).',
      'Bromcresol purple is the pH indicator: purple is neutral (negative), yellow is acid (positive).',
      'Enterococci are highly resistant to high salt concentrations, making this a cornerstone test.'
    ],
    remember: 'Salt tolerance is about growth. Clear purple = Negative. Turbid (usually yellow) = Positive (Enterococci).',
    biochemicalTestId: 'salt-tolerance',
    relatedLearnSlug: 'gram-positive-cocci'
  },
  {
    slug: 'spot-indole',
    title: 'Spot Indole Test',
    eyebrow: 'Visual Atlas',
    summary: 'A bench guide to the rapid Spot Indole test, detecting tryptophanase activity within 20 seconds to quickly differentiate Escherichia coli from Klebsiella.',
    boardTitle: 'Spot Indole reaction cards A-B',
    boardNote: 'Organisms are rubbed onto filter paper saturated with spot indole reagent (paradimethylaminocinnamaldehyde). A blue color shift is positive.',
    ariaLabel: 'Two spot indole reaction cards showing a blue positive reaction and a colorless negative reaction',
    visualType: 'spot-indole',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Escherichia coli',
        colors: { slant: '#f8fafc', butt: '#0ea5e9', base: '#0369a1' },
        note: 'Development of a distinct blue/blue-green color within 20 seconds. Tryptophanase hydrolyzed tryptophan to indole, which coupled with cinnamaldehyde.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Klebsiella pneumoniae',
        colors: { slant: '#f8fafc', butt: '#ffffff', base: '#cbd5e1' },
        note: 'No color change or a faint pink color on the filter paper. The organism does not produce tryptophanase.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Blue/blue-green color', 'Indole coupled with paradimethylaminocinnamaldehyde to form a blue compound', 'Positive reaction (within 20s)'],
      ['No color / faint pink', 'No indole detected; slightly pink is the natural color of the reagent', 'Negative reaction'],
      ['Rapid timing', 'Must be read within 20-30 seconds of inoculation', 'Immediate reaction']
    ],
    trapTitle: 'Avoid MacConkey Agar Colonies',
    trapBody: 'Do not perform the spot indole test on colonies growing on MacConkey agar. The color of lactose-fermenting (pink) colonies can interfere with reading the reaction, and pH conditions can suppress indole production. Always use colonies from non-selective media like sheep blood agar.',
    trapBullets: [
      'Colonies must be taken from non-selective, tryptophan-rich media (e.g., blood agar).',
      'The reagent is 1% paradimethylaminocinnamaldehyde.',
      'Differentiates E. coli (+) from K. pneumoniae (-).'
    ],
    interpretationTitle: 'Spot Indole Interpretive Matrix',
    interpretationRows: [
      ['Blue or blue-green spot (≤20s)', 'Positive', 'Organism produces tryptophanase. Presumptive Escherichia coli.'],
      ['Colorless or faint pink', 'Negative', 'Organism lacks tryptophanase. Presumptive Klebsiella pneumoniae.']
    ],
    takeaways: [
      'The spot indole test is a rapid, 20-second alternative to the traditional Kovac\'s tube test.',
      'It utilizes paradimethylaminocinnamaldehyde, which is more sensitive than the p-dimethylaminobenzaldehyde in Kovac\'s reagent.',
      'It is a major diagnostic shortcut for confirming E. coli from urinary tract infections.'
    ],
    remember: 'Blue = Positive (E. coli). Colorless/Pink = Negative (Klebsiella).',
    biochemicalTestId: 'spot-indole',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'tsi-test',
    title: 'Triple Sugar Iron Agar (TSI)',
    eyebrow: 'Visual Atlas',
    summary: 'A visual guide to Triple Sugar Iron Agar (TSI), used to determine glucose/lactose/sucrose fermentation, gas production, and hydrogen sulfide (H2S) synthesis in Gram-negative rods.',
    boardTitle: 'TSI slants A-D',
    boardNote: 'Read both the slant (aerobic) and butt (anaerobic) color reactions, gas cracks, and black H2S precipitate.',
    ariaLabel: 'Four TSI tubes showing A/A with gas, K/A with gas and H2S, K/K non-fermenter, and uninoculated control',
    visualType: 'tsi-test',
    tubes: [
      {
        id: 'A',
        label: 'Acid/Acid, Gas, No H2S (A/A)',
        name: 'Escherichia coli',
        colors: { slant: '#fbbf24', butt: '#eab308', base: '#ca8a04' },
        note: 'Yellow slant/yellow butt. Fermentation of glucose plus lactose and/or sucrose. Bubbles/cracks push the agar up (gas positive).'
      },
      {
        id: 'B',
        label: 'Alkaline/Acid, Gas, H2S+ (K/A H2S+)',
        name: 'Salmonella typhimurium',
        colors: { slant: '#dc2626', butt: '#1e293b', base: '#0f172a' },
        note: 'Red slant/black butt. Glucose fermentation only (slant reverts to alkaline red), H2S produced (black FeS butt), and gas bubbles present.'
      },
      {
        id: 'C',
        label: 'Alkaline/Alkaline, No Gas, No H2S (K/K)',
        name: 'Pseudomonas aeruginosa',
        colors: { slant: '#dc2626', butt: '#dc2626', base: '#991b1b' },
        note: 'Red slant/red butt. Non-utilizer of glucose, lactose, and sucrose. No gas and no black precipitate.'
      },
      {
        id: 'D',
        label: 'Uninoculated Control',
        name: 'Baseline comparison',
        colors: { slant: '#dc2626', butt: '#dc2626', base: '#991b1b' },
        note: 'Uninoculated reddish-orange agar slant for comparing color changes, gas production, and baseline tube integrity.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Yellow Slant / Yellow Butt', 'Acid produced from glucose and lactose/sucrose fermentation', 'A/A (Fermenter)'],
      ['Red Slant / Yellow Butt', 'Glucose fermented only; peptones oxidized aerobically on slant back to alkaline red', 'K/A (Glucose-only fermenter)'],
      ['Red Slant / Red Butt', 'No sugars fermented; peptones utilized aerobically and anaerobically', 'K/K (Non-utilizer)'],
      ['Black Butt', 'H2S gas produced, reacting with iron indicator to form black ferrous sulfide precipitate', 'H2S Positive (usually covers K/A butt)'],
      ['Bubbles / Cracks / Agar push-up', 'Gaseous end-products (CO2 or H2) produced during fermentation', 'Gas Positive']
    ],
    trapTitle: 'Read TSI at 18 to 24 Hours Only',
    trapBody: 'TSI tubes must be read strictly between 18 and 24 hours of incubation. Reading too early (<12 hours) can show false A/A as glucose fermentation hasn\'t reverted yet. Reading too late (>24 hours) can show false K/A because lactose/sucrose are depleted and the slant reverts back to red, masking full fermenters.',
    trapBullets: [
      'Read strictly at 18-24 hours; do not read late.',
      'A black butt indicates an acidic butt underneath; H2S requires acid conditions to form, confirming glucose fermentation.',
      'TSI contains 10 times more lactose/sucrose than glucose.'
    ],
    interpretationTitle: 'TSI Interpretive Matrix',
    interpretationRows: [
      ['Yellow/Yellow (A/A) + Gas', 'Glucose, lactose/sucrose fermented', 'Typical for Escherichia coli, Klebsiella pneumoniae.'],
      ['Red/Black (K/A H2S+) + Gas', 'Glucose fermented, lactose/sucrose negative, H2S and Gas', 'Typical for Salmonella typhimurium, Proteus vulgaris.'],
      ['Red/Red (K/K)', 'No sugars fermented; non-utilizer', 'Typical for Pseudomonas aeruginosa, Acinetobacter.'],
      ['Red/Yellow (K/A)', 'Glucose fermented only', 'Typical for Shigella flexneri.']
    ],
    takeaways: [
      'TSI agar differentiates enteric bacteria based on glucose, lactose, sucrose fermentation, and thiosulfate reduction.',
      'It contains glucose (0.1%), lactose (1%), sucrose (1%), ferrous ammonium sulfate (H2S indicator), and phenol red (pH indicator).',
      'The slant is aerobic, while the deep butt is anaerobic.'
    ],
    remember: 'A = Acid (Yellow). K = Alkaline (Red). A/A = all sugars fermented. K/A = glucose only. Black = H2S. Cracks = Gas.',
    biochemicalTestId: 'tsi',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'urease-test',
    title: 'Urease Test (Christensen\'s Method)',
    eyebrow: 'Visual Atlas',
    summary: 'A bench guide to Christensen\'s urea agar slant test, used to detect urease activity to rapidly identify Proteus species and differentiate other Enterobacteriaceae.',
    boardTitle: 'Urea slants A-B',
    boardNote: 'Compare the slant and butt color reactions. Hydrolysis of urea creates basic ammonia, turning the phenol red indicator pink/magenta.',
    ariaLabel: 'Two urea agar slants showing positive (bright magenta-pink) and negative (light orange) reactions',
    visualType: 'urease-test',
    tubes: [
      {
        id: 'A',
        label: 'Positive',
        name: 'Proteus vulgaris',
        colors: { slant: '#ec4899', butt: '#d946ef', base: '#c026d3' },
        note: 'The entire slant and butt turn a vibrant magenta-pink color, demonstrating rapid urea hydrolysis and alkaline pH shift.'
      },
      {
        id: 'B',
        label: 'Negative',
        name: 'Escherichia coli',
        colors: { slant: '#fdba74', butt: '#fb923c', base: '#f97316' },
        note: 'Agar slant and butt remain their original light peach/orange color, indicating no urea hydrolysis occurred.'
      }
    ],
    readoutTitle: 'What to look for',
    readoutRows: [
      ['Magenta / Pink color', 'Ammonia accumulation alkalizes the medium, shifting phenol red pH', 'Positive result'],
      ['Light orange / peach color', 'No urea hydrolysis; pH remains neutral/acidic', 'Negative result'],
      ['Rapid reaction', 'Rapidly urease-positive organisms (like Proteus) turn the medium pink within 24 hours', 'Key diagnostic clue']
    ],
    trapTitle: 'Beware of Prolonged Incubation',
    trapBody: 'Alkaline reactions can sometimes appear after prolonged incubation (beyond 48 hours) due to peptone utilization raising the pH of the medium, rather than true urease activity. For slow-growing or borderline organisms, always perform a control test using the base medium without urea.',
    trapBullets: [
      'Record results for rapid Proteus identification within 24 hours.',
      'Weakly positive organisms (like Klebsiella pneumoniae) may take several days to develop a pink color.',
      'A yellow shift at the bottom is an acidic reaction and is interpreted as negative.'
    ],
    interpretationTitle: 'Urease Interpretive Matrix',
    interpretationRows: [
      ['Vibrant magenta-pink throughout', 'Positive (Rapid)', 'Organism produces active urease (e.g., Proteus vulgaris).'],
      ['Pink slant only or delayed pink', 'Weakly Positive', 'Slow urease production (e.g., Klebsiella pneumoniae).'],
      ['No change (remains light orange)', 'Negative', 'No urease produced (e.g., Escherichia coli).']
    ],
    takeaways: [
      'The urease test detects the enzyme urease, which breaks down urea into ammonia (NH3) and carbon dioxide (CO2).',
      'Phenol red is the pH indicator: magenta/pink at pH 8.1 (positive), orange at pH 6.8 (negative).',
      'It is highly specific for separating Proteus (rapidly positive) from other lactose non-fermenting Gram-negative rods.'
    ],
    remember: 'Pink = Positive (rapid Proteus). Orange = Negative (E. coli). Ammonia makes it basic (pink).',
    biochemicalTestId: 'urease',
    relatedLearnSlug: 'enterobacterales'
  },
  {
    slug: 'xv-factor-test',
    title: 'X and V Factor Test',
    eyebrow: 'Visual Atlas',
    summary: 'A diagnostic guide for determining X (hemin) and V (NAD) factor requirements to differentiate and identify Haemophilus species.',
    boardTitle: 'XV Plates A-D',
    boardNote: 'Observe the growth around the paper disks impregnated with X, V, and XV factors. Growth only occurs where required accessory growth factors have diffused.',
    ariaLabel: 'Four tryptic soy agar plates streaked with bacterial suspensions and showing growth around X, V, or XV disks depending on their factor requirements.',
    visualType: 'xv-factor-test',
    tubes: [
      {
        id: 'A',
        label: 'XV Required (Positive)',
        name: 'Haemophilus influenzae',
        colors: { slant: '#cf9d26', butt: '#eae3cb', base: '#ffffff' },
        note: 'Requires both X and V factors; growth is restricted to a clear halo around the XV disk only.'
      },
      {
        id: 'B',
        label: 'V Required (Positive)',
        name: 'Haemophilus parainfluenzae',
        colors: { slant: '#cf9d26', butt: '#eae3cb', base: '#ffffff' },
        note: 'Requires V factor only; growth occurs around the V disk and the XV disk.'
      },
      {
        id: 'C',
        label: 'X Required (Positive)',
        name: 'Haemophilus ducreyi',
        colors: { slant: '#cf9d26', butt: '#eae3cb', base: '#ffffff' },
        note: 'Requires X factor only; growth occurs around the X disk and the XV disk.'
      },
      {
        id: 'D',
        label: 'No Factor Required (Negative)',
        name: 'Aggregatibacter aphrophilus',
        colors: { slant: '#cf9d26', butt: '#eae3cb', base: '#ffffff' },
        note: 'No requirement for X or V factors; confluent growth occurs over the entire surface of the agar.'
      }
    ],
    readoutTitle: 'Growth Patterns & Access Key',
    readoutRows: [
      ['Halo around XV only', 'Requires both hemin (X) and NAD (V)', 'Haemophilus influenzae'],
      ['Halo around V and XV', 'Requires nicotinamide adenine dinucleotide (V) only', 'Haemophilus parainfluenzae'],
      ['Halo around X and XV', 'Requires hemin (X) only', 'Haemophilus ducreyi'],
      ['Confluent lawn over plate', 'No requirement for external X or V growth factors', 'Aggregatibacter aphrophilus']
    ],
    trapTitle: 'Factor Carryover & Inoculum Guidelines',
    trapBody: 'Carryover of X factor from the primary growth medium can cause false-negative results (growth around V disks when X is actually required). Always follow strict suspension protocols to ensure diagnostic accuracy.',
    trapBullets: [
      'Use a sterile inoculating loop, NEVER a cotton swab, to harvest colonies to avoid carrying over agar from the primary plate.',
      'Prepare a light suspension (0.5 McFarland standard) in sterile saline or water, not broth, before seeding the test plate.',
      'Ensure the inoculum is spread evenly to form a confluent lawn, allowing distinct zone boundaries to appear.'
    ],
    interpretationTitle: 'Haemophilus Diagnostic Matrix',
    interpretationRows: [
      ['H. influenzae', 'Growth around XV only', 'Pathogen; causes meningitis, otitis media, epiglottitis, and pneumonia.'],
      ['H. parainfluenzae', 'Growth around V and XV', 'Common respiratory tract flora; occasionally opportunistic.'],
      ['H. ducreyi', 'Growth around X and XV', 'Sexually transmitted pathogen; causes chancroid (soft chancre).'],
      ['A. aphrophilus', 'Growth over entire plate', 'Oral flora; can cause endocarditis; formerly H. aphrophilus.']
    ],
    takeaways: [
      'The X factor is hemin (heat-stable iron compound), and the V factor is coenzyme I / nicotinamide adenine dinucleotide (NAD, heat-labile).',
      'Trypticase Soy Agar (TSA) or heart infusion agar serves as the nutrient base because it lacks both factors, unlike Chocolate Agar which has both.',
      'XV disks contain both hemin and NAD; therefore, any factor-requiring species will grow around the XV disk.'
    ],
    remember: 'XV disk supports all Haemophilus. V disk supports parainfluenzae. X disk supports ducreyi. Negative means growth everywhere.',
    biochemicalTestId: 'xv-factor',
    relatedLearnSlug: 'nonfermenting-gram-negative-rods'
  },
  {
    slug: 'mucorales-rhizopus',
    title: 'Mucorales / Rhizopus: Broad Hyphae and Sporangia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Mucorales patterns: broad ribbon-like hyphae, sparse septation, right-angle branching, sporangia, and rhizoids.',
    boardTitle: 'Mucorales bench pattern: broad hyphae, sporangium, rhizoids',
    boardNote: 'Start with hyphae width and septation. Mucorales are broad, ribbon-like, pauci-septate molds. Rhizopus adds rhizoids near sporangiophores; culture work should follow mold safety SOPs.',
    ariaLabel: 'Illustrated Mucorales mold showing broad ribbon-like hyphae, a round sporangium, sporangiophore, and rhizoids',
    visualType: 'mycology-mucorales',
    tubes: [
      {
        id: 'A',
        label: 'Culture mount',
        name: 'Sporangium on sporangiophore with rhizoids',
        colors: { slant: '#dceef1', butt: '#4f5f4f', base: '#1f3f3b' },
        note: 'Look for a round sporangium at the tip of a sporangiophore. Rhizopus classically has rhizoids at the base of the sporangiophore.'
      },
      {
        id: 'B',
        label: 'Direct exam',
        name: 'Broad ribbon-like hyphae, sparse septa',
        colors: { slant: '#eef6f5', butt: '#7aa7b0', base: '#245c69' },
        note: 'KOH or tissue may show broad, folded, pauci-septate hyphae with irregular right-angle branching. Do not overcall from one broken fragment.'
      }
    ],
    readoutTitle: 'What to look for first',
    readoutRows: [
      ['Broad ribbon-like hyphae', 'Mucorales pattern', 'Width and folded ribbon shape are the first clue'],
      ['Sparse or absent septa', 'Pauci-septate hyphae', 'Broken hyphae can mimic septa; scan several fields'],
      ['Round sporangium', 'Sporangiospores contained in a sac', 'Supports Mucorales rather than Aspergillus-style conidial chains'],
      ['Rhizoids at sporangiophore base', 'Rhizopus-type clue', 'Helpful but not always seen in every mount']
    ],
    trapTitle: 'Do not confuse crushed hyaline molds with Mucorales',
    trapBody: 'A damaged Aspergillus or other hyaline mold can look broad in one area. Use the whole pattern: hyphal width, septation, branching, and reproductive structure.',
    trapBullets: [
      'Report and handle clinically significant molds according to lab SOP and biosafety policy.',
      'Direct exam from tissue matters more than colony appearance alone when invasive disease is suspected.',
      'Mucorales workups often require rapid escalation rather than prolonged bench speculation.'
    ],
    interpretationTitle: 'Mucorales interpretation guide',
    interpretationRows: [
      ['Broad pauci-septate hyphae in tissue', 'Mucorales-like mold', 'Escalate per SOP; correlate with culture and pathology'],
      ['Sporangium plus rhizoids', 'Rhizopus-type pattern', 'Supports presumptive group-level ID in culture mount'],
      ['Septate acute-angle hyphae only', 'Consider Aspergillus or other hyaline mold', 'Look for conidial head or other reproductive clues']
    ],
    takeaways: [
      'Mucorales is a pattern-recognition diagnosis at the bench: broad, ribbon-like, sparse septa.',
      'Rhizopus adds rhizoids and sporangia, but direct tissue morphology may be incomplete.',
      'Safety and rapid escalation matter more than forcing a species-level call from a weak mount.'
    ],
    remember: 'Mucorales = broad ribbon hyphae plus sporangia. Rhizopus = rhizoids near the sporangiophore.',
    divr: {
      detect: 'KOH, tissue stain, or culture mount from mold workup',
      identify: ['Broad pauci-septate hyphae', 'Sporangium on sporangiophore', 'Rhizoids support Rhizopus-type morphology'],
      verify: 'Correlate with culture morphology and lab mold identification workflow',
      report: 'Escalate clinically significant mold findings per SOP and biosafety policy'
    }
  },
  {
    slug: 'aspergillus-fumigatus',
    title: 'Aspergillus fumigatus: Septate Hyphae and Conidial Head',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Aspergillus fumigatus patterns: septate hyphae, acute-angle branching, flask-shaped phialides, and compact columnar conidia.',
    boardTitle: 'Aspergillus fumigatus: acute-angle hyphae and compact conidial head',
    boardNote: 'Separate direct exam from culture morphology. Tissue suggests Aspergillus when hyphae are septate with acute-angle branching; culture mounts add the conidial head pattern.',
    ariaLabel: 'Illustrated Aspergillus fumigatus with septate acute-angle branching hyphae and a compact conidial head',
    visualType: 'mycology-aspergillus-fumigatus',
    tubes: [
      {
        id: 'A',
        label: 'Direct exam',
        name: 'Septate hyphae, acute-angle branching',
        colors: { slant: '#edf5f1', butt: '#5e8f8a', base: '#245c69' },
        note: 'Thin septate hyphae branching at narrow angles support Aspergillus-like hyaline mold morphology. Tissue morphology alone is not species-level ID.'
      },
      {
        id: 'B',
        label: 'Culture mount',
        name: 'Compact conidial head, phialides on vesicle',
        colors: { slant: '#d9ece8', butt: '#5c8a72', base: '#24443a' },
        note: 'A. fumigatus classically shows a flask-shaped vesicle with phialides over the upper portion and compact columnar conidia.'
      }
    ],
    readoutTitle: 'Aspergillus bench anchors',
    readoutRows: [
      ['Septate hyphae', 'Hyaline mold pattern', 'Narrow hyphae with regular septa'],
      ['Acute-angle branching', 'Aspergillus-like direct exam', 'Usually about 45 degrees, but tissue distortion can alter angles'],
      ['Conidial head', 'Culture morphology anchor', 'Vesicle, phialides, and conidia pattern help separate species groups'],
      ['Compact columnar head', 'A. fumigatus pattern', 'Compare with radiate heads in some other Aspergillus species']
    ],
    trapTitle: 'Direct exam is not the same as species identification',
    trapBody: 'Septate acute-angle hyphae are clinically useful, but several hyaline molds can overlap. Use culture morphology, validated ID methods, and SOP language before naming a species.',
    trapBullets: [
      'Avoid calling A. fumigatus from tissue morphology alone.',
      'Culture morphology should be interpreted with colony features and microscopic mount.',
      'Consider referral or MALDI/sequence workflows when morphology is atypical.'
    ],
    interpretationTitle: 'Aspergillus interpretation guide',
    interpretationRows: [
      ['Septate acute-angle hyphae in tissue', 'Aspergillus-like hyaline mold', 'Report according to pathology/lab wording and SOP'],
      ['Compact conidial head in culture', 'A. fumigatus group pattern', 'Confirm with local identification workflow'],
      ['Broad pauci-septate hyphae', 'Consider Mucorales', 'Different safety and clinical urgency pathway']
    ],
    takeaways: [
      'Use direct exam for the hyphal pattern and culture mount for the reproductive structure.',
      'A. fumigatus is compact and columnar compared with more radiate Aspergillus heads.',
      'Bench wording should avoid overclaiming species from tissue alone.'
    ],
    remember: 'Aspergillus = septate acute-angle hyphae. Fumigatus culture = compact columnar conidial head.',
    divr: {
      detect: 'KOH, calcofluor, tissue stain, or culture tease mount',
      identify: ['Septate acute-angle hyphae', 'Conidial head with phialides on vesicle', 'Compact columnar conidia for fumigatus pattern'],
      verify: 'Culture morphology plus validated mold ID workflow',
      report: 'Use SOP-approved language, especially for tissue-only findings'
    }
  },
  {
    slug: 'histoplasma-capsulatum',
    title: 'Histoplasma capsulatum: Intracellular Yeast and Tuberculate Macroconidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Histoplasma: tiny intracellular yeasts in macrophages and tuberculate macroconidia in mold phase.',
    boardTitle: 'Histoplasma: tiny intracellular yeast vs mold-phase macroconidia',
    boardNote: 'Yeast phase is the clinical recognition anchor: tiny oval yeasts inside macrophages. Mold phase may show tuberculate macroconidia, but culture handling requires safety-aware workflow.',
    ariaLabel: 'Illustrated Histoplasma showing intracellular tiny yeasts in a macrophage and mold phase tuberculate macroconidia',
    visualType: 'mycology-histoplasma',
    tubes: [
      {
        id: 'A',
        label: 'Tissue / smear',
        name: 'Tiny intracellular yeasts in macrophages',
        colors: { slant: '#e9f0ed', butt: '#6f8fa3', base: '#2f556a' },
        note: 'Small 2-5 um oval yeasts often cluster inside macrophages. A clear halo can be artifact, not a true capsule.'
      },
      {
        id: 'B',
        label: 'Mold phase',
        name: 'Tuberculate macroconidia',
        colors: { slant: '#e2efe9', butt: '#789b6d', base: '#345c3a' },
        note: 'Mold phase can form thick-walled macroconidia with knob-like projections. Handle suspected dimorphic fungi according to safety policy.'
      }
    ],
    readoutTitle: 'Histoplasma visual anchors',
    readoutRows: [
      ['2-5 um oval yeast', 'Histoplasma yeast phase', 'Much smaller than Blastomyces and usually intracellular'],
      ['Inside macrophages', 'Strong tissue clue', 'Scan histiocytes and reticuloendothelial specimens carefully'],
      ['No broad-based bud', 'Helps separate from Blastomyces', 'Histoplasma is tiny and narrow budding when seen'],
      ['Tuberculate macroconidia', 'Mold phase clue', 'Culture work requires appropriate safety workflow']
    ],
    trapTitle: 'Do not mistake the halo for a cryptococcal capsule',
    trapBody: 'Histoplasma may show a clear rim around tiny yeasts in tissue, but the organism is much smaller and often intracellular. Cryptococcus is usually larger and truly encapsulated.',
    trapBullets: [
      'Use size, host cell location, and budding pattern together.',
      'Culture of dimorphic fungi is a safety-sensitive workflow.',
      'Antigen or molecular testing may support diagnosis depending on specimen and setting.'
    ],
    interpretationTitle: 'Histoplasma interpretation guide',
    interpretationRows: [
      ['Tiny intracellular yeasts', 'Histoplasma-compatible morphology', 'Correlate with fungal stains, antigen, culture, and clinical setting'],
      ['Large broad-based budding yeast', 'Blastomyces pattern', 'Different morphology and reporting pathway'],
      ['Tuberculate macroconidia in mold phase', 'Histoplasma mold-phase clue', 'Do not manipulate outside approved safety workflow']
    ],
    takeaways: [
      'Histoplasma yeast is small, intracellular, and easy to miss at low power.',
      'The mold-phase macroconidia are a learning anchor, not an invitation for unsafe culture handling.',
      'Size is the fastest split from Blastomyces and Cryptococcus.'
    ],
    remember: 'Histo hides inside histiocytes: tiny intracellular yeasts first, tuberculate macroconidia later.',
    divr: {
      detect: 'Tissue stain, bone marrow smear, respiratory specimen, antigen, or culture workflow',
      identify: ['Tiny intracellular yeast', 'Macrophage association', 'Tuberculate macroconidia in mold phase'],
      verify: 'Use fungal stains and validated confirmatory testing per SOP',
      report: 'Escalate suspected dimorphic fungus findings through safety-aware workflow'
    }
  },
  {
    slug: 'blastomyces-dermatitidis',
    title: 'Blastomyces dermatitidis: Broad-Based Budding Yeast',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Blastomyces: large thick-walled yeast with broad-based budding and a mold phase with lateral conidia.',
    boardTitle: 'Blastomyces: broad-based budding yeast',
    boardNote: 'The yeast form is the high-yield recognition point: large, thick-walled, and broad-based budding. Compare size and budding pattern before reaching for lookalikes.',
    ariaLabel: 'Illustrated Blastomyces dermatitidis broad-based budding yeast and mold phase lateral conidia',
    visualType: 'mycology-blastomyces',
    tubes: [
      {
        id: 'A',
        label: 'Yeast phase',
        name: 'Large thick wall, broad-based bud',
        colors: { slant: '#e6eef1', butt: '#9a8c6a', base: '#5b4a2b' },
        note: 'Usually 8-15 um with thick refractile wall. Daughter cell attaches by a broad base rather than a narrow neck.'
      },
      {
        id: 'B',
        label: 'Mold phase',
        name: 'Oval conidia on lateral branches',
        colors: { slant: '#eaf3ee', butt: '#6f9279', base: '#34523d' },
        note: 'Mycelial form can show oval conidia borne laterally on hyphae. Culture work follows dimorphic mold safety SOPs.'
      }
    ],
    readoutTitle: 'Blastomyces recognition anchors',
    readoutRows: [
      ['Large thick-walled yeast', 'Blastomyces yeast phase', 'Larger than Histoplasma and often visible as single cells'],
      ['Broad-based budding', 'Key morphology', 'The bud has a wide attachment to the mother cell'],
      ['No capsule halo', 'Not Cryptococcus pattern', 'Capsule-focused stains point a different direction'],
      ['Lateral oval conidia', 'Mold phase clue', 'Use only within approved mold identification workflow']
    ],
    trapTitle: 'Broad-based budding is a pattern, not just a big yeast',
    trapBody: 'Size alone can mislead. Look for the thick wall and the broad connection between mother and daughter yeast cells.',
    trapBullets: [
      'Compare against Histoplasma: much smaller and usually intracellular.',
      'Compare against Cryptococcus: capsule and narrow-based budding.',
      'Dimorphic mold culture work requires safety-aware handling.'
    ],
    interpretationTitle: 'Blastomyces interpretation guide',
    interpretationRows: [
      ['Thick-walled yeast with broad bud', 'Blastomyces-compatible morphology', 'Escalate per SOP and correlate with culture or confirmatory testing'],
      ['Tiny intracellular yeasts', 'Histoplasma pattern', 'Use size and intracellular location to separate'],
      ['Encapsulated narrow-budding yeast', 'Cryptococcus pattern', 'Use capsule-focused methods if clinically appropriate']
    ],
    takeaways: [
      'Blastomyces is the broad-based budding yeast card students should know cold.',
      'Large size plus thick wall plus broad bud is stronger than any one feature alone.',
      'Keep culture-phase handling within the lab safety workflow.'
    ],
    remember: 'Blasto buds broadly: big thick-walled yeast with a wide bridge to the daughter cell.',
    divr: {
      detect: 'KOH, tissue stain, respiratory specimen, or culture workflow',
      identify: ['Large thick-walled yeast', 'Broad-based budding', 'Mold phase lateral conidia'],
      verify: 'Correlate morphology with culture and approved confirmatory methods',
      report: 'Use SOP language and escalate suspected dimorphic fungus findings'
    }
  },
  {
    slug: 'coccidioides-immitis',
    title: 'Coccidioides: Spherule and Arthroconidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Coccidioides: tissue spherules packed with endospores and mold-phase barrel-shaped arthroconidia.',
    boardTitle: 'Coccidioides: spherules in tissue, arthroconidia in mold phase',
    boardNote: 'Tissue diagnosis centers on spherules with endospores. Mold-phase arthroconidia are highly infectious; suspected cultures require strict safety handling.',
    ariaLabel: 'Illustrated Coccidioides showing a large spherule with endospores and mold phase barrel-shaped arthroconidia',
    visualType: 'mycology-coccidioides',
    tubes: [
      {
        id: 'A',
        label: 'Tissue phase',
        name: 'Large spherule with endospores',
        colors: { slant: '#efe6de', butt: '#b58b7a', base: '#6f4132' },
        note: 'Large round spherules contain many endospores. Free endospores can mimic budding yeast if the spherule wall is not seen.'
      },
      {
        id: 'B',
        label: 'Mold phase',
        name: 'Barrel arthroconidia, alternating empty cells',
        colors: { slant: '#e5f0f3', butt: '#6d9db4', base: '#2f5e72' },
        note: 'Barrel-shaped arthroconidia are the culture hazard. Do not manipulate suspected Coccidioides culture outside approved containment.'
      }
    ],
    readoutTitle: 'Coccidioides visual anchors',
    readoutRows: [
      ['Spherule with endospores', 'Tissue-phase clue', 'Large round structure packed with internal endospores'],
      ['Free endospores', 'Possible rupture', 'Can be mistaken for yeast if context is ignored'],
      ['Barrel arthroconidia', 'Mold-phase clue', 'Alternating arthroconidia and empty cells in hyphae'],
      ['Culture safety concern', 'High-risk mold handling', 'Follow lab containment and referral policy']
    ],
    trapTitle: 'The mold phase is a safety signal',
    trapBody: 'Coccidioides arthroconidia are infectious. The bench decision is not only identification; it is safe handling and rapid escalation.',
    trapBullets: [
      'Do not open or manipulate suspicious cultures outside approved safety procedures.',
      'Spherules in tissue are safer teaching anchors than culture morphology.',
      'Use geography, exposure history, serology, culture, and pathology together.'
    ],
    interpretationTitle: 'Coccidioides interpretation guide',
    interpretationRows: [
      ['Spherules with endospores', 'Coccidioides-compatible tissue morphology', 'Escalate and confirm per SOP'],
      ['Barrel arthroconidia in culture', 'Coccidioides mold-phase concern', 'Apply safety workflow immediately'],
      ['Small oval intracellular yeasts', 'Histoplasma pattern', 'Not a spherule/endospore pattern']
    ],
    takeaways: [
      'Coccidioides tissue form is a spherule, not a budding yeast.',
      'Mold-phase arthroconidia are the safety-critical feature.',
      'The safest next step is escalation, containment, and SOP-guided confirmation.'
    ],
    remember: 'Cocci = spherule in tissue, barrel arthroconidia in culture, safety first.',
    divr: {
      detect: 'Tissue stain, respiratory culture, serology, or reference workflow',
      identify: ['Spherules with endospores', 'Barrel arthroconidia in mold phase', 'Alternating empty cells'],
      verify: 'Confirm with approved dimorphic fungus workflow and clinical context',
      report: 'Escalate suspected culture immediately under safety policy'
    }
  },
  {
    slug: 'dermatophyte-comparison',
    title: 'Dermatophyte Comparison: Trichophyton, Microsporum, Epidermophyton',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card comparison for dermatophyte morphology: microconidia-heavy Trichophyton, spindle macroconidia of Microsporum, and club-shaped macroconidia of Epidermophyton.',
    boardTitle: 'Dermatophyte comparison: microconidia and macroconidia shapes',
    boardNote: 'Read dermatophytes as a pattern comparison. Trichophyton often leans on microconidia, Microsporum has rough spindle macroconidia, and Epidermophyton has smooth club-shaped macroconidia without microconidia.',
    ariaLabel: 'Illustrated dermatophyte comparison showing Trichophyton microconidia, Microsporum spindle macroconidia, and Epidermophyton club-shaped macroconidia',
    visualType: 'mycology-dermatophyte-panel',
    tubes: [
      {
        id: 'A',
        label: 'Trichophyton',
        name: 'Many microconidia along hyphae',
        colors: { slant: '#edf3ef', butt: '#6f9b82', base: '#315a42' },
        note: 'Many species show microconidia along hyphae; macroconidia may be rare or absent depending on species and medium.'
      },
      {
        id: 'B',
        label: 'Microsporum',
        name: 'Rough spindle macroconidia',
        colors: { slant: '#e6f1ef', butt: '#5f95a1', base: '#2c5d67' },
        note: 'Large spindle-shaped, rough-walled macroconidia are the classic Microsporum anchor. Microconidia may be present but are not the main clue.'
      },
      {
        id: 'C',
        label: 'Epidermophyton',
        name: 'Smooth club macroconidia, no microconidia',
        colors: { slant: '#f0efe4', butt: '#a18f5d', base: '#5f4e24' },
        note: 'Smooth, club-shaped macroconidia often occur in clusters. Microconidia are absent, which helps separate it from the other two genera.'
      }
    ],
    readoutTitle: 'Dermatophyte genus anchors',
    readoutRows: [
      ['Many microconidia', 'Trichophyton pattern', 'Macroconidia may be rare, pencil-shaped, or species-dependent'],
      ['Rough spindle macroconidia', 'Microsporum pattern', 'Usually the most visually distinctive macroconidia group'],
      ['Smooth club macroconidia', 'Epidermophyton pattern', 'No microconidia is the key negative clue'],
      ['Hair, skin, nail source', 'Dermatophyte context', 'Match morphology with clinical specimen and culture features']
    ],
    trapTitle: 'Old cultures can lose the clean textbook pattern',
    trapBody: 'Dermatophyte mounts may be sparse, distorted, or nonsporulating. Use colony appearance, slide culture or tape prep quality, and SOP-supported confirmatory methods.',
    trapBullets: [
      'Do not force a genus from a single weak conidium.',
      'Some Trichophyton species sporulate poorly on routine media.',
      'Dermatophyte ID is a pattern plus specimen context, not one isolated shape.'
    ],
    interpretationTitle: 'Dermatophyte comparison guide',
    interpretationRows: [
      ['Microconidia dominate', 'Trichophyton likely', 'Review arrangement: singly along hyphae, clusters, or grape-like groups'],
      ['Spindle rough macroconidia', 'Microsporum likely', 'Use macroconidia wall texture and shape'],
      ['Club macroconidia, no microconidia', 'Epidermophyton likely', 'Absence of microconidia is part of the call']
    ],
    takeaways: [
      'Dermatophyte comparison is a shape language: microconidia, spindle macroconidia, or club macroconidia.',
      'The best student move is to compare the genus-level anchors before memorizing species exceptions.',
      'Poor sporulation is common, so weak mounts should trigger better prep or confirmatory workflow.'
    ],
    remember: 'Trichophyton = microconidia. Microsporum = spindle macroconidia. Epidermophyton = club macroconidia with no microconidia.',
    divr: {
      detect: 'Skin, hair, nail culture mount, tape prep, or slide culture',
      identify: ['Trichophyton microconidia patterns', 'Microsporum rough spindle macroconidia', 'Epidermophyton smooth club macroconidia without microconidia'],
      verify: 'Use culture features and local dermatophyte ID workflow',
      report: 'Report genus/species only when morphology and SOP criteria support it'
    }
  },
  {
    slug: 'candida-albicans-germ-tube',
    title: 'Candida albicans: Germ Tube and Pseudohyphae',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Candida albicans-style germ tubes and separating true germ tubes from pseudohyphae.',
    boardTitle: 'Candida albicans: germ tube vs pseudohyphae',
    boardNote: 'A true germ tube has parallel walls and no constriction at the yeast cell. Pseudohyphae show constriction at the attachment point and look more segmented.',
    ariaLabel: 'Illustrated Candida albicans yeast with a true germ tube and pseudohyphae comparison',
    visualType: 'mycology-candida-germ-tube',
    tubes: [
      {
        id: 'A',
        label: 'True germ tube',
        name: 'Parallel outgrowth, no constriction',
        colors: { slant: '#f1ece2', butt: '#8f7560', base: '#4c372c' },
        note: 'Serum germ tube positive pattern: smooth tube-like extension from yeast cell with no pinched base. Supports C. albicans/C. dubliniensis group.'
      },
      {
        id: 'B',
        label: 'Pseudohyphae',
        name: 'Constricted buds, chain-like growth',
        colors: { slant: '#edf3ef', butt: '#7a9b83', base: '#3a5d43' },
        note: 'Pseudohyphae have constrictions at septa and attachment points. Do not count these as true germ tubes.'
      }
    ],
    readoutTitle: 'Yeast form readout',
    readoutRows: [
      ['No constriction at origin', 'True germ tube', 'Classic germ tube-positive Candida pattern'],
      ['Constriction at attachment point', 'Pseudohyphae', 'Budding chain, not a true germ tube'],
      ['Rapid serum incubation', 'Screening method', 'Timing and inoculum matter for clean interpretation'],
      ['Chromogenic or confirmatory ID', 'Verification step', 'Use local yeast ID workflow before final species call']
    ],
    trapTitle: 'Do not call pseudohyphae a germ tube',
    trapBody: 'The base is the decision point. If the outgrowth pinches where it leaves the yeast cell, it is pseudohyphae, not a true germ tube.',
    trapBullets: [
      'Scan multiple yeast cells before calling the reaction.',
      'Overincubation can make interpretation messy.',
      'C. dubliniensis can also be germ tube positive, so final ID depends on the full workflow.'
    ],
    interpretationTitle: 'Candida germ tube guide',
    interpretationRows: [
      ['True germ tubes present', 'Germ tube positive yeast', 'Supports C. albicans/C. dubliniensis group; confirm per SOP'],
      ['Only pseudohyphae or budding yeast', 'Germ tube negative pattern', 'Continue yeast ID workflow'],
      ['Mixed forms or weak read', 'Indeterminate', 'Repeat or confirm with validated method']
    ],
    takeaways: [
      'Germ tube interpretation is about the base: no constriction means true germ tube.',
      'Pseudohyphae are useful morphology, but they are not a positive germ tube result.',
      'Use germ tube as a fast screen, not as a complete yeast identification system.'
    ],
    remember: 'Germ tube = no pinch. Pseudohyphae = pinched chain.',
    divr: {
      detect: 'Yeast isolate with germ tube setup or wet mount morphology',
      identify: ['True germ tube without constriction', 'Pseudohyphae with pinched attachments', 'Budding yeast background'],
      verify: 'Confirm with local yeast identification workflow',
      report: 'Use SOP-supported organism ID, especially for non-albicans Candida'
    }
  },
  {
    slug: 'cryptococcus-neoformans-capsule',
    title: 'Cryptococcus neoformans/gattii: Capsule and Narrow-Based Budding',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing encapsulated Cryptococcus yeast and narrow-based budding on direct exam or special stains.',
    boardTitle: 'Cryptococcus: capsule halo and narrow-based budding',
    boardNote: 'Cryptococcus is a yeast pattern: round to oval cells, narrow-based budding, and a capsule that may appear as a clear halo on capsule-focused preparations.',
    ariaLabel: 'Illustrated Cryptococcus yeast showing capsule halo and narrow-based budding',
    visualType: 'mycology-cryptococcus',
    tubes: [
      {
        id: 'A',
        label: 'Capsule prep',
        name: 'Clear halo around round yeast',
        colors: { slant: '#e8eef2', butt: '#6d8296', base: '#2f4c62' },
        note: 'Capsule-focused preparations can show a clear halo around round budding yeasts. Capsule size can vary by strain and specimen.'
      },
      {
        id: 'B',
        label: 'Budding yeast',
        name: 'Narrow-based budding',
        colors: { slant: '#f1efe8', butt: '#8c7a58', base: '#4b3d24' },
        note: 'Buds attach by a narrow neck, unlike Blastomyces broad-based budding. Correlate with antigen or culture workflow.'
      }
    ],
    readoutTitle: 'Cryptococcus visual anchors',
    readoutRows: [
      ['Round encapsulated yeast', 'Cryptococcus pattern', 'Capsule may appear as a halo depending on method'],
      ['Narrow-based budding', 'Yeast morphology clue', 'Separates from broad-based Blastomyces pattern'],
      ['CSF or sterile site context', 'High-impact specimen', 'Follow urgent reporting and confirmatory workflow'],
      ['Cryptococcal antigen', 'Verification method', 'Often more sensitive than morphology alone']
    ],
    trapTitle: 'A halo is not always a capsule',
    trapBody: 'Artifacts and shrinkage can create clear spaces around organisms. Use size, budding pattern, specimen context, and confirmatory testing.',
    trapBullets: [
      'Histoplasma can show an artifactual halo but is much smaller and often intracellular.',
      'Blastomyces is larger and broad-based budding.',
      'Cryptococcal antigen testing is central in many workflows.'
    ],
    interpretationTitle: 'Cryptococcus interpretation guide',
    interpretationRows: [
      ['Encapsulated narrow-budding yeast', 'Cryptococcus-compatible morphology', 'Confirm with antigen, culture, or validated ID workflow'],
      ['Broad-based budding yeast', 'Blastomyces pattern', 'Do not call Cryptococcus based on size alone'],
      ['Tiny intracellular yeasts', 'Histoplasma pattern', 'Use size and cell location']
    ],
    takeaways: [
      'Cryptococcus is capsule plus narrow-based budding in the right specimen context.',
      'A halo alone is not enough; morphology and confirmatory testing carry the call.',
      'Sterile site yeast findings deserve prompt SOP-guided escalation.'
    ],
    remember: 'Crypto = capsule halo plus narrow neck bud.',
    divr: {
      detect: 'CSF, sterile fluid, respiratory specimen, capsule prep, antigen, or culture',
      identify: ['Round yeast', 'Capsule halo', 'Narrow-based budding'],
      verify: 'Cryptococcal antigen and validated culture/ID workflow',
      report: 'Escalate sterile site findings per SOP'
    }
  },
  {
    slug: 'sporothrix-schenckii',
    title: 'Sporothrix schenckii: Cigar Yeast and Flowerette Conidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Sporothrix: cigar-shaped yeast in tissue and flowerette conidia in mold phase.',
    boardTitle: 'Sporothrix: cigar yeast and flowerette conidia',
    boardNote: 'Sporothrix is dimorphic. Tissue yeast may be cigar-shaped and sparse; mold phase can show conidia arranged like a small flowerette at the conidiophore tip.',
    ariaLabel: 'Illustrated Sporothrix showing cigar-shaped yeast and flowerette conidia',
    visualType: 'mycology-sporothrix',
    tubes: [
      {
        id: 'A',
        label: 'Yeast phase',
        name: 'Cigar-shaped budding yeast',
        colors: { slant: '#efe7e2', butt: '#9b6f6f', base: '#5c3434' },
        note: 'Cigar-shaped yeast forms are classic but may be few in tissue. Look for compatible morphology in the right clinical context.'
      },
      {
        id: 'B',
        label: 'Mold phase',
        name: 'Flowerette conidia',
        colors: { slant: '#e7f1ed', butt: '#6b997c', base: '#315a40' },
        note: 'Conidia may cluster at the tip of a conidiophore in a flowerette arrangement. Culture work follows dimorphic fungus safety workflow.'
      }
    ],
    readoutTitle: 'Sporothrix anchors',
    readoutRows: [
      ['Cigar-shaped yeast', 'Tissue clue', 'May be sparse; do not expect every field to show it'],
      ['Flowerette conidia', 'Mold phase clue', 'Conidia cluster at conidiophore tip'],
      ['Lymphocutaneous context', 'Clinical pattern', 'Specimen source can support the morphology'],
      ['Dimorphic mold handling', 'Safety workflow', 'Use approved culture procedures']
    ],
    trapTitle: 'Sparse tissue forms can make Sporothrix easy to miss',
    trapBody: 'The yeast form may be rare in tissue sections. A negative quick scan does not exclude infection when clinical suspicion is high.',
    trapBullets: [
      'Scan carefully and correlate with culture.',
      'Do not overcall nonspecific elongated debris as cigar yeast.',
      'Use dimorphic fungus safety workflow for cultures.'
    ],
    interpretationTitle: 'Sporothrix interpretation guide',
    interpretationRows: [
      ['Cigar-shaped yeast in tissue', 'Sporothrix-compatible clue', 'Correlate with culture and clinical pattern'],
      ['Flowerette conidia in mold phase', 'Sporothrix mold-phase clue', 'Confirm through approved workflow'],
      ['Broad-based budding yeast', 'Blastomyces pattern', 'Different dimorphic yeast morphology']
    ],
    takeaways: [
      'Sporothrix teaches the difference between tissue yeast clues and culture mold clues.',
      'Cigar yeast is high-yield but not always abundant.',
      'Flowerette conidia make a clean visual anchor for the mold phase.'
    ],
    remember: 'Sporothrix = cigar yeast in tissue, flowerette conidia in mold.',
    divr: {
      detect: 'Tissue, drainage, culture, or dimorphic fungus workup',
      identify: ['Cigar-shaped yeast', 'Flowerette conidia', 'Dimorphic pattern'],
      verify: 'Culture and validated identification workflow',
      report: 'Use SOP language and safety-aware culture handling'
    }
  },
  {
    slug: 'paracoccidioides-brasiliensis',
    title: 'Paracoccidioides brasiliensis: Multiple Budding Yeast',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Paracoccidioides multiple budding yeast, often described as a pilot-wheel pattern.',
    boardTitle: 'Paracoccidioides: multiple budding yeast',
    boardNote: 'The recognition anchor is a large yeast with multiple narrow-neck buds around the mother cell. Compare against Blastomyces, which usually has a single broad-based bud.',
    ariaLabel: 'Illustrated Paracoccidioides yeast with multiple buds around a central mother cell',
    visualType: 'mycology-paracoccidioides',
    tubes: [
      {
        id: 'A',
        label: 'Tissue yeast',
        name: 'Multiple buds around mother cell',
        colors: { slant: '#efe9df', butt: '#a0825d', base: '#5b4226' },
        note: 'Large yeast with multiple buds attached around the perimeter. This multi-budding pattern is the key visual clue.'
      },
      {
        id: 'B',
        label: 'Comparator',
        name: 'Single broad bud is not the same pattern',
        colors: { slant: '#e9f0ed', butt: '#8a8f70', base: '#4c5133' },
        note: 'Blastomyces typically shows a single broad-based bud. Paracoccidioides shows multiple buds around one mother cell.'
      }
    ],
    readoutTitle: 'Paracoccidioides anchors',
    readoutRows: [
      ['Multiple peripheral buds', 'Paracoccidioides pattern', 'Buds form around the mother yeast cell'],
      ['Large mother cell', 'Dimorphic yeast clue', 'Use size and budding arrangement together'],
      ['Single broad bud', 'Blastomyces comparator', 'Not the same as multiple-budding pattern'],
      ['Exposure context', 'Supportive clue', 'Geography and clinical setting matter']
    ],
    trapTitle: 'Do not reduce this to "big yeast"',
    trapBody: 'The diagnostic idea is the budding arrangement. A large yeast with one broad bud points away from Paracoccidioides.',
    trapBullets: [
      'Look for multiple buds, not just large cell size.',
      'Compare directly with Blastomyces when teaching this card.',
      'Confirm through culture, pathology, or reference methods per SOP.'
    ],
    interpretationTitle: 'Paracoccidioides interpretation guide',
    interpretationRows: [
      ['Multiple budding yeast', 'Paracoccidioides-compatible morphology', 'Correlate with clinical and geographic context'],
      ['Single broad-based bud', 'Blastomyces pattern', 'Different budding architecture'],
      ['Tiny intracellular yeasts', 'Histoplasma pattern', 'Different size and host-cell location']
    ],
    takeaways: [
      'Paracoccidioides is a budding-arrangement card.',
      'Multiple buds around one mother cell are more important than the nickname.',
      'Use this as a comparator against Blastomyces.'
    ],
    remember: 'Para = many buds around one parent cell.',
    divr: {
      detect: 'Tissue, smear, culture, or dimorphic fungus workflow',
      identify: ['Large yeast', 'Multiple peripheral buds', 'Comparator against Blastomyces'],
      verify: 'Confirm through validated workflow and clinical context',
      report: 'Use SOP-supported dimorphic fungus reporting language'
    }
  },
  {
    slug: 'fusarium-sickle-macroconidia',
    title: 'Fusarium spp.: Sickle-Shaped Macroconidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Fusarium: multicelled sickle or canoe-shaped macroconidia with hyaline septate hyphae.',
    boardTitle: 'Fusarium: sickle-shaped multicelled macroconidia',
    boardNote: 'Fusarium is an opportunistic hyaline mold pattern. The teaching anchor is a curved, multicelled macroconidium shaped like a canoe or sickle.',
    ariaLabel: 'Illustrated Fusarium showing curved multicelled macroconidia and septate hyphae',
    visualType: 'mycology-fusarium',
    tubes: [
      {
        id: 'A',
        label: 'Macroconidia',
        name: 'Curved sickle-shaped, multicelled',
        colors: { slant: '#e8f2f4', butt: '#5d9ab0', base: '#2b5d70' },
        note: 'Macroconidia are curved and divided by septa. This shape is a strong visual anchor for Fusarium-style morphology.'
      },
      {
        id: 'B',
        label: 'Hyphae',
        name: 'Hyaline septate mold',
        colors: { slant: '#edf4f0', butt: '#6f9a86', base: '#335c48' },
        note: 'Septate hyphae support a hyaline mold pattern. Use macroconidia and validated methods to separate from lookalikes.'
      }
    ],
    readoutTitle: 'Fusarium visual anchors',
    readoutRows: [
      ['Curved macroconidia', 'Fusarium pattern', 'Canoe or sickle shape is the main clue'],
      ['Multiple septa in macroconidia', 'Multicelled conidium', 'Do not confuse with simple oval conidia'],
      ['Hyaline septate hyphae', 'Opportunistic mold context', 'Overlaps with other hyaline molds'],
      ['Sterile site or immunocompromised host', 'Clinical importance', 'Escalate per SOP']
    ],
    trapTitle: 'Macroconidia shape matters more than color',
    trapBody: 'Colony color can vary and is not enough. Teach learners to find the multicelled curved macroconidia and then confirm through the lab workflow.',
    trapBullets: [
      'Do not identify Fusarium from septate hyphae alone.',
      'Compare with dermatophyte macroconidia and Aspergillus conidial heads.',
      'Opportunistic mold significance depends heavily on source and patient context.'
    ],
    interpretationTitle: 'Fusarium interpretation guide',
    interpretationRows: [
      ['Sickle macroconidia with septa', 'Fusarium-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Compact conidial head', 'Aspergillus pattern', 'Different reproductive structure'],
      ['Rough spindle macroconidia', 'Microsporum pattern', 'Dermatophyte context and source differ']
    ],
    takeaways: [
      'Fusarium is a macroconidia-shape card.',
      'Curved, multicelled conidia are the anchor.',
      'Clinical significance depends on specimen source and host context.'
    ],
    remember: 'Fusarium = curved sickle macroconidia with septa.',
    divr: {
      detect: 'Culture mount, sterile site mold workup, or opportunistic mold evaluation',
      identify: ['Curved multicelled macroconidia', 'Hyaline septate hyphae', 'Opportunistic mold context'],
      verify: 'Validated mold identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'penicillium-talaromyces',
    title: 'Penicillium / Talaromyces: Brush Conidiophores and Fission Yeast',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Penicillium-like brush conidiophores and Talaromyces marneffei yeast division by fission.',
    boardTitle: 'Penicillium/Talaromyces: brush mold, fission yeast clue',
    boardNote: 'Penicillium-type molds form brush-like conidiophores. Talaromyces marneffei is dimorphic and its yeast phase divides by fission with a central septum.',
    ariaLabel: 'Illustrated Penicillium brush-like conidiophore and Talaromyces fission yeast with central septum',
    visualType: 'mycology-penicillium-talaromyces',
    tubes: [
      {
        id: 'A',
        label: 'Mold phase',
        name: 'Brush-like conidiophore',
        colors: { slant: '#e8f1ed', butt: '#5f927a', base: '#2f5a43' },
        note: 'Branching phialides form a brush-like head with chains of conidia. Many Penicillium-like molds share this general architecture.'
      },
      {
        id: 'B',
        label: 'Yeast phase',
        name: 'Fission yeast with central septum',
        colors: { slant: '#efe9e0', butt: '#9a765f', base: '#5a3928' },
        note: 'Talaromyces marneffei yeast divides by fission and may show a central transverse septum rather than budding.'
      }
    ],
    readoutTitle: 'Penicillium/Talaromyces anchors',
    readoutRows: [
      ['Brush-like conidiophore', 'Penicillium-type mold clue', 'Branching phialides with chains of conidia'],
      ['Central septum in yeast', 'Talaromyces marneffei clue', 'Fission division rather than budding'],
      ['Dimorphic behavior', 'Talaromyces context', 'Mold and yeast phases have different clues'],
      ['Clinical context', 'Opportunistic/systemic mycosis concern', 'Interpret with source, geography, and host status']
    ],
    trapTitle: 'Not every Penicillium-like mold is Talaromyces',
    trapBody: 'Brush-like mold morphology is broad. The fission yeast phase and clinical context are what make Talaromyces marneffei a distinct teaching pattern.',
    trapBullets: [
      'Do not call Talaromyces from brush morphology alone.',
      'Look for yeast-phase fission with a central septum when relevant.',
      'Use validated identification or reference workflow for clinically significant isolates.'
    ],
    interpretationTitle: 'Penicillium/Talaromyces interpretation guide',
    interpretationRows: [
      ['Brush-like conidiophore only', 'Penicillium-like mold', 'Continue mold ID workflow; do not overcall'],
      ['Fission yeast with central septum', 'Talaromyces marneffei clue', 'Correlate with dimorphic fungus workflow'],
      ['Budding yeast forms', 'Different yeast pattern', 'Compare with Candida, Cryptococcus, Blastomyces, or Sporothrix']
    ],
    takeaways: [
      'Penicillium-like mold morphology is a brush pattern.',
      'Talaromyces marneffei yeast phase divides by fission with a central septum.',
      'The safest bench habit is to avoid species-level overcalls from mold architecture alone.'
    ],
    remember: 'Penicillium brushes; Talaromyces yeast splits by fission.',
    divr: {
      detect: 'Culture mount, tissue, blood culture, or dimorphic/opportunistic fungus workflow',
      identify: ['Brush-like conidiophore', 'Fission yeast with transverse septum', 'Clinical context'],
      verify: 'Validated ID or reference workflow',
      report: 'Use SOP-supported reporting for clinically significant isolates'
    }
  },
  {
    slug: 'scopulariopsis-rough-conidia',
    title: 'Scopulariopsis spp.: Penicillus-Like Brush and Rough Conidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Scopulariopsis: penicillus-like brush of annellides bearing chains of rough, thick-walled, lemon-shaped conidia.',
    boardTitle: 'Scopulariopsis: brush of annellides with rough lemon-shaped conidia',
    boardNote: 'Scopulariopsis sits in the opportunistic mold group. The teaching anchor is a Penicillium-like brush whose conidia are rough or echinulate with a flat base, not smooth.',
    ariaLabel: 'Illustrated Scopulariopsis showing a brush-like conidiophore bearing chains of rough lemon-shaped conidia',
    visualType: 'mycology-scopulariopsis',
    tubes: [
      {
        id: 'A',
        label: 'Conidiophore',
        name: 'Penicillus-like brush of annellides',
        colors: { slant: '#efe9df', butt: '#9a8260', base: '#5a4326' },
        note: 'Annellides form a brush that resembles Penicillium at first glance. The conidia-producing cells widen as chains build, which is the annellide clue.'
      },
      {
        id: 'B',
        label: 'Conidia',
        name: 'Rough, thick-walled, lemon-shaped',
        colors: { slant: '#efe6da', butt: '#a07a4f', base: '#5e3d1c' },
        note: 'Conidia are rough or echinulate with a flat truncate base, often described as lemon-shaped. Surface texture separates it from smooth Penicillium conidia.'
      }
    ],
    readoutTitle: 'Scopulariopsis visual anchors',
    readoutRows: [
      ['Penicillus-like brush', 'Penicillium mimic clue', 'Looks brush-like, so check conidial surface before calling Penicillium'],
      ['Rough or echinulate conidia', 'Scopulariopsis pattern', 'Spiny surface is the main separator from smooth lookalikes'],
      ['Flat truncate base on conidia', 'Lemon-shaped clue', 'Base shape supports Scopulariopsis over oval Penicillium conidia'],
      ['Sterile site or nail/skin source', 'Clinical context', 'Significance depends on source and host; interpret per SOP']
    ],
    trapTitle: 'A brush shape alone can read as Penicillium',
    trapBody: 'Low-power brush morphology overlaps with Penicillium. The separator is conidial surface and base shape: Scopulariopsis conidia are rough with a flat base, while Penicillium conidia are smooth.',
    trapBullets: [
      'Do not call Penicillium from brush architecture alone.',
      'Examine conidial surface texture at high power before deciding.',
      'Use validated identification for clinically significant or sterile-site isolates.'
    ],
    interpretationTitle: 'Scopulariopsis interpretation guide',
    interpretationRows: [
      ['Brush with rough lemon-shaped conidia', 'Scopulariopsis-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Brush with smooth oval conidia', 'Penicillium pattern', 'Different surface and base shape'],
      ['Brush with delicate tapering phialides', 'Paecilomyces pattern', 'Compare conidiogenous cell shape']
    ],
    takeaways: [
      'Scopulariopsis is a conidial-surface card.',
      'Rough, flat-based, lemon-shaped conidia separate it from Penicillium.',
      'Clinical significance depends on specimen source and host context.'
    ],
    remember: 'Scopulariopsis = brush plus rough lemon-shaped conidia with a flat base.',
    divr: {
      detect: 'Culture tease mount, nail or skin source, or opportunistic mold workup',
      identify: ['Penicillus-like brush of annellides', 'Rough echinulate conidia', 'Flat truncate conidial base'],
      verify: 'Validated mold identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'paecilomyces-tapering-phialides',
    title: 'Paecilomyces spp.: Long Tapering Phialides',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Paecilomyces: long slender phialides that taper to a fine point, bearing delicate divergent chains of conidia.',
    boardTitle: 'Paecilomyces: long tapering phialides with delicate conidial chains',
    boardNote: 'Paecilomyces is another opportunistic mold that mimics Penicillium. The anchor is a long phialide that tapers to a thin neck, with chains that spread apart rather than forming a tight brush.',
    ariaLabel: 'Illustrated Paecilomyces showing long tapering phialides bearing delicate divergent chains of conidia',
    visualType: 'mycology-paecilomyces',
    tubes: [
      {
        id: 'A',
        label: 'Phialides',
        name: 'Long, tapering to a fine point',
        colors: { slant: '#e9efe6', butt: '#7f9a6f', base: '#3f5a30' },
        note: 'Phialides are long and slender, narrowing to a thin neck. This tapering shape is the main separator from the shorter, plumper phialides of Penicillium.'
      },
      {
        id: 'B',
        label: 'Conidial chains',
        name: 'Delicate divergent chains',
        colors: { slant: '#eef0e6', butt: '#94a06f', base: '#4f5a30' },
        note: 'Chains of small oval conidia spread apart in loose divergent arrangements rather than forming a tight columnar brush.'
      }
    ],
    readoutTitle: 'Paecilomyces visual anchors',
    readoutRows: [
      ['Long tapering phialides', 'Paecilomyces pattern', 'Fine narrowing neck is the main clue'],
      ['Divergent conidial chains', 'Loose brush clue', 'Chains spread apart rather than packing into columns'],
      ['Penicillium-like outline', 'Mimic warning', 'Low-power shape overlaps; check phialide taper'],
      ['Sterile site or device source', 'Clinical context', 'Significance depends on source and host; interpret per SOP']
    ],
    trapTitle: 'Tapering phialides separate it from Penicillium',
    trapBody: 'Paecilomyces and Penicillium both form branched conidiophores. The separator is phialide shape: Paecilomyces phialides are long and taper to a fine point, and its conidial chains diverge instead of forming compact columns.',
    trapBullets: [
      'Do not call Penicillium from branched architecture alone.',
      'Look for the long tapering phialide neck at high power.',
      'Use validated identification for clinically significant or sterile-site isolates.'
    ],
    interpretationTitle: 'Paecilomyces interpretation guide',
    interpretationRows: [
      ['Long tapering phialides, divergent chains', 'Paecilomyces-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Short plump phialides, compact brush', 'Penicillium pattern', 'Different phialide shape and chain packing'],
      ['Rough lemon-shaped conidia', 'Scopulariopsis pattern', 'Compare conidial surface and base']
    ],
    takeaways: [
      'Paecilomyces is a phialide-shape card.',
      'Long tapering phialides and divergent chains separate it from Penicillium.',
      'Clinical significance depends on specimen source and host context.'
    ],
    remember: 'Paecilomyces = long tapering phialides with delicate divergent chains.',
    divr: {
      detect: 'Culture tease mount, device-associated source, or opportunistic mold workup',
      identify: ['Long tapering phialides', 'Delicate divergent conidial chains', 'Penicillium-like overall shape'],
      verify: 'Validated mold identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'scedosporium-lomentospora',
    title: 'Scedosporium / Lomentospora: Flask Cells and Annelloconidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Scedosporium and Lomentospora: flask-shaped conidiogenous cells producing single annelloconidia at the tip on hyaline septate hyphae.',
    boardTitle: 'Scedosporium / Lomentospora: flask cells with single annelloconidia',
    boardNote: 'Scedosporium and Lomentospora are opportunistic hyaline molds. The anchor is a flask-shaped conidiogenous cell bearing single oval annelloconidia at the tip, set on septate hyphae.',
    ariaLabel: 'Illustrated Scedosporium showing flask-shaped conidiogenous cells with single oval annelloconidia on septate hyphae',
    visualType: 'mycology-scedosporium',
    tubes: [
      {
        id: 'A',
        label: 'Conidiogenous cell',
        name: 'Flask-shaped, single tip conidium',
        colors: { slant: '#e8f1ee', butt: '#5f8f86', base: '#27524a' },
        note: 'Flask-shaped or annellidic cells produce a single oval conidium at the tip. Conidia often gather as small clusters at the apex.'
      },
      {
        id: 'B',
        label: 'Hyphae',
        name: 'Hyaline septate mold',
        colors: { slant: '#edf4f0', butt: '#6f9a86', base: '#335c48' },
        note: 'Septate hyphae place this in the hyaline mold group. Conidiogenous cell shape, not hyphae alone, points toward Scedosporium or Lomentospora.'
      }
    ],
    readoutTitle: 'Scedosporium / Lomentospora anchors',
    readoutRows: [
      ['Flask-shaped conidiogenous cell', 'Scedosporium pattern', 'Swollen base tapering to a neck is the main clue'],
      ['Single oval conidium at the tip', 'Annelloconidium clue', 'Conidia form one at a time, often clustering at the apex'],
      ['Hyaline septate hyphae', 'Opportunistic mold context', 'Overlaps with Aspergillus and Fusarium on hyphae alone'],
      ['Sterile site or near-drowning history', 'Clinical context', 'Significance depends on source and host; interpret per SOP']
    ],
    trapTitle: 'Septate hyphae alone do not separate the hyaline molds',
    trapBody: 'Scedosporium, Aspergillus, and Fusarium all show septate hyphae. The separator here is the flask-shaped conidiogenous cell bearing a single tip conidium, not the hyphae.',
    trapBullets: [
      'Do not call Aspergillus or Fusarium from septate hyphae alone.',
      'Look for single tip conidia on flask-shaped cells.',
      'Lomentospora prolificans is often multidrug resistant; escalate clinically significant isolates per SOP.'
    ],
    interpretationTitle: 'Scedosporium / Lomentospora interpretation guide',
    interpretationRows: [
      ['Flask cells with single tip conidia', 'Scedosporium-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Compact conidial head on a vesicle', 'Aspergillus pattern', 'Different reproductive structure'],
      ['Curved multicelled macroconidia', 'Fusarium pattern', 'Different conidial shape']
    ],
    takeaways: [
      'Scedosporium and Lomentospora are conidiogenous-cell-shape cards.',
      'Flask cells with single tip conidia separate them from other hyaline molds.',
      'Lomentospora resistance makes correct identification and SOP escalation important.'
    ],
    remember: 'Scedosporium / Lomentospora = flask cells with single oval conidia on septate hyphae.',
    divr: {
      detect: 'Culture tease mount, sterile site, or opportunistic mold workup',
      identify: ['Flask-shaped conidiogenous cells', 'Single oval annelloconidia at the tip', 'Hyaline septate hyphae'],
      verify: 'Validated mold identification workflow',
      report: 'Flag possible Lomentospora resistance; interpret with source, host, and SOP'
    }
  },
  {
    slug: 'trichosporon-arthroconidia',
    title: 'Trichosporon spp.: Arthroconidia and Blastoconidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Trichosporon: a yeast-like organism producing both rectangular arthroconidia and budding blastoconidia, distinct from Candida.',
    boardTitle: 'Trichosporon: arthroconidia plus blastoconidia, not Candida',
    boardNote: 'Trichosporon is a yeast-like organism that breaks hyphae into rectangular arthroconidia while also forming budding blastoconidia. The mix is the teaching anchor that separates it from Candida.',
    ariaLabel: 'Illustrated Trichosporon showing rectangular arthroconidia in a chain alongside budding blastoconidia',
    visualType: 'mycology-trichosporon',
    tubes: [
      {
        id: 'A',
        label: 'Arthroconidia',
        name: 'Rectangular, in chains',
        colors: { slant: '#efe9e0', butt: '#9a8466', base: '#56412a' },
        note: 'Hyphae fragment into rectangular arthroconidia laid end to end. Rectangular fragmentation is the main clue away from Candida.'
      },
      {
        id: 'B',
        label: 'Blastoconidia',
        name: 'Budding yeast cells',
        colors: { slant: '#eee7da', butt: '#a0825c', base: '#5a3e22' },
        note: 'Budding blastoconidia appear alongside the arthroconidia. The combination of both forms is what defines the Trichosporon pattern.'
      }
    ],
    readoutTitle: 'Trichosporon visual anchors',
    readoutRows: [
      ['Rectangular arthroconidia', 'Trichosporon pattern', 'End-to-end fragmentation is the main clue'],
      ['Budding blastoconidia', 'Yeast-like clue', 'Buds appear with the arthroconidia, not alone'],
      ['Both forms together', 'Trichosporon anchor', 'The mix separates it from Candida and Geotrichum'],
      ['Blood, urine, or hair source', 'Clinical context', 'Significance depends on source and host; interpret per SOP']
    ],
    trapTitle: 'Not every yeast-like organism is Candida',
    trapBody: 'Trichosporon can be mistaken for Candida on a quick look, but it produces rectangular arthroconidia in addition to buds. Geotrichum makes arthroconidia without true blastoconidia, so the presence of both forms favors Trichosporon.',
    trapBullets: [
      'Do not default a yeast-like organism to Candida.',
      'Look for rectangular arthroconidia plus budding blastoconidia together.',
      'Use validated identification for clinically significant or sterile-site isolates.'
    ],
    interpretationTitle: 'Trichosporon interpretation guide',
    interpretationRows: [
      ['Arthroconidia plus blastoconidia', 'Trichosporon-compatible morphology', 'Confirm by validated yeast ID workflow'],
      ['Buds and pseudohyphae, no arthroconidia', 'Candida pattern', 'Different reproductive forms'],
      ['Arthroconidia without true buds', 'Geotrichum pattern', 'Compare for budding blastoconidia']
    ],
    takeaways: [
      'Trichosporon is a mixed-morphology card.',
      'Arthroconidia plus blastoconidia separate it from Candida and Geotrichum.',
      'Clinical significance depends on specimen source and host context.'
    ],
    remember: 'Trichosporon = rectangular arthroconidia plus budding blastoconidia.',
    divr: {
      detect: 'Wet mount or tease mount from yeast-like growth; blood, urine, or hair source',
      identify: ['Rectangular arthroconidia in chains', 'Budding blastoconidia', 'Both forms present together'],
      verify: 'Validated yeast identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'dematiaceous-alternaria-curvularia',
    title: 'Alternaria vs Curvularia: Dematiaceous Conidia',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual comparing two dematiaceous molds: Alternaria muriform conidia with a tapered beak versus Curvularia curved conidia with a swollen central cell.',
    boardTitle: 'Dematiaceous molds: Alternaria beaked muriform vs Curvularia curved conidia',
    boardNote: 'Both are pigmented (dematiaceous) molds with brown septate hyphae. Conidial shape separates them: Alternaria is muriform with a beak, Curvularia is curved with a larger central cell.',
    ariaLabel: 'Illustrated comparison of Alternaria muriform beaked conidia and Curvularia curved conidia with a swollen central cell',
    visualType: 'mycology-dematiaceous-panel',
    tubes: [
      {
        id: 'A',
        label: 'Alternaria',
        name: 'Muriform conidia with a beak',
        colors: { slant: '#e6e0d4', butt: '#7a6a4a', base: '#3f3320' },
        note: 'Conidia are muriform, divided by both crosswise and lengthwise septa, and taper into a beak-like extension. Chains often form in branching arrangements.'
      },
      {
        id: 'B',
        label: 'Curvularia',
        name: 'Curved conidia, swollen central cell',
        colors: { slant: '#e4ddd0', butt: '#806c48', base: '#42321c' },
        note: 'Conidia are curved by an enlarged central cell that bends the conidium. Cross septa divide it, but there are no lengthwise septa and no beak.'
      }
    ],
    readoutTitle: 'Dematiaceous comparison anchors',
    readoutRows: [
      ['Brown septate hyphae', 'Dematiaceous group', 'Pigment is visible without staining; places both in the dark-mold group'],
      ['Muriform conidia with a beak', 'Alternaria pattern', 'Crosswise and lengthwise septa plus a tapered beak'],
      ['Curved conidia, swollen central cell', 'Curvularia pattern', 'Central cell enlargement bends the conidium'],
      ['Sterile site or sinus source', 'Clinical context', 'Significance depends on source and host; interpret per SOP']
    ],
    trapTitle: 'Pigment groups them, conidial shape separates them',
    trapBody: 'Both molds are dematiaceous, so brown hyphae alone do not distinguish them. Use conidial structure: Alternaria conidia are muriform with a beak, while Curvularia conidia are curved by a swollen central cell without lengthwise septa.',
    trapBullets: [
      'Do not separate dematiaceous molds by pigment alone.',
      'Look for the beak and muriform septa of Alternaria versus the curved central cell of Curvularia.',
      'Use validated identification for clinically significant or sterile-site isolates.'
    ],
    interpretationTitle: 'Dematiaceous interpretation guide',
    interpretationRows: [
      ['Muriform beaked conidia, brown hyphae', 'Alternaria-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Curved conidia with swollen central cell', 'Curvularia-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Hyaline septate hyphae, no pigment', 'Not dematiaceous', 'Reconsider Aspergillus, Fusarium, or Scedosporium']
    ],
    takeaways: [
      'Both are dematiaceous molds with brown septate hyphae.',
      'Alternaria conidia are muriform with a beak; Curvularia conidia are curved by a swollen central cell.',
      'Clinical significance depends on specimen source and host context.'
    ],
    remember: 'Alternaria = beaked muriform conidia. Curvularia = curved conidia with a swollen central cell.',
    divr: {
      detect: 'Culture tease mount or tape prep showing pigmented mold; sinus or sterile site source',
      identify: ['Brown septate hyphae', 'Alternaria: muriform beaked conidia', 'Curvularia: curved conidia with swollen central cell'],
      verify: 'Validated mold identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'sclerotic-bodies-chromo-vs-phaeo',
    title: 'Sclerotic Bodies: Chromoblastomycosis vs Phaeohyphomycosis',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual contrasting muriform sclerotic bodies in tissue with dematiaceous septate hyphae, the split that separates chromoblastomycosis from phaeohyphomycosis.',
    boardTitle: 'Dematiaceous tissue forms: sclerotic bodies vs pigmented septate hyphae',
    boardNote: 'Many dematiaceous molds look alike in culture. The tissue form is what splits the disease: clustered muriform sclerotic bodies point to chromoblastomycosis, while pigmented septate hyphae point to phaeohyphomycosis.',
    ariaLabel: 'Illustrated comparison of clustered brown muriform sclerotic bodies and pigmented septate hyphae with budding yeast',
    visualType: 'mycology-sclerotic-bodies',
    tubes: [
      {
        id: 'A',
        label: 'Sclerotic bodies',
        name: 'Clustered muriform brown cells',
        colors: { slant: '#e7ddcf', butt: '#8a5a3a', base: '#4a2a18' },
        note: 'Thick-walled brown cells in clusters, divided by septa in more than one plane (muriform). Often called copper pennies. This tissue form defines chromoblastomycosis.'
      },
      {
        id: 'B',
        label: 'Pigmented hyphae',
        name: 'Dematiaceous septate hyphae',
        colors: { slant: '#e2dccd', butt: '#6f5e40', base: '#38301c' },
        note: 'Brown septate hyphae, sometimes with budding yeast forms. Pigmented hyphae in tissue point to phaeohyphomycosis rather than chromoblastomycosis.'
      }
    ],
    readoutTitle: 'Tissue-form anchors',
    readoutRows: [
      ['Clustered muriform brown cells', 'Sclerotic bodies', 'Septa in two planes; copper-penny look defines chromoblastomycosis'],
      ['Brown septate hyphae in tissue', 'Phaeohyphomycosis form', 'Pigmented hyphae, sometimes with yeast forms'],
      ['Visible brown pigment without stain', 'Dematiaceous group', 'Pigment is present on H&E and on Fontana-Masson'],
      ['Subcutaneous or sinus source', 'Clinical context', 'Significance depends on source and host; interpret per SOP']
    ],
    trapTitle: 'The tissue form decides the disease name, not the genus',
    trapBody: 'Several genera can cause either disease. Do not assign chromoblastomycosis from culture alone. The defining feature is the tissue form: muriform sclerotic bodies for chromoblastomycosis, pigmented septate hyphae for phaeohyphomycosis.',
    trapBullets: [
      'Do not call chromoblastomycosis without sclerotic bodies in tissue.',
      'Fontana-Masson can confirm melanin when pigment is faint.',
      'Correlate tissue form with culture identification and clinical source.'
    ],
    interpretationTitle: 'Tissue-form interpretation guide',
    interpretationRows: [
      ['Muriform sclerotic bodies in tissue', 'Chromoblastomycosis', 'Correlate with culture; report tissue form per SOP'],
      ['Pigmented septate hyphae or yeast in tissue', 'Phaeohyphomycosis', 'Correlate with culture and clinical source'],
      ['Faint or absent visible pigment', 'Confirm melanin', 'Fontana-Masson stain supports a dematiaceous process']
    ],
    takeaways: [
      'Tissue form, not genus, separates chromoblastomycosis from phaeohyphomycosis.',
      'Sclerotic bodies are clustered, muriform, and thick-walled.',
      'Fontana-Masson confirms melanin when pigment is hard to see.'
    ],
    remember: 'Sclerotic bodies = chromoblastomycosis. Pigmented hyphae = phaeohyphomycosis.',
    divr: {
      detect: 'Tissue section, KOH of crust or biopsy, or culture with Fontana-Masson',
      identify: ['Muriform sclerotic bodies for chromoblastomycosis', 'Pigmented septate hyphae for phaeohyphomycosis', 'Melanin confirmed by Fontana-Masson'],
      verify: 'Correlate tissue form with culture identification',
      report: 'Report tissue form and correlate with source and SOP'
    }
  },
  {
    slug: 'bipolaris-exserohilum-poroconidia',
    title: 'Bipolaris vs Exserohilum: Poroconidia and Hilum',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual comparing two dematiaceous molds with multicelled poroconidia on geniculate conidiophores, separated by the protruding hilum of Exserohilum.',
    boardTitle: 'Poroconidia molds: Bipolaris flat hilum vs Exserohilum protruding hilum',
    boardNote: 'Both form multicelled poroconidia on a bent, zig-zag (geniculate) conidiophore. The separator is the hilum: Bipolaris has a slightly flattened scar, Exserohilum has a strongly protruding hilum.',
    ariaLabel: 'Illustrated comparison of Bipolaris poroconidia with a flat hilum and Exserohilum poroconidia with a protruding hilum on geniculate conidiophores',
    visualType: 'mycology-bipolaris-exserohilum',
    tubes: [
      {
        id: 'A',
        label: 'Bipolaris',
        name: 'Poroconidia, flat hilum',
        colors: { slant: '#e6dccc', butt: '#7e6442', base: '#3f3018' },
        note: 'Multicelled oblong poroconidia borne sympodially on a geniculate conidiophore. The hilum is only slightly flattened and does not strongly protrude.'
      },
      {
        id: 'B',
        label: 'Exserohilum',
        name: 'Poroconidia, protruding hilum',
        colors: { slant: '#e3d9c8', butt: '#856640', base: '#432f16' },
        note: 'Elongated multicelled poroconidia with a strongly protruding hilum at the base. The projecting hilum is the main separator from Bipolaris.'
      }
    ],
    readoutTitle: 'Poroconidia comparison anchors',
    readoutRows: [
      ['Geniculate (zig-zag) conidiophore', 'Poroconidia group', 'Sympodial growth bends the conidiophore at each scar'],
      ['Oblong poroconidia, flat hilum', 'Bipolaris pattern', 'Hilum slightly flattened, not projecting'],
      ['Elongated conidia, protruding hilum', 'Exserohilum pattern', 'Projecting hilum is the key separator'],
      ['Sinus or subcutaneous source', 'Clinical context', 'Significance depends on source and host; interpret per SOP']
    ],
    trapTitle: 'Both make poroconidia; the hilum separates them',
    trapBody: 'Bipolaris, Exserohilum, and Drechslera all form multicelled poroconidia on geniculate conidiophores. Use the hilum: a flat scar favors Bipolaris, a strongly protruding hilum favors Exserohilum. Drechslera shows few conidia and is rare in clinical work.',
    trapBullets: [
      'Do not separate these by conidiophore shape alone.',
      'Examine the hilum at the conidial base before deciding.',
      'Use validated identification for clinically significant or sterile-site isolates.'
    ],
    interpretationTitle: 'Poroconidia interpretation guide',
    interpretationRows: [
      ['Oblong poroconidia, flat hilum', 'Bipolaris-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Elongated poroconidia, protruding hilum', 'Exserohilum-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Muriform conidia with beak', 'Alternaria pattern', 'Different conidial structure']
    ],
    takeaways: [
      'Bipolaris and Exserohilum are hilum-shape cards.',
      'A protruding hilum points to Exserohilum; a flat hilum points to Bipolaris.',
      'Clinical significance depends on specimen source and host context.'
    ],
    remember: 'Bipolaris = flat hilum. Exserohilum = protruding hilum. Both = geniculate poroconidia.',
    divr: {
      detect: 'Culture tease mount or tape prep showing pigmented mold; sinus or sterile site source',
      identify: ['Geniculate conidiophore with poroconidia', 'Bipolaris: flat hilum', 'Exserohilum: protruding hilum'],
      verify: 'Validated mold identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'cladosporium-shield-cells',
    title: 'Cladosporium: Shield Cells and Fragile Chains',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing Cladosporium: erect branching conidiophores with shield-shaped cells and fragile chains of elliptical dematiaceous blastoconidia.',
    boardTitle: 'Cladosporium: shield cells and easily dislodged conidial chains',
    boardNote: 'Cladosporium is a slow-growing dematiaceous mold. The anchors are shield-shaped cells at branch points and fragile branching chains of dark elliptical conidia that dislodge easily during mounting.',
    ariaLabel: 'Illustrated Cladosporium showing erect branching conidiophores with shield cells and chains of elliptical dematiaceous conidia',
    visualType: 'mycology-cladosporium',
    tubes: [
      {
        id: 'A',
        label: 'Shield cells',
        name: 'Branch-point cells with two scars',
        colors: { slant: '#dfe2cf', butt: '#5e6b40', base: '#2f3a1c' },
        note: 'Shield-shaped cells sit at branch points and bear two or more dark scars where conidia attach. These cells anchor the branching chains.'
      },
      {
        id: 'B',
        label: 'Conidial chains',
        name: 'Fragile branching chains',
        colors: { slant: '#dee1cd', butt: '#67703f', base: '#34391a' },
        note: 'Elliptical dark conidia form branching chains that break apart easily during mount preparation. Intact chains are best seen on a tape prep.'
      }
    ],
    readoutTitle: 'Cladosporium visual anchors',
    readoutRows: [
      ['Shield cells at branch points', 'Cladosporium pattern', 'Two or more dark attachment scars per cell'],
      ['Branching chains of conidia', 'Acropetal chain clue', 'Chains build outward and branch'],
      ['Chains dislodge during mounting', 'Fragility clue', 'Tape prep preserves intact chains better than a tease mount'],
      ['Skin, sinus, or environmental source', 'Clinical context', 'Often a contaminant; interpret with source and host per SOP']
    ],
    trapTitle: 'Fragile chains break, so absence of long chains is not exclusion',
    trapBody: 'Cladosporium conidial chains fall apart easily when slides are made, leaving scattered conidia that can be misread. Look for shield cells and dark attachment scars, and use a tape prep to keep chains intact.',
    trapBullets: [
      'Do not exclude Cladosporium just because chains look broken.',
      'Look for shield cells and dark hila as confirmatory clues.',
      'Distinguish a likely contaminant from a true pathogen using source and host context.'
    ],
    interpretationTitle: 'Cladosporium interpretation guide',
    interpretationRows: [
      ['Shield cells with branching dark chains', 'Cladosporium-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Collarette phialides with conidial clusters', 'Phialophora pattern', 'Different conidiogenous structure'],
      ['Mixed sporulation with denticles', 'Fonsecaea pattern', 'Compare chromoblastomycosis agents']
    ],
    takeaways: [
      'Cladosporium is a shield-cell card.',
      'Shield cells and fragile branching chains are the anchors.',
      'Tape prep preserves the chains that tease mounts tend to break.'
    ],
    remember: 'Cladosporium = shield cells plus fragile branching chains of dark conidia.',
    divr: {
      detect: 'Tape prep or culture tease mount of a slow-growing pigmented mold',
      identify: ['Shield cells with dark attachment scars', 'Branching chains of elliptical conidia', 'Chains fragile during mounting'],
      verify: 'Validated mold identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'chromoblastomycosis-agents',
    title: 'Chromoblastomycosis Agents: Sporulation Types',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual comparing how three chromoblastomycosis agents sporulate: Phialophora collarette phialides, Fonsecaea mixed denticulate types, and Cladophialophora long fragile chains.',
    boardTitle: 'Chromoblastomycosis agents: collarette, mixed denticulate, and long chains',
    boardNote: 'These agents share sclerotic bodies in tissue but differ in culture sporulation. Phialophora makes collarette phialides, Fonsecaea shows mixed denticulate sporulation, and Cladophialophora forms long fragile conidial chains.',
    ariaLabel: 'Illustrated comparison of Phialophora collarette phialides, Fonsecaea denticulate sporulation, and Cladophialophora long conidial chains',
    visualType: 'mycology-chromo-agents',
    tubes: [
      {
        id: 'A',
        label: 'Phialophora',
        name: 'Collarette phialides',
        colors: { slant: '#e0ddce', butt: '#6a5d40', base: '#352d1a' },
        note: 'Flask or cup-shaped phialides with a distinct saucer-like collarette. Oval conidia are produced through the apical pore and cluster near the opening.'
      },
      {
        id: 'B',
        label: 'Fonsecaea',
        name: 'Mixed denticulate sporulation',
        colors: { slant: '#ded9c9', butt: '#6f5b3a', base: '#382c16' },
        note: 'Mixed sporulation: single-celled conidia arise on short denticles around the conidiophore, with truncated short chains and some collarette types also present.'
      },
      {
        id: 'C',
        label: 'Cladophialophora',
        name: 'Long fragile conidial chains',
        colors: { slant: '#dde0cc', butt: '#5f6b3c', base: '#303a1a' },
        note: 'Long, sparsely branched, fragile chains of elliptical conidia without prominent shield cells. Chains break apart easily during mount preparation.'
      }
    ],
    readoutTitle: 'Chromoblastomycosis sporulation anchors',
    readoutRows: [
      ['Collarette phialides', 'Phialophora type', 'Saucer-like collarette with conidia at the apical pore'],
      ['Denticulate mixed sporulation', 'Fonsecaea type', 'Conidia on short denticles around the conidiophore'],
      ['Long fragile conidial chains', 'Cladophialophora type', 'Sparsely branched chains, no prominent shield cells'],
      ['Sclerotic bodies in tissue', 'Shared tissue form', 'All three produce muriform sclerotic bodies in tissue']
    ],
    trapTitle: 'Tissue form is shared, so culture sporulation separates the agents',
    trapBody: 'All three produce sclerotic bodies in tissue, so the tissue form cannot name the genus. Use culture sporulation: collarette phialides for Phialophora, mixed denticulate types for Fonsecaea, and long fragile chains for Cladophialophora.',
    trapBullets: [
      'Do not name the genus from sclerotic bodies alone.',
      'Read the culture sporulation type carefully; mixed types favor Fonsecaea.',
      'Use validated identification for clinically significant isolates.'
    ],
    interpretationTitle: 'Chromoblastomycosis agent interpretation guide',
    interpretationRows: [
      ['Collarette phialides with conidial clusters', 'Phialophora-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Mixed denticulate sporulation', 'Fonsecaea-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Long fragile conidial chains', 'Cladophialophora-compatible morphology', 'Confirm by validated mold ID workflow']
    ],
    takeaways: [
      'The agents share sclerotic bodies in tissue but differ in culture sporulation.',
      'Collarette, denticulate, and long-chain patterns separate the three genera.',
      'Mixed sporulation is a useful clue toward Fonsecaea.'
    ],
    remember: 'Phialophora collarette, Fonsecaea denticulate mix, Cladophialophora long chains; all = sclerotic bodies in tissue.',
    divr: {
      detect: 'Culture tease mount or slide culture of a slow-growing pigmented mold',
      identify: ['Phialophora: collarette phialides', 'Fonsecaea: mixed denticulate sporulation', 'Cladophialophora: long fragile chains'],
      verify: 'Validated mold identification workflow',
      report: 'Correlate with sclerotic bodies in tissue and SOP guidance'
    }
  },
  {
    slug: 'exophiala-black-yeast',
    title: 'Exophiala / Hortaea: Black Yeast to Annellophores',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual for recognizing black yeast morphology: early annellidic budding yeast cells maturing to tapered tube-like annellophores in Exophiala and Hortaea.',
    boardTitle: 'Black yeast: annellidic budding maturing to tapered annellophores',
    boardNote: 'Exophiala and related black yeasts start as dark budding yeast cells that reproduce by annellides, then mature into hyphae bearing tapered tube-like annellophores. The two-stage change is the teaching anchor.',
    ariaLabel: 'Illustrated black yeast showing early dark budding yeast cells and mature septate hyphae with tapered tube-like annellophores',
    visualType: 'mycology-exophiala',
    tubes: [
      {
        id: 'A',
        label: 'Young culture',
        name: 'Dark annellidic budding yeast',
        colors: { slant: '#ddd8c8', butt: '#5a4d36', base: '#2c2414' },
        note: 'Early growth shows dark yeast-like cells that bud by annellides rather than simple blastoconidia. Colonies are shiny and black at this stage.'
      },
      {
        id: 'B',
        label: 'Mature culture',
        name: 'Tapered tube-like annellophores',
        colors: { slant: '#dad6c6', butt: '#5f5238', base: '#2f2616' },
        note: 'With age, septate hyphae form annellophores that taper to a narrow tip. Clusters of oval to round conidia gather at and below the tip.'
      }
    ],
    readoutTitle: 'Black yeast visual anchors',
    readoutRows: [
      ['Dark budding yeast in young culture', 'Annellidic yeast clue', 'Reproduces by annellides; shiny black colony'],
      ['Tapered tube-like annellophores', 'Mature Exophiala clue', 'Narrowing tip with conidia clustered at the apex'],
      ['Shift from yeast to hyphae with age', 'Two-stage pattern', 'Young yeast matures into a mold-like culture'],
      ['Subcutaneous or skin source', 'Clinical context', 'Hortaea werneckii causes tinea nigra; interpret per SOP']
    ],
    trapTitle: 'Early black yeast can read as a simple budding yeast',
    trapBody: 'A young black yeast culture can resemble an ordinary budding yeast. Watch the culture mature: the appearance of tapered annellophores and septate hyphae confirms a dematiaceous black yeast rather than Candida or Cryptococcus.',
    trapBullets: [
      'Do not stop at budding yeast in a young dark culture.',
      'Let the culture mature to reveal annellophores and hyphae.',
      'Use validated identification for clinically significant isolates.'
    ],
    interpretationTitle: 'Black yeast interpretation guide',
    interpretationRows: [
      ['Dark budding yeast maturing to annellophores', 'Exophiala-compatible morphology', 'Confirm by validated mold ID workflow'],
      ['Tinea nigra with brown hyphae and yeast', 'Hortaea werneckii pattern', 'Correlate with superficial skin source'],
      ['Pale budding yeast, no pigment', 'Not a black yeast', 'Reconsider Candida or Cryptococcus']
    ],
    takeaways: [
      'Black yeasts shift from dark budding yeast to annellophore-bearing hyphae.',
      'Annellides and tapered annellophores separate them from Candida and Cryptococcus.',
      'Hortaea werneckii is the tinea nigra agent in this group.'
    ],
    remember: 'Black yeast = dark annellidic buds maturing to tapered annellophores.',
    divr: {
      detect: 'Culture tease mount over time; KOH of superficial skin for tinea nigra',
      identify: ['Dark annellidic budding yeast in young culture', 'Tapered tube-like annellophores at maturity', 'Pigmented septate hyphae'],
      verify: 'Validated mold identification workflow',
      report: 'Interpret with source, host status, and SOP guidance'
    }
  },
  {
    slug: 'aspergillus-species-comparison',
    title: 'Aspergillus Species: Conidial Head Comparison',
    eyebrow: 'Visual Atlas / Mycology',
    summary: 'Original bench-card visual comparing Aspergillus conidial heads: fumigatus compact columnar, niger biseriate radiate, flavus variable, and terreus with accessory aleurioconidia.',
    boardTitle: 'Aspergillus comparison: head shape and seriation across four species',
    boardNote: 'These four share septate acute-angle hyphae. Separate them by conidial head shape and seriation, not by hyphae. Keep species claims tied to culture morphology and validated workflow.',
    ariaLabel: 'Illustrated comparison of Aspergillus fumigatus, niger, flavus, and terreus conidial heads',
    visualType: 'mycology-aspergillus-comparison',
    tubes: [
      {
        id: 'A',
        label: 'A. fumigatus',
        name: 'Compact columnar, uniseriate',
        colors: { slant: '#d9ece8', butt: '#5c8a72', base: '#24443a' },
        note: 'Compact columnar head with phialides over the upper vesicle only (uniseriate). Conidia column points upward. Tolerates higher temperatures.'
      },
      {
        id: 'B',
        label: 'A. niger',
        name: 'Radiate biseriate, dark conidia',
        colors: { slant: '#e0dccf', butt: '#6a6048', base: '#33291a' },
        note: 'Large radiate head that splits into a full sphere, biseriate with metulae and phialides. Conidia are dark, giving black colonies.'
      },
      {
        id: 'C',
        label: 'A. flavus',
        name: 'Radiate, variable seriation, rough stalk',
        colors: { slant: '#e6e2cd', butt: '#8a8048', base: '#4a4018' },
        note: 'Radiate head that may be uniseriate, biseriate, or both. Conidiophore wall is rough. Colonies are often yellow-green.'
      },
      {
        id: 'D',
        label: 'A. terreus',
        name: 'Compact biseriate, aleurioconidia',
        colors: { slant: '#e7ddd0', butt: '#9a7c54', base: '#56381c' },
        note: 'Small compact columnar biseriate head, plus accessory aleurioconidia borne singly on the hyphae. The accessory conidia are the terreus clue.'
      }
    ],
    readoutTitle: 'Aspergillus comparison anchors',
    readoutRows: [
      ['Compact columnar, uniseriate', 'A. fumigatus pattern', 'Phialides on the upper vesicle only; thermotolerant'],
      ['Radiate biseriate, dark conidia', 'A. niger pattern', 'Full sphere head; black colonies'],
      ['Radiate, variable seriation, rough stalk', 'A. flavus pattern', 'Uni- or biseriate; yellow-green colonies'],
      ['Compact biseriate plus aleurioconidia', 'A. terreus pattern', 'Accessory hyphal conidia are the key separator']
    ],
    trapTitle: 'Hyphae are shared; the head tells the species group',
    trapBody: 'All four show septate acute-angle hyphae, so hyphae cannot separate them. Use head shape, seriation, conidiophore wall, and accessory structures, and keep species-level claims tied to culture morphology and validated workflow.',
    trapBullets: [
      'Do not separate Aspergillus species by hyphae alone.',
      'Note seriation (uniseriate vs biseriate) and head shape together.',
      'Confirm atypical or clinically significant isolates with MALDI or sequencing.'
    ],
    interpretationTitle: 'Aspergillus comparison interpretation guide',
    interpretationRows: [
      ['Compact columnar uniseriate head', 'A. fumigatus group', 'Confirm with culture morphology and validated workflow'],
      ['Radiate biseriate head, dark conidia', 'A. niger group', 'Correlate with black colony color'],
      ['Radiate variable head, rough stalk', 'A. flavus group', 'Correlate with yellow-green colony color'],
      ['Compact biseriate head plus aleurioconidia', 'A. terreus group', 'Look for accessory hyphal conidia']
    ],
    takeaways: [
      'Aspergillus species share hyphae but differ in conidial head structure.',
      'Track head shape, seriation, stalk texture, and accessory conidia together.',
      'Keep species-level identification tied to culture morphology and validated methods.'
    ],
    remember: 'fumigatus compact columnar, niger radiate dark, flavus rough variable, terreus aleurioconidia.',
    divr: {
      detect: 'Culture tease mount from a hyaline mold with septate acute-angle hyphae',
      identify: ['Head shape and seriation', 'Conidiophore wall texture', 'Colony color and accessory aleurioconidia'],
      verify: 'Culture morphology plus validated mold ID workflow',
      report: 'Use SOP-approved species-group language; confirm atypical isolates'
    }
  },
  {
    slug: 'viral-cytopathic-effect-panel',
    title: 'Viral Cytopathic Effect: Culture Pattern Panel',
    eyebrow: 'Visual Atlas / Virology',
    summary: 'Original bench-card visual for reviewing common cytopathic effect patterns in viral culture: rounding, syncytia, plaques, and inclusion-like change.',
    boardTitle: 'Viral CPE panel: read the cell monolayer pattern',
    boardNote: 'CPE is a pattern screen, not a final identification by itself. Read the distribution, cell shape, timing, and confirm with the laboratory algorithm.',
    ariaLabel: 'Illustrated viral cytopathic effect panel showing rounding, syncytia, plaques, and inclusion-like change',
    visualType: 'virology-cpe-panel',
    tubes: [
      {
        id: 'A',
        label: 'Rounding',
        name: 'Cells round up and detach',
        colors: { slant: '#eaf4f5', butt: '#78aeb7', base: '#245c69' },
        note: 'Monolayer cells become swollen, rounded, and refractile. Note timing and cell line, then confirm by method-specific testing.'
      },
      {
        id: 'B',
        label: 'Syncytia',
        name: 'Fused cells with shared cytoplasm',
        colors: { slant: '#eef1e6', butt: '#8cae7a', base: '#3f6b4f' },
        note: 'Multinucleated fused cells suggest a syncytial pattern. Use this as a visual clue, not a standalone organism call.'
      },
      {
        id: 'C',
        label: 'Plaques',
        name: 'Focal clearing in a monolayer',
        colors: { slant: '#f5eee3', butt: '#c9a26a', base: '#7a5530' },
        note: 'Discrete cleared foci show localized cell destruction. Plaque size and tempo can help organize the workup.'
      },
      {
        id: 'D',
        label: 'Inclusion-like',
        name: 'Altered nuclei or cytoplasm',
        colors: { slant: '#f4e9ee', butt: '#c27d99', base: '#74415a' },
        note: 'Dense nuclear or cytoplasmic changes can be a useful review anchor. Confirm with stain, antigen, molecular, or SOP-directed methods.'
      }
    ],
    readoutTitle: 'What to look for in viral culture',
    readoutRows: [
      ['Rounded refractile cells', 'General CPE pattern', 'Record cell line, timing, and distribution'],
      ['Multinucleated fused cells', 'Syncytial pattern', 'Think fusion pattern, then confirm by workflow'],
      ['Clear foci in monolayer', 'Plaque pattern', 'Localized lysis helps organize the read'],
      ['Nuclear or cytoplasmic change', 'Inclusion-like pattern', 'Use as an anchor, not a final ID']
    ],
    trapTitle: 'CPE points the workup, but it does not finish it',
    trapBody: 'Different viruses and cell lines can produce overlapping patterns. The safest study habit is to describe the pattern first, then connect it to the confirmatory method used by the lab.',
    trapBullets: [
      'Document timing and cell line with the morphology.',
      'Avoid naming a virus from CPE alone.',
      'Use antigen, stain, molecular, or validated culture confirmation as directed.'
    ],
    interpretationTitle: 'Viral CPE study interpretation guide',
    interpretationRows: [
      ['Diffuse rounding', 'CPE present', 'Continue with lab confirmation pathway'],
      ['Syncytia', 'Fusion-type CPE', 'Correlate with respiratory or herpesvirus-style algorithms'],
      ['Focal plaques', 'Localized lytic effect', 'Correlate with culture system and timing'],
      ['No CPE', 'No visible change at that read', 'Does not exclude virus if method sensitivity or timing is limited']
    ],
    takeaways: [
      'Start by describing the cell pattern before naming anything.',
      'Timing, cell line, and distribution matter.',
      'CPE is a screening clue that needs confirmation.'
    ],
    remember: 'CPE is the monolayer speaking. Describe it first, then confirm it.',
    divr: {
      detect: 'Cell culture monolayer with visible change',
      identify: ['Rounding', 'Syncytia', 'Plaques', 'Inclusion-like change'],
      verify: 'Confirm with validated stain, antigen, culture, or molecular workflow',
      report: 'Use SOP-approved result language'
    }
  },
  {
    slug: 'herpesvirus-cpe',
    title: 'Herpesvirus-Style CPE: Multinucleation and Molding',
    eyebrow: 'Visual Atlas / Virology',
    summary: 'Original bench-card visual for reviewing herpesvirus-style cytopathic effect, including multinucleation, nuclear molding, and marginated chromatin.',
    boardTitle: 'Herpesvirus-style CPE: the three M pattern',
    boardNote: 'For study purposes, group the pattern as multinucleation, molding, and margination. Confirm by the method used in the laboratory.',
    ariaLabel: 'Illustrated herpesvirus cytopathic effect showing multinucleated cells, nuclear molding, and marginated chromatin',
    visualType: 'virology-herpesvirus-cpe',
    tubes: [
      {
        id: 'A',
        label: 'Multinucleation',
        name: 'Several nuclei in one enlarged cell',
        colors: { slant: '#eef3f6', butt: '#91b7c2', base: '#285f72' },
        note: 'Fused enlarged cell with several nuclei. This is the easiest first anchor when reviewing herpesvirus-style CPE.'
      },
      {
        id: 'B',
        label: 'Molding',
        name: 'Nuclei press into each other',
        colors: { slant: '#f3eee6', butt: '#c5a171', base: '#765331' },
        note: 'Adjacent nuclei look crowded or shaped by contact. Read together with multinucleation and chromatin pattern.'
      },
      {
        id: 'C',
        label: 'Margination',
        name: 'Chromatin pushed to nuclear edge',
        colors: { slant: '#f5e8ec', butt: '#c9859a', base: '#743f57' },
        note: 'Chromatin appears rimmed at the nuclear membrane. In real work, confirm with stain, antigen, or molecular method.'
      }
    ],
    readoutTitle: 'Three M review anchors',
    readoutRows: [
      ['Multiple nuclei in one cell', 'Multinucleation', 'Fusion-type viral effect'],
      ['Nuclei press together', 'Molding', 'Crowded molded nuclear contours'],
      ['Rimmed chromatin', 'Margination', 'Chromatin pushed toward the edge']
    ],
    trapTitle: 'Do not turn the mnemonic into a diagnosis',
    trapBody: 'The three M pattern helps students recognize herpesvirus-style CPE, but the lab still relies on validated confirmation and specimen context.',
    trapBullets: [
      'Use the pattern as a visual recognition anchor.',
      'Confirm with the method in use, such as DFA, culture confirmation, or NAAT.',
      'Separate morphology review from clinical management.'
    ],
    interpretationTitle: 'Herpesvirus-style CPE guide',
    interpretationRows: [
      ['Multinucleation plus molding', 'Herpesvirus-style pattern', 'Confirm through validated workflow'],
      ['Single feature only', 'Incomplete pattern', 'Correlate with specimen and test method'],
      ['No visible CPE', 'No morphologic clue', 'Does not rule out infection in molecular-first workflows']
    ],
    takeaways: [
      'Use the three M pattern: multinucleation, molding, margination.',
      'Morphology helps recognition but confirmation carries the result.',
      'Keep wording tied to the method, not a visual guess.'
    ],
    remember: 'Herpesvirus-style CPE is a three M study pattern.',
    divr: {
      detect: 'Cell culture or cytology material with viral-type cell changes',
      identify: ['Multinucleation', 'Molding', 'Margination'],
      verify: 'Confirm with validated viral testing workflow',
      report: 'Report according to assay and SOP language'
    }
  },
  {
    slug: 'cmv-owl-eye-inclusion',
    title: 'CMV Inclusion Pattern: Owl-Eye Study Card',
    eyebrow: 'Visual Atlas / Virology',
    summary: 'Original bench-card visual for recognizing the classic cytomegalovirus inclusion pattern as a morphology review anchor.',
    boardTitle: 'CMV inclusion pattern: enlarged cell with owl-eye nucleus',
    boardNote: 'The study pattern is cytomegaly plus a large intranuclear inclusion and a surrounding halo. Use morphology as an anchor, not a complete result.',
    ariaLabel: 'Illustrated CMV owl-eye inclusion pattern with enlarged cell, intranuclear inclusion, and clear halo',
    visualType: 'virology-cmv-inclusion',
    tubes: [
      {
        id: 'A',
        label: 'Cytomegaly',
        name: 'Enlarged infected cell',
        colors: { slant: '#eef2f3', butt: '#8fb0ba', base: '#2d5c6a' },
        note: 'The cell is larger than its neighbors. Enlarged cell size sets up the CMV morphology clue.'
      },
      {
        id: 'B',
        label: 'Owl-eye',
        name: 'Dense intranuclear inclusion with halo',
        colors: { slant: '#f3e8ed', butt: '#ba7b96', base: '#6e3d55' },
        note: 'Large central intranuclear inclusion with a pale halo. Treat as a classic morphology anchor requiring method-based correlation.'
      }
    ],
    readoutTitle: 'CMV morphology anchors',
    readoutRows: [
      ['Enlarged cell', 'Cytomegaly', 'Cell size stands out from background cells'],
      ['Large intranuclear inclusion', 'Owl-eye pattern', 'Dense center with pale halo'],
      ['Background inflammation or tissue effect', 'Context clue', 'Correlate with specimen and method']
    ],
    trapTitle: 'Classic-looking does not mean standalone',
    trapBody: 'The owl-eye pattern is memorable, but virology results still depend on specimen type, stain, immunostain, culture, antigen, or molecular workflow.',
    trapBullets: [
      'Use the inclusion pattern as a study cue.',
      'Do not replace assay interpretation with morphology alone.',
      'Connect the finding to the method used by the lab.'
    ],
    interpretationTitle: 'CMV inclusion study guide',
    interpretationRows: [
      ['Cytomegaly plus owl-eye inclusion', 'CMV-style morphology', 'Confirm through method-specific workflow'],
      ['Small nonspecific nuclear change', 'Not enough for pattern call', 'Look for full size and inclusion pattern'],
      ['Molecular positive without visible inclusion', 'Method detects target, not morphology', 'Interpret through assay instructions']
    ],
    takeaways: [
      'CMV morphology is about cell size plus inclusion pattern.',
      'The halo helps the owl-eye clue stand out.',
      'Assay method and specimen context still control reporting.'
    ],
    remember: 'CMV is cytomegaly plus the owl-eye inclusion pattern.',
    divr: {
      detect: 'Enlarged cell or viral inclusion clue',
      identify: ['Cytomegaly', 'Large intranuclear inclusion', 'Halo'],
      verify: 'Correlate with validated stain, antigen, culture, or molecular method',
      report: 'Use method-specific result language'
    }
  },
  {
    slug: 'respiratory-virus-naat-panel',
    title: 'Respiratory Virus NAAT Panel: Result Logic',
    eyebrow: 'Visual Atlas / Virology',
    summary: 'Original bench-card visual for reviewing respiratory virus molecular panel logic from specimen to target result.',
    boardTitle: 'Respiratory NAAT panel: specimen to target result',
    boardNote: 'Molecular panels answer whether specific targets were detected in that specimen. They do not grade disease severity or replace specimen quality review.',
    ariaLabel: 'Illustrated respiratory virus NAAT panel workflow from specimen through extraction, amplification, target result, and interpretation note',
    visualType: 'virology-respiratory-naat',
    tubes: [
      {
        id: 'A',
        label: 'Specimen',
        name: 'Nasopharyngeal, nasal, or respiratory source',
        colors: { slant: '#eef3f1', butt: '#88b6aa', base: '#2c635a' },
        note: 'Start with source and collection quality. The result belongs to the submitted specimen and the assay targets on the panel.'
      },
      {
        id: 'B',
        label: 'Target detected',
        name: 'Amplification crosses threshold',
        colors: { slant: '#edf4f6', butt: '#74b3c0', base: '#245c69' },
        note: 'Detected means a target signal was found by that assay. Report wording follows the platform and laboratory SOP.'
      },
      {
        id: 'C',
        label: 'Not detected',
        name: 'No target signal above cutoff',
        colors: { slant: '#f4efe7', butt: '#c6aa78', base: '#725b34' },
        note: 'Not detected means no listed target was detected by that method. It does not prove absence of every respiratory virus.'
      }
    ],
    readoutTitle: 'Respiratory panel readout anchors',
    readoutRows: [
      ['Good specimen plus valid controls', 'Interpretable panel', 'Proceed to target-level readout'],
      ['Target detected', 'Assay target found', 'Use exact organism or target wording from the panel'],
      ['No listed target detected', 'Negative panel result', 'Limited to included targets and assay performance'],
      ['Invalid control', 'Uninterpretable run', 'Repeat or recollect per SOP']
    ],
    trapTitle: 'A panel is a target list, not a complete respiratory diagnosis',
    trapBody: 'Students should read panel results as assay-specific target detection. Collection quality, timing, targets included, and current SOP all matter.',
    trapBullets: [
      'Check controls before interpreting targets.',
      'Do not infer organisms that are not on the panel.',
      'Use the report language supported by the assay.'
    ],
    interpretationTitle: 'Respiratory NAAT interpretation guide',
    interpretationRows: [
      ['Detected target', 'Positive for that target', 'Report with exact assay wording'],
      ['Multiple targets detected', 'Co-detection pattern', 'Verify panel rules and reporting language'],
      ['All targets not detected', 'No included target detected', 'Correlate with collection quality and timing'],
      ['Invalid', 'No result', 'Repeat according to SOP']
    ],
    takeaways: [
      'Molecular panels detect targets included on the panel.',
      'Controls and specimen quality come before interpretation.',
      'Negative means not detected by that assay, not every virus excluded.'
    ],
    remember: 'NAAT reads targets in a specimen. Keep the wording that precise.',
    divr: {
      detect: 'Submitted respiratory specimen and valid assay controls',
      identify: ['Detected targets', 'Not detected targets', 'Invalid control state'],
      verify: 'Check platform rules and SOP reporting language',
      report: 'Report target-specific results only'
    }
  },
  {
    slug: 'hepatitis-b-serology-patterns',
    title: 'Hepatitis B Serology: Marker Pattern Study Card',
    eyebrow: 'Visual Atlas / Virology',
    summary: 'Original bench-card visual for learning common hepatitis B serology marker patterns without turning them into a clinical management algorithm.',
    boardTitle: 'HBV serology markers: surface, core, and immunity pattern',
    boardNote: 'Read HBsAg, anti-HBs, and anti-HBc together. This is a study anchor; real interpretation follows current lab algorithms and clinical context.',
    ariaLabel: 'Illustrated hepatitis B serology marker patterns for HBsAg, anti-HBs, anti-HBc IgM, and total anti-HBc',
    visualType: 'virology-hepatitis-b-serology',
    tubes: [
      {
        id: 'A',
        label: 'Susceptible',
        name: 'No HBV markers detected',
        colors: { slant: '#f5f1e8', butt: '#d6c394', base: '#7a693d' },
        note: 'HBsAg negative, anti-HBs negative, anti-HBc negative. Study pattern: no marker of infection or immunity detected.'
      },
      {
        id: 'B',
        label: 'Immune pattern',
        name: 'Anti-HBs present',
        colors: { slant: '#edf4ef', butt: '#8bb987', base: '#356d45' },
        note: 'Anti-HBs positive suggests an immunity marker. Anti-HBc helps separate vaccine-style pattern from past infection pattern.'
      },
      {
        id: 'C',
        label: 'Acute pattern',
        name: 'HBsAg plus anti-HBc IgM',
        colors: { slant: '#f3e8eb', butt: '#c28191', base: '#743d4d' },
        note: 'HBsAg positive with anti-HBc IgM positive is the classic acute-study pattern. Confirm and report according to the lab algorithm.'
      }
    ],
    readoutTitle: 'HBV marker anchors',
    readoutRows: [
      ['HBsAg', 'Surface antigen', 'Current antigen marker in classic patterns'],
      ['Anti-HBs', 'Surface antibody', 'Immunity marker'],
      ['Anti-HBc IgM', 'Core IgM antibody', 'Recent infection pattern marker'],
      ['Total anti-HBc', 'Core antibody history marker', 'Helps separate vaccine-style from infection-history patterns']
    ],
    trapTitle: 'HBV serology is a pattern read',
    trapBody: 'One marker alone can mislead. Students should read the marker set together and leave final reporting to the current laboratory algorithm.',
    trapBullets: [
      'Do not interpret anti-HBs without checking anti-HBc.',
      'IgM anti-HBc changes the pattern meaning.',
      'Use current SOP and public health reporting rules where applicable.'
    ],
    interpretationTitle: 'HBV serology study guide',
    interpretationRows: [
      ['All three common markers negative', 'Susceptible-style pattern', 'No serologic marker detected in this study set'],
      ['Anti-HBs only', 'Vaccine-style immunity pattern', 'Anti-HBc negative helps support this pattern'],
      ['Anti-HBs plus total anti-HBc', 'Past infection-style immunity pattern', 'HBsAg negative in the classic resolved pattern'],
      ['HBsAg plus anti-HBc IgM', 'Acute-style pattern', 'Use current lab algorithm for final interpretation']
    ],
    takeaways: [
      'HBV serology is read as a marker set.',
      'Anti-HBs alone is not the same as anti-HBs plus anti-HBc.',
      'Use study patterns, then follow the current lab algorithm.'
    ],
    remember: 'Surface antigen asks current marker. Surface antibody asks immunity. Core antibody asks exposure history.',
    divr: {
      detect: 'HBV serology marker set',
      identify: ['HBsAg', 'Anti-HBs', 'Anti-HBc IgM', 'Total anti-HBc'],
      verify: 'Compare the full marker pattern with current lab algorithm',
      report: 'Use validated interpretive comments and SOP language'
    }
  },
  {
    slug: 'hiv-screening-algorithm',
    title: 'HIV Screening Algorithm: Study Flow',
    eyebrow: 'Visual Atlas / Virology',
    summary: 'Original bench-card visual for reviewing the common HIV laboratory screening flow: Ag/Ab screen, differentiation assay, and NAT follow-up concept.',
    boardTitle: 'HIV screening study flow: screen, differentiate, resolve',
    boardNote: 'This is an educational review of laboratory logic. Real reporting follows the current testing algorithm, assay instructions, and facility SOP.',
    ariaLabel: 'Illustrated HIV screening algorithm showing antigen antibody screen, differentiation assay, and NAT follow-up concept',
    visualType: 'virology-hiv-screening',
    tubes: [
      {
        id: 'A',
        label: 'Ag/Ab screen',
        name: 'Initial combined screening assay',
        colors: { slant: '#eef2f5', butt: '#84aebe', base: '#2e6170' },
        note: 'A reactive screen starts the algorithm. It is a screening result and needs the next step defined by the laboratory workflow.'
      },
      {
        id: 'B',
        label: 'Differentiation',
        name: 'HIV-1 and HIV-2 antibody separation',
        colors: { slant: '#f0eee6', butt: '#c0a86d', base: '#756037' },
        note: 'Differentiation testing helps sort antibody reactivity patterns. Interpret with the exact assay and current algorithm.'
      },
      {
        id: 'C',
        label: 'NAT follow-up',
        name: 'RNA target used to resolve discordance',
        colors: { slant: '#f3e8ed', butt: '#bf829b', base: '#6e4058' },
        note: 'NAT is used in defined follow-up situations, especially discordant patterns. Keep wording tied to the validated workflow.'
      }
    ],
    readoutTitle: 'HIV algorithm study anchors',
    readoutRows: [
      ['Nonreactive screen', 'No screen reactivity', 'Report by assay language'],
      ['Reactive screen', 'Needs algorithm follow-up', 'Move to differentiation step'],
      ['Differentiation reactive', 'Antibody pattern identified', 'Use current reporting algorithm'],
      ['Screen reactive, differentiation nonreactive or indeterminate', 'Discordant pattern', 'NAT follow-up concept']
    ],
    trapTitle: 'Screening language matters',
    trapBody: 'The first test is a screen. Students should avoid final-sounding language until the algorithm is complete and the lab report language supports it.',
    trapBullets: [
      'Separate screening reactivity from final interpretation.',
      'Use the exact assay and algorithm wording.',
      'Do not use this card for clinical management decisions.'
    ],
    interpretationTitle: 'HIV screening study guide',
    interpretationRows: [
      ['Ag/Ab nonreactive', 'Screen nonreactive pattern', 'Report according to assay wording'],
      ['Ag/Ab reactive plus differentiation reactive', 'Confirmed algorithm pattern', 'Use current reporting language'],
      ['Ag/Ab reactive plus differentiation nonreactive', 'Needs NAT resolution', 'Follow the lab algorithm'],
      ['Indeterminate pattern', 'Unresolved by current step', 'SOP defines repeat or follow-up']
    ],
    takeaways: [
      'Think screen, differentiate, resolve.',
      'Reactive screening results need algorithm completion.',
      'Keep result language tied to the assay and SOP.'
    ],
    remember: 'HIV lab logic is screen first, differentiate next, NAT when the algorithm needs resolution.',
    divr: {
      detect: 'Initial HIV Ag/Ab screen result',
      identify: ['Screen reactivity', 'Differentiation pattern', 'Need for NAT resolution'],
      verify: 'Complete the current laboratory algorithm',
      report: 'Use approved assay and SOP wording'
    }
  },
  {
    slug: 'giardia-lamblia',
    title: 'Giardia lamblia: Trophozoite and Cyst',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Giardia trophozoite and cyst morphology in wet preparations and stained stool concentrates, including median body placement and nuclear arrangement.',
    boardTitle: 'Giardia lamblia: trophozoite and cyst',
    boardNote: 'Trophozoite (en face): bilateral symmetry, paired nuclei ("owl eyes"), two comma-shaped median bodies, ventral sucking disc. Lateral view: "shepherd\'s crook" shape. Cyst: oval, up to 4 nuclei, retracted curved axonemes.',
    ariaLabel: 'Illustrated Giardia lamblia trophozoite showing bilateral symmetry and paired nuclei, and cyst form showing four nuclei with retracted axonemes',
    visualType: 'microscope-giardia',
    tubes: [
      {
        id: 'A',
        label: 'Trophozoite',
        name: 'Bilateral symmetry, owl-eye nuclei, 2 comma-shaped median bodies',
        colors: { slant: '#e4ded4', butt: '#7c6fa2', base: '#4a3060' },
        note: '10-20 um. En face: bilateral symmetry, two nuclei ("owl eyes"), two comma-shaped median bodies (Giardia-specific). Lateral view: "shepherd\'s crook." Falling-leaf motility in saline wet mount.'
      },
      {
        id: 'B',
        label: 'Cyst',
        name: 'Oval cyst, curved axoneme fibrils on iodine',
        colors: { slant: '#e8d48a', butt: '#c49a3a', base: '#5c3210' },
        note: '8-14 um oval. Mature: 4 nuclei; immature: 1-2. Curved axoneme fibrils visible on iodine stain. Chlorine-resistant, environmentally stable.'
      }
    ],
    readoutTitle: 'What to look for by stage',
    readoutRows: [
      ['Pear shape, bilateral symmetry (en face)', 'Trophozoite', 'Mirror-symmetric from front to back when viewed face-on; most distinctive low-power clue'],
      ['"Shepherd\'s crook" or spoon shape (lateral)', 'Trophozoite', 'Lateral view - sucking disc curves one face; aids ID when en-face view is unavailable'],
      ['Paired anterior nuclei ("owl eyes")', 'Trophozoite', 'Two nuclei in anterior half, each with a small central karyosome; bilateral placement is key'],
      ['Two comma-shaped median bodies', 'Trophozoite', 'Posterior to nuclei; claw- or comma-shaped; unique to Giardia among intestinal protozoa - best seen on trichrome'],
      ['Oval cyst, <=4 nuclei, retracted fibrils', 'Cyst', 'Mature cyst has 4 nuclei; curved axoneme fibrils visible on iodine; nuclei may cluster at one end in immature forms'],
      ['Falling-leaf motility', 'Live trophozoite', 'Characteristic tumbling/rotating movement in saline wet mount; lost in cold or old specimens']
    ],
    trapTitle: 'Immature cysts with 1-2 nuclei are not a different species',
    trapBody: 'Immature Giardia cysts frequently show only 1-2 visible nuclei. This is a maturation stage, not a separate organism. Never exclude Giardia based on nuclear count alone - examine the full slide.',
    trapBullets: [
      'Trophozoites predominate in watery diarrheal stool; formed stool more often yields cysts only.',
      'Median bodies are Giardia-specific - no other intestinal protozoan has this structure.',
      'EIA antigen test and multiplex molecular panels offer higher sensitivity than O&P microscopy alone; use when clinical suspicion is high.'
    ],
    interpretationTitle: 'Giardia morphology identification guide',
    interpretationRows: [
      ['Bilateral symmetry, 2 nuclei, comma-shaped median bodies', 'Trophozoite', 'Trichrome stain shows median bodies and flagellar detail; saline wet mount captures motility'],
      ['Oval, <=4 nuclei, curved axoneme fibrils, thick cyst wall', 'Cyst', 'Iodine highlights nuclei and retracted fibrils; concentration method (formalin-ethyl acetate) improves yield'],
      ['Equivocal morphology or low-burden specimen', 'Confirm with EIA or NAAT', 'Antigen detection (EIA) and multiplex GI panels are more sensitive for light infections']
    ],
    takeaways: [
      'Bilateral symmetry (en face) and "shepherd\'s crook" (lateral) are the two views to know.',
      'Median bodies - comma-shaped, posterior to the nuclei - are unique to Giardia and confirm the identification.',
      'Cysts are chlorine-resistant, environmentally stable, and the infective stage; trophozoites do not survive outside a host.'
    ],
    remember: 'Two eyes (nuclei) + two commas (median bodies) = Giardia trophozoite. Oval + curved fibrils = cyst.',
    relatedLearnSlug: 'intestinal-protozoa',
    divr: {
      detect: 'Stool O&P - iodine wet prep (cysts), saline wet mount (trophozoite motility), or trichrome stain; formalin-ethyl acetate concentration',
      identify: ['Trophozoite: bilateral symmetry, paired owl-eye nuclei, 2 comma-shaped median bodies (Giardia-specific)', 'Lateral view: shepherd\'s crook shape', 'Cyst: oval 8-14 um, <=4 nuclei, curved axoneme fibrils visible on iodine'],
      verify: 'EIA antigen or multiplex GI PCR when morphology equivocal or clinical suspicion high',
      report: 'Report stage (trophozoite or cyst); confirm per lab SOP; clinical correlation required'
    }
  },
  {
    slug: 'cryptosporidium-oocyst',
    title: 'Cryptosporidium: Modified Acid-Fast Oocyst',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visual for recognizing Cryptosporidium oocysts on modified acid-fast stain: staining intensity variability, thick-wall vs. thin-wall biology, and yeast as the primary morphologic mimic.',
    boardTitle: 'Cryptosporidium oocyst: modified AFB vs. yeast comparator',
    boardNote: 'Oocysts stain pink-red (acid-fast positive) with variable intensity against malachite green. About 80% are thick-walled (passed in stool); about 20% are thin-walled (cause autoinfection). Yeast co-occurs and stays green.',
    ariaLabel: 'Illustrated Cryptosporidium oocysts shown pink-red against a blue-green background, and yeast comparator cells shown in green',
    visualType: 'microscope-cryptosporidium',
    tubes: [
      {
        id: 'A',
        label: 'Oocyst (AFB+)',
        name: 'Round 4-6 um, variable pink-red (AFB+)',
        colors: { slant: '#b8d4d8', butt: '#c8345a', base: '#8a1840' },
        note: '4-6 um round. Modified AFB: pink-red staining varies from bright to faint "ghost" on the same slide - variable intensity is expected. Contains 4 sporozoites; thick-walled (80%) exit in feces, thin-walled (20%) cause autoinfection.'
      },
      {
        id: 'B',
        label: 'Yeast (non-AFB)',
        name: 'Green, non-AFB - yeast mimic',
        colors: { slant: '#b8d4d8', butt: '#4a8c58', base: '#2a5c38' },
        note: '3-8 um, non-acid-fast: retains green counterstain. May bud or form pseudohyphae. A slide with only green structures = no Cryptosporidium.'
      }
    ],
    readoutTitle: 'What to look for on modified acid-fast stain',
    readoutRows: [
      ['Pink-red round structures, 4-6 um', 'Cryptosporidium oocysts (positive)', 'Staining intensity varies on the same slide - scan multiple fields before calling negative'],
      ['"Ghost" oocysts - correct size, no stain uptake', 'Possible over-decolorization or thin-walled oocysts', 'Thin-walled forms may not stain; IFA or molecular testing required for confirmation'],
      ['Four internal sporozoites (faint crescents)', 'Sporulated mature oocyst', 'Visible in some preparations at oil immersion; confirms identity when seen'],
      ['Green round structures, similar size', 'Non-acid-fast yeast (negative)', 'Retain malachite green counterstain; do not interpret as oocysts regardless of number or distribution'],
      ['Budding or pseudohyphal chains', 'Yeast - exclude Cryptosporidium', 'Cryptosporidium oocysts never bud'],
      ['Round structures >6 um', 'Consider other coccidia', 'Cyclospora cayetanensis: 8-10 um, acid-fast variable, autofluorescent; Cystoisospora belli: ~30 um - use size to differentiate']
    ],
    trapTitle: 'Staining intensity varies markedly - "ghost" oocysts are still real',
    trapBody: 'On the same modified AFB slide, some Cryptosporidium oocysts stain brightly, others faintly, and some appear nearly unstained. Scanning only for bright-pink structures causes false negatives. The correct approach is to scan the full smear and correlate size with a calibrated micrometer.',
    trapBullets: [
      'Always run positive and negative controls with every modified AFB batch - technique variation is the most common cause of false negatives.',
      'IFA (immunofluorescence) is more sensitive and specific than modified AFB for low-burden specimens and is preferred when available.',
      'Multiplex molecular GI panels (PCR) offer highest sensitivity, particularly in immunocompromised patients where thin-walled autoinfection cycles can cause massive oocyst shedding.'
    ],
    interpretationTitle: 'Cryptosporidium modified acid-fast interpretation',
    interpretationRows: [
      ['Pink-red (any intensity), round, 4-6 um, no budding', 'Cryptosporidium oocyst - positive', 'Note staining intensity and internal sporozoite detail if visible; report with size estimate'],
      ['Green, round, 3-8 um, may bud', 'Yeast - non-acid-fast, negative for Cryptosporidium', 'Document presence if clinically relevant (immunocompromised host); not Cryptosporidium'],
      ['Correct size, no staining, or equivocal', 'Indeterminate - confirm with IFA or molecular test', 'Do not report as negative based on morphology alone when clinical suspicion is high']
    ],
    takeaways: [
      'Modified AFB staining intensity is variable - scan the full slide; don\'t rely on bright-pink structures only.',
      'Thick-walled oocysts (80%) leave in stool -> infect new hosts. Thin-walled (20%) excyst in intestine -> autoinfection in immunocompromised patients.',
      'IFA and multiplex GI PCR panels are substantially more sensitive than modified AFB for low-burden or equivocal specimens.'
    ],
    remember: '4-6 um + any pink (even faint) + no budding = Cryptosporidium. Green = yeast. Variable staining on the same slide is expected.',
    relatedLearnSlug: 'intestinal-protozoa',
    divr: {
      detect: 'Stool or respiratory specimen - modified acid-fast stain (Kinyoun cold method or modified Ziehl-Neelsen); always run positive control',
      identify: ['Round 4-6 um oocysts, pink-red on modified AFB - intensity varies from bright to ghost on the same slide', '4 sporozoites visible as faint internal crescents in some preparations', 'Yeast mimic: green (non-AFB), may bud - negative for Cryptosporidium'],
      verify: 'IFA or multiplex GI PCR for equivocal or low-burden cases; IFA preferred when available',
      report: 'Report as Cryptosporidium oocysts detected; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'entamoeba-histolytica',
    title: 'Entamoeba histolytica: Trophozoite and Cyst',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing E. histolytica/dispar trophozoite and cyst morphology, with nuclear structure detail, erythrophagocytosis as the pathogenicity clue, and E. coli chromatoid comparison.',
    boardTitle: 'Entamoeba histolytica: trophozoite and cyst',
    boardNote: 'Trophozoite: ameboid, single nucleus (central karyosome, fine even peripheral chromatin), ingested RBCs = pathogenic E. histolytica. Cyst: round, <=4 nuclei, chromatoidal bars with smooth blunt ends (vs. E. coli: splintered).',
    ariaLabel: 'Illustrated Entamoeba histolytica trophozoite showing ameboid shape and ingested RBCs, and cyst form showing four nuclei and chromatoidal bars',
    visualType: 'microscope-entamoeba',
    tubes: [
      {
        id: 'A',
        label: 'Trophozoite',
        name: 'Ameboid - ingested RBCs = pathognomonic',
        colors: { slant: '#dce8d0', butt: '#7898b8', base: '#3a5870' },
        note: '12-60 um ameboid. Ingested RBCs = E. histolytica (pathognomonic). Central karyosome + fine even peripheral chromatin. Explosive unidirectional pseudopod motility in fresh saline mount.'
      },
      {
        id: 'B',
        label: 'Cyst',
        name: 'Round cyst, blunt chromatoid bars',
        colors: { slant: '#e8d890', butt: '#c4a040', base: '#5c3210' },
        note: '10-20 um round. Mature: 4 nuclei with central karyosome, fine even chromatin. Chromatoidal bars: smooth blunt ends (vs. E. coli: splintered, pointed). Iodine stain shows glycogen mass in immature cysts.'
      }
    ],
    readoutTitle: 'What to look for by stage',
    readoutRows: [
      ['Ingested RBCs in trophozoite cytoplasm', 'E. histolytica - pathogenic (treat)', 'Erythrophagocytosis is pathognomonic; the only morphologic feature separating histolytica from dispar'],
      ['Central karyosome, fine even peripheral chromatin', 'E. histolytica/dispar nucleus', 'Compare to E. coli: eccentric karyosome + coarse, irregular peripheral chromatin - nucleus structure is the secondary level of ID'],
      ['Ameboid, unidirectional pseudopods', 'Live trophozoite', 'Explosive, directional motility; non-directional tumbling = non-pathogenic amoebae'],
      ['Round cyst, 1-4 nuclei, same nuclear structure', 'E. histolytica/dispar cyst', 'Mature cyst: 4 nuclei; immature: 1-2 with visible glycogen mass (brown on iodine, fades with maturation)'],
      ['Chromatoidal bars - smooth, blunt, rounded ends', 'E. histolytica/dispar cyst (not E. coli)', 'Blunt ends = Entamoeba histolytica/dispar group; pointed, splintered, irregular ends = E. coli'],
      ['Ingested bacteria or debris, no RBCs', 'Non-pathogenic amoeba or E. histolytica/dispar', 'Non-specific; bacteria ingestion does not confirm or exclude pathogenicity']
    ],
    trapTitle: 'E. histolytica and E. dispar are morphologically identical without ingested RBCs',
    trapBody: 'E. dispar is morphologically indistinguishable from E. histolytica by O&P examination when erythrophagocytosis is absent. E. dispar is nonpathogenic and far more prevalent worldwide. Reporting as E. histolytica without RBC ingestion or confirmatory testing leads to unnecessary treatment.',
    trapBullets: [
      'E. hartmanni is a smaller nonpathogenic species: trophozoite <10 um, cyst <8 um - size alone differentiates it from E. histolytica/dispar.',
      'Chromatoidal bar end-shape (blunt vs. splintered) is the most reliable cyst-level distinction from E. coli cysts.',
      'E. histolytica EIA antigen or PCR is required for species-level confirmation; report as "E. histolytica/dispar complex" when molecular testing is unavailable and RBCs are not seen.'
    ],
    interpretationTitle: 'Entamoeba histolytica morphology identification guide',
    interpretationRows: [
      ['Ameboid trophozoite, ingested RBCs present', 'E. histolytica - pathogenic; report and treat', 'Erythrophagocytosis is morphologic proof of pathogenicity; no further testing needed before clinical action'],
      ['Ameboid trophozoite, no RBCs, correct nuclear structure', 'E. histolytica/dispar complex', 'Morphology alone insufficient; send EIA antigen test or PCR for species-level identification'],
      ['Round cyst, <=4 nuclei, blunt chromatoids', 'E. histolytica/dispar cyst', 'Note nuclear count and chromatoid detail; confirm species before treatment; blunt ends rule out E. coli']
    ],
    takeaways: [
      'Ingested RBCs in a trophozoite = E. histolytica - the only morphologic proof of pathogenicity.',
      'Nuclear structure: central karyosome + fine even peripheral chromatin = E. histolytica/dispar group. Eccentric karyosome + coarse chromatin = E. coli.',
      'Blunt chromatoidal bars = E. histolytica/dispar cyst; splintered/irregular = E. coli cyst.'
    ],
    remember: 'RBCs ingested = E. histolytica (treat). No RBCs = report as E. histolytica/dispar complex. Blunt bars vs. splintered bars = histolytica/dispar vs. E. coli.',
    relatedLearnSlug: 'intestinal-protozoa',
    divr: {
      detect: 'Stool O&P - trichrome or iron-hematoxylin stain; iodine wet prep for cysts; fresh warm specimen for trophozoite motility',
      identify: ['Trophozoite: ameboid, ingested RBCs = pathognomonic for E. histolytica (not E. dispar)', 'Nuclear structure: central karyosome + fine even peripheral chromatin (vs. E. coli: eccentric karyosome, coarse chromatin)', 'Cyst: round <=4 nuclei, smooth blunt chromatoid bar ends'],
      verify: 'Without RBCs, cannot distinguish E. histolytica from E. dispar by morphology - EIA antigen or PCR required for species ID',
      report: 'RBCs present: report E. histolytica (pathogenic). No RBCs: report E. histolytica/dispar complex; confirm species per SOP before treatment decision'
    }
  },
  {
    slug: 'trichomonas-vaginalis',
    title: 'Trichomonas vaginalis: Wet Mount and Stained',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Trichomonas vaginalis by wet mount motility pattern and stained morphology: 4 free anterior flagella, 1 recurrent flagellum forming the undulating membrane, and the rigid axostyle.',
    boardTitle: 'Trichomonas vaginalis: wet mount vs. stained preparation',
    boardNote: 'Trophozoite only, no cyst stage. Wet mount: tumbling/spinning motility, 4 free anterior flagella, undulating membrane (1 recurrent flagellum runs about 2/3 body length). Stained: pear shape, anterior nucleus, axostyle protrusion visible.',
    ariaLabel: 'Illustrated Trichomonas vaginalis trophozoite in wet mount showing flagella and undulating membrane, and in stained preparation with more defined morphology',
    visualType: 'microscope-trichomonas',
    tubes: [
      {
        id: 'A',
        label: 'Wet Mount',
        name: 'Tumbling motility, 4 anterior flagella',
        colors: { slant: '#f0ede6', butt: '#9ab0c0', base: '#3a6070' },
        note: '7-30 um. Tumbling jerky motility: 4 free anterior flagella + undulating membrane (1 recurrent flagellum, ~2/3 body length). Axostyle protrudes from posterior end. Process within 30 min - motility lost rapidly.'
      },
      {
        id: 'B',
        label: 'Stained',
        name: 'Pear shape, axostyle visible on stain',
        colors: { slant: '#d4e4c8', butt: '#6a7ab4', base: '#2c3c78' },
        note: 'Pear shape, single anterior nucleus, axostyle visible posteriorly. Flagella and undulating membrane countable on Giemsa or Pap stain. NAAT is the diagnostic standard; stain is backup when motility is lost.'
      }
    ],
    readoutTitle: 'What to look for by preparation',
    readoutRows: [
      ['Tumbling, jerky, non-progressive motility', 'Live trophozoite - wet mount positive', 'Most reliable real-time clue; must process specimen within ~30 min of collection to preserve motility'],
      ['4 free anterior flagella', 'Trophozoite', 'Four flagella project from the anterior end; individually countable on stained smear; confirm with undulating membrane'],
      ['Undulating membrane (~2/3 body length)', 'Trophozoite', '1 recurrent flagellum forms the membrane edge; rippling movement contributes to rotational motility'],
      ['Axostyle - posterior pointed protrusion', 'Trophozoite', 'Rigid rod runs longitudinally through the organism; protruding tip visible at posterior end on wet mount and stained preparations'],
      ['Single anterior nucleus', 'Trophozoite', 'Vesicular chromatin; anterior placement; no cyst stage - only trophozoites are diagnostically relevant'],
      ['No cyst found', 'Expected - T. vaginalis has no cyst stage', 'Absence of cysts is a feature, not a gap; cyst-forming species (Trichomonas tenax, T. hominis) are nonpathogenic commensals']
    ],
    trapTitle: 'Wet mount sensitivity is ~60-70% - a negative result does not exclude infection',
    trapBody: 'Motility is lost within minutes to hours at low temperature or in old specimens. Many false negatives on wet mount are due to delayed processing, cold transport, or low parasite burden. A single negative wet mount should not be used to rule out T. vaginalis in a symptomatic patient.',
    trapBullets: [
      'NAAT (molecular testing) has sensitivity >95% and is the current standard of care recommended by CDC; wet mount is a screening tool only.',
      'WBCs in vaginal specimens are motile and can be mistaken for trophozoites at low magnification - confirm pear shape and flagella at higher power.',
      'T. vaginalis has no cyst stage; any round cyst-like structure in a vaginal specimen is a different organism (or artifact).'
    ],
    interpretationTitle: 'Trichomonas vaginalis identification guide',
    interpretationRows: [
      ['Tumbling motility + pear shape + flagella', 'T. vaginalis - positive; report and treat', 'Report immediately; process time is critical - motility lost rapidly'],
      ['Pear shape, axostyle, 4 flagella on stain', 'T. vaginalis - stained morphology positive', 'Acceptable for diagnosis when wet mount is unavailable; confirm with NAAT if feasible'],
      ['No motile organisms; no flagellated cells on stain', 'Wet mount / stain negative - not definitive', 'Do not exclude infection; send NAAT; clinical history of vaginal discharge, odor, or pH >4.5 increases pretest probability']
    ],
    takeaways: [
      'Tumbling motility + 4 anterior flagella + undulating membrane = T. vaginalis on wet mount - process within 30 minutes.',
      'No cyst stage: every motile flagellated cell in a vaginal saline prep is either T. vaginalis or a non-pathogenic flagellate - use size and motility pattern to discriminate.',
      'NAAT sensitivity >95% vs. ~60% for wet mount; a negative wet mount must be followed by NAAT in symptomatic patients.'
    ],
    remember: 'Wet mount negative ≠ infection excluded. NAAT is the standard. 4 anterior flagella + undulating membrane = T. vaginalis.',
    relatedLearnSlug: 'urogenital-parasites',
    divr: {
      detect: 'Vaginal or urethral swab - saline wet mount (process within 30 min of collection); Giemsa or Pap stain if motility is lost',
      identify: ['Tumbling, jerky rotational motility on wet mount', '4 free anterior flagella + undulating membrane (~2/3 body length)', 'Axostyle protrudes from posterior end; no cyst stage'],
      verify: 'NAAT (sensitivity >95%) is the diagnostic standard; negative wet mount alone does not exclude infection',
      report: 'Wet mount positive: report T. vaginalis; negative wet mount - send NAAT per SOP before excluding; clinical correlation required'
    }
  },
  {
    slug: 'enterobius-vermicularis-egg',
    title: 'Enterobius vermicularis: Perianal Tape Prep Egg',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Enterobius vermicularis (pinworm) eggs on perianal tape prep: asymmetric D-shape, thin colorless shell, and visible internal larva.',
    boardTitle: 'Enterobius vermicularis egg: tape prep morphology',
    boardNote: 'D-shaped (one flat side), thin colorless shell, 50-60 x 20-30 um. Contains fully developed larva when freshly deposited. Collected by perianal tape prep (cellophane tape or Swube paddle), not routine O&P stool exam.',
    ariaLabel: 'Illustrated Enterobius vermicularis egg showing asymmetric D-shape with visible internal larva on tape prep background',
    visualType: 'microscope-enterobius',
    tubes: [
      {
        id: 'A',
        label: 'Egg (fresh)',
        name: 'D-shaped, thin colorless shell, visible larva inside',
        colors: { slant: '#eee8d8', butt: '#b0a070', base: '#5a4820' },
        note: '50-60 x 20-30 um. Asymmetric: one side flat, one side curved - the definitive shape clue. Thin, colorless shell. Fully developed larva visible inside when freshly collected. NOT found by routine stool O&P - requires perianal tape prep.'
      },
      {
        id: 'B',
        label: 'Egg (hatched/older)',
        name: 'Collapsed shell, larva absent or indistinct, may appear flattened',
        colors: { slant: '#e4dcc8', butt: '#8a7858', base: '#3a2c10' },
        note: 'Older or post-hatch eggs lose internal larval detail and the shell may appear wrinkled or collapsed. Still D-shaped in outline. Distinction from fresh egg is primarily internal content - shell outline persists. Correct collection timing (early morning, before bathing) maximizes fresh egg yield.'
      }
    ],
    readoutTitle: 'What to look for on tape prep',
    readoutRows: [
      ['D-shaped egg, one flat side', 'Enterobius vermicularis', 'Asymmetric shape is pathognomonic - no other intestinal helminth egg has this morphology'],
      ['Visible larva inside', 'Fresh egg - confirms identity', 'Larval detail fades in older preparations; shape alone is sufficient for ID'],
      ['Thin colorless shell, 50-60 um', 'E. vermicularis', 'Shell is much thinner than Ascaris or Trichuris; no thick outer coat'],
      ['Round or oval symmetric eggs on tape', 'Not E. vermicularis', 'Symmetric oval eggs on tape prep may be environmental contaminants or artifact; pinworm eggs are D-shaped'],
      ['No eggs on tape', 'Possible false negative', 'Collect 3 consecutive early-morning preps before calling negative; eggs deposited nocturnally']
    ],
    trapTitle: 'Pinworm eggs are not found on routine O&P stool exam',
    trapBody: 'Enterobius eggs are deposited perianally, not in feces. Routine ova and parasite examination of stool will miss most infections. The correct method is perianal tape prep collected in the early morning before bathing or defecation, on 3 consecutive days.',
    trapBullets: [
      'Female worms migrate nocturnally to deposit eggs perianally - daytime collection significantly reduces yield.',
      'D-shaped asymmetric outline is diagnostic; larvae inside confirm freshness but are not required for ID.',
      'Most common helminth infection in the US; school-age children are the highest-risk group.'
    ],
    interpretationTitle: 'Enterobius tape prep interpretation guide',
    interpretationRows: [
      ['D-shaped egg, flat side, thin shell, larva inside', 'Enterobius vermicularis - positive', 'Report and treat; household contacts should also be evaluated given fecal-oral and environmental transmission'],
      ['D-shaped outline, collapsed shell, no larval detail', 'Enterobius vermicularis - positive (older egg)', 'Shape alone is sufficient for ID; report as positive'],
      ['No eggs on 1 tape prep', 'Indeterminate - false negative likely', 'Collect 3 consecutive early-morning preps; sensitivity increases to ~90% with 3 exams']
    ],
    takeaways: [
      'D-shaped (asymmetric, one flat side) is the diagnostic clue - no other worm egg has this shape.',
      'Tape prep only: routine stool O&P will miss Enterobius in virtually all cases.',
      'Collect early morning on 3 consecutive days for best sensitivity.'
    ],
    remember: 'D-shape + thin shell + larva inside = Enterobius egg. Tape prep, not O&P.',
    divr: {
      detect: 'Perianal tape prep (cellophane tape or Swube paddle), early morning before bathing - NOT routine stool O&P',
      identify: ['D-shaped egg: one flat side, one curved side - pathognomonic outline', 'Thin colorless shell, 50-60 x 20-30 um', 'Larva visible inside in fresh preparations'],
      verify: 'D-shape is pathognomonic; collect 3 consecutive early-morning preps for ~90% sensitivity',
      report: 'Report as Enterobius vermicularis eggs present; note collection timing; do not report from single artifact-like structure'
    }
  },
  {
    slug: 'strongyloides-stercoralis-larva',
    title: 'Strongyloides stercoralis: Rhabditiform Larva',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Strongyloides stercoralis rhabditiform larva in fresh stool: short buccal channel and visible genital primordium as the key morphologic clues against hookworm larval mimic.',
    boardTitle: 'Strongyloides stercoralis: rhabditiform vs. filariform larva',
    boardNote: 'Rhabditiform (passed in stool): short buccal channel (key vs. hookworm: long buccal channel), genital primordium visible. Filariform (infective): longer, notched tail, no genital primordium. Size ~250 um (rhabditiform).',
    ariaLabel: 'Illustrated Strongyloides stercoralis rhabditiform larva showing short buccal channel and genital primordium, with filariform comparator',
    visualType: 'microscope-strongyloides',
    tubes: [
      {
        id: 'A',
        label: 'Rhabditiform',
        name: 'Short buccal channel, genital primordium visible, ~250 um',
        colors: { slant: '#e8f0e0', butt: '#6a9860', base: '#2a4820' },
        note: '~250 um. Short buccal channel is the primary clue vs. hookworm larvae (long buccal channel). Genital primordium: a cluster of cells visible in the mid-body - not present in hookworm rhabditiform larvae. Found in fresh stool; Baermann or agar plate method improves sensitivity. The stage passed in stool in primary infections.'
      },
      {
        id: 'B',
        label: 'Filariform',
        name: 'Notched tail, ~550 um, infective stage',
        colors: { slant: '#d8e8d0', butt: '#4a7848', base: '#1a3810' },
        note: '~550 um. Infective stage - develops from rhabditiform in soil or intestine (autoinfection). Notched tail (vs. hookworm filariform: pointed tail). No genital primordium. Finding filariform larvae in stool suggests hyperinfection - a clinical emergency in immunocompromised patients.'
      }
    ],
    readoutTitle: 'What to look for by larval stage',
    readoutRows: [
      ['Short buccal channel', 'Strongyloides rhabditiform', 'Most critical clue vs. hookworm rhabditiform larvae which have a longer buccal channel'],
      ['Genital primordium (cell cluster, mid-body)', 'Strongyloides rhabditiform', 'Not present in hookworm larvae; confirms Strongyloides when visible'],
      ['Notched tail', 'Strongyloides filariform larva', 'Hookworm filariform has a pointed tail - use tail shape to differentiate infective stages'],
      ['~250 um length, actively motile', 'Rhabditiform in fresh stool', 'Must examine fresh warm stool (within 1-2 hours) or use Baermann/agar plate method'],
      ['Filariform larvae in stool (not soil-exposed)', 'Possible hyperinfection or dissemination', 'In immunocompromised hosts, finding filariform in stool or other sites warrants urgent evaluation']
    ],
    trapTitle: 'Hookworm rhabditiform larvae are the primary mimic',
    trapBody: 'If hookworm eggs are also present (Strongyloides does not pass eggs in stool), larvae may hatch from hookworm eggs in old stool specimens. The short buccal channel and genital primordium of Strongyloides are the critical distinguishing features.',
    trapBullets: [
      'Strongyloides does not pass eggs in stool - finding rhabditiform larvae without eggs is expected for Strongyloides.',
      'Hookworm passes eggs (not larvae) in fresh stool; larvae only appear if stool sits at room temperature >24 h.',
      'Strongyloides serology (ELISA) is highly sensitive and often the preferred initial test; O&P sensitivity for Strongyloides is low in light infections.'
    ],
    interpretationTitle: 'Strongyloides larval identification guide',
    interpretationRows: [
      ['Rhabditiform larva, short buccal channel, genital primordium', 'Strongyloides stercoralis', 'Report and treat; evaluate for hyperinfection risk (immunosuppression, steroid use)'],
      ['Rhabditiform larva, long buccal channel, no genital primordium', 'Hookworm rhabditiform (from hatched egg)', 'Confirm by finding hookworm eggs in the same specimen; examine fresh stool only'],
      ['Filariform larva in stool, notched tail', 'Strongyloides filariform - possible hyperinfection', 'Urgent: assess immune status; filariform larvae may carry gut bacteria causing sepsis in hyperinfection syndrome']
    ],
    takeaways: [
      'Short buccal channel + genital primordium = Strongyloides rhabditiform (vs. hookworm: long buccal channel, no genital primordium).',
      'Strongyloides passes larvae, not eggs - rhabditiform larvae in stool without eggs = Strongyloides until proven otherwise.',
      'Filariform larvae in stool = possible hyperinfection: assess immune status urgently.'
    ],
    remember: 'Short buccal channel + genital primordium = Strongyloides. Long buccal channel = hookworm. Filariform in stool = hyperinfection risk.',
    divr: {
      detect: 'Fresh stool (<2 h); Baermann funnel or agar plate culture improves sensitivity; serology (ELISA) for chronic or low-burden cases',
      identify: ['Rhabditiform: short buccal channel (key vs. hookworm: long), genital primordium visible mid-body', 'Filariform: notched tail, longer (~550 um), no genital primordium', 'Strongyloides passes larvae - not eggs - in stool'],
      verify: 'Hookworm rhabditiform mimic: long buccal channel, no genital primordium; serology sensitive for chronic infections',
      report: 'Report larval stage (rhabditiform or filariform); if filariform present in stool, note possible hyperinfection - clinical correlation required'
    }
  },
  {
    slug: 'hookworm-egg',
    title: 'Hookworm: Oval Thin-Shelled Egg with Morula',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing hookworm eggs (Ancylostoma duodenale and Necator americanus) in stool: oval, thin-shelled, with segmented morula and a clear space between shell and embryo.',
    boardTitle: 'Hookworm egg: thin shell, morula, clear space',
    boardNote: 'Oval, 55-75 x 35-45 um, thin colorless shell with a visible clear space between shell and embryo. Contains 2-8 cell morula in freshly passed stool. A. duodenale and N. americanus eggs are morphologically identical.',
    ariaLabel: 'Illustrated hookworm egg showing thin colorless oval shell with segmented morula and clear space inside',
    visualType: 'microscope-hookworm',
    tubes: [
      {
        id: 'A',
        label: 'Fresh egg',
        name: 'Oval, thin shell, morula, clear space',
        colors: { slant: '#ece8d8', butt: '#a09068', base: '#4a3818' },
        note: '55-75 x 35-45 um. Oval. Thin, colorless shell. Clear (unstained) space between shell wall and embryo. Contains 2-8 cell morula in freshly passed stool. In old specimens, larva may develop and hatch - do not examine stool older than 24 h without refrigeration.'
      },
      {
        id: 'B',
        label: 'Embryonated egg',
        name: 'Developed larva inside, shell intact, found in old or held specimens',
        colors: { slant: '#e0dcc8', butt: '#7a6848', base: '#3a2810' },
        note: 'If stool is not examined fresh, hookworm eggs embryonate and may hatch, releasing rhabditiform larvae that mimic Strongyloides. Key: fresh hookworm stool shows morula (not larvae). Finding larvae in fresh stool (not old specimen) = Strongyloides. Refrigerate stool if processing is delayed.'
      }
    ],
    readoutTitle: 'What to look for in fresh stool',
    readoutRows: [
      ['Oval, thin colorless shell, 55-75 um', 'Hookworm egg', 'Thin shell + clear space between shell and morula is the bench clue; size distinguishes from Strongyloides (no eggs in stool)'],
      ['2-8 cell morula inside', 'Fresh hookworm egg', 'Morula = recently passed egg; well-developed larva inside = old specimen held at room temperature'],
      ['Clear (unstained) space between shell and embryo', 'Hookworm - present in fresh specimens', 'Space shrinks as embryo develops; its presence confirms freshness'],
      ['Thin shell without knobbed outer coat', 'Hookworm - not Ascaris', 'Ascaris lumbricoides eggs have a thick outer coat (fertile) or no outer coat (unfertile); hookworm has a thin, smooth shell'],
      ['Larvae in fresh stool (no eggs)', 'Strongyloides, not hookworm', 'Hookworm larvae appear only in old stool; Strongyloides passes larvae in fresh stool']
    ],
    trapTitle: 'Old stool specimens produce hookworm larvae that mimic Strongyloides',
    trapBody: 'Hookworm eggs hatch at room temperature within hours to days. If a stool specimen is not examined fresh, larvae present may be hookworm-derived - not Strongyloides. Always correlate with specimen age and storage conditions.',
    trapBullets: [
      'A. duodenale and N. americanus are morphologically identical - species differentiation requires larval culture or molecular testing.',
      'Hookworm eggs stain poorly with iodine; wet preparation (normal saline or iodine) is standard for O&P.',
      'Concentration methods (formalin-ethyl acetate sedimentation or zinc sulfate flotation) improve sensitivity for light infections.'
    ],
    interpretationTitle: 'Hookworm egg identification guide',
    interpretationRows: [
      ['Oval, thin shell, morula, clear space - fresh stool', 'Hookworm egg - positive', 'Report and treat; species ID (A. duodenale vs. N. americanus) not required clinically'],
      ['Oval, thin shell, larvae inside - old stool', 'Hookworm egg (embryonated) - positive, note specimen age', 'Confirm specimen was not fresh; larvae in old stool from hookworm eggs do not indicate Strongyloides'],
      ['Thin-shelled egg, no outer coat, similar size', 'Hookworm vs. other nematodes', 'Compare size and shell structure; Trichuris is barrel-shaped with bipolar plugs; Ascaris has thick coat']
    ],
    takeaways: [
      'Thin colorless oval shell + morula + clear space = hookworm egg in fresh stool.',
      'Never examine stool older than 24 h at room temperature for helminth larvae - hatched larvae may be mistaken for Strongyloides.',
      'A. duodenale and N. americanus eggs cannot be morphologically distinguished; species ID is not clinically required.'
    ],
    remember: 'Oval + thin shell + morula + clear space = hookworm. Fresh stool only for larvae differentiation.',
    divr: {
      detect: 'Fresh stool (<24 h at room temp) - saline or iodine wet prep; formalin-ethyl acetate sedimentation concentration',
      identify: ['Oval, thin colorless shell, 55-75 x 35-45 um', 'Clear space between shell wall and embryo', '2-8 cell morula in freshly passed stool; larvae only appear in old or held specimens'],
      verify: 'A. duodenale and N. americanus morphologically identical - species differentiation not clinically required; larvae in old stool may be hookworm-derived, not Strongyloides',
      report: 'Report as hookworm eggs detected; note specimen freshness; clinical correlation required'
    }
  },
  {
    slug: 'trichuris-trichiura-egg',
    title: 'Trichuris trichiura: Barrel-Shaped Egg with Bipolar Plugs',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Trichuris trichiura (whipworm) eggs in stool: barrel-shaped brown shell with hyaline bipolar plugs at each end - one of the most visually distinctive helminth eggs.',
    boardTitle: 'Trichuris trichiura egg: barrel shape and bipolar plugs',
    boardNote: 'Barrel-shaped (football-shaped), golden-brown shell, 50-55 x 22-24 um. Hyaline (colorless) plugs protrude from both poles. Unsegmented single cell inside when freshly passed. Eggs float with zinc sulfate but not with formalin-ethyl acetate sedimentation alone.',
    ariaLabel: 'Illustrated Trichuris trichiura egg showing barrel shape with bipolar hyaline plugs at each end',
    visualType: 'microscope-trichuris',
    tubes: [
      {
        id: 'A',
        label: 'Egg',
        name: 'Barrel shape, bipolar hyaline plugs',
        colors: { slant: '#f0e4b0', butt: '#a07830', base: '#5c3c10' },
        note: '50-55 x 22-24 um. Barrel (football) shape is pathognomonic among intestinal helminth eggs. Golden-brown thick shell. Hyaline (colorless, refractile) plugs protrude from both poles. Interior contains a single unsegmented cell in freshly passed stool. Light infections may be missed - use concentration methods.'
      },
      {
        id: 'B',
        label: 'Embryonated egg',
        name: 'Embryonated - plugs intact',
        colors: { slant: '#e8d898', butt: '#886820', base: '#402808' },
        note: 'In older or soil-derived specimens, the single cell develops into a fully formed larva. Bipolar plugs remain intact. The barrel outline and plug morphology are unchanged regardless of internal development stage - shape alone identifies this egg. Embryonated eggs are infective; handle with standard precautions.'
      }
    ],
    readoutTitle: 'What to look for in stool',
    readoutRows: [
      ['Barrel (football) shape', 'Trichuris trichiura', 'Pathognomonic among intestinal helminths - no other common egg has this symmetric barrel outline'],
      ['Bipolar hyaline plugs', 'T. trichiura - confirm', 'Colorless, refractile plugs at each pole; if absent, reconsider ID; plugs persist regardless of internal development stage'],
      ['Golden-brown thick shell', 'T. trichiura', 'Shell color and thickness distinguish from thin-shelled hookworm; Ascaris has similar thickness but different shape'],
      ['Single cell inside (fresh)', 'Unsegmented T. trichiura egg', 'No morula - unlike hookworm (2-8 cells); fully developed larva = older specimen or soil-derived'],
      ['50-55 um length', 'T. trichiura', 'Size eliminates most mimics; Capillaria hepatica and C. philippinensis have similar plugged eggs but different clinical context']
    ],
    trapTitle: 'Capillaria eggs are a size-matched mimic with bipolar plugs',
    trapBody: 'Capillaria hepatica and C. philippinensis eggs also have bipolar plugs and a similar barrel shape but differ in size (C. hepatica: 51-67 um, pitted shell) and clinical context (hepatic vs. intestinal vs. seafood exposure). Trichuris bipolar plugs are smoother and more protruding. Clinical history resolves most cases.',
    trapBullets: [
      'T. trichiura causes whipworm infection via fecal-oral route in warm climates; eggs require 3-4 weeks in soil to become infective.',
      'Heavy infections cause rectal prolapse and iron-deficiency anemia, especially in children.',
      'Zinc sulfate flotation (specific gravity 1.18) improves recovery; formalin-ethyl acetate alone may not float these denser eggs.'
    ],
    interpretationTitle: 'Trichuris trichiura egg identification guide',
    interpretationRows: [
      ['Barrel shape, bipolar plugs, golden-brown shell', 'Trichuris trichiura - positive', 'Report with approximate burden estimate (few, moderate, many eggs per low-power field)'],
      ['Similar shape, pitted shell, different size', 'Capillaria spp. - rule out', 'Use clinical history (hepatic mass vs. intestinal symptoms vs. fish ingestion) and morphologic detail to differentiate'],
      ['Barrel outline, no internal detail visible', 'T. trichiura - acceptable ID', 'Bipolar plugs alone are sufficient for positive report; internal cell stage does not affect ID']
    ],
    takeaways: [
      'Barrel shape + bipolar hyaline plugs = Trichuris trichiura - one of the most morphologically distinctive helminth eggs.',
      'Bipolar plugs are retained in all developmental stages - use shape + plugs regardless of internal content.',
      'Capillaria spp. are the primary mimic; differentiate using plug texture, size, and clinical context.'
    ],
    remember: 'Barrel shape + bipolar plugs = Trichuris. No other common intestinal egg looks like this.',
    divr: {
      detect: 'Fresh or fixed stool - saline or iodine wet prep; zinc sulfate flotation (SG 1.18) concentration improves recovery',
      identify: ['Barrel (football) shape, golden-brown shell, 50-55 x 22-24 um', 'Bipolar hyaline plugs at both poles - retained in all developmental stages', 'Unsegmented single cell when freshly passed'],
      verify: 'Shape + plugs are pathognomonic among common intestinal helminths; Capillaria spp. are size-matched mimics - use plug texture and clinical/geographic context',
      report: 'Report as Trichuris trichiura eggs detected; estimate burden per low-power field per lab SOP; clinical correlation required'
    }
  },
  {
    slug: 'plasmodium-falciparum-smear',
    title: 'Plasmodium falciparum: Thin Blood Smear',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Plasmodium falciparum on Giemsa-stained thin blood smear: delicate ring forms, multiple rings per RBC, accole (applique) forms, and banana-shaped gametocytes as diagnostic anchors.',
    boardTitle: 'Plasmodium falciparum: ring forms and gametocyte',
    boardNote: 'Ring forms: delicate, small (1/5 of RBC diameter), multiple per RBC, accole (peripheral placement). Double chromatin dots in some rings. RBC size is normal (not enlarged). Gametocyte: banana-shaped (crescent) - pathognomonic for P. falciparum. No visible schizonts on peripheral smear (sequestered).',
    ariaLabel: 'Illustrated Plasmodium falciparum thin blood smear showing multiple delicate ring forms in a normal-sized RBC and a banana-shaped gametocyte',
    visualType: 'microscope-plasmodium',
    tubes: [
      {
        id: 'A',
        label: 'Ring forms',
        name: 'Delicate rings, accole forms, multiple per RBC',
        colors: { slant: '#f4e0d8', butt: '#d4607880', base: '#7a1830' },
        note: 'Ring diameter ~1/5 of RBC diameter (smaller than other Plasmodium). Multiple rings per RBC (>1 ring = strong P. falciparum clue). Accole (applique) forms: ring positioned at the very edge of the RBC membrane. Double chromatin dots in some rings. RBC not enlarged (Schuffner dots absent). Schizonts not visible on peripheral smear - sequestered in deep vessels.'
      },
      {
        id: 'B',
        label: 'Gametocyte',
        name: 'Banana (crescent) shape, pathognomonic for P. falciparum',
        colors: { slant: '#e8d0c8', butt: '#9848580', base: '#5a2028' },
        note: 'Banana/crescent shape is pathognomonic - no other Plasmodium species produces crescent gametocytes. Appear 7-15 days into infection. Macro- (female) and microgametocytes (male) differ slightly in color and chromatin. Their presence alongside ring forms confirms P. falciparum. Peripheral smear may show gametocytes even after ring forms clear with treatment.'
      }
    ],
    readoutTitle: 'What to look for on thin blood smear',
    readoutRows: [
      ['Multiple rings per RBC (>1)', 'P. falciparum - strong clue', 'Other Plasmodium species rarely show more than 1 ring per RBC; >1 ring per cell is a key P. falciparum feature'],
      ['Accole (applique) ring at RBC margin', 'P. falciparum', 'Ring form adhered to the inner margin of the RBC - characteristic positioning; other species show central or random placement'],
      ['Double chromatin dots in ring', 'P. falciparum ring (some)', 'Single chromatin dot is more common; when present, double dots are specific for P. falciparum'],
      ['RBC normal size, no Schuffner dots', 'P. falciparum (not P. vivax or P. ovale)', 'P. vivax and P. ovale enlarge the RBC and show Schuffner dots; P. malariae has band-form trophozoites in normal RBCs'],
      ['Banana-shaped gametocyte', 'P. falciparum - pathognomonic', 'Crescent/banana gametocyte is found only in P. falciparum; confirms species even without ring morphology details'],
      ['No schizonts on peripheral smear', 'P. falciparum - expected', 'Schizonts are sequestered in deep capillaries; absence from blood smear does not exclude P. falciparum']
    ],
    trapTitle: 'High parasitemia on smear indicates severe malaria risk',
    trapBody: 'P. falciparum causes the most severe malaria. Any parasitemia >5% (% of infected RBCs) suggests severe disease. The smear alone underestimates true parasitemia due to deep-vessel sequestration. Urgent clinical correlation and treatment are required even at low smear counts if P. falciparum is suspected.',
    trapBullets: [
      'RDT (rapid diagnostic test) and PCR are used alongside smear; thick smear is more sensitive for detecting low parasitemia.',
      'P. knowlesi mimics P. malariae on smear but causes rapidly progressive severe disease - use PCR in returned travelers from Southeast Asia.',
      'Giemsa stain (pH 7.2) is the gold standard; Wright-Giemsa is an acceptable alternative. Thin smear for species ID, thick smear for parasite count.'
    ],
    interpretationTitle: 'P. falciparum smear interpretation guide',
    interpretationRows: [
      ['Delicate rings, multiple/RBC, accole, ± double chromatin', 'P. falciparum ring stage - positive', 'Quantify parasitemia (% infected RBCs); report immediately; initiate treatment discussion'],
      ['Banana-shaped gametocyte', 'P. falciparum gametocyte - species confirmed', 'Pathognomonic; report even if ring forms are absent or reduced after partial treatment'],
      ['Ring forms, RBC not enlarged, no Schuffner dots, no schizonts', 'P. falciparum or P. malariae', 'P. malariae has band-form trophozoites and lower parasitemia; confirm with PCR if morphology is equivocal']
    ],
    takeaways: [
      'Multiple rings per RBC + accole placement + delicate ring size = P. falciparum.',
      'Banana gametocyte is pathognomonic for P. falciparum - report species confirmed when seen.',
      'No schizonts on peripheral smear is expected (not a gap); quantify parasitemia and report urgently.'
    ],
    remember: 'Multiple delicate rings/RBC + accole + banana gametocyte = P. falciparum. Normal RBC size, no Schuffner dots, no schizonts on smear.',
    divr: {
      detect: 'EDTA peripheral blood - thick smear (sensitivity/count) + thin smear (species ID); Giemsa pH 7.2; oil immersion at 1000x',
      identify: ['Delicate ring forms ~1/5 RBC diameter; multiple rings per RBC', 'Accole (applique) forms: ring at RBC membrane edge', 'Banana/crescent gametocyte - pathognomonic for P. falciparum', 'Normal RBC size; no Schuffner dots; no schizonts in peripheral blood'],
      verify: 'RDT and PCR alongside smear; quantify parasitemia (% infected RBCs); thick smear for sensitivity',
      report: 'Report species and parasitemia %; urgent notification required for P. falciparum; molecular or antigen testing may be used depending on method - clinical correlation required'
    }
  },
  {
    slug: 'babesia-ring-forms',
    title: 'Babesia spp.: Ring Forms and Maltese Cross Tetrad',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Babesia spp. on Giemsa-stained thin blood smear: small pleomorphic ring forms, extracellular merozoites, and the pathognomonic Maltese cross (tetrad) arrangement.',
    boardTitle: 'Babesia ring forms and tetrad (Maltese cross)',
    boardNote: 'Ring forms smaller than P. falciparum (1-5 um), often extracellular, up to 4 rings per RBC. Tetrad (Maltese cross): 4 merozoites in cross arrangement - pathognomonic for Babesia. No hemozoin (malaria pigment). RBC not enlarged. B. microti (US) vs. B. divergens (Europe) differ in severity but not reliably in morphology.',
    ariaLabel: 'Illustrated Babesia ring forms in red blood cell showing multiple small rings, and Maltese cross tetrad arrangement',
    visualType: 'microscope-babesia',
    tubes: [
      {
        id: 'A',
        label: 'Ring forms',
        name: 'Small pleomorphic rings, extracellular forms',
        colors: { slant: '#f4e0d8', butt: '#c05870', base: '#6a1828' },
        note: '1-5 um. Smaller than P. falciparum rings. Pleomorphic - size and shape vary within a single smear. Multiple rings per RBC (up to 4). Extracellular ring forms (merozoites free in plasma) are a Babesia clue absent in Plasmodium. No hemozoin (malaria pigment). RBC not enlarged, no Schuffner dots.'
      },
      {
        id: 'B',
        label: 'Tetrad (Maltese cross)',
        name: 'Maltese cross tetrad - pathognomonic',
        colors: { slant: '#f0dcd0', butt: '#a84860', base: '#5a1020' },
        note: '4 merozoites arranged in a cross (Maltese cross or tetrad) - pathognomonic for Babesia, never seen in Plasmodium. Not always visible; absence does not exclude Babesia. Scanning multiple low-power fields before calling negative is essential. When found, report as Babesia spp. and note the tetrad.'
      }
    ],
    readoutTitle: 'What to look for on thin blood smear',
    readoutRows: [
      ['Tetrad (Maltese cross) - 4 merozoites in cross', 'Babesia - pathognomonic', 'Not always present; absence does not exclude Babesia; presence confirms species'],
      ['Extracellular ring forms (free in plasma)', 'Babesia - strong clue', 'Plasmodium does not produce extracellular rings; finding rings outside RBCs strongly suggests Babesia'],
      ['Multiple small rings/RBC, pleomorphic', 'Babesia or P. falciparum', 'Babesia rings are smaller and more pleomorphic; no malaria pigment; use tetrad/extracellular rings to differentiate'],
      ['No hemozoin (malaria pigment)', 'Babesia - supports (Plasmodium: pigment in older stages)', 'Absence of brown/black pigment in late-stage cells is a Babesia clue; Plasmodium produces hemozoin from hemoglobin digestion'],
      ['RBC not enlarged, no Schuffner dots', 'Babesia or P. falciparum/malariae', 'Enlarged RBC with Schuffner dots = P. vivax or P. ovale; normal size RBCs shared by Babesia and P. falciparum'],
      ['Travel to endemic area (northeast US coast, splenectomy)', 'Babesia microti risk', 'B. microti is tick-borne (Ixodes scapularis); asplenic and immunocompromised patients are at highest risk for severe disease']
    ],
    trapTitle: 'Babesia rings mimic P. falciparum - use tetrad and extracellular forms to differentiate',
    trapBody: 'Both Babesia and P. falciparum show multiple small rings per RBC in normal-sized cells without Schuffner dots. The Maltese cross (tetrad) and extracellular rings are the only morphologic features specific to Babesia. PCR is required for species-level confirmation and for distinguishing Babesia from P. falciparum when morphology is equivocal.',
    trapBullets: [
      'Splenectomized patients can develop severe life-threatening Babesia infections even with B. microti, which is typically self-limited in immunocompetent hosts.',
      'B. divergens (Europe) is more virulent than B. microti; ring forms are similar but B. divergens often shows a higher percentage of infected RBCs.',
      'PCR and serology (IFA) are the confirmatory methods; morphology alone is insufficient for species-level ID.'
    ],
    interpretationTitle: 'Babesia smear interpretation guide',
    interpretationRows: [
      ['Maltese cross tetrad present', 'Babesia spp. - confirmed', 'Report as Babesia spp.; send PCR for species confirmation; assess spleen status and immune function'],
      ['Small pleomorphic rings, extracellular forms, no pigment', 'Babesia probable - confirm with PCR', 'Report as suspicious for Babesia; PCR is confirmatory; exclude P. falciparum by clinical history and morphology'],
      ['Multiple small rings, RBC not enlarged, equivocal', 'Babesia vs. P. falciparum', 'Use travel history, tick exposure, splenectomy; send PCR and malaria RDT; do not delay treatment']
    ],
    takeaways: [
      'Maltese cross tetrad is pathognomonic for Babesia - report if found even if rings are equivocal.',
      'Extracellular ring forms (free in plasma) = Babesia; Plasmodium does not produce them.',
      'No hemozoin, normal RBC size, no Schuffner dots - shared with P. falciparum; use tetrad + clinical context to differentiate.'
    ],
    remember: 'Tetrad (Maltese cross) + extracellular rings + no pigment = Babesia. PCR confirms species.',
    divr: {
      detect: 'EDTA peripheral blood - Giemsa thin smear; thick smear for low parasitemia; PCR for species confirmation',
      identify: ['Small pleomorphic ring forms 1-5 um - more variable in size than P. falciparum rings', 'Extracellular ring forms free in plasma (absent in Plasmodium)', 'Maltese cross (tetrad): 4 merozoites in cross arrangement - pathognomonic when present; no hemozoin (malaria pigment)'],
      verify: 'PCR required for species confirmation; IFA serology; differentiate from P. falciparum by tetrad + extracellular rings + no hemozoin',
      report: 'Report as Babesia spp. if morphology consistent; confirm with PCR; molecular or antigen testing may be used depending on method - clinical correlation required'
    }
  },
  {
    slug: 'trypanosoma-trypomastigote',
    title: 'Trypanosoma cruzi: Trypomastigote in Blood Film',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Trypanosoma cruzi on Giemsa-stained thin blood film: C- or U-shaped trypomastigote with large posterior kinetoplast, undulating membrane, and single anterior flagellum.',
    boardTitle: 'Trypanosoma cruzi: trypomastigote and amastigote',
    boardNote: 'Trypomastigote (blood): C- or U-shaped, 16-20 um, large posterior kinetoplast, undulating membrane, anterior free flagellum. Amastigote (tissue): round/oval, 1-4 um, kinetoplast bar visible. T. brucei trypomastigote: smaller kinetoplast, more slender, no C-shape.',
    ariaLabel: 'Illustrated Trypanosoma cruzi trypomastigote showing C-shape with large posterior kinetoplast and undulating membrane in blood film',
    visualType: 'microscope-trypanosoma',
    tubes: [
      {
        id: 'A',
        label: 'Trypomastigote',
        name: 'C-shape, large posterior kinetoplast',
        colors: { slant: '#f8f0e8', butt: '#7858a0', base: '#3a2860' },
        note: '16-20 um. C- or U-shaped body in blood smear is the key low-power clue. Large round-to-oval posterior kinetoplast (filled with kinetoplast DNA) - larger than T. brucei. Undulating membrane runs along body length. Single anterior free flagellum. Found in blood during acute Chagas disease. T. brucei has a smaller kinetoplast and more slender, straight body.'
      },
      {
        id: 'B',
        label: 'Amastigote',
        name: 'Round amastigotes in macrophage, two dark dots',
        colors: { slant: '#e8dcd0', butt: '#6848a0', base: '#2c1858' },
        note: '1-4 um. Found intracellularly in cardiac muscle, smooth muscle, and macrophages during chronic Chagas disease. Round to oval, no external flagellum, small dark nucleus + bar-shaped kinetoplast side by side. Pseudocysts (nests of amastigotes) in cardiac tissue are the hallmark of chronic disease. Not typically found in blood smear - require tissue biopsy or PCR for diagnosis in chronic phase.'
      }
    ],
    readoutTitle: 'What to look for in blood film and tissue',
    readoutRows: [
      ['C- or U-shape, large posterior kinetoplast', 'T. cruzi trypomastigote', 'C-shape in blood smear is the primary low-power clue; T. brucei is more slender and straight'],
      ['Large round posterior kinetoplast', 'T. cruzi (vs. T. brucei: small subterminal)', 'Kinetoplast size and position differ: T. cruzi = large posterior; T. brucei = small, subterminal'],
      ['Undulating membrane + anterior free flagellum', 'Trypomastigote (both species)', 'Present in all Trypanosoma blood forms; distinguishes from Leishmania (amastigote, no flagellum in tissue)'],
      ['Round cells 1-4 um with nucleus + kinetoplast bar, intracellular', 'Amastigote in tissue', 'Pseudocysts in cardiac muscle are characteristic of chronic Chagas; not found in peripheral blood smear'],
      ['No trypomastigotes in blood, cardiac symptoms, Latin American exposure', 'Chronic Chagas - consider PCR/serology', 'Parasitemia is low or absent in chronic phase; diagnosis requires serology (2 different tests) or PCR']
    ],
    trapTitle: 'T. cruzi and T. brucei trypomastigotes differ in shape and kinetoplast size',
    trapBody: 'T. cruzi: C- or U-shaped, large posterior kinetoplast. T. brucei (African trypanosomiasis): more slender, straight or slightly curved, small subterminal kinetoplast. Clinical and geographic context is essential - Chagas disease (Americas, Triatoma bug vector) vs. sleeping sickness (sub-Saharan Africa, tsetse fly vector).',
    trapBullets: [
      'Acute Chagas: trypomastigotes visible in blood smear; chronic phase requires serology (two tests) or PCR.',
      'T. brucei rhodesiense (East African) causes rapidly fatal sleeping sickness; T. brucei gambiense (West African) has a slower course.',
      'Congenital Chagas is an important route of transmission in non-endemic countries; screen pregnant women from endemic areas.'
    ],
    interpretationTitle: 'Trypanosoma identification guide',
    interpretationRows: [
      ['C/U-shaped trypomastigote, large posterior kinetoplast', 'T. cruzi - acute Chagas disease', 'Report urgently; begin evaluation for cardiac involvement; benznidazole or nifurtimox indicated'],
      ['Slender trypomastigote, small subterminal kinetoplast', 'T. brucei - African trypanosomiasis', 'Report urgently; CSF examination required to stage disease (hemolymphatic vs. CNS stage)'],
      ['Intracellular amastigotes, round + kinetoplast bar, cardiac tissue', 'T. cruzi chronic Chagas', 'Tissue diagnosis; confirm with serology; PCR used in chronic and congenital cases']
    ],
    takeaways: [
      'C/U-shape + large posterior kinetoplast = T. cruzi trypomastigote in blood.',
      'T. brucei: slender, straight, small subterminal kinetoplast - geographic context (Africa) confirms.',
      'Chronic Chagas: parasitemia absent; use serology (2 tests required) or PCR.'
    ],
    remember: 'C-shape + large posterior kinetoplast = T. cruzi. Slender + small kinetoplast = T. brucei. Geographic context always applies.',
    divr: {
      detect: 'EDTA peripheral blood (acute phase) - Giemsa thin or thick smear; buffy coat concentration; tissue biopsy for chronic phase',
      identify: ['Trypomastigote: C- or U-shaped body, 16-20 um, large round posterior kinetoplast', 'Undulating membrane + anterior free flagellum', 'Amastigote in tissue: round 1-4 um, nucleus + bar-shaped kinetoplast, intracellular in cardiac or smooth muscle'],
      verify: 'Serology (2 different assays required for diagnosis); PCR for chronic and congenital cases; morphology alone is insufficient for species-level ID',
      report: 'Report trypomastigote morphology and stain method; confirm per lab SOP; clinical correlation required'
    }
  },
  {
    slug: 'toxoplasma-gondii-tachyzoite',
    title: 'Toxoplasma gondii: Tachyzoite and Tissue Cyst',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Toxoplasma gondii tachyzoites and bradyzoite-filled tissue cysts: crescent-shaped tachyzoites, nucleus toward the broad end, and bradyzoites in PAS-positive tissue cysts.',
    boardTitle: 'Toxoplasma gondii: tachyzoite and tissue cyst with bradyzoites',
    boardNote: 'Tachyzoite: crescent/banana shape, 2-3 um wide x 4-8 um long, Giemsa: pale blue cytoplasm, red nucleus at broad end. Bradyzoites: within tissue cysts (up to 100 um), cyst wall PAS-positive. Brain, eye, heart, and skeletal muscle are primary tissue cyst locations.',
    ariaLabel: 'Illustrated Toxoplasma gondii tachyzoite showing crescent shape with nucleus at broad end, and tissue cyst containing bradyzoites',
    visualType: 'microscope-toxoplasma',
    tubes: [
      {
        id: 'A',
        label: 'Tachyzoite',
        name: 'Crescent 4-8 um, nucleus at broad end',
        colors: { slant: '#f0e8d8', butt: '#9878b8', base: '#4a2858' },
        note: '2-3 um wide x 4-8 um long. Crescent or banana shape. Giemsa: cytoplasm stains pale blue, nucleus stains red toward the broader end. One end is more pointed than the other. Found in acute infections, immunocompromised hosts, and congenital toxoplasmosis. Multiply rapidly (acute phase) by endodyogeny. Seen in BAL, CSF, peritoneal washings, and tissue impression smears.'
      },
      {
        id: 'B',
        label: 'Tissue cyst',
        name: 'Tissue cyst up to 100 um, bradyzoites inside',
        colors: { slant: '#e8dcc8', butt: '#c09868', base: '#603818' },
        note: 'Tissue cyst: up to 100 um, thin but distinct wall, PAS-positive. Contains hundreds of bradyzoites (slow-multiplying form, chronic stage). Bradyzoites are morphologically similar to tachyzoites but smaller and within the cyst. Preferentially located in brain, retina, cardiac and skeletal muscle. Cysts persist lifelong; reactivate under immunosuppression (CD4 <100 cells/umL).'
      }
    ],
    readoutTitle: 'What to look for in stained preparations',
    readoutRows: [
      ['Crescent/banana shape, 4-8 um, nucleus at broad end', 'Toxoplasma tachyzoite', 'Giemsa or Wright stain shows pale blue cytoplasm and red nucleus; BAL or CSF are the most common diagnostic specimens'],
      ['One pointed end, one rounded end', 'Tachyzoite morphology', 'Asymmetry is the key shape clue; distinguishes from Leishmania amastigotes (round, smaller, intracellular)'],
      ['Round cyst up to 100 um, PAS+ wall, many organisms inside', 'Tissue cyst with bradyzoites', 'Hematoxylin-eosin shows cyst outline; PAS highlights cyst wall; bradyzoites visible at high magnification'],
      ['Intracellular clusters in macrophages (acute)', 'Tachyzoites or early tissue cysts', 'In acute phase, tachyzoites replicate in any nucleated cell; in immunocompromised, brain cysts reactivate'],
      ['No diagnostic stage in feces from human', 'Oocysts only from cats', 'Humans shed no diagnostic stages in stool; serology (IgM/IgG) and PCR are primary diagnostic tools']
    ],
    trapTitle: 'Serology, not morphology, is the primary diagnostic tool for toxoplasmosis',
    trapBody: 'Toxoplasma tachyzoites are rarely seen on smear in immunocompetent hosts. The primary diagnostic approach is serology (IgM for acute, IgG for past infection, IgG avidity for timing). PCR on CSF, amniotic fluid, or BAL is used for CNS, congenital, and immunocompromised cases. Morphology is confirmatory when organisms are seen.',
    trapBullets: [
      'Reactivation in HIV (CD4 <100) produces encephalitis; brain imaging shows ring-enhancing lesions; CSF PCR is the preferred diagnostic test.',
      'Congenital toxoplasmosis: fetal infection from primary maternal infection - IgM in newborn serum or PCR of amniotic fluid for diagnosis.',
      'Oocysts in cat feces are infective after 1-5 days sporulation; avoid changing cat litter during pregnancy.'
    ],
    interpretationTitle: 'Toxoplasma gondii identification guide',
    interpretationRows: [
      ['Crescent tachyzoites, pale blue cytoplasm, red nucleus at broad end', 'T. gondii tachyzoites - active infection', 'Report with specimen source; confirm with PCR and serology; urgent in CNS or congenital cases'],
      ['Round cyst, PAS+ wall, bradyzoites inside, in brain/muscle tissue', 'T. gondii tissue cyst - latent infection', 'Indicates seropositive/past infection; reactivation risk under immunosuppression; no treatment unless reactivation occurs'],
      ['Equivocal morphology', 'Confirm with PCR or serology', 'Tachyzoites may be confused with other intracellular organisms; PCR on specimen is definitive']
    ],
    takeaways: [
      'Crescent shape + nucleus at broad end = T. gondii tachyzoite on Giemsa/Wright stain.',
      'Tissue cyst (up to 100 um, PAS+ wall, bradyzoites inside) in brain/muscle = latent toxoplasmosis.',
      'Serology and PCR are the primary diagnostic tools; morphology is confirmatory when organisms are visualized.'
    ],
    remember: 'Crescent tachyzoite = acute. PAS+ tissue cyst with bradyzoites = latent/chronic. Serology and PCR drive diagnosis, not smear.',
    divr: {
      detect: 'BAL, CSF, peritoneal fluid, or tissue impression smear - Giemsa or Wright stain; serology for most cases (IgM/IgG)',
      identify: ['Tachyzoite: crescent 4-8 um, pale blue cytoplasm, red nucleus at broad end (Giemsa)', 'One pointed end, one rounded end - asymmetric shape', 'Tissue cyst: round up to 100 um, PAS-positive wall, bradyzoites packed inside'],
      verify: 'PCR on CSF/BAL/amniotic fluid for CNS/congenital; IgM + IgG serology; IgG avidity for timing of primary infection',
      report: 'Report tachyzoites with specimen source and stain; do not report from single artifact-like structure; confirm per SOP; clinical correlation required'
    }
  },
  {
    slug: 'leishmania-amastigotes',
    title: 'Leishmania spp.: Amastigotes in Tissue',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Original bench-card visuals for recognizing Leishmania donovani amastigotes (Leishman-Donovan bodies) in macrophages/Kupffer cells on Giemsa stain: small round organisms with nucleus and rod-shaped kinetoplast side by side.',
    boardTitle: 'Leishmania amastigote (LD body) and promastigote',
    boardNote: 'Amastigote (LD body): 2-4 um, round/oval, intracellular in macrophages/Kupffer cells. Giemsa: pale blue cytoplasm, purple nucleus, rod-shaped kinetoplast at right angle to nucleus. No external flagellum. Promastigote (culture/sand fly): elongated 15-25 um, anterior flagellum, kinetoplast anterior.',
    ariaLabel: 'Illustrated Leishmania amastigotes in Kupffer cell showing nucleus and rod-shaped kinetoplast, and promastigote form with anterior flagellum',
    visualType: 'microscope-leishmania',
    tubes: [
      {
        id: 'A',
        label: 'Amastigote (LD body)',
        name: 'Round 2-4 um - nucleus + kinetoplast bar (LD body)',
        colors: { slant: '#f4e8e0', butt: '#c07858', base: '#602820' },
        note: '2-4 um. Round to oval. No external flagellum. Giemsa: cytoplasm pale blue, round purple nucleus + bar-shaped kinetoplast (at roughly right angle to nucleus or perpendicular - "two dark dots" per cell). Found in macrophages, Kupffer cells (liver), spleen, bone marrow, and skin macrophages depending on species. L. donovani = visceral (kala-azar); L. major/tropica = cutaneous; L. braziliensis = mucocutaneous.'
      },
      {
        id: 'B',
        label: 'Promastigote',
        name: 'Elongated, anterior flagellum - culture form',
        colors: { slant: '#e8f0d8', butt: '#7898a0', base: '#285860' },
        note: '15-25 um elongated body. Anterior kinetoplast. Single anterior free flagellum. This is the form found in the sand fly vector (Lutzomyia in New World; Phlebotomus in Old World) and in NNN (Novy-MacNeal-Nicolle) culture medium. Not found in tissue smears from patients. Identifying promastigotes in culture confirms Leishmania but species-level ID requires molecular methods or isoenzyme analysis.'
      }
    ],
    readoutTitle: 'What to look for in tissue smears and biopsies',
    readoutRows: [
      ['Round 2-4 um organisms in macrophage cytoplasm', 'Leishmania amastigotes (LD bodies)', 'Giemsa on tissue impression smear or aspirate; bone marrow and spleen aspirate for visceral disease'],
      ['Nucleus + rod-shaped kinetoplast per organism', '"Two dark dots" pattern per amastigote', 'Both nucleus and kinetoplast stain dark purple on Giemsa; perpendicular arrangement distinguishes from Histoplasma or other round intracellular fungi'],
      ['No external flagellum visible in tissue forms', 'Amastigote - expected', 'Flagellum present only in promastigote (insect stage); absence in tissue is a feature, not a gap'],
      ['Elongated, anterior flagellum, anterior kinetoplast', 'Promastigote - culture or sand fly form', 'Seen in cultures; confirms Leishmania genus; molecular testing needed for species ID'],
      ['Macrophage rupture, free amastigotes', 'High burden infection', 'Free amastigotes may be seen in smears when parasitized macrophages rupture; count associated cells for burden estimate']
    ],
    trapTitle: 'Leishmania amastigotes mimic Histoplasma capsulatum in tissue',
    trapBody: 'Both Leishmania amastigotes and Histoplasma capsulatum appear as small round organisms within macrophages on H&E. Key distinction: Leishmania has a visible kinetoplast (bar-shaped dark structure) on Giemsa - Histoplasma does not have a kinetoplast and is GMS/PAS positive (fungal cell wall). Giemsa is essential for Leishmania diagnosis; GMS/PAS for fungi.',
    trapBullets: [
      'Visceral leishmaniasis (kala-azar): fever, splenomegaly, weight loss, pancytopenia - bone marrow or spleen aspirate for diagnosis.',
      'Cutaneous leishmaniasis: ulcerating skin lesion; aspirate from lesion margin (not center); rk39 antigen test available for L. donovani complex.',
      'Species identification matters for treatment (L. braziliensis requires systemic therapy); PCR on tissue is the most reliable method.'
    ],
    interpretationTitle: 'Leishmania identification guide',
    interpretationRows: [
      ['Round 2-4 um in macrophages, nucleus + kinetoplast on Giemsa', 'Leishmania amastigotes - positive', 'Report with specimen source and abundance; send PCR for species ID; clinical syndrome guides treatment selection'],
      ['Similar cells without kinetoplast, GMS/PAS positive', 'Histoplasma capsulatum - not Leishmania', 'Kinetoplast presence is the decisive feature; run GMS if fungi are suspected alongside Leishmania'],
      ['Promastigotes in culture or sand fly form', 'Leishmania spp. - genus confirmed', 'Culture on NNN medium at 22-26 degrees C; species ID by PCR/RFLP or isoenzyme electrophoresis']
    ],
    takeaways: [
      'Amastigote (LD body): round 2-4 um in macrophages, nucleus + bar-shaped kinetoplast at right angle = Leishmania on Giemsa.',
      'Kinetoplast is the key differentiator from Histoplasma - Histoplasma lacks a kinetoplast on Giemsa.',
      'Promastigotes (elongated + anterior flagellum) are the culture/insect form - not seen in tissue from patients.'
    ],
    remember: 'Two dark dots (nucleus + kinetoplast) in macrophage on Giemsa = Leishmania LD body. No kinetoplast = not Leishmania.',
    divr: {
      detect: 'Bone marrow aspirate (visceral), skin lesion margin biopsy (cutaneous), or spleen aspirate - Giemsa stain; NNN culture at 22-26 degrees C',
      identify: ['Amastigote (LD body): round 2-4 um, intracellular in macrophages or Kupffer cells', 'Two dark dots per cell: round nucleus + bar-shaped kinetoplast at roughly right angle', 'No external flagellum in tissue forms'],
      verify: 'Kinetoplast on Giemsa distinguishes from Histoplasma (no kinetoplast; GMS/PAS positive fungi); PCR for species-level ID',
      report: 'Report as Leishmania amastigotes with specimen source; do not report from single artifact-like structure; confirm per SOP; clinical correlation required'
    }
  },
  {
    slug: 'ascaris-lumbricoides-egg',
    title: 'Ascaris lumbricoides: Mammillated and Decorticate Eggs',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for Ascaris lumbricoides eggs: the bile-stained mammillated (bumpy) fertile egg - the most recognizable helminth egg in clinical parasitology - and the decorticate variant that has lost its outer coat.',
    boardTitle: 'Ascaris lumbricoides egg: fertile mammillated vs. decorticate/infertile',
    boardNote: 'Fertile egg: oval 45-70 um, thick bile-stained mammillated outer coat (bumpy), thick inner shell, unsegmented single cell. Decorticate: same fertile egg without mammillated coat - smooth surface, common after zinc sulfate flotation. Infertile: elongated 80-90 um, irregular outline, disorganized granular content - hardest form to identify.',
    ariaLabel: 'Illustrated Ascaris lumbricoides fertile egg showing bile-stained mammillated bumpy outer coat and inner shell, beside a decorticate or infertile egg without outer coat',
    visualType: 'microscope-ascaris',
    tubes: [
      {
        id: 'A',
        label: 'Fertile egg',
        name: 'Oval 45-70 um, mammillated outer coat',
        colors: { slant: '#f5e8c8', butt: '#c8880a', base: '#6a3808' },
        note: '45-70 um. Oval. Thick bile-stained (golden-brown) mammillated outer coat - the bumpy exterior is pathognomonic. Thick inner shell. Single unsegmented cell inside. The most common and recognizable form in clinical stool. High daily egg output (up to 200,000/day) means concentration is often not necessary for heavy infections.'
      },
      {
        id: 'B',
        label: 'Decorticate / infertile',
        name: 'Smooth surface or irregular elongated content',
        colors: { slant: '#ece4c0', butt: '#9a7028', base: '#50280a' },
        note: 'Decorticate: fertile egg that has lost its mammillated coat - oval, thick inner shell, smooth surface. Common after zinc sulfate flotation or mechanical processing. Infertile: more elongated (80-90 um), irregular outline, disorganized granular content - the most difficult Ascaris egg to recognize. Finding classic mammillated eggs in the same specimen is the best confirmation for decorticate and infertile forms.'
      }
    ],
    readoutTitle: 'What to look for in stool',
    readoutRows: [
      ['Oval, thick mammillated (bumpy) outer coat, bile-stained, 45-70 um', 'Ascaris lumbricoides fertile egg', 'Pathognomonic - no other common intestinal helminth egg has a thick bumpy outer coat at this size'],
      ['Oval, thick inner shell, smooth outer surface', 'Decorticate Ascaris egg', 'Coat lost during concentration; look for classic mammillated eggs in same prep for confirmation'],
      ['Elongated, irregular outline, disorganized granular content', 'Possible infertile Ascaris egg', 'Hardest form to ID alone; correlate with clinical context and presence of fertile eggs in specimen'],
      ['Single unsegmented (non-segmented) cell', 'Ascaris fertile egg feature', 'No morula or larva - unlike hookworm (morula inside) or Enterobius (larva inside)'],
      ['No outer coat, thick inner shell, oval outline', 'Decorticate vs. other helminth eggs', 'Decorticate Ascaris egg can resemble hookworm or other thin-shelled eggs - size (larger, 45-70 um) helps distinguish']
    ],
    trapTitle: 'Decorticate and infertile Ascaris eggs are commonly misidentified',
    trapBody: 'Decorticate eggs (lacking the mammillated coat) are common after zinc sulfate flotation and can resemble other thick-shelled eggs. Infertile eggs are elongated with disorganized content and may not be recognized as Ascaris without context. Finding classic mammillated fertile eggs in the same specimen is the best confirmation strategy.',
    trapBullets: [
      'Ascaris is the most prevalent intestinal helminth worldwide - endemic in areas with poor sanitation and soil contamination.',
      'High daily egg output (up to 200,000 eggs/day per female) means most infections are detected without concentration.',
      'A. lumbricoides eggs are the largest of the common intestinal helminth eggs - use this to anchor the ID when the outer coat is absent.'
    ],
    interpretationTitle: 'Ascaris lumbricoides egg identification guide',
    interpretationRows: [
      ['Oval, thick mammillated outer coat, bile-stained, 45-70 um', 'Ascaris lumbricoides fertile egg - positive', 'Report and treat; anthelmintic therapy indicated; screen household contacts in endemic settings'],
      ['Oval, smooth outer surface, thick inner shell', 'Decorticate Ascaris egg - consistent with positive', 'Confirm by finding mammillated eggs in same prep; report as A. lumbricoides consistent with; clinical correlation required'],
      ['Elongated, irregular, disorganized granular content', 'Possible infertile Ascaris egg', 'Do not report on single infertile egg alone; correlate with clinical context and presence of fertile eggs; confirm per lab SOP']
    ],
    takeaways: [
      'Mammillated (bumpy) bile-stained outer coat on an oval egg = Ascaris lumbricoides fertile egg - pathognomonic.',
      'Decorticate eggs (smooth, no outer coat) are common after concentration methods - look for classic eggs in the same prep.',
      'Infertile eggs are elongated and irregular - difficult to ID alone; clinical context and co-detection of fertile eggs is required.'
    ],
    remember: 'Bumpy bile-stained oval = Ascaris. Decorticate (smooth oval, thick shell) = common after flotation. Infertile = elongated and irregular. Largest common intestinal helminth egg.',
    divr: {
      detect: 'Fresh or fixed stool - saline or iodine wet prep; formalin-ethyl acetate sedimentation; zinc sulfate flotation (may decorticate eggs)',
      identify: ['Fertile: oval 45-70 um, thick bile-stained mammillated (bumpy) outer coat, single unsegmented cell inside', 'Decorticate: oval, smooth surface, thick inner shell - coat lost during concentration', 'Infertile: elongated 80-90 um, irregular outline, disorganized granular content'],
      verify: 'Mammillated coat on fertile egg is pathognomonic; confirm decorticate/infertile by finding classic fertile eggs in same specimen; size (45-70 um, largest common helminth egg) supports ID when coat is absent',
      report: 'Report as Ascaris lumbricoides eggs detected; note egg type if relevant; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'trichostrongylus-egg',
    title: 'Trichostrongylus spp.: Elongated Hookworm-Like Egg',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for Trichostrongylus spp. eggs: larger, more elongated, and with at least one tapered end compared to hookworm. Advanced morula when passed. A size-matched hookworm mimic that requires careful measurement to distinguish.',
    boardTitle: 'Trichostrongylus egg vs. hookworm comparator',
    boardNote: 'Trichostrongylus: elongated oval, 73-95 x 40-50 um, asymmetric, one or both ends tapered. Advanced morula (~16 cells) when freshly passed. Hookworm (comparator): rounder oval, 55-75 um, symmetric blunt ends, early morula (4-8 cells). Both have thin shells and a clear space.',
    ariaLabel: 'Illustrated Trichostrongylus egg showing elongated oval with tapered end and advanced morula, compared to rounder hookworm egg with early morula',
    visualType: 'microscope-trichostrongylus',
    tubes: [
      {
        id: 'A',
        label: 'Trichostrongylus',
        name: 'Elongated oval 73-95 um, tapered end, advanced morula',
        colors: { slant: '#eae8dc', butt: '#907858', base: '#3a2818' },
        note: '73-95 x 40-50 um. More elongated than hookworm. One or both ends tapered or pointed. Advanced morula (often 16+ cells, or near larval stage) when freshly passed - more developed than hookworm at time of passing. Thin shell with clear space between shell and embryo. A zoonotic infection from soil or plant contamination in regions with sheep, goats, and other grazing animals (Asia, Middle East, Africa, rural South America).'
      },
      {
        id: 'B',
        label: 'Hookworm (comparator)',
        name: 'Rounder oval 55-75 um, blunt ends, early morula',
        colors: { slant: '#e4e0d4', butt: '#786848', base: '#302010' },
        note: '55-75 x 35-45 um. Rounder, symmetric oval with blunt ends at both poles. Early morula (2-8 cells) when freshly passed - less developed than Trichostrongylus at time of passing. Thin shell with clear space between shell and embryo. Differentiation from Trichostrongylus requires careful size measurement and assessment of end shape and morula cell count.'
      }
    ],
    readoutTitle: 'Trichostrongylus vs. hookworm - key discriminators',
    readoutRows: [
      ['More elongated oval, asymmetric outline', 'Trichostrongylus, not hookworm', 'Higher length-to-width ratio; one end typically more tapered - key low-power shape clue'],
      ['73-95 um long (larger than hookworm)', 'Trichostrongylus', 'Size overlap exists; use calibrated ocular micrometer for critical ID - key discriminator in practice'],
      ['One or both ends tapered or pointed', 'Trichostrongylus morphology', 'Hookworm ends are blunt and rounded; pointed or tapered ends increase suspicion for Trichostrongylus'],
      ['Advanced morula when passed (16+ cells)', 'Trichostrongylus - more developed', 'Hookworm morula is at 4-8 cell stage at time of passing; Trichostrongylus is further along in embryonation'],
      ['Thin shell, clear space between shell and embryo', 'Feature shared with hookworm - not discriminating', 'Both Trichostrongylus and hookworm share thin shell and clear space; use size, shape, and morula stage for ID']
    ],
    trapTitle: 'Trichostrongylus eggs are frequently misreported as hookworm',
    trapBody: 'Trichostrongylus eggs are found in routine stool specimens and commonly misidentified as hookworm due to similar morphology. Clinical consequences are minor as both respond to similar anthelmintics, but accurate identification matters in epidemiologic surveys and for distinguishing from other elongated eggs such as Capillaria philippinensis.',
    trapBullets: [
      'Geographic and exposure context: Trichostrongylus is more common in Asia, Middle East, and rural regions with grazing animals - zoonotic transmission.',
      'Capillaria philippinensis is another elongated egg mimic (~45 um, smaller) with less prominent polar plugs; associated with freshwater fish ingestion in endemic areas.',
      'Concentration methods (formalin-ethyl acetate sedimentation, zinc sulfate flotation) are both effective; larval culture on charcoal can provide species-level ID.'
    ],
    interpretationTitle: 'Trichostrongylus egg identification guide',
    interpretationRows: [
      ['Elongated oval, tapered end(s), 73-95 um, advanced morula', 'Trichostrongylus spp. - positive', 'Report with size measurement; clinical correlation required; anthelmintic treatment as clinically indicated'],
      ['Rounder oval, blunt ends, 55-75 um, early morula', 'Hookworm (Ancylostoma or Necator)', 'Differentiate by size and end shape; both respond to similar anthelmintics; report with clinical context'],
      ['Elongated egg, uncertain species', 'Trichostrongylus vs. hookworm - equivocal', 'Measure carefully; report with morphologic description; larval culture or molecular testing for definitive species ID; confirm per lab SOP']
    ],
    takeaways: [
      'Elongated oval + tapered end(s) + advanced morula = Trichostrongylus over hookworm.',
      'Size (73-95 um vs. 55-75 um for hookworm) is the most reliable discriminating feature - use a calibrated ocular micrometer.',
      'Both species respond to similar anthelmintic treatment; precise species ID is primarily of epidemiologic importance.'
    ],
    remember: 'Elongated + pointed end(s) + advanced morula = Trichostrongylus. Rounder + blunt ends + small morula = hookworm. Measure both.',
    divr: {
      detect: 'Fresh stool - saline or iodine wet prep; formalin-ethyl acetate sedimentation; zinc sulfate flotation; larval culture on charcoal for species confirmation',
      identify: ['Elongated oval, 73-95 um - larger and more elongated than hookworm (55-75 um)', 'One or both ends tapered or pointed; advanced morula when freshly passed (vs. hookworm: early morula, blunt ends)', 'Thin shell with clear space between shell and embryo'],
      verify: 'Calibrated ocular micrometer measurement is the most reliable tool; geographic exposure (grazing animals) supports Trichostrongylus; larval culture for definitive species ID',
      report: 'Report as Trichostrongylus spp. eggs detected with morphologic description and size; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'trichinella-spiralis-larva',
    title: 'Trichinella spiralis: Encysted Larva in Striated Muscle',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for Trichinella spiralis diagnosis: the coiled larva encapsulated in a nurse cell within striated muscle, seen on compressed muscle squash preparation and on H&E tissue section.',
    boardTitle: 'Trichinella spiralis: nurse cell capsule in striated muscle',
    boardNote: 'Muscle squash: coiled larva visible within an oval nurse cell capsule in the muscle fiber. H&E section: spindle-shaped fibrous capsule with coiled larva, surrounded by eosinophilic inflammatory infiltrate. Deltoid muscle is the preferred biopsy site. Not detected by routine stool O&P - Trichinella does not produce eggs passed in stool.',
    ariaLabel: 'Illustrated Trichinella spiralis coiled larva in oval nurse cell capsule within striated muscle, plus H&E section showing inflammatory capsule',
    visualType: 'microscope-trichinella',
    tubes: [
      {
        id: 'A',
        label: 'Muscle squash',
        name: 'Coiled larva in oval nurse cell capsule',
        colors: { slant: '#f8eed8', butt: '#c09050', base: '#503010' },
        note: 'Compressed muscle squash (between two slides): oval to spindle nurse cell capsule containing a tightly coiled (1-2 turns) larva. Larva is bright curved worm within the clear capsule space. Examine fresh or after HCl-pepsin digestion. The capsule forms from the host\'s modified muscle fiber cells. Deltoid muscle is the preferred biopsy site - taken from the most tender area.'
      },
      {
        id: 'B',
        label: 'H&E section',
        name: 'Spindle capsule, eosinophilic infiltrate',
        colors: { slant: '#f5e0e8', butt: '#b87898', base: '#582838' },
        note: 'H&E tissue section: spindle-shaped fibrous capsule (pale pink) surrounding a coiled larva in cross or longitudinal profile. Eosinophilic inflammatory infiltrate during acute infection; fibrosis and eventual calcification in chronic/resolved infection. Adult worms are in the small intestinal mucosa during weeks 1-2 of infection - rarely recovered in tissue biopsy. Calcified cysts may be incidentally noted on X-ray in old resolved infections.'
      }
    ],
    readoutTitle: 'What to look for in muscle biopsy',
    readoutRows: [
      ['Oval nurse cell capsule with coiled larva in muscle fiber', 'T. spiralis - diagnostic', 'Muscle squash is most sensitive; HCl-pepsin digestion releases larvae for identification and larval burden count (LPG)'],
      ['Spindle fibrous capsule, coiled larva, eosinophilic infiltrate', 'T. spiralis on H&E', 'Dense inflammatory cuff in early/heavy infection; fibrosis develops over weeks; calcification begins ~6-18 months'],
      ['Coiled larva 1 mm x 36 um', 'Trichinella larva dimensions', 'Count larvae per gram (LPG) in digested muscle - guides severity assessment; >200 LPG = severe infection'],
      ['No eggs or larvae in stool', 'Trichinella - not a stool-detectable infection', 'Stool O&P is NOT appropriate for trichinosis diagnosis; muscle biopsy or serology required'],
      ['Calcified spindle capsule, no viable larva', 'Old/resolved T. spiralis infection', 'Remote infection; larvae may remain viable for years before calcification; not necessarily indicative of active disease']
    ],
    trapTitle: 'Trichinella is not detected by routine stool O&P - a common ordering error',
    trapBody: 'Ordering stool O&P for suspected trichinosis is a common error. Trichinella spiralis does not produce eggs passed in stool. Diagnosis requires muscle biopsy (squash or H&E section) or serology (ELISA for anti-Trichinella IgG). Serology becomes positive ~3-5 weeks post-infection.',
    trapBullets: [
      'Undercooked pork, bear, or walrus meat is the most common exposure - cooking to 160 degrees F (71 degrees C) destroys all larvae.',
      'Clinical triad: periorbital edema + myalgia + eosinophilia after ingestion of suspect meat strongly supports trichinosis.',
      'Preferred biopsy site is the deltoid muscle from the most tender area; examine both as squash prep and H&E section.'
    ],
    interpretationTitle: 'Trichinella spiralis diagnosis guide',
    interpretationRows: [
      ['Coiled larva in oval nurse cell capsule in muscle fiber', 'T. spiralis - positive', 'Confirm with serology; report larval burden (LPG); anthelmintic + corticosteroids as clinically indicated'],
      ['Positive anti-Trichinella IgG ELISA', 'Probable T. spiralis infection', 'Serology is most practical; muscle biopsy if high suspicion and serology negative; serology may be negative in first 3-5 weeks'],
      ['Calcified spindle capsule, no viable larva', 'Old/resolved T. spiralis infection', 'Remote infection; clinical context required; not necessarily indicative of active disease requiring treatment']
    ],
    takeaways: [
      'Coiled larva in oval nurse cell capsule within striated muscle = Trichinella spiralis - diagnostic.',
      'Routine stool O&P is NOT appropriate - Trichinella does not pass eggs in stool; use muscle biopsy or serology.',
      'Clinical context: periorbital edema + myalgia + eosinophilia + undercooked meat ingestion = trichinosis until proven otherwise.'
    ],
    remember: 'Coiled worm in oval muscle capsule = Trichinella. Not in stool. Muscle squash + serology. Deltoid biopsy.',
    divr: {
      detect: 'Deltoid muscle biopsy - compressed squash prep (fresh or HCl-pepsin digestion) or H&E section; serology (anti-Trichinella IgG ELISA) is most practical after 3-5 weeks',
      identify: ['Oval to spindle-shaped nurse cell capsule within striated muscle fiber', 'Coiled larva (1-2 turns) inside capsule; ~1 mm x 36 um when uncoiled', 'Eosinophilic inflammatory infiltrate and fibrous capsule on H&E'],
      verify: 'HCl-pepsin digestion releases free larvae for count (LPG); serology confirms infection in most cases; muscle biopsy if serology negative with high clinical suspicion',
      report: 'Report as Trichinella spiralis larvae identified with specimen source and larval burden (LPG); clinical correlation required'
    }
  },
  {
    slug: 'microfilariae-blood-smear',
    title: 'Microfilariae: Sheathed vs. Unsheathed - Blood Smear',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for distinguishing microfilariae in thick blood smears: sheath presence and nuclei in the tail differentiate Wuchereria bancrofti (sheathed, no tail nuclei) from Loa loa (sheathed, nuclei to tail tip). Brugia malayi and Onchocerca volvulus noted for comparison.',
    boardTitle: 'Microfilaria ID: sheath + tail nuclei - the two critical features',
    boardNote: 'W. bancrofti: sheathed (sheath stains faintly or not on Giemsa), no nuclei in tail tip. Loa loa: sheathed (pink-red sheath on Giemsa), nuclei extend continuously to tail tip. Brugia malayi: sheathed (pink-red sheath), two discrete nuclei at tail tip separated by a clear space. Onchocerca volvulus: unsheathed, no tail nuclei - in skin snip, not blood.',
    ariaLabel: 'Illustrated microfilaria of Wuchereria bancrofti in blood smear showing sheath and clean tail, compared to Loa loa with sheath and continuous nuclei to tail tip',
    visualType: 'microscope-microfilaria',
    tubes: [
      {
        id: 'A',
        label: 'W. bancrofti',
        name: 'Sheathed, no tail nuclei - nocturnal periodicity',
        colors: { slant: '#f8e8e0', butt: '#a87070', base: '#482018' },
        note: '244-296 um long. Gently curved. Sheath present but stains faintly or not on Giemsa (Delafield hematoxylin stains sheath better). Tail tapered and clean - no nuclei in distal tip. Nocturnal periodicity (peak in peripheral blood 10 pm-2 am); collect blood at night. Causes lymphedema, elephantiasis, and hydrocele in chronic infection.'
      },
      {
        id: 'B',
        label: 'Loa loa',
        name: 'Sheathed, nuclei to tail tip - diurnal periodicity',
        colors: { slant: '#f0e8d8', butt: '#907050', base: '#402010' },
        note: '250-300 um long. Sheath present and stains pink-red on Giemsa. Body nuclei extend continuously all the way to the tail tip - key differentiator. Diurnal periodicity (peak 10 am-2 pm); collect blood mid-day. Transmitted by Chrysops (deer fly) in Central/West Africa. Do NOT administer DEC or ivermectin without caution in high microfilaria burden - risk of encephalopathy.'
      }
    ],
    readoutTitle: 'Microfilaria species - key discriminators',
    readoutRows: [
      ['Sheathed, no nuclei in tail tip', 'W. bancrofti or B. malayi', 'Both sheathed with no nuclei at tip; W. bancrofti: smooth tapered tail; B. malayi: two discrete terminal nuclei + secondary kink in body'],
      ['Sheathed, nuclei continuous to tail tip', 'Loa loa', 'Nuclei run uninterrupted to the very last cell at the tip - most reliable single differentiating feature'],
      ['Sheath stains pink-red on Giemsa', 'Loa loa or Brugia malayi', 'W. bancrofti sheath stains faintly or not at all on Giemsa - pink-red sheath shifts toward Loa or Brugia'],
      ['Unsheathed, no tail nuclei, from skin snip', 'Onchocerca volvulus', 'Skin snip (iliac crest or scapular area) incubated in saline - not blood draw; O. volvulus is absent from blood'],
      ['Secondary curve/kink + two discrete terminal tail nuclei', 'Brugia malayi', 'Characteristic body kink not in W. bancrofti; two discrete tail nuclei (not continuous) with a clear space between them']
    ],
    trapTitle: 'Collecting blood at the wrong time of day is the most common reason microfilariae are missed',
    trapBody: 'W. bancrofti and B. malayi are nocturnally periodic - draw blood at midnight. Loa loa is diurnally periodic - draw blood at noon. O. volvulus microfilariae are in skin, not blood - order skin snip, not blood draw. Knott\'s concentration (blood + 2% formalin, centrifuged) increases detection sensitivity and preserves sheath morphology.',
    trapBullets: [
      'Thick blood smear with Giemsa + Delafield hematoxylin staining is the standard method - thick smear concentrates the organisms.',
      'Do NOT administer DEC to patients with Loa loa microfilaremia >8,000 microfilariae/mL - risk of fatal encephalopathy.',
      'Antigen detection (OG4C3 for W. bancrofti) is available in some reference labs and does not require timed blood collection.'
    ],
    interpretationTitle: 'Microfilaria species identification guide',
    interpretationRows: [
      ['Sheathed, no tail nuclei, nocturnal blood', 'Wuchereria bancrofti', 'Report; diethylcarbamazine (DEC) or ivermectin + albendazole per guidelines; clinical correlation required'],
      ['Sheathed, nuclei to tail tip, diurnal blood, pink sheath', 'Loa loa', 'Report; check microfilaria density before treatment; DEC and ivermectin require caution at high densities; refer to infectious disease'],
      ['Sheathed, two discrete tail nuclei, pink sheath', 'Brugia malayi or B. timori', 'Report as Brugia spp. with morphologic findings; species-level PCR available at reference labs'],
      ['Unsheathed, no tail nuclei, skin snip', 'Onchocerca volvulus', 'Report from skin snip only; ivermectin is treatment of choice; do not administer DEC - risk of Mazzotti reaction']
    ],
    takeaways: [
      'Sheath absent = Onchocerca (skin snip). Sheath + no tail nuclei = W. bancrofti or B. malayi. Sheath + nuclei to tip = Loa loa.',
      'Sheath stain on Giemsa: faint/absent = W. bancrofti; pink-red = Loa loa or Brugia - key reagent tip.',
      'Timing of blood draw is critical: W. bancrofti/Brugia = midnight; Loa loa = noon.'
    ],
    remember: 'No sheath = O. volvulus (skin snip only). Sheath + clean tail = W. bancrofti. Sheath + nuclei to tip = Loa loa. Draw blood at the right time.',
    divr: {
      detect: 'Thick blood smear (Giemsa + Delafield hematoxylin) drawn at correct time of day; Knott\'s concentration for low-density; skin snip for Onchocerca volvulus only',
      identify: ['Sheath present or absent - first discriminating feature', 'Tail nuclei: none (W. bancrofti, Brugia, Onchocerca), continuous to tip (Loa loa), two discrete terminal (Brugia malayi)', 'Sheath staining on Giemsa: faint (W. bancrofti) vs. pink-red (Loa loa, Brugia)'],
      verify: 'Species confirmed by sheath, tail nuclei pattern, periodicity, and collection time; PCR for species-level ID in reference labs',
      report: 'Report as [species] microfilariae with stain used, collection time, and density estimate; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'taenia-spp-egg',
    title: 'Taenia spp. Egg and Gravid Proglottid',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for Taenia species identification: the round radially-striated embryophore egg (morphologically identical between T. solium and T. saginata) and the gravid proglottid uterine branch count that separates the two clinically critical species.',
    boardTitle: 'Taenia egg (species indeterminate) + proglottid branch count for species ID',
    boardNote: 'Taenia spp. egg: round, 30-45 um, thick radially striated embryophore, inner oncosphere with 3 hooklet pairs. T. solium vs. T. saginata: identical by egg - distinguish by gravid proglottid. T. saginata: >13 lateral uterine branches per side. T. solium: 8-13 lateral branches. T. solium eggs can cause cysticercosis - species distinction has major clinical consequence.',
    ariaLabel: 'Illustrated Taenia spp. egg with thick radially striated embryophore and hooklets, plus gravid proglottid comparison showing many uterine branches for T. saginata versus fewer branches for T. solium',
    visualType: 'microscope-taenia-egg',
    tubes: [
      {
        id: 'A',
        label: 'Taenia egg',
        name: 'Round 30-45 um, radially striated embryophore',
        colors: { slant: '#f5e8c8', butt: '#907048', base: '#3a2010' },
        note: '30-45 um. Nearly round. Thick outer embryophore with prominent radial striations (spoke-like pattern). Inner oncosphere: round with 3 pairs (6) of hooklets. Eggs of T. solium and T. saginata are morphologically identical. Also indistinguishable from Echinococcus granulosus eggs - clinical context is critical. When T. solium is possible, alert the clinician: cysticercosis risk to contacts who ingest eggs.'
      },
      {
        id: 'B',
        label: 'Gravid proglottid',
        name: 'Uterine branches: >13 = T. saginata; 8-13 = T. solium',
        colors: { slant: '#e8e0d0', butt: '#706048', base: '#302010' },
        note: 'Gravid proglottid (excreted segment): inject with India ink through uterine pore to visualize lateral uterine branches. T. saginata: >13 lateral branches per side - dichotomously branching, thin. T. solium: 8-13 branches per side - fewer, thicker. Species distinction is critical: T. solium tapeworm carriers shed eggs that can cause cysticercosis (CNS, eye, muscle) in contacts and in the patient themselves via autoinfection.'
      }
    ],
    readoutTitle: 'What to look for in stool',
    readoutRows: [
      ['Round, thick radially striated embryophore, 30-45 um', 'Taenia spp. egg - cannot determine species by egg alone', 'Also indistinguishable from Echinococcus granulosus eggs; clinical context is essential'],
      ['Inner oncosphere with 3 hooklet pairs (6 hooklets)', 'Taenia or Echinococcus cestode egg feature', 'Hooklet pairs distinguish cestode eggs from other helminth eggs; clinical context separates Taenia from Echinococcus'],
      ['>13 lateral uterine branches per side', 'T. saginata gravid proglottid', 'India ink injection to fill uterine branches; count from uterine stem to proglottid margin; dichotomous branching pattern'],
      ['8-13 lateral uterine branches per side', 'T. solium gravid proglottid', 'Fewer, thicker branches; immediately alert clinician - cysticercosis risk and public health implications'],
      ['Scolex: 4 suckers + rostellum with hooks', 'T. solium scolex ("armed")', 'T. saginata scolex: 4 suckers, no rostellum ("unarmed"); rostellum with hooks confirms T. solium if scolex recovered']
    ],
    trapTitle: 'T. solium eggs in environment pose cysticercosis risk to contacts and to the patient',
    trapBody: 'T. solium tapeworm carriers shed eggs that can be ingested by contacts (and via autoinfection by the carrier), causing cysticercosis - larval cysts in brain (neurocysticercosis), eye, or other tissues. Neurocysticercosis is the most common cause of adult-onset seizures in many endemic regions. When T. solium is identified or suspected, notify the clinician immediately.',
    trapBullets: [
      'Taenia eggs in stool are infectious and environmentally stable - handle with appropriate precautions.',
      'T. saginata causes only intestinal infection (taeniasis); T. solium causes both taeniasis and cysticercosis - the distinction is life-critical.',
      'India ink injection: 28-gauge needle at uterine pore end of proglottid; inject slowly; clear in glycerol before counting branches.'
    ],
    interpretationTitle: 'Taenia species identification guide',
    interpretationRows: [
      ['Taenia eggs in stool, no proglottid available', 'Taenia spp. - species indeterminate', 'Report as Taenia spp. eggs; alert clinician to T. solium possibility; request proglottid or scolex for species ID'],
      ['Proglottid: >13 lateral uterine branches', 'Taenia saginata', 'Report as T. saginata; praziquantel or niclosamide; lower public health concern than T. solium'],
      ['Proglottid: 8-13 lateral uterine branches', 'Taenia solium', 'Report as T. solium; urgent clinician notification; praziquantel; follow local public health protocols for cysticercosis risk']
    ],
    takeaways: [
      'Taenia spp. egg: round, thick radially striated - species cannot be determined from the egg alone.',
      'Species determination requires gravid proglottid India ink branch count: >13 = T. saginata; 8-13 = T. solium.',
      'T. solium identification is a critical alert - immediate clinician communication for cysticercosis risk assessment.'
    ],
    remember: 'Taenia egg = species indeterminate. Proglottid decides: >13 branches = T. saginata (beef). 8-13 branches = T. solium (pork, cysticercosis risk).',
    divr: {
      detect: 'Stool O&P (saline or iodine wet prep; formalin-ethyl acetate concentration); proglottid segments often found grossly in stool or on perianal skin',
      identify: ['Round egg, 30-45 um, thick radially striated embryophore, 3 hooklet pairs inside - species indeterminate by egg', 'Gravid proglottid India ink branch count: >13 = T. saginata; 8-13 = T. solium', 'Scolex with rostellum + hooks = T. solium ("armed"); no rostellum = T. saginata ("unarmed")'],
      verify: 'India ink proglottid branch count is the standard method; PCR for species-level confirmation; scolex examination if recovered',
      report: 'Report as Taenia spp. eggs (species indeterminate) if only eggs present; report species if proglottid confirms; clinical correlation required'
    }
  },
  {
    slug: 'paragonimus-westermani-egg',
    title: 'Paragonimus westermani and Clonorchis sinensis Eggs',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for lung and liver trematode eggs: Paragonimus westermani (large, golden-brown, operculated with shouldered rim) found in sputum or stool, and Clonorchis sinensis (tiny flask-shaped, operculated with prominent shoulders and abopercular knob) found in stool.',
    boardTitle: 'Trematode eggs: Paragonimus (large, shouldered) vs. Clonorchis (tiny, vase-shaped)',
    boardNote: 'Paragonimus westermani: 80-120 x 45-60 um - large, ovoid, golden-brown, shouldered opercular rim, thickened abopercular shell. In sputum (rust-colored) or stool. Clonorchis sinensis: 28-34 x 12-19 um - very small, flask-shaped, yellow-brown, prominent opercular shoulders (inner ridge at opercular rim), small abopercular knob, embryonated when passed. In stool.',
    ariaLabel: 'Illustrated Paragonimus westermani egg showing large oval operculated egg with shouldered opercular rim and thickened abopercular wall, beside tiny Clonorchis sinensis flask-shaped egg with opercular shoulders',
    visualType: 'microscope-paragonimus',
    tubes: [
      {
        id: 'A',
        label: 'Paragonimus westermani',
        name: 'Large 80-120 um, shouldered operculum, thickened abopercular shell',
        colors: { slant: '#f0e4c0', butt: '#b89050', base: '#5a3010' },
        note: '80-120 x 45-60 um. Large, broadly ovoid, golden-brown. Shouldered operculum - the egg wall thickens and forms a rim (shoulder) where the operculum meets the shell; the operculum appears to sit in a groove. Abopercular shell is notably thickened. Unembryonated when passed (uniform granular content). Found in: sputum (characteristic rust-colored hemoptysis) or stool (if sputum swallowed). Lung fluke - acquired by ingestion of raw or undercooked freshwater crabs or crayfish.'
      },
      {
        id: 'B',
        label: 'Clonorchis sinensis',
        name: 'Tiny 28-34 um, flask-shaped, opercular shoulders, abopercular knob',
        colors: { slant: '#e8e0c8', butt: '#9a7838', base: '#3a2810' },
        note: '28-34 x 12-19 um. Very small - the smallest common trematode egg. Flask or vase-shaped (narrow at opercular end, widening toward the middle). Yellow-brown. Prominent opercular shoulders (inner ridge clearly visible at opercular rim - diagnostic). Small knob at the abopercular end. Embryonated (miracidium inside) when passed. Found in stool. Bile duct fluke - acquired from raw or undercooked freshwater fish. Opisthorchis viverrini (Southeast Asia) is morphologically identical.'
      }
    ],
    readoutTitle: 'Trematode egg differential - what to look for',
    readoutRows: [
      ['Large ovoid egg, 80-120 um, shouldered operculum, golden-brown, thickened abopercular shell', 'Paragonimus westermani', 'Largest common trematode egg in sputum; shouldered operculum + abopercular thickening = diagnostic pattern'],
      ['Small flask-shaped egg, 28-34 um, prominent opercular shoulders, abopercular knob', 'Clonorchis sinensis or Opisthorchis spp.', 'Smallest common trematode egg; prominent shoulders + tiny knob at both poles; requires concentration method and high-power exam'],
      ['Rust-colored sputum + operculated egg', 'Paragonimus - paragonimiasis', 'Rust-colored "coffee-ground" hemoptysis is characteristic; examine both sputum and stool for eggs'],
      ['Operculated egg, 58-76 um, no pronounced shoulder', 'Diphyllobothrium latum (cestode, not trematode)', 'D. latum: operculated, yellowish-brown, smooth rim without shoulder, small knob - rule out by size and shoulder absence'],
      ['Very large operculated egg, 130-150 um, no shoulder', 'Fasciola hepatica (sheep liver fluke)', 'Fasciola eggs are larger than Paragonimus and lack the shouldered opercular rim; geographic exposure to sheep pastures or watercress']
    ],
    trapTitle: 'Paragonimus eggs confused with D. latum; Clonorchis eggs missed due to their tiny size',
    trapBody: 'Paragonimus eggs in sputum may be overlooked or confused with Diphyllobothrium latum (fish tapeworm) - D. latum is operculated but lacks the shouldered rim and is a cestode, not a trematode. Clonorchis eggs are the smallest common trematode egg and require careful concentration (formalin-ethyl acetate sedimentation) and high-power examination.',
    trapBullets: [
      'Always examine sputum AND stool for Paragonimus - sputum may be positive when stool concentration is negative.',
      'Fasciola hepatica: 130-150 x 65-90 um - larger than Paragonimus, lacks shouldered opercular rim; geographic exposure to sheep, watercress, or freshwater vegetation.',
      'Clonorchis/Opisthorchis geography: C. sinensis (East Asia, China, Korea); O. viverrini (Southeast Asia, Thailand, Laos) - morphologically indistinguishable.'
    ],
    interpretationTitle: 'Trematode egg identification guide',
    interpretationRows: [
      ['Large ovoid 80-120 um, shouldered opercular rim, abopercular thickening', 'Paragonimus westermani - positive', 'Report with specimen source (sputum or stool); praziquantel treatment; clinical correlation and imaging recommended'],
      ['Small flask-shaped 28-34 um, prominent opercular shoulders, abopercular knob', 'Clonorchis sinensis or Opisthorchis spp.', 'Report with geographic context; praziquantel treatment; liver function tests and biliary imaging recommended'],
      ['Operculated egg not matching above patterns', 'Trematode egg - consult reference table', 'Measure carefully; consult species-specific size table; consider Fasciola (larger, no shoulder), D. latum (no shoulder, cestode)']
    ],
    takeaways: [
      'Paragonimus: large 80-120 um, golden-brown, shouldered opercular rim + thickened abopercular shell - in sputum or stool.',
      'Clonorchis: tiny 28-34 um, flask-shaped, prominent opercular shoulders + abopercular knob - smallest common trematode egg.',
      'Fasciola (130-150 um) is larger than Paragonimus and lacks the shouldered rim - the largest common operculated trematode egg.'
    ],
    remember: 'Paragonimus: large, shouldered, in sputum or stool. Clonorchis: tiny, vase-shaped with knob. Fasciola: largest operculated egg, no shoulder.',
    divr: {
      detect: 'Formalin-ethyl acetate sedimentation (method of choice); direct saline prep; sputum exam for Paragonimus - examine concentrated sediment from spontaneous or induced sputum',
      identify: ['Paragonimus: 80-120 um, ovoid, shouldered opercular rim, thickened abopercular shell, golden-brown, unembryonated', 'Clonorchis: 28-34 um, flask-shaped, prominent opercular shoulders, abopercular knob, embryonated, yellow-brown', 'Measure with calibrated ocular micrometer - size is the primary discriminator among operculated eggs'],
      verify: 'Calibrated micrometer; reference size table for operculated eggs; clinical and geographic context; serology available for Paragonimus (ELISA) and Fasciola',
      report: 'Report as [species] eggs with specimen source and measured size; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'schistosoma-egg',
    title: 'Schistosoma spp. Eggs: Spine Location by Species',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for Schistosoma species identification by egg spine position: S. mansoni (large, prominent lateral spine), S. haematobium (terminal spine), and S. japonicum (small, rudimentary lateral spine or none).',
    boardTitle: 'Schistosoma egg spine: lateral = S. mansoni, terminal = S. haematobium, small/absent = S. japonicum',
    boardNote: 'S. mansoni: 140-240 x 50-80 um - large, prominent lateral spine. In stool. S. haematobium: 110-170 x 40-70 um - terminal spine. In urine (or stool). S. japonicum: 70-100 x 55-65 um - smallest, nearly round, small rudimentary lateral spine (may be absent). In stool. All eggs are non-operculated, acid-fast negative, and contain a fully developed miracidium when fresh.',
    ariaLabel: 'Illustrated Schistosoma mansoni egg with prominent lateral spine and Schistosoma haematobium egg with terminal spine',
    visualType: 'microscope-schistosoma',
    tubes: [
      {
        id: 'A',
        label: 'S. mansoni',
        name: 'Large lateral spine - in stool',
        colors: { slant: '#f0e8d4', butt: '#9a7850', base: '#402810' },
        note: '140-240 x 50-80 um. Large, elongated. Prominent lateral spine at roughly the middle-to-posterior portion - this is the most recognizable feature. Contains a fully developed miracidium (embryonated). Found in stool - blood flukes in mesenteric venules of the large intestine. Endemic in Africa, Brazil, Caribbean, and Middle East. S. mansoni is also acid-fast positive in some preparations - do not confuse with AFB organisms.'
      },
      {
        id: 'B',
        label: 'S. haematobium',
        name: 'Terminal spine - in urine',
        colors: { slant: '#e8e0d0', butt: '#887050', base: '#382010' },
        note: '110-170 x 40-70 um. Elongated, pointed at one end. Terminal spine at the abopercular (posterior) pole - the spine projects from the very tip. Found primarily in urine (bladder venule worms) - collect urine at noon when egg excretion peaks; may also be found in stool. Associated with urinary schistosomiasis, hematuria, and bladder cancer risk in endemic regions. Endemic in Africa and Middle East.'
      }
    ],
    readoutTitle: 'Schistosoma species - what to look for',
    readoutRows: [
      ['Large elongated egg, prominent lateral spine, in stool', 'Schistosoma mansoni', 'Lateral spine at mid-to-posterior portion is pathognomonic for S. mansoni; examine stool with concentration method'],
      ['Elongated egg, pointed terminal spine at one pole, in urine', 'Schistosoma haematobium', 'Terminal spine at the posterior tip; collect urine at noon peak; filter 10 mL urine through membrane filter for best yield'],
      ['Small, nearly round egg, rudimentary or no visible spine', 'Schistosoma japonicum', '70-100 x 55-65 um - smallest and most round; small lateral spine may be absent or barely visible; found in stool; Far East distribution'],
      ['Embryonated egg (miracidium visible inside)', 'Schistosoma egg - eggs are embryonated when passed', 'All Schistosoma eggs contain a fully developed miracidium when freshly passed - this distinguishes them from unembryonated trematode eggs'],
      ['No operculum', 'Schistosoma feature - not an operculated trematode egg', 'Schistosoma eggs have no operculum - all other common trematode eggs (Paragonimus, Clonorchis, Fasciola, D. latum) are operculated']
    ],
    trapTitle: 'S. japonicum eggs may be missed due to their small size and subtle spine',
    trapBody: 'S. japonicum eggs are the smallest Schistosoma eggs and have a rudimentary or absent lateral spine - they may be overlooked or confused with other round organisms. Multiple stool examinations may be needed. Rectal biopsy has higher sensitivity for S. japonicum than stool exam in low-burden infections.',
    trapBullets: [
      'For S. haematobium: collect urine midday (10 am-2 pm) - egg excretion peaks at noon; filter 10 mL through a 10-um membrane filter.',
      'Katayama fever (acute schistosomiasis): occurs 2-8 weeks post-exposure - serology is more sensitive than stool/urine at this stage.',
      'Schistosoma eggs in tissue biopsy: rectal snip or bladder biopsy increases diagnostic yield for chronic low-density infections.'
    ],
    interpretationTitle: 'Schistosoma species identification guide',
    interpretationRows: [
      ['Large egg, prominent lateral spine, in stool', 'Schistosoma mansoni - positive', 'Report; praziquantel treatment; clinical correlation; baseline CBC and liver function'],
      ['Elongated egg, terminal spine, in urine or stool', 'Schistosoma haematobium - positive', 'Report; praziquantel; urinalysis, renal function; imaging if long-standing infection (bladder wall changes)'],
      ['Small nearly-round egg, small/no spine, in stool', 'Schistosoma japonicum - positive', 'Report; praziquantel (higher dose than other species); hepatic ultrasound in heavy or chronic infection']
    ],
    takeaways: [
      'S. mansoni: large + prominent lateral spine + in stool. S. haematobium: terminal spine + in urine. S. japonicum: smallest + nearly round + minimal spine.',
      'No operculum on any Schistosoma egg - the absence of an operculum distinguishes Schistosoma from all common operculated trematode eggs.',
      'Collect at the right time from the right specimen: stool for S. mansoni/japonicum; urine at noon for S. haematobium.'
    ],
    remember: 'Lateral spine = S. mansoni (stool). Terminal spine = S. haematobium (urine). Small, round, tiny spine = S. japonicum (stool). No operculum on any.',
    divr: {
      detect: 'Stool O&P with concentration (S. mansoni, S. japonicum); urine filtration at midday (S. haematobium); rectal or bladder biopsy for low-burden or chronic infection',
      identify: ['Lateral spine (mid-to-posterior): S. mansoni, 140-240 um', 'Terminal spine: S. haematobium, 110-170 um; in urine primarily', 'Small, nearly round, minimal spine: S. japonicum, 70-100 um; in stool; Far East'],
      verify: 'Egg morphology and spine position are usually sufficient; serology (ELISA) for early infection or low-burden; PCR at reference labs for species confirmation',
      report: 'Report as Schistosoma [species] eggs with specimen source; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'hymenolepis-nana-egg',
    title: 'Hymenolepis nana and H. diminuta Eggs',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for dwarf and rat tapeworm egg identification: H. nana (thin-shelled, 6 hooklets, polar filaments in the space between oncosphere and eggshell - diagnostic) versus H. diminuta (same size range but no polar filaments, larger eggs).',
    boardTitle: 'Hymenolepis eggs: polar filaments (H. nana) vs. no polar filaments (H. diminuta)',
    boardNote: 'H. nana: 30-47 um, round to oval, thin shell, inner oncosphere with 3 hooklet pairs, polar filaments in the space between the oncosphere and outer shell - pathognomonic. H. diminuta: 70-85 um, larger, round, thick shell, inner oncosphere with 3 hooklet pairs, NO polar filaments, yellowish color. H. nana is the most common tapeworm in the US (direct fecal-oral transmission, no intermediate host required).',
    ariaLabel: 'Illustrated Hymenolepis nana egg showing thin shell, oncosphere with hooklets, and polar filaments, compared to Hymenolepis diminuta egg with no polar filaments',
    visualType: 'microscope-hymenolepis',
    tubes: [
      {
        id: 'A',
        label: 'H. nana',
        name: 'Round 30-47 um, polar filaments - diagnostic',
        colors: { slant: '#f5ecd0', butt: '#988050', base: '#383010' },
        note: '30-47 um. Round to broadly oval. Thin outer shell. Inner oncosphere with 3 hooklet pairs (6 hooklets). Polar filaments in the space between the oncosphere and the outer shell - 4-8 thread-like filaments running from each pole of the oncosphere - this is the pathognomonic feature that distinguishes H. nana from all other cestode eggs. Most common tapeworm in the US. Direct fecal-oral transmission - no intermediate host required. Common in children and institutions.'
      },
      {
        id: 'B',
        label: 'H. diminuta',
        name: 'Larger 70-85 um, no polar filaments, yellowish',
        colors: { slant: '#ece4c0', butt: '#8a7038', base: '#382808' },
        note: '70-85 um. Larger than H. nana. Round to oval, yellow-brown outer shell. Inner oncosphere with 3 hooklet pairs. NO polar filaments between oncosphere and outer shell - clear space is empty. Transmitted via accidental ingestion of insect intermediate hosts (flour beetles, grain beetles) - rare human infection. Rats and mice are the natural definitive hosts. H. diminuta infection in humans is uncommon and typically mild.'
      }
    ],
    readoutTitle: 'Hymenolepis egg differential',
    readoutRows: [
      ['Small round egg 30-47 um, thin shell, polar filaments in clear space', 'Hymenolepis nana', 'Polar filaments (thread-like strands between oncosphere and outer shell) are pathognomonic for H. nana'],
      ['Larger round egg 70-85 um, yellow-brown shell, no polar filaments', 'Hymenolepis diminuta', 'Clear space between oncosphere and outer shell is empty (no filaments); size distinguishes from H. nana'],
      ['3 hooklet pairs (6 hooklets) inside oncosphere', 'Hymenolepis or other cestode egg feature', 'Hooklets in inner oncosphere are shared with Taenia eggs; size and filament presence distinguish'],
      ['Taenia egg (30-45 um) vs. H. nana (30-47 um)', 'Overlap in size - use shell and filaments', 'Taenia egg has thick radially striated embryophore; H. nana has thin shell + polar filaments; both about the same size'],
      ['Direct fecal-oral transmission, no intermediate host', 'H. nana biology', 'H. nana is unique among tapeworms - eggs are infectious when swallowed directly; autoinfection can occur; no insect needed']
    ],
    trapTitle: 'H. nana polar filaments may be subtle - use good optics and concentration',
    trapBody: 'The polar filaments of H. nana can be difficult to see on direct wet prep, especially in fixed specimens. Formalin-ethyl acetate concentration and iodine staining improve visualization. The filaments are thread-like structures running from the poles of the inner oncosphere to the outer shell - do not mistake the clear space for simply having "no filaments."',
    trapBullets: [
      'H. nana has no intermediate host - children can have large worm burdens from autoinfection; treat all household contacts in institutions.',
      'H. diminuta requires an insect intermediate host (grain beetle) - human infections are rare and typically self-limited.',
      'Niclosamide or praziquantel are both effective for H. nana; repeat stool exam 3-4 weeks post-treatment to confirm clearance.'
    ],
    interpretationTitle: 'Hymenolepis species identification guide',
    interpretationRows: [
      ['Small round 30-47 um, thin shell, polar filaments', 'Hymenolepis nana - positive', 'Report; praziquantel; treat household contacts and institutional contacts; repeat stool exam post-treatment'],
      ['Larger round 70-85 um, yellow-brown shell, no filaments', 'Hymenolepis diminuta - positive', 'Report; praziquantel; inquire about grain beetle exposure; typically mild infection'],
      ['Round cestode egg, filaments or no filaments uncertain', 'Hymenolepis spp. - needs clarification', 'Measure carefully; use concentration and iodine stain to look for filaments; consult reference material; report with description']
    ],
    takeaways: [
      'H. nana: small 30-47 um, thin shell, polar filaments between oncosphere and outer shell - pathognomonic.',
      'H. diminuta: larger 70-85 um, yellow-brown shell, NO polar filaments - clear space between oncosphere and shell is empty.',
      'H. nana is the most common US tapeworm - direct fecal-oral transmission, no insect needed; H. diminuta requires a beetle intermediate host.'
    ],
    remember: 'Polar filaments = H. nana (pathognomonic). No filaments + larger + yellow-brown = H. diminuta. Size + filaments = the two distinguishing features.',
    divr: {
      detect: 'Stool O&P with formalin-ethyl acetate concentration (method of choice); iodine wet prep to visualize hooklets and filaments; direct saline prep adequate for heavy infections',
      identify: ['H. nana: round 30-47 um, thin shell, inner oncosphere with 3 hooklet pairs, polar filaments (thread-like) in the space between oncosphere and outer shell', 'H. diminuta: round 70-85 um, yellow-brown shell, 3 hooklet pairs, NO polar filaments - empty clear space', 'Polar filament presence/absence is the key discriminating feature'],
      verify: 'Iodine stain and concentration improve visualization of filaments; measure carefully (size discriminates H. nana from H. diminuta); repeat exam if negative and high suspicion',
      report: 'Report as Hymenolepis nana or H. diminuta eggs; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'diphyllobothrium-latum-egg',
    title: 'Diphyllobothrium latum: Operculated Fish Tapeworm Egg',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for the fish tapeworm egg: Diphyllobothrium latum produces the largest egg of the common intestinal cestodes - broadly oval, operculated, yellow-brown, with a small knob at the abopercular end and an unembryonated interior.',
    boardTitle: 'D. latum egg: operculated, smooth-rimmed, yellow-brown, 58-76 um',
    boardNote: 'D. latum: 58-76 x 40-50 um - broadly oval, yellow-brown, thin shell. Operculum at one pole (flat lid, no shoulder). Small knob (abopercular button) at the opposite pole. Unembryonated when passed. Found in stool. Acquired from raw or undercooked freshwater fish (salmon, pike, perch). Associated with vitamin B₁₂ deficiency/megaloblastic anemia in heavy infections.',
    ariaLabel: 'Illustrated Diphyllobothrium latum egg showing broadly oval operculated egg with smooth opercular rim, yellow-brown shell, and small abopercular knob',
    visualType: 'microscope-diphyllobothrium',
    tubes: [
      {
        id: 'A',
        label: 'D. latum egg',
        name: 'Oval 58-76 um, operculated, smooth rim, abopercular knob',
        colors: { slant: '#f0e8d0', butt: '#a88848', base: '#4a2810' },
        note: '58-76 x 40-50 um. Broadly oval. Yellow-brown thin shell. Operculum at one pole - a flat lid with a smooth rim (no shoulder or prominent ridge at the opercular junction - key difference from Paragonimus). Small abopercular knob (button-like) at the opposite pole. Unembryonated when passed. Found in stool. The largest common intestinal cestode egg. Acquired by ingestion of raw or undercooked freshwater fish. May cause megaloblastic anemia via vitamin B₁₂ competition.'
      },
      {
        id: 'B',
        label: 'Key comparators',
        name: 'Paragonimus (shouldered rim) vs. Fasciola (no knob, larger)',
        colors: { slant: '#e8e0cc', butt: '#907848', base: '#3a2810' },
        note: 'Paragonimus westermani (80-120 um): larger, prominent shouldered opercular rim (the operculum sits in a groove with a widened shell rim - absent in D. latum). Fasciola hepatica (130-150 um): largest operculated egg, no opercular shoulder, no abopercular knob, very large. Clonorchis sinensis (28-34 um): much smaller, vase-shaped with prominent shoulder and knob. D. latum occupies the middle size range with a smooth rim and small knob - no other common trematode/cestode occupies this morphologic space.'
      }
    ],
    readoutTitle: 'D. latum vs. operculated trematode eggs',
    readoutRows: [
      ['Broadly oval, 58-76 um, smooth opercular rim, small abopercular knob', 'Diphyllobothrium latum (cestode)', 'The smooth rim (no shoulder) + small knob + intermediate size = D. latum; not a trematode'],
      ['Shouldered opercular rim (groove at opercular junction)', 'Paragonimus westermani (trematode)', 'Paragonimus is larger (80-120 um) and has a prominent shouldered rim; D. latum rim is smooth'],
      ['Very large operculated egg (130-150 um), no shoulder, no knob', 'Fasciola hepatica (trematode)', 'Fasciola is the largest common operculated egg; lacks both opercular shoulder and abopercular knob'],
      ['Very small flask-shaped egg (28-34 um), prominent shoulders', 'Clonorchis sinensis (trematode)', 'Much smaller than D. latum; prominent opercular shoulders; abopercular knob present'],
      ['Vitamin B₁₂ deficiency + operculated egg in stool', 'D. latum - fish tapeworm', 'D. latum competes for vitamin B₁₂ in the terminal ileum - megaloblastic anemia is a complication in heavy infection']
    ],
    trapTitle: 'D. latum is a cestode (tapeworm), not a trematode - treat differently',
    trapBody: 'D. latum eggs resemble operculated trematode eggs but this is a cestode (tapeworm). Treatment is praziquantel or niclosamide - the same drugs that treat other tapeworms. The key clinical association is vitamin B₁₂ deficiency with megaloblastic anemia in heavy infections. Recheck stool 3-6 weeks after treatment.',
    trapBullets: [
      'Endemic regions: Great Lakes (US), Scandinavia, Siberia, Far East - wherever raw freshwater fish (salmon, pike, perch) is consumed.',
      'Proglottids (segments) are much wider than long (>=3 x 11 mm) - the opposite of Taenia proglottids; the broad proglottid is how D. latum got its name ("latum" = broad).',
      'Plerocercoid larva in freshwater fish is the infective stage - cooking to 60 degrees C (140 degrees F) or freezing at −20 degrees C for 24 hours kills the larva.'
    ],
    interpretationTitle: 'Diphyllobothrium latum identification guide',
    interpretationRows: [
      ['Broadly oval 58-76 um, smooth opercular rim, abopercular knob', 'Diphyllobothrium latum - positive', 'Report; praziquantel; measure vitamin B₁₂; dietary history (raw freshwater fish); avoid raw fish going forward'],
      ['Similar egg without knob or with shoulder', 'Reconsider - see comparator table', 'With shoulder = Paragonimus; much larger = Fasciola; much smaller = Clonorchis; measure and re-examine'],
      ['Broad proglottid (wider than long) in stool', 'D. latum proglottid', 'Typical proglottid is 2-4 mm wide x 10-15 mm long; much wider than long - distinctive cestode segment morphology']
    ],
    takeaways: [
      'D. latum: broadly oval 58-76 um, smooth opercular rim (no shoulder), small abopercular knob, yellow-brown - the largest common intestinal cestode egg.',
      'Smooth rim (no shoulder) distinguishes D. latum from Paragonimus; smaller size distinguishes it from Fasciola.',
      'Vitamin B₁₂ deficiency + megaloblastic anemia in a fish-eating patient = D. latum until proven otherwise.'
    ],
    remember: 'D. latum: smooth rim + small knob + yellow-brown + 58-76 um. No shoulder (≠ Paragonimus). Freshwater fish source. May deplete vitamin B₁₂.',
    divr: {
      detect: 'Stool O&P with formalin-ethyl acetate concentration; direct saline prep if heavy infection; proglottid examination if segments passed',
      identify: ['Broadly oval, 58-76 um, yellow-brown thin shell', 'Operculum at one pole - smooth rim with no prominent shoulder or groove', 'Small abopercular knob (button) at opposite pole; unembryonated interior'],
      verify: 'Measure carefully - size and rim morphology distinguish D. latum from Paragonimus (80-120 um, shouldered) and Fasciola (130-150 um); proglottid morphology confirms if segments recovered',
      report: 'Report as Diphyllobothrium latum eggs with measured size; vitamin B₁₂ level recommended; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'echinococcus-granulosus-hydatid',
    title: 'Echinococcus granulosus: Hydatid Sand and Protoscoleces',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for Echinococcus granulosus (hydatid disease) laboratory findings: protoscoleces in hydatid fluid (with suckers and hooklets), brood capsules, and the thick laminated cyst wall in tissue - not detected by routine stool O&P.',
    boardTitle: 'Echinococcus granulosus: protoscolex in hydatid fluid + thick laminated cyst wall',
    boardNote: 'Hydatid disease: fluid from surgically excised or aspirated hydatid cyst contains "hydatid sand" - protoscoleces (immature scoleces with 4 suckers + rostellum with 2 rows of hooklets) and free hooklets. Brood capsules may also be present. Cyst wall on histology: thick laminated (wavy, acellular) outer wall + inner germinal (nucleated) layer. Stool O&P is NOT appropriate - E. granulosus eggs are not passed in human stool.',
    ariaLabel: 'Illustrated Echinococcus granulosus protoscolex showing suckers and hooklets in hydatid fluid, plus laminated cyst wall showing layered structure',
    visualType: 'microscope-echinococcus',
    tubes: [
      {
        id: 'A',
        label: 'Protoscolex (hydatid sand)',
        name: '4 suckers + rostellum with 2 rows of hooklets',
        colors: { slant: '#f0ecd8', butt: '#a09060', base: '#3a2810' },
        note: 'Protoscolex: small (170-220 um), invaginated or evaginated. 4 suckers (cup-shaped, clearly visible on evaginated forms). Rostellum with 2 rows of hooks (large and small alternating). Free hooklets may be seen in fluid (20-40 um, curved with a pointed blade). Hydatid sand = fluid containing protoscoleces + free hooklets + brood capsules - aspirated from cyst under image guidance or at surgery. Handle with care - cyst rupture can cause anaphylaxis and seeding of secondary cysts.'
      },
      {
        id: 'B',
        label: 'Laminated cyst wall',
        name: 'Thick wavy acellular outer layer + germinal inner layer',
        colors: { slant: '#e8e4d4', butt: '#888068', base: '#302818' },
        note: 'Histology of cyst wall: thick outer laminated layer (wavy, acellular, eosinophilic - like a stack of membranes or "frosted glass" appearance) and a thin inner germinal (nucleated epithelial) layer from which protoscoleces and brood capsules bud. A fibrous host-derived pericyst surrounds the laminated wall. The laminated wall is pathognomonic for Echinococcus - Entamoeba hepatic abscess and pyogenic abscess lack this structure. PAS stain highlights the laminated wall.'
      }
    ],
    readoutTitle: 'What to look for in hydatid fluid or tissue',
    readoutRows: [
      ['Small oval structures with suckers and hooklets in fluid', 'Echinococcus protoscoleces (hydatid sand)', 'Evaginated forms show 4 suckers and rostellar hooklets clearly; invaginated forms appear as granular ovals - look for free hooklets to confirm'],
      ['Free hooklets (20-40 um, curved with blade and handle)', 'Echinococcus granulosus hooklets', 'Hooklets persist long after protoscolex degeneration - a single hooklet in cyst fluid is diagnostic of echinococcal cyst'],
      ['Thick wavy acellular eosinophilic outer layer on H&E', 'Laminated cyst wall - pathognomonic for Echinococcus', 'PAS stain highlights the laminated wall; no germinal cells in the outer layer; host fibrous pericyst visible outside'],
      ['No eggs in stool', 'Expected - E. granulosus does not produce eggs in human hosts', 'Humans are accidental intermediate hosts; eggs are passed only by definitive hosts (dogs); stool O&P is not appropriate'],
      ['Thick-walled hepatic lesion with daughter cysts on imaging', 'Hydatid cyst - suspect E. granulosus', 'Imaging appearance (cysts within cysts, calcified wall) precedes laboratory diagnosis; serology confirms; avoid percutaneous drainage without treatment']
    ],
    trapTitle: 'Accidental cyst rupture during aspiration or surgery can cause anaphylaxis and dissemination',
    trapBody: 'Hydatid cyst fluid is highly allergenic - rupture can cause severe anaphylaxis. The PAIR procedure (Puncture-Aspiration-Injection-Re-aspiration) under albendazole cover is now an accepted technique with appropriate precautions. Avoid aspiration without surgery or PAIR protocol. Secondary cyst seeding from spillage can occur - handle all cyst specimens with extreme care.',
    trapBullets: [
      'Serologic tests (ELISA, Western blot for E. granulosus antigen B) are the first-line diagnostic in most settings - more practical than fluid analysis.',
      'E. multilocularis (alveolar echinococcosis) produces an infiltrative, tumor-like cyst without a smooth wall - more invasive and harder to treat.',
      'Definitive hosts (dogs, wolves) pass eggs in stool - humans are infected by ingesting eggs from contaminated soil, water, or food in contact with dogs.'
    ],
    interpretationTitle: 'Echinococcus granulosus laboratory identification guide',
    interpretationRows: [
      ['Protoscoleces with suckers + hooklets, or free hooklets, in cyst fluid', 'Echinococcus granulosus - positive', 'Report; albendazole therapy; surgical or PAIR intervention per guidelines; infectious disease and surgery consultation'],
      ['Thick laminated eosinophilic acellular wall on histology', 'Echinococcal cyst - pathognomonic', 'Report with histologic description; PAS stain confirms; serology for confirmation; no viable protoscoleces needed for diagnosis'],
      ['Positive serology (ELISA/Western blot for echinococcal antigen)', 'Probable E. granulosus infection', 'Most practical first-line test; confirm with imaging; fluid/tissue analysis if cyst accessible; clinical correlation required']
    ],
    takeaways: [
      'Hydatid sand (protoscoleces + free hooklets in cyst fluid) = Echinococcus granulosus - diagnostic.',
      'Laminated acellular cyst wall on H&E is pathognomonic for Echinococcus - no other hepatic lesion has this structure.',
      'Routine stool O&P is NOT appropriate - humans are intermediate hosts; E. granulosus eggs are not passed in human stool.'
    ],
    remember: 'Hydatid sand (suckers + hooklets in cyst fluid) = Echinococcus. Laminated wavy wall on histology = pathognomonic. Not in stool. Serology first.',
    divr: {
      detect: 'Hydatid cyst fluid (at surgery or PAIR under albendazole cover) - direct examination for protoscoleces and free hooklets; histology of cyst wall; serology (ELISA) is first-line non-invasive test',
      identify: ['Protoscolex: oval 170-220 um, 4 suckers + rostellum with 2 rows of hooklets', 'Free hooklets: 20-40 um, curved, blade and handle visible - single hooklet is diagnostic', 'Laminated cyst wall: thick, wavy, acellular eosinophilic outer layer + thin nucleated germinal inner layer'],
      verify: 'Serology (ELISA for antigen B, Western blot) confirms; imaging shows characteristic cyst morphology; histology with PAS stain confirms laminated wall',
      report: 'Report as Echinococcus granulosus with specimen source and findings; clinical correlation and imaging required; urgent consultation recommended; confirm per lab SOP'
    }
  },
{
    slug: 'plasmodium-species-comparison',
    title: 'Plasmodium Species Comparison: vivax, ovale, malariae vs. falciparum',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card comparison of the four major Plasmodium species on Giemsa-stained thin blood smear: RBC enlargement, Schüffner dots, trophozoite morphology, schizont characteristics, and gametocyte shape.',
    boardTitle: 'Plasmodium species: RBC size and trophozoite morphology',
    boardNote: 'P. vivax: enlarged RBC + Schüffner dots + ameboid trophozoite. P. ovale: oval/fimbriated RBC + Schüffner dots + compact trophozoite. P. malariae: normal RBC + band-form trophozoite + rosette schizont. P. falciparum (reference): normal RBC + no Schüffner dots + delicate ring forms + banana gametocyte.',
    ariaLabel: 'Illustrated comparison of Plasmodium vivax enlarged RBC with Schüffner dots versus Plasmodium malariae band-form trophozoite in normal RBC',
    visualType: 'microscope-plasmodium-panel',
    tubes: [
      {
        id: 'A',
        label: 'P. vivax',
        name: 'Enlarged RBC, Schüffner dots, ameboid trophozoite',
        colors: { slant: '#f5ede0', butt: '#e08050', base: '#7a2808' },
        note: 'RBC enlarged (up to 1.5-2x normal). Schüffner dots (stippling of RBC cytoplasm) - present in vivax and ovale, absent in falciparum and malariae. Trophozoite ameboid/irregular in shape. Schizont: 12-24 merozoites arranged in irregular cluster. Gametocyte: oval/round, fills enlarged RBC. Quartan/tertian fever (48h cycle). Associated with hypnozoite relapse from liver.'
      },
      {
        id: 'B',
        label: 'P. malariae',
        name: 'Normal RBC, band-form trophozoite, rosette schizont',
        colors: { slant: '#ece8d8', butt: '#8878b0', base: '#3a2860' },
        note: 'RBC normal size or slightly smaller. No Schüffner dots. Band-form trophozoite: stretches across full width of RBC - pathognomonic for malariae. Rosette schizont: 6-12 merozoites arranged in a daisy-wheel around central pigment mass. Quartan fever (72h cycle). Low parasitemia. P. knowlesi mimics malariae on smear but causes rapidly severe disease - PCR required in Southeast Asia travelers.'
      }
    ],
    readoutTitle: 'Species-level morphology differentiation guide',
    readoutRows: [
      ['Enlarged RBC + Schüffner dots + ameboid trophozoite', 'P. vivax', 'RBC enlargement is the first low-power clue; Schüffner dots visible on Giemsa in well-stained films'],
      ['Oval/fimbriated RBC + Schüffner dots + compact oval trophozoite', 'P. ovale', 'Fimbriated (jagged/irregular) RBC edge at oval end distinguishes ovale from vivax; less common globally'],
      ['Normal RBC + band-form trophozoite + rosette schizont', 'P. malariae', 'Band-form crossing full RBC diameter is pathognomonic; 72h cycle (quartan fever)'],
      ['Normal RBC + multiple delicate rings + banana gametocyte', 'P. falciparum (reference)', 'No Schüffner dots, no RBC enlargement, no schizonts on peripheral smear; crescent gametocyte is pathognomonic'],
      ['Schüffner dots present', 'P. vivax OR P. ovale only', 'Neither P. falciparum nor P. malariae produce Schüffner dots - presence excludes these two species'],
      ['Rosette schizont (6-12 merozoites around central pigment)', 'P. malariae', 'Daisy-wheel arrangement is characteristic; helps confirm malariae when band-form is not seen']
    ],
    trapTitle: 'P. knowlesi mimics P. malariae on smear but causes severe disease',
    trapBody: 'P. knowlesi band-form trophozoites are morphologically identical to P. malariae on Giemsa stain. P. knowlesi has a 24-hour cycle and rapidly progressive disease - not the mild quartan fever of P. malariae. PCR is mandatory for travelers returning from Borneo and Southeast Asia when malariae morphology is suspected.',
    trapBullets: [
      'P. vivax and P. ovale both cause relapsing malaria via hypnozoites - primaquine/tafenoquine required for radical cure; screen for G6PD deficiency before use.',
      'Mixed infections with two Plasmodium species are possible - scan the full smear systematically before finalizing species.',
      'RBC enlargement is best appreciated on a thin smear stained at the correct pH (Giemsa pH 7.2); over-staining can obscure Schüffner dots.'
    ],
    interpretationTitle: 'Plasmodium species differentiation guide',
    interpretationRows: [
      ['Enlarged RBC, Schüffner dots, ameboid trophozoite', 'P. vivax - report and treat; primaquine for radical cure', 'Screen G6PD before primaquine/tafenoquine; assess for splenomegaly'],
      ['Normal RBC, band-form trophozoite, rosette schizont, low parasitemia', 'P. malariae - report; exclude P. knowlesi by travel history + PCR', 'P. malariae can cause nephrotic syndrome; low parasitemia but chronic'],
      ['Oval fimbriated RBC, Schüffner dots, compact trophozoite', 'P. ovale - report and treat; primaquine for radical cure', 'Less common globally; morphologically most like vivax but distinct fimbriated RBC end']
    ],
    takeaways: [
      'Enlarged RBC + Schüffner dots = P. vivax or P. ovale. Normal RBC, no dots = P. falciparum or P. malariae.',
      'Band-form trophozoite crossing the RBC diameter = P. malariae (pathognomonic).',
      'P. knowlesi mimics P. malariae morphologically - PCR is required in Southeast Asia travelers regardless of species ID on smear.'
    ],
    remember: 'Schüffner dots = vivax or ovale. Band-form = malariae. Banana gametocyte = falciparum. knowlesi mimics malariae. Enlarged RBC separates vivax/ovale from the rest.',
    relatedLearnSlug: 'blood-parasites',
    divr: {
      detect: 'EDTA peripheral blood - Giemsa thin + thick smear; Giemsa pH 7.2 for optimal Schüffner dot visualization; oil immersion at 1000x',
      identify: ['P. vivax: enlarged RBC, Schüffner dots, ameboid trophozoite, 12-24 merozoite schizont', 'P. malariae: normal RBC, band-form trophozoite, rosette schizont (6-12 merozoites around central pigment)', 'P. ovale: oval/fimbriated RBC, Schüffner dots, compact oval trophozoite', 'P. falciparum: normal RBC, no Schüffner dots, delicate rings, banana gametocyte - reference'],
      verify: 'PCR for species confirmation; mandatory for P. knowlesi exclusion in Southeast Asia travelers; RDT for rapid antigen detection; quantify parasitemia',
      report: 'Report species and parasitemia %; P. falciparum = urgent notification; PCR confirmation per lab SOP; clinical correlation required'
    }
  },
  {
    slug: 'cyclospora-cystoisospora-maf',
    title: 'Cyclospora vs. Cystoisospora on Modified Acid-Fast',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card comparison of Cyclospora cayetanensis and Cystoisospora belli oocysts on modified acid-fast stain: size difference (8-10 um vs. 25-30 um), staining intensity variability (Cyclospora), and sporoblast count differentiation.',
    boardTitle: 'Cyclospora and Cystoisospora oocysts on modified acid-fast stain',
    boardNote: 'Cyclospora cayetanensis: ~8-10 um, round, variable acid-fast staining (same slide may show bright pink to unstained), autofluorescent under UV (365 nm). Cystoisospora belli: ~25-30 um, elongated oval, usually strongly acid-fast, single sporoblast (immature) or 2 sporocysts (mature). Cryptosporidium (comparator): 4-6 um - always smaller than Cyclospora.',
    ariaLabel: 'Illustrated Cyclospora oocyst at 8-10 um with variable acid-fast staining compared to larger elongated Cystoisospora oocyst at 25-30 um',
    visualType: 'microscope-cyclospora-cystoisospora',
    tubes: [
      {
        id: 'A',
        label: 'Cyclospora cayetanensis',
        name: '8-10 um round, variable acid-fast, autofluorescent',
        colors: { slant: '#d8e0d0', butt: '#c84050', base: '#782030' },
        note: '8-10 um round oocysts. Modified acid-fast: variable staining - bright pink/red to faint "ghost" on the same slide; some oocysts may not stain at all. Autofluorescence under UV (365 nm) is a key confirmatory property: Cyclospora fluoresces blue-green to green; yeast and Cryptosporidium do not fluoresce. Wrinkled appearance on some preparations. Transmitted via contaminated produce and water (raspberries, cilantro outbreaks).'
      },
      {
        id: 'B',
        label: 'Cystoisospora belli',
        name: '25-30 um elongated oval, strongly acid-fast, single sporoblast',
        colors: { slant: '#d8e0d0', butt: '#d06040', base: '#602010' },
        note: '25-30 um, elongated oval (longer than wide). Usually strongly acid-fast (pink-red). Immature oocysts (most common in stool) contain a single round sporoblast. Mature oocysts contain 2 sporocysts. Larger than Cyclospora (~3x larger) - size is the primary bench differentiator. Immunocompromised patients (especially HIV/AIDS) are at highest risk for severe/disseminated disease. Sporadic in immunocompetent hosts in temperate regions.'
      }
    ],
    readoutTitle: 'Modified acid-fast size and staining comparison',
    readoutRows: [
      ['Round, 8-10 um, variable acid-fast staining', 'Cyclospora cayetanensis', 'Variable staining on same slide is expected and characteristic - do not call negative based on ghost oocysts alone'],
      ['Elongated oval, 25-30 um, strongly acid-fast, single sporoblast', 'Cystoisospora belli', 'Size (~3x larger than Cyclospora) is the primary differentiator; elongated shape distinguishes from round Cyclospora'],
      ['Round, 4-6 um, variable acid-fast', 'Cryptosporidium parvum/hominis (size comparator)', 'Smaller than Cyclospora; always round; no autofluorescence; size calibration essential for discrimination'],
      ['Autofluorescence under UV 365 nm (blue-green/green)', 'Cyclospora - confirms identity', 'Unique to Cyclospora among intestinal coccidia; Cystoisospora and Cryptosporidium do not autofluoresce'],
      ['2 sporocysts in an elongated oocyst', 'Mature Cystoisospora belli', 'Mature form; most shed oocysts are immature (1 sporoblast); 2 sporocysts = definitive identification'],
      ['Variable staining with wrinkled surface, 8-10 um', 'Cyclospora - wrinkled oocyst', 'Wrinkled or morula-like internal structure on some fixed preparations; UV autofluorescence confirms if needed']
    ],
    trapTitle: 'Cyclospora\'s variable staining causes false negatives on modified AFB',
    trapBody: 'Cyclospora oocysts show highly variable modified acid-fast staining - on a single slide some oocysts are bright pink, others faint, and some are essentially unstained. This variability is characteristic of Cyclospora and can cause false negatives if only bright-staining structures are examined. UV autofluorescence (365 nm) is confirmatory and should be used when Cyclospora is suspected and acid-fast results are equivocal.',
    trapBullets: [
      'Size calibration with a stage micrometer is essential - Cyclospora (8-10 um), Cystoisospora (25-30 um), and Cryptosporidium (4-6 um) look similar on modified AFB without measurement.',
      'Cystoisospora in immunocompromised patients can disseminate to lymph nodes and organs - not just a self-limited diarrhea in this population.',
      'Molecular GI panels (PCR) now offer more sensitive detection than modified AFB for all three coccidia.'
    ],
    interpretationTitle: 'Cyclospora and Cystoisospora modified acid-fast identification guide',
    interpretationRows: [
      ['Round, 8-10 um, variable acid-fast, autofluorescence positive', 'Cyclospora cayetanensis - positive', 'Report; TMP-SMX is treatment of choice; notify public health if outbreak suspected (foodborne)'],
      ['Elongated oval, 25-30 um, strongly acid-fast, single sporoblast (immature)', 'Cystoisospora belli - positive', 'Report; TMP-SMX; assess immune status; severe/prolonged disease expected in HIV/AIDS'],
      ['8-10 um, ghost oocysts only, equivocal AFB', 'Possible Cyclospora - confirm with UV autofluorescence or PCR', 'Do not call negative based on absent staining alone; autofluorescence under 365 nm UV is highly specific']
    ],
    takeaways: [
      'Size first: 4-6 um = Cryptosporidium, 8-10 um = Cyclospora, 25-30 um = Cystoisospora.',
      'Cyclospora variable staining (bright to ghost on same slide) + UV autofluorescence = Cyclospora.',
      'Cystoisospora: elongated oval, strongly acid-fast, single sporoblast (immature) or 2 sporocysts (mature).'
    ],
    remember: 'Size order: Crypto (4-6) < Cyclospora (8-10) < Cystoisospora (25-30). Cyclospora = variable AFB + UV autofluorescence. Cystoisospora = elongated + strongly AFB + single sporoblast.',
    relatedLearnSlug: 'intestinal-protozoa',
    divr: {
      detect: 'Fresh or fixed stool - modified acid-fast stain (Kinyoun cold method); UV fluorescence microscopy at 365 nm for Cyclospora confirmation; formalin-ethyl acetate concentration',
      identify: ['Cyclospora: round 8-10 um, variable acid-fast (bright to ghost), autofluorescent under UV 365 nm', 'Cystoisospora: elongated oval 25-30 um, strongly acid-fast, single sporoblast (immature) or 2 sporocysts', 'Size calibration essential - Cryptosporidium 4-6 um for comparison'],
      verify: 'UV autofluorescence (365 nm) confirms Cyclospora; PCR (molecular GI panel) offers highest sensitivity for all three coccidia',
      report: 'Report species with size estimate and staining pattern; Cyclospora = notify public health if outbreak setting; clinical correlation required'
    }
  },
  {
    slug: 'entamoeba-comparison-panel',
    title: 'Entamoeba Comparison Panel: E. histolytica/dispar, E. coli, E. hartmanni',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card comparison of the three most common Entamoeba species in stool: E. histolytica/dispar (pathogenic, 4-nucleated cyst, central karyosome, blunt chromatoids), E. coli (nonpathogenic, 8-nucleated cyst, eccentric karyosome, splintered chromatoids), and E. hartmanni (nonpathogenic, small <10 um).',
    boardTitle: 'Entamoeba species comparison: nuclear structure and cyst morphology',
    boardNote: 'E. histolytica/dispar: cyst <=4 nuclei, central karyosome, fine even peripheral chromatin, blunt chromatoid bars. E. coli: cyst up to 8 nuclei, eccentric karyosome, coarse irregular peripheral chromatin, splintered chromatoid bars. E. hartmanni: morphologically identical to histolytica/dispar but trophozoite <10 um, cyst <8 um.',
    ariaLabel: 'Illustrated comparison of Entamoeba histolytica/dispar 4-nucleated cyst with blunt chromatoids versus E. coli 8-nucleated cyst with eccentric karyosome',
    visualType: 'microscope-entamoeba-panel',
    tubes: [
      {
        id: 'A',
        label: 'E. histolytica/dispar',
        name: '<=4 nuclei, central karyosome, blunt chromatoid bars',
        colors: { slant: '#e8e0d0', butt: '#6878a8', base: '#283060' },
        note: 'Cyst: round, 10-20 um. Mature: 4 nuclei; immature: 1-2 (+ visible glycogen mass on iodine). Each nucleus: central karyosome + fine evenly distributed peripheral chromatin. Chromatoid bars: smooth, blunt, rounded ends - distinguishes from E. coli. Trophozoite 12-60 um; ingested RBCs = pathognomonic for E. histolytica (not E. dispar). Without RBCs: report as E. histolytica/dispar complex.'
      },
      {
        id: 'B',
        label: 'E. coli',
        name: 'Up to 8 nuclei, eccentric karyosome, splintered chromatoids',
        colors: { slant: '#e4dcc8', butt: '#7890a8', base: '#2c4058' },
        note: 'Cyst: round, 15-25 um (often larger than E. histolytica/dispar). Mature: up to 8 nuclei - >4 nuclei confirms E. coli. Each nucleus: eccentric (off-center) karyosome + coarse irregular peripheral chromatin. Chromatoid bars: splintered, pointed, irregular ends - distinguishes from E. histolytica/dispar blunt bars. E. coli is nonpathogenic; no treatment needed. Trophozoite 15-50 um; ingests bacteria and debris but NOT RBCs.'
      }
    ],
    readoutTitle: 'Nuclear structure and cyst count differentiation',
    readoutRows: [
      ['Cyst with <=4 nuclei, central karyosome, fine even chromatin', 'E. histolytica/dispar', 'Maximum 4 nuclei in mature cyst; central karyosome is the key nuclear-level ID clue'],
      ['Cyst with up to 8 nuclei, eccentric karyosome', 'E. coli - nonpathogenic', 'Finding >4 nuclei confirms E. coli; eccentric karyosome (off-center dot) vs. central karyosome in histolytica'],
      ['Chromatoid bars: smooth, blunt, rounded ends', 'E. histolytica/dispar cyst', 'Blunt ends = E. histolytica/dispar; most reliable cyst-level feature when nuclear count is borderline (immature cyst)'],
      ['Chromatoid bars: splintered, pointed, irregular ends', 'E. coli cyst', 'Splinter-like ends = E. coli; compare bar end morphology at oil immersion on trichrome stain'],
      ['Trophozoite <10 um, cyst <8 um, same nuclear pattern as histolytica/dispar', 'E. hartmanni - nonpathogenic', 'Size (<10 um trophozoite, <8 um cyst) is the only feature separating E. hartmanni from E. histolytica/dispar; nuclear structure and chromatoids identical'],
      ['Trophozoite with ingested RBCs', 'E. histolytica (pathogenic, not E. dispar)', 'Erythrophagocytosis is pathognomonic and the only morphologic proof of pathogenicity; no other Entamoeba species ingests RBCs']
    ],
    trapTitle: 'E. coli is the most common nonpathogenic Entamoeba - do not treat',
    trapBody: 'E. coli is the most frequently encountered Entamoeba species in clinical stool and is completely nonpathogenic. The nuclear structure and chromatoid bar morphology are the reliable differentiators from E. histolytica/dispar. Reporting E. coli as E. histolytica leads to unnecessary antiparasitic treatment. Always report the species and note that E. coli requires no treatment.',
    trapBullets: [
      'E. hartmanni requires a calibrated ocular micrometer to separate from E. histolytica/dispar - size is the only distinguishing feature.',
      'Immature cysts with 1-2 nuclei are common for all Entamoeba species - always scan multiple cysts before assigning nuclear count.',
      'Trichrome stain is required for reliable nuclear detail; iodine wet prep shows cysts but chromatoid bars and nuclear structure are poorly visible.'
    ],
    interpretationTitle: 'Entamoeba species differentiation guide',
    interpretationRows: [
      ['<=4 nuclei, central karyosome, blunt chromatoid bars', 'E. histolytica/dispar - confirm with EIA/PCR if no RBCs seen', 'Report as E. histolytica/dispar complex without molecular confirmation; if RBCs ingested = E. histolytica (treat)'],
      ['Up to 8 nuclei, eccentric karyosome, splintered chromatoid bars', 'E. coli - nonpathogenic; no treatment', 'Report as E. coli; inform clinician that no treatment is required; presence is a fecal-oral hygiene marker'],
      ['Same nuclear pattern as histolytica/dispar, trophozoite <10 um / cyst <8 um', 'E. hartmanni - nonpathogenic; no treatment', 'Size measurement is essential; report as E. hartmanni with size note; no treatment required']
    ],
    takeaways: [
      'Nuclear karyosome: central = E. histolytica/dispar + E. hartmanni; eccentric = E. coli.',
      'Chromatoid bar ends: blunt = E. histolytica/dispar; splintered/irregular = E. coli.',
      'E. hartmanni: morphologically identical to E. histolytica/dispar except trophozoite <10 um and cyst <8 um - always measure.'
    ],
    remember: 'Central karyosome + blunt chromatoids = histolytica/dispar. Eccentric karyosome + 8 nuclei + splintered chromatoids = E. coli. Tiny size (<10 um) = E. hartmanni.',
    relatedLearnSlug: 'intestinal-protozoa',
    divr: {
      detect: 'Stool O&P - trichrome stain (best for nuclear detail and chromatoids); iodine wet prep; formalin-ethyl acetate concentration; calibrated ocular micrometer for E. hartmanni',
      identify: ['E. histolytica/dispar: <=4 nuclei, central karyosome, fine even peripheral chromatin, blunt chromatoid bar ends', 'E. coli: up to 8 nuclei, eccentric karyosome, coarse irregular chromatin, splintered/pointed chromatoid bar ends', 'E. hartmanni: identical to E. histolytica/dispar but trophozoite <10 um, cyst <8 um'],
      verify: 'EIA antigen or PCR required to distinguish E. histolytica from E. dispar; cannot be separated morphologically without erythrophagocytosis',
      report: 'E. histolytica/dispar complex if no RBCs; E. histolytica if RBCs ingested; E. coli and E. hartmanni = nonpathogenic, report but no treatment; confirm per lab SOP'
    }
  },
  {
    slug: 'operculated-egg-comparison',
    title: 'Operculated Trematode Egg Comparison: Diphyllobothrium, Paragonimus, Fasciola, Clonorchis',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card comparison of the four common operculated helminth eggs: Diphyllobothrium latum (~65 um, abopercular knob), Paragonimus westermani (~90 um, shouldered operculum), Fasciola hepatica/Fasciolopsis buski (~140 um, largest, thin shell), and Clonorchis/Opisthorchis (~30 um, smallest, shoulder rim).',
    boardTitle: 'Operculated egg size ladder: Clonorchis < Diphyllobothrium < Paragonimus < Fasciola',
    boardNote: 'Size ladder (smallest to largest): Clonorchis/Opisthorchis ~30 um (tiny operculum, shoulder rim, abopercular knob) -> Diphyllobothrium latum ~65 um (oval, opercular shoulder, abopercular knob) -> Paragonimus westermani ~90 um (thick shell, shouldered operculum, golden-brown) -> Fasciola/Fasciolopsis ~140 um (largest, thin shell, indistinct operculum, yellow-brown). All pass in feces (Paragonimus also in sputum).',
    ariaLabel: 'Illustrated size comparison of four operculated helminth eggs from smallest Clonorchis at 30 um to largest Fasciola at 140 um',
    visualType: 'microscope-operculated-eggs',
    tubes: [
      {
        id: 'A',
        label: 'Size comparison (small to large)',
        name: 'Clonorchis ~30um - Diphyllobothrium ~65um - Paragonimus ~90um - Fasciola ~140um',
        colors: { slant: '#f0e8d0', butt: '#c49840', base: '#5c3810' },
        note: 'All four are operculated (have a lid at one pole). Size is the primary bench differentiator. Each has a characteristic opercular shoulder and/or abopercular knob. Clonorchis: tiny (~30 um), flask-shaped, shoulder rim at opercular end, knob at abopercular end. Diphyllobothrium: oval (~65 um), opercular shoulder, abopercular knob. Paragonimus: thick golden-brown shell (~90 um), shouldered operculum. Fasciola/Fasciolopsis: large (~140 um), thin shell, yellow-brown, operculum less prominent.'
      },
      {
        id: 'B',
        label: 'Diagnostic clues by species',
        name: 'Operculum + shell thickness + abopercular knob pattern',
        colors: { slant: '#ece0c0', butt: '#a88040', base: '#503010' },
        note: 'Clonorchis sinensis/Opisthorchis: ~28-35 um, flask-shaped, prominent shoulder rim at opercular end, tiny knob at abopercular end - smallest common operculated egg. Diphyllobothrium latum: ~58-75 um, oval, slight opercular shoulder, prominent abopercular knob. Paragonimus westermani: ~80-100 um, thick shell, golden-brown color, shouldered operculum, abopercular knob. Fasciola hepatica / Fasciolopsis buski: ~130-150 um (largest), thin shell, yellow-brown, opercular shoulder present - both essentially identical; clinical context differentiates (Fasciola: liver/bile ducts; Fasciolopsis: intestinal).'
      }
    ],
    readoutTitle: 'Operculated egg identification by size and features',
    readoutRows: [
      ['~28-35 um, flask-shaped, shoulder rim at opercular end, tiny abopercular knob', 'Clonorchis sinensis / Opisthorchis spp.', 'Smallest; bile-stained, clustered in bile ducts; East/Southeast Asia exposure; bile-stained yellow-brown'],
      ['~58-75 um, oval, slight shoulder, prominent abopercular knob, yellow-brown', 'Diphyllobothrium latum', 'Abopercular knob is the most distinctive feature; found in raw freshwater fish consumers; cecum-like undeveloped embryo inside'],
      ['~80-100 um, thick golden-brown shell, shouldered operculum, abopercular knob', 'Paragonimus westermani', 'Thick shell + golden-brown color + shouldered operculum; may be found in stool OR sputum (pulmonary paragonimiasis)'],
      ['~130-150 um, thin shell, yellow-brown, opercular shoulder, no prominent knob', 'Fasciola hepatica (liver fluke) or Fasciolopsis buski (intestinal)', 'Largest operculated egg; thin shell distinguishes from Paragonimus; clinical context differentiates species (Fasciola: liver disease + eosinophilia; Fasciolopsis: Asia, intestinal)'],
      ['Operculum visible at one pole of egg', 'Trematode (fluke) or Diphyllobothrium (cestode)', 'All these eggs have a functional operculum (lid) at one pole; size + shape + shell thickness = primary ID features'],
      ['Egg in sputum (not stool)', 'Paragonimus westermani - pulmonary paragonimiasis', 'Paragonimus eggs are shed in sputum when lung cysts rupture; may also be found in stool from swallowed sputum']
    ],
    trapTitle: 'Fasciola and Fasciolopsis eggs are morphologically indistinguishable',
    trapBody: 'Fasciola hepatica and Fasciolopsis buski eggs are essentially identical in size (~140 um), shape, shell thickness, and opercular morphology. Species differentiation requires clinical and epidemiological context: Fasciola causes liver/biliary disease with eosinophilia in watercress-eating endemic areas; Fasciolopsis causes intestinal disease in Southeast Asia. Never report species from morphology alone without clinical context.',
    trapBullets: [
      'Always measure eggs with a calibrated ocular micrometer - overlapping size ranges mean accurate measurement is essential for the Clonorchis/Diphyllobothrium differentiation.',
      'Paragonimus eggs in sputum are diagnostic for pulmonary paragonimiasis; request sputum AFB (or direct smear) when hemoptysis occurs in someone from an endemic region.',
      'Diphyllobothrium latum causes vitamin B₁₂ deficiency (megaloblastic anemia) from competitive uptake in the terminal ileum - check CBC when diagnosing fish tapeworm.'
    ],
    interpretationTitle: 'Operculated egg clinical differentiation guide',
    interpretationRows: [
      ['Tiny flask egg ~30 um, shoulder rim, abopercular knob', 'Clonorchis/Opisthorchis - biliary trematode', 'Report with size; exposure to raw/undercooked freshwater fish in Asia; risk factor for cholangiocarcinoma with chronic infection'],
      ['Oval egg ~65 um, prominent abopercular knob', 'Diphyllobothrium latum - fish tapeworm', 'Report; praziquantel treatment; check B₁₂ levels; raw/undercooked freshwater fish exposure'],
      ['Thick-shelled ~90 um, golden-brown, shouldered operculum', 'Paragonimus westermani - pulmonary fluke', 'Report; also check sputum; praziquantel treatment; crustacean (crab, crayfish) exposure'],
      ['Large ~140 um, thin shell, yellow-brown', 'Fasciola hepatica or Fasciolopsis buski - requires clinical context', 'Report as large operculated egg consistent with Fasciola/Fasciolopsis; differentiate by clinical presentation and exposure history']
    ],
    takeaways: [
      'Size ladder: Clonorchis (~30 um) < Diphyllobothrium (~65 um) < Paragonimus (~90 um) < Fasciola (~140 um).',
      'Diphyllobothrium: abopercular knob + opercular shoulder. Paragonimus: thick golden-brown shell + shouldered operculum. Clonorchis: tiny + shoulder rim + tiny knob.',
      'Fasciola and Fasciolopsis are morphologically identical - differentiate by clinical/epidemiological context, never by morphology alone.'
    ],
    remember: 'Size is the primary operculated egg ID tool. Clonorchis: tiny flask. Diphyllobothrium: knob + shoulder. Paragonimus: thick + golden-brown + in sputum too. Fasciola: largest + thin shell.',
    relatedLearnSlug: 'intestinal-helminths',
    divr: {
      detect: 'Stool O&P for all four; also examine sputum (digested or direct) for Paragonimus; formalin-ethyl acetate concentration; calibrated ocular micrometer essential',
      identify: ['Clonorchis/Opisthorchis: ~30 um, flask-shaped, shoulder rim at opercular end, tiny abopercular knob', 'Diphyllobothrium latum: ~65 um oval, opercular shoulder, prominent abopercular knob', 'Paragonimus westermani: ~90 um, thick golden-brown shell, shouldered operculum', 'Fasciola/Fasciolopsis: ~140 um, thin shell, opercular shoulder - largest common operculated egg'],
      verify: 'Serology (ELISA) for Fasciola and Paragonimus when egg counts are low; clinical and exposure history essential for species differentiation',
      report: 'Report operculated egg with measured size and morphologic features; include clinical context for species; confirm per lab SOP'
    }
  },
  {
    slug: 'blastocystis-hominis-forms',
    title: 'Blastocystis hominis: Central Body, Granular, and Ameboid Forms',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for recognizing Blastocystis hominis in stool: the dominant central body form (large central vacuole, peripheral nuclei), granular form, and ameboid form; size range 6-40 um; clinical significance and report context.',
    boardTitle: 'Blastocystis hominis: central body form and granular form',
    boardNote: 'Central body form (most common in stool): large central vacuole (takes up most of cell), 1-4 peripheral nuclei at the margin. Granular form: central vacuole filled with granules. Ameboid form: rare, irregular pseudopods. Size highly variable: 6-40 um. Modified trichrome or Giemsa for best detail. Clinical significance remains controversial - often considered commensal; treat only with clinical correlation.',
    ariaLabel: 'Illustrated Blastocystis hominis central body form showing large central vacuole with peripheral nuclei, and granular form with granule-filled center',
    visualType: 'microscope-blastocystis',
    tubes: [
      {
        id: 'A',
        label: 'Central body form',
        name: 'Large central vacuole, peripheral nuclei (1-4)',
        colors: { slant: '#e8e4d0', butt: '#8898a0', base: '#304050' },
        note: 'Most common form in clinical stool samples. Large central vacuole occupies ~90% of the cell. 1-4 nuclei arranged at the periphery (pushed to the margins by the vacuole). Size: 6-40 um (highly variable). Modified trichrome: nuclei stain red-purple at periphery. iodine wet prep: central vacuole appears yellowish. Commonly found in stool but clinical significance uncertain - many infected individuals are asymptomatic.'
      },
      {
        id: 'B',
        label: 'Granular form',
        name: 'Central vacuole filled with metabolic or lipid granules',
        colors: { slant: '#e0dcc8', butt: '#788088', base: '#283040' },
        note: 'Central vacuole filled with granules (metabolic, lipid, or reproductive). Peripheral cytoplasm with 1-4 nuclei still visible at margins. May appear darker or denser than the classic central body form. Ameboid form (not shown): rare, irregular pseudopods, seen predominantly in immunocompromised hosts, may be associated with pathogenicity. Cyst form (not shown): small, ~3-10 um, thick wall, environmentally resistant - the infective stage.'
      }
    ],
    readoutTitle: 'Blastocystis form recognition guide',
    readoutRows: [
      ['Large central vacuole (~90% of cell), peripheral nuclei', 'Central body form - most common', 'Key feature: vacuole is the dominant structure; nuclei are pushed to the margins'],
      ['Granule-filled central vacuole, peripheral nuclei', 'Granular form', 'Dense center due to granules; peripheral nuclei still identifiable with Giemsa or trichrome'],
      ['Irregular pseudopods, no prominent central vacuole', 'Ameboid form', 'Rare; associated with immunocompromised hosts; may be more pathogenic; look for pseudopodal extensions'],
      ['Small ~3-10 um, thick-walled, dense', 'Cyst form (environmentally resistant)', 'Infective stage; may resemble other protozoan cysts; size and wall thickness differentiate'],
      ['Highly variable size 6-40 um on same slide', 'Blastocystis - size variability is expected', 'Size variation does not indicate different species; B. hominis shows extreme pleomorphism within a single specimen'],
      ['Modified trichrome: peripheral red-purple dots', 'Peripheral nuclei of central body form', 'Staining pattern helps distinguish from debris or yeast; compare to Iodine prep for vacuole visualization']
    ],
    trapTitle: 'Clinical significance of Blastocystis is uncertain - do not over-report as pathogen',
    trapBody: 'Blastocystis hominis is frequently found in stool and is considered by many authorities to be a commensal protist rather than a pathogen. Its role in irritable bowel-like symptoms is debated. Reporting Blastocystis as a pathogen may lead to unnecessary treatment. Most labs report with a note that clinical significance is uncertain; treatment decisions require physician clinical correlation. Treatment (metronidazole, TMP-SMX) is reserved for symptomatic patients with no other identified cause.',
    trapBullets: [
      'Blastocystis is extremely common worldwide - some surveys find it in >20% of the population in endemic areas.',
      'The taxonomy of Blastocystis has changed significantly; it is now classified as a stramenopile, not a protozoan or fungus.',
      'Molecular subtyping (18S rRNA subtypes) correlates with virulence potential in research settings but is not clinically available in most labs.'
    ],
    interpretationTitle: 'Blastocystis hominis identification and reporting guide',
    interpretationRows: [
      ['Large central vacuole, peripheral nuclei, 6-40 um', 'Blastocystis hominis - central body form', 'Report with note on uncertain clinical significance; physician clinical correlation required for treatment decision'],
      ['Granule-filled vacuole, peripheral nuclei', 'Blastocystis hominis - granular form', 'Report as Blastocystis hominis with form noted; treatment indicated only with clinical symptoms and no other etiology found'],
      ['Small cysts, irregular ameboid forms', 'Blastocystis hominis - other forms', 'Report; note form type; ameboid form in immunocompromised may be more clinically relevant']
    ],
    takeaways: [
      'Central body form = large central vacuole + peripheral nuclei pushed to margins. Most common form in stool.',
      'Size highly variable (6-40 um) - extreme pleomorphism is a Blastocystis feature, not a classification issue.',
      'Report as Blastocystis hominis with a note that clinical significance is uncertain; treatment requires physician clinical correlation.'
    ],
    remember: 'Central vacuole takes up ~90% of the cell; nuclei pushed to periphery = Blastocystis central body form. Very common; controversial pathogenicity; always add clinical significance note in report.',
    relatedLearnSlug: 'intestinal-protozoa',
    divr: {
      detect: 'Fresh or PVA-fixed stool - trichrome stain (best for nuclear detail); iodine wet prep (vacuole visualization); Giemsa; formalin-ethyl acetate concentration',
      identify: ['Central body form: large central vacuole ~90% of cell, 1-4 peripheral nuclei at margins, size 6-40 um', 'Granular form: central vacuole filled with granules, peripheral nuclei', 'Ameboid form: irregular pseudopods, rare - associated with immunocompromised patients'],
      verify: 'PCR for subtyping (research setting); no routine confirmatory test; diagnosis is morphologic; clinical correlation determines significance',
      report: 'Report as Blastocystis hominis with form and note that clinical significance is uncertain; treatment decision requires physician clinical correlation; confirm per lab SOP'
    }
  },
  {
    slug: 'dientamoeba-fragilis-trophozoite',
    title: 'Dientamoeba fragilis: Binucleate Trophozoite',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for recognizing Dientamoeba fragilis trophozoite: binucleate (80% of organisms), fragmented chromatin within nucleus, no cyst stage, delicate cytoplasm, and association with Enterobius co-infection.',
    boardTitle: 'Dientamoeba fragilis: binucleate trophozoite morphology',
    boardNote: 'Trophozoite only - no cyst stage. ~7-12 um. 80% of organisms are binucleate (2 nuclei). Each nucleus: fragmented chromatin (4-8 granules, no membrane karyosome) - "chromatin fragment" pattern. Cytoplasm: granular, may contain ingested bacteria. Associated with Enterobius vermicularis co-infection (proposed route of transmission via pinworm eggs). Must use permanent stain (trichrome or iron-hematoxylin) - invisible on wet prep.',
    ariaLabel: 'Illustrated Dientamoeba fragilis trophozoite showing two nuclei with fragmented chromatin and no visible cyst stage',
    visualType: 'microscope-dientamoeba',
    tubes: [
      {
        id: 'A',
        label: 'Binucleate trophozoite',
        name: '2 nuclei, fragmented chromatin (no karyosome)',
        colors: { slant: '#dce8d8', butt: '#5888a0', base: '#1c4060' },
        note: '7-12 um. Two nuclei present in ~80% of organisms (uninucleate in ~20%). Each nucleus: 4-8 chromatin granules arranged in a clump or tetrad - NO central karyosome and NO peripheral chromatin ring (distinguishes from all other Entamoeba). Cytoplasm is granular, pseudopods broad and leaf-like. Trophozoite is labile - PVA fixation (polyvinyl alcohol) immediately after collection is required; organisms rapidly disintegrate in formalin or unfixed specimens.'
      },
      {
        id: 'B',
        label: 'No cyst stage (trophozoite-only)',
        name: 'No cyst stage - any cyst in specimen is another species',
        colors: { slant: '#d4e0cc', butt: '#487888', base: '#183050' },
        note: 'Dientamoeba fragilis has NO known cyst stage in humans - only trophozoites are found in stool. If cysts are seen in the same specimen, they belong to another organism (Giardia, Entamoeba, etc.). Finding only trophozoites and no cysts is consistent with Dientamoeba diagnosis. Transmission is not fully understood but proposed to involve Enterobius eggs as a protective vehicle. Recommend co-examination for Enterobius (perianal tape prep) when Dientamoeba is found.'
      }
    ],
    readoutTitle: 'Dientamoeba fragilis trophozoite recognition guide',
    readoutRows: [
      ['Binucleate (2 nuclei visible), fragmented chromatin granules', 'Dientamoeba fragilis - definitive', 'Two nuclei with granular chromatin fragments (4-8 granules each) is the hallmark feature; seen in ~80% of organisms'],
      ['No central karyosome, no peripheral chromatin ring', 'Dientamoeba nuclear pattern', 'Distinguished from all Entamoeba species (which have karyosomes); nuclear structure alone separates D. fragilis'],
      ['Uninucleate trophozoite with same nuclear pattern', 'Dientamoeba fragilis (~20% of organisms)', 'Do not exclude Dientamoeba based on single nucleus; report if binucleate forms are found elsewhere on the slide'],
      ['No cyst stage found', 'Expected for D. fragilis', 'No cyst stage exists; absence of cysts with presence of binucleate trophozoites supports Dientamoeba diagnosis'],
      ['Co-detection with Enterobius eggs (pinworm)', 'Supports Dientamoeba diagnosis', 'Proposed transmission via Enterobius eggs; recommend perianal tape prep when D. fragilis is identified'],
      ['Organism disintegrates rapidly in unfixed specimen', 'D. fragilis - fixation-dependent diagnosis', 'PVA fixation immediately at collection is essential; routine formalin preservation loses this organism']
    ],
    trapTitle: 'Dientamoeba is invisible on wet prep - permanent stain is required',
    trapBody: 'Dientamoeba fragilis trophozoites are transparent and essentially invisible on saline or iodine wet preparations. Permanent staining (trichrome or iron-hematoxylin) is required for identification. The organism also rapidly disintegrates in unfixed specimens - PVA fixation at the time of collection is essential. Many cases are missed due to inadequate fixation or lack of permanent staining, leading to under-diagnosis.',
    trapBullets: [
      'D. fragilis is now classified as a trichomonad (related to Trichomonas) based on molecular data, not a true amoeba - the name is historical.',
      'Co-infection with Enterobius is common enough to warrant a perianal tape prep when D. fragilis is found in stool.',
      'Treatment with iodoquinol, paromomycin, or metronidazole is effective; treat when symptomatic (diarrhea, abdominal pain).'
    ],
    interpretationTitle: 'Dientamoeba fragilis identification and reporting guide',
    interpretationRows: [
      ['Binucleate trophozoite ~7-12 um, fragmented chromatin, no karyosome', 'Dientamoeba fragilis - positive', 'Report; recommend Enterobius tape prep; treat if symptomatic; use iodoquinol or paromomycin'],
      ['Uninucleate trophozoite with fragmented chromatin, same slide as binucleate forms', 'Dientamoeba fragilis uninucleate form', 'Report as D. fragilis if binucleate forms present elsewhere; uninucleate form alone is insufficient for diagnosis'],
      ['Granular trophozoite, unfixed specimen, no definitive nuclear detail', 'Suspicious but non-diagnostic', 'PVA fixation required; repeat O&P with proper fixation; do not report D. fragilis from wet prep or poor fixation alone']
    ],
    takeaways: [
      'Binucleate + fragmented chromatin (no karyosome) = D. fragilis. ~80% of organisms are binucleate.',
      'No cyst stage: any cyst in the specimen belongs to another organism. Invisible on wet prep - permanent stain mandatory.',
      'Co-infection with Enterobius is common; recommend perianal tape prep when D. fragilis is found.'
    ],
    remember: 'Two nuclei + chromatin fragments (no karyosome) + no cyst stage = Dientamoeba fragilis. Invisible on wet prep. PVA fixation at collection is essential.',
    relatedLearnSlug: 'intestinal-protozoa',
    divr: {
      detect: 'PVA-fixed stool - trichrome stain (preferred) or iron-hematoxylin; permanent stain is required; organism not identifiable on wet prep; formalin fixation loses this organism',
      identify: ['Binucleate trophozoite ~7-12 um (80% of organisms are binucleate)', 'Each nucleus: 4-8 chromatin granules (fragmented, no karyosome, no peripheral chromatin ring)', 'No cyst stage - if cysts present, they belong to another species'],
      verify: 'Molecular PCR (GI panels) is more sensitive and is the preferred method in high-resource settings; morphology on trichrome is the classical method',
      report: 'Report as Dientamoeba fragilis trophozoites detected; recommend Enterobius tape prep; treat if symptomatic; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'clonorchis-opisthorchis-egg',
    title: 'Clonorchis sinensis / Opisthorchis spp.: Operculated Biliary Fluke Egg',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for recognizing Clonorchis sinensis and Opisthorchis spp. eggs: the smallest common operculated helminth egg (~28-35 um), flask or vase shape, prominent shoulder rim at the opercular end, tiny knob at the abopercular end, and bile-staining.',
    boardTitle: 'Clonorchis / Opisthorchis egg: flask-shaped, opercular shoulder, abopercular knob',
    boardNote: 'Clonorchis sinensis (Chinese liver fluke) and Opisthorchis spp. eggs are morphologically identical. ~28-35 um - the smallest common operculated egg (smaller than Diphyllobothrium ~65 um). Flask/vase shape. Prominent shoulder rim (thickening) at the opercular end where the operculum sits. Tiny knob or protuberance at the abopercular (non-opercular) end. Bile-stained golden-brown. Fully embryonated (miracidium inside) when shed in feces.',
    ariaLabel: 'Illustrated Clonorchis sinensis egg showing flask shape with opercular shoulder rim and tiny abopercular knob, approximately 30 um',
    visualType: 'microscope-clonorchis',
    tubes: [
      {
        id: 'A',
        label: 'Clonorchis/Opisthorchis egg',
        name: '~30 um flask-shaped, shoulder rim, abopercular knob',
        colors: { slant: '#f4e8c8', butt: '#b87828', base: '#5c3010' },
        note: '28-35 um. Flask or vase shape (wider at opercular end, tapered toward the abopercular end). Prominent shoulder rim thickening at the opercular end - the operculum fits into this raised rim. Tiny knob or protuberance at the narrow (abopercular) end. Bile-stained golden-brown. Fully embryonated miracidium visible inside some preparations. Morphologically identical for C. sinensis, O. viverrini, and O. felineus - species differentiation requires geographic/exposure history or PCR.'
      },
      {
        id: 'B',
        label: 'Size and context comparator',
        name: 'Smallest operculated egg: ~30 um vs. Diphyllobothrium ~65 um',
        colors: { slant: '#ece0b8', butt: '#a06820', base: '#4c2808' },
        note: 'Clonorchis egg at ~30 um is the smallest of the four common operculated eggs. Diphyllobothrium latum (~65 um) is more than twice the size and has a more prominent abopercular knob. Heterophyes heterophyes and Metagonimus yokogawai eggs (~30 um) mimic Clonorchis in size but lack the shoulder rim and have a less prominent knob - differentiation requires careful morphology at oil immersion. Clinical context: East/Southeast Asian fish consumption; chronic infection is a risk factor for cholangiocarcinoma (especially O. viverrini).'
      }
    ],
    readoutTitle: 'Clonorchis/Opisthorchis egg recognition guide',
    readoutRows: [
      ['Flask/vase shape, ~28-35 um, prominent opercular shoulder rim', 'Clonorchis sinensis or Opisthorchis spp.', 'Shoulder rim distinguishes from Heterophyes/Metagonimus which lack this thickening'],
      ['Tiny knob at narrow (abopercular) end', 'Clonorchis/Opisthorchis - supportive feature', 'Knob is small but visible at oil immersion; Diphyllobothrium knob is larger and more prominent'],
      ['Bile-stained golden-brown, fully embryonated', 'Clonorchis/Opisthorchis - eggs shed embryonated', 'Miracidium visible inside well-preserved eggs; contrast with Diphyllobothrium (undeveloped embryo)'],
      ['~28-35 um - smallest common operculated egg', 'Size anchors the identification', 'Measure with calibrated micrometer; size overlaps with Heterophyes at lower end; shoulder rim is the differentiator'],
      ['East/Southeast Asia exposure + raw freshwater fish history', 'Epidemiology supports Clonorchis/Opisthorchis', 'Endemic in China, Korea, Vietnam, Thailand; raw or undercooked cyprinid fish; cholangiocarcinoma risk with long-term infection'],
      ['Morphologically identical to O. viverrini, O. felineus', 'Species cannot be distinguished by morphology', 'Geographic exposure + PCR or serology required for species-level differentiation; C. sinensis (East Asia) vs. O. viverrini (Southeast Asia)']
    ],
    trapTitle: 'Heterophyes and Metagonimus eggs mimic Clonorchis - opercular shoulder is the key differentiator',
    trapBody: 'Heterophyes heterophyes and Metagonimus yokogawai eggs overlap with Clonorchis in size (~28-30 um). The key differentiator is the opercular shoulder: Clonorchis/Opisthorchis have a prominent thickened shoulder rim that is absent or much less defined in Heterophyes/Metagonimus. Careful oil-immersion examination is required when the eggs are on the small end of the Clonorchis range.',
    trapBullets: [
      'Chronic Clonorchis/Opisthorchis infection (especially O. viverrini in Southeast Asia) is a Group 1 IARC carcinogen and a major risk factor for cholangiocarcinoma.',
      'Praziquantel is highly effective and is the treatment of choice for all liver fluke infections.',
      'Stool O&P is the primary diagnostic method; serologic tests (ELISA) are available for population surveys but have cross-reactivity with other trematodes.'
    ],
    interpretationTitle: 'Clonorchis/Opisthorchis identification and reporting guide',
    interpretationRows: [
      ['Flask-shaped ~30 um egg, opercular shoulder rim, tiny abopercular knob', 'Clonorchis sinensis / Opisthorchis spp. - positive', 'Report as liver fluke egg consistent with Clonorchis/Opisthorchis; praziquantel treatment; liver imaging for cholangiopathy'],
      ['Similar-sized egg ~30 um, no prominent shoulder rim', 'Heterophyes/Metagonimus - consider alternative', 'Shoulder rim absence or minimal = Heterophyes or Metagonimus; report with morphologic notes; geographic context'],
      ['Equivocal morphology at size limit', 'Confirm with repeat prep, PCR, or serology', 'If species differentiation is clinically important, request PCR or reference lab confirmation; clinical context guides']
    ],
    takeaways: [
      'Smallest common operculated egg ~28-35 um: flask shape + opercular shoulder rim + tiny abopercular knob = Clonorchis/Opisthorchis.',
      'Shoulder rim at opercular end is the key differentiator from Heterophyes/Metagonimus (which lack this rim at the same size).',
      'Chronic infection (especially O. viverrini) = major cholangiocarcinoma risk; always note exposure history when reporting.'
    ],
    remember: 'Clonorchis = smallest operculated egg (~30 um). Flask shape. Shoulder rim at opercular end. Tiny abopercular knob. Bile-stained. Cholangiocarcinoma risk.',
    relatedLearnSlug: 'intestinal-helminths',
    divr: {
      detect: 'Stool O&P - iodine wet prep or formalin-ethyl acetate sedimentation; calibrated ocular micrometer for size; oil immersion for opercular shoulder detail',
      identify: ['Flask-shaped ~28-35 um, prominent shoulder rim (thickening) at opercular end', 'Tiny knob at abopercular (narrow) end', 'Bile-stained golden-brown, fully embryonated; C. sinensis and Opisthorchis spp. morphologically identical'],
      verify: 'PCR or serology (ELISA) for species differentiation; geographic/exposure history essential; liver ultrasound for cholangiopathy',
      report: 'Report as liver fluke egg consistent with Clonorchis/Opisthorchis; note species indistinguishable by morphology; treatment: praziquantel; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'fasciolopsis-fasciola-comparison',
    title: 'Fasciola hepatica vs. Fasciolopsis buski: Large Operculated Egg Comparison',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card comparison of the two largest operculated helminth eggs: Fasciola hepatica (liver fluke, ~130-150 um, thin shell, biliary disease) and Fasciolopsis buski (intestinal giant fluke, ~130-140 um, thin shell) - morphologically essentially identical, differentiated by clinical context and geographic exposure.',
    boardTitle: 'Fasciola hepatica vs. Fasciolopsis buski: identical morphology, different clinical disease',
    boardNote: 'Both eggs: ~130-150 um (largest common operculated egg), oval, yellow-brown, thin shell, opercular shoulder at the opercular pole. Morphologically indistinguishable by microscopy. Fasciola hepatica: liver/bile duct disease, eosinophilia, transmitted via aquatic vegetation (watercress). Fasciolopsis buski: intestinal disease, Southeast Asia, transmitted via aquatic plants (water caltrops, water chestnuts). Clinical and geographic context is mandatory for species-level differentiation.',
    ariaLabel: 'Illustrated large operculated egg approximately 140 um representing Fasciola hepatica and Fasciolopsis buski, showing thin shell and opercular shoulder',
    visualType: 'microscope-fasciola',
    tubes: [
      {
        id: 'A',
        label: 'Fasciola hepatica (liver fluke)',
        name: '~130-150 um, thin shell, biliary/hepatic disease',
        colors: { slant: '#f0e8c0', butt: '#c8a040', base: '#604810' },
        note: '130-150 um, oval. Thin shell (thinner than Paragonimus, Diphyllobothrium). Yellow-brown (bile-stained). Opercular shoulder visible at one pole - operculum is relatively inconspicuous compared to smaller operculated eggs. Interior contains undeveloped egg cell and vitelline cells when freshly passed; embryonates in water. Fasciola: hepatic phase (liver migration, acute eosinophilic hepatitis) + biliary phase (biliary obstruction, cholangitis). Worldwide distribution where freshwater snails and aquatic vegetation co-exist. Transmitted by eating raw watercress or drinking contaminated water.'
      },
      {
        id: 'B',
        label: 'Fasciolopsis buski (intestinal fluke)',
        name: '~130-140 um, thin shell, intestinal disease (same morphology)',
        colors: { slant: '#ece4b8', butt: '#c09838', base: '#584010' },
        note: '130-140 um, oval. Morphologically essentially identical to Fasciola hepatica - same size range, same thin shell, same yellow-brown bile staining, same opercular shoulder. Disease context is the ONLY differentiator: Fasciolopsis causes intestinal disease (diarrhea, malabsorption, edema in heavy infections) in Southeast/East Asia. Transmitted by eating raw aquatic plants (water caltrops, lotus roots, water chestnuts) in pig-raising endemic regions. No hepatic phase - worm lives in the small intestine attached to the mucosa. Treatment: praziquantel (both species).'
      }
    ],
    readoutTitle: 'Fasciola vs. Fasciolopsis morphology and differentiation',
    readoutRows: [
      ['Large oval egg ~130-150 um, thin shell, opercular shoulder', 'Fasciola hepatica or Fasciolopsis buski - morphologically identical', 'Size and morphology alone cannot differentiate - clinical/geographic context is mandatory'],
      ['Biliary disease, eosinophilia, hepatomegaly, jaundice', 'Fasciola hepatica - clinical clue', 'Hepatic migration phase: RUQ pain, fever, eosinophilia; biliary phase: obstructive jaundice, cholangitis'],
      ['Intestinal diarrhea, malabsorption, Southeast/East Asia exposure', 'Fasciolopsis buski - clinical clue', 'No hepatic phase; worm lives in intestine; Southeast/East Asian exposure + aquatic plant ingestion'],
      ['Aquatic vegetation (watercress, freshwater plants) consumption', 'Fasciola hepatica transmission route', 'Watercress grown in endemic areas is the classic vehicle; contaminated water source also possible'],
      ['Water caltrops, lotus root, water chestnuts', 'Fasciolopsis buski transmission route', 'Aquatic plants in Southeast Asia where pigs act as reservoir hosts; cercariae encyst on plant surfaces'],
      ['Largest common operculated egg on smear', 'Fasciola or Fasciolopsis - size anchors ID', 'No other common intestinal helminth produces an operculated egg ~130-150 um; size rules out Diphyllobothrium (~65 um) and Paragonimus (~90 um)']
    ],
    trapTitle: 'Do not report species from morphology alone - they are identical under the microscope',
    trapBody: 'Fasciola hepatica and Fasciolopsis buski eggs are morphologically indistinguishable by standard light microscopy. Reporting a specific species from egg morphology alone is an error that can mislead clinical management. The distinction requires clinical presentation (hepatic vs. intestinal symptoms), imaging (hepatic lesions for Fasciola), geographic exposure, and reservoir host context. Always report as "large operculated egg consistent with Fasciola hepatica / Fasciolopsis buski" with a clinical correlation note.',
    trapBullets: [
      'Fasciola hepatica also infects cattle (zoonosis) - veterinary and food exposure history is relevant in non-endemic areas.',
      'Serology (ELISA for Fasciola antigen) is more sensitive than stool O&P for Fasciola in the acute hepatic phase when eggs are not yet being shed.',
      'Both are treated with triclabendazole (Fasciola preferred agent - more active than praziquantel against Fasciola) or praziquantel (Fasciolopsis).'
    ],
    interpretationTitle: 'Large operculated egg clinical differentiation guide',
    interpretationRows: [
      ['Large ~130-150 um operculated egg, hepatic/biliary disease, eosinophilia', 'Fasciola hepatica - report and treat with triclabendazole', 'Liver imaging; ELISA serology; triclabendazole preferred over praziquantel for Fasciola'],
      ['Large ~130-150 um operculated egg, intestinal disease, Southeast Asia', 'Fasciolopsis buski - report and treat with praziquantel', 'Praziquantel effective; aquatic plant exposure history; no hepatic involvement'],
      ['Large ~130-150 um operculated egg, unclear clinical context', 'Large operculated egg - report with differential', 'Report as large operculated egg consistent with Fasciola hepatica/Fasciolopsis buski; request clinical details for species differentiation']
    ],
    takeaways: [
      'Fasciola and Fasciolopsis produce morphologically identical eggs (~130-150 um, thin shell, opercular shoulder) - they cannot be distinguished by microscopy.',
      'Clinical differentiation: Fasciola = hepatic/biliary disease + eosinophilia (liver fluke); Fasciolopsis = intestinal disease in Southeast Asia (intestinal fluke).',
      'Largest common operculated egg - larger than Paragonimus (~90 um) and much larger than Diphyllobothrium (~65 um).'
    ],
    remember: 'Fasciola ≈ Fasciolopsis by egg morphology. Largest operculated egg. Hepatic disease = Fasciola (triclabendazole). Intestinal disease + Southeast Asia = Fasciolopsis (praziquantel).',
    relatedLearnSlug: 'intestinal-helminths',
    divr: {
      detect: 'Stool O&P - sedimentation (formalin-ethyl acetate); calibrated micrometer; serology (ELISA) for Fasciola when eggs not yet shed (acute hepatic phase)',
      identify: ['Large operculated egg ~130-150 um, thin shell, yellow-brown, opercular shoulder - Fasciola and Fasciolopsis morphologically identical', 'Species differentiation requires: clinical presentation (hepatic vs. intestinal), geographic exposure, imaging'],
      verify: 'Fasciola serology (ELISA) for hepatic phase; liver imaging (CT/MRI); PCR in specialized labs; stool O&P for biliary/intestinal phases',
      report: 'Report as large operculated egg consistent with Fasciola hepatica/Fasciolopsis buski; note species indistinguishable by morphology; require clinical context for species; confirm per lab SOP'
    }
  },
  {
    slug: 'dipylidium-caninum-egg-packet',
    title: 'Dipylidium caninum: Egg Packets and Cucumber-Seed Proglottids',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card visuals for Dipylidium caninum (dog/cat tapeworm): egg capsules/packets (5-30 oncospheres per capsule), cucumber-seed shaped proglottids, and flea/louse transmission - the most common tapeworm of dogs and cats, occasional human infections in children.',
    boardTitle: 'Dipylidium caninum: egg packets and proglottid morphology',
    boardNote: 'Egg packets (capsules): each contains 5-30 round oncospheres (20-40 um each), enclosed in a thin outer membrane. Found in stool or on perianal skin when proglottid ruptures. Proglottid: cucumber-seed or rice-grain shape (~1-3 cm), with two lateral genital pores (one on each side) - double genital pore is unique to D. caninum among common tapeworms. Transmission: humans (usually children) accidentally swallow infected dog or cat fleas; flea larvae ingest tapeworm eggs.',
    ariaLabel: 'Illustrated Dipylidium caninum egg packet showing multiple round oncospheres within a membrane capsule, and cucumber-seed shaped proglottid with double lateral genital pores',
    visualType: 'microscope-dipylidium',
    tubes: [
      {
        id: 'A',
        label: 'Egg packet (egg capsule)',
        name: '5-30 round oncospheres in a membrane capsule',
        colors: { slant: '#f0e8c8', butt: '#a08848', base: '#4c3810' },
        note: 'Egg capsule (packet): thin outer membrane containing 5-30 round oncospheres (20-40 um each, with 3 pairs of hooklets inside). Packets released when gravid proglottids disintegrate in stool or on perianal skin. The egg packet - not individual oncospheres - is the diagnostic unit in stool exam. Individual oncospheres resemble Hymenolepis nana eggs but lack the characteristic polar filaments; egg-capsule context is essential. Found in stool or on perianal skin (proglottids migrate out and rupture spontaneously).'
      },
      {
        id: 'B',
        label: 'Cucumber-seed proglottid',
        name: 'Double genital pores - unique to Dipylidium',
        colors: { slant: '#ece0b8', butt: '#907840', base: '#403008' },
        note: 'Proglottid: ~1-3 cm, elongated oval - resembles a cucumber seed or rice grain. Double genital pores (one on each lateral side) is the single most diagnostic feature of D. caninum - no other common tapeworm has two functional genital pores. Proglottids may be passed intact in stool or observed migrating perianally (patients may report "moving seeds" in their underwear or on pets). Gravid proglottids are filled with egg capsules. Scolex: ~0.5 mm, 4 suckers + rostellum with multiple rows of rose-thorn hooks.'
      }
    ],
    readoutTitle: 'Dipylidium caninum diagnostic recognition guide',
    readoutRows: [
      ['Egg capsule (packet) containing 5-30 round oncospheres', 'Dipylidium caninum eggs', 'The packet itself is diagnostic; do not confuse individual oncospheres with other tapeworm eggs without packet context'],
      ['Double genital pores (one each side of proglottid)', 'Dipylidium caninum - unique feature', 'No other common tapeworm has bilateral genital pores; single pore = Taenia; presence of two pores confirms D. caninum'],
      ['Cucumber-seed or rice-grain shaped proglottid', 'D. caninum or other tapeworm (shape alone)', 'Shape is suggestive; confirm species by double genital pores; Taenia segments are flatter and wider-proportioned'],
      ['Round oncospheres, 20-40 um, 3 hooklet pairs', 'D. caninum oncosphere', 'Similar to H. nana oncosphere but without the polar filaments; egg-packet context distinguishes from free H. nana eggs'],
      ['Child with pruritus ani, contact with dogs or cats, fleas on pet', 'Dipylidium caninum - transmission clue', 'Children are the primary human hosts due to accidental flea ingestion during play; ask about pet flea status'],
      ['Moving white segments in stool or on perianal skin', 'Proglottids migrating - behavioral clue', 'Gravid proglottids actively migrate; "moving rice grains" in stool or underwear is a classic patient complaint for D. caninum and Taenia']
    ],
    trapTitle: 'Egg capsules (packets) are the diagnostic form - individual oncospheres are non-specific',
    trapBody: 'When Dipylidium egg capsules rupture (in stool processing or specimen handling), the individual round oncospheres released look similar to other tapeworm oncospheres. An individual 20-40 um oncosphere without packet context cannot be reliably identified as D. caninum. Always look for intact egg capsules, and ask about proglottid passage and pet flea history to anchor the identification.',
    trapBullets: [
      'Treat the pet (dog or cat) for fleas simultaneously with treating the human host - re-infection will occur without environmental flea control.',
      'Praziquantel (single dose) is highly effective for D. caninum; niclosamide is an alternative.',
      'Dipylidium is the most common tapeworm of dogs and cats worldwide; human infection is incidental and primarily occurs in children under 2 years old who have close contact with infested pets.'
    ],
    interpretationTitle: 'Dipylidium caninum identification and reporting guide',
    interpretationRows: [
      ['Egg capsule with 5-30 round oncospheres in membrane packet', 'Dipylidium caninum - positive', 'Report; praziquantel treatment; recommend pet flea treatment to prevent re-infection'],
      ['Cucumber-seed proglottid with double lateral genital pores', 'Dipylidium caninum - proglottid confirmed', 'Double genital pores confirm D. caninum; report as tapeworm proglottid; praziquantel treatment'],
      ['Individual round oncospheres without egg capsule context', 'Oncospheres - confirm species with clinical context', 'Cannot confirm D. caninum from oncospheres alone; look for intact capsules; ask about proglottid passage and pet fleas']
    ],
    takeaways: [
      'Egg capsule (packet) with 5-30 oncospheres is the diagnostic unit - look for intact packets, not individual oncospheres.',
      'Double genital pores (one each lateral side) on the cucumber-seed proglottid = Dipylidium caninum exclusively.',
      'Transmission: accidental swallowing of infected dog/cat fleas - always recommend flea treatment for the pet.'
    ],
    remember: 'Egg packet (5-30 oncospheres in capsule) = Dipylidium. Double genital pores on cucumber-seed proglottid = confirmed D. caninum. Flea-transmitted. Treat pet too.',
    relatedLearnSlug: 'intestinal-helminths',
    divr: {
      detect: 'Stool O&P - sedimentation or zinc sulfate flotation for egg capsules; direct examination of proglottids in stool or perianal specimens; tape prep for proglottids on perianal skin',
      identify: ['Egg capsule: 5-30 round oncospheres (20-40 um each with 3 hooklet pairs) in thin membrane packet', 'Proglottid: cucumber-seed shaped, double lateral genital pores (unique to D. caninum)', 'Scolex: 4 suckers + rostellum with multiple rows of rose-thorn hooks'],
      verify: 'Double genital pores on proglottid are pathognomonic; egg capsule context confirms oncosphere identity; pet flea history supports diagnosis',
      report: 'Report as Dipylidium caninum egg capsules/proglottids detected; recommend praziquantel treatment; advise pet flea treatment; clinical correlation required; confirm per lab SOP'
    }
  },
  {
    slug: 'taenia-scolex-comparison',
    title: 'Taenia Scolex Comparison: T. solium vs. T. saginata',
    eyebrow: 'Visual Atlas / Parasitology',
    summary: 'Bench-card comparison of Taenia solium (pork tapeworm) and T. saginata (beef tapeworm) scoleces: T. solium has 4 suckers + rostellum with 2 rows of hooks (armed); T. saginata has 4 suckers only, NO rostellum, NO hooks (unarmed). Critical distinction for cysticercosis risk assessment.',
    boardTitle: 'Taenia scolex: T. solium (armed, rostellum + hooks) vs. T. saginata (unarmed, no rostellum)',
    boardNote: 'T. solium (armed tapeworm): scolex ~1 mm, 4 suckers + rostellum (rounded projection) with 2 alternating rows of hooks (large and small, 22-32 total). T. saginata (unarmed tapeworm): scolex ~1-2 mm, 4 suckers only - NO rostellum, NO hooks. Scolex examination distinguishes species when segments are passed but eggs are unavailable. T. solium infection carries cysticercosis risk (larval migration to tissues); T. saginata does not.',
    ariaLabel: 'Illustrated comparison of Taenia solium scolex showing rostellum with 2 rows of hooks versus T. saginata scolex showing 4 suckers with no rostellum',
    visualType: 'microscope-taenia-scolex',
    tubes: [
      {
        id: 'A',
        label: 'T. solium (armed)',
        name: '4 suckers + rostellum with 2 rows of hooks',
        colors: { slant: '#f0e8d8', butt: '#906840', base: '#3c2010' },
        note: '~1 mm scolex. 4 cup-shaped suckers arranged symmetrically around the scolex. Rostellum: rounded projection at the apex, armed with 22-32 hooks in 2 alternating rows (large hooks ~180 um + small hooks ~130 um). The hooks are visible at low power as a double crown at the apex. T. solium also carries cysticercosis risk (Taenia solium cysticercosis, NCC) from accidental ingestion of T. solium eggs - can cause cysts in brain, muscle, eye. Eggs of T. solium and T. saginata are morphologically identical; scolex examination is required for species differentiation.'
      },
      {
        id: 'B',
        label: 'T. saginata (unarmed)',
        name: '4 suckers only, NO rostellum, NO hooks',
        colors: { slant: '#ece4d0', butt: '#806030', base: '#381808' },
        note: '~1-2 mm scolex (slightly larger than T. solium). 4 prominent suckers arranged symmetrically. NO rostellum - apex is rounded and smooth. NO hooks - completely absent. The "unarmed" tapeworm. Gravid proglottids: 15-30 uterine branches per side (T. solium: 7-13 branches per side) - proglottid branch counting is an alternative species ID method when scolex is unavailable. T. saginata does NOT cause cysticercosis - humans are the only definitive host for the adult worm; cattle are the intermediate host (cysticerci in muscle).'
      }
    ],
    readoutTitle: 'Taenia scolex and proglottid species differentiation',
    readoutRows: [
      ['Rostellum with 2 rows of hooks at apex', 'T. solium (armed) - cysticercosis risk', 'Presence of hooks confirms T. solium; report immediately to assess cysticercosis risk in patient and contacts'],
      ['No rostellum, smooth rounded apex, 4 suckers only', 'T. saginata (unarmed) - no cysticercosis risk', 'Absence of rostellum/hooks = T. saginata; no cysticercosis concern'],
      ['Proglottid with 15-30 uterine branches per side', 'T. saginata gravid proglottid', 'Count uterine branches in fixed/pressed proglottid; 15-30 = saginata; 7-13 = solium; Indian ink injection helps visualization'],
      ['Proglottid with 7-13 uterine branches per side', 'T. solium gravid proglottid', 'Fewer branches than T. saginata; confirm with Indian ink injection and microsopy; scolex ID is more definitive'],
      ['Taenia eggs (radially striated shell, 30-40 um, oncosphere with 3 hooklet pairs)', 'Taenia spp. - species cannot be determined from egg', 'T. solium and T. saginata eggs are morphologically identical; report as Taenia spp.; require scolex or proglottid for species ID'],
      ['T. solium egg ingested by human (not pork ingestion)', 'Risk of cysticercosis - NCC', 'Human becomes accidental intermediate host when T. solium eggs are ingested; cysticerci develop in tissues including brain']
    ],
    trapTitle: 'Taenia eggs cannot be used to distinguish T. solium from T. saginata',
    trapBody: 'Taenia solium and T. saginata produce morphologically identical eggs (radially striated outer shell, ~30-40 um, oncosphere with 3 hooklet pairs inside). Species identification requires either scolex examination (hooks vs. no hooks) or gravid proglottid uterine branch counting (7-13 = solium vs. 15-30 = saginata). Reporting "Taenia spp." from egg morphology alone is correct and appropriate - do not speculate on species without scolex or proglottid evidence.',
    trapBullets: [
      'Taenia solium cysticercosis (neurocysticercosis, NCC) is the most common cause of acquired epilepsy in many developing countries - a finding of T. solium should prompt NCC investigation.',
      'When T. solium adult tapeworm is found, assess household contacts for egg exposure - cysticercosis can be transmitted from person to person via fecal-oral route (T. solium eggs in human stool).',
      'Cysticercosis is NOT caused by eating pork - it results from ingesting T. solium eggs (from contaminated food/water or human carriers). Eating infected pork gives the adult tapeworm, not cysticercosis.'
    ],
    interpretationTitle: 'Taenia species differentiation and reporting guide',
    interpretationRows: [
      ['Scolex with rostellum + 2 rows of hooks', 'Taenia solium - armed tapeworm; cysticercosis risk assessment required', 'Report immediately; CNS imaging for NCC; praziquantel for intestinal tapeworm; albendazole + corticosteroids for NCC'],
      ['Scolex with 4 suckers, no rostellum, no hooks', 'Taenia saginata - unarmed tapeworm; no cysticercosis risk', 'Report; praziquantel treatment; no NCC concern; beef exposure history'],
      ['Taenia eggs only, no scolex or proglottid', 'Taenia spp. - species indeterminate', 'Report as Taenia spp. egg; request scolex or proglottid for species ID; inform physician of cysticercosis risk potential until T. solium excluded']
    ],
    takeaways: [
      'T. solium (armed): rostellum + 2 rows of hooks + 4 suckers = cysticercosis risk. T. saginata (unarmed): 4 suckers only, no rostellum/hooks = no cysticercosis.',
      'Taenia eggs are identical for both species - scolex or proglottid required for species identification.',
      'Proglottid uterine branches: 7-13 = T. solium; 15-30 = T. saginata - use Indian ink injection for visibility.'
    ],
    remember: 'Armed (hooks + rostellum) = T. solium = cysticercosis risk. Unarmed (no hooks) = T. saginata = no cysticercosis. Eggs identical. Never speculate species from egg alone.',
    relatedLearnSlug: 'intestinal-helminths',
    divr: {
      detect: 'Stool examination for scolex (after anthelmintic treatment, scolex may be expelled - examine thoroughly); proglottid examination (direct or Indian ink injection); stool O&P for eggs',
      identify: ['T. solium scolex: 4 suckers + rostellum with 2 rows of hooks (22-32 hooks total, ~180 um large + ~130 um small)', 'T. saginata scolex: 4 suckers + NO rostellum + NO hooks', 'Proglottid branches: T. solium 7-13 lateral branches; T. saginata 15-30 lateral branches (Indian ink); Taenia eggs morphologically identical'],
      verify: 'Species ID requires scolex or proglottid morphology; PCR from proglottid or stool for definitive species ID; imaging (CT/MRI) when T. solium found to evaluate for NCC',
      report: 'Report species if scolex/proglottid available; Taenia spp. if egg only; T. solium = urgent NCC risk assessment; clinical correlation required; confirm per lab SOP'
    }
  }
];

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

function renderMycology(tube: TubeVisual, visualType: AtlasPage['visualType']) {
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
  'gram-positive-cocci',
  'staphylococcus-micrococcus',
  'streptococcus-enterococcus',
  'lactobacillus'
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
            className={discipline === d ? 'active' : ''}
            onClick={() => handleDisciplineChange(d)}
          >
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
  const isVisualBookmarked = isBookmarked('visual', page.slug);
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
    document.title = `${page.title} | Learn Microbes`;
    setIsBoardNoteExpanded(false);
    setExpandedAnchorIds([]);
    trackEvent('visual_card_opened', {
      visual_slug: page.slug,
      visual_title: page.title,
      visual_type: page.visualType
    });
  }, [page.slug, page.title, page.visualType]);

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
    <nav className={`visual-sequence visual-sequence-${placement}`} aria-label="Previous and next Visual Atlas cards">
      {visualPosition.previousPage ? (
        <Link className="visual-sequence-link previous" to={`/visuals/${visualPosition.previousPage.slug}`}>
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
        <Link className="visual-sequence-link next" to={`/visuals/${visualPosition.nextPage.slug}`}>
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

      <section className="visual-board" aria-labelledby="visual-board-title">
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
