import { useState } from "react";
import Header from "./components/Header";
import Status from "./components/Status";
import Chips from "./components/Chips";
import { clsx } from "clsx";
import "./App.css";

export default function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedWord, setGuessedWord] = useState(new Set());

  var wrongCount = 0;
  guessedWord.forEach((letter) => {
    if (!currentWord.includes(letter)) wrongCount++;
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const letters = Array.from([...currentWord]);
  const letterElement = letters.map((letter, index) => {
    const shownLetter = guessedWord.has(letter) ? letter : "";
    return <span key={index}>{shownLetter.toUpperCase()}</span>;
  });

  function onKeyboardClicked(letter) {
    if (guessedWord.has(letter)) return;
    setGuessedWord((prev) => new Set(prev).add(letter));
  }

  const keyboardElement = alphabet.split("").map((letter) => {
    const isGuessed = guessedWord.has(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    return (
      <button
        key={letter}
        onClick={() => onKeyboardClicked(letter)}
        className={clsx({
          correct: isCorrect,
          wrong: isWrong,
        })}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      <Header />
      <Status statusText="“Farewell HTML & CSS” 🫡 " />
      <Chips wrongCount={wrongCount} />
      <section className="letters-container">{letterElement}</section>
      <section className="keyboard-container">{keyboardElement}</section>
      <button className="new-game-button">New Game</button>
    </>
  );
}
