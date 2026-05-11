import React, { useState } from "react";

function GuessInput({ allSolutions, foundSolutions, correctAnswerCallback }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Make your first guess!");

  function handleGuess() {
    const word = input.trim().toUpperCase();

    if (!word) return;

    if (foundSolutions.includes(word)) {
      setMessage(`${word} has already been found!`);
    } else if (allSolutions.includes(word)) {
      correctAnswerCallback(word);
      setMessage(`${word} is correct!`);
    } else {
      setMessage(`${word} is incorrect!`);
    }

    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleGuess();
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <p>{message}</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter word"
      />
    </div>
  );
}

export default GuessInput;