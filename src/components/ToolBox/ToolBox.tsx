import React from 'react';
import './ToolBox.css';

interface ToolBoxProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  onClose?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

const ToolBox: React.FC<ToolBoxProps> = ({
  title,
  icon,
  children,
  onClose,
  showBackButton = false,
  onBack,
  showCloseButton = true,
  className = ''
}) => {
  return (
    <div className={`tool-box ${className}`.trim()}>
      <div className="tool-box-header">
        {showBackButton && (
          <button className="back-btn" onClick={onBack} aria-label="Go back">
            ←
          </button>
        )}
        <h2>
          <span className="tool-box-title-icon" aria-hidden="true">{icon}</span>
          {title}
        </h2>
        {showCloseButton && onClose && (
          <button className="close-btn" onClick={onClose} aria-label="Close panel">
            ×
          </button>
        )}
      </div>
      <div className="tool-box-content">
        {children}
      </div>
    </div>
  );
};

export default ToolBox;
