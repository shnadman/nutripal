import React from "react";
import Button from "@material-ui/core/Button";
import { logout } from "../../features/auth";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Signout = () => {
  const auth = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(logout())}
      variant="contained"
      color="secondary"
      startIcon={<ExitToAppIcon />}
      disabled={!auth}
    >
      Sign out
    </Button>
  );
};

export default Signout;
