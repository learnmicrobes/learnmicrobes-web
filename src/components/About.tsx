import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header-card">
        <div className="about-subtitle">ABOUT LEARN MICROBES</div>
        <h1 className="about-title">A clinical bench microbiology reference built for learners</h1>
        <p className="about-description">
          Learn Microbes is an educational project for students, educators, and clinical laboratory learners who want to practice microbiology with realistic bench logic. The goal is simple: make organism identification, diagnostic strategy, and safety escalation easier to study without flattening the science.
        </p>
      </div>

      <div className="about-grid-card">
        <div className="about-grid">
          <div className="about-column">
            <h3>Mission</h3>
            <p>
              This site exists to help learners think like bench microbiologists: start with specimen quality, Gram stain, colony morphology, safety, and the most useful next test instead of memorizing isolated facts.
            </p>
          </div>

          <div className="about-column">
            <h3>What You Will Find</h3>
            <ul>
              <li>Roadmaps for Gram-positive, Gram-negative, and anaerobic identification</li>
              <li>Biochemical test cards with principles, reactions, QC, and interpretation cues</li>
              <li>Guides for bacteriology, special pathogens, diagnostic methods, and safety-aware workflows</li>
              <li>Study tools for syndrome-to-test thinking, escalation decisions, and quiz practice</li>
            </ul>
          </div>

          <div className="about-column">
            <h3>How To Use It</h3>
            <p>
              Use it as a study companion, teaching aid, or self-check while learning clinical microbiology. It is designed to reinforce reasoning, not replace formal laboratory procedures or instructor guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="about-statement-card">
        <div className="about-statement">
          <h3>Educational Scope</h3>
          <p>
            Learn Microbes is not a diagnostic authority, patient-care directive, institutional SOP, regulatory standard, or substitute for validated laboratory methods. Always follow your laboratory's current procedures, safety policies, package inserts, reference laboratory requirements, and applicable standards.
          </p>
        </div>
        <div className="about-statement">
          <h3>Content Philosophy</h3>
          <p>
            The project emphasizes clinically useful language: specimen context, organism groups, bench reactions, quality control, biosafety flags, and diagnostic escalation. When a routine culture or biochemical workup is not appropriate, the site tries to say that clearly.
          </p>
        </div>
        <div className="about-statement">
          <h3>Project Status</h3>
          <p>
            Learn Microbes is currently an alpha-stage learning tool. The content and interface are actively being expanded, reviewed, and polished as the project grows.
          </p>
        </div>
      </div>
    </div>
  );
}
