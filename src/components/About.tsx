import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './About.css';

export default function About() {
  const { hash } = useLocation();

  // The footer links to /about#founder; the router does not scroll to hashes.
  // Deferred a frame because App's scroll-to-top on route change runs after this.
  useEffect(() => {
    if (hash !== '#founder') {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('founder')?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="about-container">
      <div className="about-header-card">
        <div className="about-subtitle">ABOUT LEARN MICROBES</div>
        <h1 className="about-title">A clinical bench microbiology reference built for learners</h1>
        <p className="about-description">
          Learn Microbes is an educational project for students, educators, and clinical laboratory learners who want to practice microbiology with realistic bench logic. The goal is simple: make organism identification, diagnostic strategy, and safety escalation easier to study without flattening the science.
        </p>
      </div>

      <section className="about-founder-card" id="founder" aria-labelledby="about-founder-title">
        <img
          className="about-founder-photo"
          src="/about/franz.webp"
          width={800}
          height={800}
          alt="Illustration of Franz, a medical technologist, sitting beside a laboratory analyzer in a blue lab coat"
        />
        <div className="about-founder-copy">
          <div className="about-subtitle">Who's behind Learn Microbes</div>
          <h2 id="about-founder-title">Hi, I'm Franz.</h2>
          <p>
            I'm a medical technologist with almost ten years at the bench. I started as a generalist in Cebu
            hospitals, covering blood bank, hematology, chemistry and clinical microscopy, then ran PCR testing
            through the pandemic. Today I'm a lead technologist in microbiology at Louisiana's biggest hospital,
            home to the state's biggest microbiology reference lab, where I also train new techs and students.
          </p>
          <p>
            I built Learn Microbes for the version of me who was studying for the boards and the ASCPi: someone who
            needed to understand why the bench does what it does, not just memorize charts. Everything here is
            written the way I would explain it to a new tech at my bench.
          </p>
          <p>
            Microbiology comes first because it is my favorite department. Hematology, urinalysis and the other lab
            sections are next, built the same bench-first way.
          </p>
          <a
            className="about-founder-link"
            href="https://www.linkedin.com/in/franz-escuzar-mls-ascpi-352806180/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin" aria-hidden="true" />
            Connect on LinkedIn
          </a>
          <p className="about-founder-note">
            Learn Microbes is my personal project. It is not affiliated with or endorsed by my employer or the ASCP.
          </p>
        </div>
      </section>

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
            Learn Microbes is a free-to-use learning tool that is actively developed. New content and study features are added regularly, and existing pages are reviewed and refined as the project grows. Tell us what is confusing or missing.
          </p>
        </div>
      </div>
    </div>
  );
}
