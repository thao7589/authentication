const router = require('express').Router();
const verifiedToken = require('./verifyTokent');

router.get('/', verifiedToken, (req, res) => {
    res.json({
        posts: {
            title: 'My first post',
        }
    });
});

module.exports = router;