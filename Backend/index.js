const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { handleDatabase } = require("./database/database.js");
const authRouter = require("./routes/authRoute");
const garbageRouter = require("./routes/garbageRoute");
const driverRouter = require("./routes/driverRoute");
const areaRouter = require("./routes/areaRoute");
const cors = require("cors");
const generateId = require("./helper/generateID");
const id = generateId();

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

handleDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(id);
        });
    })
    .catch((err) => {
        console.error("Server not started due to DB error");
        process.exit(1);
    });