import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSearchAliases } from '../../data/searchAliases';
import './VisualAtlas.css';

type TubeVisual = {
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

type AtlasPage = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  boardTitle: string;
  boardNote: string;
  ariaLabel: string;
  visualType: 'lia' | 'utilization' | 'disk-susceptibility' | 'esculin-hydrolysis' | 'fermentation' | 'flagella-stain' | 'gelatin-hydrolysis' | 'growth-temperature' | 'hippurate-hydrolysis' | 'indole-production' | 'lap-test' | 'litmus-milk' | 'bile-esculin' | 'bile-solubility' | 'butyrate-disk' | 'camp-test' | 'catalase' | 'cetrimide' | 'citrate' | 'coagulase' | 'decarboxylase' | 'dnase' | 'mrvp' | 'microdase' | 'motility' | 'mrs-broth' | 'mug-test' | 'nitrate-reduction' | 'nitrite-reduction' | 'onpg-test' | 'optochin-test' | 'oxidase-test' | 'of-medium' | 'phenylalanine-deaminase' | 'pyr-test' | 'pyruvate-broth' | 'salt-tolerance' | 'spot-indole' | 'tsi-test' | 'urease-test' | 'xv-factor-test';
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
};

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
  }
];

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
            {/* No color — white/unchanged disk */}
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
        {/* Durham tube body — glass wall */}
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
          /* Broth fills the entire Durham tube — no gas */
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

        {/* UV viewing chamber — pitch black */}
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
            <text x="100" y="163" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">≥ 14 mm</text>
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
        <text x="52" y="115" textAnchor="middle" fill="#718096" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">+/–</text>

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
        <text x="52" y="115" textAnchor="middle" fill="#718096" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">+/–</text>

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
        <text x="52" y="115" textAnchor="middle" fill="#718096" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">+/–</text>

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
  const isC = tube.id === 'C';
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
  const requiresBoth = tube.id === 'A';
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

  return 'Biochemical tests';
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

function VisualAtlasHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedAtlasPages = useMemo(
    () => [...atlasPages].sort((a, b) => a.title.localeCompare(b.title)),
    []
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(sortedAtlasPages.map((page) => getVisualCategory(page))))],
    [sortedAtlasPages]
  );

  const filteredPages = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return sortedAtlasPages.filter((page) => {
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
  }, [activeCategory, searchQuery, sortedAtlasPages]);

  const groupedPages = useMemo(() => groupPagesByFirstLetter(filteredPages), [filteredPages]);
  const availableLetters = useMemo(() => groupPagesByFirstLetter(sortedAtlasPages).map((group) => group.letter), [sortedAtlasPages]);
  const benchCardGroups = useMemo(() => (
    categories
      .filter((category) => category !== 'All')
      .map((category) => ({
        category,
        count: sortedAtlasPages.filter((page) => getVisualCategory(page) === category).length
      }))
  ), [categories, sortedAtlasPages]);

  return (
    <div className="visual-atlas-shell">
      <header className="visual-atlas-hero">
        <span className="visual-kicker">Visual Atlas / Bench Cards</span>
        <h1>Bench Cards for visual microbiology review</h1>
        <p>
          Original Learn Microbes cards for media reactions, biochemical patterns, stains, growth clues, and practical interpretation anchors.
        </p>
      </header>

      <section className="bench-card-strip" aria-label="Bench card collections">
        {benchCardGroups.map((group) => (
          <button
            type="button"
            key={group.category}
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
            placeholder="Try indole, purple, Durham, 42 C, blackening..."
          />
        </div>
        <div className="visual-filter-chips" aria-label="Filter visual categories">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? 'active' : ''}
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

  useEffect(() => {
    document.title = `${page.title} | Learn Microbes`;
  }, [page.title]);

  return (
    <div className="visual-atlas-shell">
      <header className="visual-atlas-hero">
        <span className="visual-kicker">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        <p>{page.summary}</p>
        <div className="visual-scope-note">
          <span>Bench card</span>
          <p>Use this page for visual readout and interpretation anchors. Use the reference page for procedure, reagents, QC, and expected-result wording.</p>
        </div>
        <div className="visual-hero-actions">
          <button
            type="button"
            onClick={() => navigate(page.biochemicalTestId ? `/biochemical-tests?test=${page.biochemicalTestId}` : '/biochemical-tests')}
          >
            Open procedure/QC reference
          </button>
          {page.relatedLearnSlug && <Link to={`/learn/${page.relatedLearnSlug}`}>Read concept page</Link>}
        </div>
      </header>

      <section className="visual-board" aria-labelledby="visual-board-title">
        <div className="visual-board-heading">
          <div>
            <span className="visual-kicker">Bench card visual</span>
            <h2 id="visual-board-title">{page.boardTitle}</h2>
          </div>
          <p>{page.boardNote}</p>
        </div>

        <div className={`lia-stage ${page.visualType === 'utilization' || page.visualType === 'esculin-hydrolysis' || page.visualType === 'growth-temperature' || page.visualType === 'bile-esculin' || page.visualType === 'cetrimide' || page.visualType === 'citrate' || page.visualType === 'motility' || page.visualType === 'mrs-broth' || page.visualType === 'nitrite-reduction' || page.visualType === 'onpg-test' || page.visualType === 'phenylalanine-deaminase' || page.visualType === 'pyruvate-broth' || page.visualType === 'salt-tolerance' || page.visualType === 'urease-test' ? 'utilization-stage' : page.visualType === 'of-medium' ? 'of-stage' : page.visualType === 'disk-susceptibility' || page.visualType === 'optochin-test' || page.visualType === 'lap-test' || page.visualType === 'indole-production' || page.visualType === 'hippurate-hydrolysis' || page.visualType === 'gelatin-hydrolysis' || page.visualType === 'bile-solubility' || page.visualType === 'butyrate-disk' || page.visualType === 'catalase' || page.visualType === 'dnase' || page.visualType === 'mug-test' || page.visualType === 'microdase' || page.visualType === 'oxidase-test' || page.visualType === 'pyr-test' || page.visualType === 'spot-indole' ? 'disk-stage' : page.visualType === 'camp-test' ? 'camp-stage' : page.visualType === 'litmus-milk' || page.visualType === 'flagella-stain' || page.visualType === 'fermentation' || page.visualType === 'coagulase' || page.visualType === 'decarboxylase' || page.visualType === 'mrvp' || page.visualType === 'nitrate-reduction' || page.visualType === 'tsi-test' || page.visualType === 'xv-factor-test' ? 'coagulase-stage' : ''}`} role="img" aria-label={page.ariaLabel}>
          {page.tubes.map((tube) => renderTube(tube, page.visualType))}
        </div>
      </section>

      <div className="visual-grid">
        <section className="visual-panel">
          <span className="visual-kicker">How to read it</span>
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

        <aside className="visual-panel visual-callout">
          <span className="visual-kicker">Common trap</span>
          <h2>{page.trapTitle}</h2>
          <p>{page.trapBody}</p>
          <ul>
            {page.trapBullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
      </div>

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
    </div>
  );
}

const VisualAtlas: React.FC = () => {
  const { slug } = useParams();
  const page = atlasPages.find((item) => item.slug === slug);

  if (!slug) {
    return <VisualAtlasHub />;
  }

  if (!page) {
    return <VisualAtlasHub />;
  }

  return <VisualAtlasPage page={page} />;
};

export default VisualAtlas;
