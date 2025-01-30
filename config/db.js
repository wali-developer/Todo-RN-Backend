require("dotenv").config();
const mongoose = require("mongoose");

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const uri = `mongodb+srv://${user}:${pass}@cluster0.ruehske.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the Database!!!");
  })
  .catch((e) => {
    console.log(e);
  });
