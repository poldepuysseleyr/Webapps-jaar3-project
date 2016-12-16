var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});


router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('can\'t find user'));
        }

        req.user = user;
        return next();
    });
});
router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return next(err);
        }

        res.json(users);
    });
});

router.get('/:user', function(req, res, next) {
    res.json(req.user);
});

router.put('/:user', auth, function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            res.send(err);
        }

        user.username = req.body.username;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.birthday = req.body.birthday;
        user.address = req.body.address;

        user.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })

    });
});


router.delete('/:user', auth, function(req, res, next) {

    User.remove({
        _id: req.user._id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'User deleted'
        });
    });
});


module.exports = router;
