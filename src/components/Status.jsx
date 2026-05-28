import { getFarewellText } from "../assets/utils";

export default function Status(props) {
  if (props.isGamelost === false && props.isGameWon === false) {
    if (props.deadLanguage !== null) {
      return (
        <section className="status-section wrong-list">
          <p>{getFarewellText(props.deadLanguage)}</p>
        </section>
      );
    }
    return <section className="status-section"></section>;
  } else if (props.isGameWon) {
    return (
      <section className="status-section won">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
    );
  } else {
    return (
      <section className="status-section lost">
        <h2>Game over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </section>
    );
  }
}
