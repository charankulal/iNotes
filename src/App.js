import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import NotesState from "./context/notes/NotesState";
import Alert from "./Components/Alert";

function App() {
  return (
    <>
    <NotesState>
      <Router>
        <Navbar />
        <Alert message="Hii"/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      </NotesState>
    </>
  );
}

export default App;
