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
    question: "Special-Potency Antibiotic Disks & 20% Bile (BBE Agar) Parameters:",
    options: [
      {
        text: "Vancomycin (R) | Kanamycin (R) | Colistin (R) | Bile Resistant (+; grows on BBE)",
        nextStep: "gnr-fragilis-group"
      },
      {
        text: "Vancomycin (R) | Kanamycin (R) | Colistin (V/S) | Bile Sensitive (-; fails BBE) | Brick Red Fluorescence (+)",
        nextStep: "gnr-prevotella-group"
      },
      {
        text: "Vancomycin (S) | Kanamycin (R) | Colistin (R) | Fails LKV | Dark Pigment | Indole Positive (+)",
        nextStep: "gnr-porphyromonas-group"
      },
      {
        text: "Vancomycin (R) | Kanamycin (S) | Colistin (S) | Bile Sensitive (-) | Indole Positive (+)",
        nextStep: "gnr-fusobacterium-group"
      },
      {
        text: "Vancomycin (R) | Kanamycin (S) | Colistin (S) | Bile Sensitive (-) | Agar Pitting (+) | Formate/Fumarate Required",
        nextStep: "gnr-ureolyticus-path"
      },
      {
        text: "Vancomycin (R) | Kanamycin (S) | Colistin (S) | Bile Resistant (+; grows on BBE slowly with Black Centers)",
        nextStep: "gnr-bilophila-path"
      },
      {
        text: "Vancomycin (R) | Kanamycin (S) | Colistin (S) | Very Large Fusiform GNR | Convoluted Raspberry Colonies",
        nextStep: "gnr-leptotrichia-path"
      }
    ]
  },

  // 1A. Bacteroides fragilis Group
  {
    id: "gnr-fragilis-group",
    question: "Presumptive Identification for Bacteroides fragilis Group (Bile resistant, RRR disk profile):",
    options: [
      {
        text: "Esculin Hydrolysis Positive (+) | Spot Indole Negative (-) | Arabinose Negative (-)",
        nextStep: null,
        conclusion: "Bacteroides fragilis",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Resistant (R)",
          "Bile Resistant (+): grows on BBE agar producing circular, raised, dark gray colonies (>1mm) surrounded by a dark gray zone (esculin hydrolysis)",
          "Spot Indole Negative (-), Catalase Positive (+), Arabinose Negative (-)",
          "Gram stain: pleomorphic pale-staining GNR with rounded ends, resembling a safety pin",
          "Most common anaerobic clinical isolate; highly resistant to clindamycin and cephalosporins; carries capsular polysaccharide virulence factor mediating intra-abdominal abscesses"
        ]
      },
      {
        text: "Esculin Hydrolysis Positive (+) | Spot Indole Positive (+) | Arabinose Positive (+)",
        nextStep: null,
        conclusion: "Bacteroides thetaiotaomicron",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Resistant (R)",
          "Bile Resistant (+): grows on BBE agar producing dark gray colonies surrounded by a dark zone of esculin hydrolysis",
          "Spot Indole Positive (+), Catalase Positive (+), Arabinose Positive (+)",
          "Gram stain: irregularly staining pleomorphic GNR with rounded ends",
          "Second most commonly isolated Bacteroides species; exhibits high clinical virulence and increasing multidrug resistance (including carbapenemase production in select isolates)"
        ]
      },
      {
        text: "Esculin Hydrolysis Positive (+) | Spot Indole Positive (+) | Arabinose Positive (+) | Pale Buff Mucoid Colonies",
        nextStep: null,
        conclusion: "Bacteroides ovatus",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Resistant (R)",
          "Bile Resistant (+): grows on BBE producing dark gray esculin-hydrolyzed colonies",
          "Spot Indole Positive (+), Catalase Positive (+), Arabinose Positive (+)",
          "Colonial morphology: pale buff, circular, convex, semiopaque, often mucoid on anaerobic BAP",
          "Differentiated from B. thetaiotaomicron primarily by its distinctly mucoid colony morphology and carbohydrate utilization profile"
        ]
      },
      {
        text: "Esculin Hydrolysis Negative (-) | Spot Indole Negative (-) | Bile Resistant (+)",
        nextStep: null,
        conclusion: "Bacteroides vulgatus",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Resistant (R)",
          "Bile Resistant (+): grows on BBE agar, but produces glistening convex light-to-dark gray colonies WITHOUT a dark gray surrounding zone (esculin not hydrolyzed)",
          "Spot Indole Negative (-), Catalase Positive (+)",
          "Gram stain: pleomorphic GNR with rounded ends, swellings or vacuoles may be visible",
          "Generally lower clinical virulence than B. fragilis and B. thetaiotaomicron; key marker is the failure to hydrolyze esculin on BBE"
        ]
      },
      {
        text: "Esculin Hydrolysis Positive (+) | Spot Indole Negative (-) | Arabinose Negative (-) | Friable Gray Colonies",
        nextStep: null,
        conclusion: "Bacteroides distasonis (Parabacteroides distasonis)",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Resistant (R)",
          "Bile Resistant (+): grows on BBE agar surrounded by a dark esculin hydrolysis zone",
          "Spot Indole Negative (-), Catalase Positive (+), Arabinose Negative (-)",
          "Colonial morphology: gray-white, circular, convex, semiopaque, friable colonies",
          "Taxonomically reclassified into the genus Parabacteroides; isolated from gastrointestinal and peritoneal infections"
        ]
      }
    ]
  },

  // 1B. Prevotella Group (Pigmented & Non-Pigmented)
  {
    id: "gnr-prevotella-group",
    question: "Identify Prevotella species (Kanamycin R, Vancomycin R, Colistin V/S, Bile sensitive, Brick Red UV fluorescence):",
    options: [
      {
        text: "Spot Indole Positive (+) | Lipase Positive (+) | Catalase Negative (-)",
        nextStep: null,
        conclusion: "Prevotella intermedia",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth in 20% bile or on BBE agar",
          "Spot Indole Positive (+), Lipase Positive (+), Catalase Negative (-)",
          "Colonial appearance: produces dark brown to black pigment on laked blood agar, showing bright brick red fluorescence under long-wave UV light (365 nm)",
          "Gram stain: GNR or coccobacillus",
          "Important periodontal pathogen, strongly associated with pregnancy gingivitis, necrotizing ulcerative gingivitis (NUG), and head/neck/pulmonary abscesses"
        ]
      },
      {
        text: "Spot Indole Negative (-) | Lipase Negative (-) | Catalase Negative (-) | Dark Brown/Black Pigment",
        nextStep: null,
        conclusion: "Prevotella melaninogenica",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Variable (S/R)",
          "Bile Sensitive (-): no growth on BBE",
          "Spot Indole Negative (-), Lipase Negative (-), Catalase Negative (-)",
          "Colonial appearance: produces dark brown to black pigment slowly (often requiring 5-7 days incubation), exhibits strong brick red fluorescence under long-wave UV light",
          "Gram stain: small pale-staining coccobacilli",
          "Part of normal oral flora; isolated from mixed dental, bite-wound, head and neck, and aspiration pneumonia infections"
        ]
      },
      {
        text: "Spot Indole Negative (-) | Lipase Negative (-) | Catalase Negative (-) | Brick Red Fluorescence | Protoheme requirement",
        nextStep: null,
        conclusion: "Prevotella loescheii",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth on BBE",
          "Spot Indole Negative (-), Lipase Negative (-), Catalase Negative (-)",
          "Colonial appearance: black pigment on laked blood agar with bright brick red UV fluorescence",
          "Differentiated from P. melaninogenica by biochemical carbohydrate fermentation profile (ferments sucrose and raffinose)"
        ]
      },
      {
        text: "Nonpigmented Colonies | Spot Indole Negative (-) | Grows on LKV | Associated with Pelvic Infections",
        nextStep: null,
        conclusion: "Nonpigmented Prevotella (Prevotella bivia / Prevotella disiens)",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Resistant (R), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth on BBE, but grows on selective LKV agar",
          "Colonial appearance: white, circular, convex, smooth, shiny, nonpigmented colonies; does NOT produce black pigment but may fluoresce weakly or not at all",
          "Gram stain: gram-negative rods in pairs or short chains",
          "Prevotella bivia and P. disiens are major opportunistic pathogens in obstetric and gynecologic infections (endometritis, pelvic inflammatory disease, and vaginal cuff abscesses)"
        ]
      }
    ]
  },

  // 1C. Porphyromonas Group
  {
    id: "gnr-porphyromonas-group",
    question: "Identify Porphyromonas species (Vancomycin Sensitive, Kanamycin Resistant, Colistin Resistant, Fails LKV):",
    options: [
      {
        text: "ONPG Negative (-) | Does NOT fluoresce under UV | Indole Positive (+)",
        nextStep: null,
        conclusion: "Porphyromonas gingivalis",
        tests: [
          "Vancomycin Sensitive (S), Kanamycin Resistant (R), Colistin Resistant (R)",
          "Fails to grow on LKV agar due to vancomycin susceptibility (distinguishes it from Prevotella)",
          "Spot Indole Positive (+), Catalase Negative (-), ONPG Negative (-)",
          "Colonial appearance: dark brown to black colonies, but does NOT fluoresce under UV light",
          "Gram stain: small pale-staining coccobacilli",
          "Key keystone pathogen in chronic periodontitis; possesses gingipain proteases that degrade host tissues and immune factors; isolated in oral abscesses"
        ]
      },
      {
        text: "ONPG Negative (-) | Brick Red Fluorescence Positive (+) | Indole Positive (+)",
        nextStep: null,
        conclusion: "Porphyromonas asaccharolytica",
        tests: [
          "Vancomycin Sensitive (S), Kanamycin Resistant (R), Colistin Resistant (R)",
          "Fails to grow on LKV agar",
          "Spot Indole Positive (+), Catalase Negative (-), ONPG Negative (-)",
          "Colonial appearance: dark brown to black pigment, exhibits brilliant brick red fluorescence under UV light",
          "Highly asaccharolytic (fails to ferment carbohydrates)",
          "Isolated from mixed cutaneous, groin, breast, and pelvic infections"
        ]
      }
    ]
  },

  // 1D. Fusobacterium Group
  {
    id: "gnr-fusobacterium-group",
    question: "Presumptive Identification of Fusobacterium species (Vancomycin R, Kanamycin S, Colistin S, Bile sensitive, Indole positive):",
    options: [
      {
        text: "Long, Slender GNR with Sharply Pointed Ends | Bread-Crumb, Speckled or Smooth Colonies | Lipase (-)",
        nextStep: null,
        conclusion: "Fusobacterium nucleatum",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Sensitive (S), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth on BBE",
          "Spot Indole Positive (+), Catalase Negative (-), Lipase Negative (-)",
          "Gram stain: highly distinctive long, thin, spindle-shaped GNR with sharply pointed or tapered ends (fusiform rods)",
          "Colonial morphology: three colony types (bread-crumb like white colonies, speckled, or smooth gray colonies); produces greening of agar on exposure to air; fluoresces chartreuse under UV light",
          "Key component of dental plaque biofilm; isolated from aspiration pneumonia, lung abscesses, brain abscesses, and chronic sinusitis"
        ]
      },
      {
        text: "Pleomorphic Rods with Rounded/Tapered Ends | Serpentine Swarming or Flat Colonies | Lipase (+)",
        nextStep: null,
        conclusion: "Fusobacterium necrophorum",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Sensitive (S), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth on BBE",
          "Spot Indole Positive (+), Catalase Negative (-), Lipase Positive (+)",
          "Gram stain: pleomorphic rods with rounded to tapered ends, filaments, and round bodies; becomes highly pleomorphic in older cultures",
          "Colonial morphology: circular, umbonate, ridged surface; some strains are beta-hemolytic; exhibits strong chartreuse fluorescence under UV light; greens agar",
          "Highly virulent pathogen; produces potent endotoxin, hemolysins, and leukocidin; causative agent of Lemierre's syndrome (septic jugular vein thrombophlebitis following pharyngitis) and acute necrotizing infections"
        ]
      },
      {
        text: "Highly Pleomorphic GNR with Swollen Spherical Areas | Bile Resistant (+; grows on BBE)",
        nextStep: null,
        conclusion: "Fusobacterium mortiferum / Fusobacterium varium",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Sensitive (S), Colistin Sensitive (S)",
          "Bile Resistant (+): grows on BBE producing flat, irregular colonies (>1mm) without esculin zones",
          "Spot Indole: Positive (+) in F. mortiferum; Variable (±) in F. varium",
          "Gram stain: highly pleomorphic GNR with swollen areas, filaments, and large bizarre round bodies (L-form-like)",
          "Colonial morphology: F. varium exhibits a gray-white center with a colorless edge resembling a 'fried egg'",
          "Differentiated from other fusobacteria by their high tolerance for 20% bile and growth on BBE agar"
        ]
      }
    ]
  },

  // 1E. Special GNRs: B. ureolyticus, Bilophila, Leptotrichia
  {
    id: "gnr-ureolyticus-path",
    question: "Verify thin delicate GNR with agar pitting, formate/fumarate dependency, and nitrate/urease positivity:",
    options: [
      {
        text: "Agar Pitting | Formate/Fumarate dependency | Nitrate Reduction (+) | Urease (+)",
        nextStep: null,
        conclusion: "Bacteroides ureolyticus (Campylobacter ureolyticus)",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Sensitive (S), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth on BBE",
          "Nitrate Reduction Positive (+), Urease Positive (+), Formate and Fumarate required for growth in broth culture",
          "Gram stain: pale-staining, thin, delicate rods with rounded ends; some curved",
          "Colonial morphology: small, translucent or transparent colonies that corrode or pit the agar (visible as depressions around the colony)",
          "Taxonomically related to Campylobacter; opportunistic pathogen in wound infections, periodontal disease, and human bite wounds"
        ]
      }
    ]
  },
  {
    id: "gnr-bilophila-path",
    question: "Verify delicate GNR with slow growth on BBE, H2S production (black centers), and strong catalase positivity:",
    options: [
      {
        text: "Slow Growth on BBE (3-5 days) | Gray Colonies with Black Centers | Strongly Catalase Positive (+)",
        nextStep: null,
        conclusion: "Bilophila wadsworthia",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Sensitive (S), Colistin Sensitive (S)",
          "Bile Resistant (+): grows slowly on BBE agar (requiring 3 to 5 days)",
          "Colonial morphology on BBE: circular gray colonies with a highly distinctive black center due to H2S production (black center may fade on air exposure)",
          "Catalase Positive (+; extremely strong reaction), Nitrate Reduction Positive (+), Urease Variable",
          "Gram stain: pale-staining, delicate, thin GNRs",
          "Thermophilic/bile-loving organism; isolated from gangrenous appendicitis, peritonitis, intra-abdominal abscesses, and clinical bacteremia"
        ]
      }
    ]
  },
  {
    id: "gnr-leptotrichia-path",
    question: "Verify very large GNR with one pointed and one blunt end, and raspberry-like colonies:",
    options: [
      {
        text: "One Pointed / One Blunt End GNR | Large Convoluted Raspberry-like Colonies",
        nextStep: null,
        conclusion: "Leptotrichia species",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Sensitive (S), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth on BBE",
          "Gram stain: very large, straight or slightly curved GNRs, characteristically exhibiting one pointed end and one blunt end",
          "Colonial morphology: large gray-white colonies with highly convoluted, rugose, or raspberry-like margins",
          "Normal oral and vaginal flora; opportunistic pathogen in neutropenic patients, associated with oral mucositis and clinical bacteremia"
        ]
      }
    ]
  },

  // 2. GRAM-NEGATIVE COCCI PATHWAY
  {
    id: "anaerobe-gnc",
    question: "Presumptive Identification for Gram-Negative Anaerobic Cocci:",
    options: [
      {
        text: "Tiny Diplococci | Vancomycin (R) | Kanamycin (S) | Colistin (S) | Nitrate Reduction (+)",
        nextStep: null,
        conclusion: "Veillonella species",
        tests: [
          "Vancomycin Resistant (R), Kanamycin Sensitive (S), Colistin Sensitive (S)",
          "Bile Sensitive (-): no growth in bile or on BBE",
          "Nitrate Reduction Positive (+), Urease Negative (-), Indole Negative (-), Catalase Variable (+/-)",
          "Gram stain: tiny gram-negative diplococci arranged in clusters, pairs, or short chains",
          "Colonial appearance: small, almost transparent, grayish-white, smooth, entire colonies; exhibits weak red fluorescence under UV light (360 nm)",
          "Abundant normal flora of the human oral cavity, upper respiratory tract, and gut; isolated as an opportunistic pathogen in mixed polymicrobic infections (bite wounds, dental abscesses, head/neck infections)"
        ]
      }
    ]
  },

  // 3. GRAM-POSITIVE COCCI PATHWAY (GPAC)
  {
    id: "anaerobe-gpc",
    question: "Presumptive Screen for Gram-Positive Anaerobic Cocci (GPAC) using Sodium Polyanethol Sulfonate (SPS) Disk:",
    options: [
      {
        text: "SPS Sensitive (S; Zone >= 12mm) | Large Coccobacillus in Chains | Sweet Fetid Odor",
        nextStep: null,
        conclusion: "Peptostreptococcus anaerobius",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Variable (S/R)",
          "SPS Disk Sensitive (S; zone of inhibition >= 12 mm; key presumptive test)",
          "Spot Indole Negative (-), Catalase Negative (-), Urease Negative (-)",
          "Gram stain: large gram-positive coccobacillus arranged in chains",
          "Colonial morphology: medium, gray-white, opaque, smooth colonies; produces a characteristic sweet, putrid, or fetid odor",
          "Isolated from mixed polymicrobic intra-abdominal, pelvic, skin/soft tissue infections, and osteomyelitis"
        ]
      },
      {
        text: "SPS Resistant (R) | Cell Size > 0.6 µm in Pairs/Clusters | Resembles Staphylococci",
        nextStep: null,
        conclusion: "Finegoldia magna (Peptostreptococcus magnus)",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "SPS Disk Resistant (R; no zone of inhibition)",
          "Spot Indole Negative (-), Catalase Negative or Weak (+/-)",
          "Gram stain: large gram-positive cocci (cell size > 0.6 µm) arranged in pairs, tetrads, and clusters resembling staphylococci",
          "Colonial morphology: tiny, gray, translucent, nonhemolytic colonies",
          "Most common and pathogenic GPAC isolated from clinical specimens; possesses albumin-binding protein L; isolated in native/prosthetic joint infections, skin abscesses, and bacteremia"
        ]
      },
      {
        text: "SPS Resistant (R) | Cell Size < 0.6 µm in Packets/Chains | Tiny White Colonies",
        nextStep: null,
        conclusion: "Parvimonas micra (Peptostreptococcus micros)",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "SPS Disk Resistant (R), or occasionally shows a narrow zone of inhibition (<12 mm)",
          "Spot Indole Negative (-), Catalase Negative (-)",
          "Gram stain: tiny gram-positive cocci (cell size < 0.6 µm) arranged in packets and short chains",
          "Colonial morphology: tiny, white, opaque, nonhemolytic colonies; may produce a narrow zone of greening or milky halo on sheep blood agar",
          "Common oral pathogen; heavily isolated in dental abscesses, periodontal pocket infections, bite wounds, and pulmonary abscesses"
        ]
      },
      {
        text: "SPS Resistant (R) | Tiny Black to Olive-Green Colonies (Turns Gray in Air)",
        nextStep: null,
        conclusion: "Peptococcus niger",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "SPS Disk Resistant (R)",
          "Spot Indole Negative (-), Catalase Negative (-)",
          "Gram stain: gram-positive spherical cells in pairs, tetrads, or clusters",
          "Colonial morphology: highly distinctive tiny, black, convex, shiny, smooth, circular colonies with an entire margin; pigment turns light gray upon exposure to atmospheric air",
          "Extremely rare clinical isolate; normal flora of skin and gut; isolated occasionally in mixed cutaneous and intra-abdominal abscesses"
        ]
      }
    ]
  },

  // 4. GRAM-POSITIVE SPORE-FORMING RODS (CLOSTRIDIUM)
  {
    id: "anaerobe-gpr-spores",
    question: "Nagler Lecithinase, Hemolysis & Selective Media Screen for Clostridium species:",
    options: [
      {
        text: "Lecithinase Positive (+) | Double-Zone of Beta-Hemolysis | Boxcar-shaped GPR without Spores",
        nextStep: null,
        conclusion: "Clostridium perfringens",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Nagler Test Lecithinase Positive (+): breaks down egg yolk lecithin, producing an opaque halo around colonies on egg yolk agar (inhibited on the side treated with C. perfringens antitoxin)",
          "Double-Zone of Beta-Hemolysis on sheep blood agar (inner narrow zone of complete hemolysis due to theta-toxin; outer wide zone of partial hemolysis due to alpha-toxin)",
          "Gram stain: large, boxcar-shaped, gram-variable or gram-positive rods with blunt ends; spores are SELDOM observed in clinical or culture smears",
          "Reverse CAMP Test Positive (+); Gelatinase Positive (+), Nitrate Reduction Positive (+)",
          "Causative agent of gas gangrene (myonecrosis), food poisoning (enterotoxigenic strains), and enteritis necroticans (NEC)"
        ]
      },
      {
        text: "Lecithinase Negative (-) | CCFA selective agar: Yellow Ground-Glass Colonies | Horse Stable Odor",
        nextStep: null,
        conclusion: "Clostridium difficile (Clostridioides difficile)",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Egg yolk agar: Lecithinase Negative (-), Lipase Negative (-)",
          "Selective CCFA Agar: grows yellow, circular, matte-to-glossy colonies with a highly characteristic 'ground glass' appearance",
          "Clinical indicators: colonies produce a highly distinct 'horse stable' or 'barnyard' odor; fluoresces bright yellow-green or chartreuse under UV light (365 nm)",
          "Gram stain: gram-positive straight rods; oval subterminal spores can be observed",
          "Causative agent of pseudomembranous colitis and antibiotic-associated diarrhea; pathogenic strains produce Toxin A (enterotoxin) and Toxin B (cytotoxin) which glycosylate GTP signaling proteins"
        ]
      },
      {
        text: "Lecithinase Negative (-) | Spherical Terminal Spores ('Drumstick' appearance) | Swarming Flat Colonies",
        nextStep: null,
        conclusion: "Clostridium tetani",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Egg yolk agar: Lecithinase Negative (-), Lipase Negative (-)",
          "Gram stain: gram-positive rods in young cultures, turning gram-negative after 24 hours; spores are characteristically round/spherical, terminal, and swell the cell, giving a 'drumstick' or 'tennis racket' appearance",
          "Colonial morphology: gray, matte, flat colonies with highly irregular rhizoid margins resembling 'Medusa head'; swarms rapidly over the entire agar surface within 24 hours; narrow zone of beta-hemolysis",
          "Produces tetanospasmin (TeNT), a potent neurotoxin that blocks release of inhibitory neurotransmitters (glycine/GABA), causing spastic paralysis (lockjaw, tetanus)"
        ]
      },
      {
        text: "Lecithinase Negative (-) | Oval Subterminal Spores | Lipase Positive (+) | BoNT production",
        nextStep: null,
        conclusion: "Clostridium botulinum",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Egg yolk agar: Lecithinase Negative (-), Lipase Positive (+) (produces an iridescent, pearly layer or opalescence on and around the colonies)",
          "Gram stain: gram-positive straight rods with oval subterminal spores ('tennis racket' appearance)",
          "Produces botulinum neurotoxin (BoNT), the most lethal toxin known, which prevents acetylcholine release at the neuromuscular junction, leading to flaccid (rag doll) paralysis",
          "BSL-3 select agent; causes foodborne botulism (ingested preformed toxin in home-canned vegetables), infant botulism (colonization of gut via honey), and wound botulism"
        ]
      },
      {
        text: "Lecithinase Negative (-) | Extremely Rapid Swarming (<24h) | Medusa-Head Margin | Neutropenic Enterocolitis",
        nextStep: null,
        conclusion: "Clostridium septicum",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Egg yolk agar: Lecithinase Negative (-), Lipase Negative (-)",
          "Colonial morphology: gray, circular, glossy, translucent colonies with markedly irregular, rhizoid, or branching margins resembling 'Medusa head'; swarms rapidly over the entire plate surface in under 24 hours; beta-hemolytic",
          "Gram stain: straight or curved GPRs, staining unevenly; oval subterminal spores swell the cell",
          "Strongly associated with neutropenic enterocolitis (NEC), cecitis, and occult colon cancer; causes spontaneous gas gangrene (myonecrosis) in the absence of trauma via bacteremia"
        ]
      },
      {
        text: "Lecithinase Positive (+) | Urease Positive (+) | Spot Indole Positive (+) | Serpentine Margins",
        nextStep: null,
        conclusion: "Clostridium sordellii",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Egg yolk agar: Lecithinase Positive (+), Lipase Negative (-)",
          "Urease Positive (+; unique among commonly isolated clostridia), Spot Indole Positive (+)",
          "Colonial morphology: large, gray-white colonies with irregular serpentine margins; swarming can be seen",
          "Gram stain: gram-positive rods with subterminal spores",
          "Produces lethal toxin (LT) and hemorrhagic toxin (HT); causes highly fatal gas gangrene of the uterus following abortion, normal delivery, or C-section (characterized by toxic shock syndrome without fever)"
        ]
      }
    ]
  },

  // 5. GRAM-POSITIVE NON-SPORE-FORMING RODS
  {
    id: "anaerobe-gpr-nonspores",
    question: "Identify Non-Spore-Forming Gram-Positive Anaerobic Rods (Fails spore test):",
    options: [
      {
        text: "Thin, Filamentous, Branching GPR | Sulfur Granules on direct exam | 'Molar Tooth' or Red Colonies",
        nextStep: "nonspore-actinomyces"
      },
      {
        text: "Palisades/Diphtheroid arrangements ('anaerobic diphtheroids') | Catalase Positive (+) | Indole Positive (+)",
        nextStep: "nonspore-propionibacterium"
      },
      {
        text: "Forked / Branched Ends ('dog bones' or Y-shapes) | Strictly Anaerobic",
        nextStep: null,
        conclusion: "Bifidobacterium species",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Catalase Negative (-), Indole Negative (-)",
          "Gram stain: highly distinctive gram-positive pleomorphic diphtheroid-like rods, terminate in club-shaped or branched/bifurcated forked ends ('dog bones' or 'Y' shapes)",
          "Colonial morphology: small, white, convex, shiny, smooth colonies with irregular edges",
          "Usually considered nonpathogenic; part of normal human gut and breast-milk flora; occasionally recovered in mixed pelvic, abdominal, or genitourinary tract infections"
        ]
      },
      {
        text: "Small Straight Rods | Nitrate Reduction Positive (+) | Arginine Stimulated",
        nextStep: null,
        conclusion: "Eggerthella lenta (Eubacterium lentum)",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Nitrate Reduction Positive (+; key test), Arginine stimulated for growth, Catalase Negative (-), Indole Negative (-)",
          "Gram stain: small, straight, gram-positive rods with rounded ends",
          "Colonial morphology: small, gray, translucent, circular, entire, convex colonies",
          "Taxonomically reclassified from Eubacterium; isolated from intra-abdominal abscesses, gynecologic infections, and clinical bacteremia"
        ]
      },
      {
        text: "Small, Curved, Tapered Rods | Gram-Variable | Vaginal specimens (Bacterial Vaginosis)",
        nextStep: null,
        conclusion: "Mobiluncus species",
        tests: [
          "Gram-variable, curved, thin, motile rods with tapered ends",
          "Strictly anaerobic, extremely fastidious, fails to grow on routine media (requires serum or blood supplementation)",
          "Normally diagnosed on Gram stain of vaginal secretions (scored in Nugent criteria for Bacterial Vaginosis); rarely isolated in culture",
          "Involved in bacterial vaginosis in synergy with Gardnerella vaginalis and Atopobium vaginae"
        ]
      },
      {
        text: "Straight GPRs | Lactic Acid Production | Microaerophilic / Catalase Negative (-)",
        nextStep: null,
        conclusion: "Lactobacillus species (Anaerobic)",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S) - Note: some strains are intrinsically Vancomycin resistant",
          "Catalase Negative (-), strictly fermentative (lactic acid produced)",
          "Gram stain: uniform, straight, gram-positive rods with rounded ends, arranged in chains",
          "Normal vaginal flora (maintains acidic pH to prevent vaginosis); isolated in advanced dental caries, endocarditis, and bacteremia in immunocompromised hosts"
        ]
      }
    ]
  },

  // 5A. Actinomyces Sub-branch
  {
    id: "nonspore-actinomyces",
    question: "Differentiate Actinomyces species (Thin, branching, beaded GPRs, sulfur granules):",
    options: [
      {
        text: "Rough, White, Opaque 'Molar Tooth' Colonies | Cervicofacial Actinomycosis agent",
        nextStep: null,
        conclusion: "Actinomyces israelii",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Gram stain: gram-positive, branching, beaded or banded thin filamentous rods; sulfur granules in purulent exudate show dense masses of filaments",
          "Colonial morphology: highly characteristic white, opaque, dry, rough colonies that resemble a 'molar tooth' after 7-14 days of incubation",
          "Catalase Negative (-), Urease Negative (-)",
          "Causative agent of classic cervical-facial actinomycosis ('lumpy jaw') following dental trauma; also linked to pelvic actinomycosis in women using intrauterine devices (IUDs)"
        ]
      },
      {
        text: "Colonies turn bright Red / Dark Pink after exposure to air | Weakly Beta-Hemolytic",
        nextStep: null,
        conclusion: "Actinomyces odontolyticus",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Gram stain: gram-positive branching, beaded thin rods",
          "Colonial morphology: small, gray-white colonies that turn bright red or dark pink/brown after several days in ambient air; weakly beta-hemolytic on anaerobic blood agar",
          "Catalase Negative (-), Urease Negative (-)",
          "Associated with advanced dental caries, periodontal infections, thoracic abscesses, and blood culture contaminants"
        ]
      },
      {
        text: "Smooth, Gray-White Colonies | Catalase Positive (+) or Urease Positive (+)",
        nextStep: null,
        conclusion: "Actinomyces viscosus / Actinomyces naeslundii",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Gram stain: beaded, branching, thin filamentous rods",
          "Colonial morphology: small, smooth, flat, convex, gray-white translucent colonies with entire margins (does NOT form molar-tooth or red morphs)",
          "Catalase Positive (+; in A. viscosus), Urease Positive (+; in A. naeslundii)",
          "Involved in dental caries, periodontal disease, and pelvic actinomycosis"
        ]
      }
    ]
  },

  // 5B. Propionibacterium Sub-branch
  {
    id: "nonspore-propionibacterium",
    question: "Differentiate Propionibacterium species (Catalase +, Indole +, diphtheroid palisades):",
    options: [
      {
        text: "Catalase Positive (+) | Spot Indole Positive (+) | Nitrate Reduction Positive (+)",
        nextStep: null,
        conclusion: "Propionibacterium acnes (Cutibacterium acnes)",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Catalase Positive (+), Spot Indole Positive (+; key test), Nitrate Reduction Positive (+)",
          "Gram stain: highly distinctive gram-positive pleomorphic diphtheroid-like rods, arranged in palisades, 'Chinese letters', or club-shaped clumps ('anaerobic diphtheroids')",
          "Colonial morphology: small white to gray-white young colonies, becoming larger, opaque, and yellowish-tan with age",
          "Produces propionic acid from glucose; normal skin flora; associated with acne vulgaris lesions, opportunistic prosthetic valve endocarditis, shunt infections, and is the most common blood culture contaminant"
        ]
      },
      {
        text: "Catalase Positive (+) | Spot Indole Negative (-) | Nitrate Reduction Negative (-) | Beta-Hemolytic",
        nextStep: null,
        conclusion: "Propionibacterium avidum",
        tests: [
          "Vancomycin Sensitive (S), Colistin Resistant (R), Kanamycin Sensitive (S)",
          "Catalase Positive (+), Spot Indole Negative (-), Nitrate Reduction Negative (-)",
          "Colonial morphology: beta-hemolytic on anaerobic blood agar; white convex colonies",
          "Differentiated from P. acnes by its beta-hemolytic activity and lack of indole and nitrate reduction"
        ]
      }
    ]
  }
];
