import { useState } from "react";
import Header from "./components/Header";
import Status from "./components/Status";
import Chips from "./components/Chips";
import { languages } from "./assets/languages";
import { getRandomWord } from "./assets/utils";
import { clsx } from "clsx";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
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
    if (isGameWon || isGamelost) {
      const isExisting = guessedWord.has(letter) ? true : false;
      return (
        <span
          key={index}
          className={clsx(isExisting ? "green" : "red")}
          // style={{
          //   color: isExisting ? "green" : "red",
          // }}
        >
          {letter.toUpperCase()}
        </span>
      );
    } else {
      const shownLetter = guessedWord.has(letter) ? letter : "";
      return <span key={index}>{shownLetter.toUpperCase()}</span>;
    }
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

  function onSelectNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedWord(new Set());
  }

  return (
    <>
      {isGameWon && <Confetti />}
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
        <button className="new-game-button" onClick={onSelectNewGame}>
          New Game
        </button>
      )}
    </>
  );
}
