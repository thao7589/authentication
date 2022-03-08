const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 25
    },
    nickname: {
        type: String,
        max: 100
    },
    comment: {
        type: String,
        max: 100
    }
});

module.exports = mongoose.model('User', userSchema);