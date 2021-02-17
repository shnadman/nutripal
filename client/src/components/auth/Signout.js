import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth";

const Signout = () => {
  const auth = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // history.push("/");
  };

  return (
    <MenuItem onClick={handleLogout} disabled={!auth}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      Sign out
    </MenuItem>
  );
};

export default Signout;
