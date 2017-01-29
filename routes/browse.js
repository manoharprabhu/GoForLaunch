var express = require('express');
var router = express.Router();
var service = require('../service');

router.get('/', function(req, res, next) {
    res.render('browse');
});

router.get('/getChecklists', function(req, res, next) {
    console.log(req.query);
    service.getChecklists(req.query.q, function(err, docs) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(docs);
        }
    })
});

module.exports = router;