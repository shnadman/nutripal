import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_STEPS = [
  {
    target: "#selected",
    content:
      "Meet the aggregate table, each meal you select will be added here for macros aggregation. ",
    placement: "top-right",
  },
  {
    target: "#compositions",
    content:
      "In addition you can create a composition from the currently selected meals, and add meals later on! " +
      " You can view your compositions, favorite meals (heart icon on the meal cards) and friends in your basket area under Profile.",
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

const MacrosTour = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (!localStorage.getItem("macTour")) {
      dispatch({ type: "START" });
    }
  }, []);

  const callback = (data) => {
    const { action, index, type, status } = data;

    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      localStorage.setItem("macTour", "done");
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  return (
    <JoyRide
      {...tourState}
      callback={callback}
      disableOverlay
      showSkipButton={true}
      styles={{
        tooltipContainer: {
          textAlign: "left",
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
      locale={{
        last: "Got it",
      }}
    />
  );
};

export default MacrosTour;
