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
import CertificationStudyPaths from "./tools/CertificationStudyPaths/CertificationStudyPaths";
import About from "./components/About";
import NotFound from "./components/NotFound";

import MicroBasics from "./components/Guides/MicroBasics";
import { LearnArticle, LearnHub } from "./components/Learn/LearnHub";
import VisualAtlas from "./components/VisualAtlas/VisualAtlas";

import GlobalSearch from "./components/Search/GlobalSearch";
import JoinAlpha from "./components/JoinAlpha";
import AuthPage from "./components/Auth/AuthPage";
import AccountPage from "./components/Account/AccountPage";
import ASCPReviewPage from "./components/ASCPReview/ASCPReviewPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={null} />
        <Route path="about" element={<About />} />
        <Route path="learn" element={<LearnHub />} />
        <Route path="learn/:slug" element={<LearnArticle />} />
        <Route path="visuals" element={<VisualAtlas />} />
        <Route path="visuals/:slug" element={<VisualAtlas />} />
        <Route path="guides" element={<MicroBasics />} />
        <Route path="search" element={<GlobalSearch />} />
        <Route path="auth" element={<AuthPage />} />
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
        <Route path="certification-study-paths" element={<CertificationStudyPaths />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
