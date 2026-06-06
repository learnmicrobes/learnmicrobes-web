import React, { useState, useEffect } from 'react';
import { faFlask, faVial, faVialCircleCheck, faBookOpen, faVials } from '@fortawesome/free-solid-svg-icons';
import './calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faQuestionCircle, faSpinner, faSearch, faRedo, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';

type TestResult = '+' | '-' | 'V' | '';
type TestImportance = 'green' | 'pink' | 'supportive';

interface BacteriaProfile {
  [key: string]: TestResult;
}

interface BacteriaProfiles {
  [key: string]: BacteriaProfile;
}

interface TestImportanceProfile {
  [key: string]: TestImportance;
}

interface QuizOptionsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

interface IdentificationResult {
  bacteria: string;
  matchPercentage: string;
  testsConsidered: number;
  criticalMismatches: string[];
}

const QuizOptions: React.FC<QuizOptionsProps & { isAnswered: boolean, correctAnswer: string }> = ({ options, selectedOption, onSelect, isAnswered, correctAnswer }) => (
  <div className="quiz-options">
    {options.map((option) => {
      const isCorrect = option === correctAnswer;
      const isSelected = selectedOption === option;
      let statusClass = "";
      
      if (isAnswered) {
        if (isCorrect) statusClass = "correct-choice";
        else if (isSelected) statusClass = "incorrect-choice";
        else statusClass = "dimmed-choice";
      } else if (isSelected) {
        statusClass = "selected-choice";
      }

      return (
        <div 
          key={option} 
          className={`quiz-card ${statusClass}`}
          onClick={() => !isAnswered && onSelect(option)}
        >
          <div className="choice-indicator"></div>
          <span className="choice-text">{option}</span>
        </div>
      );
    })}
  </div>
);

const bacteriaProfiles: BacteriaProfiles = {
    "Escherichia coli": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "-",
        urea: "-",
        motility: "V",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "V",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "V",
        lRhamnose: "-",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Ewingella americana": {
        indole: "-",
        methylRed: "+",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "+",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Hafnia alvei": {
        indole: "-",
        methylRed: "-",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "-",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Plesiomonas shigelloides": {
        indole: "+",
        methylRed: "V",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "V",
        sucrose: "-",
        dMannitol: "-",
        adonitol: "-",
        inositol: "+",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Shigella sonnei": {
        indole: "-",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "-",
        urea: "-",
        motility: "-",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Shigella except sonnei": {
        indole: "V",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "-",
        urea: "-",
        motility: "-",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "V",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "V",
        lArabinose: "V",
        raffinose: "V",
        lRhamnose: "-",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Salmonella enteritidis": {
        indole: "-",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "+",
        h2s: "+",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "-",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Salmonella typhi": {
        indole: "-",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "+",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Edwardsiella tarda": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "+",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "-",
        sucrose: "-",
        dMannitol: "-",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Citrobacter freundii": {
        indole: "-",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "+",
        h2s: "+",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Citrobacter braakii": {
        indole: "-",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "+",
        h2s: "+",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Citrobacter koseri": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "+",
        h2s: "-",
        urea: "+",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "+",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Klebsiella pneumoniae": {
        indole: "-",
        methylRed: "V",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "+",
        motility: "-",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "+",
        inositol: "+",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "+",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Klebsiella oxytoca": {
        indole: "+",
        methylRed: "-",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "+",
        motility: "-",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "+",
        inositol: "+",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "+",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Enterobacter cloacae": {
        indole: "-",
        methylRed: "-",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "+",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "+",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Enterobacter aerogenes": {
        indole: "-",
        methylRed: "-",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "+",
        inositol: "+",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "+",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "+",
        DNAse: "-"
    },
    "Cronobacter sakazakii": {
        indole: "-",
        methylRed: "-",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "+",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "+",
        gasFromDGlucose: "+",
        lactose: "+",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "-",
        inositol: "+",
        dSorbitol: "-",
        lArabinose: "+",
        raffinose: "+",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Pantoea agglomerans": {
        indole: "-",
        methylRed: "V",
        vogesProskauer: "+",
        citrate: "V",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    },
    "Serratia marcescens": {
        indole: "-",
        methylRed: "V",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "-",
        inositol: "V",
        dSorbitol: "+",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Serratia odorifera": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "+",
        citrate: "+",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "+",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "+",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "+",
        inositol: "+",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "-",
        Gelatin: "+",
        DNAse: "-"
    },
    "Proteus vulgaris": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "+",
        urea: "+",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "+",
        gasFromDGlucose: "+",
        lactose: "-",
        sucrose: "+",
        dMannitol: "-",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "+",
        Gelatin: "+",
        DNAse: "-"
    },
    "Proteus mirabilis": {
        indole: "-",
        methylRed: "+",
        vogesProskauer: "V",
        citrate: "+",
        h2s: "+",
        urea: "+",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "+",
        gasFromDGlucose: "+",
        lactose: "-",
        sucrose: "-",
        dMannitol: "-",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "+",
        Gelatin: "+",
        DNAse: "-"
    },
    "Morganella morganii": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "-",
        urea: "+",
        motility: "V",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "+",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "-",
        dMannitol: "-",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Providencia rettgeri": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "+",
        h2s: "-",
        urea: "+",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "+",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "-",
        dMannitol: "+",
        adonitol: "+",
        inositol: "+",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "+",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Providencia stuartii": {
        indole: "+",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "+",
        h2s: "-",
        urea: "-",
        motility: "+",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "-",
        phenylalanineDeaminase: "+",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "V",
        dMannitol: "-",
        adonitol: "-",
        inositol: "+",
        dSorbitol: "-",
        lArabinose: "-",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "+",
        Gelatin: "-",
        DNAse: "-"
    },
    "Yersinia enterocolitica": {
        indole: "V",
        methylRed: "+",
        vogesProskauer: "-",
        citrate: "-",
        h2s: "-",
        urea: "+",
        motility: "-",
        lysineDecarboxylase: "-",
        arginineDihydrolase: "-",
        ornithineDecarboxylase: "+",
        phenylalanineDeaminase: "-",
        gasFromDGlucose: "-",
        lactose: "-",
        sucrose: "+",
        dMannitol: "+",
        adonitol: "-",
        inositol: "-",
        dSorbitol: "+",
        lArabinose: "+",
        raffinose: "-",
        lRhamnose: "-",
        KCN: "-",
        Gelatin: "-",
        DNAse: "-"
    }
};

