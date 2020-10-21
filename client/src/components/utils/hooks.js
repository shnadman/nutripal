import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyBasket, modifyDiscardList } from "../../features/basket";
import _ from "lodash";

export const useToggleOnSearch = (starred, id) => {
  const userId = useSelector((state) => state.auth.userId);
  const starredIds = starred.map((e) => e._id);

  const [on, setOn] = useState(_.includes(starredIds, userId));
  debugger;
  const dispatch = useDispatch();

  const toggle = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setOn(!on);
    dispatch(modifyBasket(id, on));
  };

  return { toggle, on };
};

export const useToggleOnDiscard = (initialOn = false, id) => {
  const [on, setOn] = useState(initialOn);

  const dispatch = useDispatch();

  const toggle = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setOn(!on);
    dispatch(modifyDiscardList({ on, id }));
  };

  return { toggle, on };
};

export const useSelected = (rows) => {
  const [selected, setSelected] = React.useState([]);
  const [totals, setTotals] = useState({
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
  });

  const aggTotals = () => {
    let [protein, fat, carbs, calories] = [0, 0, 0, 0];
    _.forEach(selected, (row) => {
      protein += row.protein;
      fat += row.fat;
      carbs += row.carbs;
      calories += row.calories;
    });
    setTotals({ protein, fat, carbs, calories });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = _.indexOf(selected, row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [row]);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const clearSelected = () => setSelected([]);
  const isSelected = (row) => selected.indexOf(row) !== -1;
  const anySelected = _.isEmpty(selected) ? false : true;

  return {
    totals,
    aggTotals,
    handleClick,
    handleSelectAllClick,
    selected,
    isSelected,
    anySelected,
    clearSelected,
  };
};

export const useModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClose, handleClickOpen };
};

export const useCommentExpander = (comments) => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return { expanded, handleExpandClick };
};
