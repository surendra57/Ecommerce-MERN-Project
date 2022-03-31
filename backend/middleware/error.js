const ErrorHandler=require('../utils/errorhandler')


module.exports= (err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal server Error";

    //Wrong MongoDb Id Error
    if (err.name ==="CastError") {
        const message=`Resource not found, Invalid :${err.path}`
        err=new ErrorHandler(message,400)
    }
    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandler(message,400)
    }
    //Wrong JWT Error
    if (err.name ==="JsonwebTokenError") {
        const message=`Json web token is Invalid, try again`;
        err=new ErrorHandler(message,400)
    }
    //JWT Expire Error
    if (err.name ==="TokenExpireError") {
        const message=`Json web token is Expire, try again`;
        err=new ErrorHandler(message,400)
    }
    
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}