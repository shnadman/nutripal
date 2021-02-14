import React, { useEffect, useState } from "react";
import requireAuth from "../auth/requireAuth";
import { getCompositions } from "../../features/basket";
import { useSelector, useDispatch } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import CompGrid from "./CompGrid";
import MacrosLayout from "../MacrosLayout";
import Container from "@material-ui/core/Container";
import ModifyComposition from "../MacrosTableAggregate/ModifyComposition";
import { useSelected } from "../utils/hooks";
import UserHub from "../Crapy";
import background from "../../static/back3.jpg";

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
}));

const Feature = ({ compositions }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [chosenComposition, setChosenComposition] = useState([]);
  const dynamicSelecting = useSelected(compositions);

  let isSelected = (id) => chosenComposition._id === id;

  useEffect(() => {
    dispatch(getCompositions());
  }, []);

  return (
    <div className={classes.bg}>
      <CompGrid
        className={classes.root}
        renderSelectedComposition={setChosenComposition}
        isSelected={isSelected}
        data={compositions}
      />
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
