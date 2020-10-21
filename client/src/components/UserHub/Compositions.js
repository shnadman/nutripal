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
import MacrosLayout from "./MacrosLayout";
import Container from "@material-ui/core/Container";
import ModifyComposition from "../MacrosTableAggregate/ModifyComposition";
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
  const { discardList, compositions } = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const [chosenComposition, setChosenComposition] = useState([]);
  const dynamicSelecting = useSelected([]);

  let isSelected = (id) => chosenComposition._id === id;

  useEffect(() => {
    dispatch(getCompositions());
  }, []);

  return (
    <div>
      <Typography variant="h4" className={classes.text}>
        Your compositions
      </Typography>
      <Container>
        <CompGrid
          renderSelectedComposition={setChosenComposition}
          isSelected={isSelected}
          data={compositions}
        />
      </Container>
      {_.isEmpty(chosenComposition) ? null : (
        <MacrosLayout
          data={chosenComposition.mealIds}
          compositionAction={<ModifyComposition />}
          dynamicSelecting={dynamicSelecting}
        />
      )}
    </div>
  );
};

export default requireAuth(Feature);
