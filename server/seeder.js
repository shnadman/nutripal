const fs = require("fs");
const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const { Macros } = require("./models/macros");

mongoose.connect(config.get("db"), {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// Read JSON files
const macros = JSON.parse(
  fs.readFileSync(`${__dirname}/response.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  console.log(macros);
  try {
    _.forEach(macros, (entry) => {
      entry.protein = _.parseInt(entry.protein.replace("g", ""));
    });
    await Macros.create(macros);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Macros.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
