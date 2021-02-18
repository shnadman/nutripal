import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import EditIcon from "@material-ui/icons/Edit";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React from "react";
import { useSelector } from "react-redux";
import Login from "./auth/Login";
import Signout from "./auth/Signout";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useModal } from "./utils/hooks";

export default function MenuPopupState({ history }) {
  const auth = useSelector((state) => state.auth.authenticated);
  const { open, handleClose, handleClickOpen } = useModal();

  const handleClickProfile = (popupState) => {
    history.push("/api/users/me");
    popupState.close();
  };

  const handleClickSignup = (popupState) => {
    history.push("/signup");
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
          <IconButton
            color="secondary"
            aria-controls="fade-menu"
            aria-haspopup="true"
            {...bindTrigger(popupState)}
          >
            <MenuIcon />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleClickSignup(popupState)}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              Sign up
            </MenuItem>
            <MenuItem disabled={auth} onClick={handleClickOpen}>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              Login
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                children={<Login onClose={handleClose} />}
              />
            </MenuItem>
            <MenuItem onClick={() => handleClickProfile(popupState)}>
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              Your basket
            </MenuItem>
            <MenuItem
              disabled={!auth}
              onClick={() => handleClickEdit(popupState)}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              Edit profile
            </MenuItem>
            <Signout />
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
