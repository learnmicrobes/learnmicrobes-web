export interface RoadmapStep {
  id: string;
  question: string;
  options: {
    text: string;
    nextStep: string | null;
    conclusion?: string;
    tests?: string[];
  }[];
  image?: string;
}

export const gramPositiveRoadmap: RoadmapStep[] = [
  {
    id: "start",
    question: "Morphology:",
    options: [
      {
        text: "Gram Positive Cocci",
        nextStep: "cocci-confirm"
      },
      {
        text: "Gram Positive Rods",
        nextStep: "rods-confirm"
      }
    ]
  },
  
  // Cocci Pathway
  {
    id: "cocci-confirm",
    question: "Catalase Test Result:",
    options: [
      {
        text: "Positive",
        nextStep: "coagulase-test",
      },
      {
        text: "Negative",
        nextStep: "hemolysis-test"
      }
    ]
  },
  {
    id: "coagulase-test",
    question: "Coagulase Test Result:",
    options: [
      {
        text: "Positive (Slide/Tube Coagulase +)",
        nextStep: null,
        conclusion: "Staphylococcus aureus",
        tests: [
          "Catalase positive Gram-positive cocci in clusters",
          "Coagulase positive is the core bench and exam split for S. aureus",
          "Supporting clues may include beta-hemolysis, DNase/nuclease positivity, and mannitol salt agar yellowing",
          "If slide coagulase is negative but suspicion remains, confirm with tube coagulase"
        ]
      },
      {
        text: "Negative (Slide/Tube Coagulase -)",
        nextStep: "novobiocin-test",
        tests: [
          "Coagulase-negative staphylococci are usually separated first with clinical source and novobiocin susceptibility",
          "Microdase, bacitracin, furazolidone, PYR, ODC, and alkaline phosphatase are secondary/species-level clues"
        ]
      }
    ]
  },

  // Coagulase Positive staphylococci differentiation (Table 14-5)
  {
    id: "coag-pos-pathway",
    question: "Ornithine Decarboxylase (ODC) & Acetoin Production:",
    options: [
      {
        text: "ODC Positive | Acetoin Positive",
        nextStep: null,
        conclusion: "Staphylococcus lugdunensis",
        tests: ["PYR (+)", "ODC (+)", "Acetoin (+)"]
      },
      {
        text: "ODC Negative | Acetoin Positive",
        nextStep: "coag-pos-nuclease",
        tests: ["ODC (-)", "Acetoin (+)"]
      },
      {
        text: "ODC Negative | Acetoin Negative",
        nextStep: "coag-pos-animal",
        tests: ["ODC (-)", "Acetoin (-)"]
      }
    ]
  },
  {
    id: "coag-pos-nuclease",
    question: "Heat-Stable Nuclease & Alkaline Phosphatase:",
    options: [
      {
        text: "Nuclease Positive | Alkaline Phosphatase Positive",
        nextStep: null,
        conclusion: "Staphylococcus aureus",
        tests: ["Nuclease (+)", "Alkaline Phosphatase (+)", "Protein A (+)", "Beta-Hemolytic", "Mannitol Salt Yellow"]
      },
      {
        text: "Nuclease Variable/Negative | Alkaline Phosphatase Variable",
        nextStep: null,
        conclusion: "Staphylococcus pseudintermedius",
        tests: ["Nuclease (v)", "AP (v)", "Animal bite/dog scratch association"]
      }
    ]
  },
  {
    id: "coag-pos-animal",
    question: "Heat-Stable Nuclease & Slide Clumping Factor:",
    options: [
      {
        text: "Nuclease Positive | Clumping Factor Variable (Slide +/-)",
        nextStep: null,
        conclusion: "Staphylococcus intermedius",
        tests: ["Nuclease (+)", "Clumping Factor (v)", "Alkaline Phosphatase (+)", "Primary canine pathogen"]
      },
      {
        text: "Nuclease Positive | Clumping Factor Negative (Slide -)",
        nextStep: null,
        conclusion: "Staphylococcus hyicus",
        tests: ["Nuclease (+)", "Clumping Factor (-)", "Tube Coagulase (v)", "Alkaline Phosphatase (+)", "Rare in humans"]
      }
    ]
  },

  // Differentiation between Staph and Micrococcus (Table 14-4)
  {
    id: "oxidase-bacitracin",
    question: "Microdase (Modified Oxidase) & Bacitracin Susceptibility (0.04 U):",
    options: [
      {
        text: "Microdase Positive | Bacitracin Sensitive (≥10mm) | Furazolidone Resistant",
        nextStep: null,
        conclusion: "Micrococcus spp. (or Kocuria/Kytococcus/Dermacoccus)",
        tests: ["Microdase (+)", "Bacitracin (S)", "Furazolidone (R)", "Lysostaphin (R)"]
      },
      {
        text: "Microdase Negative | Bacitracin Resistant (<10mm) | Furazolidone Sensitive",
        nextStep: "pyr-test",
        tests: ["Microdase (-)", "Bacitracin (R)", "Furazolidone (S)", "Lysostaphin (S)"]
      }
    ]
  },
  {
    id: "pyr-test",
    question: "Pyrrolidonyl Aminopeptidase (PYR) Test Result:",
    options: [
      {
        text: "Positive",
        nextStep: "pyr-pos-susceptible"
      },
      {
        text: "Negative",
        nextStep: "novobiocin-test"
      }
    ]
  },

  // PYR Positive CoNS (Table 14-8 and Table 14-9)
  {
    id: "pyr-pos-susceptible",
    question: "Ornithine Decarboxylase (ODC) / PYR Positive Susceptible CoNS:",
    options: [
      {
        text: "ODC Positive",
        nextStep: null,
        conclusion: "Staphylococcus lugdunensis",
        tests: ["PYR (+)", "ODC (+)", "Novobiocin (S)", "Slide Coagulase (v)"]
      },
      {
        text: "ODC Negative",
        nextStep: "pyr-pos-alkaline-phosphatase"
      }
    ]
  },
  {
    id: "pyr-pos-alkaline-phosphatase",
    question: "Alkaline Phosphatase Result:",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Staphylococcus schleiferi subsp. schleiferi",
        tests: ["PYR (+)", "Alkaline Phosphatase (+)", "Novobiocin (S)", "Clumping Factor (v)"]
      },
      {
        text: "Negative",
        nextStep: "pyr-pos-urease-beta-gal"
      }
    ]
  },
  {
    id: "pyr-pos-urease-beta-gal",
    question: "Urease & Beta-Galactosidase Reactions:",
    options: [
      {
        text: "Urease Positive | Beta-Galactosidase Positive",
        nextStep: null,
        conclusion: "Staphylococcus simulans",
        tests: ["PYR (+)", "Urease (+)", "Beta-Gal (+)", "Acid from Mannitol (+)"]
      },
      {
        text: "Urease Positive | Beta-Galactosidase Negative",
        nextStep: null,
        conclusion: "Staphylococcus caprae",
        tests: ["PYR (+)", "Urease (+)", "Beta-Gal (-)", "Acid from Mannitol (-)"]
      },
      {
        text: "Urease Negative | Beta-Galactosidase Negative",
        nextStep: null,
        conclusion: "Staphylococcus haemolyticus",
        tests: ["PYR (+)", "Urease (-)", "Beta-Gal (-)", "Beta-Hemolytic", "High Multidrug Resistance"]
      }
    ]
  },

  // Novobiocin Susceptibility (PYR Negative) (Table 14-6 and Table 14-7)
  {
    id: "novobiocin-test",
    question: "Novobiocin Result:",
    options: [
      {
        text: "Resistant (≤16mm zone)",
        nextStep: null,
        conclusion: "Staphylococcus saprophyticus",
        tests: [
          "Coagulase-negative staphylococcus",
          "Novobiocin resistant is the core split for S. saprophyticus",
          "Classically associated with uncomplicated UTI in young females",
          "Urease may support the identification, but it is not the main roadmap branch"
        ]
      },
      {
        text: "Sensitive (>16mm zone)",
        nextStep: null,
        conclusion: "Staphylococcus epidermidis",
        tests: [
          "Classic teaching endpoint for novobiocin-susceptible CoNS",
          "Most routine coagulase-negative staphylococci are novobiocin susceptible",
          "Interpret significance by source: blood/device cultures deserve more attention than likely skin contaminants",
          "Species-level tests such as alkaline phosphatase, urease, PYR, ODC, or Microdase belong in expanded/reference workup"
        ]
      }
    ]
  },

  // Novobiocin Resistant CoNS Pathway (Table 14-6)
  {
    id: "novobiocin-resistant-pathway",
    question: "Key Biochemical Differentiations for Novobiocin-Resistant CoNS:",
    options: [
      {
        text: "Urease Positive | Alkaline Phosphatase Negative",
        nextStep: null,
        conclusion: "Staphylococcus saprophyticus subsp. saprophyticus",
        tests: ["Urease (+)", "AP (-)", "Novobiocin (R)", "Primary cause of community-acquired UTI in young females"]
      },
      {
        text: "Urease Negative | Alkaline Phosphatase Negative",
        nextStep: null,
        conclusion: "Staphylococcus cohnii subsp. cohnii",
        tests: ["Urease (-)", "AP (-)", "Novobiocin (R)", "Acid from Trehalose (+)"]
      },
      {
        text: "Urease Positive | Alkaline Phosphatase Variable | Sucrose Negative",
        nextStep: null,
        conclusion: "Staphylococcus cohnii subsp. urealyticus",
        tests: ["Urease (+)", "AP (v)", "Novobiocin (R)", "Trehalose (+)"]
      },
      {
        text: "Modified Oxidase (Microdase) Positive | Alkaline Phosphatase Positive",
        nextStep: null,
        conclusion: "Staphylococcus sciuri subsp. sciuri",
        tests: ["Microdase (+)", "AP (+)", "Novobiocin (R)", "Animal carrier reservoir"]
      },
      {
        text: "Urease Positive | Acid from Trehalose Negative | Acid from Mannitol Negative",
        nextStep: null,
        conclusion: "Staphylococcus hominis subsp. novobiosepticus",
        tests: ["Urease (+)", "Trehalose (-)", "Mannitol (-)", "Multiple-Antibiotic Resistant CoNS from blood cultures"]
      }
    ]
  },

  // Novobiocin Sensitive CoNS Pathway (Table 14-7)
  {
    id: "novobiocin-sensitive-pathway",
    question: "Alkaline Phosphatase & Biofilm Sticky Adherence:",
    options: [
      {
        text: "Alkaline Phosphatase Positive | Biofilm / Slime Sticky Layer",
        nextStep: null,
        conclusion: "Staphylococcus epidermidis",
        tests: ["AP (+)", "Urease (+)", "Sticky colony", "Primary vascular catheter and prosthetic joint pathogen"]
      },
      {
        text: "Alkaline Phosphatase Negative",
        nextStep: "cons-ap-negative-urease"
      }
    ]
  },
  {
    id: "cons-ap-negative-urease",
    question: "Urease Production for AP-Negative CoNS:",
    options: [
      {
        text: "Urease Negative",
        nextStep: "cons-ap-negative-urease-neg"
      },
      {
        text: "Urease Positive",
        nextStep: "cons-ap-negative-urease-pos"
      }
    ]
  },
  {
    id: "cons-ap-negative-urease-neg",
    question: "Anaerobic Growth & Carbohydrate Acid Production:",
    options: [
      {
        text: "Anaerobic Growth Positive | Acid from Mannitol (+) | Acid from Mannose (+)",
        nextStep: null,
        conclusion: "Staphylococcus capitis subsp. capitis",
        tests: ["Urease (-)", "Anaerobic Growth (+)", "Mannitol (+)", "Head and scalp colonizer"]
      },
      {
        text: "Anaerobic Growth Weak/Delayed | Acid from Mannitol (-) | Acid from Mannose (-)",
        nextStep: null,
        conclusion: "Staphylococcus auricularis",
        tests: ["Urease (-)", "Anaerobic Growth (weak)", "Mannitol (-)", "External auditory canal colonizer"]
      }
    ]
  },
  {
    id: "cons-ap-negative-urease-pos",
    question: "Beta-Glucosidase Activity:",
    options: [
      {
        text: "Beta-Glucosidase Positive",
        nextStep: null,
        conclusion: "Staphylococcus warneri",
        tests: ["Urease (+)", "Beta-Glucosidase (+)", "Trehalose (+)"]
      },
      {
        text: "Beta-Glucosidase Negative",
        nextStep: "cons-ap-negative-urease-pos-glucosidase-neg"
      }
    ]
  },
  {
    id: "cons-ap-negative-urease-pos-glucosidase-neg",
    question: "Carbohydrate Acid Profiles (Mannitol, Maltose, Sucrose, Mannose):",
    options: [
      {
        text: "All Carbohydrates Positive (Mannitol, Maltose, Sucrose, Mannose)",
        nextStep: null,
        conclusion: "Staphylococcus capitis subsp. urealyticus",
        tests: ["Urease (+)", "Glucosidase (-)", "Mannitol (+)", "Maltose (+)", "Sucrose (+)", "Mannose (+)"]
      },
      {
        text: "Mannitol Negative | Maltose Variable | Sucrose Variable | Mannose Negative",
        nextStep: null,
        conclusion: "Staphylococcus hominis subsp. hominis",
        tests: ["Urease (+)", "Glucosidase (-)", "Mannitol (-)", "Mannose (-)", "Cream-yellow-orange colonies"]
      }
    ]
  },

  // Streptococcus, Enterococcus and Similar Pathway
  {
    id: "hemolysis-test",
    question: "Hemolysis Pattern:",
    options: [
      { text: "Alpha (Greening Hemolysis)", nextStep: "standard-chains-pathway" },
      { text: "Beta (Clear/Complete Hemolysis)", nextStep: "beta-strep-colony" },
      { text: "Gamma (Non-Hemolytic)", nextStep: "standard-chains-bile-esculin" }
    ]
  },

  // Beta Hemolytic Streptococci Differentiations (Table 15-6)
  {
    id: "beta-strep-colony",
    question: "Colony Size under 24 hours incubation:",
    options: [
      {
        text: "Large Colony (matte or glossy, wide beta zone)",
        nextStep: "beta-large-pyr"
      },
      {
        text: "Minute/Small Colony (matte, narrow beta zone)",
        nextStep: "beta-small-vp"
      }
    ]
  },
  {
    id: "beta-large-pyr",
    question: "Pyrrolidonyl Aminopeptidase (PYR) Test Result:",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Streptococcus pyogenes",
        tests: ["PYR (+)", "Bacitracin (S)", "Group A Antigen", "Streptolysin O & S (+)", "Causes Pharyngitis, Impetigo, Necrotizing Fasciitis"]
      },
      {
        text: "Negative",
        nextStep: "beta-large-camp"
      }
    ]
  },
  {
    id: "beta-large-camp",
    question: "CAMP Test & Sodium Hippurate Hydrolysis Result:",
    options: [
      {
        text: "CAMP Positive | Hippurate Positive",
        nextStep: null,
        conclusion: "Streptococcus agalactiae",
        tests: ["CAMP (+)", "Hippurate (+)", "Group B Antigen", "Neonatal sepsis, meningitis, and maternal endometritis"]
      },
      {
        text: "CAMP Negative | Hippurate Negative",
        nextStep: null,
        conclusion: "Streptococcus dysgalactiae subsp. equisimilis",
        tests: ["Group C or G Antigen", "Large-colony beta-strep", "Bacteremia/cellulitis in patients with malignancies"]
      }
    ]
  },
  {
    id: "beta-small-vp",
    question: "Voges-Proskauer (VP) Reaction:",
    options: [
      {
        text: "Positive (VP +)",
        nextStep: null,
        conclusion: "Streptococcus anginosus group",
        tests: ["VP (+)", "Small colony beta-strep (A, C, F, G, or non-groupable)", "Prone to deep organ abscess formation"]
      },
      {
        text: "Negative (VP -)",
        nextStep: null,
        conclusion: "Beta-hemolytic Streptococcus Not Group A, B, or F"
      }
    ]
  },

  // Vancomycin Screen for Alpha/Gamma (Table 15-3)
  {
    id: "vancomycin-alpha",
    question: "Vancomycin (30 μg) Susceptibility Screen:",
    options: [
      {
        text: "Resistant (Growth up to the disk)",
        nextStep: "vancomycin-resistant-cocci"
      },
      {
        text: "Susceptible (Any zone of inhibition)",
        nextStep: "vancomycin-susceptible-alpha-gamma"
      }
    ]
  },
  {
    id: "vancomycin-gamma",
    question: "Vancomycin (30 μg) Susceptibility Screen:",
    options: [
      {
        text: "Resistant (Growth up to the disk)",
        nextStep: "vancomycin-resistant-cocci"
      },
      {
        text: "Susceptible (Any zone of inhibition)",
        nextStep: "vancomycin-susceptible-alpha-gamma"
      }
    ]
  },
  {
    id: "vancomycin-resistant-cocci",
    question: "MRS Broth Glucose Fermentation (Gas Production):",
    options: [
      {
        text: "Positive (Gas +) | Coccobacilli in chains",
        nextStep: null,
        conclusion: "Leuconostoc spp.",
        tests: ["Vancomycin (R)", "MRS Gas (+)", "LAP (v)", "PYR (-)", "Intrinsically resistant to vancomycin"]
      },
      {
        text: "Negative (Gas -) | Cocci in tetrads/clusters | Arginine +",
        nextStep: null,
        conclusion: "Pediococcus spp.",
        tests: ["Vancomycin (R)", "MRS Gas (-)", "LAP (+)", "PYR (-)", "Arginine Deaminase (+)", "Intrinsically resistant to vancomycin"]
      }
    ]
  },
  {
    id: "vancomycin-susceptible-alpha-gamma",
    question: "Cell Arrangement in Thioglycollate Broth / Gram Stain:",
    options: [
      {
        text: "Round/oval cocci primarily in chains",
        nextStep: "chains-alpha-gamma-pathway"
      },
      {
        text: "Cocci primarily in clusters, tetrads, or Neisseria-like pairs",
        nextStep: "tetrads-clusters-pathway"
      }
    ]
  },

  // Fastidious chains vs normal chains (Abiotrophia/Granulicatella)
  {
    id: "chains-alpha-gamma-pathway",
    question: "Growth Requirements on standard 5% Sheep Blood Agar:",
    options: [
      {
        text: "No growth unless cross-streaked with S. aureus (satellitism +) or supplemented with Pyridoxal (Vit B6)",
        nextStep: "nutritionally-variant-strep"
      },
      {
        text: "Grows normally on standard blood agar media",
        nextStep: "standard-chains-pathway"
      }
    ]
  },
  {
    id: "nutritionally-variant-strep",
    question: "Leucine Aminopeptidase (LAP) and PYR reactions:",
    options: [
      {
        text: "LAP Positive | PYR Positive",
        nextStep: null,
        conclusion: "Granulicatella adiacens",
        tests: ["Satellitism (+)", "LAP (+)", "PYR (+)", "Requires Pyridoxal B6", "Slow-growing agent of subacute endocarditis"]
      },
      {
        text: "LAP Variable/Negative | PYR Variable",
        nextStep: null,
        conclusion: "Abiotrophia defectiva",
        tests: ["Satellitism (+)", "LAP (v)", "PYR (v)", "Requires Pyridoxal B6"]
      }
    ]
  },

  // Standard chains pathway (Optochin, BE, NaCl)
  {
    id: "standard-chains-pathway",
    question: "Optochin (Ethylhydrocupreine HCl) Susceptibility & Bile Solubility:",
    options: [
      {
        text: "Susceptible (Zone ≥14mm under ambient air) | Bile Soluble (Lyses with bile salts)",
        nextStep: null,
        conclusion: "Streptococcus pneumoniae",
        tests: ["Optochin (S)", "Bile Soluble (+)", "Lancet-shaped diplococci", "Polysaccharide capsule halo", "Major cause of pneumonia and meningitis"]
      },
      {
        text: "Resistant (Zone <14mm) | Bile Insoluble",
        nextStep: "standard-chains-bile-esculin"
      }
    ]
  },
  {
    id: "standard-chains-bile-esculin",
    question: "Bile Esculin Hydrolysis Result:",
    options: [
      {
        text: "Positive (Black precipitate in agar)",
        nextStep: "standard-chains-be-positive"
      },
      {
        text: "Negative",
        nextStep: "viridans-streptococci-differentiation"
      }
    ]
  },
  {
    id: "standard-chains-be-positive",
    question: "Growth in 6.5% NaCl Broth & PYR reaction:",
    options: [
      {
        text: "Growth in 6.5% NaCl Positive | PYR Positive",
        nextStep: "enterococcus-species-key"
      },
      {
        text: "Growth in 6.5% NaCl Negative | PYR Negative | LAP Positive",
        nextStep: null,
        conclusion: "Streptococcus bovis group (S. gallolyticus)",
        tests: ["Bile Esculin (+)", "NaCl (-)", "PYR (-)", "LAP (+)", "Group D Antigen (+)", "Strongly associated with colorectal malignancies"]
      },
      {
        text: "Growth in 6.5% NaCl Positive | PYR Positive | Cannot grow at 10° C",
        nextStep: null,
        conclusion: "Streptococcus urinalis",
        tests: ["NaCl (+)", "PYR (+)", "LAP (+)", "No growth at 10° C", "Urine isolate resembling Enterococcus"]
      }
    ]
  },

  // Viridans Streptococci Differentiations (Figure 15-6)
  {
    id: "viridans-streptococci-differentiation",
    question: "Voges-Proskauer (VP) Reaction (Acetoin production):",
    options: [
      {
        text: "Positive (VP +)",
        nextStep: "viridans-vp-pos"
      },
      {
        text: "Negative (VP -)",
        nextStep: "viridans-vp-neg"
      }
    ]
  },
  {
    id: "viridans-vp-pos",
    question: "Urease Production:",
    options: [
      {
        text: "Urease Negative",
        nextStep: null,
        conclusion: "Streptococcus salivarius group",
        tests: ["VP (+)", "Urease (-)", "LAP (+)", "Oral cavity flora"]
      },
      {
        text: "Urease Positive",
        nextStep: null,
        conclusion: "Streptococcus vestibularis",
        tests: ["VP (+)", "Urease (+)", "Oral vestibule colonizer"]
      }
    ]
  },
  {
    id: "viridans-vp-neg",
    question: "Mannitol Fermentation:",
    options: [
      {
        text: "Acid from Mannitol Positive",
        nextStep: null,
        conclusion: "Streptococcus mutans group",
        tests: ["VP (-)", "Mannitol (+)", "Sucrose dextrans adhesive", "Primary agent of dental caries (tooth decay)"]
      },
      {
        text: "Acid from Mannitol Negative | Bile Esculin Negative",
        nextStep: null,
        conclusion: "Streptococcus mitis group",
        tests: ["VP (-)", "Mannitol (-)", "BE (-)", "Optochin (R)", "Primary agent of subacute bacterial endocarditis"]
      }
    ]
  },

  // Enterococcus Species key (Figure 15-7)
  {
    id: "enterococcus-species-key",
    question: "Mannitol Acid Fermentation in Enterococci:",
    options: [
      {
        text: "Acid from Mannitol Positive",
        nextStep: "enterococcus-mannitol-pos"
      },
      {
        text: "Acid from Mannitol Negative",
        nextStep: "enterococcus-mannitol-neg"
      }
    ]
  },
  {
    id: "enterococcus-mannitol-pos",
    question: "Arginine Dihydrolase Activity:",
    options: [
      {
        text: "Arginine Positive",
        nextStep: "enterococcus-mannitol-pos-arginine-pos"
      },
      {
        text: "Arginine Negative",
        nextStep: "enterococcus-mannitol-pos-arginine-neg"
      }
    ]
  },
  {
    id: "enterococcus-mannitol-pos-arginine-pos",
    question: "L-Arabinose Acid Fermentation:",
    options: [
      {
        text: "Arabinose Positive",
        nextStep: "enterococcus-mannitol-pos-arginine-pos-arab-pos"
      },
      {
        text: "Arabinose Negative",
        nextStep: "enterococcus-mannitol-pos-arginine-pos-arab-neg"
      }
    ]
  },
  {
    id: "enterococcus-mannitol-pos-arginine-pos-arab-pos",
    question: "Motility and Colony Pigment:",
    options: [
      {
        text: "Motility Positive | Yellow Pigmented Colonies",
        nextStep: null,
        conclusion: "Enterococcus casseliflavus",
        tests: ["Mannitol (+)", "Arginine (+)", "Arabinose (+)", "Motile (+)", "Yellow Colony", "Intrinsic low-level Vancomycin Resistance (vanC)"]
      },
      {
        text: "Motility Negative | Nonpigmented Colonies",
        nextStep: null,
        conclusion: "Enterococcus faecium",
        tests: ["Mannitol (+)", "Arginine (+)", "Arabinose (+)", "Motility (-)", "Nosocomial pathogen, frequently multidrug VRE"]
      }
    ]
  },
  {
    id: "enterococcus-mannitol-pos-arginine-pos-arab-neg",
    question: "D-Raffinose Acid Fermentation:",
    options: [
      {
        text: "Raffinose Positive",
        nextStep: null,
        conclusion: "Enterococcus raffinosus",
        tests: ["Mannitol (+)", "Arginine (+)", "Raffinose (+)", "Urine/wound isolate"]
      },
      {
        text: "Raffinose Negative",
        nextStep: null,
        conclusion: "Enterococcus avium",
        tests: ["Mannitol (+)", "Arginine (+)", "Raffinose (-)", "Rare human pathogen"]
      }
    ]
  },
  {
    id: "enterococcus-mannitol-pos-arginine-neg",
    question: "L-Arabinose Acid Fermentation:",
    options: [
      {
        text: "Arabinose Positive",
        nextStep: null,
        conclusion: "Enterococcus dispar",
        tests: ["Mannitol (+)", "Arginine (-)", "Arabinose (+)", "Non-motile"]
      },
      {
        text: "Arabinose Negative",
        nextStep: null,
        conclusion: "Enterococcus faecalis",
        tests: ["Mannitol (+)", "Arginine (-)", "Arabinose (-)", "Most common enterococcal clinical isolate", "Causes UTIs, wound infections, endocarditis"]
      }
    ]
  },
  {
    id: "enterococcus-mannitol-neg",
    question: "Motility & Arabinose Status for Mannitol-Negative Enterococci:",
    options: [
      {
        text: "Motility Positive | Arabinose Positive",
        nextStep: null,
        conclusion: "Enterococcus gallinarum",
        tests: ["Mannitol (-)", "Motile (+)", "Arabinose (+)", "Intrinsic low-level Vancomycin Resistance (vanC)", "Associated with intestinal carriage"]
      },
      {
        text: "Motility Negative | Arabinose Negative | Pigment Positive",
        nextStep: null,
        conclusion: "Enterococcus mundtii",
        tests: ["Mannitol (-)", "Motility (-)", "Yellow Pigmented Colony"]
      },
      {
        text: "Motility Negative | Arabinose Negative | Pigment Negative",
        nextStep: "enterococcus-mannitol-neg-nonmotile"
      }
    ]
  },
  {
    id: "enterococcus-mannitol-neg-nonmotile",
    question: "Arginine Dihydrolase Activity:",
    options: [
      {
        text: "Arginine Positive",
        nextStep: null,
        conclusion: "Enterococcus hirae",
        tests: ["Mannitol (-)", "Motility (-)", "Arginine (+)"]
      },
      {
        text: "Arginine Negative",
        nextStep: null,
        conclusion: "Enterococcus durans",
        tests: ["Mannitol (-)", "Motility (-)", "Arginine (-)"]
      }
    ]
  },

  // Tetrads/Clusters Susceptible Alpha/Gamma Path (Table 15-4)
  {
    id: "tetrads-clusters-pathway",
    question: "Key Differentiation for Tetrads/Clusters Cocci (LAP, PYR, O2 Tolerance):",
    options: [
      {
        text: "Leucine Aminopeptidase (LAP) Negative | PYR Positive | 6.5% NaCl +",
        nextStep: null,
        conclusion: "Aerococcus viridans",
        tests: ["LAP (-)", "PYR (+)", "NaCl (+)", "BE (+)", "Tetrads, alpha-hemolytic, mimic viridans strep"]
      },
      {
        text: "LAP Positive | PYR Negative | 6.5% NaCl +",
        nextStep: null,
        conclusion: "Aerococcus urinae",
        tests: ["LAP (+)", "PYR (-)", "NaCl (+)", "BE (+)", "Pathogen of urinary tract and endocarditis in elderly males"]
      },
      {
        text: "LAP Negative | PYR Negative | Flattened adjacent sides (Neisseria-like)",
        nextStep: null,
        conclusion: "Gemella spp. (G. haemolysans)",
        tests: ["LAP (-)", "PYR (-)", "Easily decolorized", "Diplococci/tetrads with flattened sides", "Causes subacute endocarditis"]
      },
      {
        text: "Aerobic only (No anaerobic growth) | Weakly Catalase Positive (Pseudocatalase) | Otitis Media",
        nextStep: null,
        conclusion: "Alloiococcus otitidis",
        tests: ["Aerobic only", "Pseudocatalase (+)", "Associated with chronic otitis media in children"]
      },
      {
        text: "Strong adherence to agar surface | Catalase Positive/Negative | LAP Positive | PYR Negative",
        nextStep: null,
        conclusion: "Rothia mucilaginosa",
        tests: ["Sticky colony", "Adheres strongly", "LAP (+)", "PYR (-)", "Pseudocatalase (+)"]
      }
    ]
  },

  // SPORE-FORMING RODS PATHWAY (Bacillus and Similar Organisms)
  {
    id: "rods-confirm",
    question: "Does it produce spores in the presence of oxygen?",
    options: [
      {
        text: "Yes (Aerobic spore-former)",
        nextStep: "cell-width-check"
      },
      {
        text: "No (Non-spore-forming rod)",
        nextStep: "partially-acid-fast-screen"
      }
    ]
  },
  {
    id: "partially-acid-fast-screen",
    question: "Modified Acid-Fast Stain & Microscopic/Colonial Branching:",
    options: [
      {
        text: "Partially Acid-Fast Positive (Mycolic acids present) OR extensive aerial branching (Nocardioform/Actinomycetes)",
        nextStep: "aerobic-actinomycetes-branching"
      },
      {
        text: "Partially Acid-Fast Negative (Non-branching, typical GPR)",
        nextStep: "catalase-gpr"
      }
    ]
  },
  {
    id: "cell-width-check",
    question: "Vegetative Cell / Bacillary Body Width:",
    options: [
      {
        text: "Large Cell Width (> 1.0 μm)",
        nextStep: "spore-swell-veggie-large"
      },
      {
        text: "Small Cell Width (< 1.0 μm)",
        nextStep: "spore-swell-veggie-small"
      }
    ]
  },
  {
    id: "spore-swell-veggie-large",
    question: "Do endospores swell the vegetative cell (sporangium)?",
    options: [
      {
        text: "No (Spores do not cause swelling of the cell)",
        nextStep: "lecithinase-production-large-veggie"
      },
      {
        text: "Yes (Spores cause sporangial swelling)",
        nextStep: "spore-swell-veggie-small" // Fallback to Paenibacillus/Brevibacillus
      }
    ]
  },
  {
    id: "lecithinase-production-large-veggie",
    question: "Egg Yolk Agar Lecithinase zone (precipitation zone):",
    options: [
      {
        text: "Positive (+)",
        nextStep: "motility-large-veggie-lecithinase-pos"
      },
      {
        text: "Negative (-)",
        nextStep: null,
        conclusion: "Bacillus megaterium",
        tests: ["Lecithinase (-)", "Cell Width (>1μm)", "VP (-)", "Citrate (+)", "Nonhemolytic", "Large, convex, entire, moist colonies"]
      }
    ]
  },
  {
    id: "motility-large-veggie-lecithinase-pos",
    question: "Bacterial Motility Pattern:",
    options: [
      {
        text: "Non-Motile (-)",
        nextStep: "bacillus-anthracis-mycoides-differentiation"
      },
      {
        text: "Motile (+)",
        nextStep: "bacillus-cereus-thuringiensis-differentiation"
      }
    ]
  },
  {
    id: "bacillus-anthracis-mycoides-differentiation",
    question: "Hemolysis & Colonial Morphology on BAP:",
    options: [
      {
        text: "Non-Hemolytic | Medusa-head or Ground-Glass irregular colonies",
        nextStep: null,
        conclusion: "Bacillus anthracis",
        tests: ["Non-Motile", "Non-Hemolytic", "Penicillin Susceptible", "Medusa Head Colony", "CDC Select Agent", "Causative agent of cutaneous, GI, and pulmonary Anthrax"]
      },
      {
        text: "Weakly Beta-Hemolytic | Rhizoid fungal-like branching colonies",
        nextStep: null,
        conclusion: "Bacillus mycoides",
        tests: ["Non-Motile", "Rhizoid colony", "Beta-Hemolytic", "Soil flora"]
      }
    ]
  },
  {
    id: "bacillus-cereus-thuringiensis-differentiation",
    question: "Parasporal Toxin Crystal Production:",
    options: [
      {
        text: "Negative (No crystals produced)",
        nextStep: null,
        conclusion: "Bacillus cereus",
        tests: ["Motile (+)", "Beta-Hemolytic (feathery, spreading)", "Lecithinase (+)", "Penicillin Resistant", "Causes emetic/diarrheal food poisoning and serious posttraumatic endophthalmitis"]
      },
      {
        text: "Positive (Produces parasporal protein toxin crystals)",
        nextStep: null,
        conclusion: "Bacillus thuringiensis",
        tests: ["Motile (+)", "Beta-Hemolytic", "Lecithinase (+)", "Used as insecticide/biopesticide"]
      }
    ]
  },
  {
    id: "spore-swell-veggie-small",
    question: "Do endospores swell the vegetative cell (sporangium)?",
    options: [
      {
        text: "No (Spores do not cause swelling of the cell)",
        nextStep: "small-cell-vp-test"
      },
      {
        text: "Yes (Spores cause sporangial swelling)",
        nextStep: "small-cell-spores-swelling-pathway"
      }
    ]
  },
  {
    id: "small-cell-vp-test",
    question: "Voges-Proskauer (VP) Reaction:",
    options: [
      {
        text: "Positive (VP +)",
        nextStep: "small-cell-vp-pos-citrate"
      },
      {
        text: "Negative (VP -) | Spherical Spores",
        nextStep: null,
        conclusion: "Bacillus sphaericus",
        tests: ["VP (-)", "Spherical spores", "Nonhemolytic", "Urease (+)"]
      }
    ]
  },
  {
    id: "small-cell-vp-pos-citrate",
    question: "Citrate Utilization:",
    options: [
      {
        text: "Positive (Citrate +) | Grows at 45° C",
        nextStep: "bacillus-subtilis-licheniformis-differentiation"
      },
      {
        text: "Negative (Citrate -) | Starch Hydrolysis Positive",
        nextStep: null,
        conclusion: "Bacillus pumilus",
        tests: ["VP (+)", "Citrate (-)", "Starch (+)", "Large moist blister colonies"]
      }
    ]
  },
  {
    id: "bacillus-subtilis-licheniformis-differentiation",
    question: "Anaerobic Growth:",
    options: [
      {
        text: "Positive (Growth under anaerobic conditions +) | Wrinkled rough colonies",
        nextStep: null,
        conclusion: "Bacillus licheniformis",
        tests: ["VP (+)", "Citrate (+)", "Anaerobic growth (+)", "Large blister colony", "Food poisoning associate"]
      },
      {
        text: "Negative (Strictly aerobic, no anaerobic growth)",
        nextStep: null,
        conclusion: "Bacillus subtilis",
        tests: ["VP (+)", "Citrate (+)", "Strict aerobe", "Flat dull colonies", "Model laboratory organism"]
      }
    ]
  },
  {
    id: "small-cell-spores-swelling-pathway",
    question: "Gas production from glucose fermentation & citrate utilization:",
    options: [
      {
        text: "Gas from Glucose Positive | Citrate Positive",
        nextStep: "paenibacillus-macerans-polymyxa-differentiation"
      },
      {
        text: "Gas from Glucose Negative | VP Positive | Swarming growth on SBA",
        nextStep: null,
        conclusion: "Paenibacillus alvei",
        tests: ["Gas (-)", "VP (+)", "Swarming growth", "Indole (+)", "Causes foul-brood disease in bees"]
      },
      {
        text: "Gas from Glucose Negative | Citrate Positive | VP Negative",
        nextStep: null,
        conclusion: "Brevibacillus brevis",
        tests: ["Gas (-)", "Citrate (+)", "VP (-)", "Granular convex colonies"]
      },
      {
        text: "Gas Variable | VP Variable | Citrate Variable | Smooth translucent convex BAP",
        nextStep: null,
        conclusion: "Bacillus circulans",
        tests: ["Citrate (+)", "Glucose (+)", "Variable swelling", "Common soil organism"]
      }
    ]
  },
  {
    id: "paenibacillus-macerans-polymyxa-differentiation",
    question: "Voges-Proskauer (VP) Reaction:",
    options: [
      {
        text: "Positive (VP +) | Large moist ameboid-spreading blister colony",
        nextStep: null,
        conclusion: "Paenibacillus polymyxa",
        tests: ["Gas (+)", "VP (+)", "Ameboid spreading", "Produces polymyxin antibiotics"]
      },
      {
        text: "Negative (VP -) | Xylose Fermentation Positive",
        nextStep: null,
        conclusion: "Paenibacillus macerans",
        tests: ["Gas (+)", "VP (-)", "Xylose (+)", "Pec-degrading soil isolate"]
      }
    ]
  },

  // CATALASE-POSITIVE NON-SPORE-FORMING RODS
  {
    id: "catalase-gpr",
    question: "Catalase reaction in non-spore-forming rods:",
    options: [
      {
        text: "Positive",
        nextStep: "catalase-gpr-positive"
      },
      {
        text: "Negative",
        nextStep: "catalase-gpr-negative"
      }
    ]
  },
  {
    id: "catalase-gpr-positive",
    question: "Bacterial Motility Profile & Temperature preference:",
    options: [
      {
        text: "Tumbling end-over-end motility at 20-25°C (semisolid umbrella) | Non-motile at 35-37°C",
        nextStep: null,
        conclusion: "Listeria monocytogenes",
        tests: ["Catalase (+)", "Tumbling Motility (RT)", "Narrow Beta-Hemolytic", "Bile Esculin (+)", "CAMP (+)", "Listeriolysin O (+)", "Granulomatosis infantisepticum, neonatal meningitis, and maternal sepsis"]
      },
      {
        text: "Strictly Non-Motile at all incubation temperatures",
        nextStep: "catalase-pos-nonspore-nonmotile"
      },
      {
        text: "Motile at all temperatures (20-35°C) or variable rod-coccus cycles",
        nextStep: "catalase-pos-nonspore-motile-others"
      }
    ]
  },
  {
    id: "catalase-pos-nonspore-nonmotile",
    question: "Lipophilic requirement & Odor / acid-fast morphology:",
    options: [
      {
        text: "Chinese letter palisades | Non-acid fast | Esculin Negative | Diphtheroids",
        nextStep: "corynebacterium-species-pathway"
      },
      {
        text: "Partially Acid-Fast | Salmon-pink to orange-pink mucoid colonies",
        nextStep: null,
        conclusion: "Rhodococcus equi",
        tests: ["Partially Acid-Fast (+)", "Mucoid pink colonies", "CAMP (+)", "Nitrate (+)", "Urease (+)", "Severe necrotizing pneumonia in horses and AIDS patients"]
      },
      {
        text: "Pungent odor | Lysine & Ornithine Decarboxylase positive | Gelatin positive",
        nextStep: null,
        conclusion: "Dermabacter hominis",
        tests: ["Pungent Odor", "Lysine (+)", "Ornithine (+)", "Gelatin (+)", "Coccoid to short rods"]
      },
      {
        text: "Cheese-like odor | Casein & Gelatin positive | Coccoid forms in old culture",
        nextStep: null,
        conclusion: "Brevibacterium spp. (B. casei)",
        tests: ["Cheese Odor", "Gelatin (+)", "Casein (+)", "Rod-coccus cycle", "Hospital indwelling catheter bacteremia"]
      },
      {
        text: "Sticky crumbly colonies | Extremely pleomorphic branched filaments to coccoid",
        nextStep: null,
        conclusion: "Rothia dentocariosa",
        tests: ["Sticky colony", "Pleomorphic filaments", "Nitrate (+)", "Esculin (+)", "Oral cavity normal flora, subacute endocarditis"]
      },
      {
        text: "Strictly aerobic ear isolate | Nitrate negative | Urease negative | CAMP positive",
        nextStep: null,
        conclusion: "Turicella otitidis",
        tests: ["Ear isolate", "Strictly Aerobic", "CAMP (+)", "Nitrate (-)", "Urease (-)"]
      }
    ]
  },

  // Corynebacterium Speciation Key (Tables 17-5 to 17-9)
  {
    id: "corynebacterium-species-pathway",
    question: "Brown/black halo on Modified Tinsdale agar (TIN):",
    options: [
      {
        text: "Positive (Brown/black halo around black tellurite colony)",
        nextStep: "corynebacterium-tinsdale-positive"
      },
      {
        text: "Negative (No halo on Tinsdale agar)",
        nextStep: "corynebacterium-tinsdale-negative"
      }
    ]
  },
  {
    id: "corynebacterium-tinsdale-positive",
    question: "Urease, Nitrate Reduction, and Glycogen fermentation:",
    options: [
      {
        text: "Urease Negative | Nitrate Positive | Glycogen Positive | Nonlipophilic",
        nextStep: null,
        conclusion: "Corynebacterium diphtheriae subsp. gravis",
        tests: ["Tinsdale Halo (+)", "Urease (-)", "Nitrate (+)", "Glycogen (+)", "Elek Toxin (+)", "Severe respiratory diphtheria; inhibits protein synthesis via ADP-ribose EF-2"]
      },
      {
        text: "Urease Negative | Nitrate Positive | Glycogen Negative | Beta-Hemolytic",
        nextStep: null,
        conclusion: "Corynebacterium diphtheriae subsp. mitis",
        tests: ["Tinsdale Halo (+)", "Urease (-)", "Nitrate (+)", "Glycogen (-)", "Beta-Hemolytic", "Elek Toxin (+)"]
      },
      {
        text: "Urease Negative | Nitrate Negative | Glycogen Negative | Nonlipophilic",
        nextStep: null,
        conclusion: "Corynebacterium diphtheriae subsp. belfanti",
        tests: ["Tinsdale Halo (+)", "Urease (-)", "Nitrate (-)", "Glycogen (-)", "Elek Toxin (+)"]
      },
      {
        text: "Urease Negative | Nitrate Positive | Glycogen Negative | Lipophilic",
        nextStep: null,
        conclusion: "Corynebacterium diphtheriae subsp. intermedius",
        tests: ["Tinsdale Halo (+)", "Urease (-)", "Nitrate (+)", "Lipophilic", "Slow growing, Elek Toxin (+)"]
      },
      {
        text: "Urease Positive | Nitrate Negative | Glycogen Positive | Reverse CAMP +",
        nextStep: null,
        conclusion: "Corynebacterium ulcerans",
        tests: ["Tinsdale Halo (+)", "Urease (+)", "Nitrate (-)", "Reverse CAMP (+)", "Zoonotic diphtheria-like sore throat"]
      },
      {
        text: "Urease Positive | Nitrate Variable | Glycogen Negative | Reverse CAMP +",
        nextStep: null,
        conclusion: "Corynebacterium pseudotuberculosis",
        tests: ["Tinsdale Halo (+)", "Urease (+)", "Reverse CAMP (+)", "Zoonotic suppurative granulomatous lymphadenitis"]
      }
    ]
  },
  {
    id: "corynebacterium-tinsdale-negative",
    question: "Lipophilic Growth Enhancement (Requires 1% Tween 80 for normal colonies):",
    options: [
      {
        text: "Lipophilic (Tween 80 stimulated, pinpoint SBA colonies)",
        nextStep: "corynebacterium-lipophilic"
      },
      {
        text: "Non-lipophilic (Grows well on standard blood agar)",
        nextStep: "corynebacterium-nonlipophilic"
      }
    ]
  },
  {
    id: "corynebacterium-lipophilic",
    question: "Glucose Fermentation & Urease Activity:",
    options: [
      {
        text: "Glucose Fermenting (Glucose +) | Urease Negative | Pyrazinamidase Positive",
        nextStep: null,
        conclusion: "Corynebacterium accolens (or C. macginleyi)",
        tests: ["Lipophilic", "Glucose (+)", "Urease (-)", "Pyrazinamidase (+)", "Nitrate (+)", "Associated with ophthalmic conjunctivitis (C. macginleyi)"]
      },
      {
        text: "Glucose Non-fermenting (Glucose -) | Rapidly Urease Positive (Tubes turn pink immediately)",
        nextStep: null,
        conclusion: "Corynebacterium urealyticum",
        tests: ["Lipophilic", "Urease (+, rapid)", "Glucose (-)", "Multi-drug resistant", "Pinpoint white colonies", "Causes alkaline encrusted cystitis and struvite urolithiasis"]
      },
      {
        text: "Glucose Fermenting (Glucose +) | Urease Negative | Pyrazinamidase Negative",
        nextStep: null,
        conclusion: "Corynebacterium jeikeium",
        tests: ["Lipophilic", "Glucose (+)", "Urease (-)", "Pyrazinamidase (-)", "Highly Multi-drug Resistant", "Vascular catheter sepsis and prosthetic valve endocarditis"]
      }
    ]
  },
  {
    id: "corynebacterium-nonlipophilic",
    question: "Glucose Fermentation & Urease Activity:",
    options: [
      {
        text: "Glucose Fermenting | Urease Negative | Nitrate Positive | Moist flat CoNS-like colonies",
        nextStep: null,
        conclusion: "Corynebacterium striatum",
        tests: ["Glucose (+)", "Urease (-)", "Nitrate (+)", "Moist smooth colony", "Device-related nosocomial pathogen"]
      },
      {
        text: "Glucose Fermenting | Urease Variable | Nitrate Variable | Dry pleomorphic grey-white colonies",
        nextStep: null,
        conclusion: "Corynebacterium amycolatum",
        tests: ["Glucose (+)", "Most common non-diphtheria clinical isolate", "Dry grey-white colony", "Mycolic acid lipid deficient"]
      },
      {
        text: "Glucose Non-fermenting | Urease Positive | Nitrate Positive | Dry matte colony",
        nextStep: null,
        conclusion: "Corynebacterium pseudodiphtheriticum",
        tests: ["Glucose (-)", "Urease (+)", "Nitrate (+)", "Normal pharyngeal flora", "Respiratory pathogen in immunocompromised"]
      },
      {
        text: "Glucose Non-fermenting | Urease Negative | Nitrate Positive | Matted colony surface",
        nextStep: null,
        conclusion: "Corynebacterium propinquum",
        tests: ["Glucose (-)", "Urease (-)", "Nitrate (+)", "Dry matted colony"]
      }
    ]
  },
  {
    id: "catalase-pos-nonspore-motile-others",
    question: "Yellow pigmentation & Vegetative branching hyphae penetrating agar (pitting):",
    options: [
      {
        text: "Yellow pigment | Pits/penetrates agar | Hydrolyzes Xanthine",
        nextStep: null,
        conclusion: "Cellulosimicrobium cellulans (formerly Oerskovia xanthineolytica)",
        tests: ["Yellow pigment", "Agar Pitting", "Xanthine (+)", "Branching hyphae", "No aerial hyphae"]
      },
      {
        text: "Yellow pigment | Grows into agar | Xanthine Negative",
        nextStep: null,
        conclusion: "Oerskovia turbata",
        tests: ["Yellow pigment", "Xanthine (-)", "Agar penetrator"]
      },
      {
        text: "Golden yellow pigment | Oxidase positive | Gelatin positive | Motile rods",
        nextStep: null,
        conclusion: "Exiguobacterium acetylicum",
        tests: ["Golden pigment", "Oxidase (+)", "Gelatin (+)", "Motile"]
      },
      {
        text: "Yellow pigment | Strictly aerobic | Motile with flagella | Gelatin negative",
        nextStep: null,
        conclusion: "Leifsonia aquatica (formerly Corynebacterium aquaticum)",
        tests: ["Yellow pigment", "Strictly Aerobic", "Gelatin (-)", "Casein (-)", "Fresh water isolate"]
      },
      {
        text: "Rhizoid Medusa-head growth on yeast agar | H2S positive in TSI butt",
        nextStep: null,
        conclusion: "Kurthia spp.",
        tests: ["Medusa Head colony", "H2S (+) in TSI butt", "Motile at 20°C"]
      }
    ]
  },

  // CATALASE-NEGATIVE NON-SPORE-FORMING RODS and similar
  {
    id: "catalase-gpr-negative",
    question: "TSI Slant H2S reaction & Hemolysis / motility pattern:",
    options: [
      {
        text: "H2S Positive (Blackening of TSI butt) | Pleomorphic slender rods | Gelatin stab 'test tube brush' growth",
        nextStep: null,
        conclusion: "Erysipelothrix rhusiopathiae",
        tests: ["Catalase (-)", "H2S (+)", "Test Tube Brush Gelatin", "Non-motile", "Vancomycin Resistant", "Erysipeloid skin lesions or bacteremia in fish handlers"]
      },
      {
        text: "H2S Negative | Beta-Hemolytic on Blood Agar (Human, Rabbit, or Sheep)",
        nextStep: "catalase-neg-beta-hemolytic-rods"
      },
      {
        text: "H2S Negative | Alpha-Hemolytic or Gamma (Non-Hemolytic) on Blood Agar",
        nextStep: "catalase-neg-alpha-gamma-rods"
      }
    ]
  },
  {
    id: "catalase-neg-beta-hemolytic-rods",
    question: "Reverse CAMP reaction, gelatin liquefaction, & Clue Cells:",
    options: [
      {
        text: "Reverse CAMP Positive (Inhibits S. aureus beta-lysin) | Gelatin negative | Pharyngitis with rash",
        nextStep: null,
        conclusion: "Arcanobacterium haemolyticum",
        tests: ["Catalase (-)", "Reverse CAMP (+)", "Gelatin (-)", "Pharyngitis in adolescents, trunk/extremity rash"]
      },
      {
        text: "Reverse CAMP Negative | Gelatin positive at 48 hours | Casein positive | Animal exposure",
        nextStep: null,
        conclusion: "Arcanobacterium pyogenes",
        tests: ["Catalase (-)", "Reverse CAMP (-)", "Gelatin (+)", "Casein (+)", "Cutaneous abscesses and bacteremia in livestock handlers"]
      },
      {
        text: "Reverse CAMP Negative | Gelatin negative | Clue Cells present in saline wet mount",
        nextStep: null,
        conclusion: "Gardnerella vaginalis",
        tests: ["Catalase (-)", "Clue Cells (+)", "HBT Beta-Hemolytic", "Oxidase (-)", "Vaginal pH > 4.5", "KOH Whiff positive (amine fishy odor), key agent of Bacterial Vaginosis"]
      }
    ]
  },
  {
    id: "catalase-neg-alpha-gamma-rods",
    question: "Vancomycin (30 μg) susceptibility pattern:",
    options: [
      {
        text: "Resistant (Growth up to the disk)",
        nextStep: "vancomycin-resistant-catalase-neg-rods"
      },
      {
        text: "Susceptible (Any zone of inhibition)",
        nextStep: "vancomycin-susceptible-catalase-neg-rods"
      }
    ]
  },
  {
    id: "vancomycin-resistant-catalase-neg-rods",
    question: "Gas production from Glucose in MRS broth (heterofermentative status):",
    options: [
      {
        text: "Gas Positive (Heterofermentative) | Arginine positive | Small short rods",
        nextStep: null,
        conclusion: "Weissella confusa (formerly Lactobacillus confusus)",
        tests: ["Vancomycin (R)", "Gas from MRS (+)", "Arginine (+)", "Esculin (+)", "Alpha-hemolytic", "Rare agent of opportunistic endocarditis/bacteremia"]
      },
      {
        text: "Gas Negative (Homofermentative or Facultative) | Long chaining rods & spiral forms",
        nextStep: null,
        conclusion: "Lactobacillus spp.",
        tests: ["Vancomycin (R)", "Gas from MRS (-)", "Normal vaginal and GI flora", "Keeps vaginal pH low by metabolizing glucose to lactic acid"]
      }
    ]
  },
  {
    id: "vancomycin-susceptible-catalase-neg-rods",
    question: "Urease, Nitrate Reduction, and Pigment / Sulfur Granules:",
    options: [
      {
        text: "Urease Positive | Nitrate Positive | Branching filaments",
        nextStep: null,
        conclusion: "Actinomyces naeslundii",
        tests: ["Urease (+)", "Nitrate (+)", "Oral cavity plaque", "Associated with dental caries"]
      },
      {
        text: "Urease Negative | Nitrate Positive | Red-orange pigment produced after 1 week on SBA",
        nextStep: null,
        conclusion: "Actinomyces odontolyticus",
        tests: ["Urease (-)", "Nitrate (+)", "Red-orange colony pigment", "Associated with thoracic/abdominal infections"]
      },
      {
        text: "Urease Negative | Nitrate Positive | No red-orange pigment | Sulfur Granules in pus",
        nextStep: null,
        conclusion: "Actinomyces israelii",
        tests: ["Urease (-)", "Nitrate (+)", "Sulfur Granules", "Branching filamentous rods", "Major agent of chronic suppurative cervicofacial Actinomycosis ('lumpy jaw')"]
      },
      {
        text: "Urease Negative | Nitrate Negative | Esculin Positive | Pyrazinamidase & Beta-Gal Positive",
        nextStep: null,
        conclusion: "Actinomyces radingae",
        tests: ["Urease (-)", "Nitrate (-)", "Esculin (+)", "Pyrazinamidase (+)", "Beta-Gal (+)", "Isolated from wounds and abscesses"]
      },
      {
        text: "Urease Negative | Nitrate Negative | Esculin Negative | Pyrazinamidase & Beta-Gal Negative",
        nextStep: null,
        conclusion: "Actinomyces turicensis",
        tests: ["Urease (-)", "Nitrate (-)", "Esculin (-)", "Pyrazinamidase (-)", "Beta-Gal (-)", "Genital and urinary abscesses"]
      },
      {
        text: "Urease Negative | Nitrate Negative | Beta-Gal Negative | Xylose Positive | Beta-hemolytic",
        nextStep: null,
        conclusion: "Actinobaculum schaalii",
        tests: ["Urease (-)", "Nitrate (-)", "Xylose (+)", "Beta-hemolytic", "Emerging urinary pathogen in elderly"]
      },
      {
        text: "Urease Negative | Nitrate Negative | Pyrazinamidase/Beta-Gal Negative | Non-hemolytic",
        nextStep: null,
        conclusion: "Arcanobacterium bernardiae",
        tests: ["Urease (-)", "Nitrate (-)", "Gelatin (-)", "Nonhemolytic", "Wounds, abscesses, bacteremia"]
      }
    ]
  },

  // AEROBIC ACTINOMYCETES SPECIATION KEY
  {
    id: "aerobic-actinomycetes-branching",
    question: "Presence of mycolic acid in cell wall & Modified Acid-Fast status:",
    options: [
      {
        text: "Partially Acid-Fast Positive | Mycolic Acid Present | Substrate hyphae fragmenting into rods/cocci",
        nextStep: "actinomycetes-partially-acid-fast"
      },
      {
        text: "Partially Acid-Fast Negative | Mycolic Acid Absent | Non-acid fast filamentous branching",
        nextStep: "actinomycetes-non-acid-fast"
      }
    ]
  },
  {
    id: "actinomycetes-partially-acid-fast",
    question: "Aerial hyphae on tap water agar & Lysozyme broth resistance:",
    options: [
      {
        text: "Extensive branching with aerial hyphae | Lysozyme Resistant (Growth in lysozyme)",
        nextStep: "nocardia-species-key"
      },
      {
        text: "Minimal branching, no aerial hyphae | Lysozyme Variable or Susceptible",
        nextStep: "rhodococcus-gordonia-tsukamurella-key"
      }
    ]
  },
  {
    id: "nocardia-species-key",
    question: "Casein, Xanthine, and Tyrosine hydrolysis pattern (Table 19-9):",
    options: [
      {
        text: "Casein Negative | Xanthine Negative | Tyrosine Negative",
        nextStep: "nocardia-triple-negative-group"
      },
      {
        text: "Casein Positive | Xanthine Negative | Tyrosine Positive | Gelatin Positive",
        nextStep: "nocardia-brasiliensis-group"
      },
      {
        text: "Casein Negative | Xanthine Negative | Tyrosine Positive/Variable",
        nextStep: "nocardia-otitidiscaviarum-group"
      }
    ]
  },
  {
    id: "nocardia-triple-negative-group",
    question: "Growth at 42°C, 14-day Arylsulfatase, & Cefotaxime susceptibility:",
    options: [
      {
        text: "Growth at 42°C after 3 days | Cefotaxime Resistant | Middlebrook Agar Opacification Positive",
        nextStep: null,
        conclusion: "Nocardia farcinica",
        tests: ["Partially Acid-Fast (+)", "Lysozyme (R)", "Triple Sugar Negative (Casein/Xanthine/Tyrosine -)", "Growth at 42°C (+)", "Arylsulfatase (-)", "Middlebrook Opacification (+)", "Gentamicin (R), Tobramycin (R)", "Highly virulent nosocomial pathogen, prone to brain abscesses"]
      },
      {
        text: "No growth at 42°C | 14-day Arylsulfatase Positive | Erythromycin Susceptible",
        nextStep: null,
        conclusion: "Nocardia nova",
        tests: ["Partially Acid-Fast (+)", "Lysozyme (R)", "Triple Sugar Negative", "Arylsulfatase (+)", "Erythromycin (S)", "Ceftriaxone (S)"]
      },
      {
        text: "No growth at 42°C | 14-day Arylsulfatase Negative | Erythromycin Resistant | Rhamnose Acid Variable",
        nextStep: null,
        conclusion: "Nocardia asteroides sensu stricto (Type VI)",
        tests: ["Partially Acid-Fast (+)", "Lysozyme (R)", "Triple Sugar Negative", "Arylsulfatase (-)", "Erythromycin (R)", "Most common clinical isolate historically, opportunistic pulmonary pathogen"]
      },
      {
        text: "No growth at 42°C | 14-day Arylsulfatase Negative | Erythromycin Resistant | Trehalose/Adonitol Positive",
        nextStep: null,
        conclusion: "Nocardia transvalensis",
        tests: ["Partially Acid-Fast (+)", "Lysozyme (R)", "Triple Sugar Negative", "Adonitol (+)", "Trehalose (+)", "Amikacin (R)"]
      }
    ]
  },
  {
    id: "nocardia-brasiliensis-group",
    question: "API 20C Galactose assimilation & Amikacin susceptibility:",
    options: [
      {
        text: "Galactose Assimilation Positive | Amikacin Susceptible | 14-day Arylsulfatase Negative",
        nextStep: null,
        conclusion: "Nocardia brasiliensis",
        tests: ["Partially Acid-Fast (+)", "Lysozyme (R)", "Casein (+)", "Tyrosine (+)", "Gelatin Hydrolysis (+)", "Predominant cause of subcutaneous mycetoma (actinomycetoma), lymphocutaneous lesions"]
      },
      {
        text: "Galactose Assimilation Positive | Amikacin Susceptible | 14-day Arylsulfatase Positive",
        nextStep: null,
        conclusion: "Nocardia pseudobrasiliensis",
        tests: ["Partially Acid-Fast (+)", "Lysozyme (R)", "Casein (+)", "Tyrosine (+)", "Arylsulfatase (+)", "Highly neurotropic, disseminated infections in immunocompromised"]
      }
    ]
  },
  {
    id: "nocardia-otitidiscaviarum-group",
    question: "Casein Negative | Xanthine Negative | Tyrosine Variable | API 20C Trehalose +:",
    options: [
      {
        text: "Trehalose Assimilation Positive | Lysozyme Resistant | Amikacin Susceptible",
        nextStep: null,
        conclusion: "Nocardia otitidiscaviarum (formerly Nocardia caviae)",
        tests: ["Partially Acid-Fast (+)", "Lysozyme (R)", "Casein (-)", "Xanthine (-)", "Tyrosine (+/-)", "Trehalose (+)", "Infections of skin, ear, and respiratory tract"]
      }
    ]
  },
  {
    id: "rhodococcus-gordonia-tsukamurella-key",
    question: "Colony pigmentation, mucoid consistency, and Nitrate reduction:",
    options: [
      {
        text: "Salmon-pink to orange-red mucoid colonies (within 4-7 days) | Diphtheroid-like rods with zigzag configuration",
        nextStep: null,
        conclusion: "Rhodococcus equi",
        tests: ["Partially Acid-Fast (+)", "Salmon-pink Colony", "Lysozyme (v)", "Urea (v)", "Nitrate (+)", "Facultative intracellular in macrophages, cavitary pulmonary pneumonia in HIV/transplant"]
      },
      {
        text: "Dry, raised, adherent, orange-red or pink colonies | Nitrate Positive | Lysozyme Negative",
        nextStep: "gordonia-species-key"
      },
      {
        text: "Dry, white to creamy/orange colonies with rhizoid edges | Nitrate Negative | Lysozyme Resistant",
        nextStep: null,
        conclusion: "Tsukamurella paurometabola",
        tests: ["Partially Acid-Fast (+)", "Rhizoid Edge Colony", "Lysozyme (R)", "Urea (+)", "Nitrate (-)", "No aerial hyphae", "Opportunistic catheter-associated sepsis"]
      }
    ]
  },
  {
    id: "gordonia-species-key",
    question: "Gordonia Species Differentiation (colony properties & adherence):",
    options: [
      {
        text: "Smooth, highly mucoid colony adhering to media",
        nextStep: null,
        conclusion: "Gordonia sputi",
        tests: ["Partially Acid-Fast (+)", "Mucoid Adherent Colony", "Urea (+)", "Nitrate (+)", "Opportunistic wound/respiratory isolate"]
      },
      {
        text: "Dry, raised, folded, wrinkled pink/orange colony",
        nextStep: null,
        conclusion: "Gordonia bronchialis",
        tests: ["Partially Acid-Fast (+)", "Dry Raised Colony", "Urea (+)", "Nitrate (+)", "Sternal wound infections post-bypass surgery"]
      }
    ]
  },
  {
    id: "actinomycetes-non-acid-fast",
    question: "Aerial hyphae on tap water agar & microscopic chains of spores:",
    options: [
      {
        text: "Extensive branching with chains of spores (does not fragment easily) | Lysozyme Susceptible",
        nextStep: "streptomyces-species-key"
      },
      {
        text: "Moderate branching, short chains of spores, waxy molar tooth colonies | Lysozyme Susceptible",
        nextStep: "actinomadura-species-key"
      },
      {
        text: "Tapered branching filaments divided in transverse and longitudinal planes | Beta-hemolytic",
        nextStep: null,
        conclusion: "Dermatophilus congolensis",
        tests: ["Non-Acid Fast", "Transverse/Longitudinal Division", "Adherent grey-white to orange colony", "Beta-Hemolytic", "Exudative dermatitis with scab formation (dermatophilosis) in livestock and humans"]
      },
      {
        text: "Coarsely wrinkled and folded colonies with well-developed aerial mycelium | Lysozyme Susceptible",
        nextStep: null,
        conclusion: "Nocardiopsis dassonvillei",
        tests: ["Non-Acid Fast", "Coarsely Wrinkled Colony", "Urea (+)", "Nitrate (+)", "Extensive aerial hyphae", "Causes cutaneous actinomycetoma and skin infections"]
      }
    ]
  },
  {
    id: "streptomyces-species-key",
    question: "Streptomyces Species (Clinical origin & sand soil geographical associations):",
    options: [
      {
        text: "Isolated from cutaneous actinomycetoma in tropical/sandy regions (Africa, Mexico)",
        nextStep: null,
        conclusion: "Streptomyces somaliensis",
        tests: ["Non-Acid Fast", "Sandy Soil habitat", "Lysozyme (S)", "Urea (+/-)", "Nitrate (+/-)", "Draining sinus tracts with yellow/brown granules"]
      },
      {
        text: "Soil habitat, most common isolate in the United States | Opportunistic pericarditis/bacteremia",
        nextStep: null,
        conclusion: "Streptomyces anulatus",
        tests: ["Non-Acid Fast", "Most common US isolate", "Lysozyme (S)", "Earthy soil odor", "Usually non-pathogenic clinical contaminant"]
      }
    ]
  },
  {
    id: "actinomadura-species-key",
    question: "Actinomadura Species Differentiation (colony pigment & spore chain status):",
    options: [
      {
        text: "White-to-cream/pinkish waxy molar tooth colonies | Nitrate Positive | Causes red-granule or white-granule mycetoma",
        nextStep: null,
        conclusion: "Actinomadura madurae",
        tests: ["Non-Acid Fast", "Molar Tooth colony", "Nitrate (+)", "Urea (-)", "Gelatin (+)", "Causes Actinomycetoma (white-to-yellow granules)"]
      },
      {
        text: "Deep red/pink pigment | Nitrate Positive | Very fine spore chains | High prevalence in tropics",
        nextStep: null,
        conclusion: "Actinomadura pelletieri",
        tests: ["Non-Acid Fast", "Deep Red colony", "Nitrate (+)", "Urea (-)", "Causes Actinomycetoma with small, dark red granules"]
      }
    ]
  }
];
