import React, { useState } from "react";
import Board from "./Board";
import GuessInput from "./GuessInput";

function App() {
  const [gameState, setGameState] = useState("before");

  const [size, setSize] = useState(3);
  const [grid, setGrid] = useState([]);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);

  const [challenges, setChallenges] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  function correctAnswerFound(word) {
    if (!foundSolutions.includes(word)) {
      setFoundSolutions(prev => [...prev, word]);
    }
  }

  function loadChallenges() {
    fetch("/api/games/")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load challenges");
        return res.json();
      })
      .then(data => setChallenges(data))
      .catch(err => console.log("LOAD ERROR:", err));
  }

  function startGame(game = null) {
    const gameSize = game ? game.size : size;

    setStartTime(Date.now());

    fetch(`/api/game/${gameSize}/`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to start game");
        return res.json();
      })
      .then(data => {
        setGrid(data.grid);
        setAllSolutions(data.solution_words);
        setFoundSolutions([]);
        setGameState("in_progress");
      })
      .catch(err => console.log("START GAME ERROR:", err));
  }

  function endGame() {
    const endTime = Date.now();
    setTotalTime((endTime - startTime) / 1000);
    setGameState("ended");
  }

  return (
    <div className="App">

      {gameState === "before" && (
        <div>
          <button onClick={loadChallenges}>
            Load Challenge
          </button>

          <button onClick={() => startGame()}>
            Start Game
          </button>

          {challenges.length > 0 && (
            <div>
              <h3>Available Challenges</h3>

              {challenges.map((game) => (
                <div key={game.id}>
                  <p>
                    Size: {game.size} | High Score: {game.high_score || "N/A"}
                  </p>

                  <button
                    onClick={() => {
                      setSize(game.size);
                      startGame(game);
                    }}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {gameState === "in_progress" && (
        <div>
          <Board board={grid} />

          <GuessInput
            allSolutions={allSolutions}
            foundSolutions={foundSolutions}
            correctAnswerCallback={correctAnswerFound}
          />

          <p>Found Words: {foundSolutions.join(", ")}</p>

          <button onClick={endGame}>
            Stop Game
          </button>
        </div>
      )}

      {gameState === "ended" && (
        <div>
          <h2>Game Over</h2>

          <p>Total Time: {totalTime} seconds</p>
          <p>Words Found: {foundSolutions.length}</p>

          <h3>Missing Words</h3>
          <ul>
            {allSolutions
              .filter(word => !foundSolutions.includes(word))
              .map(word => (
                <li key={word}>{word}</li>
              ))}
          </ul>

          <button onClick={() => setGameState("before")}>
            Back to Start
          </button>
        </div>
      )}
    </div>
  );
}

export default App;