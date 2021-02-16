import Badge from "@material-ui/core/Badge";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import React, { useEffect } from "react";
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
  }, [dispatch]);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closePopper = () => {
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
        <IconButton
          id="notifications"
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
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
