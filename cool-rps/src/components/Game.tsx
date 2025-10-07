import styles from "./Game.module.scss";

export default function Game({ playerMove, computerMove, prevScore }) {
  let comment = "";
  if (prevScore === 1) comment = "you got lucky...";
  if (prevScore === -1) comment = "GET CRUSHED";
  if (prevScore === 0) comment = "don't waste my time, fool";
  return (
    <div className={styles.container}>
      {playerMove && computerMove ? (
        <p>
          you picked {playerMove}, i picked {""}
          {computerMove} - {comment}
        </p>
      ) : (
        <p>make your move...</p>
      )}
    </div>
  );
}
