const router = require('express').Router(), controller = require('../Controllers/api.controller');
const jwt = require('jsonwebtoken'), { verifyToken } = require('./auth');

const postRoutes = {
    '/admin/login': [controller.postAdminLogin],
    '/admin/register': [controller.postRegister],
    '/add-service': [controller.addService]
}

for (const [path, handlers] of Object.entries(postRoutes)) {
    if (path == '/admin/login' || path == '/admin/register') {
        router.post(path, handlers)} else {
        router.post(path, verifyToken, handlers)
    }
}

const getRoutes = {'/getAll': [controller.getAllUsers]}

for (const [path, handlers] of Object.entries(getRoutes)) {router.get(path, verifyToken, handlers)}
module.exports = router;