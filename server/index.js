import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import replyRoutes from "./routes/replies.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ limit: "5mb" }, { extended: true }));
app.use(express.json({ limit: "5mb" }, { extended: true }));

app.use("/posts", postRoutes);
app.use("/replies", replyRoutes);

const URI = process.env.DB_CONNECTION;
const PORT = process.env.PORT;

mongoose
  .connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => app.listen(PORT, console.log(`Listening on port ${PORT}...`)))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
