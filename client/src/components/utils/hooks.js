import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersApi from "../../api/users";
import {
  getCompositions,
  getHub,
  modifyBasket,
  modifyDiscardList,
} from "../../features/basket";
import { getNotifications } from "../../features/notifications";

export const useToggleOnSearch = (starred, id) => {
  const userId = useSelector((state) => state.auth.userId);
  const starredIds = starred.map((e) => e._id);
  const [on, setOn] = useState(_.includes(starredIds, userId));
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

export const useSelected = (rows, initializeWithData = false) => {
  const initialState = initializeWithData ? rows : [];

  const [selected, setSelected] = React.useState(initialState);
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
    //[{ ...row, qty: 1 }]

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

export const useCompositions = () => {
  const dispatch = useDispatch();
  const { compositions } = useSelector((state) => state.basket);
  const auth = useSelector((state) => state.auth.authenticated);
  const [chosenComposition, setChosenComposition] = useState([]);
  let isSelected = (id) => chosenComposition._id === id;

  useEffect(() => {
    auth && dispatch(getCompositions());
  }, [dispatch, auth]);

  return { compositions, setChosenComposition, isSelected };
};

export const useAdvancedSearch = () => {
  const [sortBy, setSortBy] = React.useState("calories");
  const [ascending, setAscending] = React.useState(true);
  const [branded, setBranded] = React.useState(true);
  const [category, setCategory] = React.useState("");

  return {
    sortBy,
    setSortBy,
    ascending,
    setAscending,
    branded,
    setBranded,
    category,
    setCategory,
  };
};
export const useUsersSearch = () => {
  const [users, setUsers] = React.useState([]);

  const searchForUsers = async (userName) => {
    const res = await usersApi.get(`/${userName}`);

    setUsers(res.data);
  };

  return { searchForUsers, users };
};

export const useFriendStarredMeals = () => {
  const { friendsBasket } = useSelector((state) => state.friendsBasket);
  const basket = friendsBasket;
  const dynamicSelecting = useSelected(friendsBasket);
  const { selected, clearSelected } = dynamicSelecting;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => dispatch(getFriendsHub()), 20);
  // }, []);

  const discard = () => {
    //const mealIds = selected.map(meal=>meal._id);
    _.forEach(selected, (meal) => {
      dispatch(modifyBasket(meal._id, true));
    });
    clearSelected();
  };

  return { discard, basket, dynamicSelecting, selected, clearSelected };
};

export const useSelfData = () => {
  const { basket, userName, compositions, friends, avatar } = useSelector(
    (state) => state.basket
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHub());
    dispatch(getNotifications());
  }, [dispatch]);

  return { basket, userName, compositions, friends, avatar };
};

export const useFriendsData = () => {
  const { basket, userName, compositions, friends, avatar } = useSelector(
    (state) => state.friendsBasket
  );

  useEffect(() => {}, []);

  return { basket, userName, compositions, friends, avatar };
};
