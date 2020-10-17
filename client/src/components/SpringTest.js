import { animated, useTransition } from "react-spring/index";
import MacrosAggTable from "./MacrosTableAggregate/FullTable";
import Box from "@material-ui/core/Box";
import React from "react";
import { useSelected } from "./utils/hooks";

export default ({ anySelected }) => {
  const dynamicSelecting = useSelected(data);
  const { selected, anySelected } = dynamicSelecting;
  const transition = useTransition(anySelected, null, {
    from: { transform: "translate3d(-250px,0,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(-250px,0,0)" },
  });

  return transition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div minWidth="fill-content" key={key} style={props}>
          <MacrosAggTable rows={selected} dynamicSelecting={dynamicSelecting} />
        </animated.div>
      )
  );
};
