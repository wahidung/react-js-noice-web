import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./style.css";
import Artist from "./pages/Artist";
import Album from "./pages/Album";

export default function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Artist}></Route>
        <Route path="/album/:id" component={Album}></Route>
      </Router>
    </div>
  );
}
