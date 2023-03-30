const router = require('express').Router();
const controller = require('../Controllers/api.controller');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./auth');

// function verifyToken (req, res, next) {
//     console.log("Middleware Token");
// }

const postRoutes = {
    '/admin/login': [controller.postAdminLogin],
    '/admin/register': [controller.postRegister],
    '/add-service': [controller.addService]
}

for (const [path, handlers] of Object.entries(postRoutes)) {
    if(path == '/add-service'){
        router.post(path, verifyToken, handlers)
    }else{
        router.post(path, handlers)
    }
}

const getRoutes = {
    '/getAll': [controller.getAllUsers]
}

for (const [path, handlers] of Object.entries(getRoutes)) {
    if(path == '/getAll'){
        router.get(path, verifyToken, handlers)
    }else{
        router.get(path, handlers)
    }
    // router.get(path, handlers);
}

module.exports = router;