const testImportance: Record<string, TestImportanceProfile> = {
    "Escherichia coli": {
        "indole": "green",
        "gasFromDGlucose": "green"
    },
    "Plesiomonas shigelloides": {
        "indole": "green"
    },
    "Shigella sonnei": {
        "ornithineDecarboxylase": "green"
    },
    "Shigella except sonnei": {
        "ornithineDecarboxylase": "green"
    },
    "Salmonella enteritidis": {
        "indole": "green",
        "lysineDecarboxylase": "green",
        "gasFromDGlucose": "green"
    },
    "Salmonella typhi": {
        "lysineDecarboxylase": "green"
    },
    "Edwardsiella tarda": {
        "indole": "green",
        "h2s": "green"
    },
    "Citrobacter freundii": {
        "methylRed": "pink"
    },
    "Citrobacter braakii": {
        "vogesProskauer": "pink"
    },
    "Citrobacter koseri": {
        "methylRed": "pink",
        "h2s": "green"
    },
    "Klebsiella pneumoniae": {
        "indole": "green",
        "motility": "pink"  // Fixed typo
    },
    "Klebsiella oxytoca": {
        "indole": "green",
        "motility": "pink"
    },
    "Enterobacter cloacae": {
        "methylRed": "pink",
        "arginineDihydrolase": "green",
        "ornithineDecarboxylase": "green"
    },
    "Serratia marcescens": {
        "DNAse": "green"
    },
    "Serratia odorifera": {
        "Gelatin": "green"
    },
    "Proteus vulgaris": {
        "indole": "green",
        "h2s": "pink",
        "phenylalanineDeaminase": "pink",
        "Gelatin": "pink"
    },
    "Proteus mirabilis": {
        "indole": "green",
        "h2s": "pink",
        "phenylalanineDeaminase": "pink",
        "Gelatin": "pink"
    },
    "Morganella morganii": {
        "citrate": "green",
        "h2s": "green",
        "phenylalanineDeaminase": "pink"
    },
    "Providencia rettgeri": {
        "citrate": "green",
        "phenylalanineDeaminase": "pink",
        "dMannitol": "green",
        "adonitol": "green",
        "inositol": "green"
    },
    "Providencia stuartii": {
        "citrate": "green",
        "dMannitol": "green",
        "adonitol": "green",
        "inositol": "green"
    }
};

