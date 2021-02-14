import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import DeleteComposition from "../MacrosTableAggregate/DeleteComposition";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../features/notifications";
import Notifications from "../UserHub/Notifications";
const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: "rgba(255,255,255,0.15)",
  },
}));

export default () => {
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closePopper = (event) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;

  return (
    <div>
      <Badge
        badgeContent={notifications ? notifications.length : 0}
        color="secondary"
      >
        <IconButton onClick={handleClick}>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <div className={classes.paper}>
                  <Notifications closePopper={closePopper} />
                </div>
              </Fade>
            )}
          </Popper>
          <NotificationsNoneRoundedIcon />
        </IconButton>
      </Badge>
    </div>
  );
};
