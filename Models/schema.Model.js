const mongoose = require('mongoose');
exports.Admin = mongoose.model('Admin', { 
    username: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now } 
});
exports.User = mongoose.model('User', { 
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