const categoryHints: Record<string, string> = {
 // Escherichia
 "Escherichia coli": "Common gut commensal, but pathogenic strains exist (e.g., EHEC). Lactose fermenter, indole positive.",
 "Ewingella americana": "Rare environmental organism, often misidentified. Oxidase negative, non-motile.",
 
 // Hafnia
 "Hafnia alvei": "Often confused with Salmonella. Late lactose fermenter, lysine decarboxylase positive.",
 
 // Plesiomonas
 "Plesiomonas shigelloides": "Only oxidase-positive Enterobacteriaceae. Associated with water exposure.",
 
 // Shigella
 "Shigella sonnei": "Non-motile, ornithine decarboxylase positive. Causes bacillary dysentery.",
 "Shigella except sonnei": "Non-motile, ornithine decarboxylase negative. More virulent than S. sonnei.",
 
 // Salmonella
 "Salmonella enteritidis": "Foodborne pathogen. H2S positive, motile, lysine decarboxylase positive.",
 "Salmonella typhi": "Typhoid fever agent. Non-lactose fermenter, urease negative.",
 
 // Edwardsiella
 "Edwardsiella tarda": "Fish pathogen, rare in humans. H2S strongly positive, indole positive.",
 
 // Citrobacter
 "Citrobacter freundii": "H2S positive, often confused with Salmonella. Late lactose fermenter.",
 "Citrobacter braakii": "VP positive Citrobacter. Rare clinical isolate.",
 "Citrobacter koseri": "Previously called C. diversus. Associated with neonatal meningitis.",
 
 // Klebsiella
 "Klebsiella pneumoniae": "Encapsulated, non-motile. Causes pneumonia and UTIs.",
 "Klebsiella oxytoca": "Indole-positive Klebsiella. Associated with antibiotic-resistant infections.",
 
 // Enterobacter
 "Enterobacter cloacae": "Nosocomial pathogen. Motile, often multidrug resistant.",
 "Enterobacter aerogenes": "Now called Klebsiella aerogenes. VP positive, lysine decarboxylase positive.",
 
 // Cronobacter
 "Cronobacter sakazakii": "Formerly Enterobacter sakazakii. Neonatal meningitis risk in powdered formula.",
 
 // Pantoea
 "Pantoea agglomerans": "Plant pathogen, occasional human opportunist. Yellow pigmented colonies.",
 
 // Serratia
 "Serratia marcescens": "Red pigment at 25°C. DNase positive, common in nosocomial infections.",
 "Serratia odorifera": "Produces potato-like odor. Rare but increasingly reported in clinical specimens.",
 
 // Proteus
 "Proteus vulgaris": "Swarming motility, phenylalanine deaminase positive. H2S strongly positive.",
 "Proteus mirabilis": "Swarming motility, urease positive. Common UTI pathogen.",
 
 // Morganella
 "Morganella morganii": "Phenylalanine deaminase positive. Often resistant to multiple antibiotics.",
 
 // Providencia
 "Providencia rettgeri": "Urease positive, motile. Associated with urinary tract infections.",
 "Providencia stuartii": "Urease variable. Common in catheter-associated UTIs.",
 
 // Yersinia
 "Yersinia enterocolitica": "Psychrophilic (grows at 4°C). Associated with pork consumption."
};

// 3. Add clinical notes (if you want to keep them)

const clinicalNotes: Record<string, string> = {
// Escherichia
"Escherichia coli": "Leading cause of UTIs and traveler's diarrhea. EHEC strains produce Shiga toxin (HUS risk).",
"Ewingella americana": "Rare opportunistic pathogen, mostly in immunocompromised patients. Often misidentified in labs.",

// Hafnia
"Hafnia alvei": "Controversial pathogen. Some strains cause gastroenteritis. Often isolated with other pathogens.",

// Plesiomonas
"Plesiomonas shigelloides": "Waterborne pathogen. Causes acute diarrhea (often from raw seafood). Only oxidase-positive Enterobacteriaceae.",

// Shigella
"Shigella sonnei": "Causes bacillary dysentery in daycare settings. Produces mildest form of shigellosis.",
"Shigella except sonnei": "More virulent than S. sonnei. S. dysenteriae produces Shiga toxin (epidemic dysentery).",

// Salmonella
"Salmonella enteritidis": "Common foodborne pathogen (poultry/eggs). Causes gastroenteritis; can invade bloodstream.",
"Salmonella typhi": "Typhoid fever agent. Human-restricted; systemic infection requires antibiotic treatment.",

// Edwardsiella
"Edwardsiella tarda": "Zoonotic pathogen (fish/reptiles). Causes wound infections after aquatic exposure.",

// Citrobacter
"Citrobacter freundii": "Nosocomial pathogen. Associated with UTIs, respiratory infections, and neonatal meningitis.",
"Citrobacter braakii": "Rare clinical isolate. Often resistant to multiple antibiotics.",
"Citrobacter koseri": "Neonatal meningitis risk (brain abscesses characteristic). Previously called C. diversus.",

// Klebsiella
"Klebsiella pneumoniae": "Classic pneumonia with 'currant jelly' sputum. Carbapenem-resistant strains (CRE) are emerging threats.",
"Klebsiella oxytoca": "Antibiotic-associated hemorrhagic colitis. Often ESBL-positive.",

// Enterobacter
"Enterobacter cloacae": "ICU-acquired infections. Intrinsically resistant to ampicillin; frequent MDR strains.",
"Enterobacter aerogenes": "Now reclassified as Klebsiella aerogenes. Common in ventilator-associated pneumonia.",

// Cronobacter
"Cronobacter sakazakii": "Neonatal meningitis from contaminated powdered infant formula. Formerly Enterobacter sakazakii.",

// Pantoea
"Pantoea agglomerans": "Plant pathogen. Human infections rare (usually traumatic inoculation).",

// Serratia
"Serratia marcescens": "Notorious for contaminating IV fluids. Red pigment (prodigiosin) at 25°C.",
"Serratia odorifera": "Potato-like odor. Emerging uropathogen in catheterized patients.",

// Proteus
"Proteus vulgaris": "Wound/UTI pathogen. Strong urease producer (alkaline urine, struvite stones).",
"Proteus mirabilis": "Classic UTI cause with 'swarming' motility. Associated with catheter encrustation.",

// Morganella
"Morganella morganii": "Post-surgical infections. Naturally resistant to colistin and polymyxin B.",

// Providencia
"Providencia rettgeri": "UTIs in long-term catheterized patients. Highly motile with fishy odor.",
"Providencia stuartii": "Chronic UTIs in nursing home patients. Often extensively drug-resistant (XDR).",

// Yersinia
"Yersinia enterocolitica": "Foodborne (undercooked pork). Can mimic appendicitis ('pseudoappendicitis')."
};

