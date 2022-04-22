const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {type: String, required: true, minlength: 1, trim: true},
    password: {type: String, required: true, minlength: 1, trim: true, select: false},
    icon: {type: String, required: true},
    // score: {type: Number, default: 0},
    // raconteur: {type: Boolean, default: false},
    // host: {type: Boolean, default: false},
    // currentSentence: {type: String, default: ". . ."},
    stories: {type: Array, default: []},
    prompts: {type: Array, default: []},
    admin: {type: Boolean, required: true, default: false}
})

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
})

userSchema.statics.findByUsernamePassword = function(username, password) {
    const User = this;

    // Find if user's username exists
    return User.findOne({ username: username }).select('+password')
    .then((user) => {
        if(!user) {
            return Promise.reject('Username does not exist');
        }

        // If username exists, make sure password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    resolve(user);
                }
                else {
                    reject('Password is incorrect');
                }
            })
        })
    })
}


const User = mongoose.model('User', userSchema);

module.exports = { User }