import React from 'react';
import './StudentTestimonials.css';

/** A learner review, always shown with a link to where it was first published. */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  sourceUrl: string;
  accent: 'teal' | 'gold' | 'sage';
};

/*
 * Empty on purpose. The quotes this list used to hold were development
 * placeholders, not real learners, and were removed.
 *
 * Add only verified reviews, each with the link to where it was published, so a
 * reader can check it. This component is not mounted anywhere while the list is
 * empty; put it back on the home page only once real reviews exist. Never add
 * sample reviews, star ratings, review counts, or review structured data.
 */
const testimonials: Testimonial[] = [];

const StudentTestimonials: React.FC = () => {
  if (testimonials.length === 0) {
    return null;
  }

  const testimonialLoop = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-shell">
        <div className="testimonials-header">
          <span className="testimonials-kicker">Learner feedback</span>
          <h2 id="testimonials-title">What learners say</h2>
        </div>

        <div className="testimonials-list" aria-label="Learner reviews">
          <div className="testimonials-grid">
            {testimonialLoop.map((testimonial, index) => (
              <article
                key={`${testimonial.sourceUrl}-${index}`}
                className={`testimonial-card accent-${testimonial.accent}`}
                /* The list is rendered twice so the marquee can loop without a
                   visible seam. The second copy is the same quotes again, so it
                   is hidden from assistive tech — otherwise every quote is read
                   out twice. */
                aria-hidden={index >= testimonials.length ? true : undefined}
              >
                <div className="testimonial-quote-mark" aria-hidden="true">&ldquo;</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-meta">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                  <a
                    href={testimonial.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={index >= testimonials.length ? -1 : undefined}
                  >
                    Read the original review
                  </a>
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
