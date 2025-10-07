import styles from "./CircleDiagram.module.css";

export default function CircleDiagram({ moveList }) {
  const radius = 150;
  const circle = 2 * Math.PI;
  const smallCircleRadius = 30;

  const positions = moveList.map((move: string, i: number) => {
    const circleFraction = i / moveList.length;
    // angle of full circle in rads
    const angle = circleFraction * circle;
    // console.log(Math.cos(angle) * radius);
    //horizontal distance at angle
    // CAH adjacent = cos * hypotenuse
    const x = Math.cos(angle) * radius + radius;
    // SOH opposite = sin * hypotenuse
    const y = Math.sin(angle) * radius + radius;
    return { x, y };
  });

  // const arrows = [];
  // //TO DO THE LINES:
  // // go through each element, and draw a "winning" line to the ones odd numbers away
  // // draw a "losing" line to ones odd numbers away
  // for (let i = 0; i < moveList.length; i++) {
  //   //each step ahead, only go halfway round the circle
  //   for (let step = 1; step <= moveList.length / 2; step++) {
  //     const anotherIndex = (i + step) % moveList.length;
  //     const type = step % 2 === 0 ? "winning" : "losing";
  //     arrows.push({ from: i, to: anotherIndex, type });
  //   }
  // }
  // console.log(arrows);

  return (
    <div
      className={styles.bigCircle}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {positions.map((coords, i: number) => (
        <div
          key={i}
          className={styles.littleCircle}
          style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
        >
          {moveList[i]}
        </div>
      ))}
    </div>
  );
}
