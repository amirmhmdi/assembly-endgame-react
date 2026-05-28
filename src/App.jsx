import { useState } from "react";
import Header from "./components/Header";
import Status from "./components/Status";
import Chips from "./components/Chips";
import { languages } from "./assets/languages";
import { clsx } from "clsx";
import "./App.css";

export default function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedWord, setGuessedWord] = useState(new Set());

  var wrongCount = 0;
  guessedWord.forEach((letter) => {
    if (!currentWord.includes(letter)) wrongCount++;
  });
  const isGamelost = wrongCount >= languages.length ? true : false;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedWord.has(letter));

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const letters = Array.from([...currentWord]);
  const letterElement = letters.map((letter, index) => {
    const shownLetter = guessedWord.has(letter) ? letter : "";
    return <span key={index}>{shownLetter.toUpperCase()}</span>;
  });

  const isLastInputWrong =
    guessedWord.size > 0 && !currentWord.includes([...guessedWord].at(-1));
  const deadLanguage = isLastInputWrong ? languages[wrongCount - 1].name : null;

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
        disabled={isGameWon || isGamelost}
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
      <Status
        isGamelost={isGamelost}
        isGameWon={isGameWon}
        deadLanguage={deadLanguage}
      />
      <Chips wrongCount={wrongCount} />
      <section className="letters-container">{letterElement}</section>
      <section className="keyboard-container">{keyboardElement}</section>
      {(isGamelost || isGameWon) && (
        <button className="new-game-button">New Game</button>
      )}
    </>
  );
}
