import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Box from "@material-ui/core/Box";

export default ({ handleClickLike, liked, likedBy }) => (
  <Paper>
    <Button
      onMouseDown={(event) => event.stopPropagation()}
      onClick={handleClickLike}
    >
      <Badge
        badgeContent={liked ? likedBy.length + 1 : likedBy.length}
        color="secondary"
      >
        <ThumbUpAltIcon style={liked ? { color: "#288dd4" } : {}} />
      </Badge>
    </Button>
  </Paper>
);
