import "./App.css";
import { useRef } from "react";
import Camera from "./components/Camera";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Photos from "./pages/Photos";
//import soundPato from "./assets/soundPato.wav";

function App() {
  const buttonRef = useRef(null);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/1111"
            element={
              <div className="App">
                <Camera buttonRef={buttonRef} />
              </div>
            }
          />
          <Route exact path="/photos" element={<Photos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
