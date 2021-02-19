import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ShareIcon style={{ color: "#ddcccc" }} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <EmailShareButton url={"Can't-really-share@noshare.com"}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FacebookShareButton>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
};
