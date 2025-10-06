import styles from "./CircleDiagram.module.css";

export default function CircleDiagram({ moveList }) {
  const radius = 120;

  return (
    <div className={styles.bigCircle}>
      {moveList.map((move: string, i: number) => {
        const circleFraction = i / moveList.length;
        const circle = 2 * Math.PI;
        // angle of full circle in rads
        const angle = circleFraction * circle;
        // console.log(Math.cos(angle) * radius);
        //horizontal distance at angle
        // CAH adjacent = cos * hypotenuse
        const x = Math.cos(angle) * radius;
        // SOH opposite = sin * hypotenuse
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={i}
            className={styles.littleCircle}
            style={{ left: `${x}px`, top: `${y}px` }}
          >
            {move}
          </div>
        );
      })}
    </div>
  );
}
