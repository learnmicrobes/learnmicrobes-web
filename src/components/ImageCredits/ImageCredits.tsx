import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { atlasPages, type AtlasPhoto } from '../../data/atlasPages';
import './ImageCredits.css';

type CreditEntry = AtlasPhoto & {
  pageTitle: string;
  pageSlug: string;
};

/**
 * Every borrowed image on the site, with who made it and under what terms.
 * Built from the atlas data rather than a hand-kept list, so an image cannot
 * ship without its credit appearing here.
 */
export default function ImageCredits() {
  const entries = useMemo<CreditEntry[]>(
    () =>
      atlasPages.flatMap((page) =>
        (page.photoReferences ?? []).map((photo) => ({
          ...photo,
          pageTitle: page.title,
          pageSlug: page.slug
        }))
      ),
    []
  );

  const bySource = useMemo(() => {
    const groups = new Map<string, CreditEntry[]>();
    entries.forEach((entry) => {
      const existing = groups.get(entry.credit);
      if (existing) {
        existing.push(entry);
        return;
      }

      groups.set(entry.credit, [entry]);
    });

    return Array.from(groups.entries());
  }, [entries]);

  return (
    <div className="image-credits-page">
      <header className="image-credits-hero">
        <span className="image-credits-kicker">Image credits</span>
        <h1>Where the photographs come from</h1>
        <p>
          The drawings across the Visual Atlas are original Learn Microbes work. The photographs are not: they are
          published images that we are allowed to reuse, and this page records each one, who produced it, and the
          terms it is used under.
        </p>
      </header>

      {entries.length === 0 ? (
        <section className="image-credits-panel">
          <p>No borrowed photographs are in use yet. Every visual on the site is original Learn Microbes artwork.</p>
        </section>
      ) : (
        bySource.map(([credit, items]) => (
          <section className="image-credits-panel" key={credit}>
            <h2>{credit}</h2>
            <p className="image-credits-license">{items[0].license}</p>
            <ul className="image-credits-list">
              {items.map((item) => (
                <li key={item.src}>
                  <img src={item.src} alt="" width={64} height={64} loading="lazy" decoding="async" />
                  <div>
                    <strong>
                      {item.pageTitle} &mdash; {item.stageLabel}
                    </strong>
                    <p>{item.alt}</p>
                    <span>
                      <Link to={`/visuals/${item.pageSlug}`}>Where it appears</Link>
                      {' | '}
                      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Original source
                      </a>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}

      <section className="image-credits-panel image-credits-terms">
        <h2>Terms we follow</h2>
        <ul>
          <li>Each image names the agency or photographer that produced it, on the page where it appears.</li>
          <li>
            Images are shown exactly as published. We never label, crop or retouch a clinical image to make a
            teaching point; that is what the drawn board beside it is for. Where an image carries arrows or
            lettering, they are the source&rsquo;s own, and the caption says so.
          </li>
          <li>Every image remains available free of charge from the source linked above.</li>
          <li>
            Use of these materials does not imply endorsement of Learn Microbes by the Centers for Disease Control
            and Prevention, the Department of Health and Human Services, or the United States Government, nor by any
            other source listed on this page.
          </li>
        </ul>
        <p>
          If you believe an image here is misattributed or should not be in use, please{' '}
          <Link to="/about">get in touch</Link> and it will be removed while we check.
        </p>
      </section>
    </div>
  );
}
