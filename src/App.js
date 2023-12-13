// plugin
import React from "react";

// assets
import "./App.css";

// components
import Navbar from "./components/layout/Navbar";

// pages
import DocumentsScreen from "./pages/Documents";
function App() {
  return (
    <div className="App">
      <Navbar />
      <DocumentsScreen />
    </div>
  );
}

export default App;
