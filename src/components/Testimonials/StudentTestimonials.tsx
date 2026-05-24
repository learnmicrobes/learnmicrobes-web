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
  }
];

const StudentTestimonials: React.FC = () => {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-shell">
        <div className="testimonials-header">
          <span className="testimonials-kicker">Learner Feedback</span>
          <h2 id="testimonials-title">Why students keep using Learn Microbes</h2>
          <p>
            Built for learners who want clearer bench reasoning, less memorization panic, and a
            study tool that actually feels usable during real review sessions.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article
              key={`${testimonial.name}-${testimonial.role}`}
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
    </section>
  );
};

export default StudentTestimonials;
