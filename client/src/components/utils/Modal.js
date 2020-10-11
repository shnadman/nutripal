import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Login from "../auth/Login";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

export default () => {
  const [open, setOpen] = React.useState(false);
  const auth = useSelector((store) => store.auth.authenticated);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      >
        <Login onClose={handleClose} />
      </Dialog>
    </Box>
  );
};
