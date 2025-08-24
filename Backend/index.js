const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { handleDatabase } = require("./database/database.js");
const authRouter = require("./routes/authRoute");
const garbageRouter = require("./routes/garbageRoute");
const driverRouter = require("./routes/driverRoute");
const areaRouter = require("./routes/areaRoute");
const cors = require("cors");
// const serverless = require("serverless-http");

const app = express();

app.use(express.json());
app.use(cors({
    origin:"*"
}));

app.use("/api/auth", authRouter);
app.use("/api/garbage", garbageRouter);
app.use("/api/driver", driverRouter);
app.use("/api/area", areaRouter);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Garbage Management Sys"
    })
})

const PORT = process.env.PORT || 8000

// handleDatabase()
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.error("DB connection failed", err));

// module.exports = app;

// app.listen(PORT,()=>{
//     console.log("Server is running at the port",PORT);
// })

handleDatabase()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is running at port", PORT);
    });
  })
  .catch((err) => console.error("DB connection failed", err));