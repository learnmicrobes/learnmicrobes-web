import React from 'react';
import { obligateAnaerobeRoadmap } from './anaerobedata';
import RoadmapExperience from '../RoadmapExperience/RoadmapExperience';
import './Anaerobe.css';

const AnaerobeRoadmap: React.FC = () => (
  <RoadmapExperience
    title="Obligate Anaerobe Identification"
    icon="AN"
    roadmap={obligateAnaerobeRoadmap}
    storageKey="learnmicrobes_anaerobe_state"
    variantClass="anaerobe-roadmap"
  />
);

export default AnaerobeRoadmap;
