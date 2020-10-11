import React, { Component } from "react";
import requireAuth from "./auth/requireAuth";

const Feature = () => {
  return <div>My crib ya'll</div>;
};

export default requireAuth(Feature);
