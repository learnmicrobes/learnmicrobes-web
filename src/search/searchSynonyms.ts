/**
 * Bench shorthand a student types but the content spells out. Each key is a
 * normalised word; its expansions are searched as well as the word itself, so
 * "gnr" also finds "gram negative rods" without losing pages that say "GNR".
 *
 * Only add an entry when the short form is unambiguous at the bench: "gas" (group
 * A strep) is left out because it also means gas production.
 */
export const searchSynonyms: Record<string, string[]> = {
  staph: ['staphylococcus'],
  strep: ['streptococcus'],
  cons: ['coagulase negative staphylococci'],
  mrsa: ['methicillin resistant staphylococcus aureus'],
  mssa: ['methicillin susceptible staphylococcus aureus'],
  vre: ['vancomycin resistant enterococcus'],
  gbs: ['group b streptococcus', 'agalactiae'],
  esbl: ['extended spectrum beta lactamase'],
  cre: ['carbapenem resistant enterobacterales'],
  tb: ['tuberculosis'],
  mtb: ['mycobacterium tuberculosis'],
  afb: ['acid fast'],
  gpc: ['gram positive cocci'],
  gpr: ['gram positive rods'],
  gpb: ['gram positive bacilli'],
  gnr: ['gram negative rods'],
  gnb: ['gram negative bacilli'],
  gnc: ['gram negative cocci'],
  gndc: ['gram negative diplococci'],
  bap: ['blood agar'],
  sba: ['sheep blood agar'],
  mac: ['macconkey'],
  choc: ['chocolate agar'],
  emb: ['eosin methylene blue'],
  tsi: ['triple sugar iron'],
  kia: ['kligler iron'],
  lia: ['lysine iron'],
  sda: ['sabouraud'],
  sab: ['sabouraud'],
  bcye: ['buffered charcoal yeast extract'],
  lf: ['lactose fermenter'],
  nlf: ['non lactose fermenter'],
  vp: ['voges proskauer'],
  mr: ['methyl red'],
  pad: ['phenylalanine deaminase'],
  ast: ['susceptibility testing'],
  kb: ['kirby bauer'],
  csf: ['cerebrospinal fluid'],
  uti: ['urinary tract infection'],
  bsc: ['biological safety cabinet'],
  qc: ['quality control'],
  hflu: ['haemophilus influenzae'],
  ecoli: ['escherichia coli'],
  op: ['ova and parasite'],
  koh: ['potassium hydroxide'],
  // British and older spellings.
  haemolysis: ['hemolysis'],
  haemolytic: ['hemolytic'],
  hemophilus: ['haemophilus'],
  colour: ['color'],
  faeces: ['feces', 'stool'],
  feces: ['stool'],
  stool: ['feces'],
  pictures: ['visual atlas'],
  images: ['visual atlas']
};

/** Words that carry no meaning in a query. They are dropped unless they are all there is. */
export const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'do', 'does', 'for', 'from', 'how', 'i',
  'in', 'is', 'it', 'me', 'of', 'on', 'or', 'show', 'the', 'to', 'vs', 'versus', 'what',
  'whats', 'when', 'which', 'why', 'with'
]);
