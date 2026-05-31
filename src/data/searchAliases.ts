export const searchAliasesBySlug: Record<string, string[]> = {
  'leucine-aminopeptidase-lap-test': [
    'lap',
    'leucine',
    'leucine aminopeptidase',
    'lap test',
    'red lap',
    'pink lap',
    'cinnamaldehyde',
    'catalase negative gram positive cocci'
  ],
  'indole-production': [
    'kovac',
    'kovacs',
    "kovac's",
    'pink ring',
    'red ring',
    'cherry red ring',
    'tryptophanase',
    'xylene layer',
    'ehrlich',
    'indole ring'
  ],
  'spot-indole': [
    'kovac',
    'kovacs',
    "kovac's",
    'pink spot',
    'blue green spot',
    'tryptophanase',
    'indole reagent'
  ],
  'hippurate-hydrolysis': [
    'hippurate',
    'purple hippurate',
    'deep purple',
    'ninhydrin',
    'glycine',
    'campylobacter hippurate',
    'group b strep hippurate'
  ],
  'growth-at-42-c': [
    '42 degrees',
    '42 c',
    '42c',
    'growth at 42',
    'pseudomonas 42',
    'elevated temperature',
    'no growth at 42'
  ],
  'gelatin-hydrolysis': [
    'gelatin liquefaction',
    'liquefaction',
    'gelatinase',
    'solid after refrigeration',
    'liquid gelatin',
    'gelatin deep'
  ],
  'esculin-hydrolysis': [
    'black tube',
    'blackening',
    'esculin black',
    'ferric citrate',
    'uv lamp',
    'woods lamp',
    "wood's lamp",
    'bile esculin vs esculin',
    'esculin without bile'
  ],
  'bile-esculin': [
    'black tube',
    'black slant',
    'blackening',
    'bile esculin vs esculin',
    'bile esculin',
    'esculin with bile',
    'group d strep',
    'enterococcus bile esculin'
  ],
  'fermentation-media': [
    'durham',
    'durham tube',
    'gas bubble',
    'pink broth',
    'yellow broth',
    'phenol red',
    'carbohydrate fermentation',
    'andreade',
    "andrade's",
    'peptone medium'
  ],
  'litmus-milk-medium': [
    'litmus milk',
    'milk clot',
    'stormy fermentation',
    'peptonization',
    'acid clot',
    'alkaline milk',
    'reduction litmus'
  ],
  'lysine-iron-agar': [
    'lia',
    'black butt',
    'purple slant',
    'yellow butt',
    'lysine decarboxylase',
    'lysine deaminase',
    'h2s'
  ],
  'tsi-test': [
    'tsi',
    'triple sugar iron',
    'red slant yellow butt',
    'alkaline over acid',
    'h2s',
    'gas cracks',
    'black butt'
  ],
  'citrate-utilization': [
    'simmons citrate',
    'blue citrate',
    'green citrate',
    'citrate slant'
  ],
  'dnase-test': [
    'dnase',
    'dna hydrolysis',
    'clearing around growth',
    'methyl green',
    'toluidine blue'
  ]
};

export const getSearchAliases = (slugOrId: string, title?: string) => [
  ...(searchAliasesBySlug[slugOrId] ?? []),
  ...(title ? searchAliasesBySlug[title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')] ?? [] : [])
];
