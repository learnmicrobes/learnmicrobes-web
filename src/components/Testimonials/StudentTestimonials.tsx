import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import './StudentTestimonials.css';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/*
 * Early feedback from people who have used Learn Microbes, quoted exactly as
 * they gave it, with first names only and their permission.
 *
 * Never reword a quote, add a review that was not given, or add photos, last
 * names, star ratings, review counts, badges, or Review / AggregateRating
 * structured data. A new entry needs the person's consent to their first name,
 * title, and exact words. The disclosure under the heading stays as long as any
 * quote comes from someone who knows the creator.
 */
const testimonials: Testimonial[] = [
  {
    quote: 'The ASCP review flow connects specimen quality, ID logic, and reporting traps in one place. It takes the guesswork out of board prep.',
    name: 'Deborah',
    role: 'Medical Technologist'
  },
  {
    quote: 'Working through the case studies is what finally made everything click for my exam. They mirror the exact multi-step thinking ASCP questions test.',
    name: 'Jessica',
    role: 'M(ASCP) Candidate'
  },
  {
    quote: 'The quizzes are hands-down the most helpful part. Being able to drill weak areas quickly without digging through dense textbooks saved my study schedule.',
    name: 'Jam',
    role: 'MLS Student'
  },
  {
    quote: 'Learning clinical microbiology feels so much easier here. Everything is broken down into clear, logical steps instead of overwhelming walls of text.',
    name: 'Katherina',
    role: 'Clinical Lab Trainee'
  },
  {
    quote: 'The biochemical test pages are concise enough for a quick refresher before a shift, yet still explain the actual mechanism behind each reaction.',
    name: 'CJ',
    role: 'Microbiology Bench Tech'
  },
  {
    quote: 'I struggled with organism differentiation until I started using the case studies. Walking through real clinical scenarios helped me pass my exam on the first try.',
    name: 'Samantha',
    role: 'ASCP Board Reviewer'
  },
  {
    quote: "The ASCP quizzes caught small reporting traps I would have totally missed on test day. Easily the cleanest review tool I've used.",
    name: 'Ashley',
    role: 'MLS(ASCP) Reviewer'
  },
  {
    quote: 'Microbiology used to feel intimidating, but the layout makes learning genuinely easy. You can trace an organism from specimen source to final ID effortlessly.',
    name: 'Lauren',
    role: 'Clinical Rotation Student'
  },
  {
    quote: 'Having realistic case studies alongside quick diagnostic workflows bridges the gap between memorizing charts and actually working a bench.',
    name: 'Pamela',
    role: 'Medical Laboratory Scientist'
  },
  {
    quote: 'The practice quizzes focus on high-yield logic rather than trivia. Reviewing missed questions showed me exactly where my ID reasoning needed work.',
    name: 'Adam',
    role: 'M(ASCP) Candidate'
  },
  {
    quote: 'Everything is built around how you actually think at the bench. The streamlined flow made reviewing mycology and bacteriology fast and stress-free.',
    name: 'Nolan',
    role: 'Lab Technologist'
  }
];

// Must match the testimonialsLoop duration in StudentTestimonials.css.
const LOOP_SECONDS = 95;

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
  const [isPaused, setIsPaused] = useState(false);
  const [resumeDelay, setResumeDelay] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // Where the drift stood when it was paused, so the row stops in place
  // instead of jumping back to the first card.
  const pausedOffsetRef = useRef<number | null>(null);

  const canDrift = !isNarrow && !prefersReducedMotion;
  const isDrifting = canDrift && !isPaused;

  // The drift needs the cards twice to loop without a visible seam. A row that
  // is not moving shows each card once, so swiping or arrowing through it
  // never meets the same quote again.
  const cards = isDrifting ? [...testimonials, ...testimonials] : testimonials;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    if (isDrifting) {
      // A row with overflow hidden keeps any scroll position it had, which
      // would add to the animation's own offset.
      list.scrollLeft = 0;
      return;
    }

    if (pausedOffsetRef.current !== null) {
      list.scrollLeft = pausedOffsetRef.current;
      pausedOffsetRef.current = null;
    }
  }, [isDrifting]);

  const pause = () => {
    const grid = gridRef.current;
    if (grid) {
      const { transform } = window.getComputedStyle(grid);
      pausedOffsetRef.current = transform && transform !== 'none' ? -new DOMMatrixReadOnly(transform).m41 : 0;
    }
    setIsPaused(true);
  };

  const play = () => {
    const list = listRef.current;
    const grid = gridRef.current;
    if (list && grid) {
      // One loop is a full set of cards plus the gap before the repeat. A
      // negative delay starts the drift that far into its cycle, so it picks up
      // from wherever the reader left the row.
      const gap = parseFloat(window.getComputedStyle(grid).columnGap) || 0;
      const loopWidth = grid.scrollWidth + gap;
      setResumeDelay(loopWidth > 0 ? -(list.scrollLeft / loopWidth) * LOOP_SECONDS : 0);
    }
    setIsPaused(false);
  };

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-shell">
        <div className="testimonials-top">
          <div className="testimonials-header">
            <span className="testimonials-kicker">Early feedback</span>
            <h2 id="testimonials-title">What early users say</h2>
            <p className="testimonials-disclosure">
              From early users, including friends and colleagues of the creator. First names only, shared with permission.
            </p>
          </div>

          {canDrift && (
            <button
              type="button"
              className="lm-btn lm-btn--ghost lm-btn--sm testimonials-toggle"
              onClick={isPaused ? play : pause}
              aria-controls="testimonials-track"
              aria-label={isPaused ? 'Play the moving feedback row' : 'Pause the moving feedback row'}
            >
              <FontAwesomeIcon icon={isPaused ? faPlay : faPause} aria-hidden="true" />
              {isPaused ? 'Play' : 'Pause'}
            </button>
          )}
        </div>

        {/* Stopped, the row scrolls natively: swipe, trackpad, or arrow keys
            once it has focus. While it drifts there is nothing to focus. */}
        <div
          ref={listRef}
          id="testimonials-track"
          className={`testimonials-list ${isDrifting ? '' : 'testimonials-list--browse'}`.trim()}
          role="region"
          aria-label="Early feedback quotes"
          tabIndex={isDrifting ? undefined : 0}
        >
          <div
            ref={gridRef}
            className="testimonials-grid"
            style={isDrifting && resumeDelay ? { animationDelay: `${resumeDelay}s` } : undefined}
          >
            {cards.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="testimonial-card"
                /* The second copy exists only so the drift can loop, so it is
                   hidden from assistive tech; otherwise every quote is read
                   out twice. */
                aria-hidden={index >= testimonials.length ? true : undefined}
              >
                <div className="testimonial-quote-mark" aria-hidden="true">&ldquo;</div>
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
