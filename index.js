import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";
import cors from "cors";


const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use(cors({
  origin:"*"
}));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendStatus(200).send("hello ! World ");
});

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
