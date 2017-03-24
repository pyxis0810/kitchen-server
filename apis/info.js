var express = require('express');
var router = express.Router();
var InfoModel = require('../models/info');
var config = require('../config');

var googleMapsClient = require('@google/maps').createClient({
    key: config.googleMap.apiKey
});

router.get('/', function(req, res, next) {
    InfoModel.findOne().sort({ created_at: -1 }).exec(function(err, info) {
        if (err) { return next(err); }

        var address = info.address;

        googleMapsClient.geocode({
            address: address
        }, function(err, response) {
            if (!err) {
                var location = response.json.results[0].geometry.location;
                info.location = location;
                res.json({
                    address: info.address,
                    location: location
                });
            }
        });
    });
});

router.post('/', function(req, res, next) {
    var Info = new InfoModel({
       address: '서울시 강남구 논현로 662'
    });

    Info.save(function(err, info) {
        if (err) { return next(err); }

        res.json(info);
    });
});

module.exports = router;