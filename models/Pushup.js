/**
 * Created by olegchuikin on 27/10/16.
 */

var mongoose = require('mongoose');
var pushUpSchema = mongoose.Schema({
    level: Number,
    reps: [Number],
    date: Date
});

pushUpSchema.methods.getSum = function () {
    return this.reps.reduce(function (a, b) {
        return a + b;
    }, 0);
};

pushUpSchema.methods.getAverage = function () {
    if (this.reps.length != 0) {
        return this.getSum() / this.reps.length;
    }
};

pushUpSchema.methods.getProgress = function () {
    return 10 * this.level + this.getLocalProgress();
};

pushUpSchema.methods.getLocalProgress = function () {
    switch (this.level) {
        case 1:
            return this.getSum() / 12;
        case 2:
            return this.getSum() / 9;
        default:
            console.log("Pushup.js: Something went wrong");
    }
};

var Pushup = mongoose.model('Pushup', pushUpSchema);
module.exports = Pushup;