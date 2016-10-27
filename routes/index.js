var express = require('express');
var router = express.Router();

var Pushup = require('../models/Pushup');

/* GET home page. */
router.get('/', function (req, res, next) {

    Pushup.find(function (err, pushups) {
        // console.log("Tiem:", Date.parse(pushups[0].date));
        var context = {};
        context.pushups = pushups.map(function (pushup) {
            return {
                date: pushup.date,
                level: pushup.level,
                sum: pushup.getSum()
            }
        });

        context.graph = JSON.stringify(pushups.map(function (pushup) {
            return {
                x: (new Date(pushup.date)).getTime(),
                y: pushup.getProgress()
            }
        }));

        res.render('index', context);
    });
});

router.post('/progress', function (req, res) {
    new Pushup({
        level: req.body.level,
        reps: [req.body.rep1, req.body.rep2, req.body.rep3],
        date: req.body.date
    }).save();
});

module.exports = router;