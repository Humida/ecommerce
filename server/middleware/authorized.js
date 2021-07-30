const ResponseError = require('../utils/responseError');
const asyncHandler = require('../middleware/asyncHandle');

exports.authorized = asyncHandler(async(req, res, next) => {

    if (req.user.role !== "admin") {
        return next(new ResponseError('not authorized', 401));
    }
    next();
});