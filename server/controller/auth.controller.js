const User = require("../model/User.model");
const asyncHandler = require('../middleware/asyncHandle');
const ErrorResponse = require('../middleware/errorHandle');
const bcrypt = require("bcrypt");
const ResponseError = require("../utils/responseError");


// @desc      register
// @route     post /auth/register
// @access    public

exports.register = asyncHandler(async(req, res, next) => {

    const { username, email, password } = req.body;

    const user = await User.create({
        username: username,
        email: email,
        password: password,
    });

    res.status(200).send({
        success: true,
        user,
    })
})

// @desc      login
// @route     post /auth/login
// @access    public

exports.login = asyncHandler(async(req, res, next) => {

    const { email, password } = req.body;


    const user = await User.findOne({ email: email });

    // match password

    if (!user) {

        next(new ErrorResponse(`Can't not find user with email ${email}`), 404);

    }

    let isMatch = await user.matchPassword(password);

    if (!isMatch) {

        next(new ErrorResponse('Password not match, try again'), 400);

    }

    let token = await user.getToken();


    res.status(200).send({
        sucess: true,
        token: token
    });
});


// @desc      get info
// @route     get /me
// @access    private

exports.me = asyncHandler(async(req, res, next) => {

    // get id user
    const id = req.params.id;

    // find user in database
    const user = await User.findOne({ _id: id });

    if (!user) {

        next(new ResponseError(`user not found with id : ${id}`, 404));

    }

    res.status(200).send({
        success: true,
        user: user,
    })

});


// @desc      get info
// @route     get /me/update
// @access    private

exports.update = asyncHandler(async(req, res, next) => {

    let id = req.params.id;

    const dataUpdate = Object.assign({}, req.body);

    const user = await User.findOneAndUpdate({ _id: id }, dataUpdate);

    if (!user) {

        next(new ResponseError(`can not update because user not fonnd with id : ${id}`), 404);

    }
    user.save();

    res.status(200).send({
        success: true,
        message: 'update complete',
    });

})


// @desc      delete user
// @route     get /admin/detete-user
// @access    private

exports.deteteUser = asyncHandler(async(req, res, next) => {

    let id = req.params.id;

    const user = User.findOneAndDelete({ _id: id });

    res.status(200).send({
        success: true,
        message: 'delete complete',
    })

});