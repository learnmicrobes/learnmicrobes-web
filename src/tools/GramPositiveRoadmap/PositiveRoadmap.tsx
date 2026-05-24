import React from 'react';
import { gramPositiveRoadmap } from './data';
import RoadmapExperience from '../RoadmapExperience/RoadmapExperience';
import './Positive.css';

const PositiveRoadmap: React.FC = () => (
  <RoadmapExperience
    title="Gram Positive Identification"
    icon="G+"
    roadmap={gramPositiveRoadmap}
    storageKey="learnmicrobes_gpos_state"
    variantClass="positive-roadmap"
  />
);

export default PositiveRoadmap;
