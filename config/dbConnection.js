const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_URl);
        console.log("connection succcessful",
        connect.connection.host,
        connect.connection.name
        )
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectDB;