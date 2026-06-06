import { Routes, Route } from "react-router-dom";
import App from "./App";
import BioCalculator from "./tools/BioCalculator/Calculator";
import GramPositiveRoadmap from "./tools/GramPositiveRoadmap/PositiveRoadmap";
import GramNegativeRoadmap from "./tools/GramNegativeRoadmap/NegativeRoadmap";
import ObligateAnaerobeRoadmap from "./tools/ObligateAnaerobeRoadmap/AnaerobeRoadmap";
import BiochemicalTests from "./tools/BiochemicalTests/BiochemicalTests";
import UnknownIsolateWorkup from "./tools/UnknownIsolateWorkup/UnknownIsolateWorkup";
import SpecialPathogensHub from "./tools/SpecialPathogensHub/SpecialPathogensHub";
import SyndromeDiagnosticPath from "./tools/SyndromeDiagnosticPath/SyndromeDiagnosticPath";
import DoNotRoutineCulture from "./tools/DoNotRoutineCulture/DoNotRoutineCulture";
import StudyQuiz from "./tools/StudyQuiz/StudyQuiz";
import CaseStudySimulator from "./tools/CaseStudySimulator/CaseStudySimulator";
import Flashcards from "./tools/Flashcards/Flashcards";
import CertificationStudyPaths from "./tools/CertificationStudyPaths/CertificationStudyPaths";
import About from "./components/About";
import InfoPage from "./components/InfoPages";
import NotFound from "./components/NotFound";

import MicroBasics from "./components/Guides/MicroBasics";
import { LearnArticle, LearnHub } from "./components/Learn/LearnHub";
import VisualAtlas from "./components/VisualAtlas/VisualAtlas";

import GlobalSearch from "./components/Search/GlobalSearch";
import JoinAlpha from "./components/JoinAlpha";
import AuthPage from "./components/Auth/AuthPage";
import AccountPage from "./components/Account/AccountPage";
import ASCPReviewPage from "./components/ASCPReview/ASCPReviewPage";
import PracticePage from "./components/Practice/PracticePage";

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
