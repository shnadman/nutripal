const fs = require("fs");
const csv = require("csvtojson");
const streamToMongoDB = require("stream-to-mongo-db").streamToMongoDB;
const config = require("config");
const { Macros } = require("./models/macros");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect(config.get("db"), {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const csvFile = "./data/sample.csv";
const dbURL = config.get("db");
const collection = "macros";

// where the data will end up
const outputDBConfig = { dbURL, collection };

// create the writable stream
const writableStream = streamToMongoDB(outputDBConfig);

//fs.createReadStream(csvFile).pipe(csv()).pipe(streamToMongoDB(outputDBConfig));
const normalize = (field) => {
  const res = _.parseInt(field);
  return _.isNaN(res) ? 0 : res;
};

// Import into DB
const importData = async () => {
  try {
    let macros = await csv().fromFile(csvFile);
    _.forEach(macros, (entry) => {
      entry.protein = normalize(entry.protein);
      entry.carbs = normalize(entry.carbs);
      entry.fat = normalize(entry.fat);
      entry.calories = normalize(entry.calories);
      entry.servingSize === ""
        ? (entry.servingSize = 1)
        : (entry.servingSize = _.parseInt(entry.servingSize));
    });
    console.log(macros);
    const test = await Macros.create(macros);
    console.log(test);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

importData();

//.pipe(streamToMongoDB(outputDBConfig));
