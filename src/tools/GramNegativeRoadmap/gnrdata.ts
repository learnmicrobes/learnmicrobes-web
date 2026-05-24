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

export const gramNegativeRoadmap: RoadmapStep[] = [
  {
    id: "start",
    question: "Microscopic Morphology & Staining:",
    options: [
      {
        text: "Gram-Negative Rods or Coccobacilli",
        nextStep: "oxidase-gnr"
      },
      {
        text: "Gram-Negative Cocci or Diplococci",
        nextStep: "oxidase-gnc"
      }
    ]
  },

  // PATHWAY: Gram-negative cocci (Neisseria and Moraxella catarrhalis)
  {
    id: "oxidase-gnc",
    question: "Oxidase test, growth pattern, and rapid clues for Gram-negative cocci/diplococci:",
    options: [
      {
        text: "Oxidase Positive | Kidney-bean diplococci | Chocolate/selective media growth | Carbohydrate profile needed",
        nextStep: "neisseria-species-key"
      },
      {
        text: "Oxidase Positive | Diplococci | Butyrate esterase (+) | DNase (+) | Hockey-puck colony",
        nextStep: null,
        conclusion: "Moraxella catarrhalis",
        tests: ["Oxidase (+)", "Catalase (+)", "Butyrate esterase (+)", "DNase (+)", "No acid from glucose, maltose, lactose, or sucrose", "Nitrate reduction (+)", "Nitrite reduction (+)", "Beta-lactamase commonly positive", "Hockey-puck sliding colonies on SBA/chocolate", "Major cause of otitis media in children, sinusitis, and acute COPD exacerbations in adults"]
      },
      {
        text: "Oxidase Negative | Coccobacilli or cocci | Growth on MacConkey",
        nextStep: "oxidase-neg-gnc-nonfermenters"
      }
    ]
  },
  {
    id: "oxidase-neg-gnc-nonfermenters",
    question: "Key Differentiation for Oxidase-Negative Non-Fermentative Coccobacilli:",
    options: [
      {
        text: "Strictly Aerobic | Non-Motile | Penicillin Resistant | Glucose Non-Fermenter",
        nextStep: null,
        conclusion: "Acinetobacter baumannii",
        tests: ["Oxidase (-)", "MacConkey growth (+, exhibits slight pink-purple tint but is a non-fermenter)", "Strictly Aerobic", "Non-motile", "Multidrug-resistant (MDR) ICU pathogen associated with ventilator pneumonia and catheter line sepsis"]
      },
      {
        text: "Lysine Decarboxylase (LDC) Positive | DNase Positive | Rapid Maltose Oxidizer",
        nextStep: null,
        conclusion: "Stenotrophomonas maltophilia",
        tests: ["Oxidase (-)", "MacConkey growth (+)", "LDC (+)", "DNase (+)", "Rapid maltose oxidation", "Intrinsically resistant to carbapenems (imipenem); drug of choice is trimethoprim-sulfamethoxazole (SXT)"]
      }
    ]
  },
  {
    id: "neisseria-species-key",
    question: "Neisseria species key: carbohydrate utilization, ONPG, pigment, and clinical source:",
    options: [
      {
        text: "Glucose (+) | Maltose (-) | Lactose (-) | Sucrose (-) | STI or neonatal conjunctivitis source",
        nextStep: null,
        conclusion: "Neisseria gonorrhoeae",
        tests: ["Oxidase (+)", "Superoxol strong positive", "CTA/Rapid carbohydrate: Glucose (+), Maltose (-), Lactose (-), Sucrose (-)", "ONPG (-)", "Grows on chocolate and selective gonococcal media such as modified Thayer-Martin, Martin-Lewis, NYC, or JEMBEC systems", "Intracellular Gram-negative diplococci in symptomatic male urethral discharge is a clinically urgent smear finding", "Sexually transmitted pathogen causing urethritis, cervicitis, PID, epididymitis, disseminated infection, and neonatal conjunctivitis"]
      },
      {
        text: "Glucose (+) | Maltose (+) | Lactose (-) | Sucrose (-) | Blood/CSF, petechiae, or meningitis source",
        nextStep: null,
        conclusion: "Neisseria meningitidis",
        tests: ["Oxidase (+)", "Catalase (+)", "CTA/Rapid carbohydrate: Glucose (+), Maltose (+), Lactose (-), Sucrose (-)", "ONPG (-)", "Grows on blood and chocolate agar; may also grow on selective media", "Capsular serogroups include A, B, C, W, X, and Y", "Causes meningitis, meningococcemia, purpura fulminans, and Waterhouse-Friderichsen syndrome; urgent infection-control/public-health significance"]
      },
      {
        text: "Glucose (+) | Maltose (+) | Lactose (+) | ONPG (+) | Pediatric upper respiratory flora",
        nextStep: null,
        conclusion: "Neisseria lactamica",
        tests: ["Oxidase (+)", "Glucose (+)", "Maltose (+)", "Lactose (+)", "ONPG (+)", "May resemble N. meningitidis by glucose/maltose profile but lactose and ONPG separate it", "Common nonpathogenic upper respiratory flora, especially in children"]
      },
      {
        text: "Glucose (+) | Maltose (+) | Sucrose (+) | Dry wrinkled breadcrumb colonies",
        nextStep: null,
        conclusion: "Neisseria sicca",
        tests: ["Oxidase (+)", "Glucose (+)", "Maltose (+)", "Sucrose (+)", "Lactose (-)", "Dry, wrinkled, breadcrumb-like colonies", "Common upper respiratory flora; rare opportunistic endocarditis or invasive disease"]
      },
      {
        text: "Glucose (+) | Maltose (+) | Sucrose (+) | Mucoid colonies | Nitrate (+)",
        nextStep: null,
        conclusion: "Neisseria mucosa",
        tests: ["Oxidase (+)", "Glucose (+)", "Maltose (+)", "Sucrose (+)", "Lactose (-)", "Nitrate reduction (+)", "Mucoid colonies", "Upper respiratory flora; occasional opportunistic infection"]
      },
      {
        text: "Yellow-pigmented commensal Neisseria | Glucose and maltose usually (+) | Sucrose variable/positive",
        nextStep: null,
        conclusion: "Neisseria subflava / flavescens group",
        tests: ["Oxidase (+)", "Yellow pigment may be present", "Glucose (+)", "Maltose (+)", "Sucrose variable or positive depending on species", "Lactose (-)", "Upper respiratory flora; rare opportunistic invasive infection"]
      },
      {
        text: "Resembles N. gonorrhoeae but carbohydrate use weak or negative | Commensal respiratory isolate",
        nextStep: null,
        conclusion: "Neisseria cinerea",
        tests: ["Oxidase (+)", "May resemble N. gonorrhoeae phenotypically", "Glucose weak or negative depending on method", "Maltose (-)", "Lactose (-)", "Sucrose (-)", "Usually nonpathogenic respiratory flora; source and confirmatory method prevent overcalling gonorrhea"]
      },
      {
        text: "Glucose (+) | Maltose (+) | Sucrose (+) | Polysaccharide from sucrose",
        nextStep: null,
        conclusion: "Neisseria polysaccharea",
        tests: ["Oxidase (+)", "Glucose (+)", "Maltose (+)", "Sucrose (+)", "Produces polysaccharide from sucrose", "May resemble N. meningitidis without careful supplemental testing", "Upper respiratory flora; rare clinical significance"]
      }
    ]
  },

  // GRAM-NEGATIVE RODS PATHWAY ()
  {
    id: "oxidase-gnr",
    question: "Oxidase reaction in Gram-Negative Bacilli/Coccobacilli:",
    options: [
      {
        text: "Oxidase Positive (Purple spot within 10 seconds)",
        nextStep: "macconkey-growth-oxidase-pos"
      },
      {
        text: "Oxidase Negative (No color change)",
        nextStep: "macconkey-growth-oxidase-neg"
      }
    ]
  },

  // OXIDASE-POSITIVE GRAM-NEGATIVE RODS
  {
    id: "macconkey-growth-oxidase-pos",
    question: "Growth status on MacConkey Agar (Selective & Differential):",
    options: [
      {
        text: "Growth on MacConkey | Fermentative (Glucose OF tube Fermenting)",
        nextStep: "oxidase-pos-fermenters"
      },
      {
        text: "Growth on MacConkey | Non-fermentative (Glucose OF tube Oxidizing/Alkaline)",
        nextStep: "oxidase-pos-nonfermenters"
      },
      {
        text: "No Growth on MacConkey Agar (Fastidious/Capnophilic rods)",
        nextStep: "oxidase-pos-no-mac"
      }
    ]
  },
  {
    id: "oxidase-pos-no-mac",
    question: "Select organism grouping for Fastidious & Dysgonic Oxidase-Positive GNRs:",
    options: [
      {
        text: "Sphingomonas, Sphingobacterium, & Acidovorax facilis",
        nextStep: "fastidious-ch27"
      },
      {
        text: "Moraxella and Related Elongated Neisseria",
        nextStep: "fastidious-ch28"
      },
      {
        text: "Eikenella, Methylobacterium, Weeksella, & Bergeyella",
        nextStep: "fastidious-ch29"
      },
      {
        text: "Pasteurella and Suttonella",
        nextStep: "fastidious-ch30"
      },
      {
        text: "Dysgonic Capnophilic Rods (Actinobacillus, Aggregatibacter, Kingella, Cardiobacterium, Capnocytophaga, Dysgonomonas)",
        nextStep: "fastidious-ch31"
      },
      {
        text: "Haemophilus Species (X and V factor dependent, satellite phenomenon, porphyrin test)",
        nextStep: "fastidious-ch32"
      },
      {
        text: "Bartonella & Afipia (Fastidious small GNRs / Coccobacilli)",
        nextStep: "fastidious-ch33"
      },
      {
        text: "Campylobacter, Arcobacter, & Helicobacter (Curved, microaerophilic GNRs)",
        nextStep: "fastidious-ch34"
      },
      {
        text: "Legionella (Cysteine and iron dependent GNRs)",
        nextStep: "fastidious-ch35"
      },
      {
        text: "Brucella Species (Slow-growing zoonotic select agents)",
        nextStep: "fastidious-ch36"
      },
      {
        text: "Bordetella pertussis, parapertussis, & bronchiseptica",
        nextStep: "fastidious-ch37"
      },
      {
        text: "Francisella (Cysteine dependent, zoonotic select agents)",
        nextStep: "fastidious-ch38"
      },
      {
        text: "Streptobacillus moniliformis & Spirillum minus (Rat-bite fever agents)",
        nextStep: "fastidious-ch39"
      }
    ]
  },
  {
    id: "oxidase-pos-nonfermenters",
    question: "Select organism grouping for Oxidase-Positive GNR Non-Fermenters:",
    options: [
      {
        text: "Pseudomonas, Burkholderia, Ralstonia, Brevundimonas, Acidovorax, & Pandoraea",
        nextStep: "oxidase-pos-nonfermenters-ch22"
      },
      {
        text: "Rhizobium, Ochrobactrum, Shewanella, Psychrobacter, & Paracoccus",
        nextStep: "oxidase-pos-nonfermenters-ch23"
      },
      {
        text: "Elizabethkingia, Chryseobacterium, Sphingobacterium, Weeksella, & Myroides",
        nextStep: "oxidase-pos-nonfermenters-ch24"
      },
      {
        text: "Alcaligenes, Achromobacter, Bordetella (Non-pertussis), Delftia, Comamonas, & Oligella",
        nextStep: "oxidase-pos-nonfermenters-ch25"
      }
    ]
  },
  {
    id: "oxidase-pos-nonfermenters-ch22",
    question: "Select clinical phenotype grouping for Pseudomonas, Burkholderia & Similar:",
    options: [
      {
        text: "The Fluorescent Pseudomonads (Pyoverdin positive, ADH positive)",
        nextStep: "fluorescent-pseudomonads"
      },
      {
        text: "The Non-Fluorescent Pseudomonads (Dry wrinkled or flat brownish-yellow colonies)",
        nextStep: "nonfluorescent-pseudomonads"
      },
      {
        text: "Burkholderia Species (Earthy/soil odor, select agents, or CF pathogens)",
        nextStep: "burkholderia-species"
      },
      {
        text: "Brevundimonas & Ralstonia Species (Orange or white colonies, or slow mannitol oxidizers)",
        nextStep: "brevundimonas-ralstonia"
      },
      {
        text: "Acidovorax & Pandoraea Species (Rare GNRs, LDC negative, sparsely reactive)",
        nextStep: "acidovorax-pandoraea"
      }
    ]
  },
  {
    id: "fluorescent-pseudomonads",
    question: "Fluorescent Pseudomonads: Growth at 42°C, Gelatin Liquefaction, and clinical source:",
    options: [
      {
        text: "Grows at 42°C | Pyocyanin (blue-green) & Pyoverdin pigments | Grape-like sweet odor | Highly pathogenic",
        nextStep: null,
        conclusion: "Pseudomonas aeruginosa",
        tests: ["Oxidase (+)", "Pyocyanin (blue-green pigment) & Pyoverdine (fluorescent pigment)", "Grows at 42°C (+)", "Arginine Dihydrolase (+)", "Gelatinase (variable)", "Glucose non-fermenter", "Grape-sweet or corn tortilla-like odor", "Major agent of ventilator pneumonia, burn wound sepsis, swimmer's ear, ecthyma gangrenosum, and cystic fibrosis respiratory disease"]
      },
      {
        text: "NO Growth at 42°C | Gelatin Liquefaction Positive (+) | Pyoverdin positive | Grows at 4°C",
        nextStep: null,
        conclusion: "Pseudomonas fluorescens",
        tests: ["Oxidase (+)", "Pyoverdine (+) fluorescent pigment", "Grows at 42°C (-)", "Gelatin Liquefaction (+)", "Arginine Dihydrolase (+)", "Grows at 4°C (+)", "Environmental source (water/soil), rarely causes opportunistic bacteremia or transfusion-associated septic shock from contaminated refrigerated blood bags"]
      },
      {
        text: "NO Growth at 42°C | Gelatin Liquefaction Negative (-) | Pyoverdin positive | Grows at 4°C",
        nextStep: null,
        conclusion: "Pseudomonas putida",
        tests: ["Oxidase (+)", "Pyoverdine (+) fluorescent pigment", "Grows at 42°C (-)", "Gelatin Liquefaction (-)", "Arginine Dihydrolase (+)", "Grows at 4°C (+)", "Differentiated from P. fluorescens by negative gelatin liquefaction; rare opportunistic pathogen"]
      }
    ]
  },
  {
    id: "nonfluorescent-pseudomonads",
    question: "Non-Fluorescent Pseudomonads: Colony morphology, pigmentation, and Nitrate Reduction:",
    options: [
      {
        text: "Colonies dry, wrinkled, adherent, buff to brown | Nitrate Reduction Positive (+) to nitrogen gas | ADH Negative (-)",
        nextStep: null,
        conclusion: "Pseudomonas stutzeri",
        tests: ["Oxidase (+)", "Dry, wrinkled, tough, adherent colonies ('breadcrumb' appearance)", "Nitrate Reduction (+, reduces to nitrogen gas)", "Arginine Dihydrolase (-)", "Lysine Decarboxylase (-)", "Urea Hydrolysis (variable)", "Mannitol (+), Xylose (+)", "Causes opportunistic bacteremia, endocarditis, and UTIs in compromised patients"]
      },
      {
        text: "Colonies smooth, flat, nonwrinkled, brownish-yellow pigment | Nitrate Reduction Positive (+) to nitrogen gas | ADH Positive (+)",
        nextStep: null,
        conclusion: "Pseudomonas mendocina",
        tests: ["Oxidase (+)", "Smooth, flat, brownish-yellow colonies (due to carotenoid pigment)", "Nitrate Reduction (+, reduces to gas)", "Arginine Dihydrolase (+)", "Gelatinase (-)", "Mannitol (-), Xylose (+)", "Rare opportunistic isolate; associated with endocarditis"]
      }
    ]
  },
  {
    id: "burkholderia-species",
    question: "Burkholderia Species: Motility, colony morphology, select agent status, and clinical keys:",
    options: [
      {
        text: "Motile | Lysine Decarboxylase (LDC) Positive | Dirt-like odor | Sputum of cystic fibrosis patients",
        nextStep: null,
        conclusion: "Burkholderia cepacia complex",
        tests: ["Oxidase (weak +)", "Lysine Decarboxylase (+, 80% of strains)", "Dirt-like soil odor", "Onion bulb rot environmental link", "Grows on selective media (PC / OFPBL agar) forming pink/yellow colonies", "Highly transmissible and life-threatening pathogen in cystic fibrosis and chronic granulomatous disease"]
      },
      {
        text: "Motile | Wrinkled dry violet-purple colonies on Ashdown agar | Colistin Resistant | Melioidosis select agent",
        nextStep: null,
        conclusion: "Burkholderia pseudomallei",
        tests: ["Oxidase (+)", "Wrinkled, dry colonies on SBA", "Ashdown Agar: Dry wrinkled violet-purple colonies", "Intrinsic resistance to Colistin & Polymyxin B (highly unusual for GNRs)", "Earthy odor", "Causative agent of Melioidosis (Southeast Asia and Northern Australia); Tier 1 Select Agent / Biowarfare threat"]
      },
      {
        text: "Strictly NON-MOTILE coccobacillus | Growth at 42°C Negative | Causes Glanders in equines | Tier 1 select agent",
        nextStep: null,
        conclusion: "Burkholderia mallei",
        tests: ["Oxidase (+)", "Strictly Non-Motile (unique among Burkholderia/Pseudomonas)", "Nitrate Reduction (+)", "Gelatinase (-)", "Arginine Dihydrolase (+)", "Glucose (+), Lactose (variable)", "Causative agent of Glanders in equines; highly dangerous zoonosis; Tier 1 Select Agent"]
      }
    ]
  },
  {
    id: "brevundimonas-ralstonia",
    question: "Brevundimonas & Ralstonia: Colony pigment, growth rate, and mannitol oxidation:",
    options: [
      {
        text: "Chalk white colonies | Extremely slow/weak glucose oxidizer | Xylose Negative | ADH Negative",
        nextStep: null,
        conclusion: "Brevundimonas diminuta",
        tests: ["Oxidase (+)", "Chalk white colonies on SBA", "Extremely slow glucose oxidation", "Xylose (-)", "Arginine Dihydrolase (-)", "Non-fermenter, rarely clinically significant opportunistic pathogen"]
      },
      {
        text: "Orange-pigmented colonies | Slow/weak glucose oxidizer | Xylose Positive/Variable | 66% grow on MacConkey",
        nextStep: null,
        conclusion: "Brevundimonas vesicularis",
        tests: ["Oxidase (+)", "Orange pigment on SBA", "Slow/weak glucose oxidation", "Xylose (variable)", "Only 66% grow on MacConkey agar", "Rare cause of bacteremia in immunocompromised patients"]
      },
      {
        text: "Slow growing (up to 72h) | Urease Positive | Mannitol Oxidation Negative (-) | Contaminated sterile solutions",
        nextStep: null,
        conclusion: "Ralstonia pickettii",
        tests: ["Oxidase (+)", "Slow growing (requires 48-72 hours for visible colonies)", "Urease (+)", "Mannitol Oxidation (-)", "Nitrate Reduction (+)", "Glucose (+), Xylose (+)", "Associated with nosocomial outbreaks due to contaminated sterile saline, water, and pharmaceuticals"]
      },
      {
        text: "Slow growing | Urease Positive | Mannitol Oxidation Positive (+) | CF patient / dialysis isolate",
        nextStep: null,
        conclusion: "Ralstonia mannitolilytica",
        tests: ["Oxidase (+)", "Slow growing", "Urease (+)", "Mannitol Oxidation (+, distinguishes it from R. pickettii)", "Associated with contaminated medical devices, water systems, and dialysis filters"]
      }
    ]
  },
  {
    id: "acidovorax-pandoraea",
    question: "Acidovorax & Pandoraea: Glucose oxidation, LDC status, and gelatinase liquefaction:",
    options: [
      {
        text: "Glucose Oxidizer | LDC Negative | Gelatinase Negative | ADH Positive | Non-wrinkled",
        nextStep: null,
        conclusion: "Acidovorax delafieldii / temperans",
        tests: ["Oxidase (+)", "Glucose Oxidation (+)", "LDC (-)", "ADH (+ or variable)", "Gelatinase (-)", "Rare environmental opportunist, low clinical virulence"]
      },
      {
        text: "Weak Glucose Oxidizer | LDC Negative | Gelatinase Negative | ADH Negative | Tween 80 negative",
        nextStep: null,
        conclusion: "Pandoraea spp.",
        tests: ["Oxidase (+, weak)", "Glucose Oxidation (weak +)", "LDC (-)", "Gelatinase (-)", "Tween 80 hydrolysis (-)", "Differentiated from B. cepacia complex by negative LDC and negative gelatinase", "Emerging opportunistic pathogen in cystic fibrosis patients"]
      }
    ]
  },
  {
    id: "oxidase-pos-nonfermenters-ch23",
    question: "Environmental and Zoonotic GNRs/Coccobacilli:",
    options: [
      {
        text: "Hydrogen Sulfide (H2S) Positive in TSI butt | Lavender greening of blood agar | Soluble brown/tan pigment",
        nextStep: null,
        conclusion: "Shewanella putrefaciens",
        tests: ["Oxidase (+)", "H2S production (+, produces blackening in TSI butt - extremely rare for non-fermenters)", "Lavender greening on blood agar", "Soluble brown to tan pigment", "Grows on MacConkey (NLF)", "Environmental and food associate, rarely causes cellulitis, otitis media, or bacteremia"]
      },
      {
        text: "Catheter associate | Sticky/Mucoid | ONPG/beta-galactosidase Positive (+)",
        nextStep: null,
        conclusion: "Rhizobium radiobacter",
        tests: ["Oxidase (+)", "ONPG / beta-galactosidase (+, distinguishes it from Ochrobactrum)", "Grows on MacConkey (NLF, mucoid pink after 48h)", "Esculin hydrolysis (+)", "Urease (+)", "Associated with contaminated medical devices (peritoneal and IV catheters) in compromised hosts"]
      },
      {
        text: "Catheter associate | Intrinsically highly drug resistant | ONPG Negative (-)",
        nextStep: null,
        conclusion: "Ochrobactrum anthropi",
        tests: ["Oxidase (+)", "ONPG / beta-galactosidase (-)", "Urease (+)", "Grows on MacConkey (NLF)", "Highly resistant to all penicillins and cephalosporins; susceptible to imipenem and SXT", "Propensity to adhere to silicone catheters, causing bacteremia in oncology or debilitated patients"]
      },
      {
        text: "Animal contact / Bite wounds | Popcorn odor | Nitrate reduction positive without gas/color",
        nextStep: null,
        conclusion: "CDC group EF-4b",
        tests: ["Oxidase (+)", "Popcorn odor", "Coccobacillus, fails to grow on MacConkey agar", "Catalase (+)", "Glucose oxidizer", "Nitrate reduction is positive without gas and without color after zinc addition (converts all nitrate to end products beyond nitrite)", "Associated with animal bite wounds (dogs and cats) causing cellulitis"]
      },
      {
        text: "Doughnut 'O' shape on Gram stain | Mucoid growth | Coccobacillus",
        nextStep: null,
        conclusion: "Paracoccus yeei",
        tests: ["Oxidase (+)", "Doughnut-shaped coccobacilli on Gram stain (clear centers)", "Mucoid growth on SBA", "Grows on MacConkey (NLF)", "Urease (+), Esculin (-)", "Rarely isolated from human clinical specimens; identified in cases of peritonitis"]
      },
      {
        text: "Grows poorly at 35°C (grows best at 20-25°C) | Rose-like odor | Saccharolytic",
        nextStep: null,
        conclusion: "Psychrobacter immobilis",
        tests: ["Oxidase (+)", "Grows poorly at 35°C (optimal temperature is 20°C)", "Rose-like odor (saccharolytic strains)", "Coccobacillus, grows on MacConkey (NLF)", "Rare cause of human meningitis or catheter site infections in cold climates"]
      }
    ]
  },
  {
    id: "oxidase-pos-nonfermenters-ch24",
    question: "Yellow-Pigmented Non-Fermentative Oxidase-Positive GNRs:",
    options: [
      {
        text: "Indole Positive | Large, smooth, shiny colonies (non-pigmented or slightly yellow) | Neonatal meningitis",
        nextStep: null,
        conclusion: "Elizabethkingia meningoseptica",
        tests: ["Oxidase (+)", "Indole (+)", "Gelatinase (+)", "DNase (+)", "Esculin hydrolysis (+)", "Large, smooth, shiny colonies, usually non-pigmented or only slightly yellow", "Causative agent of severe, high-mortality neonatal meningitis and pediatric nursery outbreaks"]
      },
      {
        text: "Indole Positive | Bright dark yellow pigment (flexirubin) | Turns red upon 20% KOH addition",
        nextStep: null,
        conclusion: "Chryseobacterium indologenes",
        tests: ["Oxidase (+)", "Indole (+)", "Gelatinase (+)", "Flexirubin yellow pigment (turns red/purple when 20% KOH is applied)", "Esculin hydrolysis (variable)", "Grows on MacConkey (NLF)", "Opportunistic catheter-related bacteremia in patients with malignancies"]
      },
      {
        text: "Indole Negative | Urease Positive | Fruity odor | Yellow spreading colonies",
        nextStep: null,
        conclusion: "Myroides odoratus",
        tests: ["Oxidase (+)", "Indole (-)", "Urease (+)", "Fruity/odor of pears or apples", "Yellow-pigmented colonies that tend to spread on blood agar", "Grows on MacConkey (NLF)", "Rare cause of urinary tract or wound infections in compromised patients"]
      },
      {
        text: "Indole Negative | Urease Positive | Sphingophospholipids in membrane | Pale yellow",
        nextStep: null,
        conclusion: "Sphingobacterium multivorum",
        tests: ["Oxidase (+)", "Indole (-)", "Urease (+)", "Sphingophospholipids in cell wall/membrane", "Pale yellow colonies on SBA", "Grows on MacConkey (NLF)", "Rare opportunist, low pathogenic virulence"]
      },
      {
        text: "Genitourinary isolate | Slimy, mucoid colonies | Yellow-green pigment | Non-motile",
        nextStep: null,
        conclusion: "Weeksella virosa",
        tests: ["Oxidase (+)", "Mucoid, slimy colonies with a yellow-green pigment", "Grows on MacConkey agar (NLF)", "Indole (+), Urease (+)", "Genitourinary tract isolate, most commonly in women; clinical significance is usually low"]
      }
    ]
  },
  {
    id: "oxidase-pos-nonfermenters-ch25",
    question: "Peritrichous vs. Polar Flagellated Oxidase-Positive GNRs:",
    options: [
      {
        text: "Peritrichous flagella | Rapidly Urease Positive (in 4 hours) | Zoonotic contact | Popcorn-like or no odor",
        nextStep: null,
        conclusion: "Bordetella bronchiseptica",
        tests: ["Oxidase (+)", "Urease (+, rapidly positive within 4 hours)", "Motile by peritrichous flagella", "Grows on MacConkey (NLF)", "Zoonotic exposure (dogs, cats, rabbits); causes opportunistic pneumonia and whooping-cough-like illness in compromised patients"]
      },
      {
        text: "Peritrichous flagella | Feather-edged colonies | Fruity apple/strawberry odor | Nitrite-to-gas positive",
        nextStep: null,
        conclusion: "Alcaligenes faecalis",
        tests: ["Oxidase (+)", "Feather-edged colonies surrounded by a green discoloration zone", "Highly characteristic fruity odor resembling apples or strawberries", "Motile by peritrichous flagella", "Grows on MacConkey (NLF)", "Nitrate Reduction (-), but reduces nitrite to nitrogen gas (+)", "Common environmental contaminant; causes opportunistic bacteremia and UTIs"]
      },
      {
        text: "Peritrichous flagella | Nitrate and Nitrite reduced to gas | Glucose Oxidizer | CF pathogen",
        nextStep: null,
        conclusion: "Achromobacter xylosoxidans",
        tests: ["Oxidase (+)", "Nitrate and Nitrite reduced to nitrogen gas (+)", "Motile by peritrichous flagella", "Grows on MacConkey (NLF)", "Glucose Oxidation (+), Xylose Oxidation (+)", "Increasingly recovered from the sputum of patients with cystic fibrosis; causes opportunistic infections"]
      },
      {
        text: "Polar flagella (>2) | Indole Positive but produces orange/yellow color with Kovac's reagent",
        nextStep: null,
        conclusion: "Delftia acidovorans",
        tests: ["Oxidase (+)", "Polar flagella (>2)", "Grows on MacConkey (NLF)", "Indole test: produces a unique orange/yellow color when Kovac's reagent is added to tryptone broth", "Mannitol (+)", "Rarely clinically significant; opportunistic pathogen"]
      },
      {
        text: "Polar flagella (>2) | Indole Negative | Mannitol negative | Comamonas species",
        nextStep: null,
        conclusion: "Comamonas testosteroni / spp.",
        tests: ["Oxidase (+)", "Polar flagella (>2)", "Grows on MacConkey (NLF)", "Indole (-)", "Mannitol (-)", "Nitrate Reduction (+)", "Rarely clinically significant opportunistic pathogen"]
      },
      {
        text: "Coccobacilli | Urinary tract isolates | Oligella urethralis (nonmotile) vs O. ureolytica (motile/urease positive)",
        nextStep: "oligella-species"
      }
    ]
  },
  {
    id: "oligella-species",
    question: "Oligella Species: Motility and Urease activity:",
    options: [
      {
        text: "Nonmotile | Urease Negative (-) | Nitrate Reductase Negative (-)",
        nextStep: null,
        conclusion: "Oligella urethralis",
        tests: ["Oxidase (+)", "Nonmotile", "Urease (-)", "Nitrate reduction (-)", "Coccobacillus, grows on MacConkey (NLF)", "Isolated predominantly from the human urinary tract; low clinical virulence"]
      },
      {
        text: "Motile (peritrichous) | Rapidly Urease Positive (+) | Nitrate Reductase Positive (+)",
        nextStep: null,
        conclusion: "Oligella ureolytica",
        tests: ["Oxidase (+)", "Motile by peritrichous flagella", "Urease (+, rapidly positive within minutes)", "Nitrate reduction (+)", "Coccobacillus, grows on MacConkey (NLF)", "Isolated from the human urinary tract, joint fluid, or blood in catheterized patients"]
      }
    ]
  },
  {
    id: "oxidase-pos-fermenters",
    question: "Select grouping for Oxidase-Positive GNR Fermenters:",
    options: [
      {
        text: "Halophilic Vibrio Species | Require sodium chloride (NaCl) to grow | Grow well on TCBS agar",
        nextStep: "halophilic-vibrio-species"
      },
      {
        text: "Non-Halophilic Vibrio Species | Do NOT require NaCl to grow | TCBS growth positive",
        nextStep: "nonhalophilic-vibrio-species"
      },
      {
        text: "Aeromonas & Plesiomonas | Non-halophilic | Freshwater or soil associates | Grow on routine media",
        nextStep: "aeromonas-plesiomonas-species"
      },
      {
        text: "Chromobacterium violaceum | Produces dark violet/purple pigment (violacein) | Almond-like cyanide odor",
        nextStep: null,
        conclusion: "Chromobacterium violaceum",
        tests: ["Oxidase (+ or variable)", "Produces violacein (ethanol-soluble dark violet/purple pigment)", "Almond-like cyanide odor", "Grows on MacConkey (NLF)", "Glucose Fermenter (+)", "Nitrate Reduction (+)", "Acquired by exposure of disrupted skin to contaminated soil or tropical water; causes high-mortality systemic abscesses and septic shock"]
      }
    ]
  },
  {
    id: "halophilic-vibrio-species",
    question: "Halophilic Vibrio Species: Sucrose fermentation (TCBS colony color), lactose fermentation, and clinical key:",
    options: [
      {
        text: "Sucrose Fermentation Negative (Green colonies on TCBS) | Lactose Fermentation Negative (-) | Oysters / Gastroenteritis",
        nextStep: null,
        conclusion: "Vibrio parahaemolyticus",
        tests: ["Oxidase (+)", "Halophilic (requires NaCl)", "TCBS Agar: Green colonies (sucrose -)", "Lactose Fermentation (-)", "O/129: Sensitive", "Ingestion of undercooked seafood (oysters), causing acute gastroenteritis or wound infections"]
      },
      {
        text: "Sucrose Fermentation Negative (Green colonies on TCBS) | Lactose Fermentation Positive (+) | Sepsis / Liver disease",
        nextStep: null,
        conclusion: "Vibrio vulnificus",
        tests: ["Oxidase (+)", "Halophilic (requires NaCl)", "TCBS Agar: Green colonies (sucrose -; 85% of strains)", "Lactose Fermentation (+, unique among vibrios)", "O/129: Sensitive", "Highly virulent pathogen causing devastating wound infections (necrotizing fasciitis) and fatal septicemia in patients with liver disease or iron overload"]
      },
      {
        text: "Sucrose Fermentation Positive (Yellow colonies on TCBS) | Highly Halophilic (Grows in 10% NaCl) | Ear/wound infections",
        nextStep: null,
        conclusion: "Vibrio alginolyticus",
        tests: ["Oxidase (+)", "Highly Halophilic (survives and grows in up to 10% NaCl)", "TCBS Agar: Yellow colonies (sucrose +)", "O/129: Sensitive", "Ear infections (otitis externa) and wound infections following exposure to marine water"]
      },
      {
        text: "Sucrose Fermentation Positive (Yellow colonies on TCBS) | Gas from Glucose Positive (+) | O/129 Sensitive",
        nextStep: null,
        conclusion: "Vibrio fluvialis / furnissii",
        tests: ["Oxidase (+)", "Halophilic", "TCBS Agar: Yellow colonies (sucrose +)", "Gas from glucose: positive (V. furnissii) or negative (V. fluvialis)", "O/129: Sensitive", "Gastroenteritis from contaminated seafood"]
      }
    ]
  },
  {
    id: "nonhalophilic-vibrio-species",
    question: "Non-Halophilic Vibrio: Sucrose fermentation (TCBS colony color) and O1/O139 serology:",
    options: [
      {
        text: "Sucrose Fermentation Positive (Yellow colonies on TCBS) | Cholera toxin positive | Profuse watery diarrhea",
        nextStep: null,
        conclusion: "Vibrio cholerae",
        tests: ["Oxidase (+)", "Non-halophilic (grows in 0% NaCl)", "TCBS Agar: Yellow colonies (sucrose +)", "O1 or O139 Serology (+, toxigenic strains)", "Produces cholera toxin, causing profuse 'rice-water' stools, severe dehydration, and high mortality if untreated"]
      },
      {
        text: "Sucrose Fermentation Negative (Green colonies on TCBS) | Cholera toxin negative | Gastroenteritis",
        nextStep: null,
        conclusion: "Vibrio mimicus",
        tests: ["Oxidase (+)", "Non-halophilic (grows in 0% NaCl)", "TCBS Agar: Green colonies (sucrose -, distinguishes from V. cholerae)", "O/129: Sensitive", "Gastroenteritis and ear infections following seafood ingestion or water exposure"]
      }
    ]
  },
  {
    id: "aeromonas-plesiomonas-species",
    question: "Aeromonas & Plesiomonas: O/129 susceptibility, DNase, and Decarboxylase status:",
    options: [
      {
        text: "O/129 Resistant | DNase Positive | Fresh water associate | Cellulitis",
        nextStep: null,
        conclusion: "Aeromonas hydrophila complex",
        tests: ["Oxidase (+)", "Glucose Fermenter", "O/129: Resistant (distinguishes from Vibrio/Plesiomonas)", "DNase (+)", "Freshwater habitat", "Diarrheal illness, cellulitis from water exposure, and medicinal leech therapy infections"]
      },
      {
        text: "O/129 Sensitive | DNase Negative | Decarboxylates Lysine, Arginine, & Ornithine | Gastroenteritis",
        nextStep: null,
        conclusion: "Plesiomonas shigelloides",
        tests: ["Oxidase (+)", "Glucose Fermenter", "O/129: Sensitive", "DNase (-)", "Decarboxylates Lysine, Arginine, and Ornithine (+/+/+)", "Clusters with Proteus by 16S rRNA but remains oxidase positive; freshwater associate causing gastroenteritis"]
      }
    ]
  },

  // OXIDASE-NEGATIVE GRAM-NEGATIVE RODS (Enterobacteriaceae & Friends)
  {
    id: "macconkey-growth-oxidase-neg",
    question: "Growth on MacConkey Agar (Oxidase-Negative GNRs):",
    options: [
      {
        text: "Growth on MacConkey Agar (Typical Enterobacteriaceae & active rods)",
        nextStep: "mac-growth-neg-pathway"
      },
      {
        text: "No Growth on MacConkey Agar (Highly Fastidious / Capnophilic coccobacilli)",
        nextStep: "no-mac-oxidase-neg"
      }
    ]
  },
  {
    id: "no-mac-oxidase-neg",
    question: "Select organism grouping for Fastidious & Dysgonic Oxidase-Negative GNRs:",
    options: [
      {
        text: "Haemophilus Species (X and V factor dependent, satellite phenomenon, porphyrin test)",
        nextStep: "fastidious-ch32"
      },
      {
        text: "Bartonella (Oxidase Negative, extremely slow-growing GNRs)",
        nextStep: "fastidious-ch33"
      },
      {
        text: "Legionella (Cysteine and iron dependent GNRs)",
        nextStep: "fastidious-ch35"
      },
      {
        text: "Bordetella Species (Oxidase Negative pertussis/parapertussis routes)",
        nextStep: "fastidious-ch37"
      },
      {
        text: "Francisella (Cysteine dependent, zoonotic select agents)",
        nextStep: "fastidious-ch38"
      },
      {
        text: "Streptobacillus moniliformis & Spirillum minus (Rat-bite fever agents)",
        nextStep: "fastidious-ch39"
      }
    ]
  },
  {
    id: "mac-growth-neg-pathway",
    question: "Lactose Fermentation on MacConkey Agar (Pink/Red vs. Colorless):",
    options: [
      {
        text: "Lactose Fermenter (LF) | Hot pink to red colonies with precipitated bile salts",
        nextStep: "lactose-fermenters-pathway"
      },
      {
        text: "Non-Lactose Fermenter (NLF) | Pale, translucent, colorless colonies",
        nextStep: "non-lactose-fermenters-pathway"
      }
    ]
  },

  // LACTOSE FERMENTERS PATHWAY
  {
    id: "lactose-fermenters-pathway",
    question: "IMViC profile (Indole, Citrate, Methyl Red, Voges-Proskauer):",
    options: [
      {
        text: "Indole Positive | Citrate Negative | Methyl Red Positive | VP Negative",
        nextStep: "lf-indole-pos-citrate-neg"
      },
      {
        text: "Indole Negative | Citrate Positive | Methyl Red Negative | VP Positive",
        nextStep: "lf-indole-neg-citrate-pos"
      },
      {
        text: "Late Lactose Fermenter | Citrate Positive | H2S Positive | LDC Negative",
        nextStep: null,
        conclusion: "Citrobacter freundii",
        tests: ["Late LF (translucent at 24h, light pink at 48h)", "H2S (+)", "Citrate (+)", "Indole (v)", "LDC (-)", "ADH (-)", "ODC (-)", "Inducible AmpC chromosomal beta-lactamase; causes opportunistic UTIs and sepsis"]
      },
      {
        text: "Late Lactose Fermenter | Citrate Positive | H2S Negative | Indole Positive | ODC Positive",
        nextStep: null,
        conclusion: "Citrobacter koseri",
        tests: ["Late LF", "H2S (-)", "Indole (+)", "Citrate (+)", "ODC (+)", "LDC (-)", "Associated with neonatal brain abscesses and meningitis outbreaks in nurseries"]
      }
    ]
  },
  {
    id: "lf-indole-pos-citrate-neg",
    question: "Motility Profile for Indole-Positive / Citrate-Negative LFs:",
    options: [
      {
        text: "Motile | Lysine Decarboxylase (LDC) Positive | Flat dry colonies with precipitated bile",
        nextStep: null,
        conclusion: "Escherichia coli",
        tests: ["LF (flat, dry pink colonies)", "Spot Indole (+)", "Citrate (-)", "LDC (+)", "MR (+), VP (-)", "Motile (+)", "TSI: A/A + Gas", "Most common cause of community-acquired UTIs and nosocomial GNR bacteremias", "Pathotypes include UPEC, MNEC (K1 capsule +), ETEC (watery traveler's diarrhea), and STEC/EHEC O157:H7 (sorbitol negative, causes HUS)"]
      },
      {
        text: "Non-Motile | LDC Positive | Mucoid colonies | Intrinsically resistant to Ampicillin",
        nextStep: null,
        conclusion: "Klebsiella oxytoca",
        tests: ["LF (mucoid)", "Indole (+)", "Citrate (+)", "LDC (+)", "Non-motile", "VP (+)", "Ampicillin (R, intrinsic)", "Identical to K. pneumoniae except Indole (+); causes lobar pneumonia and antibiotic-associated hemorrhagic colitis (cytotoxigenic strains)"]
      }
    ]
  },
  {
    id: "lf-indole-neg-citrate-pos",
    question: "Motility, Decarboxylases (LDC, ADH, ODC), & Urease:",
    options: [
      {
        text: "Non-Motile | Mucoid colonies | LDC Positive | ADH Negative | Urease Positive",
        nextStep: null,
        conclusion: "Klebsiella pneumoniae",
        tests: ["LF (highly mucoid colonies)", "Indole (-)", "Citrate (+)", "LDC (+)", "Non-motile", "Urease (+)", "TSI: A/A + Gas", "Currant-jelly sputum, necrotizing lobar pneumonia", "Ampicillin (R, intrinsic)", "Commonly harbors plasmid-mediated ESBLs and carbapenemases (KPC)"]
      },
      {
        text: "Motile | LDC Positive | ADH Negative | ODC Positive | Urease Negative",
        nextStep: null,
        conclusion: "Enterobacter aerogenes",
        tests: ["LF (slightly mucoid)", "Indole (-)", "Citrate (+)", "LDC (+)", "ADH (-)", "ODC (+)", "Motile", "VP (+)", "Associated with medical device contamination, respirators, and ICU bacteremia"]
      },
      {
        text: "Motile | LDC Negative | ADH Positive | ODC Positive | Urease Variable",
        nextStep: null,
        conclusion: "Enterobacter cloacae",
        tests: ["LF", "Indole (-)", "Citrate (+)", "LDC (-)", "ADH (+)", "ODC (+)", "Motile", "VP (+)", "AmpC inducible chromosome-mediated resistance; significant agent of ICU urinary and respiratory sepsis"]
      },
      {
        text: "Motile | ADH Positive | ODC Positive | Yellow-pigmented colonies enhanced at 25°C",
        nextStep: null,
        conclusion: "Cronobacter sakazakii",
        tests: ["LF (yellow pigment at 25°C)", "Voges-Proskauer (+)", "ADH (+)", "ODC (+)", "Sorbitol (-)", "Rhamnose (+)", "Pathogen associated with powdered infant formula; causes fatal neonatal meningitis, necrotizing colitis, and sepsis"]
      }
    ]
  },

  // NON-LACTOSE FERMENTERS PATHWAY
  {
    id: "non-lactose-fermenters-pathway",
    question: "Phenylalanine Deaminase (PAD / PPA) reaction:",
    options: [
      {
        text: "PAD Positive (Green color upon adding ferric chloride to slant)",
        nextStep: "nlf-pad-positive"
      },
      {
        text: "PAD Negative (No color change with ferric chloride)",
        nextStep: "nlf-pad-negative"
      }
    ]
  },
  {
    id: "nlf-pad-positive",
    question: "Swarming Phenotype on SBA/CHOC (Proteeae tribe):",
    options: [
      {
        text: "Swarming Positive (Waves of thin concentric growth spreading on agar)",
        nextStep: "nlf-pad-swarming"
      },
      {
        text: "Swarming Negative (Typical discrete, non-spreading colonies)",
        nextStep: "nlf-pad-nonswarming"
      }
    ]
  },
  {
    id: "nlf-pad-swarming",
    question: "Indole, H2S production, and Ornithine Decarboxylase (ODC) status:",
    options: [
      {
        text: "Indole Negative | H2S Positive | Urease Positive | ODC Positive | K/A H2S+ TSI",
        nextStep: null,
        conclusion: "Proteus mirabilis",
        tests: ["NLF (swarming)", "Indole (-)", "PAD (+)", "Urease (+, rapid)", "H2S (+)", "ODC (+)", "TSI: K/A + H2S", "Distinct foul chocolate cake odor", "Alkalizes urine via urease, promoting precipitation of struvite kidney stones ('staghorn calculi')"]
      },
      {
        text: "Indole Positive | H2S Positive | Urease Positive | ODC Negative | A/A H2S+ TSI",
        nextStep: null,
        conclusion: "Proteus vulgaris",
        tests: ["NLF (swarming)", "Indole (+)", "PAD (+)", "Urease (+)", "H2S (+)", "ODC (-)", "TSI: A/A + H2S (ferments sucrose)", "Opportunistic wound and urinary tract pathogen"]
      },
      {
        text: "Indole Negative | H2S Negative | Urease Positive | ODC Negative | Sucrose Positive",
        nextStep: null,
        conclusion: "Proteus penneri",
        tests: ["NLF (swarming)", "Indole (-)", "PAD (+)", "Urease (+)", "H2S (-)", "ODC (-)", "Sucrose (+)", "Maltose (-)", "Common cause of catheter-associated UTIs and decubitus wound sepsis"]
      }
    ]
  },
  {
    id: "nlf-pad-nonswarming",
    question: "Indole, Citrate, ODC, and Adonitol fermentation:",
    options: [
      {
        text: "Indole Positive | Urease Positive | Citrate Negative | ODC Positive | ADH/LDC Negative",
        nextStep: null,
        conclusion: "Morganella morganii",
        tests: ["NLF (non-swarming)", "PAD (+)", "Indole (+)", "Urease (+)", "Citrate (-)", "ODC (+)", "LDC/ADH (-)", "Commonly isolated GNR in clinical specimens; associated with summer diarrhea and UTIs"]
      },
      {
        text: "Indole Positive | Urease Positive | Citrate Positive | ODC Negative | Adonitol Positive",
        nextStep: null,
        conclusion: "Providencia rettgeri",
        tests: ["NLF", "PAD (+)", "Indole (+)", "Citrate (+)", "Urease (+)", "ODC (-)", "Adonitol (+)", "Pathogen of urinary tract, especially in catheterized geriatric patients"]
      },
      {
        text: "Indole Positive | Urease Negative/Weak | Citrate Positive | ODC Negative | Adonitol Negative",
        nextStep: null,
        conclusion: "Providencia stuartii",
        tests: ["NLF", "PAD (+)", "Indole (+)", "Citrate (+)", "Urease (- or weak)", "ODC (-)", "Adonitol (-)", "Highly associated with burn unit outbreaks; demonstrates extensive multidrug resistance patterns"]
      }
    ]
  },
  {
    id: "nlf-pad-negative",
    question: "Hydrogen Sulfide (H2S) production in PAD-Negative NLFs:",
    options: [
      {
        text: "H2S Positive (Black precipitate in TSI/LIA butt or HE/XLD colonies)",
        nextStep: "nlf-pad-neg-h2s-pos"
      },
      {
        text: "H2S Negative (No blackening of agar)",
        nextStep: "nlf-pad-neg-h2s-neg"
      }
    ]
  },
  {
    id: "nlf-pad-neg-h2s-pos",
    question: "Indole, Citrate, and Decarboxylase (LDC, ODC, ADH) profiles:",
    options: [
      {
        text: "Indole Negative | Citrate Positive | LDC Positive | ODC Positive | K/A H2S+ TSI",
        nextStep: null,
        conclusion: "Salmonella enterica (non-Typhi)",
        tests: ["NLF", "H2S (+)", "Indole (-)", "Citrate (+)", "LDC (+)", "ODC (+)", "ADH (-)", "TSI: K/A + H2S", "HE Agar: Green with black center", "XLD Agar: Red with black center", "Ingestion of contaminated poultry, eggs, or reptile contact; causes acute gastroenteritis"]
      },
      {
        text: "Indole Negative | Citrate Negative | LDC Positive | ADH/ODC Negative | Weak/mustache H2S",
        nextStep: null,
        conclusion: "Salmonella enterica serovar Typhi",
        tests: ["NLF", "H2S (+, weak mustache-like blackening at slant/butt interface)", "Indole (-)", "Citrate (-)", "LDC (+)", "ODC (-)", "TSI: K/A + H2S (weak)", "Vi capsular antigen (+)", "Etiologic agent of Typhoid Fever; enteric fever characterized by prolonged rose spots, fever, and bacteremia"]
      },
      {
        text: "Indole Positive | H2S Positive | LDC Positive | ADH Negative | ODC Positive | Zoonotic water/reptile contact",
        nextStep: null,
        conclusion: "Edwardsiella tarda",
        tests: ["NLF", "H2S (+)", "Indole (+)", "LDC (+)", "ODC (+)", "Citrate (-)", "TSI: K/A + H2S", "Associated with freshwater fish and cold-blooded reptiles", "Wound infections, myonecrosis, and severe systemic sepsis in iron-overloaded or liver-diseased hosts"]
      }
    ]
  },
  {
    id: "nlf-pad-neg-h2s-neg",
    question: "Urease, Motility profiles at different temperatures, and Decarboxylases:",
    options: [
      {
        text: "Urease Positive | Motile at 22-25°C (room temp) but strictly Non-Motile at 35-37°C",
        nextStep: "yersinia-species-key"
      },
      {
        text: "Urease Negative | Non-motile | Catalase Negative | Severe bloody dysentery",
        nextStep: null,
        conclusion: "Shigella dysenteriae (Group A)",
        tests: ["NLF", "Non-motile", "Catalase (-)", "Urease (-)", "LDC/ODC/Citrate (-)", "Mannitol (-)", "ONPG (-)", "TSI: K/A", "Produces potent Shiga toxin; causes severe bacillary dysentery with acute inflammatory necrosis of colon"]
      },
      {
        text: "Urease Negative | Non-motile | Catalase Positive | ODC Positive | ONPG Positive | Mannitol Positive",
        nextStep: null,
        conclusion: "Shigella sonnei (Group D)",
        tests: ["NLF (Flat colonies with jagged edges)", "Non-motile", "Catalase (+)", "ODC (+)", "ONPG (+)", "Mannitol (+)", "TSI: K/A", "Most common Shigella isolate in the US; causes mild self-limiting watery/bloody diarrhea in daycares"]
      },
      {
        text: "Urease Negative | Non-motile | Catalase Positive | ODC/ONPG Negative | Mannitol Positive",
        nextStep: null,
        conclusion: "Shigella flexneri or boydii (Group B/C)",
        tests: ["NLF", "Non-motile", "Catalase (+)", "ODC (-)", "ONPG (-)", "Mannitol (+)", "TSI: K/A", "Person-to-person fecal-oral transmission; causes acute bacillary dysentery"]
      },
      {
        text: "Urease Negative | Motile | Red-pigmented colonies enhanced at 25°C | DNase & Gelatinase Positive",
        nextStep: null,
        conclusion: "Serratia marcescens",
        tests: ["NLF (Slow LF; light pink on MAC at 48h)", "Red pigment prodigiosin produced heavily at 25°C", "DNase (+)", "Gelatinase (+)", "ONPG (+)", "LDC (+)", "ODC (+)", "Intrinsically resistant to ampicillin and first-generation cephalosporins; opportunist in catheterized lines"]
      },
      {
        text: "Urease Negative | Motile | Citrate Negative | LDC Positive | ODC Positive | VP Positive at 25°C",
        nextStep: null,
        conclusion: "Hafnia alvei",
        tests: ["NLF", "Indole (-)", "Citrate (-)", "LDC (+)", "ODC (+)", "Motile", "VP (+ at 25°C, negative at 37°C)", "Opportunistic GNR in severely immunocompromised patients, malignancies, or post-trauma"]
      },
      {
        text: "Urease Negative | Motile | LDC/ADH/ODC Negative | Yellow colonies | Indole Positive",
        nextStep: null,
        conclusion: "Pantoea agglomerans",
        tests: ["NLF (yellow colony)", "LDC/ADH/ODC (-)", "Indole (+)", "TSI: K/A or A/A", "Sporadic trauma infections from plant thorn pricks, contaminated soil, or contaminated IV fluids"]
      }
    ]
  },
  {
    id: "yersinia-species-key",
    question: "Ornithine Decarboxylase (ODC), Rhamnose, & Motility at all temperatures:",
    options: [
      {
        text: "ODC Positive | Sucrose Fermentation Positive | Bull's-eye colony on CIN agar",
        nextStep: null,
        conclusion: "Yersinia enterocolitica",
        tests: ["NLF (colorless/peach on MAC)", "Motile at 22-25°C (room temp), non-motile at 37°C", "ODC (+)", "Urease (+)", "Sucrose (+)", "CIN Agar: Burgundy 'bull's-eye' center surrounded by clear border", "Causes enterocolitis and pseudoappendicular syndrome (acute mesenteric lymphadenitis mimicking appendicitis)"]
      },
      {
        text: "ODC Negative | Rhamnose Positive | Salicin Positive | Zoonotic exposure (imported raw goat cheese)",
        nextStep: null,
        conclusion: "Yersinia pseudotuberculosis",
        tests: ["NLF", "Motile at 22-25°C, non-motile at 37°C", "ODC (-)", "Urease (+)", "Rhamnose (+)", "Salicin (+)", "Zoonotic contact or ingestion of unpasteurized goat dairy/cheese; causes mesenteric lymphadenitis"]
      },
      {
        text: "Non-motile at all temperatures | Urease Negative | ODC Negative | closed safety-pin appearance | plague select agent",
        nextStep: null,
        conclusion: "Yersinia pestis",
        tests: ["NLF", "Strictly Non-motile at all temperatures", "Urease (-)", "ODC (-)", "closed safety-pin bipolar appearance on Wayson/methylene blue stain", "SBA: pinpoint at 24h, rough cauliflower at 48h", "Broth: Stalactite pattern growth adhering to one side", "Highly virulent Select Agent (BSL-3 required); transmitted by flea vectors from rodents; causes bubonic and pneumonic plague"]
      }
    ]
  },

  // PATHWAY: Sphingomonas, Sphingobacterium, & Acidovorax
  {
    id: "fastidious-ch27",
    question: "Select phenotypic and biochemical profile for Sphingomonas & similar:",
    options: [
      {
        text: "Bright yellow colonies | Slow growing | Oxidase (+) | Motile on wet mount/room temp | Polymyxin B Susceptible | DNase (+)",
        nextStep: null,
        conclusion: "Sphingomonas paucimobilis",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose/Xylose/Sucrose Oxidation (+)", "Esculin Hydrolysis (+)", "Bright deep yellow pigment", "Motility: Positive (+, only on wet mount or incubated at 18-22°C; strictly nonmotile at 37°C)", "Susceptible to Polymyxin B (distinguishes it from Sphingobacterium)", "DNase positive (+)", "Citrate negative (-)", "H2S negative (-)"]
      },
      {
        text: "Bright yellow colonies | Oxidase (+) | Motile | Simmons Citrate (+) | Lead Acetate H2S (+) | DNase (-)",
        nextStep: null,
        conclusion: "Sphingomonas parapaucimobilis",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose/Xylose/Sucrose Oxidation (+)", "Esculin Hydrolysis (+)", "Bright deep yellow pigment", "Motility: Positive (+)", "Polymyxin B: Susceptible or variable", "H2S lead acetate paper positive (+, blackening of paper suspended over tube)", "Simmons Citrate positive (+)", "DNase negative (-)"]
      },
      {
        text: "Yellow colonies | Nonmotile | Christensen Urease Positive (+) | DNase Negative (-) | Polymyxin B Resistant",
        nextStep: null,
        conclusion: "Sphingobacterium multivorum",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Oxidation (+)", "Yellow pigment on SBA", "Nonmotile", "Christensen Urease Positive (+)", "DNase negative (-)", "Resistant to Polymyxin B (distinguishes it from Sphingomonas)", "Sphingophospholipids present in cell wall/membrane", "Ubiquitous in nature, rare cystic fibrosis or compromised patient opportunist"]
      },
      {
        text: "Yellow colonies | Nonmotile | Christensen Urease Positive (+) | DNase Positive (+) | Polymyxin B Resistant",
        nextStep: null,
        conclusion: "Sphingobacterium spiritivorum",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Oxidation (+)", "Yellow pigment on SBA", "Nonmotile", "Christensen Urease Positive (+)", "DNase positive (+)", "Resistant to Polymyxin B", "Oxidation of: Ethanol (+), Mannitol (+), Rhamnose (+)", "Rare opportunistic blood and urine pathogen"]
      },
      {
        text: "Yellow colonies | Nonmotile | Christensen Urease Negative (-) | DNase Negative (-) | Polymyxin B Resistant | 'II-forms'",
        nextStep: null,
        conclusion: "Sphingobacterium mizutaii",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Oxidation (+)", "Yellow pigment on SBA", "Nonmotile", "Christensen Urease Negative (-, 80% negative; 20% variable positive)", "DNase variable/negative", "Resistant to Polymyxin B", "Oxidation of: Ethanol (-), Mannitol (-), Rhamnose (+)", "Shows thickened ends and thin centers ('II-forms') on Gram stain", "Rare septicemia, meningitis, or cellulitis pathogen"]
      },
      {
        text: "Unpigmented colonies | Polar flagella (motile) | Grows at 30°C | Oxidase (+) | Esculin Negative (-)",
        nextStep: null,
        conclusion: "Acidovorax facilis",
        tests: ["Oxidase (+)", "Glucose Oxidation (+)", "Xylose Oxidation (+, delayed)", "Sucrose Oxidation (-)", "Esculin Hydrolysis (-)", "Unpigmented colonies on SBA", "Motile by a single polar flagellum", "Aerobic straight/slightly curved GNRs occurring singly or in short chains", "No MacConkey growth", "Optimal growth temperature is 30°C", "Common soil inhabitant, rare clinical isolate of unknown pathogenicity"]
      }
    ]
  },

  // PATHWAY: Moraxella and Related Elongated Neisseria
  {
    id: "fastidious-ch28",
    question: "Differentiate Moraxella species from elongated Neisseria:",
    options: [
      {
        text: "Moraxella Species | Penicillin disk elongates to GNR | Catalase positive | Nitrate/Acetate/Loeffler keys",
        nextStep: "moraxella-species"
      },
      {
        text: "Elongated Neisseria Species | Penicillin disk elongates to GNR | Catalase/Nitrate/Glucose keys",
        nextStep: "elongated-neisseria-species"
      }
    ]
  },
  {
    id: "moraxella-species",
    question: "Moraxella Species: Growth on MacConkey, Pitting, and Biochemical keys:",
    options: [
      {
        text: "Grows on MAC (NLF) | Enterobacteriaceae-like colonies | DNase positive (+) | Acetate (+)",
        nextStep: null,
        conclusion: "Moraxella canis",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Non-fermenter/Non-oxidizer", "MAC growth: Positive (+, NLF)", "Nitrate Reduction (+)", "Urease (-)", "Digests Loeffler (-)", "DNase positive (+, highly unique for Moraxella)", "Acetate utilization positive (+)", "Dog or cat oral flora; dog/cat bites wound isolate"]
      },
      {
        text: "MAC growth Negative (-) | Pits blood agar | Digests Loeffler Serum Slant (+, forms prominent depressions)",
        nextStep: null,
        conclusion: "Moraxella lacunata",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Non-fermenter/Non-oxidizer", "MAC growth: Negative (-)", "Colonies pit BAP agar", "Nitrate Reduction (+)", "Nitrite Reduction (-)", "DNase (-)", "Urease (-)", "Acetate utilization negative (-)", "Digests Loeffler serum slant (+, forms prominent pits/depressions)", "Historically associated with conjunctivitis"]
      },
      {
        text: "MAC growth Negative (-) | Smooth colonies on BAP | Nitrate Reduction Positive (+) | Acetate Negative (-)",
        nextStep: null,
        conclusion: "Moraxella nonliquefaciens",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Non-fermenter/Non-oxidizer", "MAC growth: Negative (-)", "Nitrate Reduction (+)", "Nitrite Reduction (-)", "DNase (-)", "Urease (-)", "Digests Loeffler (-)", "Acetate utilization negative (-)", "Normal human respiratory mucosal flora; rare opportunistic pathogen"]
      },
      {
        text: "MAC growth Variable | Smooth BAP | Nitrate Reduction Variable | Acetate Utilization Positive (+)",
        nextStep: null,
        conclusion: "Moraxella osloensis",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Non-fermenter/Non-oxidizer", "MAC growth: Variable (NLF)", "Nitrate Reduction (variable)", "Nitrite Reduction (-)", "DNase (-)", "Urease (-)", "Digests Loeffler (-)", "Acetate utilization positive (+, differentiates from M. nonliquefaciens)", "Resides in human urogenital and respiratory tracts; rare opportunistic bacteremia/sepsis"]
      },
      {
        text: "Grows on MAC (NLF) | Small pitting and spreading colonies on BAP | Nitrate Reduction Negative (-)",
        nextStep: null,
        conclusion: "Moraxella atlantae",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Non-fermenter/Non-oxidizer", "MAC growth: Positive (+, NLF)", "Colonies pit and spread on BAP", "Nitrate Reduction (-)", "Nitrite Reduction (-)", "DNase (-)", "Digests Loeffler (-)", "Extremely rare clinical isolate, low pathogenicity"]
      },
      {
        text: "MAC growth Negative (-) | Smooth BAP colonies | Nitrate Reduction Negative (-) | Acetate Negative (-)",
        nextStep: null,
        conclusion: "Moraxella lincolnii",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Non-fermenter/Non-oxidizer", "MAC growth: Negative (-)", "Colonies smooth, translucent on BAP", "Nitrate Reduction (-)", "Nitrite Reduction (-)", "DNase (-)", "Digests Loeffler (-)", "Normal respiratory mucosal flora; rare opportunist"]
      }
    ]
  },
  {
    id: "elongated-neisseria-species",
    question: "Elongated Neisseria: Catalase, Nitrate Reduction, Glucose oxidation, and Acetate keys:",
    options: [
      {
        text: "Catalase Positive (+) | Glucose Utilizer (+, rapid sugar test) | Grows on MAC (NLF) | Acetate (+)",
        nextStep: null,
        conclusion: "Neisseria elongata subspecies glycolytica",
        tests: ["Oxidase (+)", "Catalase (+, unique among N. elongata)", "Glucose Utilization (+, oxidizes glucose in rapid sugar test)", "MAC growth: Positive (+, NLF)", "Nitrate Reduction (-)", "Nitrite Reduction (variable)", "Acetate utilization positive (+)", "Gray, translucent, smooth/glistening colonies on BAP with claylike consistency"]
      },
      {
        text: "Catalase Negative (-) | Glucose non-utilizer | Nitrate Reduction Positive (+) | Nitrite Reduction (+, to gas)",
        nextStep: null,
        conclusion: "Neisseria elongata subspecies nitroreducens",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose non-utilizer", "MAC growth: Variable (NLF)", "Nitrate Reduction (+, reduces to nitrite)", "Nitrite Reduction (+, reduces to gas)", "Acetate utilization (variable)", "Resembles coccobacilli or short rods that elongate in penicillin", "Implicated in bacteremia, endocarditis, and osteomyelitis"]
      },
      {
        text: "Catalase Negative (-) | Glucose non-utilizer | Nitrate Reduction Negative (-) | Nitrite Reduction Positive (+)",
        nextStep: null,
        conclusion: "Neisseria elongata subspecies elongata",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose non-utilizer", "MAC growth: Variable (NLF)", "Nitrate Reduction (-)", "Nitrite Reduction (+)", "Acetate utilization (variable)", "Normal upper respiratory flora"]
      },
      {
        text: "Catalase Positive (+) | Glucose non-utilizer | Nitrate Reduction Negative (-) | Nitrite Reduction Positive (+)",
        nextStep: null,
        conclusion: "Neisseria weaverii",
        tests: ["Oxidase (+)", "Catalase positive (+)", "Glucose non-utilizer", "MAC growth: Variable (NLF)", "Nitrate Reduction (-)", "Nitrite Reduction (+)", "Acetate utilization negative (-)", "Medium-length straight bacilli on Gram stain that elongate in penicillin", "Zoonotic infection acquired from dog bites"]
      }
    ]
  },

  // PATHWAY: Eikenella, Methylobacterium, Weeksella, & Bergeyella
  {
    id: "fastidious-ch29",
    question: "Select microscopic morphology, colony color/texture, and key biochemicals:",
    options: [
      {
        text: "Slender GNR | Pits or corrodes agar | Sharp bleach-like odor | Oxidase (+) | Catalase Negative (-)",
        nextStep: null,
        conclusion: "Eikenella corrodens",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose utilization (-; strictly asaccharolytic GNR)", "MAC growth: Negative (-)", "Colonies pit or corrode agar with flat spreading borders after 48h", "Distinct chlorine bleach odor", "Slight yellow pigment in mature/older cultures", "Requires hemin for growth (unless incubated in CO2)", "Nitrate Reduction (+)", "Lysine (+), Ornithine (+)", "Part of HACEK group; associated with human fight bites, clenched fist wounds, and subacute endocarditis"]
      },
      {
        text: "Vacuolated GNR | Dry coral-pink to pink colonies | Grows at 15-30°C (incapable at 42°C) | Acetate (+)",
        nextStep: null,
        conclusion: "Methylobacterium spp.",
        tests: ["Oxidase (+)", "Catalase positive (+)", "Glucose Oxidation (weak +)", "Xylose Oxidation (+)", "MAC growth: Negative (-)", "Produces small, dry, coral-pink to pink colonies after 4-5 days on SBA/BCYE", "Vacuolated pale-staining short to medium GNRs that resist decolorization", "Grows best at 15-30°C (incapable of growth at 42°C - distinguishes from Roseomonas)", "Acetate utilization positive (+)", "Chlorine resistant, inhabits hospital water-distribution systems; catheter infections in CAPD"]
      },
      {
        text: "Yellow-green mucoid colonies | Medium-long parallel sides GNR (II-forms) | Indole Positive (+) | Urease Negative (-)",
        nextStep: null,
        conclusion: "Weeksella virosa",
        tests: ["Oxidase (+)", "Catalase positive (+)", "Glucose utilization (-; asaccharolytic)", "MAC growth: Negative (-)", "Small colonies at 24h that mature into mucoid, slimy, yellow-green to tan-brown pigmented colonies", "Medium to long GNRs with parallel sides and rounded ends (II-forms)", "Indole Positive (+, unusual for non-fermenters)", "Urease Negative (-)", "Genitourinary tract isolate"]
      },
      {
        text: "Sticky tan/yellow colonies | Fusiform GNR (II-forms) | Indole Positive (+) | Urease Positive (+) | Colistin Resistant",
        nextStep: null,
        conclusion: "Bergeyella zoohelcum",
        tests: ["Oxidase (+)", "Catalase positive (+)", "Glucose utilization (-; asaccharolytic)", "MAC growth: Negative (-)", "Colonies sticky, tan to yellow in color on SBA", "Medium to long GNRs with parallel sides (II-forms)", "Indole Positive (+)", "Urease Positive (+, distinguishes it from Weeksella virosa)", "Arginine Dihydrolase (+)", "Colistin resistant", "Zoonotic infection acquired from dog or cat bite/scratch wound infections"]
      }
    ]
  },

  // PATHWAY: Pasteurella and Suttonella
  {
    id: "fastidious-ch30",
    question: "Indole, Urease, Catalase, ODC, and Carbohydrate fermentation profiles:",
    options: [
      {
        text: "Musty/mushroom odor | Indole (+) | Urease (-) | ODC (+) | Sorbitol (+) | Dulcitol (-)",
        nextStep: null,
        conclusion: "Pasteurella multocida subsp. multocida",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Colonies convex, smooth, gray; distinct musty or mushroom-like odor", "Indole Positive (+)", "Urease Negative (-)", "Nitrate Reduction (+)", "Ornithine Decarboxylase (ODC) Positive (+)", "Sorbitol Fermentation Positive (+)", "Dulcitol Fermentation Negative (-)", "Penicillin susceptible GNR (unusual trait)", "Zoonotic infection acquired from dog or cat bites/scratches; risk of sepsis in patients with liver cirrhosis"]
      },
      {
        text: "Indole (+) | Urease (-) | ODC (+) | Sorbitol (-) | Dulcitol (-)",
        nextStep: null,
        conclusion: "Pasteurella multocida subsp. septica",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Indole Positive (+)", "Urease Negative (-)", "Nitrate Reduction (+)", "ODC Positive (+)", "Sorbitol Fermentation Negative (-)", "Dulcitol Fermentation Negative (-)", "Zoonotic dog/cat bite cellulitis"]
      },
      {
        text: "Indole (+) | Urease (-) | ODC (+) | Sorbitol (-) | Dulcitol (+)",
        nextStep: null,
        conclusion: "Pasteurella multocida subsp. gallicida",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Indole Positive (+)", "Urease Negative (-)", "Nitrate Reduction (+)", "ODC Positive (+)", "Sorbitol Fermentation Negative (-)", "Dulcitol Fermentation Positive (+)", "Isolated from birds and avian cholera sources"]
      },
      {
        text: "Indole (+) | Urease (-) | ODC (+) | Mannitol Negative (-) | Sucrose Oxidation (+)",
        nextStep: null,
        conclusion: "Pasteurella canis",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Indole Positive (+)", "Urease Negative (-)", "Nitrate Reduction (+)", "ODC Positive (+)", "Mannitol Oxidation Negative (-)", "Sucrose Oxidation (+)", "Zoonotic dog bites"]
      },
      {
        text: "Indole (variable) | Urease Positive (+, delayed) | ODC Negative (-) | Mannitol Negative (-)",
        nextStep: null,
        conclusion: "Pasteurella dagmatis",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Indole Positive (variable/delayed)", "Urease Positive (+, delayed)", "Nitrate Reduction (+)", "ODC Negative (-)", "Mannitol Negative (-)", "Sucrose (+)", "Maltose (+)", "Ferments glucose with gas (+)", "Cat and dog bites"]
      },
      {
        text: "Indole (+) | Urease (-) | ODC Negative (-) | Mannitol Negative (-) | Sucrose (+)| Maltose (-)",
        nextStep: null,
        conclusion: "Pasteurella stomatis",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Indole Positive (+)", "Urease Negative (-)", "Nitrate Reduction (+)", "ODC Negative (-)", "Mannitol Negative (-)", "Sucrose (+)", "Maltose Negative (-)", "Zoonotic cat/dog oral flora"]
      },
      {
        text: "Indole (-) | Urease Positive (+, delayed) | Ferments glucose with gas (+) | Grows on MAC (tiny LF)",
        nextStep: null,
        conclusion: "Pasteurella aerogenes",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Positive (+, tiny lactose fermenter)", "Indole Negative (-)", "Urease Positive (+, delayed)", "Nitrate Reduction (+)", "ODC variable", "Mannitol Negative (-)", "Sucrose (+)", "Maltose (+)", "Glucose fermented with production of gas (+)", "Zoonotic pig bites/scratch wounds"]
      },
      {
        text: "Indole (+) | Catalase Negative (-, highly unique) | Grows on MAC (tiny NLF) | Obstetric infections",
        nextStep: null,
        conclusion: "Pasteurella bettyae",
        tests: ["Oxidase (+)", "Catalase Negative (-, highly unique for Pasteurella)", "Glucose Fermentation (+)", "MAC growth: Positive (+, tiny NLF)", "Indole Positive (+, delayed)", "Urease Negative (-)", "Nitrate Reduction (+)", "ODC Negative (-)", "Mannitol/Sucrose/Maltose Negative (-)", "Short straight bacilli, usually thinner than other species", "Obstetric and neonatal infections (peripartum bacteremia)"]
      },
      {
        text: "Indole (+) | Urease strongly Positive (+, heavy inoculum) | ODC (+) | Rodent associate",
        nextStep: null,
        conclusion: "Pasteurella pneumotropica",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Indole Positive (+)", "Urease strongly Positive (+; may require rabbit serum on slant or heavy inoculum)", "Nitrate Reduction (+)", "ODC Positive (+)", "Mannitol Negative (-)", "Sucrose (+)", "Maltose (+)", "Common lab rodent associate; systemic opportunistic infection in compromised hosts"]
      },
      {
        text: "Pits BAP agar | Indole Positive (+) | Nitrate Reduction Negative (-) | Ocular infections",
        nextStep: null,
        conclusion: "Suttonella indologenes",
        tests: ["Oxidase (+)", "Catalase variable", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Indole Positive (+)", "Nitrate Reduction Negative (-, differentiates from Pasteurella spp.)", "Urease Negative (-)", "ODC Negative (-)", "Sucrose (+)", "Maltose (+)", "Colonies pit or spread on blood agar (resembles Kingella)", "Extremely rare ocular infections"]
      }
    ]
  },

  // PATHWAY: HACEK and Similar Capnophilic GNRs
  {
    id: "fastidious-ch31",
    question: "Differentiate Aggregatibacter, Cardiobacterium, Capnocytophaga, Kingella, & Dysgonomonas:",
    options: [
      {
        text: "Aggregatibacter Species | Star-like centers, or V-factor dependence | Catalase positive",
        nextStep: "aggregatibacter-species"
      },
      {
        text: "Cardiobacterium Species | Rosette clusters on Gram stain | Indole positive",
        nextStep: "cardiobacterium-species"
      },
      {
        text: "Capnocytophaga Species | Yellow/beige, thin GNR with tapered ends | Gliding motility",
        nextStep: "capnocytophaga-species"
      },
      {
        text: "Kingella Species | Catalase negative | Beta-hemolytic or TM growth | Pits agar",
        nextStep: "kingella-species"
      },
      {
        text: "Dysgonomonas Species | Fruity strawberry odor | Oxidase negative | Esculin positive",
        nextStep: "dysgonomonas-species"
      }
    ]
  },
  {
    id: "aggregatibacter-species",
    question: "Aggregatibacter Species: Star-like configuration, X/V factors, and sugar fermentation:",
    options: [
      {
        text: "Four- to six-pointed star configurations in mature colony center | Lactose (-) | Trehalose (-)",
        nextStep: null,
        conclusion: "Aggregatibacter actinomycetemcomitans",
        tests: ["Oxidase (+)", "Catalase (+)", "Glucose Fermentation (+)", "Lactose Fermentation Negative (-)", "Trehalose Fermentation Negative (-)", "Esculin Hydrolysis Negative (-)", "Pinpoint colonies after 24h; rough, sticky, adherent colonies with a slight green border after 48h", "Star-like central configuration (four- to six-pointed star resembling crossed cigars under low power)", "RTX leukotoxin cytolytic virulence factor", "Part of HACEK group; major cause of juvenile periodontitis and subacute endocarditis"]
      },
      {
        text: "Round convex chocolate agar colonies | X/V factor Independent | Lactose (+) | Trehalose (+)",
        nextStep: null,
        conclusion: "Aggregatibacter aphrophilus",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose Fermentation (+)", "Lactose Fermentation Positive (+)", "Trehalose Fermentation Positive (+)", "X/V Factor Independent (does not require X or V factors)", "Round, convex colonies with opaque zones near the center on chocolate agar", "Part of HACEK group; subacute endocarditis"]
      },
      {
        text: "Requires V-Factor Only | Pleomorphic rods | Convex smooth/granular chocolate agar colonies",
        nextStep: null,
        conclusion: "Aggregatibacter segnis",
        tests: ["Oxidase (+)", "Catalase positive (+)", "Glucose Fermentation (+)", "Lactose Fermentation (variable)", "Trehalose Fermentation (variable)", "V-Factor Dependent (requires V factor but not X factor; pleomorphic rods)", "Convex grayish white colonies, smooth or granular on chocolate agar after 48h", "Part of HACEK group; periodontal disease"]
      }
    ]
  },
  {
    id: "cardiobacterium-species",
    question: "Cardiobacterium Species: Rosettes on Gram stain, Indole, and Mannitol/Sorbitol fermentation:",
    options: [
      {
        text: "Rosettes on Gram stain | Indole Positive (+; xylene extraction) | Mannitol (+) | Sorbitol (+)",
        nextStep: null,
        conclusion: "Cardiobacterium hominis",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose Fermentation (+)", "Lactose/Trehalose Fermentation (-)", "Indole Positive (+; requires xylene extraction and Ehrlich's reagent)", "Urease Negative (-)", "Nitrate Reduction Negative (-)", "Ferments: Mannitol (+), Sorbitol (+)", "Gram stain: Pleomorphic rods with teardrop appearance (one round end, one tapered end) forming rosette arrangements", "Small, alpha-hemolytic, glistening, opaque colonies on BAP after 48h; may pit", "Part of HACEK group; subacute bacterial endocarditis in anatomical heart defects"]
      },
      {
        text: "Rosettes on Gram stain | Indole Positive (+) | Mannitol Negative (-) | Sorbitol Negative (-)",
        nextStep: null,
        conclusion: "Cardiobacterium valvarum",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose Fermentation (+)", "Indole Positive (+)", "Urease Negative (-)", "Nitrate Reduction Negative (-)", "Ferments: Mannitol Negative (-), Sorbitol Negative (-; distinguishes it from C. hominis)", "Teardrop GNR forming rosettes", "HACEK group agent of subacute endocarditis"]
      }
    ]
  },
  {
    id: "capnocytophaga-species",
    question: "Capnocytophaga Species: Oxidase, Catalase, Zoonotic vs. Oral species, and Carbohydrates:",
    options: [
      {
        text: "Oxidase (+, delayed) | Catalase (+, delayed) | Inulin, Sucrose & Raffinose Negative (-) | Severe sepsis/DIC",
        nextStep: null,
        conclusion: "Capnocytophaga canimorsus",
        tests: ["Oxidase (+, delayed)", "Catalase (+, delayed)", "Glucose Fermentation (+)", "Ferments: Inulin Negative (-), Sucrose Negative (-), Raffinose Negative (-)", "Thin, fusiform GNRs (sometimes curved)", "Small yellow/beige colonies displaying gliding motility (haze outgrowths on SBA)", "No growth in ambient air (requires CO2)", "Inhibited by sodium polyanethole sulfonate (SPS)", "Bite/scratch from dogs; causes severe sepsis, shock, HUS, and DIC, especially in splenectomized hosts"]
      },
      {
        text: "Oxidase (+, delayed) | Catalase (+, delayed) | Inulin, Sucrose and/or Raffinose Positive (+)",
        nextStep: null,
        conclusion: "Capnocytophaga cynodegmi",
        tests: ["Oxidase (+, delayed)", "Catalase (+, delayed)", "Glucose Fermentation (+)", "Ferments: Inulin, Sucrose, and/or Raffinose Positive (+; distinguishes from C. canimorsus)", "Thin fusiform GNRs, yellow/beige colonies with gliding motility", "Zoonotic infection from dog or cat bites; localized cellulitis"]
      },
      {
        text: "Oxidase Negative (-) | Catalase Negative (-) | Yellow/beige gliding colonies | Fusiform ends GNRs",
        nextStep: null,
        conclusion: "Capnocytophaga ochracea / sputigena / gingivalis",
        tests: ["Oxidase Negative (-)", "Catalase Negative (-)", "Glucose Fermentation (+)", "Yellow/beige colonies with gliding motility (Proteus swarming-like haze)", "Long thin gram-negative bacilli with tapered ends (fusiform)", "Normal human oral flora; associated with periodontal disease and bacteremia in neutropenic oncology patients"]
      }
    ]
  },
  {
    id: "kingella-species",
    question: "Kingella Species: Beta-hemolysis on BAP, Nitrate reduction, and clinical association:",
    options: [
      {
        text: "Small zone of beta-hemolysis | Pits agar | Nitrate Reduction Negative (-) | Pediatric osteoarthritis",
        nextStep: null,
        conclusion: "Kingella kingae",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose Fermentation (+)", "Lactose/Xylose/Trehalose Fermentation (-)", "Nitrate Reduction Negative (-)", "Urease Negative (-)", "Indole Negative (-)", "Small colonies on SBA with a small, clear zone of beta-hemolysis; frequently pits the agar", "Plump coccobacilli with square ends occurring in pairs or short chains", "RTX toxin hemolytic cytolysin", "HACEK group member; pediatric blood, bone, and joint infections (osteoarthritis in children < 3 years old)"]
      },
      {
        text: "Nonhemolytic | Pits agar | Grows on Thayer-Martin | Nitrate Reduction Positive (+, reduces to gas)",
        nextStep: null,
        conclusion: "Kingella denitrificans",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose Fermentation (+)", "Nitrate Reduction Positive (+, reduces to gas; distinguishes it from Kingella kingae)", "Urease Negative (-)", "Indole Negative (-)", "Small, nonhemolytic colonies; frequently pits agar; grows on selective Thayer-Martin (misidentified as Neisseria gonorrhoeae)", "Rare cause of subacute bacterial endocarditis"]
      },
      {
        text: "Nitrate Reduction Negative (-) | Urease Negative (-) | Indole Negative (-) | Oral/dental plaque isolate",
        nextStep: null,
        conclusion: "Kingella oralis / potus",
        tests: ["Oxidase (+)", "Catalase Negative (-)", "Glucose Fermentation (+)", "Nitrate Reduction Negative (-)", "Urease Negative (-)", "Indole Negative (-)", "Pits agar; isolated from human dental plaque or animal bite wounds"]
      }
    ]
  },
  {
    id: "dysgonomonas-species",
    question: "Dysgonomonas Species: Odor, Oxidase status, Esculin hydrolysis, and clinical significance:",
    options: [
      {
        text: "Fruity strawberry or bitter odor | Oxidase Negative (-) | Catalase Negative (-) | Esculin positive (+)",
        nextStep: null,
        conclusion: "Dysgonomonas capnocytophagoides",
        tests: ["Oxidase Negative (-)", "Catalase Negative (-)", "Glucose Fermentation (+)", "MAC growth: Negative (-)", "Pinpoint at 24h; small, wet, gray-white at 48-72h; nonhemolytic", "Characteristic fruity, strawberry-like or bitter odor", "Short GNR or coccobacillus, strictly non-motile (no gliding motility)", "Esculin Hydrolysis Positive (+)", "Indole variable, Urease Negative (-)", "Produces succinic and propionic acid as major end products of glucose fermentation", "Rarely isolated GNR associated with diarrhea and bacteremia in immunocompromised patients"]
      }
    ]
  },

  // PATHWAY: Haemophilus Species
  {
    id: "fastidious-ch32",
    question: "Haemophilus Species - Select metabolic factors and clinical profile:",
    options: [
      {
        text: "Requires BOTH X and V factors (Porphyrin -) | Nonhemolytic | Catalase (+) | Glucose (+) | Xylose (+)",
        nextStep: null,
        conclusion: "Haemophilus influenzae",
        tests: ["Requires BOTH X (hemin) and V (NAD) factors for growth", "Porphyrin (ALA) test: Negative (cannot synthesize hemin)", "Nonhemolytic on horse or rabbit blood agar", "Catalase Positive (+), Oxidase Positive (+)", "Glucose Fermentation Positive (+), Xylose Fermentation Positive (+)", "Sucrose Fermentation Negative (-), Lactose Fermentation Negative (-)", "ONPG (β-galactosidase) Negative (-)", "Distinct 'mouse nest' or musty odor on chocolate agar", "Grows on chocolate agar in CO2 but fails to grow on 5% sheep blood agar (except as tiny satellite colonies around V-factor producing S. aureus)", "Classified into serotypes a-f (type b/Hib is highly virulent capsule; vaccine available) or Nontypeable (NTHi)", "Separated into biotypes I-VIII (Biotype I: Indole +, ODC +, Urease +; Biotype II: Indole +, ODC +, Urease -; Biotype III: Indole -, ODC +, Urease -; Biotype IV: Indole -, ODC +, Urease +; Biotype V: Indole +, ODC -, Urease +; Biotype VI: Indole -, ODC +, Urease -; Biotype VII: Indole +, ODC -, Urease -; Biotype VIII: Indole -, ODC -, Urease -)"]
      },
      {
        text: "Requires BOTH X and V factors (Porphyrin -) | Nonhemolytic | Xylose Negative (-) | Conjunctivitis & BPF",
        nextStep: null,
        conclusion: "Haemophilus aegyptius",
        tests: ["Requires BOTH X (hemin) and V (NAD) factors for growth", "Porphyrin (ALA) test: Negative (cannot synthesize hemin)", "Nonhemolytic on horse or rabbit blood agar", "Catalase Positive (+)", "Glucose Fermentation Positive (+, delayed), Xylose Fermentation Negative (-; distinguishes it from H. influenzae)", "Sucrose/Lactose Fermentation Negative (-), ONPG Negative (-)", "Colonies are smaller than H. influenzae at 48 hours on chocolate agar", "Causative agent of acute, epidemic purulent conjunctivitis ('pinkeye')", "Etiologic agent of Brazilian Purpuric Fever (BPF): highly lethal systemic infection in pediatric patients, characterized by purulent conjunctivitis followed by high fever, vomiting, systemic purpuric rash, and vascular collapse"]
      },
      {
        text: "Requires BOTH X and V factors (Porphyrin -) | Beta-Hemolytic on horse/rabbit blood | Catalase (+)",
        nextStep: null,
        conclusion: "Haemophilus haemolyticus",
        tests: ["Requires BOTH X (hemin) and V (NAD) factors for growth", "Porphyrin (ALA) test: Negative (cannot synthesize hemin)", "Beta-Hemolytic (+, produces clear zones of lysis on horse or rabbit blood agar)", "Catalase Positive (+)", "Glucose Fermentation Positive (+), Xylose Fermentation Variable (V)", "Sucrose/Lactose Fermentation Negative (-), ONPG Negative (-)", "Small coccobacilli or short rods with occasional tangled filaments", "Normal flora of the upper respiratory tract; rarely pathogenic, but easily confused with beta-hemolytic streptococci on sheep blood or H. influenzae on chocolate agar"]
      },
      {
        text: "Requires X factor ONLY (V factor independent) | Catalase (-) | Chancroid select agent | 'Schools of fish'",
        nextStep: null,
        conclusion: "Haemophilus ducreyi",
        tests: ["Requires X factor (hemin) ONLY for growth (V factor/NAD independent)", "Porphyrin (ALA) test: Negative (cannot synthesize hemin)", "Nonhemolytic on horse/rabbit blood agar (delayed or variable)", "Catalase Negative (-)", "Glucose Fermentation Variable (V), Sucrose/Lactose Fermentation Negative (-)", "ONPG Negative (-)", "Optimal growth occurs at 33°C (incapable at 35-37°C) under high humidity and CO2", "Genital ulcer swab must be plated to selective media (M-H chocolate with vancomycin) within 10 minutes", "Colonies are small, flat, smooth, and translucent-to-opaque after 48-72h; can be pushed intact across the agar surface", "Gram stain: Slender coccobacilli traditionally described as appearing as 'schools of fish' or 'railroad tracks'", "Causative agent of Chancroid: sexually transmitted infection characterized by painful genital ulcers and regional inguinal lymphadenitis (buboes)"]
      },
      {
        text: "Requires V factor ONLY (Porphyrin +) | Nonhemolytic | Sucrose (+) | Mannose (+)",
        nextStep: null,
        conclusion: "Haemophilus parainfluenzae",
        tests: ["Requires V factor (NAD) ONLY for growth (X factor/hemin independent)", "Porphyrin (ALA) test: Positive (+, synthesizes its own hemin, fluoresces red/orange under UV)", "Nonhemolytic (or variable hemolytic) on horse/rabbit blood", "Catalase Variable (V)", "Glucose Fermentation Positive (+), Sucrose Fermentation Positive (+), Mannose Fermentation Positive (+)", "Lactose Fermentation Negative (-)", "ONPG (β-galactosidase) Variable (V)", "Medium to large, smooth, and translucent colonies on chocolate agar", "Separated into biotypes I-VIII using Indole, Urease, and ODC", "Normal upper respiratory tract microbiota; opportunistic pathogen associated with endocarditis and respiratory infections"]
      },
      {
        text: "Requires V factor ONLY (Porphyrin +) | Beta-Hemolytic on horse/rabbit | Sucrose (+) | Mannose (-)",
        nextStep: null,
        conclusion: "Haemophilus parahaemolyticus",
        tests: ["Requires V factor (NAD) ONLY for growth (X factor/hemin independent)", "Porphyrin (ALA) test: Positive (+, synthesizes hemin)", "Beta-Hemolytic (+, produces clear zones of lysis on horse or rabbit blood agar)", "Catalase Variable (V)", "Glucose Fermentation Positive (+), Sucrose Fermentation Positive (+), Mannose Fermentation Negative (-; distinguishes it from H. parainfluenzae)", "Lactose Fermentation Negative (-)", "ONPG Variable (V)", "Short to medium-length GNRs", "Normal respiratory tract microbiota; occasional cause of pharyngitis"]
      },
      {
        text: "Requires V factor ONLY (Porphyrin +) | Beta-Hemolytic | Catalase Weak (+) | Sucrose (+) | Mannose (+) | ONPG (+)",
        nextStep: null,
        conclusion: "Haemophilus pittmaniae",
        tests: ["Requires V factor (NAD) ONLY for growth (X factor/hemin independent)", "Porphyrin (ALA) test: Positive (+, synthesizes hemin)", "Beta-Hemolytic (+, on horse/rabbit blood)", "Catalase Weak Positive (pos w)", "Glucose Fermentation Positive (+), Sucrose Fermentation Positive (+), Mannose Fermentation Positive (+)", "Lactose Fermentation Negative (-)", "ONPG (β-galactosidase) Positive (+)", "Resembles other parainfluenzae strains but has strong β-galactosidase activity", "Isolated from human saliva, sputum, and blood in bacteremic patients"]
      },
      {
        text: "Requires V factor ONLY (Porphyrin +) | Beta-Hemolytic | Catalase (+) | Sucrose (+) | Mannose Negative (-)",
        nextStep: null,
        conclusion: "Haemophilus paraphrohaemolyticus",
        tests: ["Requires V factor (NAD) ONLY for growth (X factor/hemin independent)", "Porphyrin (ALA) test: Positive (+, synthesizes hemin)", "Beta-Hemolytic (+, on horse/rabbit blood)", "Catalase Positive (+)", "Glucose Fermentation Positive (+), Sucrose Fermentation Positive (+), Mannose Fermentation Negative (-)", "Lactose Fermentation Negative (-)", "ONPG Variable (V)", "Normal respiratory microbiota, rare opportunistic pathogen"]
      }
    ]
  },

  // PATHWAY: Bartonella & Afipia
  {
    id: "fastidious-ch33",
    question: "Bartonella & Afipia - Select cellular and physiological profile:",
    options: [
      {
        text: "Oxidase (-) | Catalase (-) | Urease (-) | Extremely inert GNRs | Bartonella Species",
        nextStep: "bartonella-species"
      },
      {
        text: "Oxidase (+) | Catalase (+, weak) | Urease (+) | Motile GNR | Grows on CYE/CHOC | Afipia Species",
        nextStep: "afipia-species"
      }
    ]
  },
  {
    id: "bartonella-species",
    question: "Bartonella Species: Differentiate species based on clinical reservoir and colony morphology:",
    options: [
      {
        text: "Cat exposure/scratch | Cat scratch disease (CSD) | Rough cauliflower-like or pitting colonies",
        nextStep: null,
        conclusion: "Bartonella henselae",
        tests: [
          "Oxidase Negative (-), Catalase Negative (-), Urease Negative (-)",
          "Growth is extremely slow (takes 9 to 40 days, optimal at 35-37°C with CO2 on fresh chocolate or rabbit blood agar)",
          "Colonies are small, rough, dry, cauliflower-like, and pit/adhere to the agar surface",
          "Causes Cat-Scratch Disease (CSD): regional lymphadenitis",
          "Causes Bacillary Angiomatosis, Peliosis Hepatis, and culture-negative Endocarditis in immunocompromised hosts"
        ]
      },
      {
        text: "Human reservoir | Sandfly vector (Lutzomyia) | Oroya fever / Verruga peruana",
        nextStep: null,
        conclusion: "Bartonella bacilliformis",
        tests: [
          "Oxidase Negative (-), Catalase Negative (-), Urease Negative (-)",
          "Transmitted by the Lutzomyia sandfly in South American Andes",
          "Causes Carrión's disease, manifesting as acute hemolytic anemia (Oroya fever) and chronic angiomatous skin lesions (verruga peruana)",
          "Slow growth on blood agar, optimally at 25-28°C"
        ]
      },
      {
        text: "Louse-borne vector | Trench fever | Smooth, flat, non-adherent colonies",
        nextStep: null,
        conclusion: "Bartonella quintana",
        tests: [
          "Oxidase Negative (-), Catalase Negative (-), Urease Negative (-)",
          "Transmitted by the human body louse (Pediculus humanus)",
          "Growth takes 12 to 14 days; colonies are smooth, flat, white, and non-adherent",
          "Causes Trench Fever (five-day fever), chronic bacteremia, and Bacillary Angiomatosis in HIV/AIDS patients"
        ]
      }
    ]
  },
  {
    id: "afipia-species",
    question: "Afipia Species: Differentiate by Nitrate Reduction status:",
    options: [
      {
        text: "Nitrate Reduction Positive (+) | Associated with cat scratch disease history",
        nextStep: null,
        conclusion: "Afipia felis",
        tests: [
          "Oxidase Positive (+), Urease Positive (+), Catalase positive (weak)",
          "Nitrate Reduction Positive (+; distinguishes from A. broomeae)",
          "Grows slowly on CYE (Buffered Charcoal Yeast Extract) and chocolate agar, fails on MacConkey",
          "Gram stain: Gram-negative rod, motile by single polar flagellum",
          "Loosely associated with cat scratch disease"
        ]
      },
      {
        text: "Nitrate Reduction Negative (-) | Isolated from respiratory specimens",
        nextStep: null,
        conclusion: "Afipia broomeae",
        tests: [
          "Oxidase Positive (+), Urease Positive (+), Catalase positive (weak)",
          "Nitrate Reduction Negative (-)",
          "Grows slowly on CYE and chocolate agar, fails on MacConkey",
          "Rare human respiratory or wound isolate"
        ]
      }
    ]
  },

  // PATHWAY: Campylobacter, Arcobacter, & Helicobacter
  {
    id: "fastidious-ch34",
    question: "Campylobacter, Arcobacter, & Helicobacter - Select key reactions & growth:",
    options: [
      {
        text: "Oxidase (+) | Catalase (+) | Hippurate (+) | Grows at 42°C | Seagull GNR | Nalidixic Acid (S)",
        nextStep: null,
        conclusion: "Campylobacter jejuni",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+), Asaccharolytic GNR",
          "Hippurate Hydrolysis Positive (+; highly unique differential marker)",
          "Growth occurs at 42°C in microaerophilic conditions (5-10% O2, 10% CO2)",
          "Susceptible to Nalidixic Acid, Resistant to Cephalothin",
          "Darting motility in wet mounts; Gram stain shows curved 'seagull' shapes or spiral chains",
          "Primary bacterial agent of acute foodborne gastroenteritis worldwide; associated with poultry ingestion"
        ]
      },
      {
        text: "Oxidase (+) | Catalase (+) | Hippurate (-) | Indoxyl Acetate (+) | Grows at 42°C | Nalidixic Acid (S)",
        nextStep: null,
        conclusion: "Campylobacter coli",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+)",
          "Hippurate Hydrolysis Negative (-; differentiates from C. jejuni)",
          "Indoxyl Acetate Positive (+)",
          "Growth occurs at 42°C under microaerophilic conditions",
          "Susceptible to Nalidixic Acid, Resistant to Cephalothin",
          "Causes acute microaerophilic gastroenteritis in humans"
        ]
      },
      {
        text: "Oxidase (+) | Catalase (+) | Hippurate (-) | Fails to grow at 42°C (Grows at 25°C) | Cephalothin (S)",
        nextStep: null,
        conclusion: "Campylobacter fetus subsp. fetus",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+)",
          "Hippurate Hydrolysis Negative (-)",
          "Fails to grow at 42°C (optimal growth at 25°C and 37°C)",
          "Resistant to Nalidixic Acid, Susceptible to Cephalothin (reverse of C. jejuni)",
          "Causes systemic infections (bacteremia, endocarditis, septic arthritis) in immunocompromised hosts; zoonotic from cattle/sheep"
        ]
      },
      {
        text: "Oxidase (+) | Catalase (+) | Hippurate (-) | Indoxyl Acetate (-) | Grows at 42°C | Nalidixic Acid (R)",
        nextStep: null,
        conclusion: "Campylobacter lari",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+)",
          "Hippurate Hydrolysis Negative (-), Indoxyl Acetate Negative (-)",
          "Grows at 42°C under microaerophilic conditions",
          "Resistant to Nalidixic Acid, Resistant to Cephalothin",
          "Causes opportunistic microaerophilic gastroenteritis; carried by seagulls and other birds"
        ]
      },
      {
        text: "Oxidase (+) | Catalase Negative/Weak (-) | Indoxyl Acetate (+) | Susceptible to Cephalothin",
        nextStep: null,
        conclusion: "Campylobacter upsaliensis",
        tests: [
          "Oxidase Positive (+), Catalase Negative or Weak w (+/-)",
          "Indoxyl Acetate Positive (+)",
          "Grows at 42°C under microaerophilic conditions",
          "Susceptible to Nalidixic Acid, Susceptible to Cephalothin",
          "Causes gastroenteritis and bacteremia, especially in pediatric patients; zoonotic from domestic dogs/cats"
        ]
      },
      {
        text: "Aerotolerant (Grows at 15°C and 25°C in air) | Oxidase (+) | Catalase (+)",
        nextStep: null,
        conclusion: "Arcobacter butzleri / cryaerophilus",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+), Curved Gram-negative rods",
          "Aerotolerant: grow in ambient air at lower temperatures (15°C and 25°C)",
          "Differentiated from Campylobacter by their ability to grow aerotolerantly and at 15°C",
          "Associated with diarrheal illness and bacteremia; raw poultry/waterborne exposure"
        ]
      },
      {
        text: "Oxidase (+) | Catalase (+) | Rapid, strong Urease Positive (+) | Gastric ulcers / carcinoma",
        nextStep: null,
        conclusion: "Helicobacter pylori",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+)",
          "Rapid, extremely strong Urease Positive (+; positive CLOtest/urea breath test in minutes)",
          "Fails to grow at 25°C (grows at 37°C under microaerophilic conditions)",
          "Gram stain: curved, spiral Gram-negative rod",
          "Colonizes the human gastric mucosa, producing ammonia to neutralize acid; major cause of chronic gastritis, peptic ulcer disease, gastric adenocarcinoma, and MALT lymphoma"
        ]
      }
    ]
  },

  // PATHWAY: Legionella
  {
    id: "fastidious-ch35",
    question: "Legionella - Select metabolic factor & diagnostic profile:",
    options: [
      {
        text: "Grows on BCYE with L-cysteine | Fails on BCYE without cysteine | Gelatinase (+) | Hippurate (+)",
        nextStep: null,
        conclusion: "Legionella pneumophila",
        tests: [
          "Faintly staining thin Gram-negative GNRs; strictly aerobic",
          "L-cysteine and Iron dependent: Grows on BCYE with cysteine, fails to grow on BCYE without cysteine (and fails on blood agar / chocolate agar)",
          "Gelatinase Positive (+), Hippurate Hydrolysis Positive (+)",
          "Beta-lactamase Positive (+)",
          "Acquired via inhalation of aerosolized water from cooling towers, air conditioners, or potable water systems; causes Legionnaires' disease (severe pneumonia) and Pontiac fever (flu-like)"
        ]
      },
      {
        text: "Grows on BCYE with L-cysteine | Weakly acid-fast in tissue | Gelatinase (-) | Hippurate (-)",
        nextStep: null,
        conclusion: "Legionella micdadei",
        tests: [
          "L-cysteine and Iron dependent for growth on BCYE agar",
          "Weakly acid-fast (modified Kinyoun stain positive) in tissue specimens",
          "Gelatinase Negative (-), Hippurate Hydrolysis Negative (-; distinguishes from L. pneumophila)",
          "Causes 'Pittsburgh pneumonia' in immunocompromised patients"
        ]
      },
      {
        text: "Grows on BCYE with L-cysteine | Blue-white fluorescence under long-wave UV light",
        nextStep: null,
        conclusion: "Legionella bozemanii / dumoffii / anisa",
        tests: [
          "L-cysteine and Iron dependent for growth on BCYE agar",
          "Colonies exhibit bright blue-white fluorescence when exposed to long-wave (365-nm) UV light on BCYE agar",
          "Gelatinase Positive (L. bozemanii) or Negative (L. anisa)",
          "Associated with pneumonia in compromised hosts"
        ]
      }
    ]
  },

  // PATHWAY: Brucella Species
  {
    id: "fastidious-ch36",
    question: "Brucella Species - Select CO2 requirement, Urease speed, and Dye inhibition:",
    options: [
      {
        text: "CO2 required (+) | Urease Positive in 2 hours | H2S Positive | Inhibited by Thionine | Cattle",
        nextStep: null,
        conclusion: "Brucella abortus",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+), Strictly aerobic small coccobacilli",
          "CO2 required (+) for growth (most strains)",
          "Urease positive in 2 hours",
          "H2S produced (+) in TSI / lead acetate",
          "Inhibited by Thionine dye (+), NOT inhibited by Basic Fuchsin dye (-)",
          "Zoonotic pathogen; preferred animal host is cattle; causes human brucellosis (undulant fever); BSL-3 select agent"
        ]
      },
      {
        text: "CO2 NOT required | Urease Positive in 2 hours | H2S Positive | Not inhibited by dyes | Sheep/Goats",
        nextStep: null,
        conclusion: "Brucella melitensis",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+), small coccobacilli",
          "CO2 not required (-) for growth",
          "Urease positive in 2 hours",
          "H2S produced (+) in TSI",
          "NOT inhibited by Thionine dye (-), NOT inhibited by Basic Fuchsin dye (-)",
          "Zoonotic pathogen; preferred animal host is sheep or goats; highly virulent for humans; BSL-3 select agent"
        ]
      },
      {
        text: "CO2 NOT required | Urease rapidly Positive (15 min) | H2S variable | Inhibited by Fuchsin | Swine",
        nextStep: null,
        conclusion: "Brucella suis",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+), small coccobacilli",
          "CO2 not required (-) for growth",
          "Urease rapidly Positive (+; within 15 minutes)",
          "H2S produced (variable ±)",
          "NOT inhibited by Thionine dye (-), inhibited by Basic Fuchsin dye (+)",
          "Zoonotic pathogen; preferred animal host is swine; BSL-3 select agent"
        ]
      },
      {
        text: "CO2 NOT required | Urease rapidly Positive (15 min) | H2S Negative | Inhibited by Fuchsin | Dogs",
        nextStep: null,
        conclusion: "Brucella canis",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+), small coccobacilli",
          "CO2 not required (-) for growth",
          "Urease rapidly Positive (+; within 15 minutes)",
          "H2S production Negative (-)",
          "NOT inhibited by Thionine dye (-), inhibited by Basic Fuchsin dye (+)",
          "Zoonotic pathogen; preferred animal host is dogs; BSL-3 select agent"
        ]
      }
    ]
  },

  // PATHWAY: Bordetella Species
  {
    id: "fastidious-ch37",
    question: "Bordetella pertussis & Related - Select Oxidase, Urease, and growth characteristics:",
    options: [
      {
        text: "Oxidase (+) | Urease (-) | Motility (-) | Nitrate (-) | Mercury drop on Regan-Lowe | No SBA/MAC",
        nextStep: null,
        conclusion: "Bordetella pertussis",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+), strictly aerobic, faintly staining minute coccobacilli",
          "Urease Negative (-), Motility Negative (-), Nitrate Reduction Negative (-)",
          "Growth requires 3 to 6 days on Regan-Lowe (charcoal-horse blood) or Bordet-Gengou (potato-glycerol) agar",
          "Colonies are tiny, smooth, and shiny, resembling 'mercury drops' or 'pearls'",
          "Fails to grow on routine sheep blood agar or MacConkey agar (requires blood/charcoal additives)",
          "Causative agent of whooping cough (pertussis) in humans; clinical stages: catarrhal, paroxysmal (violent cough with whoop), and convalescent"
        ]
      },
      {
        text: "Oxidase (-) | Urease Positive (24 hours) | Motility (-) | Grows on SBA and Regan-Lowe (2-3 days)",
        nextStep: null,
        conclusion: "Bordetella parapertussis",
        tests: [
          "Oxidase Negative (-; distinguishes from B. pertussis)",
          "Urease Positive (+; positive in 24 hours)",
          "Motility Negative (-), Nitrate Reduction Negative (-)",
          "Grows in 2 to 3 days on Regan-Lowe, sheep blood agar, and variable on MacConkey agar",
          "Gram-negative coccobacillus, causes a milder pertussis-like respiratory illness in humans"
        ]
      },
      {
        text: "Oxidase (+) | Urease rapidly Positive (4 hours) | Motility (+) | Grows on MacConkey | Zoonotic",
        nextStep: null,
        conclusion: "Bordetella bronchiseptica",
        tests: [
          "Oxidase Positive (+), Catalase Positive (+)",
          "Urease rapidly Positive (+; positive in 4 hours)",
          "Motility Positive (+; peritrichous flagella)",
          "Nitrate Reduction Positive (+)",
          "Grows rapidly (1-2 days) on sheep blood agar and MacConkey agar (exhibits NLF growth)",
          "Zoonotic pathogen of dogs/rabbits (kennel cough); causes opportunistic respiratory tract infections in compromised humans"
        ]
      }
    ]
  },

  // PATHWAY: Francisella
  {
    id: "fastidious-ch38",
    question: "Francisella - Select cysteine requirement, Oxidase, and Gelatinase status:",
    options: [
      {
        text: "Requires Cysteine | Oxidase (-) | Catalase (w+) | Urease (-) | Severe tularemia | BSL-3 select agent",
        nextStep: null,
        conclusion: "Francisella tularensis subsp. tularensis (Type A)",
        tests: [
          "Faintly staining, tiny Gram-negative coccobacilli; strict aerobe",
          "Cysteine / Sulfhydryl required (+; grows on chocolate with IsoVitaleX, cystine heart agar, or BCYE)",
          "Oxidase Negative (-), Catalase weakly Positive (w+), Urease Negative (-)",
          "Grows very slowly, requiring 2 to 4 days for pinpoint colonies",
          "Infectious dose is extremely low (<10 cells); BSL-3 safety containment mandatory (plates must be taped)",
          "Causes severe tularemia (rabbit fever) in North America; clinical forms: ulceroglandular, glandular, oculoglandular, oropharyngeal, systemic, pneumonic"
        ]
      },
      {
        text: "Requires Cysteine | Oxidase (-) | Catalase (w+) | Less severe tularemia | Europe/Asia/North America",
        nextStep: null,
        conclusion: "Francisella tularensis subsp. holartica (Type B)",
        tests: [
          "Cysteine dependent (+)",
          "Oxidase Negative (-), Catalase weakly Positive (w+), Urease Negative (-)",
          "Causes milder clinical forms of tularemia in Europe, Asia, and North America"
        ]
      },
      {
        text: "Cysteine NOT required | Oxidase (+) | Gelatinase (+) | Produces H2S in TSI | Near-drowning victims",
        nextStep: null,
        conclusion: "Francisella philomiragia",
        tests: [
          "Oxidase Positive (+; Kovac's modification; distinguishes from F. tularensis)",
          "Cysteine / Cystine NOT required for isolation (grows well on heart infusion blood agar or BCYE)",
          "Gelatinase Positive (+), Grows in 6% NaCl (+)",
          "Produces H2S in TSI agar (+)",
          "Opportunistic pathogen in immunocompromised patients or near-drowning victims"
        ]
      }
    ]
  },

  // PATHWAY: Streptobacillus & Spirillum
  {
    id: "fastidious-ch39",
    question: "Streptobacillus moniliformis & Spirillum minus - Select morphology and culture behavior:",
    options: [
      {
        text: "Pleomorphic chains with bulbar swellings | Fried egg colonies | SPS sensitive | Culturable",
        nextStep: null,
        conclusion: "Streptobacillus moniliformis",
        tests: [
          "Pleomorphic Gram-negative rod (long tangled chains, bulbar/club-shaped swellings, string of pearls)",
          "Requires blood, serum, or ascitic fluid for growth; incubated under 5-10% CO2 in a moist environment",
          "Inhibited by sodium polyanethol sulfonate (SPS) in standard blood culture bottles (citrate / specialized media required)",
          "Broth culture: grows as 'fluff balls' or 'bread crumbs' near the tube bottom",
          "Colonies on supplemented agar are small, gray, and embedded, displaying a 'fried egg' appearance (spontaneous L-form transition)",
          "Indole Negative (-), Oxidase Negative (-), Catalase Negative (-), Nitrate Negative (-), Urease Negative (-)",
          "Causes streptobacillary rat-bite fever and Haverhill fever (acquired by ingestion of contaminated milk/food)"
        ]
      },
      {
        text: "Helical/Spiral with 2-3 coils | Non-culturable | Animal inoculation or Giemsa smear | Sodoku",
        nextStep: null,
        conclusion: "Spirillum minus",
        tests: [
          "Gram-negative spirochete-like helical organism with 2 or 3 coils and polar flagella",
          "Strictly non-culturable on synthetic media",
          "Diagnosed by direct visualization (Giemsa / Wright stain or dark-field microscopy) of blood, exudate, or lymph node tissues",
          "Definitive diagnosis made by experimental animal inoculation (white mice or guinea pigs) and subsequent recovery",
          "Causes sodoku (spirillary rat-bite fever), characterized by reulcerating bite wound, purplish maculopapular rash, and prominent lymphadenopathy without arthritis"
        ]
      }
    ]
  }
];
