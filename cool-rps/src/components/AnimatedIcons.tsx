import styles from "./AnimatedIcons.module.scss";

interface AnimatedIconsProps {
  move: string;
}

export default function AnimatedIcons({ move }: AnimatedIconsProps) {
  if (move === "rock") return <img className={styles.icon} src="/rock.svg" />;
  if (move === "scissors")
    return <img className={styles.icon} src="/scissors.svg" />;
  if (move === "paper") return <img className={styles.icon} src="/paper.svg" />;
}