const normalizeTestResult = (result: string): TestResult => {
  const cleaned = result
    .replace(/\(v\)/gi, '')
    .trim()
    .toUpperCase();
  
  if (cleaned === '+' || cleaned === '-' || cleaned === 'V') {
    return cleaned;
  }
  return '';
};

const formatTestName = (test: string): string => {
  return test
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace('D Glucose', 'D-Glucose');
};

const getBacteriaHint = (bacteria: string, hintLevel: number = 1): string => {
  const profile = bacteriaProfiles[bacteria];
  const importance = testImportance[bacteria] || {};
  
  let hintHTML = '';
  
  if (hintLevel === 1) {
    hintHTML += `
      <div class="hint-tier">
        <strong>Category:</strong> ${categoryHints[bacteria] || 'Enterobacteriaceae family'}
      </div>
    `;
    return hintHTML;
  }
  
  if (hintLevel === 2) {
    const keyTests = Object.entries(importance)
      .filter(([_, val]) => val === 'green')
      .map(([test]) => `${formatTestName(test)} = ${profile[test]}`);
    
    hintHTML += `
      <div class="hint-tier">
        <strong>Key Tests:</strong> 
        ${keyTests.length > 0 ? keyTests.join(', ') : 'No distinctive key tests'}
      </div>
    `;
    return hintHTML;
  }
  
  hintHTML += `
    <div class="hint-tier">
      <strong>Clinical:</strong> ${{
      // Escherichia
      "Escherichia coli": "Leading cause of UTIs and traveler's diarrhea. EHEC strains produce Shiga toxin (HUS risk).",
      "Ewingella americana": "Rare opportunistic pathogen, mostly in immunocompromised patients. Often misidentified in labs.",

      // Hafnia
      "Hafnia alvei": "Controversial pathogen. Some strains cause gastroenteritis. Often isolated with other pathogens.",

      // Plesiomonas
      "Plesiomonas shigelloides": "Waterborne pathogen. Causes acute diarrhea (often from raw seafood). Only oxidase-positive Enterobacteriaceae.",

      // Shigella
      "Shigella sonnei": "Causes bacillary dysentery in daycare settings. Produces mildest form of shigellosis.",
      "Shigella except sonnei": "More virulent than S. sonnei. S. dysenteriae produces Shiga toxin (epidemic dysentery).",

      // Salmonella
      "Salmonella enteritidis": "Common foodborne pathogen (poultry/eggs). Causes gastroenteritis; can invade bloodstream.",
      "Salmonella typhi": "Typhoid fever agent. Human-restricted; systemic infection requires antibiotic treatment.",

      // Edwardsiella
      "Edwardsiella tarda": "Zoonotic pathogen (fish/reptiles). Causes wound infections after aquatic exposure.",

      // Citrobacter
      "Citrobacter freundii": "Nosocomial pathogen. Associated with UTIs, respiratory infections, and neonatal meningitis.",
      "Citrobacter braakii": "Rare clinical isolate. Often resistant to multiple antibiotics.",
      "Citrobacter koseri": "Neonatal meningitis risk (brain abscesses characteristic). Previously called C. diversus.",

      // Klebsiella
      "Klebsiella pneumoniae": "Classic pneumonia with 'currant jelly' sputum. Carbapenem-resistant strains (CRE) are emerging threats.",
      "Klebsiella oxytoca": "Antibiotic-associated hemorrhagic colitis. Often ESBL-positive.",

      // Enterobacter
      "Enterobacter cloacae": "ICU-acquired infections. Intrinsically resistant to ampicillin; frequent MDR strains.",
      "Enterobacter aerogenes": "Now reclassified as Klebsiella aerogenes. Common in ventilator-associated pneumonia.",

      // Cronobacter
      "Cronobacter sakazakii": "Neonatal meningitis from contaminated powdered infant formula. Formerly Enterobacter sakazakii.",

      // Pantoea
      "Pantoea agglomerans": "Plant pathogen. Human infections rare (usually traumatic inoculation).",

      // Serratia
      "Serratia marcescens": "Notorious for contaminating IV fluids. Red pigment (prodigiosin) at 25°C.",
      "Serratia odorifera": "Potato-like odor. Emerging uropathogen in catheterized patients.",

      // Proteus
      "Proteus vulgaris": "Wound/UTI pathogen. Strong urease producer (alkaline urine, struvite stones).",
      "Proteus mirabilis": "Classic UTI cause with 'swarming' motility. Associated with catheter encrustation.",

      // Morganella
      "Morganella morganii": "Post-surgical infections. Naturally resistant to colistin and polymyxin B.",

      // Providencia
      "Providencia rettgeri": "UTIs in long-term catheterized patients. Highly motile with fishy odor.",
      "Providencia stuartii": "Chronic UTIs in nursing home patients. Often extensively drug-resistant (XDR).",

      // Yersinia
      "Yersinia enterocolitica": "Foodborne (undercooked pork). Can mimic appendicitis ('pseudoappendicitis')."
    }[bacteria] || 'Opportunistic pathogen'}
    </div>
  `;
  
  return hintHTML;
};

