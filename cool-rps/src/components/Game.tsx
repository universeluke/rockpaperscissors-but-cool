import styles from "./Game.module.scss";

export default function Game({ playerMove, computerMove }) {
  return (
    <div className={styles.container}>
      {playerMove && computerMove && (
        <p>
          u picked {playerMove}, i picked {""}
          {computerMove}
        </p>
      )}
    </div>
  );
}
