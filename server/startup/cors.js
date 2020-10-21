const cors = require("cors");
require("express");

module.exports = function (app) {
  app.use(
    cors({
      exposedHeaders: ["x-auth-token", "x-user-id"],
    })
  );
};
