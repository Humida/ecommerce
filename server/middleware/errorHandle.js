const ResponseError = require('../utils/responseError');

module.exports = (err, req, res, next) => {

    let error = {...err };

    console.log(err);

    error.message = err.message;


    // Error not found
    if (error.name === "CastError") {

        error = new ResponseError(`Not found with id ${req.params.id}`, 400);

    };

    // Error duplicate
    if (error.code === 11000) {

        error = new ResponseError(`Duplicate`, 401);

    }

    // validate with mongoose Model

    res.status(error.status || 500).send({
        success: false,
        message: error.message || 'server error',
    });

}