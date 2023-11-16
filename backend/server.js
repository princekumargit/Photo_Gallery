const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UploadRoute = require("./routes/uploadroute");
const routerAuth = require("./routes/authentication");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

const usermongo = process.env.USER_NAME;
const password = process.env.PASSWORD;
const MONGO_URI = `mongodb+srv://${usermongo}:${password}@photogallerydb.8jacqdo.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(UploadRoute);
app.use(routerAuth);

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
