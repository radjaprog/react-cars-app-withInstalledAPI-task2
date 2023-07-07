import logo from "./logo.svg";
import Router from "./Router";
import "./App.css";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
