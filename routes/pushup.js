'use strict';

var express = require('express');
var router = express.Router();

var Pushup = require('../models/Pushup');


router.get('/', function (req, res, next) {

    Pushup.find({userId: req.user.id}, function (err, pushups) {
        // console.log("Tiem:", Date.parse(pushups[0].date));
        var context = {};
        context.pushups = pushups.map(function (pushup) {
            return {
                date: pushup.date ? pushup.date.toLocaleDateString() : '',
                level: pushup.level,
                sum: pushup.getSum()
            }
        });

        context.graph = pushups.map(function (pushup) {
            return {
                x: (new Date(pushup.date)).getTime(),
                y: pushup.getProgress()
            }
        });
        context.graph.sort((a, b) => a.x - b.x);

        context.exercises = exercises;

        res.render('pushup', context);
    });
});

router.post('/', function (req, res) {
    console.log("pushup:save new pushup");
    console.log("PUSHUP.POST:" + JSON.stringify(req.body));
    new Pushup({
        userId: req.user.id,
        level: req.body.level,
        reps: req.body.rep,
        date: req.body.date
    }).save();

    res.writeHead(303, {Location: req.headers.referer});
    res.end();
});

module.exports = router;

var exercises = [
    {
        level: 1,
        title: 'Vertical Pulls',
        type: 'set',
        sets: 3,
        pushups: 40
    },
    {
        level: 2,
        title: 'Horizontal Pulls',
        type: 'set',
        sets: 3,
        pushups: 30
    },
    {
        level: 3,
        title: 'Jackknife Pulls',
        type: 'set',
        sets: 3,
        pushups: 20
    },
    {
        level: 4,
        title: 'Half',
        type: 'set',
        sets: 2,
        pushups: 15
    },
    {
        level: 5,
        title: 'Full',
        type: 'set',
        sets: 2,
        pushups: 10
    },
    {
        level: 6,
        title: 'Close',
        type: 'set',
        sets: 2,
        pushups: 10
    },
    {
        level: 7,
        title: 'Uneven',
        type: 'set',
        sets: 2,
        pushups: 9
    },
    {
        level: 8,
        title: 'Half One-Arm',
        type: 'set',
        sets: 2,
        pushups: 8
    },
    {
        level: 9,
        title: 'Assisted',
        type: 'set',
        sets: 2,
        pushups: 7
    },
    {
        level: 10,
        title: 'One-Arm Pull-Up',
        type: 'set',
        sets: 2,
        pushups: 6
    },
];