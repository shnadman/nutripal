import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CardGrid from "./CardGrid";
import { RemoveAction, StarAction } from "./CardComponents/CardActions";
import MacrosAggTable from "./MacrosTableAggregate/FullTable";
import React, { cloneElement, useState } from "react";
import { useSelected } from "./utils/hooks";
import { animated, useSpring } from "react-spring";
import { clearResults } from "../features/macros";
import {useDispatch, useSelector} from "react-redux";
import "./UserHub/gridStyles.css";
import "./tableStyles.css";
import RingLoader from "react-spinners/RingLoader";

export default ({
  data,
  compositionCreateAction,
  compositionUpdateAction,
  pagination,
  params,
  dynamicSelecting,
}) => {
  const dispatch = useDispatch();
  const { selected, anySelected, clearSelected } = dynamicSelecting;
  const { isLoading } = useSelector((state) => state.macros);


const kaa = "#5eef97"
  const renderLoadingSpinner = (
      <div style={{position:"relative",left:"50vw"}}>
        <RingLoader  color="#5eef97" size={120} loading={true} />
      </div>)


  const springPropsGrid = useSpring({
    config: { mass: 12, tension: 600, friction: 350, clamp: true },
    overflowY: "scroll",
    height: "90vh",
    transform: anySelected
      ? "translate3d(20px,0px,0px)"
      : "translate3d(-350px,0px,0px)",
  });

  const springPropsTable = useSpring({
    config: { mass: 10, tension: 700, friction: 350, clamp: true },
    transform: anySelected ? "translateX(0px)" : "translateX(-750px)",
  });

  const handleClearResults = () => {
    dispatch(clearResults());
    clearSelected();
  };

  const renderGrid = (
    <animated.div class="container" style={springPropsGrid}>
      <CardGrid
        data={data}
        dynamicSelecting={dynamicSelecting}
        pagination={pagination}
        params={params}
        curriedCardAction={(id, starred) => (
          expanded,
          handleExpandClick,
          commentsCount
        ) => (
          <StarAction
            id={id}
            starred={starred}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
            commentsCount={commentsCount}
          />
        )}
      />
    </animated.div>
  );

  const renderTable = (
    <animated.div style={springPropsTable}>
      <Box paddingTop="30px" width="112%">
        <MacrosAggTable
          rows={selected}
          dynamicSelecting={dynamicSelecting}
          compositionCreateAction={compositionCreateAction}
          compositionUpdateAction={compositionUpdateAction}
        />
      </Box>
    </animated.div>
  );

  return (
    <Box display="flex">
      {isLoading ? renderLoadingSpinner : renderTable}
      <div>
        <Container maxWidth="lg">{renderGrid}</Container>
      </div>
    </Box>
  );
};
