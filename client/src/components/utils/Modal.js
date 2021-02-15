import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";
import Login from "../auth/Login";
import { useModal } from "./hooks";

export default () => {
  const { open, handleClose, handleClickOpen } = useModal();
  const auth = useSelector((store) => store.auth.authenticated);

  return (
    <Box>
      <Button
        disabled={auth ? true : false}
        variant="text"
        color="primary"
        onClick={handleClickOpen}
        style={{ textTransform: "none" }}
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
