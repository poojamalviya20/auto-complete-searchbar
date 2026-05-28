import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const fetchData = async () => {
    console.log("api call");
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResult(true)}
          onBlur={() => setShowResult(false)}
        />
        {showResult && (
          <div className="results-container">
            {results.map((r) => (
              <span className="result" key={r.id}>
                {" "}
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
