import styles from "./AnimatedIcons.module.scss";

interface AnimatedIconsProps {
  move: string;
}

export default function AnimatedIcons({ move }: AnimatedIconsProps) {
  if (move === "rock")
    return (
      <>
        <img className={styles.iconOne} src="/rock.svg" />
        <img className={styles.iconTwo} src="/rock.svg" />
        <img className={styles.iconThree} src="/rock.svg" />
      </>
    );
  if (move === "scissors")
    return (
      <>
        <img className={styles.iconOne} src="/scissors.svg" />
        <img className={styles.iconTwo} src="/scissors.svg" />
        <img className={styles.iconThree} src="/scissors.svg" />
      </>
    );
  if (move === "paper")
    return (
      <>
        <img className={styles.iconOne} src="/paper.png" />
        <img className={styles.iconTwo} src="/paper.png" />
        <img className={styles.iconThree} src="/paper.png" />
      </>
    );
  else {
    return (
      <div className={styles.notRPS}>
        <p className={styles.iconOne}>{move}</p>
        <p className={styles.iconTwo}>{move}</p>
        <p className={styles.iconThree}>{move}</p>
      </div>
    );
  }
}
