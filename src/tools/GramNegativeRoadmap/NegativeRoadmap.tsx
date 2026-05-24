import React from 'react';
import { gramNegativeRoadmap } from './gnrdata';
import RoadmapExperience from '../RoadmapExperience/RoadmapExperience';
import './Negative.css';

const NegativeRoadmap: React.FC = () => (
  <RoadmapExperience
    title="Gram Negative Identification"
    icon="G-"
    roadmap={gramNegativeRoadmap}
    storageKey="learnmicrobes_gneg_state"
    variantClass="negative-roadmap"
  />
);

export default NegativeRoadmap;
