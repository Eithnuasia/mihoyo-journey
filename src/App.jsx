import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CharactersPage from "./pages/Characters/CharactersPage";
import Memories from "./pages/Memories";
import FontLoader from "./components/FontLoader";

function App() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Router>
      <FontLoader />
      <MainLayout isMuted={isMuted} toggleMute={toggleMute}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/memories" element={<Memories />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
