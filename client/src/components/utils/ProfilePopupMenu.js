import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React from "react";
import { useSelector } from "react-redux";
import Signout from "../auth/Signout";

export default function MenuPopupState({ history }) {
  const auth = useSelector((state) => state.auth.authenticated);

  const handleClickProfile = (popupState) => {
    history.push("/api/users/me");
    popupState.close();
  };

  const handleClickEdit = (popupState) => {
    history.push("/api/users/me/edit");
    popupState.close();
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none", fontSize: 17, color: "#ada3d4" }}
            {...bindTrigger(popupState)}
          >
            Profile
            <AccountCircle />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleClickProfile(popupState)}>
              Your basket
            </MenuItem>
            <MenuItem
              disabled={!auth}
              onClick={() => handleClickEdit(popupState)}
            >
              Edit profile
            </MenuItem>
            <MenuItem disabled={!auth} onClick={popupState.close}>
              <Signout />
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
