'use strict';

var mongoose = require('mongoose');
var pushUpSchema = mongoose.Schema({
    userId: String,
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
    let sum = this.getSum();
    switch (this.level) {
        case 1:
            return sum / 12;
        case 2:
            return sum / 9;
        case 3:
            return sum / 6;
        case 4:
            return sum / 3;
        case 5:
            return sum / 2;
        case 6:
            return sum / 2;
        case 7:
            return sum / 1.8;
        case 8:
            return sum / 1.6;
        case 9:
            return sum / 1.4;
        case 10:
            return sum / 1.2;
        default:
            console.log("Pushup.js: Something went wrong");
    }
};

var Pushup = mongoose.model('Pushup', pushUpSchema);
module.exports = Pushup;