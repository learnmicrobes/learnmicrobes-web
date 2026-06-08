import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolBox from '../../components/ToolBox/ToolBox';
import { useAuth } from '../../context/AuthContext';
import { trackEvent } from '../../utils/analytics';
import './RoadmapExperience.css';

export interface RoadmapStep {
  id: string;
  question: string;
  options: {
    text: string;
    nextStep: string | null;
    conclusion?: string;
    tests?: string[];
  }[];
}

type RoadmapDetailMode = 'exam' | 'bench';

type RoadmapSearchResult = {
  id: string;
  type: 'Branch' | 'Choice' | 'Endpoint';
  label: string;
  meta: string;
  snippet: string;
  stepId: string;
  conclusion?: string;
  tests?: string[];
};

type RoadmapShortlistGroup = {
  label: string;
  items: string[];
};

interface RoadmapExperienceProps {
  title: string;
  icon: string;
  roadmap: RoadmapStep[];
  storageKey: string;
  variantClass: string;
}

const splitOptionText = (text: string) => {
  const parts = text
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    title: parts[0] || text,
    details: parts.slice(1)
  };
};

const getChoiceLabel = (text: string) => {
  const { title } = splitOptionText(text);

  return title
    .replace(/\s*\([^)]{18,}\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const getStepById = (roadmap: RoadmapStep[], stepId: string) => roadmap.find((step) => step.id === stepId);

const collectEndpointLabels = (roadmap: RoadmapStep[], stepId: string | null, visited = new Set<string>()): string[] => {
  if (!stepId || visited.has(stepId)) {
    return [];
  }

  visited.add(stepId);
  const step = getStepById(roadmap, stepId);

  if (!step) {
    return [];
  }

  return step.options.flatMap((option) => {
    if (option.conclusion) {
      return [splitOptionText(option.conclusion).title];
    }

    if (option.nextStep) {
      return collectEndpointLabels(roadmap, option.nextStep, new Set(visited));
    }

    return [getChoiceLabel(option.text)];
  });
};

const getOptionOutcomeLabels = (roadmap: RoadmapStep[], option: RoadmapStep['options'][number]) => {
  if (option.conclusion) {
    return [splitOptionText(option.conclusion).title];
  }

  const endpointLabels = collectEndpointLabels(roadmap, option.nextStep);
  return endpointLabels.length > 0 ? endpointLabels : [getChoiceLabel(option.text)];
};

const compactUniqueLabels = (items: string[], limit = 4) => (
  items
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index)
    .slice(0, limit)
);

const getWorkingShortlist = (
  roadmap: RoadmapStep[],
  history: string[],
  currentStep: RoadmapStep,
  currentConclusion: string
): RoadmapShortlistGroup[] => {
  if (currentConclusion) {
    const lookalikes = currentStep.options
      .filter((option) => option.conclusion && option.conclusion !== currentConclusion)
      .map((option) => splitOptionText(option.conclusion as string).title);

    return [
      { label: 'Likely', items: compactUniqueLabels([currentConclusion], 1) },
      { label: 'Close lookalikes', items: compactUniqueLabels(lookalikes, 3) }
    ].filter((group) => group.items.length > 0);
  }

  const possibleNow = compactUniqueLabels(
    currentStep.options.flatMap((option) => getOptionOutcomeLabels(roadmap, option)),
    5
  );

  const previousStepId = history.length > 1 ? history[history.length - 2] : null;
  const previousStep = previousStepId ? getStepById(roadmap, previousStepId) : null;
  const narrowedAway = previousStep
    ? compactUniqueLabels(
        previousStep.options
          .filter((option) => option.nextStep !== currentStep.id)
          .flatMap((option) => getOptionOutcomeLabels(roadmap, option)),
        4
      )
    : [];

  return [
    { label: 'Possible now', items: possibleNow },
    { label: 'Less likely after this branch', items: narrowedAway }
  ].filter((group) => group.items.length > 0);
};

const cleanQuestion = (question: string) => (
  question
    .replace(/:$/, '')
);

const getOptionMorphologyClass = (text: string) => {
  const normalized = text.toLowerCase();

  if (/\b(cocci|coccus|coccal)\b/.test(normalized)) {
    return 'has-cocci-visual';
  }

  if (/\b(rod|rods|bacilli|bacillus|coccobacilli|coccobacillus)\b/.test(normalized)) {
    return 'has-rod-visual';
  }

  return '';
};

const getQuestionHint = (question: string) => {
  const q = question.toLowerCase();

  if (q.includes('oxidase')) {
    return 'Oxidase is an early branch point for Gram-negative organisms. Confirm the reagent timing before committing to the path.';
  }

  if (q.includes('catalase')) {
    return 'Catalase separates staphylococcal-style cocci from streptococcal and enterococcal-style cocci. Avoid carrying over blood agar.';
  }

  if (q.includes('macconkey')) {
    return 'MacConkey tells you both whether the organism tolerates bile salts and whether lactose fermentation is likely.';
  }

  if (q.includes('hemolysis')) {
    return 'Hemolysis is a pattern clue, not a final identification. Pair it with Gram stain, catalase, and confirmatory tests.';
  }

  if (q.includes('morphology') || q.includes('staining')) {
    return 'Morphology and Gram reaction decide which roadmap branch is reasonable. Repeat from an isolated colony if the smear is mixed.';
  }

  if (q.includes('bile') || q.includes('disk')) {
    return 'Disk and bile patterns are most useful when the isolate is pure and incubation conditions match the method.';
  }

  if (q.includes('growth') || q.includes('fastidious')) {
    return 'Growth pattern can be as meaningful as a positive biochemical reaction. Consider media, atmosphere, and incubation time.';
  }

  return 'Choose the branch that matches a confirmed bench observation. If the pattern feels contradictory, verify purity before moving forward.';
};

const getNextTestPrompt = (question: string) => {
  const q = question.toLowerCase();

  if (q.includes('oxidase')) return 'Best next move: read oxidase correctly, then pair it with MacConkey growth and colony morphology.';
  if (q.includes('catalase')) return 'Best next move: run catalase from a clean colony, then choose coagulase or hemolysis logic.';
  if (q.includes('macconkey')) return 'Best next move: decide lactose reaction and whether growth is robust enough for routine enteric logic.';
  if (q.includes('hemolysis')) return 'Best next move: separate alpha, beta, and non-hemolytic patterns before picking confirmatory tests.';
  if (q.includes('indole')) return 'Best next move: verify timing and reagent, then use indole as one part of a profile.';
  if (q.includes('urease')) return 'Best next move: note speed of urease positivity because rapid and delayed reactions can mean different groups.';

  return 'Best next move: pick the most reliable branch-point test available from the current isolate.';
};

const getInitialState = (storageKey: string) => {
  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

const normalizeSavedMode = (savedMode: string | null): RoadmapDetailMode => {
  if (savedMode === 'bench' || savedMode === 'fullDetail' || savedMode === 'expert') {
    return 'bench';
  }

  return 'exam';
};

const getModeBranchHint = (mode: RoadmapDetailMode, question: string) => {
  if (mode === 'bench') {
    return getQuestionHint(question);
  }

  const q = question.toLowerCase();

  if (q.includes('oxidase')) return 'Exam focus: oxidase is a fast split between enteric-style rods and oxidase-positive nonfermenters, curved rods, and fastidious organisms.';
  if (q.includes('catalase')) return 'Exam focus: catalase separates Staphylococcus-like organisms from Streptococcus and Enterococcus patterns.';
  if (q.includes('macconkey')) return 'Exam focus: MacConkey growth and lactose reaction are classic Gram-negative roadmap separators.';
  if (q.includes('hemolysis')) return 'Exam focus: hemolysis is a pattern clue. Pair alpha, beta, or gamma patterns with a confirmatory reaction.';
  if (q.includes('morphology') || q.includes('staining')) return 'Exam focus: start with Gram reaction and shape so the organism lands in the right family of choices.';
  if (q.includes('bile') || q.includes('disk')) return 'Exam focus: disk and bile patterns are memorized differentiators for selected organism groups.';
  if (q.includes('growth') || q.includes('fastidious')) return 'Exam focus: special growth requirements are often the clue that the organism is not routine.';

  return 'Exam focus: choose the branch that matches the highest-yield differentiating clue.';
};

const getModeNextPrompt = (mode: RoadmapDetailMode, question: string) => {
  if (mode === 'bench') {
    return getNextTestPrompt(question);
  }

  const q = question.toLowerCase();

  if (q.includes('oxidase')) return 'Ask: oxidase positive or negative, then connect that result to the expected organism group.';
  if (q.includes('catalase')) return 'Ask: catalase positive or negative, then move to coagulase, hemolysis, or bile/esculin style clues.';
  if (q.includes('macconkey')) return 'Ask: grows or no growth, then lactose fermenter or non-lactose fermenter.';
  if (q.includes('hemolysis')) return 'Ask: alpha, beta, or non-hemolytic, then pick the classic confirmatory test.';
  if (q.includes('indole')) return 'Ask: which organism is classically indole positive or negative in this branch?';
  if (q.includes('urease')) return 'Ask: rapid urease, delayed urease, or negative, because speed can be the clue.';

  return 'Ask: what single clue best separates the choices on this screen?';
};

const isSafetyFeature = (text: string) => (
  /bsl-3|select agent|highly virulent|notify|hazard|public health|reportable|aerosol|escalat|reference|do not|stop routine|biosafety|danger|risk/i.test(text)
);

const getEndpointActions = (conclusion: string, tests: string[]) => {
  const combined = `${conclusion} ${tests.join(' ')}`.toLowerCase();
  const actions: string[] = [];

  if (/bsl-3|select agent|brucella|francisella|tuberculosis|mtb|coxiella|highly virulent|public health/.test(combined)) {
    actions.push('Stop routine workup if the safety pattern fits and follow local escalation or reference-lab policy.');
  }

  if (/anaerob|bacteroides|prevotella|porphyromonas|fusobacterium|clostridium/.test(combined)) {
    actions.push('Confirm oxygen relationship and specimen quality before trusting the identification.');
  }

  if (/mycobacter|acid-fast|afb|tuberculosis|ntm/.test(combined)) {
    actions.push('Pair smear or morphology with mycobacterial culture and molecular identification when clinically indicated.');
  }

  if (/serology|rpr|vdrl|titer|ifa|mat|paired|igm|igg|syphilis|lyme|leptospira/.test(combined)) {
    actions.push('Interpret serology with illness timing and prior exposure; paired sera may be stronger than a single result.');
  }

  if (/naat|pcr|molecular|gene|target|resistance marker/.test(combined)) {
    actions.push('Use molecular results with specimen validity, controls, and culture needs in mind.');
  }

  if (/oxidase|catalase|indole|urease|motility|macconkey|hemolysis|h2s|citrate|coagulase/.test(combined)) {
    actions.push('Verify the core bench reactions from a pure isolate before final reporting.');
  }

  if (/blood|csf|sterile|endocarditis|meningitis|neonatal|immunocompromised/.test(combined)) {
    actions.push('Treat sterile-site, invasive, neonatal, or immunocompromised-context isolates as higher significance.');
  }

  if (actions.length === 0) {
    actions.push('Confirm purity, source significance, and the highest-yield confirmatory test before finalizing.');
  }

  actions.push('Document any discordant feature and step back one branch if the profile does not fit.');

  return Array.from(new Set(actions)).slice(0, 4);
};

const getEndpointStudyTakeaways = (conclusion: string, tests: string[]) => {
  const combined = `${conclusion} ${tests.join(' ')}`.toLowerCase();
  const takeaways: string[] = [];

  if (/oxidase|catalase|indole|urease|motility|macconkey|hemolysis|h2s|citrate|coagulase/.test(combined)) {
    takeaways.push('Anchor the ID to the classic differentiating reaction pattern.');
  }

  if (/anaerob|bacteroides|prevotella|porphyromonas|fusobacterium|clostridium/.test(combined)) {
    takeaways.push('Remember the anaerobe clue set: oxygen relationship, morphology, pigment, bile, spores, and special disks.');
  }

  if (/mycobacter|acid-fast|afb|tuberculosis|ntm/.test(combined)) {
    takeaways.push('Do not treat acid-fast organisms like routine Gram-positive rods.');
  }

  if (/bsl-3|select agent|brucella|francisella|coxiella|highly virulent|public health/.test(combined)) {
    takeaways.push('For exams and bench work, high-risk organisms are escalation patterns, not routine workups.');
  }

  if (takeaways.length === 0) {
    takeaways.push('Focus on the feature pattern that made this endpoint different from its closest lookalikes.');
  }

  takeaways.push(`Likely endpoint: ${conclusion}.`);

  return Array.from(new Set(takeaways)).slice(0, 4);
};

const getEndpointLookalikes = (step: RoadmapStep, conclusion: string) => (
  step.options
    .filter((option) => option.conclusion && option.conclusion !== conclusion)
    .map((option) => splitOptionText(option.conclusion as string).title)
    .filter((item, index, items) => items.indexOf(item) === index)
    .slice(0, 4)
);

const buildPathToStep = (roadmap: RoadmapStep[], targetStepId: string) => {
  const queue: string[][] = [['start']];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const path = queue.shift() as string[];
    const stepId = path[path.length - 1];

    if (stepId === targetStepId) {
      return path;
    }

    if (visited.has(stepId)) {
      continue;
    }
    visited.add(stepId);

    const step = roadmap.find((item) => item.id === stepId);
    step?.options.forEach((option) => {
      if (option.nextStep && !visited.has(option.nextStep)) {
        queue.push([...path, option.nextStep]);
      }
    });
  }

  return targetStepId === 'start' ? ['start'] : ['start', targetStepId];
};

const getRoadmapSearchResults = (roadmap: RoadmapStep[], query: string): RoadmapSearchResult[] => {
  if (query.length < 2) {
    return [];
  }

  const results: RoadmapSearchResult[] = [];
  const normalizedQuery = query.toLowerCase();

  roadmap.forEach((step) => {
    const question = cleanQuestion(step.question);
    if (question.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: `branch-${step.id}`,
        type: 'Branch',
        label: question,
        meta: 'Branch question',
        snippet: step.options.map((option) => getChoiceLabel(option.text)).slice(0, 3).join(' / '),
        stepId: step.id
      });
    }

    step.options.forEach((option, index) => {
      const searchText = [
        step.question,
        option.text,
        option.conclusion ?? '',
        ...(option.tests ?? [])
      ].join(' ').toLowerCase();

      if (!searchText.includes(normalizedQuery)) {
        return;
      }

      const isEndpoint = Boolean(option.conclusion);
      const targetStepId = isEndpoint ? step.id : option.nextStep ?? step.id;
      const label = isEndpoint ? option.conclusion as string : getChoiceLabel(option.text);

      results.push({
        id: `${isEndpoint ? 'endpoint' : 'choice'}-${step.id}-${index}`,
        type: isEndpoint ? 'Endpoint' : 'Choice',
        label: cleanQuestion(label),
        meta: isEndpoint ? `Endpoint from ${question}` : `Choice from ${question}`,
        snippet: option.tests?.slice(0, 2).join(' / ') || splitOptionText(option.text).details.slice(0, 2).join(' / '),
        stepId: targetStepId,
        conclusion: option.conclusion,
        tests: option.tests
      });
    });
  });

  return results
    .filter((result, index, list) => list.findIndex((item) => item.id === result.id) === index)
    .slice(0, 12);
};

