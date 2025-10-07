import { getResult } from "../utils/getResult";
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

  console.log(positions);

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

  // ONLY get winning moves, just draw winning arrows
  // winningMoves is an array of objects, each object describes a winning move
  //use existing getResult logic
  const winningMoves = [];
  for (let i = 0; i < moveList.length; i++) {
    for (let step = 0; step < moveList.length; step++) {
      if (i === step) continue;
      if (getResult(moveList[i], moveList[step], moveList) === 1) {
        winningMoves.push({ from: i, to: step });
      }
    }
  }
  console.log(winningMoves);
  return (
    <div
      className={styles.bigCircle}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <svg className={styles.lines} width={radius * 2} height={radius * 2}>
        <defs>
          <marker
            id="arrowhead"
            orient="auto"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            markerUnits="strokeWidth"
          >
            <polygon points="0 2.5, 5 5, 0, 7.5" fill="green" />
          </marker>
        </defs>
        {winningMoves.map(({ from, to }, i) => {
          const posFrom = positions[from];
          const posTo = positions[to];
          return (
            <line
              key={i}
              x1={posFrom.x}
              y1={posFrom.y}
              x2={posTo.x}
              y2={posTo.y}
              stroke="green"
              strokeWidth="2"
              markerMid="url(#arrowhead)"
            />
          );
        })}
      </svg>
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
