const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { authantication } = require("./middleware/auth.middleware");
const { authrouter } = require("./routes/auth.route");
const { noteRouter } = require("./routes/note.router");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("This is the main Page");
});
app.use("/users", authrouter);
app.use(authantication);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("SuccessFull Connected with DB");
  } catch (e) {
    console.log({ e: "Connection Failed With DB" });
  }
});
