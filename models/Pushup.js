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
        return this.methods.getSum() / this.reps.length;
    }
};

var Pushup = mongoose.model('Pushup', pushUpSchema);
module.exports = Pushup;