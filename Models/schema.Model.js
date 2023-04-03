const mongoose = require('mongoose');
const validator = require('validator');

exports.Admin = mongoose.model('Admin', {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

exports.User = mongoose.model('User', {
    Date: { type: Date, default: Date.now },
    custName: { type: String, required: true },
    carName: { type: String, required: true },
    carType: { type: String, required: true },
    carNumber: { type: String, required: true },
    carModel: { type: String, required: true },
    additionalService: { type: String, required: true },
    actions: { type: String, required: true },
    emergencyType: { type: String, required: true },
    fuelType: { type: String, required: true },
    serviceType: { type: String, required: true },
    status: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

exports.Mechanic = mongoose.model('Mechanic', {
    mechanicName: { type: String, required: true, minLength: [2, 'Name should contain at least two characters!'], trim: true },
    email: {
        type: String, required: true, unique: true, trim: true, validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String, required: true, trim: true, validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, 'any') && v.length === 10 && /^[6-9]\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    service: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});












