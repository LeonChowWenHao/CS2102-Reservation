var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('customerSignup', { title: 'Sign up' });
});

module.exports = router;
