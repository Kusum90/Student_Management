const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader =  req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        console.log(token,"rtcyfgvhbj");
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            console.log(err,"err");
            if (err) {
                return res.status(401).json({message:"user is not authorized"});
            }
            req.user = decoded.user;
            next();
        });
    }
    else{
       return res.status(401).json({message:"token not found"}); 
    }
});

module.exports = validateToken;