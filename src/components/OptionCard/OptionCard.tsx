import React, { useState } from "react";
import "./OptionCard.css";

type Option = {
  text: string;
  nextStep: string | null;
  conclusion?: string;
  tests?: string[];
};

type Props = {
  option: Option;
  onSelect: (next: string | null, conclusion?: string, tests?: string[]) => void;
};

export const OptionCard: React.FC<Props> = ({ option, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const hasTests = option.tests && option.tests.length > 0;

  const displayedTests = hasTests
    ? expanded
      ? option.tests!
      : option.tests!.slice(0, 2)
    : [];

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div
      className="option-card"
      onClick={() => onSelect(option.nextStep, option.conclusion, option.tests)}
    >
      <h3>{option.text}</h3>
      {hasTests && (
        <>
          <p className="option-tests">
            {displayedTests.join(", ")}
            {!expanded && option.tests!.length > 2 && "..."}
          </p>
          {option.tests!.length > 2 && (
            <button
              type="button"
              className="toggle-tests"
              aria-expanded={expanded}
              aria-controls={`tests-${option.text}`}
              onClick={handleToggle}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </>
      )}
    </div>
  );
};
