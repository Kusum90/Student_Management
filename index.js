const express = require("express");
const errorHandler = require("./middlewear/errorHandler");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");

const app = express();
connectDB();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({message:"get all apis"})
})

app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/notice", require("./routes/noticeRoutes"))
app.use("/api/task",require("./routes/noticeRoutes"))
app.use("/api/assign",require("./routes/noticeRoutes"))
app.use("/api/group",require("./routes/noticeRoutes"))

app.use(errorHandler);

const port= process.env.PORT || 9999;

app.listen(port,() => {
    console.log(`sever running on port ${port}`); 
})