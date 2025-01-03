import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello ! World ");
});

//  MongoDB Connection

const MongoConnect = process.env.MONGO_URI;
mongoose
  .connect(MongoConnect)
  .then(() => {
    console.log(`MongoDb Conencted Sucessfully!`);
    app.listen(PORT, () => {
      console.log(`App is listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", route);
