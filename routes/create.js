var express = require('express');
var router = express.Router();
var service = require('../service');

router.get('/', function(req, res, next) {
    res.render('create');
});

router.post('/create', function(req, res, next) {
    service.createChecklist(req.body, function(err, data) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(data);
        }
    });
});

module.exports = router;