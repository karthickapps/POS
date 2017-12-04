const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes");

let port = process.env.PORT || 8000;
let app = express();
let router = express.Router();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use(routes);

// server
app.listen(port, () => {
  console.log("listening on port: ", port);
});