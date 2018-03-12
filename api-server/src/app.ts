import "reflect-metadata";
import { createExpressServer, useExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";

let express = require("express");
let app = express();

const expressApp = useExpressServer(app, {
  controllers: [__dirname + "/controllers/*.ts"]
});

expressApp.listen(3000, () => {
  console.log(__dirname);
  console.log("Server is up and running at port 3000");
});
