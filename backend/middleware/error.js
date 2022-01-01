const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong  mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    }

    // wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web token is Invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
