import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Box from "@material-ui/core/Box";
import macrosApi from "../../api/macros";
import { useSelector } from "react-redux";

export default ({ id }) => {
  const [liked, setLiked] = useState(false);
  const [likedBy, setLikedBy] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await macrosApi.get(`/comments/${id}/like`);
        const userLiked = response.data.includes(userId);
        setLiked(userLiked);
        setLikedBy(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  const handleClickLike = async (event) => {
    event.preventDefault();
    const res = await macrosApi.put(`/comments/${id}/like`);
    setLiked(res.data.currLike);
  };

  return (
    <Paper
      style={{
        borderRadius: 12,
        width: "40px",
        height: "50px",
        position: "relative",
        zIndex: "2",
        bottom: "-17px",
        left: "120px",
        display: "flex",
        justifyContent: "center",
      }}
    >
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
};
