var service = (function() {
    'use strict';
    var Datastore = require('nedb');
    var db = new Datastore({ filename: 'database', autoload: true });

    RegExp.escape = function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var createChecklist = function(data, callback) {
        db.insert(data, function(err, docs) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    }

    var getChecklists = function(data, callback) {
        db.find({ $or: [{ name: new RegExp(RegExp.escape(data)) }, { description: new RegExp(RegExp.escape(data)) }] }, function(err, docs) {
            if (err) {
                callback(err);
            } else {
                callback(null, docs);
            }
        });
    }

    return {
        createChecklist,
        getChecklists
    }
}());

module.exports = service;