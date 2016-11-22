var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


// POST ROUTERING
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });
});

router.post('/posts', auth, function(req, res, next) {
    var post = new Post(req.body);
    post.author = req.payload.username;
    post.save(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('can\'t find post'));
        }

        req.post = post;
        return next();
    });
});

router.get('/posts/:post', function(req, res, next) {
    req.post.populate('comments', function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.put('/posts/:post/upvote', auth, function(req, res, next) {
    req.post.upvote(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.put('/posts/:post/downvote', auth, function(req, res, next) {
    req.post.downvote(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});
router.post('/posts/:post/comments', auth, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;
    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if (err) {
                return next(err);
            }

            res.json(comment);
        });
    });
});


router.put('/posts/:post', auth, function(req, res) {
    Post.findById(req.post._id, function(err, post) {
        if (err) {
            res.send(err);
        }

        post.title = req.body.title;
        post.link = req.body.link;

        post.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json(post);
        })

    });
});

router.delete('/posts/:post', auth, function(req, res, next) {
    Post.remove({
        _id: req.post._id
    }, function(err, post) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'post deleted'
        });
    });
});


// COMMENT ROUTERING
router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function(err, comment) {
        if (err) {
            return next(err);
        }
        if (!comment) {
            return next(new Error('can\'t find comment'));
        }

        req.comment = comment;
        return next();
    });
});


router.get('/posts/:post/comments', function(req, res, next) {
    Comment.find({
        post: req.post._id
    }, function(err, comments) {
        if (err) {
            return next(err);
        }

        res.json(comments);
    });
});

router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
    req.comment.upvote(function(err, comment) {
        if (err) {
            return next(err);
        }

        res.json(comment);
    });
});

router.put('/posts/:post/comments/:comment/downvote', auth, function(req, res, next) {
    req.comment.downvote(function(err, comment) {
        if (err) {
            return next(err);
        }

        res.json(comment);
    });
});µ


router.delete('/posts/:post/comments/:comment', auth, function(req, res, next) {
    Comment.remove({
        _id: req.comment._id
    }, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'comment deleted'
        });
    });
});



// AUTHENTICATIE ROUTERING
router.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }
    var user = new User();

    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        return res.json({
            token: user.generateJWT()
        })
    });
});

router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.json({
                token: user.generateJWT()
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

//USER ROUTERING

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
router.get('/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return next(err);
        }

        res.json(users);
    });
});

router.get('/users/:user', function(req, res, next) {
    res.json(req.user);
});

router.put('/users/:user', auth, function(req, res) {
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


router.delete('/users/:user',auth, function(req, res, next) {
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
