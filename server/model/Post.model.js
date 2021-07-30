const mongoose = require('mongoose');
const User = require('../model/User.model');
const Product = require('../model/Product.model');


const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        maxlength: [100, 'title can not be more than 100 character'],
    },
    desc: {
        type: String,
        require: [true, 'please add a description'],
    },
    content: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    Product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
    }

})

module.exports = mongoose.model('Post', postSchema);