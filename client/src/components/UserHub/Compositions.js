import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompositions } from "../../features/basket";
import background from "../../static/back3.jpg";
import requireAuth from "../auth/requireAuth";
import MacrosLayout from "../MacrosLayout";
import ModifyComposition from "../MacrosTableAggregate/ModifyComposition";
import { useSelected } from "../utils/hooks";

import CompGrid from "./CompGrid";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "100px",
  },
  text: {
    color: "#fff",
  },
  bg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.95),rgba(0,0,0,0.55)), url(${background})`,
    backgroundPosition: "center bottom",
    paddingTop: "80px",
    minHeight: "70vh",
  },
  header: { position: "relative", left: "40vw", paddingBottom: "40px" },
}));

const Feature = ({ compositions }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [chosenComposition, setChosenComposition] = useState([]);
  const dynamicSelecting = useSelected(compositions);

  let isSelected = (id) => chosenComposition._id === id;

  useEffect(() => {
    dispatch(getCompositions());
  }, [dispatch]);

  return (
    <div className={classes.bg}>
      <Typography className={classes.header} variant="h3">
        Compositions
      </Typography>

      {_.isEmpty(compositions) ? (
        <Typography className={classes.header}>
          No compositions created... yet
        </Typography>
      ) : (
        <CompGrid
          className={classes.root}
          renderSelectedComposition={setChosenComposition}
          isSelected={isSelected}
          data={compositions}
        />
      )}
      {_.isEmpty(chosenComposition) ? null : (
        <div style={{ position: "relative", top: "100px" }}>
          <MacrosLayout
            data={chosenComposition.mealIds}
            compositionUpdateAction={<ModifyComposition />}
            dynamicSelecting={dynamicSelecting}
          />
        </div>
      )}
    </div>
  );
};

export default requireAuth(Feature);
