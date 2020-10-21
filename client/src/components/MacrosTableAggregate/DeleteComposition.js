import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import { useDispatch } from "react-redux";
import { deleteComposition } from "../../features/basket";
import IconButton from "@material-ui/core/IconButton";

export default ({ _id }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteComposition(_id));
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
