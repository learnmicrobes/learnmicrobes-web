import React from 'react';
import { MiniAtlasVisual } from '../VisualAtlas/VisualAtlas';
import './FeaturedBenchVisual.css';

type FeaturedBenchVisualProps = {
  slug: string;
};

/**
 * The featured bench card's drawing on the home page. Lazy-loaded by App.tsx
 * only when the card nears the viewport, because it pulls in the Visual Atlas
 * renderer, which the home shell must not download up front.
 */
export default function FeaturedBenchVisual({ slug }: FeaturedBenchVisualProps) {
  return (
    <div className="home-featured-visual">
      <MiniAtlasVisual slug={slug} showFullLink={false} />
    </div>
  );
}
