import React, { useEffect } from "react";
import requireAuth from "../auth/requireAuth";
import { getHub, modifyBasket, clearDiscardList } from "../../features/basket";
import { useSelector, useDispatch } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import MacrosLayout from "../MacrosLayout";

import CreateComposition from "../MacrosTableAggregate/CreateComposition";
import { useSelected } from "../utils/hooks";
import ModifyComposition from "../MacrosTableAggregate/ModifyComposition";
import MacrosAggTable from "../MacrosTableAggregate/FullTable";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import UserPanel from "./UserPanel";

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
  const { basket, userName } = useSelector((state) => state.basket);
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
      <UserPanel />
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

export default requireAuth(Feature);
