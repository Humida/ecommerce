const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ProductOrderSchema = require("../model/ProductOrder.model").schema;

const UserSchema = new Schema({

    name: {
        type: String,
        maxlenght: [100, 'name can not be more than 100 character'],
        // require: [true, 'please add a name'],
    },
    username: {
        type: String,
        unique: [true, 'this username is already in use']
    },
    password: {
        type: String,
        require: [true, 'please add a password'],
        maxlenght: [100, 'password can not be more than 100 character'],
    },
    avatar: {
        type: String,
        default: "http://placehold.jp/500x500.png",
    },
    email: {
        type: String,
        unique: [true, 'email is use please select order email'],
        require: [true, 'please add a email'],

    },
    phoneNumber: {
        type: String,
        unique: [true, 'phone number is use please choose another phone number'],
    },
    address: {
        type: String,
        // require: [true, 'please add a address'],
        maxlenght: [500, 'address can not be more than 500 character'],
    },
    role: {
        type: String,
        enum: ["user", 'admin'],
        default: "user",
    },

    productsOrder: [ProductOrderSchema],

    deleteSoft: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },

    updateAt: {
        type: Date,
        default: Date.now(),
    },

});

// generate hash password
UserSchema.pre('save', async function(next) {

    console.log(this);

    let salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});

// check password;

UserSchema.methods.matchPassword = async function(password) {

    return await bcrypt.compare(password, this.password);

}


// generate token
UserSchema.methods.getToken = function(req, res, next) {

    return jwt.sign({ id: this._id }, process.env.JWT_SALT);

};

UserSchema.methods.matchToken = async function(token) {

    return jwt.verify(token, process.env.JWT_SALT);


}

const User = mongoose.model("User", UserSchema);
module.exports = User;