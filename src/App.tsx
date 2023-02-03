import React, { useRef, useState } from "react";
import "./App.css";
import { useRuler } from "./useRuler";

function App() {
  const ref = useRef(null);
  const [state, setState] = useState(false);
  const { width, height, top, left } = useRuler(ref) || {};

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {width} x {height}, {top} {left}
        </p>
        <a
          ref={ref}
          className={state ? "App-logo1" : "App-logo2"}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          state
        </a>
        <button onClick={() => setState((prev) => !prev)}>old</button>
      </header>
    </div>
  );
}

export default App;
