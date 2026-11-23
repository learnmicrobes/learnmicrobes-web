import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './StudentTestimonials.css';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** The score this person gave out of 5 when asked. */
  rating: 1 | 2 | 3 | 4 | 5;
};

/*
 * Early feedback from people who have used Learn Microbes, quoted exactly as
 * they gave it, with first names only and their permission. Each rating is the
 * score that person gave out of 5 when the owner asked; Adam gave 4 because the
 * mock exam is not ready yet.
 *
 * Never reword a quote, change a rating, or add a review or rating that was
 * not given. A new entry needs the person's consent to their first name, title,
 * exact words, and score. Do not add photos, last names, an average or review
 * count, badges, or Review / AggregateRating structured data: Google treats a
 * site's markup about its own reviews as self-serving and does not show it.
 */
const testimonials: Testimonial[] = [
  {
    quote: 'The ASCP review flow connects specimen quality, ID logic, and reporting traps in one place. It takes the guesswork out of board prep.',
    name: 'Deborah',
    role: 'Medical Technologist',
    rating: 5
  },
  {
    quote: 'Working through the case studies is what finally made everything click for my exam. They mirror the exact multi-step thinking ASCP questions test.',
    name: 'Jessica',
    role: 'M(ASCP) Candidate',
    rating: 5
  },
  {
    quote: 'The quizzes are hands-down the most helpful part. Being able to drill weak areas quickly without digging through dense textbooks saved my study schedule.',
    name: 'Jam',
    role: 'MLS Student',
    rating: 5
  },
  {
    quote: 'Learning clinical microbiology feels so much easier here. Everything is broken down into clear, logical steps instead of overwhelming walls of text.',
    name: 'Katherina',
    role: 'Clinical Lab Trainee',
    rating: 5
  },
  {
    quote: 'The biochemical test pages are concise enough for a quick refresher before a shift, yet still explain the actual mechanism behind each reaction.',
    name: 'CJ',
    role: 'Microbiology Bench Tech',
    rating: 5
  },
  {
    quote: 'I struggled with organism differentiation until I started using the case studies. Walking through real clinical scenarios helped me pass my exam on the first try.',
    name: 'Samantha',
    role: 'ASCP Board Reviewer',
    rating: 5
  },
  {
    quote: "The ASCP quizzes caught small reporting traps I would have totally missed on test day. Easily the cleanest review tool I've used.",
    name: 'Ashley',
    role: 'MLS(ASCP) Reviewer',
    rating: 5
  },
  {
    quote: 'Microbiology used to feel intimidating, but the layout makes learning genuinely easy. You can trace an organism from specimen source to final ID effortlessly.',
    name: 'Lauren',
    role: 'Clinical Rotation Student',
    rating: 5
  },
  {
    quote: 'Having realistic case studies alongside quick diagnostic workflows bridges the gap between memorizing charts and actually working a bench.',
    name: 'Pamela',
    role: 'Medical Laboratory Scientist',
    rating: 5
  },
  {
    quote: 'The practice quizzes focus on high-yield logic rather than trivia. Reviewing missed questions showed me exactly where my ID reasoning needed work.',
    name: 'Adam',
    role: 'M(ASCP) Candidate',
    rating: 4
  },
  {
    quote: 'Everything is built around how you actually think at the bench. The streamlined flow made reviewing mycology and bacteriology fast and stress-free.',
    name: 'Nolan',
    role: 'Lab Technologist',
    rating: 5
  }
];

// Phones never drift (the CSS gives them a swipeable row at this width), and
// neither does anyone who has asked their system for reduced motion.
const NARROW_QUERY = '(max-width: 640px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return matches;
};

const StudentTestimonials: React.FC = () => {
  const isNarrow = useMediaQuery(NARROW_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const listRef = useRef<HTMLDivElement>(null);

  const isDrifting = !isNarrow && !prefersReducedMotion;

  // The drift needs the cards twice to loop without a visible seam. A row that
  // is not moving shows each card once, so swiping or arrowing through it
  // never meets the same quote again.
  const cards = isDrifting ? [...testimonials, ...testimonials] : testimonials;

  useLayoutEffect(() => {
    // Widening a phone-width window starts the drift. A row with overflow
    // hidden keeps any scroll position it had, which would add to the
    // animation's own offset.
    if (isDrifting && listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  }, [isDrifting]);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-shell">
        <div className="testimonials-header">
          <h2 id="testimonials-title">Early feedback</h2>
        </div>

        {/* Not drifting, the row scrolls natively: swipe, trackpad, or arrow
            keys once it has focus. While it drifts, hovering pauses it. */}
        <div
          ref={listRef}
          className={`testimonials-list ${isDrifting ? '' : 'testimonials-list--browse'}`.trim()}
          role="region"
          aria-label="Early feedback quotes"
          tabIndex={isDrifting ? undefined : 0}
        >
          <div className="testimonials-grid">
            {cards.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="testimonial-card"
                /* The second copy exists only so the drift can loop, so it is
                   hidden from assistive tech; otherwise every quote is read
                   out twice. */
                aria-hidden={index >= testimonials.length ? true : undefined}
              >
                <p
                  className="testimonial-rating"
                  role="img"
                  aria-label={`Rated ${testimonial.rating} out of 5`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className={star <= testimonial.rating ? 'testimonial-star is-filled' : 'testimonial-star'}
                      aria-hidden="true"
                    />
                  ))}
                </p>
                <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
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
