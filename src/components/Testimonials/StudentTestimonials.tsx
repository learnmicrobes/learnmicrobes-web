import React from 'react';
import './StudentTestimonials.css';

const testimonials = [
  {
    quote:
      'The roadmaps helped me stop guessing. I could finally see why one result changes the next test instead of memorizing isolated facts.',
    name: 'Ari',
    role: 'MLS student',
    accent: 'teal'
  },
  {
    quote:
      'I keep coming back before lab because the guides explain the bench logic in plain language. It feels like studying with structure instead of panic.',
    name: 'Mina',
    role: 'Microbiology learner',
    accent: 'gold'
  },
  {
    quote:
      'The test explanations and workflow pages make it easier to connect class material to what actually happens in a clinical micro workup.',
    name: 'Jules',
    role: 'New med tech',
    accent: 'sage'
  },
  {
    quote:
      'I use the visual cards before practicals because the reaction patterns stick faster when I can picture the plate or tube.',
    name: 'Leah',
    role: 'MLS student',
    accent: 'teal'
  },
  {
    quote:
      'The ASCP review flow gives my students a cleaner way to connect specimen quality, ID logic, and reporting traps.',
    name: 'Dr. Santos',
    role: 'Microbiology professor',
    accent: 'gold'
  },
  {
    quote:
      'Saved quiz history makes weak areas obvious. I can review what I missed instead of restarting from the beginning every time.',
    name: 'Noor',
    role: 'M(ASCP) reviewer',
    accent: 'sage'
  },
  {
    quote:
      'The biochemical test pages are concise enough for quick review but still explain what the reaction actually means.',
    name: 'Caleb',
    role: 'Clinical lab student',
    accent: 'teal'
  },
  {
    quote:
      'I like that safety escalation is built into the study flow. It feels closer to real bench thinking than most review sites.',
    name: 'Marisol',
    role: 'Bench trainee',
    accent: 'gold'
  },
  {
    quote:
      'The search makes it easy to jump from an organism clue to the right guide, visual, or test explanation during review.',
    name: 'Evan',
    role: 'MLS program graduate',
    accent: 'sage'
  },
  {
    quote:
      'It helps me teach first-pass organism ID without overwhelming students with every exception on day one.',
    name: 'Prof. Kim',
    role: 'Clinical micro instructor',
    accent: 'teal'
  },
  {
    quote:
      'The practice questions feel useful because the explanations point me back to the bench pattern, not just the answer.',
    name: 'Sofia',
    role: 'ASCP review student',
    accent: 'gold'
  },
  {
    quote:
      'I keep the roadmaps open while reviewing unknowns. They help me slow down and choose the next best test.',
    name: 'Andre',
    role: 'Medical technology student',
    accent: 'sage'
  },
  {
    quote:
      'The layout feels like a clean lab notebook. It is easier to focus when the content is practical and not flashy.',
    name: 'Priya',
    role: 'MLS senior',
    accent: 'teal'
  },
  {
    quote:
      'For onboarding, I like having a place that explains why a result matters before jumping to organism names.',
    name: 'Hannah',
    role: 'Clinical microbiology educator',
    accent: 'gold'
  }
];

const testimonialLoop = [...testimonials, ...testimonials];

const StudentTestimonials: React.FC = () => {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-shell">
        <div className="testimonials-header">
          <span className="testimonials-kicker">Learner feedback</span>
          <h2 id="testimonials-title">Built around real study pain points</h2>
        </div>

        <div className="testimonials-list" aria-label="Sample learner feedback carousel">
          <div className="testimonials-grid">
            {testimonialLoop.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${testimonial.role}-${index}`}
                className={`testimonial-card accent-${testimonial.accent}`}
              >
                <div className="testimonial-quote-mark" aria-hidden="true">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-meta">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
