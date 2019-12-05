var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true }
})

var FeedBackModel = mongoose.model('profile', Schema);
module.exports = FeedBackModel;