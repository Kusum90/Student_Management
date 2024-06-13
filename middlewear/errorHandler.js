const {constants} = require("../constants");
const errorHandler =(err, req,res, next) =>
{
const statuscode = res.statuscode ? res.statuscode:500;

switch(statuscode){
    case constants.VALIDATION_ERROR:
        res.json({
            title:"validation failed",
            message:err.message,
            stacktrace:err.stack
        });
        break;
        case constants.NOT_FOUND:
            res.json({
                title:"not found",
                message:err.message,
                stacktrace:err.stack
            });
            case constants.UNAUTHORISED:
            res.json({
                title:"unauthorised",
                message:err.message,
                stacktrace:err.stack
            });
            case constants.FORBIDEN:
            res.json({
                title:"FORBIDEN",
                message:err.message,
                stacktrace:err.stack
            });
            case constants.SERVER_ERROR:
            res.json({
                title:"SERVER ERROR",
                message:err.message,
                stacktrace:err.stack
            });
            default:
                console.log("NO ERROR,ALL GOOD!");
                break;
}

};

module.exports = errorHandler;