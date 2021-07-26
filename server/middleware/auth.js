const ResponseError = require('../utils/responseError');
const asyncHandler = require('../middleware/asyncHandle');
const User = require('../model/User.model');
const jwt = require('jsonwebtoken');





exports.protect = async(req, res, next) => {

    let token = req.headers.authorization.split(' ')[1];

    const id = jwt.verify(token, process.env.JWT_SALT).id;

    const user = await User.findOne({ _id: id });

    req.user = user;

    next();

};



exports.authorization = async(req, res, next) => {


};