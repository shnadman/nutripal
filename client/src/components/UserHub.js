import React, { useEffect } from "react";
import requireAuth from "./auth/requireAuth";
import { getHub, modifyBasket, clearDiscardList } from "../features/basket";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import CardGrid from "./CardGrid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { RemoveAction, StarAction } from "./CardComponents/CardActions";
import Button from "@material-ui/core/Button";
import { useSelected, useToggleOnDiscard } from "./utils/hooks";
import MacrosAggTable from "./MacrosTableAggregate/FullTable";
import _ from "lodash";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "40px",
  },
}));

const Feature = () => {
  const classes = useStyles();
  const { basket, discardList } = useSelector((state) => state.basket);
  const dynamicSelecting = useSelected(basket);
  const { selected } = dynamicSelecting;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHub());
  }, []);

  const discard = () => {
    _.forEach(discardList, (mealId) => {
      dispatch(modifyBasket(mealId, true));
    });
    dispatch(clearDiscardList());
    dispatch(getHub());
  };

  return (
    <div>
      <Typography variant="h4" color="primary">
        Your starred meals
      </Typography>
      <Box display="flex">
        <Container maxWidth="md">
          <CardGrid
            data={basket}
            dynamicSelecting={dynamicSelecting}
            curriedCardAction={(id, starred) => (
              expanded,
              handleExpandClick,
              commentsCount
            ) => (
              <RemoveAction
                id={id}
                starred={starred}
                expanded={expanded}
                handleExpandClick={handleExpandClick}
                commentsCount={commentsCount}
              />
            )}
          />
        </Container>
        <MacrosAggTable rows={selected} dynamicSelecting={dynamicSelecting} />
      </Box>
      <Button onClick={discard} variant="contained" color="secondary">
        Discard selected
      </Button>
    </div>
  );
};

export default requireAuth(Feature);
