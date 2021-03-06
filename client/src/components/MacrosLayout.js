import { useMediaQuery } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { animated, useSpring } from "react-spring";
import { StarAction } from "./CardComponents/CardActions";
import CardGrid from "./CardGrid";
import MacrosAggTable from "./MacrosTableAggregate/FullTable";
import "./tableStyles.css";
import "./UserHub/gridStyles.css";
import MacrosTour from "./Tours/MacrosTour";

export default ({
  data,
  compositionCreateAction,
  compositionUpdateAction,
  pagination,
  params,
  dynamicSelecting,
}) => {
  const { selected, anySelected } = dynamicSelecting;
  const { isLoading } = useSelector((state) => state.macros);
  const isMobile = useMediaQuery("(max-width:860px)");

  const renderLoadingSpinner = (
    <div style={{ position: "relative", left: "47vw" }}>
      <RingLoader color="#5eef97" size={120} loading={true} />
    </div>
  );

  const springPropsGrid = useSpring({
    config: { mass: 12, tension: 600, friction: 350, clamp: true },
    overflowY: "scroll",
    height: "90vh",
    transform: isMobile
      ? anySelected
        ? "translate3d(-65px,0px,0px)"
        : "translate3d(-65px,0px,0px)"
      : anySelected
      ? "translate3d(-20px,0px,0px)"
      : "translate3d(-350px,0px,0px)",
  });

  const springPropsTable = useSpring({
    config: { mass: 10, tension: 700, friction: 350, clamp: true },
    transform: anySelected ? "translateX(0px)" : "translateX(-750px)",
  });

  const renderGrid = (
    <animated.div className="container" style={springPropsGrid}>
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

  const renderTable = !isMobile && (
    <animated.div style={springPropsTable}>
      <Box id="selected" paddingTop="30px" width={isMobile ? "50vw" : "112%"}>
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
      {anySelected ? <MacrosTour /> : null}
      <div>
        <Container
          style={
            isMobile
              ? { position: "relative", left: "25vw" }
              : { position: "relative", left: "4vw" }
          }
          maxWidth="lg"
        >
          {renderGrid}
        </Container>
      </div>
    </Box>
  );
};
