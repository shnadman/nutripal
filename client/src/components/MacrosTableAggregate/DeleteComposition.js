import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteComposition } from "../../features/basket";

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
