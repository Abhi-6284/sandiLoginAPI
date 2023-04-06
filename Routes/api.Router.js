const router = require('express').Router(), controller = require('../Controllers/api.controller');
const jwt = require('jsonwebtoken'), { verifyToken } = require('./auth');
const { check } = require('express-validator');

const postRoutes = {
    '/admin/login': [controller.postAdminLogin],
    '/admin/register': [controller.postRegister],
    '/add-service': [controller.addService],
    '/admin/add-mechanic': [ controller.addMechanic ],
    '/admin/delete' : [controller.dataDelete],
    '/admin/update': [controller.postUpdate]
}

for (const [path, handlers] of Object.entries(postRoutes)) {
    if (path == '/admin/login' || path == '/admin/register') {
        router.post(path, handlers)
    } else {
        router.post(path, verifyToken, handlers)
    }
}

const getRoutes = {
    '/getAll': [controller.getServices],
    '/admin/get-mechanic': [controller.getMechanics],
    '/admin/update': [controller.getUpdate],
}

for (const [path, handlers] of Object.entries(getRoutes)) { router.get(path, verifyToken, handlers) }

module.exports = router;