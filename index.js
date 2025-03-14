const express = require("express");
const errorHandler = require("./middlewear/errorHandler");
const connectDB = require("./config/dbConnection");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello world!"})
})

app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/notice", require("./routes/noticeRoutes"))
app.use("/api/task",require("./routes/noticeRoutes"))
app.use("/api/assign",require("./routes/noticeRoutes"))
app.use("/api/group",require("./routes/noticeRoutes"))
app.use("/api/profile",require("./routes/noticeRoutes"))
app.use("/api/attendance",require("./routes/noticeRoutes"));
app.use("/api/profile",require("./routes/noticeRoutes"))
app.use("/api",require("./routes/noticeRoutes"))
app.use("/api",require("./routes/noticeRoutes"));
app.use("/api",require("./routes/noticeRoutes"));

app.use(errorHandler);

const port= process.env.PORT||5001;

app.listen(port,() => {
    console.log(`sever running on port ${port}`); 
})