const RoadmapExperience: React.FC<RoadmapExperienceProps> = ({
  title,
  icon,
  roadmap,
  storageKey,
  variantClass
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const savedState = getInitialState(storageKey);
  const savedMode = localStorage.getItem(`${storageKey}_mode`);
  const savedHotkeys = localStorage.getItem(`${storageKey}_hotkeys`);
  const savedGuidance = localStorage.getItem(`${storageKey}_guidance`);
  const savedShortlist = localStorage.getItem(`${storageKey}_shortlist`);

  const [currentStepId, setCurrentStepId] = useState<string>(savedState?.currentStepId ?? 'start');
  const [history, setHistory] = useState<string[]>(savedState?.history ?? ['start']);
  const [currentConclusion, setCurrentConclusion] = useState<string>(savedState?.currentConclusion ?? '');
  const [conclusionTests, setConclusionTests] = useState<string[]>(savedState?.conclusionTests ?? []);
  const [detailMode, setDetailMode] = useState<RoadmapDetailMode>(normalizeSavedMode(savedMode));
  const [hotkeysEnabled, setHotkeysEnabled] = useState(savedHotkeys ? JSON.parse(savedHotkeys) : true);
  const [roadmapSearch, setRoadmapSearch] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isGuidanceExpanded, setIsGuidanceExpanded] = useState<boolean>(savedGuidance === 'true');
  const [showWorkingShortlist, setShowWorkingShortlist] = useState<boolean>(savedShortlist === 'true');
  const [isGuestRoadmapModalOpen, setIsGuestRoadmapModalOpen] = useState(false);

  useEffect(() => {
    trackEvent('roadmap_started', {
      roadmap_title: title,
      roadmap_key: storageKey
    });
  }, [storageKey, title]);

  const currentStep = roadmap.find((step) => step.id === currentStepId) || roadmap[0];
  const breadcrumbItems = history
    .map((stepId, index) => {
      const step = roadmap.find((candidate) => candidate.id === stepId);

      if (!step) {
        return null;
      }

      return {
        id: stepId,
        label: index === 0 ? 'Start' : cleanQuestion(step.question),
        stepNumber: index + 1
      };
    })
    .filter((item): item is { id: string; label: string; stepNumber: number } => item !== null);

  const currentHint = useMemo(() => getModeBranchHint(detailMode, currentStep.question), [detailMode, currentStep.question]);
  const nextPrompt = useMemo(() => getModeNextPrompt(detailMode, currentStep.question), [detailMode, currentStep.question]);
  const workingShortlist = useMemo(
    () => getWorkingShortlist(roadmap, history, currentStep, currentConclusion),
    [roadmap, history, currentStep, currentConclusion]
  );
  const endpointActions = useMemo(
    () => detailMode === 'bench'
      ? getEndpointActions(currentConclusion, conclusionTests)
      : getEndpointStudyTakeaways(currentConclusion, conclusionTests),
    [detailMode, currentConclusion, conclusionTests]
  );
  const endpointLookalikes = useMemo(
    () => getEndpointLookalikes(currentStep, currentConclusion),
    [currentStep, currentConclusion]
  );
  const endpointSafety = useMemo(
    () => conclusionTests.filter(isSafetyFeature),
    [conclusionTests]
  );
  const endpointPrimaryClues = detailMode === 'exam' ? conclusionTests.slice(0, 5) : conclusionTests;
  const endpointExtraClues = detailMode === 'exam' ? conclusionTests.slice(5) : [];
  const roadmapSearchResults = useMemo(
    () => getRoadmapSearchResults(roadmap, roadmapSearch.trim()),
    [roadmap, roadmapSearch]
  );
  const showRoadmapSearchResults = roadmapSearch.trim().length >= 2;

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({
      currentStepId,
      history,
      currentConclusion,
      conclusionTests
    }));
  }, [storageKey, currentStepId, history, currentConclusion, conclusionTests]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_mode`, detailMode);
  }, [storageKey, detailMode]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_hotkeys`, JSON.stringify(hotkeysEnabled));
  }, [storageKey, hotkeysEnabled]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_guidance`, JSON.stringify(isGuidanceExpanded));
  }, [storageKey, isGuidanceExpanded]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_shortlist`, JSON.stringify(showWorkingShortlist));
  }, [storageKey, showWorkingShortlist]);

  const handleOptionSelect = (nextStep: string | null, conclusion?: string, tests?: string[]) => {
    if (nextStep) {
      setHistory([...history, nextStep]);
      setCurrentStepId(nextStep);
      setCurrentConclusion('');
      setConclusionTests([]);
      return;
    }

    if (conclusion) {
      setCurrentConclusion(conclusion);
      setConclusionTests(tests || []);
      if (!user) {
        const countKey = `${storageKey}_guest_endpoint_count`;
        const newCount = parseInt(localStorage.getItem(countKey) ?? '0', 10) + 1;
        localStorage.setItem(countKey, String(newCount));
        if (newCount >= 5) {
          setIsGuestRoadmapModalOpen(true);
        }
      }
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentStepId(newHistory[newHistory.length - 1]);
      setCurrentConclusion('');
      setConclusionTests([]);
    }
  };

  const handleReset = () => {
    setCurrentStepId('start');
    setHistory(['start']);
    setCurrentConclusion('');
    setConclusionTests([]);
    setRoadmapSearch('');
    localStorage.removeItem(storageKey);
  };

  const handleResumeFrom = (index: number) => {
    const nextHistory = history.slice(0, index + 1);
    setHistory(nextHistory);
    setCurrentStepId(nextHistory[nextHistory.length - 1]);
    setCurrentConclusion('');
    setConclusionTests([]);
  };

  const handleRoadmapSearchSelect = (result: RoadmapSearchResult) => {
    const nextHistory = buildPathToStep(roadmap, result.stepId);

    setHistory(nextHistory);
    setCurrentStepId(result.stepId);
    setCurrentConclusion(result.conclusion ?? '');
    setConclusionTests(result.tests ?? []);
    setRoadmapSearch('');
  };

  const renderWorkingShortlist = () => {
    if (!showWorkingShortlist || workingShortlist.length === 0) {
      return null;
    }

    return (
      <aside className="roadmap-shortlist-panel" aria-label="Working shortlist">
        <span className="guidance-label">Working shortlist</span>
        <div className="roadmap-shortlist-groups">
          {workingShortlist.map((group) => (
            <section className="roadmap-shortlist-group" key={group.label}>
              <strong>{group.label}</strong>
              <div>
                {group.items.map((item) => (
                  <span key={`${group.label}-${item}`}>{item}</span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hotkeysEnabled) {
        return;
      }

      const target = e.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
        return;
      }

      if (currentConclusion) {
        if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
          handleBack();
        }
        if (e.key === 'Escape') {
          handleReset();
        }
        return;
      }

      const key = parseInt(e.key, 10);
      if (!Number.isNaN(key) && key > 0 && key <= currentStep.options.length) {
        const option = currentStep.options[key - 1];
        handleOptionSelect(option.nextStep, option.conclusion, option.tests);
      }

      if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        handleBack();
      }

      if (e.key === 'Escape') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentConclusion, currentStep, history, hotkeysEnabled]);

  const renderOptions = () => (
    <div className={`options-container ${currentStep.options.length > 2 ? 'grid-layout' : 'binary-layout'} options-count-${currentStep.options.length}`}>
      {currentStep.options.map((option, index) => {
        const optionParts = splitOptionText(option.text);
        const detailItems = [
          ...optionParts.details,
          ...(detailMode === 'bench' ? option.tests ?? [] : [])
        ];
        const quickClues = optionParts.details.slice(0, 2);
        const collapsedDetails = detailMode === 'exam' ? optionParts.details : detailItems;

        return (
          <button
            key={`${option.text}-${index}`}
            type="button"
            className={`option-card ${getOptionMorphologyClass(option.text)}`}
            onClick={() => handleOptionSelect(option.nextStep, option.conclusion, option.tests)}
          >
            {hotkeysEnabled && <div className="option-badge">{index + 1}</div>}
            <h3>{getChoiceLabel(option.text)}</h3>
            {quickClues.length > 0 && (
              <div className="option-clue-strip" aria-label="Quick clues">
                {quickClues.map((clue) => (
                  <span key={clue}>{clue}</span>
                ))}
              </div>
            )}
            {collapsedDetails.length > 0 && (
              <details
                className="option-details"
                onClick={(event) => event.stopPropagation()}
              >
                <summary>{detailMode === 'exam' ? 'Show exam clues' : 'Show branch clues'}</summary>
                <ul>
                  {collapsedDetails.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </details>
            )}
            {detailMode === 'exam' && option.tests && option.tests.length > 0 && (
              <span className="option-footnote">Classic features at result</span>
            )}
            {detailMode === 'bench' && option.tests && option.tests.length > 0 && (
              <span className="option-footnote">{option.tests.length} branch clues</span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <ToolBox
      title={title}
      icon={icon}
      showCloseButton={false}
    >
      <div className={`roadmap-container ${variantClass} roadmap-experience`}>
        <div className="roadmap-top-row">
          <nav className="roadmap-breadcrumbs" aria-label="Roadmap progress path">
            <ol>
              {breadcrumbItems.map((item, index) => {
                const isActive = index === breadcrumbItems.length - 1 && !currentConclusion;

                return (
                  <li key={`${item.id}-${index}`}>
                    <button
                      type="button"
                      className={isActive ? 'active' : ''}
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => handleResumeFrom(index)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
              {currentConclusion && (
                <li>
                  <span className="roadmap-breadcrumb-end" aria-current="step">
                    Endpoint
                  </span>
                </li>
              )}
            </ol>
            <span className="roadmap-step-pill">
              Step {history.length}{currentConclusion ? ' / Endpoint' : ''}
            </span>
          </nav>

          <div className={`roadmap-settings-corner ${isSettingsOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="roadmap-settings-trigger"
              aria-label="Roadmap settings"
              aria-expanded={isSettingsOpen}
              aria-controls={`${storageKey}-roadmap-settings`}
              onClick={() => setIsSettingsOpen((open) => !open)}
            >
              <span aria-hidden="true">⚙</span>
            </button>
            <div
              id={`${storageKey}-roadmap-settings`}
              className="roadmap-settings-drawer"
              aria-hidden={!isSettingsOpen}
            >
              <span className="status-label">Learning mode</span>
              <div className="roadmap-mode-toggle" aria-label="Roadmap mode">
              <button
                type="button"
                className={detailMode === 'exam' ? 'active' : ''}
                onClick={() => setDetailMode('exam')}
              >
                Exam
              </button>
              <button
                type="button"
                className={detailMode === 'bench' ? 'active' : ''}
                onClick={() => setDetailMode('bench')}
              >
                Bench
              </button>
            </div>
              <span className="roadmap-mode-description">
              {detailMode === 'exam'
                ? 'Classic differentiators and memory-friendly clues.'
                : 'Specimen, safety, confirmation, and reporting logic.'}
            </span>
              <span className="status-label">Learning supports</span>
              <label className="roadmap-hotkey-toggle">
              <input
                type="checkbox"
                checked={showWorkingShortlist}
                onChange={(event) => setShowWorkingShortlist(event.target.checked)}
              />
              <span>Show working shortlist</span>
            </label>
              <label className="roadmap-hotkey-toggle">
              <input
                type="checkbox"
                checked={hotkeysEnabled}
                onChange={(event) => setHotkeysEnabled(event.target.checked)}
              />
              <span>Number hotkeys</span>
            </label>
            {hotkeysEnabled && (
              <span className="roadmap-shortcut-hint">
                Press 1-{currentStep.options.length} to choose, Backspace to go back, Esc to reset.
              </span>
            )}
            </div>
          </div>
        </div>

        {currentConclusion ? (
          <div className="conclusion-panel">
            <span className="result-kicker">Identification endpoint</span>
            <div className="result-text">
              {currentConclusion}
            </div>
            {renderWorkingShortlist()}
            <div className="endpoint-summary-grid">
              <section className="endpoint-summary-card">
                <span className="guidance-label">Likely ID</span>
                <p>{currentConclusion}</p>
              </section>
              <section className="endpoint-summary-card">
                <span className="guidance-label">{detailMode === 'exam' ? 'Study takeaway' : 'Next best actions'}</span>
                <ul>
                  {endpointActions.map((action, index) => (
                    <li key={`${action}-${index}`}>{action}</li>
                  ))}
                </ul>
              </section>
              <section className="endpoint-summary-card">
                <span className="guidance-label">Close lookalikes</span>
                {endpointLookalikes.length > 0 ? (
                  <ul>
                    {endpointLookalikes.map((lookalike, index) => (
                      <li key={`${lookalike}-${index}`}>{lookalike}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No sibling endpoint in this branch.</p>
                )}
              </section>
            </div>
            {endpointSafety.length > 0 && (
              <div className="endpoint-safety-panel">
                <h4>Safety / escalation</h4>
                <ul>
                  {endpointSafety.slice(0, 3).map((warning, index) => (
                    <li key={`${warning}-${index}`}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
            {conclusionTests && conclusionTests.length > 0 && (
              <div className="conclusion-tests-container">
                <h4>{detailMode === 'exam' ? 'Top differentiating clues' : 'Bench Confirmation and Diagnostic Criteria'}</h4>
                <ul className="conclusion-tests-list">
                  {endpointPrimaryClues.map((test, index) => {
                    const isWarning = isSafetyFeature(test);
                    return (
                      <li key={`${test}-${index}`} className={isWarning ? 'safety-warning' : ''}>
                        {test}
                      </li>
                    );
                  })}
                </ul>
                {endpointExtraClues.length > 0 && (
                  <details className="conclusion-extra-details">
                    <summary>Show all criteria</summary>
                    <ul className="conclusion-tests-list">
                      {endpointExtraClues.map((test, index) => {
                        const isWarning = isSafetyFeature(test);
                        return (
                          <li key={`${test}-${index}`} className={isWarning ? 'safety-warning' : ''}>
                            {test}
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                )}
              </div>
            )}
            <div className="nav-buttons">
              <button className="nav-btn back-btn" onClick={handleBack}>
                Back
              </button>
              <button className="nav-btn next-btn" onClick={handleReset}>
                Start Over
              </button>
            </div>
          </div>
        ) : (
          <div key={currentStepId} className="animate-step">
            <div className="current-question">
              <div className="roadmap-question-heading">
                <h3>{cleanQuestion(currentStep.question)}</h3>
                <button
                  type="button"
                  className="roadmap-guidance-trigger"
                  aria-expanded={isGuidanceExpanded}
                  aria-controls={`${storageKey}-roadmap-guidance-panel`}
                  onClick={() => setIsGuidanceExpanded((open) => !open)}
                >
                  Need help?
                </button>
              </div>
              {isGuidanceExpanded && (
                <div id={`${storageKey}-roadmap-guidance-panel`} className="roadmap-guidance-panel">
                  <p>
                    <strong>{detailMode === 'exam' ? 'Exam clue' : 'Why this branch matters'}:</strong> {currentHint}
                  </p>
                  <p>
                    <strong>{detailMode === 'exam' ? 'Classic differentiator' : 'Next-test thinking'}:</strong> {nextPrompt}
                  </p>
                </div>
              )}
              {renderWorkingShortlist()}
            </div>

            {renderOptions()}

            <div className="nav-buttons">
              <button
                className="nav-btn back-btn"
                onClick={handleBack}
                disabled={history.length <= 1}
              >
                Back
              </button>
              <button
                className="nav-btn next-btn"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

          </div>
        )}

        <section className={`roadmap-search-box ${isSearchExpanded ? 'expanded' : 'collapsed'}`} aria-label="Search this roadmap">
          <button
            type="button"
            className="roadmap-search-trigger"
            aria-expanded={isSearchExpanded}
            aria-controls={`${storageKey}-roadmap-search-panel`}
            onClick={() => setIsSearchExpanded((open) => !open)}
          >
            🔍 Search this roadmap
          </button>
          {isSearchExpanded && (
            <div id={`${storageKey}-roadmap-search-panel`} className="roadmap-search-panel">
              <label htmlFor={`${storageKey}-roadmap-search`}>Search this roadmap</label>
              <div className="roadmap-search-input-row">
                <input
                  id={`${storageKey}-roadmap-search`}
                  type="search"
                  value={roadmapSearch}
                  onChange={(event) => setRoadmapSearch(event.target.value)}
                  placeholder="Try oxidase, coagulase, Bacteroides, lecithinase..."
                  autoFocus
                />
                {roadmapSearch && (
                  <button type="button" onClick={() => setRoadmapSearch('')}>
                    Clear
                  </button>
                )}
              </div>
              {showRoadmapSearchResults && (
                <div className="roadmap-search-results" role="list">
                  {roadmapSearchResults.length > 0 ? (
                    roadmapSearchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        className="roadmap-search-result"
                        onClick={() => handleRoadmapSearchSelect(result)}
                        role="listitem"
                      >
                        <span className="roadmap-search-result-type">{result.type}</span>
                        <strong>{result.label}</strong>
                        <span>{result.meta}</span>
                        {result.snippet && <small>{result.snippet}</small>}
                      </button>
                    ))
                  ) : (
                    <div className="roadmap-search-empty">No roadmap matches yet.</div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

      </div>

      {isGuestRoadmapModalOpen && !user && (
        <div className="roadmap-guest-modal-backdrop" role="presentation" onClick={() => setIsGuestRoadmapModalOpen(false)}>
          <section className="roadmap-guest-modal" role="dialog" aria-modal="true" aria-labelledby="roadmap-guest-modal-title" onClick={(e) => e.stopPropagation()}>
            <span className="roadmap-guest-modal-kicker">
              <FontAwesomeIcon icon={faLock} />
              Guest tool checkpoint
            </span>
            <h2 id="roadmap-guest-modal-title">Continue exploring with a free account.</h2>
            <p>
              You have reached 5 identification endpoints in this roadmap. Sign in to keep going and track your progress.
            </p>
            <div className="roadmap-guest-modal-actions">
              <button type="button" onClick={() => navigate('/login')}>
                Sign in
              </button>
              <button type="button" onClick={() => navigate('/register')}>
                Create account
              </button>
            </div>
            <button
              type="button"
              className="roadmap-guest-modal-secondary"
              onClick={() => setIsGuestRoadmapModalOpen(false)}
            >
              Keep using this tool
            </button>
          </section>
        </div>
      )}
    </ToolBox>
  );
};

export default RoadmapExperience;
