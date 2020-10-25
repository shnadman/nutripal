import React from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.04,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x / 4}deg) rotateY(${y / 4}deg) scale(${s})`;

export default ({ component }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 150, friction: 60 },
  }));
  return (
    <animated.div
      style={{
        width: "100%",
        height: "100%",
        margin: "0",
        padding: "0",
        transform: props.xys.interpolate(trans),
      }}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
    >
      {component}
    </animated.div>
  );
};