const getBacteriaCharacteristics = (name: string): string => {
  const profile = bacteriaProfiles[name];
  if (!profile) return "";
  
  const keyTests = Object.entries(testImportance[name] || {})
    .filter(([_, importance]) => importance === 'green')
    .map(([test]) => test);

  return `
    <div class="bacteria-details">
      <p><strong>Key identifying tests:</strong></p>
      <ul>
        ${keyTests.map(test => `
          <li>
            <strong>${formatTestName(test)}:</strong> 
            ${profile[test] === '+' ? 'Positive' : 'Negative'}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
};

const BioCalculator = () => {
  const [mode, setMode] = useState<'calculator' | 'quiz'>('calculator');
  const [testResults, setTestResults] = useState<Record<string, TestResult>>(() => {
    const saved = localStorage.getItem('learnmicrobes_calc_state');
    return saved ? JSON.parse(saved) : {};
  });
  const [resultText, setResultText] = useState('Select positive tests above to identify the bacteria.');
  const [educationalNotes, setEducationalNotes] = useState('');
  const [quizBacteria, setQuizBacteria] = useState('');
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showCalculatorHelp, setShowCalculatorHelp] = useState(() => (
    localStorage.getItem('learnmicrobes_bio_calculator_help') === 'open'
  ));

  // Auto-save calculator state
  useEffect(() => {
    localStorage.setItem('learnmicrobes_calc_state', JSON.stringify(testResults));
  }, [testResults]);

  useEffect(() => {
    localStorage.setItem('learnmicrobes_bio_calculator_help', showCalculatorHelp ? 'open' : 'closed');
  }, [showCalculatorHelp]);

  useEffect(() => {
    // Prevent zooming on double-tap
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', preventZoom, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);

  const handleTestChange = (testName: string, value: TestResult) => {
    setTestResults(prev => {
      const isAlreadySelected = prev[testName] === value;
      return {
        ...prev,
        [testName]: isAlreadySelected ? '' : value
      };
    });
  };

  const resetTests = () => {
    setTestResults({});
    localStorage.removeItem('learnmicrobes_calc_state');
    setResultText('Select positive tests above to identify the bacteria.');
    setEducationalNotes('');
  };

  const identifyBacteria = () => {
    try {
      const testNames = Object.keys(bacteriaProfiles[Object.keys(bacteriaProfiles)[0]] || {});
      
      const results: IdentificationResult[] = Object.entries(bacteriaProfiles).map(([bacteria, profile]) => {
        let score = 0;
        let testsConsidered = 0;
        const criticalMismatches: string[] = [];
  
        testNames.forEach(test => {
          const userValue = testResults[test];
          let expected = profile[test];
  
          if (typeof expected === 'string') {
            expected = normalizeTestResult(expected);
            if (expected === '') expected = 'V';
          }
  
          if (!userValue) return;
  
          testsConsidered++;
          const importance = testImportance[bacteria]?.[test] || 'supportive';
          const isKeyTest = importance === 'green';
          const isSupportive = importance === 'pink';
  
          if (userValue === "V") {
            if (expected === "V") score += isKeyTest ? 0.5 : 0.3;
          } else {
            if (expected === userValue) {
              score += isKeyTest ? 2 : isSupportive ? 1.5 : 1;
            } else {
              if (['+', '-'].includes(expected)) {
                score -= isKeyTest ? 3 : isSupportive ? 2 : 1;
                if (isKeyTest) criticalMismatches.push(test);
              } else if (expected === "V") {
                score += 0.5;
              }
            }
          }
        });
  
        return {
          bacteria,
          matchPercentage: testsConsidered > 0 
            ? ((score / testsConsidered) * 100).toFixed(2)
            : "0.00",
          testsConsidered,
          criticalMismatches
        };
      });
  
      results.sort((a, b) => parseFloat(b.matchPercentage) - parseFloat(a.matchPercentage));
  
      let resultHTML = "";
      if (results.length === 0 || results[0].matchPercentage === "0.00") {
        resultHTML = "<div class='no-results'>No matches found. Please check your test selections.</div>";
      } else {
        const topResult = results[0];
        resultHTML = `
          <div class="results-header">
            <span class="result-kicker">Likely ID</span>
            <div class="top-match-card">
              <strong>${topResult.bacteria}</strong> 
              <span class="match-percentage">${topResult.matchPercentage}% match</span>
              ${topResult.criticalMismatches.length > 0 ? 
                `<div class="warning">⚠️ Critical mismatch in: 
                ${topResult.criticalMismatches.map(t => formatTestName(t)).join(', ')}
                </div>` : ''}
            </div>
          </div>
          ${getEducationalNotes(topResult.bacteria)}
        `;
  
        if (results.length > 1) {
          resultHTML += `
            <div class="other-matches">
              <h4>Other Possible Matches</h4>
              <div class="other-match-strip" role="list">
                ${results.slice(1, 5).map(result => `
                  <div class="other-match-card" role="listitem">
                    <strong>${result.bacteria}</strong>
                    <span class="match-percentage">${result.matchPercentage}% match</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }
      }
      
      setResultText(resultHTML);
      setEducationalNotes(''); // Clear the separate educational notes
    } catch (error) {
      console.error("Identification error:", error);
      setResultText("<div class='error'>Error in calculation. Please check console.</div>");
      setEducationalNotes('');
    }
  };

  const getEducationalNotes = (bacteria: string): string => {
    const profile = bacteriaProfiles[bacteria];
    const importance = testImportance[bacteria] || {};
    
    let html = `
      <div class="educational-notes">
        <h4>Key Identification Features for ${bacteria}:</h4>
        <div class="key-tests">
    `;
  
    // Add key tests (green)
    const keyTests = Object.entries(importance)
      .filter(([_, color]) => color === 'green')
      .map(([test]) => test);
  
    if (keyTests.length > 0) {
      html += `
        <div class="test-group">
          <h5>Critical Tests:</h5>
          <ul>
            ${keyTests.map(test => `
              <li>
                <strong>${formatTestName(test)}:</strong> 
                <span class="test-result ${profile[test] === '+' ? 'positive' : 'negative'}">
                  ${profile[test] === '+' ? 'Positive' : 'Negative'}
                </span>
                ${testResults[test] === profile[test] ? 
                  '<span class="match-indicator">✓</span>' : 
                  '<span class="mismatch-indicator">⚠️</span>'}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
  
    // Add supportive tests (pink) that were actually tested
    const supportiveTests = Object.entries(importance)
      .filter(([test, color]) => color === 'pink' && testResults[test])
      .map(([test]) => test);
  
    if (supportiveTests.length > 0) {
      html += `
        <div class="test-group">
          <h5>Supportive Tests:</h5>
          <ul>
            ${supportiveTests.map(test => `
              <li>
                <strong>${formatTestName(test)}:</strong> 
                <span class="test-result ${profile[test] === '+' ? 'positive' : 'negative'}">
                  ${profile[test] === '+' ? 'Positive' : 'Negative'}
                </span>
                ${testResults[test] === profile[test] ? 
                  '<span class="match-indicator">✓</span>' : 
                  '<span class="mismatch-indicator">⚠️</span>'}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
  
    // Add clinical notes if available
    if (clinicalNotes[bacteria]) {
      html += `
        <div class="clinical-notes">
          <h5>Clinical Significance:</h5>
          <p>${clinicalNotes[bacteria]}</p>
        </div>
      `;
    }
  
    html += `</div></div>`;
    return html;
  };

  const generateQuizQuestion = () => {
    const bacteriaList = Object.keys(bacteriaProfiles);
    const correctAnswer = bacteriaList[Math.floor(Math.random() * bacteriaList.length)];
    
    const wrongAnswers: string[] = [];
    while (wrongAnswers.length < 3) {
      const randomBacteria = bacteriaList[Math.floor(Math.random() * bacteriaList.length)];
      if (randomBacteria !== correctAnswer && !wrongAnswers.includes(randomBacteria)) {
        wrongAnswers.push(randomBacteria);
      }
    }
  
    const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    
    setQuizBacteria(correctAnswer);
    setQuizOptions(options);
    setSelectedOption('');
    setQuizFeedback('');
    setIsAnswered(false);
  };

  const checkGuess = () => {
    if (!selectedOption || isAnswered) return;
  
    setIsAnswered(true);
    if (selectedOption === quizBacteria) {
      setStreak(prev => prev + 1);
      setQuizFeedback(`
        <div class="quiz-feedback-banner correct">
          <p><strong>Correct.</strong> Current streak: ${streak + 1}</p>
        </div>
      `);
    } else {
      setStreak(0);
      setQuizFeedback(`
        <div class="quiz-feedback-banner incorrect">
          <p>❌ <strong>Incorrect.</strong> The correct answer was ${quizBacteria}.</p>
        </div>
      `);
    }
  };

  const handleExportReport = () => {
    // Collect the user's test results
    const enteredTestsCount = Object.values(testResults).filter(v => v !== '').length;
    const enteredTests = Object.entries(testResults)
      .filter(([_, result]) => result !== '')
      .map(([test, result]) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${formatTestName(test)}</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: ${result === '+' ? '#276749' : result === '-' ? '#c53030' : '#d69e2e'}">${result === '+' ? 'Positive (+)' : result === '-' ? 'Negative (-)' : 'Variable (V)'}</td>
        </tr>
      `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Learn Microbes - Lab Report</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #2d3748; line-height: 1.6; max-width: 800px; margin: 0 auto; background: #fff; }
          .header { border-bottom: 4px solid #2c7873; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #2c7873; margin: 0 0 10px 0; font-size: 28px; }
          .meta { color: #718096; font-size: 14px; }
          h2 { color: #2c7873; margin-top: 30px; border-bottom: 1px solid #edf2f7; padding-bottom: 10px; font-size: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          th { background: #f7fafc; padding: 12px 10px; text-align: left; border: 1px solid #e2e8f0; color: #4a5568; font-weight: 600; }
          .results-container { background: #f8fbfb; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px; }
          .results-container h3, .results-container h4, .results-container h5 { color: #2d3748; margin-top: 0; }
          .results-container .match-indicator { color: green; margin-left: 5px; }
          .results-container .mismatch-indicator { color: red; margin-left: 5px; }
          .footer { margin-top: 50px; font-size: 13px; color: #a0aec0; text-align: center; border-top: 1px solid #edf2f7; padding-top: 20px; }
          .print-btn { margin-top: 15px; padding: 10px 20px; background: #2c7873; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; }
          .print-btn:hover { background: #23615c; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
            .results-container { border: none; padding: 0; background: transparent; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Clinical Biochemical Lab Report</h1>
          <div class="meta">
            <strong>Generated on:</strong> ${new Date().toLocaleString()}<br/>
            <strong>Tool Used:</strong> Learn Microbes Enterobacteriaceae Calculator
          </div>
          <button class="no-print print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        </div>

        <h2>Selected Bench Profile (${enteredTestsCount} tests entered)</h2>
        ${enteredTests ? `
          <table>
            <thead>
              <tr>
                <th style="width: 60%;">Biochemical Test</th>
                <th style="width: 40%;">Observed Result</th>
              </tr>
            </thead>
            <tbody>
              ${enteredTests}
            </tbody>
          </table>
        ` : '<p style="color: #e53e3e; font-weight: bold;">No biochemical tests were selected for this report.</p>'}

        <h2>System Identification</h2>
        <div class="results-container">
          ${resultText ? DOMPurify.sanitize(resultText) : '<p>No identification was performed. Please click "Identify Bacteria" before exporting.</p>'}
        </div>

        <div class="footer">
          &copy; ${new Date().getFullYear()} LearnMicrobes.com &bull; Generated for educational purposes only. Not for definitive clinical diagnosis.
        </div>
      </body>
      </html>
    `;

    // Create Blob and open in new tab
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const renderTestField = (testName: string, legend: string) => {
    return (
      <fieldset>
        <legend>{legend}</legend>
        <div className="test-choice-row">
          <label className="test-option">
            <input
              type="radio"
              name={testName}
              value="+"
              checked={testResults[testName] === '+'}
              onClick={() => handleTestChange(testName, '+')}
              onChange={() => {}} // Dummy to avoid React warning
            />
            <span className="test-btn positive">+</span>
          </label>
          <label className="test-option">
            <input
              type="radio"
              name={testName}
              value="-"
              checked={testResults[testName] === '-'}
              onClick={() => handleTestChange(testName, '-')}
              onChange={() => {}} // Dummy to avoid React warning
            />
            <span className="test-btn negative">-</span>
          </label>
          <label className="test-option">
            <input
              type="radio"
              name={testName}
              value="V"
              checked={testResults[testName] === 'V'}
              onClick={() => handleTestChange(testName, 'V')}
              onChange={() => {}} // Dummy to avoid React warning
            />
            <span className="test-btn variable">V</span>
          </label>
        </div>
      </fieldset>
    );
  };

  const sanitizeHTML = (html: string) => ({ __html: DOMPurify.sanitize(html) });

  return (
    <div className="bio-calculator">
<header>
  <div className="header-content">
    <h1>
      <FontAwesomeIcon icon={faMicroscope} /> Enterobacteriaceae Identification Tool
    </h1>
  </div>
</header>

      <main>
        <div className="mode-selector">
          <button 
            className={`mode-btn ${mode === 'calculator' ? 'active' : ''}`} 
            onClick={() => setMode('calculator')}
          >
            Basic Identification Calculator
          </button>
          <button 
            className={`mode-btn ${mode === 'quiz' ? 'active' : ''}`} 
            onClick={() => {
              setMode('quiz');
              generateQuizQuestion();
            }}
          >
            Quiz Mode
          </button>
        </div>

        {mode === 'calculator' ? (
          <>
            <div className={`calculator-help-shell ${showCalculatorHelp ? 'open' : ''}`}>
              <button
                type="button"
                className="calculator-help-toggle"
                aria-expanded={showCalculatorHelp}
                onClick={() => setShowCalculatorHelp((current) => !current)}
              >
                <FontAwesomeIcon icon={faQuestionCircle} /> Need help?
              </button>
              {showCalculatorHelp && (
                <div className="test-instructions">
                  <p>How to use</p>
                  <ul>
                    <li>Select <span className="positive">+</span> or <span className="negative">-</span> for definitive results</li>
                    <li>Mark <span className="variable">V</span> only if the test result was ambiguous/unclear</li>
                    <li>Leave unselected if test was not performed</li>
                  </ul>
                </div>
              )}
            </div>

            <section id="calculator">
              <h2><i className="fas fa-flask"></i> Select Biochemical Test Results</h2>
              <div id="biochemical-form">
                {/* Common Tests */}
                <div className="test-category">
                <h3><FontAwesomeIcon icon={faFlask} /> Common Tests</h3>
                <div className="test-group">
                    {renderTestField('indole', 'Indole Test')}
                    {renderTestField('methylRed', 'Methyl Red Test')}
                    {renderTestField('vogesProskauer', 'Voges Proskauer Test')}
                    {renderTestField('citrate', 'Simmons\' Citrate Test')}
                    {renderTestField('h2s', 'Hydrogen Sulfide (H2S) Test')}
                    {renderTestField('urea', 'Urea Test')}
                    {renderTestField('motility', 'Motility Test')}
                  </div>
                </div>

                {/* Decarboxylase Tests */}
                <div className="test-category">
               <h3><FontAwesomeIcon icon={faVial} /> Decarboxylase Tests</h3>
                <div className="test-group">
                    {renderTestField('lysineDecarboxylase', 'Lysine Decarboxylase')}
                    {renderTestField('arginineDihydrolase', 'Arginine Dihydrolase')}
                    {renderTestField('ornithineDecarboxylase', 'Ornithine Decarboxylase')}
                    {renderTestField('phenylalanineDeaminase', 'Phenylalanine Deaminase')}
                  </div>
                </div>

                {/* Carbohydrate Tests */}
                <div className="test-category">
               <h3><FontAwesomeIcon icon={faVialCircleCheck} /> Carbohydrate Fermentation</h3>
                <div className="test-group">
                    {renderTestField('gasFromDGlucose', 'Gas from D-Glucose')}
                    {renderTestField('lactose', 'Lactose Fermentation')}
                    {renderTestField('sucrose', 'Sucrose Fermentation')}
                    {renderTestField('dMannitol', 'D-Mannitol Fermentation')}
                    {renderTestField('adonitol', 'Adonitol Fermentation')}
                    {renderTestField('inositol', 'Inositol Fermentation')}
                    {renderTestField('dSorbitol', 'D-Sorbitol Fermentation')}
                    {renderTestField('lArabinose', 'L-Arabinose Fermentation')}
                    {renderTestField('raffinose', 'Raffinose Fermentation')}
                    {renderTestField('lRhamnose', 'L-Rhamnose')}
                  </div>
                </div>

                {/* Other Tests */}
                <div className="test-category">
               <h3><FontAwesomeIcon icon={faVials} /> Other Tests</h3>
                <div className="test-group">
                    {renderTestField('KCN', 'Growth in KCN')}
                    {renderTestField('Gelatin', 'Gelatin Hydrolysis')}
                    {renderTestField('DNAse', 'DNAse Test')}
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button type="button" className="identify-btn" onClick={identifyBacteria}>
                  <i className="fas fa-search"></i> Identify Bacteria
                </button>
                <button type="button" className="reset-btn" onClick={resetTests}>
                  <i className="fas fa-redo"></i> Reset All Tests
                </button>
                <button type="button" className="export-btn" onClick={handleExportReport}>
                  <i className="fas fa-file-export"></i> Export Lab Report
                </button>
              </div>
            </section>

            <section id="result">
  <h2><FontAwesomeIcon icon={faBookOpen} /> Identification Result</h2>
  <div className="result-container">
    <p id="result-text" dangerouslySetInnerHTML={sanitizeHTML(resultText)}></p>
  </div>
</section>

          </>
        ) : (
          <div id="quiz-mode">
            <section className="quiz-container">
              <div className="quiz-header">
                <h2><FontAwesomeIcon icon={faQuestionCircle} /> Test Your Knowledge</h2>
                <div className="quiz-streak">Streak: {streak}</div>
              </div>
              
              <div className="quiz-question">
                <h3>Which organism matches these test results?</h3>
                <div className="test-results">
                  {Object.entries(bacteriaProfiles[quizBacteria] || {})
                    .filter(([_, result]) => result === "+")
                    .slice(0, 5)
                    .map(([test]) => (
                      <span key={test} className="test-clue">
                        {formatTestName(test)} (+)
                      </span>
                    ))}
                </div>
              </div>
          
              <QuizOptions 
                options={quizOptions} 
                selectedOption={selectedOption} 
                onSelect={setSelectedOption}
                isAnswered={isAnswered}
                correctAnswer={quizBacteria}
              />
          
          <div className="quiz-actions">
  <button 
    className="submit-btn"
    onClick={checkGuess}
  >
    <FontAwesomeIcon icon={faSearch} /> Check Answer
  </button>
  <button 
    className="hint-btn"
    onClick={() => {
      setQuizFeedback(`
        <div class="quiz-hint">
          <p><strong>Hint:</strong> ${getBacteriaHint(quizBacteria)}</p>
        </div>
      `);
    }}
  >
    <FontAwesomeIcon icon={faQuestionCircle} /> Get Hint
  </button>
  <button 
    className="new-question-btn"
    onClick={generateQuizQuestion}
  >
    <FontAwesomeIcon icon={faRedo} /> New Question
  </button>
</div>

<div 
  id="quiz-feedback" 
  dangerouslySetInnerHTML={sanitizeHTML(quizFeedback)} 
/>
</section>
</div>
)}
</main>
</div>
);
};

export default BioCalculator;
