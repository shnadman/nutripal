import React, { useEffect } from "react";
import requireAuth from "../auth/requireAuth";
import { getHub, modifyBasket, clearDiscardList } from "../../features/basket";
import { useSelector, useDispatch } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import MacrosLayout from "./MacrosLayout";

import CreateComposition from "../MacrosTableAggregate/CreateComposition";
import { useSelected } from "../utils/hooks";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "40px",
  },
  text: {
    color: "#fff",
  },
}));

const Feature = () => {
  const classes = useStyles();
  const { basket } = useSelector((state) => state.basket);
  const dynamicSelecting = useSelected(basket);
  const { selected, clearSelected } = dynamicSelecting;
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(getHub()), 20);
  }, []);

  const discard = () => {
    //const mealIds = selected.map(meal=>meal._id);
    _.forEach(selected, (meal) => {
      dispatch(modifyBasket(meal._id, true));
    });
    clearSelected();
  };
  return (
    <div>
      <Typography variant="h5" className={classes.text}>
        Your starred meals
      </Typography>
      <MacrosLayout
        compositionAction={<CreateComposition />}
        data={basket}
        dynamicSelecting={dynamicSelecting}
      />

      <Button onClick={discard} variant="contained" color="secondary">
        Discard selected
      </Button>
    </div>
  );
};

export default requireAuth(Feature);
