const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { dbEngine } = require("../test/helpers");

const { resetData } = dbEngine;

try {
  if (process.env.NODE_ENV !== "test") {
    resetData();
  }
} catch (err) {
  console.log("Error\n", err);
}

const port = process.env.PORT || 8000;
const app = express();

// middlewares
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  morgan("dev", {
    // eslint-disable-next-line
    skip: (req, res) => {
      return process.env.NODE_ENV === "test";
    }
  })
);

// routes
app.use(routes);

// server
app.listen(port, () => {
  console.log("listening on port: ", port);
});

module.exports = app;
