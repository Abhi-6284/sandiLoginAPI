const mongoose = require('mongoose');
const validator = require('validator');

const _vehicleReg = new RegExp(/^[A-Z]{2}\d{2}[A-Z]{2,3}\d{4}$/);
const _emailReg = new RegExp(/^[6-9]\d{9}$/);
const _isAlphaReg = new RegExp(/^[a-zA-Z ]+$/);
const _isDigitReg = new RegExp(/^\d+$/);

const User = mongoose.model('User', {
    fullName: {
        type: String, required: true, minLength: [2, 'Name should contain at least two characters!'], trim: true, validate: {
            validator: (v) => {
                return v.length > 2 && _isAlphaReg.test(v);
            },
            message: props => `${props.value} is not a valid Name!`
        }
    },
    email: {
        type: String, required: true, unique: true, trim: true, validate: {
            validator: (v) => {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    role: {
        type: String, required: true, trim: true,
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


module.exports = { User }









