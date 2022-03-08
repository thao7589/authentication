const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { send } = require('express/lib/response');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { signupValidation, loginValidation, updateValidation } = require('../validation');
const verifiedToken = require('./verifyTokent');

//Sign Up
router.post('/signup', async (req, res) => {

    //Check validation
    const { error } = signupValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    //Check if user is already exist
    const userExist = await User.findOne({user_id: req.body.user_id});
    if (userExist) {
        res.status(400).send({
            "message": "Account creation failed",
            "cause": "already same user_id is used"
        });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        user_id: req.body.user_id,
        password: hashPassword,
        nickname: req.body.nickname,
        comment: req.body.comment
    });

    try {
        const savedUser = await user.save();
        res.status(200).send({
            "message": "Account successfully created",
            "user": {
                "user_id": user.user_id,
                "nickname": user.nickname
            }
        });
    } catch (err) {
        res.status(400).send({
                "message": "Account creation failed",
                "cause": "required user_id and password"
            });
    }
});

//Login
router.post('/login', async (req, res) => {

    //Check validation
    const { error } = loginValidation(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
    }

    //Check if user is exist
    const user = await User.findOne({user_id: req.body.user_id})
    if (!user) {
        res.status(400).send('Name is not found!');
    }

    //Check if pass is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        res.status(400).send('Password is wrong!');
    }

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    res.send('Logged in!');
});

//Get user
router.get('/:user_id', verifiedToken, async (req, res) => {
    
    const { user_id } = req.params;
    //Check if user is exist
    const user = await User.findOne({user_id: user_id})
    if (!user) {
        res.status(404).send('No user found!');
    }
    
    res.status(200).send({
        "message": "User details by user_id",
        "user": {
            "user_id": user.user_id,
            "nickname": user.nickname == ''? user.user_id : user.nickname,
            "comment": user.comment
        }
    })
});

router.patch('/:user_id', verifiedToken, async (req, res) => {

    const { user_id } = req.params;
    
    //Check your current user
    const currentUser = await User.findOne({_id: req.user._id});

     //Check validation
     const { error } = updateValidation(req.body);
     if (error) {
         res.status(400).send(error.details[0].message);
     }

     //Check if nickname is empty
     if (req.body.nickname == '' || req.body.nickname == undefined) {
         nickname = user_id;
     } else {
         nickname = req.body.nickname;
     }

     //Check if user is exist
    const user = await User.findOne({user_id: user_id})
    if (!user) {
        res.status(404).send('No user found!');
    }

    //Check if neither nickname or comment is selected
    if (req.body.nickname == "" || req.body.comment == "") {
        res.status(400).send({
            "message": "User updation failed",
            "cause": "required nickname or comment"
        });
    }

    //Check if trying to change user_id or password
    if (req.body.user_id !== undefined || req.body.password !== undefined) {
        res.status(400).send({
            "message": "User updation failed",
            "cause": "not updatable user_id and password"
        });
    }

    //Check if user id was authorized by a different user
    if (user_id !== currentUser.user_id) {
        res.status(403).send({
            "message": "No Permission for Update"
        })
    }
    
    //Update user
    User.findOneAndUpdate({ user_id }, { 
        nickname: nickname, 
        comment: req.body.comment }, 
        { new: true }
    ).then(user => {
        return res.send({
            "message": "User successfully updated",
            "recipe": {
                nickname: user.nickname,
                comment: user.comment
            }
        });
    });
});

router.post('/close',verifiedToken, (req, res) => {
    const user_id = req.body.user_id;

    //Check validation
    const { error } = updateValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    User.findOneAndRemove({ user_id }, function () {
        return res.send({
            "message": "Account and user successfully removed"
        });
    });
});

module.exports = router;