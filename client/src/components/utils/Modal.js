import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Login from "../auth/Login";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { useModal } from "./hooks";

export default () => {
  const { open, handleClose, handleClickOpen } = useModal();
  const auth = useSelector((store) => store.auth.authenticated);

  return (
    <Box>
      <Button
        disabled={auth ? true : false}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        <Typography>Login</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        children={<Login onClose={handleClose} />}
      />
    </Box>
  );
};
