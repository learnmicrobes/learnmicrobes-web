import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faArrowRight,
  faCircleExclamation,
  faClipboardCheck,
  faFlaskVial,
  faLink,
  faMagnifyingGlass,
  faShieldHalved,
  faVial
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SyndromeDiagnosticPath.css';

type DiagnosticPath = {
  id: string;
  syndrome: string;
  category: string;
  signal: string;
  bestPath: string[];
  specimens: string[];
  tests: string[];
  pitfalls: string[];
  safety: string[];
  links: Array<{ label: string; path: string }>;
};

const diagnosticPaths: DiagnosticPath[] = [
  {
    id: 'positive-blood-culture',
    syndrome: 'Positive blood culture signal',
    category: 'Bloodstream',
    signal: 'Sterile-site result where early communication, Gram stain, and contamination logic matter immediately.',
    bestPath: ['Confirm bottle signal', 'Perform and communicate Gram stain', 'Subculture for recovery', 'Choose rapid ID if validated', 'Plan susceptibility and significance review'],
    specimens: ['Positive blood culture bottle', 'Subculture isolate', 'Original collection details', 'Repeat blood cultures only when clinically indicated'],
    tests: ['Gram stain', 'Subculture', 'Rapid molecular or MALDI-TOF workflow', 'Susceptibility testing', 'Contaminant-versus-pathogen assessment'],
    pitfalls: ['A common skin organism can be a true device pathogen', 'One bottle does not always equal contamination', 'Mixed Gram stain results need careful follow-up', 'Candida in blood is not normal flora'],
    safety: ['Escalate suspected high-risk small Gram-negative coccobacilli or unusual slow growers before extra open-bench work'],
    links: [
      { label: 'Bloodstream infection guide', path: '/guides?guide=bloodstream-infections' },
      { label: 'Special pathogens hub', path: '/special-pathogens' },
      { label: 'Search bench terms', path: '/search' }
    ]
  },
  {
    id: 'poor-quality-sputum',
    syndrome: 'Possible pneumonia with sputum specimen',
    category: 'Respiratory',
    signal: 'Respiratory culture only helps if the specimen represents the lower airway question.',
    bestPath: ['Assess sputum Gram stain quality', 'Look for inflammation and predominant morphology', 'Reject or comment poor-quality specimens by policy', 'Add targeted tests when routine culture is not enough'],
    specimens: ['Expectorated sputum', 'Tracheal aspirate', 'BAL or protected specimen', 'Pleural fluid or lung tissue when available'],
    tests: ['Sputum quality screen', 'Routine bacterial culture', 'Respiratory NAAT panel', 'Legionella testing', 'AFB/fungal studies by request and risk'],
    pitfalls: ['Saliva-heavy sputum can hide the pneumonia question', 'Candida from respiratory culture usually reflects colonization', 'Prior antibiotics reduce culture yield', 'Respiratory panels can detect prolonged shedding'],
    safety: ['Use airborne or biosafety escalation when TB, high-consequence virus, or unusual exposure is suspected'],
    links: [
      { label: 'Lower respiratory guide', path: '/guides?guide=lower-respiratory-infections' },
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' },
      { label: 'Mycobacteria guide', path: '/guides?guide=mycobacteria' }
    ]
  },
  {
    id: 'csf-meningitis',
    syndrome: 'CSF meningitis / encephalitis concern',
    category: 'CNS',
    signal: 'Low-volume critical specimen where rapid prioritization and communication matter.',
    bestPath: ['Document tube, volume, and appearance', 'Prioritize Gram stain and culture for bacterial concern', 'Use molecular panel when indicated', 'Add antigen, fungal, AFB, or serology by syndrome'],
    specimens: ['CSF', 'Blood cultures for bacterial meningitis context', 'Brain abscess aspirate or tissue when applicable', 'Shunt or device material when infected'],
    tests: ['CSF Gram stain', 'CSF culture', 'Multiplex NAAT panel', 'Cryptococcal antigen', 'AFB/fungal culture or molecular testing by risk'],
    pitfalls: ['Negative Gram stain does not exclude meningitis', 'Prior antibiotics reduce culture recovery', 'Molecular positives still need clinical interpretation', 'Chronic meningitis needs targeted testing'],
    safety: ['Communicate critical CSF Gram stain or high-consequence findings immediately by policy'],
    links: [
      { label: 'CNS infection guide', path: '/guides?guide=cns-infections' },
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' },
      { label: 'Parasitology methods guide', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'ocular-keratitis',
    syndrome: 'Keratitis or urgent ocular infection',
    category: 'Eye / ENT',
    signal: 'Tiny high-value specimen where direct plating and exposure history shape the workup.',
    bestPath: ['Clarify contact lens, trauma, surgery, water, and immune status', 'Use corneal scraping or sterile ocular fluid when available', 'Choose bacterial, fungal, Acanthamoeba, and viral testing by risk', 'Communicate sterile-site or vision-threatening results quickly'],
    specimens: ['Corneal scraping', 'Vitreous or aqueous fluid', 'Contact lens or solution when accepted by policy', 'Conjunctival swab only for the right syndrome'],
    tests: ['Gram stain', 'Bacterial culture', 'Fungal culture or stain', 'Acanthamoeba evaluation', 'HSV or adenovirus NAAT by syndrome'],
    pitfalls: ['Surface swabs may not answer a corneal infection question', 'Small specimens require test prioritization', 'Contact lens exposure changes the differential', 'Negative culture does not exclude infection after therapy'],
    safety: ['Escalate sterile ocular fluid positives and invasive mold concerns according to policy'],
    links: [
      { label: 'Eye, ear, and sinus guide', path: '/guides?guide=eye-ear-sinus-infections' },
      { label: 'Other protozoa guide', path: '/guides?guide=other-protozoa' },
      { label: 'Fungal identification guide', path: '/guides?guide=fungal-identification-overview' }
    ]
  },
  {
    id: 'urine-culture-interpretation',
    syndrome: 'Urine culture interpretation problem',
    category: 'Urinary',
    signal: 'Colony count only makes sense with specimen type, number of organisms, symptoms, and host context.',
    bestPath: ['Confirm specimen type and collection quality', 'Review colony count and organism count', 'Correlate with pyuria and symptoms', 'Report contamination or mixed flora clearly', 'Perform susceptibility when organism significance supports it'],
    specimens: ['Clean-catch urine', 'Catheter urine from sampling port', 'Suprapubic aspirate', 'Nephrostomy or other urinary source by policy'],
    tests: ['Routine urine culture', 'Urinalysis correlation', 'Colony count', 'Targeted STI NAAT or AFB/fungal testing when routine culture is the wrong tool'],
    pitfalls: ['Mixed growth from voided urine often means contamination', 'Asymptomatic bacteriuria is not the same as UTI', 'Bag urine and catheter bag specimens can mislead', 'Yeast in urine needs source and host context'],
    safety: ['Use local rules for pregnancy, urologic procedure, catheter-associated infection, and multidrug-resistant organism reporting'],
    links: [
      { label: 'Urinary tract guide', path: '/guides?guide=urinary-tract-infections' },
      { label: 'Syndrome search', path: '/search' },
      { label: 'Biochemical tests', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'genital-discharge-ulcer',
    syndrome: 'Genital discharge, cervicitis, urethritis, or ulcer',
    category: 'Genital',
    signal: 'Routine culture is often not the answer; assay-valid NAAT, serology, wet prep, or lesion testing may be needed.',
    bestPath: ['Start with syndrome and anatomic site', 'Use assay-valid specimen type', 'Choose NAAT for common STI targets', 'Add wet prep, Gram stain, culture, serology, or lesion testing by syndrome', 'Use public health reporting rules'],
    specimens: ['First-catch urine', 'Vaginal swab', 'Endocervical or urethral swab', 'Rectal or pharyngeal swab when validated', 'Lesion swab or serum for ulcer disease'],
    tests: ['Chlamydia and gonorrhea NAAT', 'Gonorrhea culture for susceptibility or treatment failure', 'Trichomonas testing', 'Syphilis serology', 'HSV lesion NAAT', 'M. genitalium NAAT when indicated'],
    pitfalls: ['Midstream urine is not first-catch urine', 'A genital NAAT may not be validated for every site', 'Candida and genital mycoplasmas can colonize', 'Early syphilis serology can be negative'],
    safety: ['Follow STI reporting, partner-management, pregnancy, neonatal, and sexual-assault workflow rules when applicable'],
    links: [
      { label: 'Genital tract guide', path: '/guides?guide=genital-tract-infections' },
      { label: 'Spirochetes guide', path: '/guides?guide=spirochetes' },
      { label: 'Mycoplasma guide', path: '/guides?guide=mycoplasma-ureaplasma' }
    ]
  },
  {
    id: 'acute-diarrhea-stool-testing',
    syndrome: 'Acute or persistent diarrhea',
    category: 'Gastrointestinal',
    signal: 'Stool testing should match duration, blood, fever, antibiotics, travel, immune status, and outbreak risk.',
    bestPath: ['Classify diarrhea syndrome', 'Choose stool culture, GI panel, toxin testing, or parasite testing by risk', 'Use correct transport or preservative', 'Route public health isolates or positives when required'],
    specimens: ['Fresh diarrheal stool', 'Stool in validated transport medium', 'Preserved stool for parasite workups', 'Rectal swab only when the assay accepts it'],
    tests: ['Routine stool culture', 'Multiplex GI NAAT panel', 'C. difficile algorithm', 'Shiga toxin testing', 'Ova and parasite or antigen testing by exposure'],
    pitfalls: ['Formed stool is often inappropriate for diarrheal testing', 'NAAT may detect shedding or colonization', 'Negative routine culture does not exclude viral or parasitic disease', 'C. difficile testing needs compatible diarrhea'],
    safety: ['Escalate outbreak-associated, Shiga toxin, typhoidal Salmonella, Vibrio, or other reportable findings by local policy'],
    links: [
      { label: 'GI tract guide', path: '/guides?guide=gastrointestinal-tract-infections' },
      { label: 'Parasitology methods guide', path: '/guides?guide=parasitology-lab-methods-overview' },
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' }
    ]
  },
  {
    id: 'wound-culture-quality',
    syndrome: 'Wound, abscess, bite, or soft tissue infection',
    category: 'Wound / Tissue',
    signal: 'Specimen depth decides whether culture reflects infection or surface colonization.',
    bestPath: ['Define wound type and depth', 'Prefer aspirate, tissue, or deep operative material', 'Use Gram stain correlation', 'Set aerobic and anaerobic culture when appropriate', 'Escalate rapidly progressive infection'],
    specimens: ['Abscess aspirate', 'Deep tissue or biopsy', 'Operative specimen', 'Bone if osteomyelitis is suspected', 'Superficial swab only when better sample is unavailable and policy allows'],
    tests: ['Gram stain', 'Aerobic culture', 'Anaerobic culture with proper transport', 'Fungal or AFB culture by exposure and host risk', 'Susceptibility testing when significance supports it'],
    pitfalls: ['Surface swabs often recover colonizers', 'Chronic wounds are commonly polymicrobial', 'Dry swabs reduce anaerobe recovery', 'Cellulitis without drainage may not yield a useful culture'],
    safety: ['Rapidly progressive necrotizing infection, gas gangrene, invasive mold, or toxin syndromes need urgent communication'],
    links: [
      { label: 'Skin and wound guide', path: '/guides?guide=skin-soft-tissue-wound-infections' },
      { label: 'Anaerobe guide', path: '/guides?guide=anaerobic-bacteriology-lab-considerations' },
      { label: 'Special pathogens hub', path: '/special-pathogens' }
    ]
  },
  {
    id: 'sterile-fluid-bone-tissue',
    syndrome: 'Sterile fluid, bone, marrow, or tissue infection',
    category: 'Sterile Site',
    signal: 'High-value specimen where exact source, volume, processing, and rapid communication shape interpretation.',
    bestPath: ['Document exact source', 'Prioritize direct exam and culture setup', 'Use concentration or blood culture bottle inoculation when validated', 'Add anaerobic, fungal, AFB, molecular, or histology support by syndrome'],
    specimens: ['Synovial fluid', 'Pleural or peritoneal fluid', 'Pericardial or other sterile fluid', 'Bone biopsy', 'Bone marrow aspirate', 'Solid tissue or prosthetic material'],
    tests: ['Gram stain', 'Aerobic and anaerobic culture', 'Fungal culture', 'AFB culture', 'Molecular testing by indication', 'Histopathology or special stains'],
    pitfalls: ['Low volume can reduce yield', 'Prior antibiotics can sterilize culture', 'Skin flora can be true hardware pathogens', 'Drain fluid may represent colonization rather than sterile-site infection'],
    safety: ['Communicate positive Gram stain or culture from sterile sites quickly and escalate high-risk organisms by policy'],
    links: [
      { label: 'Sterile fluids and tissue guide', path: '/guides?guide=sterile-fluids-bone-tissue-infections' },
      { label: 'Bloodstream infection guide', path: '/guides?guide=bloodstream-infections' },
      { label: 'Fungal identification guide', path: '/guides?guide=fungal-identification-overview' }
    ]
  },
  {
    id: 'chronic-cough-afb',
    syndrome: 'Chronic cough / AFB concern',
    category: 'Respiratory',
    signal: 'TB or NTM question; routine bacterial culture is not the main answer.',
    bestPath: ['Airborne and laboratory safety screen', 'AFB smear for burden', 'MTB complex NAAT when indicated', 'Mycobacterial culture for recovery and susceptibility'],
    specimens: ['Multiple sputum specimens when appropriate', 'Bronchoscopy material', 'Tissue or sterile fluid by syndrome', 'Processed sediment after NALC-NaOH when validated'],
    tests: ['AFB smear', 'NALC-NaOH processing', 'LJ / Middlebrook / MGIT culture', 'MTB NAAT', 'MPT64 or molecular ID from culture'],
    pitfalls: ['Smear negative does not exclude TB or NTM', 'Routine culture negativity is not reassuring', 'NTM interpretation depends on source and repeat recovery'],
    safety: ['Escalate suspected MTB before aerosol-generating manipulation', 'Use approved mycobacteriology containment and reporting workflow'],
    links: [
      { label: 'Mycobacteria guide', path: '/guides?guide=mycobacteria' },
      { label: 'Special pathogens hub', path: '/special-pathogens' },
      { label: 'Test cards', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'deep-abscess-anaerobe',
    syndrome: 'Deep abscess / anaerobe concern',
    category: 'Wound / Tissue',
    signal: 'Specimen quality and oxygen protection decide whether anaerobes can be recovered.',
    bestPath: ['Confirm appropriate source', 'Protect from oxygen quickly', 'Direct Gram stain', 'Set anaerobic and aerobic culture comparison', 'Use morphology plus selective media'],
    specimens: ['Aspirate', 'Tissue or biopsy', 'Abscess contents', 'Normally sterile fluid', 'Deep wound material'],
    tests: ['Anaerobic transport', 'PRAS/reduced media', 'Anaerobic blood agar', 'BBE / LKV', 'Aerotolerance', 'Special-potency disks'],
    pitfalls: ['Superficial swabs are often misleading', 'Negative anaerobic culture after oxygen exposure is weak evidence', 'Polymicrobial infection is expected'],
    safety: ['Handle toxin-associated Clostridium-like syndromes and sterile-site isolates with appropriate escalation'],
    links: [
      { label: 'Anaerobic lab guide', path: '/guides?guide=anaerobic-bacteriology-lab-considerations' },
      { label: 'Anaerobe roadmap', path: '/obligate-anaerobe-roadmap' },
      { label: 'Test cards', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'tick-fever-rash',
    syndrome: 'Tick fever with rash, eschar, or cytopenias',
    category: 'Vector-borne',
    signal: 'Rickettsial, ehrlichial, or anaplasmal disease; timing drives PCR versus serology.',
    bestPath: ['Use exposure and geography immediately', 'Whole-blood PCR early for Ehrlichia/Anaplasma', 'Tissue or eschar PCR when appropriate', 'Paired IFA serology for confirmation'],
    specimens: ['Whole blood early', 'Eschar swab or biopsy when present', 'Rash biopsy when indicated', 'Acute and convalescent serum'],
    tests: ['Rickettsial IFA', 'Vector-borne PCR', 'Morulae smear clue', 'Paired serology with fourfold rise'],
    pitfalls: ['Acute serology can be negative in the first week', 'Morulae are helpful but insensitive', 'Cross-reactivity can limit species-level certainty'],
    safety: ['Do not attempt routine culture; use molecular, serologic, or reference-lab pathways'],
    links: [
      { label: 'Intracellular agents guide', path: '/guides?guide=obligate-intracellular-nonculturable-agents' },
      { label: 'Serology basics', path: '/guides?guide=serologic-diagnosis' },
      { label: 'Test cards', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'atypical-pneumonia',
    syndrome: 'Atypical pneumonia',
    category: 'Respiratory',
    signal: 'Respiratory syndrome where routine sputum Gram stain may not reveal the pathogen.',
    bestPath: ['Use exposure history first', 'Choose NAAT or antigen/serology by suspected group', 'Keep special culture only when it changes public health or outbreak work'],
    specimens: ['Respiratory swab or aspirate validated for NAAT', 'Serum when serology is appropriate', 'Urine for selected antigen tests', 'Lower respiratory specimen by severity'],
    tests: ['M. pneumoniae NAAT or paired serology', 'Legionella urinary antigen plus BCYE culture when needed', 'C. psittaci PCR or serology by exposure'],
    pitfalls: ['Cold agglutinins are nonspecific', 'Legionella urinary antigen has organism coverage limits', 'Bird exposure changes the differential'],
    safety: ['Escalate unusual exposure clusters and outbreak-associated pneumonia patterns'],
    links: [
      { label: 'Mycoplasma guide', path: '/guides?guide=mycoplasma-ureaplasma' },
      { label: 'Legionella guide', path: '/guides?guide=legionella' },
      { label: 'Intracellular agents guide', path: '/guides?guide=obligate-intracellular-nonculturable-agents' }
    ]
  },
  {
    id: 'persistent-urethritis-cervicitis',
    syndrome: 'Persistent urethritis / cervicitis',
    category: 'Genital',
    signal: 'Culture-negative STI syndrome where NAAT and resistance-aware interpretation matter.',
    bestPath: ['Confirm specimen type is assay-valid', 'NAAT for common STI targets', 'Add M. genitalium NAAT when persistent or clinically indicated', 'Use resistance marker data when available'],
    specimens: ['First-catch urine', 'Vaginal swab', 'Endocervical swab', 'Urethral swab', 'Extragenital specimen only if assay-validated'],
    tests: ['C. trachomatis NAAT', 'N. gonorrhoeae NAAT/culture by context', 'M. genitalium NAAT', 'Macrolide or fluoroquinolone resistance markers when available'],
    pitfalls: ['Routine genital culture will miss key targets', 'Colonization and disease can overlap for some genital mycoplasmas', 'Prior therapy can reduce yield'],
    safety: ['Follow local STI reporting and partner-management rules'],
    links: [
      { label: 'Mycoplasma guide', path: '/guides?guide=mycoplasma-ureaplasma' },
      { label: 'Intracellular agents guide', path: '/guides?guide=obligate-intracellular-nonculturable-agents' },
      { label: 'Neisseria guide', path: '/guides?guide=neisseria-moraxella-catarrhalis' }
    ]
  },
  {
    id: 'genital-ulcer',
    syndrome: 'Genital ulcer',
    category: 'Genital',
    signal: 'Direct lesion testing, syphilis serology, and syndrome-specific NAAT are more useful than routine swab culture.',
    bestPath: ['Assess lesion stage and exposure', 'Syphilis serology algorithm', 'Direct detection from lesion when appropriate', 'Add HSV/chancroid/donovanosis testing by setting'],
    specimens: ['Lesion exudate or swab', 'Serum', 'Tissue or crush prep for donovanosis suspicion', 'CSF only when neurosyphilis evaluation is clinically indicated'],
    tests: ['RPR/VDRL plus treponemal test', 'Darkfield or DFA when validated', 'Donovan bodies tissue smear', 'NAAT for assay-covered ulcer pathogens'],
    pitfalls: ['Early syphilis serology can be negative', 'Treponemal tests may remain positive after old infection', 'Oral lesions are not good darkfield specimens for syphilis interpretation'],
    safety: ['Use public health reporting workflows for syphilis and other reportable STI patterns'],
    links: [
      { label: 'Spirochetes guide', path: '/guides?guide=spirochetes' },
      { label: 'Intracellular agents guide', path: '/guides?guide=obligate-intracellular-nonculturable-agents' },
      { label: 'Serology basics', path: '/guides?guide=serologic-diagnosis' }
    ]
  },
  {
    id: 'erythema-migrans-lyme',
    syndrome: 'Erythema migrans / Lyme concern',
    category: 'Vector-borne',
    signal: 'Classic early localized Lyme can be clinical; serology becomes more useful later.',
    bestPath: ['Use compatible lesion plus exposure and geography', 'Do not over-rely on early negative serology', 'Use two-tier serology for disseminated or later disease', 'Reserve PCR for selected specimen questions'],
    specimens: ['Serum for two-tier serology', 'Synovial fluid in selected Lyme arthritis questions', 'Tissue only by specific indication'],
    tests: ['Standard two-tier serology', 'Modified two-tier serology', 'Selected Borrelia PCR', 'Clinical recognition of erythema migrans'],
    pitfalls: ['Early antibodies may be absent', 'IgM interpretation has timing limits', 'Serology can remain positive after prior infection'],
    safety: ['Assess neurologic, cardiac, pregnancy, or disseminated features according to local clinical protocols'],
    links: [
      { label: 'Spirochetes guide', path: '/guides?guide=spirochetes' },
      { label: 'Serology basics', path: '/guides?guide=serologic-diagnosis' },
      { label: 'Test cards', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'freshwater-jaundice-renal',
    syndrome: 'Freshwater or animal urine exposure with jaundice/renal findings',
    category: 'Zoonotic / Exposure',
    signal: 'Leptospirosis question; specimen choice changes across illness stages.',
    bestPath: ['Use exposure timing', 'PCR from blood/CSF early when available', 'Urine PCR or culture later', 'MAT or paired serology for confirmation'],
    specimens: ['Blood early', 'CSF early if meningitis', 'Urine later', 'Acute and convalescent serum'],
    tests: ['Leptospira PCR', 'Leptospira MAT', 'EMJH or Fletcher culture', 'Darkfield only as supportive and limited'],
    pitfalls: ['Darkfield artifacts can mislead', 'Culture is slow', 'Early MAT can be negative', 'Single titers need context'],
    safety: ['Use exposure history and severe disease clues such as renal failure, hemorrhage, or hepatic involvement to escalate'],
    links: [
      { label: 'Spirochetes guide', path: '/guides?guide=spirochetes' },
      { label: 'Test cards', path: '/biochemical-tests' },
      { label: 'Molecular basics', path: '/guides?guide=nucleic-acid-analysis' }
    ]
  },
  {
    id: 'animal-dairy-aerosol-fever',
    syndrome: 'Culture-negative fever with animal, dairy, or aerosol exposure',
    category: 'Zoonotic / Safety',
    signal: 'Brucella, Coxiella, Francisella, or related high-risk pattern; safety escalation comes before extra bench work.',
    bestPath: ['Recognize exposure trigger', 'Stop unnecessary open-bench manipulation for suspicious isolates', 'Use serology/NAAT/reference testing by suspected agent', 'Notify leadership or public health when required'],
    specimens: ['Blood culture with safety awareness', 'Serum', 'Respiratory or tissue specimen by syndrome', 'Reference-lab approved specimen'],
    tests: ['Brucella rule-out', 'Coxiella phase serology', 'Francisella rule-out', 'Reference-lab molecular or serologic testing'],
    pitfalls: ['Tiny slow-growing coccobacilli are easy to overwork unsafely', 'Routine culture may expose staff', 'Single serology may not define timing'],
    safety: ['Escalate suspected Brucella, Francisella, or Coxiella immediately according to laboratory policy'],
    links: [
      { label: 'Brucella guide', path: '/guides?guide=brucella' },
      { label: 'Francisella guide', path: '/guides?guide=francisella' },
      { label: 'Special pathogens hub', path: '/special-pathogens' }
    ]
  },
  {
    id: 'pregnancy-neonatal-genital-mycoplasma',
    syndrome: 'Pregnancy or neonatal genital mycoplasma concern',
    category: 'Pregnancy / Neonatal',
    signal: 'Ureaplasma or Mycoplasma can matter in selected pregnancy, postpartum, neonatal, or sterile-site contexts.',
    bestPath: ['Use syndrome and sterile-site significance', 'Choose NAAT or specialized culture only if validated and clinically useful', 'Interpret genital detection carefully', 'Consider susceptibility or resistance when management requires it'],
    specimens: ['Amniotic fluid or placental tissue by indication', 'Neonatal respiratory specimen', 'Blood or CSF for invasive disease', 'Genital specimen by validated assay'],
    tests: ['Ureaplasma NAAT or specialized culture', 'M. hominis culture/NAAT', 'A7/A8 agar', 'Mycoplasma susceptibility principles'],
    pitfalls: ['Colonization can overlap with disease', 'Routine culture misses these organisms', 'No cell wall means beta-lactam logic is not useful'],
    safety: ['Escalate sterile-site neonatal or postpartum isolates according to clinical severity and lab policy'],
    links: [
      { label: 'Mycoplasma guide', path: '/guides?guide=mycoplasma-ureaplasma' },
      { label: 'Test cards', path: '/biochemical-tests' },
      { label: 'Unknown workup', path: '/unknown-isolate-workup' }
    ]
  }
];

const categories = ['All', ...Array.from(new Set(diagnosticPaths.map((path) => path.category)))];

const SyndromeDiagnosticPath: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(diagnosticPaths[0].id);
  const [category, setCategory] = useState('All');

  const filteredPaths = useMemo(() => {
    if (category === 'All') {
      return diagnosticPaths;
    }
    return diagnosticPaths.filter((path) => path.category === category);
  }, [category]);

  const selectedPath = diagnosticPaths.find((path) => path.id === selectedId) ?? diagnosticPaths[0];

  const handleCategoryChange = (nextCategory: string) => {
    setCategory(nextCategory);
    const firstMatch = nextCategory === 'All'
      ? diagnosticPaths[0]
      : diagnosticPaths.find((path) => path.category === nextCategory);
    if (firstMatch) {
      setSelectedId(firstMatch.id);
    }
  };

  const renderList = (items: string[]) => (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="syndrome-path-page">
      <header className="syndrome-path-hero">
        <div>
          <span className="syndrome-path-kicker">Syndrome to diagnostic path</span>
          <h1>Pick the presentation. Choose the test strategy.</h1>
          <p>
            This tool helps students step away from routine colony logic when the clinical picture calls for special
            specimens, NAAT, serology, direct microscopy, safety escalation, or reference workflows.
          </p>
        </div>
        <button onClick={() => navigate('/special-pathogens')}>
          <FontAwesomeIcon icon={faLink} />
          Special pathogens hub
        </button>
      </header>

      <section className="syndrome-path-layout">
        <aside className="syndrome-path-picker" aria-label="Syndrome selector">
          <div className="syndrome-path-filter" aria-label="Syndrome categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => handleCategoryChange(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="syndrome-path-options">
            {filteredPaths.map((path) => (
              <button
                key={path.id}
                className={selectedPath.id === path.id ? 'active' : ''}
                onClick={() => setSelectedId(path.id)}
              >
                <span>{path.category}</span>
                {path.syndrome}
              </button>
            ))}
          </div>
        </aside>

        <article className="syndrome-path-result">
          <div className="syndrome-path-result-header">
            <div>
              <span>{selectedPath.category}</span>
              <h2>{selectedPath.syndrome}</h2>
              <p>{selectedPath.signal}</p>
            </div>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <div className="syndrome-path-panels">
            <section>
              <h3>
                <FontAwesomeIcon icon={faClipboardCheck} />
                Best first path
              </h3>
              {renderList(selectedPath.bestPath)}
            </section>
            <section>
              <h3>
                <FontAwesomeIcon icon={faVial} />
                Specimens
              </h3>
              {renderList(selectedPath.specimens)}
            </section>
            <section>
              <h3>
                <FontAwesomeIcon icon={faFlaskVial} />
                Tests that fit
              </h3>
              {renderList(selectedPath.tests)}
            </section>
            <section>
              <h3>
                <FontAwesomeIcon icon={faCircleExclamation} />
                Pitfalls
              </h3>
              {renderList(selectedPath.pitfalls)}
            </section>
          </div>

          <div className="syndrome-path-safety">
            <h3>
              <FontAwesomeIcon icon={faShieldHalved} />
              Safety and escalation
            </h3>
            {renderList(selectedPath.safety)}
          </div>

          <div className="syndrome-path-links" aria-label="Related Learn Microbes links">
            {selectedPath.links.map((link) => (
              <button key={link.path} onClick={() => navigate(link.path)}>
                {link.label}
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default SyndromeDiagnosticPath;
