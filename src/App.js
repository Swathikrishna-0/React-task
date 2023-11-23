import "./App.css";
import CreateItem from "./Components/CreateItem/CreateItem";
import LandingPage from "./Components/LandingPage/LandingPage";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/additem" element={<CreateItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
