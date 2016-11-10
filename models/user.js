var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    id: Number,
    displayName: String,
    profileUrl: String,
    photo: String
});