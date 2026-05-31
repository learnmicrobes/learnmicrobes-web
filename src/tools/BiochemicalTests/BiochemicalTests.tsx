import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ToolBox from '../../components/ToolBox/ToolBox';
import { atlasPages } from '../../components/VisualAtlas/VisualAtlas';
import AlphaValidationCTA from '../../components/AlphaValidationCTA/AlphaValidationCTA';
import { biochemicalTestsData, BiochemicalTest } from './biochemicalData';
import './BiochemicalTests.css';

const BiochemicalTests: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<BiochemicalTest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectTest = (test: BiochemicalTest | null) => {
    setSelectedTest(test);

    if (test) {
      setSearchParams({ test: test.id });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const requestedTest = searchParams.get('test');

    if (!requestedTest) {
      return;
    }

    const matchingTest = biochemicalTestsData.find((test) => test.id === requestedTest);

    if (matchingTest) {
      setSelectedTest(matchingTest);
    }
  }, [searchParams]);

  // Scroll to top when test selection changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const content = document.querySelector('.tool-box-content');
    if (content) {
      content.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedTest]);

  // Sort and filter tests alphabetically by name (A-Z)
  const sortedTests = [...biochemicalTestsData]
    .filter(test => 
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      test.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ToolBox
      title="Biochemical Tests Reference"
      icon="TEST"
      onClose={() => navigate('/')}
      showBackButton={selectedTest !== null}
      onBack={() => selectTest(null)}
    >
      <div className="biochemical-container">
        {!selectedTest ? (
          <div className="az-list-view">
            <div className="az-header">
              <h2>Biochemical Tests (A–Z)</h2>
              <p className="az-subtitle">
                Bench-friendly biochemical test cards with concise purpose, principle, methods, expected results, and QC to support quick lookups during organism workups.
              </p>
              
              <div className="az-legend">
                <strong>Legend:</strong>
                <span className="legend-pill acid">A (acid)</span>
                <span className="legend-pill alkaline">K (alkaline)</span>
                <span className="legend-pill aa">A/A</span>
                <span className="legend-pill ka">K/A</span>
                <span className="legend-pill kk">K/K</span>
                <span className="legend-pill h2s">H2S</span>
                <span className="legend-pill growth">Growth</span>
                <span className="legend-pill nogrowth">No growth</span>
              </div>
              
              <div className="az-search-container">
                <input 
                  type="text" 
                  className="az-search-input"
                  placeholder="Search tests or categories (e.g., Catalase, Oxidase)..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="az-tests-list">
              {sortedTests.length > 0 ? (
                sortedTests.map((test) => (
                  <div 
                    key={test.id} 
                    className="az-test-card animate-step"
                    onClick={() => selectTest(test)}
                  >
                    <h3>{test.name}</h3>
                    <span className="az-test-category">{test.category}</span>
                    <p className="az-test-product">
                      <strong>Product:</strong> {test.expectedResults.split('\n')[0].replace('Positive: ', '')}
                    </p>
                  </div>
                ))
              ) : (
                <div className="az-no-results">No tests found matching "{searchTerm}"</div>
              )}
            </div>
            <AlphaValidationCTA
              location="clinical_bench_reference_biochemical_tests"
              title="Help validate the bench reference"
              body="Tell us which test cards you use most, what is missing, and whether saved bookmarks would help you return to key reactions."
            />
          </div>
        ) : (
          <div className="test-detail-view animate-step">
            <div className="test-header">
              <span className="test-category-label large">{selectedTest.category}</span>
              <h2>{selectedTest.name}</h2>
              {(() => {
                const matchingVisual = atlasPages.find((page) => page.biochemicalTestId === selectedTest.id);

                if (!matchingVisual) {
                  return null;
                }

                return (
                  <button
                    type="button"
                    className="test-visual-link"
                    onClick={() => navigate(`/visuals/${matchingVisual.slug}`)}
                  >
                    Open visual bench card
                  </button>
                );
              })()}
            </div>
            
            <div className="test-content">
              <div className="content-section">
                <h3>Principle</h3>
                <p>{selectedTest.principle}</p>
              </div>

              <div className="content-section">
                <h3>Reagents & Media</h3>
                <p>{selectedTest.reagents}</p>
              </div>

              <div className="content-section">
                <h3>Procedure</h3>
                <p className="pre-line">{selectedTest.procedure}</p>
              </div>

              <div className="content-section qc-section">
                <h3>Quality Control</h3>
                <div className="qc-grid">
                  <div className="qc-box positive">
                    <strong>Positive Control:</strong>
                    <br />
                    <em>{selectedTest.qcPositive}</em>
                  </div>
                  <div className="qc-box negative">
                    <strong>Negative Control:</strong>
                    <br />
                    <em>{selectedTest.qcNegative}</em>
                  </div>
                </div>
              </div>

              <div className="content-section expected-results">
                <h3>Expected Results</h3>
                <p className="pre-line">{selectedTest.expectedResults}</p>
              </div>
            </div>

            {(() => {
              const currentIndex = sortedTests.findIndex(t => t.id === selectedTest.id);
              const prevTest = currentIndex > 0 ? sortedTests[currentIndex - 1] : null;
              const nextTest = currentIndex >= 0 && currentIndex < sortedTests.length - 1 ? sortedTests[currentIndex + 1] : null;

              return (
                <div className="test-detail-nav">
                  <button 
                    className="detail-nav-btn prev"
                    disabled={!prevTest}
                    onClick={() => prevTest && selectTest(prevTest)}
                  >
                    <span className="nav-arrow">←</span>
                    <div className="nav-text">
                      <span className="nav-label">Previous Test</span>
                      <span className="nav-test-name">{prevTest ? prevTest.name : 'None'}</span>
                    </div>
                  </button>

                  <button 
                    className="detail-nav-btn next"
                    disabled={!nextTest}
                    onClick={() => nextTest && selectTest(nextTest)}
                  >
                    <div className="nav-text right">
                      <span className="nav-label">Next Test</span>
                      <span className="nav-test-name">{nextTest ? nextTest.name : 'None'}</span>
                    </div>
                    <span className="nav-arrow">-&gt;</span>
                  </button>
                </div>
              );
            })()}
            <AlphaValidationCTA
              location={`clinical_bench_reference_${selectedTest.id}`}
              title="Help improve this reference card"
              body="Tell us whether this procedure/QC page answered your question and whether saved bookmarks would help your bench review."
            />
          </div>
        )}
      </div>
    </ToolBox>
  );
};

export default BiochemicalTests;
