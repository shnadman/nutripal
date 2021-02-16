import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_STEPS = [
  {
    target: "#starttour",
    content:
      "Thank god it's impossible to resist clicking a blinking red button. Welcome to NutriPal! Iv'e arranged a quick tour to get you going.",
  },
  {
    target: "#nutripal",
    content: "Clicking on the logo will take you back to the search page.",
  },
  {
    target: "#searchname",
    content: "Here you can search by name, the good ol' fashioned way.",
    disableBeacon: true,
  },

  {
    target: "#facet",
    content:
      "Or, discover new meals that fit to YOUR nutrition needs by setting the macros to your liking. The results will be the intersection of the macros you've set.",
  },
  {
    target: "#searchbtn",
    content:
      "Click this search button to get the results (seperate from the searching by name button).",
  },
  {
    target: "#filters",
    content: "Why stop there? Filter and sort to narrow down the results.",
  },
  {
    target: "#sort",
    content:
      "Sort the results by the selected nutrition type, from highest to lowest and vice versa.",
  },
  {
    target: "#profile",
    content:
      "From this menu you can edit your profile and most importantly access your 'Basket', where you can see all of your favorite meals, compositions (more on that later) you've created and also check out your friends' basket!",
  },
  {
    target: "#notifications",
    content:
      "Speaking of friends, friend requests you've received will be shown here.",
  },
  {
    target: "#signup",
    content:
      "To use all this cool stuff you'll need to create a profile first." +
      " Before proceeding please take a few seconds to sign up, the mail doesn't have to be real ;)",
  },
];

const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

const Tour = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      dispatch({ type: "START" });
    }
    return () => {
      localStorage.setItem("tour", "done");
    };
  }, []);

  const callback = (data) => {
    const { action, index, type, status } = data;

    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  return (
    <>
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        debug
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "Sure, I'm off to create an account!",
        }}
      />
    </>
  );
};

export default Tour;
