import Button from "@material-ui/core/Button";

import makeStyles from "@material-ui/core/styles/makeStyles";
import _ from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { modifyBasket } from "../../features/basket";
import background from "../../static/back2.jpg";
import MacrosLayout from "../MacrosLayout";

import CreateComposition from "../MacrosTableAggregate/CreateComposition";
import ModifyComposition from "../MacrosTableAggregate/ModifyComposition";
import { useSelected } from "../utils/hooks";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "40px",
  },
  text: {
    color: "#fff",
  },
  bg: {
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.65),rgba(0,0,0,0.95)), url(${background})`,
    backgroundPosition: "center bottom",
    paddingTop: "80px",
    minHeight: "70vh",
  },
}));

export default ({ basket }) => {
  const classes = useStyles();
  const dynamicSelecting = useSelected(basket);
  const dispatch = useDispatch();
  const { selected, clearSelected } = dynamicSelecting;

  const discard = () => {
    //const mealIds = selected.map(meal=>meal._id);
    _.forEach(selected, (meal) => {
      dispatch(modifyBasket(meal._id, true));
    });
    clearSelected();
  };

  return (
    <div className={classes.bg}>
      <MacrosLayout
        compositionCreateAction={<CreateComposition selected={selected} />}
        compositionUpdateAction={<ModifyComposition selected={selected} />}
        data={basket}
        dynamicSelecting={dynamicSelecting}
      />
      <Button onClick={discard} variant="contained" color="secondary">
        Discard selected
      </Button>
    </div>
  );
};
