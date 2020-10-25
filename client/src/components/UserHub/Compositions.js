import React, { useEffect, useState } from "react";
import requireAuth from "../auth/requireAuth";
import {
  getHub,
  modifyBasket,
  getCompositions,
  modifyComposition,
} from "../../features/basket";
import { useSelector, useDispatch } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import CompGrid from "./CompGrid";
import MacrosLayout from "../MacrosLayout";
import Container from "@material-ui/core/Container";
import ModifyComposition from "../MacrosTableAggregate/ModifyComposition";
import { useSelected } from "../utils/hooks";
import UserPanel from "./UserPanel";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "100px",
  },
  text: {
    color: "#fff",
  },
}));

const Feature = () => {
  const classes = useStyles();
  const { compositions } = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const [chosenComposition, setChosenComposition] = useState([]);
  const dynamicSelecting = useSelected([]);

  let isSelected = (id) => chosenComposition._id === id;

  useEffect(() => {
    dispatch(getCompositions());
  }, []);

  return (
    <div>
      <UserPanel />
      <CompGrid
        className={classes.root}
        renderSelectedComposition={setChosenComposition}
        isSelected={isSelected}
        data={compositions}
      />
      {_.isEmpty(chosenComposition) ? null : (
        <MacrosLayout
          data={chosenComposition.mealIds}
          compositionUpdateAction={<ModifyComposition />}
          dynamicSelecting={dynamicSelecting}
        />
      )}
    </div>
  );
};

export default requireAuth(Feature);
