import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Summarizer from "./Components/Tools/Summarizer";
import ImageCaptioner from "./Components/Tools/ImageCaptioner";
import CodeExplainer from "./Components/Tools/CodeExplainer";
import StartupPitchWriter from "./Components/Tools/StartupPitchWriter";
import FlashcardGenerator from "./Components/Tools/FlashcardGenerator";
import ResumePolisher from "./Components/Tools/ResumePolisher";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/summarizer" element={<Summarizer />} />
          <Route path="/image-captioner" element={<ImageCaptioner />} />
          <Route path="/code-explainer" element={<CodeExplainer />} />
          <Route path="/startup-pitch-writer" element={<StartupPitchWriter />} />
          <Route path="/flashcard-generator" element={<FlashcardGenerator />} />
          <Route path="/resume-polisher" element={<ResumePolisher />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
