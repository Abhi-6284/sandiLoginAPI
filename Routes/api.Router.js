const router = require('express').Router();
const controller = require('../Controllers/api.controller');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./auth');
const { check } = require('express-validator');

const postRoutes = {
    '/v1/register': [controller.postRegister],
    '/v1/login': [controller.postAdminLogin],
}

for (const [path, handlers] of Object.entries(postRoutes)) {
    if (path == '/v1/login'|| path == '/v1/login' || path == '/v1/register') {
        router.post(path, handlers)
    } else {
        router.post(path, verifyToken, handlers)
    }
}

const getRoutes = {
    // '/v1/getAdmin': [controller.getAdminAll],
    // '/v1/getAll': [controller.getUser],
    // '/v1/update': [controller.getUpdate],
}

for (const [path, handlers] of Object.entries(getRoutes)) { router.get(path, verifyToken, handlers) }

module.exports = router;