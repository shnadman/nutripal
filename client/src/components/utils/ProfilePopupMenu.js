import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import Signout from "../auth/Signout";

export default function MenuPopupState({ history }) {
  const auth = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

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
            style={{ textTransform: "none" }}
            {...bindTrigger(popupState)}
          >
            Profile
            <AccountCircle />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleClickProfile(popupState)}>
              Your basket
            </MenuItem>
            <MenuItem onClick={() => handleClickEdit(popupState)}>
              Edit profile
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Signout />
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
