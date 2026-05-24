// src/components/ToolComponent/ToolComponent.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faBook } from '@fortawesome/free-solid-svg-icons';
import './ToolComponent.css';
import React from 'react'; // Add this line

interface ToolComponentProps {
  tool: string;
  children?: React.ReactNode;
}

export default function ToolComponent({ tool, children }: ToolComponentProps) {
  const getToolIcon = () => {
    switch(tool) {
      case 'Biochemical Calculator': return <FontAwesomeIcon icon={faFlask} />;
      case 'Guides': return <FontAwesomeIcon icon={faBook} />;
      default: return null;
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h2>
          {getToolIcon()}
          {tool}
        </h2>
      </div>
      <div className="tool-content">
        {children}
      </div>
    </div>
  );
}