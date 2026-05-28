import { languages } from "../assets/languages";

export default function Chips() {
  const chips = languages.map((language) => (
    <div
      key={language.name}
      className="chip"
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
    >
      {language.name}
    </div>
  ));
  return <div className="chips-container">{chips}</div>;
}
