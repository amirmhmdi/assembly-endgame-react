import clsx from "clsx";
import { languages } from "../assets/languages";

export default function Chips({ wrongCount }) {
  const chips = languages.map((language, index) => {
    const isDead = wrongCount > index;
    const className = clsx("chip", isDead && "lost");
    return (
      <span
        key={language.name}
        //   className={`chip ${wrongCount > index ? 'lost' : ''}`}
        className={className}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });
  return <div className="chips-container">{chips}</div>;
}
