export interface RoadmapStep {
  id: string;
  question: string;
  options: {
    text: string;
    nextStep: string | null;
    conclusion?: string;
    tests?: string[];
  }[];
}

export const obligateAnaerobeRoadmap: RoadmapStep[] = [
  {
    id: "start",
    question: "Confirmed anaerobic growth: staining and microscopic cellular morphology:",
    options: [
      {
        text: "Gram-Negative Rods or Coccobacilli",
        nextStep: "anaerobe-gnr"
      },
      {
        text: "Gram-Negative Cocci",
        nextStep: "anaerobe-gnc"
      },
      {
        text: "Gram-Positive Cocci (GPAC)",
        nextStep: "anaerobe-gpc"
      },
      {
        text: "Gram-Positive Spore-Forming Rods (Clostridium)",
        nextStep: "anaerobe-gpr-spores"
      },
      {
        text: "Gram-Positive Non–Spore-Forming Rods",
        nextStep: "anaerobe-gpr-nonspores"
      }
    ]
  },

  // 1. GRAM-NEGATIVE RODS PATHWAY
  {
    id: "anaerobe-gnr",
    question: "Gram-negative anaerobic rod branch point:",
    options: [
      {
        text: "Bile resistant on BBE | RRR disk profile",
        nextStep: "gnr-fragilis-group"
      },
      {
        text: "Brick-red UV fluorescence | Bile sensitive",
        nextStep: "gnr-prevotella-group"
      },
      {
        text: "Dark pigment | Fails LKV",
        nextStep: "gnr-porphyromonas-group"
      },
      {
        text: "Indole positive | Bile sensitive fusiform rods",
        nextStep: "gnr-fusobacterium-group"
      },
      {
        text: "Agar pitting | Formate/fumarate required",
        nextStep: null,
        conclusion: "Bacteroides ureolyticus (Campylobacter ureolyticus)",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Agar pitting is the key colony clue",
          "Nitrate positive and urease positive",
          "Requires formate and fumarate in broth",
          "Thin delicate rods; some curved",
          "Seen in wounds, periodontal disease, and bite wounds"
        ]
      },
      {
        text: "Slow BBE growth | Black-centered colonies",
        nextStep: null,
        conclusion: "Bilophila wadsworthia",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile resistant; slow BBE growth in 3-5 days",
          "Gray colonies with black centers from H2S",
          "Strong catalase positive",
          "Nitrate positive; urease variable",
          "Thin delicate gram-negative rods",
          "Associated with appendicitis and intra-abdominal infection"
        ]
      },
      {
        text: "Very large fusiform rods | Raspberry colonies",
        nextStep: null,
        conclusion: "Leptotrichia species",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Very large rods with one pointed and one blunt end",
          "Large gray-white convoluted or raspberry-like colonies",
          "Normal oral and vaginal flora",
          "Can cause bacteremia in neutropenic patients"
        ]
      }
    ]
  },

  // 1A. Bacteroides fragilis Group
  {
    id: "gnr-fragilis-group",
    question: "Bacteroides fragilis group pattern:",
    options: [
      {
        text: "Esculin positive | Indole negative",
        nextStep: null,
        conclusion: "Bacteroides fragilis",
        tests: [
          "Vanco R, Kana R, Colistin R",
          "Bile resistant; grows on BBE",
          "Esculin positive with dark BBE zone",
          "Spot indole negative",
          "Catalase positive; arabinose negative",
          "Pleomorphic pale GNR with rounded ends",
          "Most common anaerobic clinical isolate"
        ]
      },
      {
        text: "Esculin positive | Indole positive",
        nextStep: null,
        conclusion: "Bacteroides thetaiotaomicron",
        tests: [
          "Vanco R, Kana R, Colistin R",
          "Bile resistant; grows on BBE",
          "Esculin positive with dark BBE zone",
          "Spot indole positive",
          "Catalase positive; arabinose positive",
          "Irregular pleomorphic GNR with rounded ends",
          "Common Bacteroides clinical isolate"
        ]
      },
      {
        text: "Mucoid colonies | Indole positive",
        nextStep: null,
        conclusion: "Bacteroides ovatus",
        tests: [
          "Vanco R, Kana R, Colistin R",
          "Bile resistant; grows on BBE",
          "Esculin positive",
          "Spot indole positive",
          "Catalase positive; arabinose positive",
          "Pale buff, convex, often mucoid colonies",
          "Mucoid colony helps separate it from B. thetaiotaomicron"
        ]
      },
      {
        text: "Esculin negative | Bile resistant",
        nextStep: null,
        conclusion: "Bacteroides vulgatus",
        tests: [
          "Vanco R, Kana R, Colistin R",
          "Bile resistant; grows on BBE",
          "Esculin negative; no dark BBE zone",
          "Spot indole negative",
          "Catalase positive",
          "Pleomorphic GNR with rounded ends",
          "Failure to hydrolyze esculin is the key split"
        ]
      },
      {
        text: "Friable gray colonies | Indole negative",
        nextStep: null,
        conclusion: "Bacteroides distasonis (Parabacteroides distasonis)",
        tests: [
          "Vanco R, Kana R, Colistin R",
          "Bile resistant; grows on BBE",
          "Esculin positive with dark BBE zone",
          "Spot indole negative",
          "Catalase positive; arabinose negative",
          "Gray-white, convex, friable colonies",
          "Now classified as Parabacteroides distasonis"
        ]
      }
    ]
  },

  // 1B. Prevotella Group (Pigmented & Non-Pigmented)
  {
    id: "gnr-prevotella-group",
    question: "Prevotella pattern:",
    options: [
      {
        text: "Indole positive | Lipase positive",
        nextStep: null,
        conclusion: "Prevotella intermedia",
        tests: [
          "Vanco R, Kana R, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Spot indole positive",
          "Lipase positive; catalase negative",
          "Dark pigment with brick-red UV fluorescence",
          "GNR or coccobacillus",
          "Associated with periodontal and head/neck infections"
        ]
      },
      {
        text: "Dark pigment | Indole negative",
        nextStep: null,
        conclusion: "Prevotella melaninogenica",
        tests: [
          "Vanco R, Kana R, Colistin variable",
          "Bile sensitive; no growth on BBE",
          "Spot indole negative",
          "Lipase negative; catalase negative",
          "Slow dark brown to black pigment",
          "Strong brick-red UV fluorescence",
          "Oral flora; common in mixed oral/aspiration infections"
        ]
      },
      {
        text: "Brick-red fluorescence | Protoheme requirement",
        nextStep: null,
        conclusion: "Prevotella loescheii",
        tests: [
          "Vanco R, Kana R, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Spot indole negative",
          "Lipase negative; catalase negative",
          "Black pigment with bright brick-red UV fluorescence",
          "Protoheme requirement supports the ID",
          "Carbohydrate profile helps separate it from P. melaninogenica"
        ]
      },
      {
        text: "Nonpigmented | Grows on LKV",
        nextStep: null,
        conclusion: "Nonpigmented Prevotella (Prevotella bivia / Prevotella disiens)",
        tests: [
          "Vanco R, Kana R, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Grows on selective LKV agar",
          "White, smooth, shiny, nonpigmented colonies",
          "Weak or absent fluorescence",
          "GNRs in pairs or short chains",
          "Associated with obstetric and gynecologic infections"
        ]
      }
    ]
  },

  // 1C. Porphyromonas Group
  {
    id: "gnr-porphyromonas-group",
    question: "Porphyromonas pattern:",
    options: [
      {
        text: "No UV fluorescence | Indole positive",
        nextStep: null,
        conclusion: "Porphyromonas gingivalis",
        tests: [
          "Vanco S, Kana R, Colistin R",
          "Fails LKV because it is vancomycin susceptible",
          "Spot indole positive",
          "Catalase negative; ONPG negative",
          "Dark brown to black colonies",
          "No UV fluorescence",
          "Keystone pathogen in chronic periodontitis"
        ]
      },
      {
        text: "Brick-red fluorescence | Indole positive",
        nextStep: null,
        conclusion: "Porphyromonas asaccharolytica",
        tests: [
          "Vanco S, Kana R, Colistin R",
          "Fails growth on LKV agar",
          "Spot indole positive",
          "Catalase negative; ONPG negative",
          "Dark brown to black pigment",
          "Brilliant brick-red UV fluorescence",
          "Asaccharolytic; does not ferment carbohydrates"
        ]
      }
    ]
  },

  // 1D. Fusobacterium Group
  {
    id: "gnr-fusobacterium-group",
    question: "Fusobacterium pattern:",
    options: [
      {
        text: "Pointed fusiform rods | Lipase negative",
        nextStep: null,
        conclusion: "Fusobacterium nucleatum",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Spot indole positive",
          "Catalase negative; lipase negative",
          "Long thin fusiform rods with pointed ends",
          "Bread-crumb, speckled, or smooth gray colonies",
          "Dental plaque organism; seen in aspiration and abscess infections"
        ]
      },
      {
        text: "Pleomorphic rods | Lipase positive",
        nextStep: null,
        conclusion: "Fusobacterium necrophorum",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Spot indole positive",
          "Catalase negative; lipase positive",
          "Pleomorphic rods with rounded or tapered ends",
          "Can show beta-hemolysis and chartreuse UV fluorescence",
          "Classic association: Lemierre syndrome"
        ]
      },
      {
        text: "Bile resistant | Swollen pleomorphic rods",
        nextStep: null,
        conclusion: "Fusobacterium mortiferum / Fusobacterium varium",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile resistant; grows on BBE",
          "Spot Indole: Positive (+) in F. mortiferum; Variable (±) in F. varium",
          "Pleomorphic rods with swollen areas and round bodies",
          "F. varium may show fried-egg colony appearance",
          "Bile tolerance separates these from most fusobacteria"
        ]
      }
    ]
  },

  // 1E. Special GNRs: B. ureolyticus, Bilophila, Leptotrichia
  {
    id: "gnr-ureolyticus-path",
    question: "Bacteroides ureolyticus support pattern:",
    options: [
      {
        text: "Agar pitting | Formate/fumarate required",
        nextStep: null,
        conclusion: "Bacteroides ureolyticus (Campylobacter ureolyticus)",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Agar pitting is the key colony clue",
          "Nitrate positive and urease positive",
          "Requires formate and fumarate in broth",
          "Thin delicate rods; some curved",
          "Seen in wounds, periodontal disease, and bite wounds"
        ]
      }
    ]
  },
  {
    id: "gnr-bilophila-path",
    question: "Bilophila support pattern:",
    options: [
      {
        text: "Slow BBE growth | Black-centered colonies",
        nextStep: null,
        conclusion: "Bilophila wadsworthia",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile resistant; slow BBE growth in 3-5 days",
          "Gray colonies with black centers from H2S",
          "Strong catalase positive",
          "Nitrate positive; urease variable",
          "Thin delicate gram-negative rods",
          "Associated with appendicitis and intra-abdominal infection"
        ]
      }
    ]
  },
  {
    id: "gnr-leptotrichia-path",
    question: "Leptotrichia support pattern:",
    options: [
      {
        text: "Very large fusiform rods | Raspberry colonies",
        nextStep: null,
        conclusion: "Leptotrichia species",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Very large rods with one pointed and one blunt end",
          "Large gray-white convoluted or raspberry-like colonies",
          "Normal oral and vaginal flora",
          "Can cause bacteremia in neutropenic patients"
        ]
      }
    ]
  },

  // 2. GRAM-NEGATIVE COCCI PATHWAY
  {
    id: "anaerobe-gnc",
    question: "Gram-negative anaerobic cocci pattern:",
    options: [
      {
        text: "Tiny diplococci | Nitrate positive",
        nextStep: null,
        conclusion: "Veillonella species",
        tests: [
          "Vanco R, Kana S, Colistin S",
          "Bile sensitive; no growth on BBE",
          "Nitrate positive",
          "Urease negative; indole negative",
          "Tiny gram-negative diplococci in pairs, chains, or clusters",
          "Small transparent gray-white colonies",
          "Oral, respiratory, and gut flora; seen in mixed infections"
        ]
      }
    ]
  },

  // 3. GRAM-POSITIVE COCCI PATHWAY (GPAC)
  {
    id: "anaerobe-gpc",
    question: "Gram-positive anaerobic cocci pattern:",
    options: [
      {
        text: "SPS sensitive | Large chains",
        nextStep: null,
        conclusion: "Peptostreptococcus anaerobius",
        tests: [
          "Vanco S, Colistin R, Kana variable",
          "SPS sensitive; zone >= 12 mm",
          "Spot indole negative",
          "Catalase negative; urease negative",
          "Large gram-positive coccobacilli in chains",
          "Gray-white colonies with sweet fetid odor",
          "Seen in mixed intra-abdominal, pelvic, and soft tissue infections"
        ]
      },
      {
        text: "Large GPAC | Staph-like clusters",
        nextStep: null,
        conclusion: "Finegoldia magna (Peptostreptococcus magnus)",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "SPS resistant",
          "Spot indole negative",
          "Catalase negative or weak",
          "Large GP cocci in pairs, tetrads, and clusters",
          "Tiny gray translucent nonhemolytic colonies",
          "Common pathogenic GPAC in abscesses, joints, and bacteremia"
        ]
      },
      {
        text: "Tiny GPAC | Packets and chains",
        nextStep: null,
        conclusion: "Parvimonas micra (Peptostreptococcus micros)",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "SPS resistant or narrow zone",
          "Spot indole negative",
          "Catalase negative",
          "Tiny GP cocci in packets and short chains",
          "Tiny white opaque colonies",
          "Oral pathogen; common in dental and pulmonary abscesses"
        ]
      },
      {
        text: "Black colonies | SPS resistant",
        nextStep: null,
        conclusion: "Peptococcus niger",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "SPS resistant",
          "Spot indole negative",
          "Catalase negative",
          "GP cocci in pairs, tetrads, or clusters",
          "Tiny black shiny colonies turn gray in air",
          "Rare isolate from skin/gut flora"
        ]
      }
    ]
  },

  // 4. GRAM-POSITIVE SPORE-FORMING RODS (CLOSTRIDIUM)
  {
    id: "anaerobe-gpr-spores",
    question: "Clostridium species pattern:",
    options: [
      {
        text: "Lecithinase positive | Double-zone hemolysis",
        nextStep: null,
        conclusion: "Clostridium perfringens",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Nagler lecithinase positive",
          "Double-zone beta-hemolysis",
          "Large boxcar rods with blunt ends",
          "Spores seldom seen in clinical smears",
          "Reverse CAMP, gelatinase, and nitrate positive",
          "Causes gas gangrene and food poisoning"
        ]
      },
      {
        text: "Ground-glass colonies | Horse-stable odor",
        nextStep: null,
        conclusion: "Clostridium difficile (Clostridioides difficile)",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Lecithinase negative; lipase negative",
          "CCFA: yellow ground-glass colonies",
          "Horse-stable or barnyard odor",
          "Bright yellow-green/chartreuse UV fluorescence",
          "Straight GPRs with oval subterminal spores",
          "Toxins A and B cause C. difficile colitis"
        ]
      },
      {
        text: "Terminal spores | Drumstick rods",
        nextStep: null,
        conclusion: "Clostridium tetani",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Lecithinase negative; lipase negative",
          "Spherical terminal spores swell the cell",
          "Drumstick or tennis-racket appearance",
          "Flat swarming colonies with rhizoid margins",
          "Narrow beta-hemolysis",
          "Tetanospasmin causes spastic paralysis"
        ]
      },
      {
        text: "Lipase positive | Oval subterminal spores",
        nextStep: null,
        conclusion: "Clostridium botulinum",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Lecithinase negative; lipase positive",
          "Iridescent pearly layer on egg yolk agar",
          "Straight GPRs with oval subterminal spores",
          "Botulinum toxin blocks acetylcholine release",
          "Causes flaccid paralysis",
          "BSL-3/select-agent handling may apply"
        ]
      },
      {
        text: "Rapid swarming | Medusa-head margins",
        nextStep: null,
        conclusion: "Clostridium septicum",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Lecithinase negative; lipase negative",
          "Rapid swarming in under 24 hours",
          "Irregular Medusa-head colony margins",
          "Beta-hemolytic",
          "Oval subterminal spores swell the cell",
          "Associated with neutropenic enterocolitis and occult colon cancer"
        ]
      },
      {
        text: "Urease positive | Indole positive",
        nextStep: null,
        conclusion: "Clostridium sordellii",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Lecithinase positive; lipase negative",
          "Urease positive",
          "Spot indole positive",
          "Large gray-white colonies with serpentine margins",
          "GPRs with subterminal spores",
          "Can cause severe uterine gas gangrene/toxic shock"
        ]
      }
    ]
  },

  // 5. GRAM-POSITIVE NON-SPORE-FORMING RODS
  {
    id: "anaerobe-gpr-nonspores",
    question: "Non-spore-forming gram-positive anaerobic rod pattern:",
    options: [
      {
        text: "Branching rods | Sulfur granules",
        nextStep: "nonspore-actinomyces"
      },
      {
        text: "Diphtheroid palisades | Catalase positive",
        nextStep: "nonspore-propionibacterium"
      },
      {
        text: "Forked ends | Dog-bone rods",
        nextStep: null,
        conclusion: "Bifidobacterium species",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Catalase negative; indole negative",
          "Pleomorphic GPRs with forked or Y-shaped ends",
          "Dog-bone morphology is the key clue",
          "Small white convex shiny colonies",
          "Gut flora; occasionally seen in mixed GU/pelvic infections"
        ]
      },
      {
        text: "Nitrate positive | Small straight rods",
        nextStep: null,
        conclusion: "Eggerthella lenta (Eubacterium lentum)",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Nitrate positive is the key test",
          "Arginine stimulates growth",
          "Catalase negative; indole negative",
          "Small straight GPRs with rounded ends",
          "Small gray translucent colonies",
          "Seen in intra-abdominal infection and bacteremia"
        ]
      },
      {
        text: "Curved tapered rods | BV clue",
        nextStep: null,
        conclusion: "Mobiluncus species",
        tests: [
          "Gram-variable curved motile rods",
          "Thin rods with tapered ends",
          "Extremely fastidious; poor routine growth",
          "Usually recognized on vaginal Gram stain",
          "Part of bacterial vaginosis flora pattern"
        ]
      },
      {
        text: "Straight GPRs | Lactic acid production",
        nextStep: null,
        conclusion: "Lactobacillus species (Anaerobic)",
        tests: [
          "Usually Vanco S, Colistin R, Kana S",
          "Some strains are intrinsically vancomycin resistant",
          "Catalase negative",
          "Strictly fermentative; produces lactic acid",
          "Uniform straight GPRs in chains",
          "Normal vaginal flora; can cause opportunistic infection"
        ]
      }
    ]
  },

  // 5A. Actinomyces Sub-branch
  {
    id: "nonspore-actinomyces",
    question: "Actinomyces pattern:",
    options: [
      {
        text: "Molar-tooth colonies",
        nextStep: null,
        conclusion: "Actinomyces israelii",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Branching beaded filamentous GPRs",
          "Sulfur granules may be present in pus",
          "White rough molar-tooth colonies after 7-14 days",
          "Catalase negative; urease negative",
          "Classic cause of cervicofacial actinomycosis"
        ]
      },
      {
        text: "Red colonies after air exposure",
        nextStep: null,
        conclusion: "Actinomyces odontolyticus",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Branching beaded thin GPRs",
          "Small gray-white colonies turn red/pink in air",
          "Weak beta-hemolysis may be present",
          "Catalase negative; urease negative",
          "Associated with dental and periodontal infection"
        ]
      },
      {
        text: "Smooth colonies | Catalase or urease positive",
        nextStep: null,
        conclusion: "Actinomyces viscosus / Actinomyces naeslundii",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Beaded branching filamentous rods",
          "Smooth gray-white translucent colonies",
          "No molar-tooth or red colony pattern",
          "A. viscosus: catalase positive",
          "A. naeslundii: urease positive",
          "Associated with dental and pelvic actinomycosis"
        ]
      }
    ]
  },

  // 5B. Propionibacterium Sub-branch
  {
    id: "nonspore-propionibacterium",
    question: "Cutibacterium/Propionibacterium pattern:",
    options: [
      {
        text: "Indole positive | Nitrate positive",
        nextStep: null,
        conclusion: "Propionibacterium acnes (Cutibacterium acnes)",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Catalase positive",
          "Spot indole positive",
          "Nitrate positive",
          "Diphtheroid rods in palisades or Chinese letters",
          "Small white-gray colonies become tan with age",
          "Skin flora; common blood culture contaminant"
        ]
      },
      {
        text: "Beta-hemolytic | Indole negative",
        nextStep: null,
        conclusion: "Propionibacterium avidum",
        tests: [
          "Vanco S, Colistin R, Kana S",
          "Catalase positive",
          "Spot indole negative",
          "Nitrate negative",
          "Beta-hemolytic white convex colonies",
          "Beta-hemolysis helps separate it from C. acnes"
        ]
      }
    ]
  }
];
