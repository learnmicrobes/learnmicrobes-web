import { Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./components/About";
import InfoPage from "./components/InfoPages";
import NotFound from "./components/NotFound";
import JoinAlpha from "./components/JoinAlpha";
import { lazyWithPreload } from "./utils/lazyWithPreload";

// Every page except the small static ones downloads on first visit, so a phone
// opening one page does not also download the atlas, the question bank, and the
// guides. index.tsx preloads the current page before the first render.
const BioCalculator = lazyWithPreload(() => import("./tools/BioCalculator/Calculator"));
const GramPositiveRoadmap = lazyWithPreload(() => import("./tools/GramPositiveRoadmap/PositiveRoadmap"));
const GramNegativeRoadmap = lazyWithPreload(() => import("./tools/GramNegativeRoadmap/NegativeRoadmap"));
const ObligateAnaerobeRoadmap = lazyWithPreload(() => import("./tools/ObligateAnaerobeRoadmap/AnaerobeRoadmap"));
const BiochemicalTests = lazyWithPreload(() => import("./tools/BiochemicalTests/BiochemicalTests"));
const UnknownIsolateWorkup = lazyWithPreload(() => import("./tools/UnknownIsolateWorkup/UnknownIsolateWorkup"));
const SpecialPathogensHub = lazyWithPreload(() => import("./tools/SpecialPathogensHub/SpecialPathogensHub"));
const SyndromeDiagnosticPath = lazyWithPreload(() => import("./tools/SyndromeDiagnosticPath/SyndromeDiagnosticPath"));
const DoNotRoutineCulture = lazyWithPreload(() => import("./tools/DoNotRoutineCulture/DoNotRoutineCulture"));
const StudyQuiz = lazyWithPreload(() => import("./tools/StudyQuiz/StudyQuiz"));
const CaseStudySimulator = lazyWithPreload(() => import("./tools/CaseStudySimulator/CaseStudySimulator"));
const Flashcards = lazyWithPreload(() => import("./tools/Flashcards/Flashcards"));
const CertificationStudyPaths = lazyWithPreload(() => import("./tools/CertificationStudyPaths/CertificationStudyPaths"));
const MicroBasics = lazyWithPreload(() => import("./components/Guides/MicroBasics"));
const LearnHub = lazyWithPreload(() => import("./components/Learn/LearnHub").then((module) => ({ default: module.LearnHub })));
const LearnArticle = lazyWithPreload(() => import("./components/Learn/LearnHub").then((module) => ({ default: module.LearnArticle })));
const VisualAtlas = lazyWithPreload(() => import("./components/VisualAtlas/VisualAtlas"));
const GlobalSearch = lazyWithPreload(() => import("./components/Search/GlobalSearch"));
const AuthPage = lazyWithPreload(() => import("./components/Auth/AuthPage"));
const AccountPage = lazyWithPreload(() => import("./components/Account/AccountPage"));
const ASCPReviewPage = lazyWithPreload(() => import("./components/ASCPReview/ASCPReviewPage"));
const PracticePage = lazyWithPreload(() => import("./components/Practice/PracticePage"));

// First path segment -> the lazy pages that route can render.
const pagesBySection: Record<string, Array<{ preload: () => Promise<unknown> }>> = {
  learn: [LearnHub, LearnArticle],
  visuals: [VisualAtlas],
  guides: [MicroBasics],
  practice: [PracticePage],
  search: [GlobalSearch],
  auth: [AuthPage],
  login: [AuthPage],
  register: [AuthPage],
  account: [AccountPage],
  "ascp-microbiology-review": [ASCPReviewPage],
  "biochemical-calculator": [BioCalculator],
  "gram-positive-roadmap": [GramPositiveRoadmap],
  "gram-negative-roadmap": [GramNegativeRoadmap],
  "obligate-anaerobe-roadmap": [ObligateAnaerobeRoadmap],
  "biochemical-tests": [BiochemicalTests],
  "unknown-isolate-workup": [UnknownIsolateWorkup],
  "special-pathogens": [SpecialPathogensHub],
  "syndrome-diagnostic-path": [SyndromeDiagnosticPath],
  "do-not-routine-culture": [DoNotRoutineCulture],
  "study-quiz": [StudyQuiz],
  "case-study-simulator": [CaseStudySimulator],
  flashcards: [Flashcards],
  "certification-study-paths": [CertificationStudyPaths]
};

/** Downloads the code for the page at `pathname`. Resolves immediately for eager pages. */
export const preloadRoute = (pathname: string) => {
  const section = pathname.split("/")[1] ?? "";
  return Promise.all((pagesBySection[section] ?? []).map((page) => page.preload()));
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={null} />
        <Route path="about" element={<About />} />
        <Route path="disclaimer" element={<InfoPage page="disclaimer" />} />
        <Route path="terms" element={<InfoPage page="terms" />} />
        <Route path="privacy" element={<InfoPage page="privacy" />} />
        <Route path="faq" element={<InfoPage page="faq" />} />
        <Route path="mission" element={<InfoPage page="mission" />} />
        <Route path="learn" element={<LearnHub />} />
        <Route path="learn/:slug" element={<LearnArticle />} />
        <Route path="visuals" element={<VisualAtlas />} />
        <Route path="visuals/:slug" element={<VisualAtlas />} />
        <Route path="guides" element={<MicroBasics />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="search" element={<GlobalSearch />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="join-alpha" element={<JoinAlpha />} />
        <Route path="ascp-microbiology-review" element={<ASCPReviewPage />} />
        <Route path="biochemical-calculator" element={<BioCalculator />} />
        <Route path="gram-positive-roadmap" element={<GramPositiveRoadmap />} />
        <Route path="gram-negative-roadmap" element={<GramNegativeRoadmap />} />
        <Route path="obligate-anaerobe-roadmap" element={<ObligateAnaerobeRoadmap />} />
        <Route path="biochemical-tests" element={<BiochemicalTests />} />
        <Route path="unknown-isolate-workup" element={<UnknownIsolateWorkup />} />
        <Route path="special-pathogens" element={<SpecialPathogensHub />} />
        <Route path="syndrome-diagnostic-path" element={<SyndromeDiagnosticPath />} />
        <Route path="do-not-routine-culture" element={<DoNotRoutineCulture />} />
        <Route path="study-quiz" element={<StudyQuiz />} />
        <Route path="case-study-simulator" element={<CaseStudySimulator />} />
        <Route path="flashcards" element={<Flashcards />} />
        <Route path="certification-study-paths" element={<CertificationStudyPaths />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
