import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import { useDispatch } from "react-redux";
import { deleteComposition } from "../../features/basket";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

export default ({ _id, closePopper }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteComposition(_id));
  };

  return (
    <Box>
      <Typography>Are you sure?</Typography>
      <Button onClick={handleClick}>Delete</Button>
      <Button onClick={closePopper}>Changed my mind</Button>
    </Box>
  );
};
