const router = require('express').Router();
const crypto = require('crypto');
const controller = require('../Controllers/api.controller');
const jwt = require('jsonwebtoken');


// Generate a public/private key pair
const privateKey = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
}).privateKey;

// console.log(privateKey);

// Endpoint for generating ADPTs
// router.post('/token', (req, res) => {
//     const payload = { authorized: ['user1', 'user2'], data: 'protected data' };
//     const options = { expiresIn: '1h' };
//     const token = jwt.sign(payload, privateKey, options);
//     console.log(token);
//     res.json({ token });
// });
// Middleware for validating ADPTs

// function authMiddleware(req, res, next) {
//     console.log(req.headers);
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, publicKey, (err, decoded) => {
//         if (err) return res.status(401).json({ message: 'Invalid token' });
//         console.log(decoded);
//         req.user = decoded;
//         next();
//     });
// }

const postRoutes = {
    // '/login': [controller.postLogin], 
    '/admin/login': [controller.postAdminLogin],
    '/admin/register': [controller.postRegister],
    '/add-service': [controller.addService],
    // Endpoint for generating ADPTs
    '/token': [controller.postToken],
}

for (const [path, handlers] of Object.entries(postRoutes)) {
    router.post(path, handlers)
}

const getRoutes = {
    '/logout': [controller.getLogout],
    '/getAll': [controller.getAllUsers]
}

for (const [path, handlers] of Object.entries(getRoutes)) {
    // if(path == '/getAll') {
    //     router.get(path, authMiddleware, handlers);
    // }else{
        router.get(path, handlers);
    // }
}

module.exports = router;