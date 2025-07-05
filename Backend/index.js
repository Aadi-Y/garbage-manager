const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {handleDatabase} = require("./database/database.js"); 
const authRouter = require("./routes/authRoute");
const garbageRouter = require("./routes/garbageRoute");
const driverRouter = require("./routes/driverRoute");
const areaRouter = require("./routes/areaRoute");

const app = express();

app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/garbage",garbageRouter);
app.use("/api/driver",driverRouter);
app.use("/api/area",areaRouter);


const PORT = process.env.PORT || 8000



app.listen(PORT,()=>{
    console.log("Server is running at the port : ",PORT);
    handleDatabase();
})