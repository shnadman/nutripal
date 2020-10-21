import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CardGrid from "../CardGrid";
import { RemoveAction, StarAction } from "../CardComponents/CardActions";
import MacrosAggTable from "../MacrosTableAggregate/FullTable";
import React, { cloneElement } from "react";
import { useSelected } from "../utils/hooks";

export default ({
  data,
  compositionAction,
  pagination,
  params,
  dynamicSelecting,
}) => {
  const { selected } = dynamicSelecting;
  return (
    <Box display="flex">
      <Container maxWidth="md">
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
      </Container>
      <MacrosAggTable
        rows={selected}
        dynamicSelecting={dynamicSelecting}
        compositionAction={cloneElement(compositionAction, { selected })}
      />
    </Box>
  );
};
