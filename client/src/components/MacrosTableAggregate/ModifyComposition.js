import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import { useDispatch } from "react-redux";
import { modifyComposition } from "../../features/basket";

export default ({ selected, _id }) => {
  const dispatch = useDispatch();
  const onSubmit = async ({ modifyComposition }) => {
    let mealIds = selected.map((m) => m._id);
    dispatch(modifyComposition(modifyComposition, mealIds, _id));
  };

  return (
    <Box>
      <TextFieldWithButton
        onSubmit={onSubmit}
        icon={<CreateIcon />}
        placeholder={"Modify your composition"}
        buttonText="Submit changes"
        name="modifyComposition"
      />
    </Box>
  );
};
