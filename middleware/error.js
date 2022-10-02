const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    console.log(err);

    // Mongoose bad ObjectId
    if (err.kind === 'ObjectId') {
        const message = `Bootcamp not found with id: ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value entered.";
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    // if (err.name === 'ValidatorError') {
    //     const message = `${err.path} is a required field`;
    //     error = new ErrorResponse(message, 400);
    // }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server error"
    });
}

module.exports = errorHandler;