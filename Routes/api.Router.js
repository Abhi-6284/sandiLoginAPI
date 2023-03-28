const router = require('express').Router();
const controller = require('../Controllers/api.controller');

const postRoutes = { 
    // '/login': [controller.postLogin], 
    '/admin/login': [controller.postAdminLogin], 
    '/admin/register': [controller.postRegister],
    '/add-service': [controller.addService] 
}

for (const [path, handlers] of Object.entries(postRoutes)) { 
    router.post(path, handlers) 
}
const getRoutes = { 
    '/logout': [controller.getLogout],
    '/getAll': [controller.getAllUsers]
}

for (const [path, handlers] of Object.entries(getRoutes)) { 
    router.get(path, handlers); 
}

module.exports = router;