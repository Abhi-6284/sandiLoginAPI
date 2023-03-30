const root = require('../GraphQL/resolver.Graphql');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

exports.getLogout = async (req, res, next) => {
    req.session.destroy(); // Deletes the session in the database.
    return res.json({ message: "Successfully Logout" })
}

exports.postAdminLogin = async (req, res) => {
    try {
        const adminData = await root.getAdminByPara({ email: req.body.email });
        if (!adminData) { throw new Error("No Admin found!.."); } else {
            const token = jwt.sign({ id: adminData._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
            if (await bcrypt.compare(req.body.password, adminData.password)) {
                // req.session.token = token;
                return res.status(200).json({
                    message: "Admin Logged in successfully 😊 👌",
                    token: token
                });

            } else { throw new Error("Invalid Password"); }
        }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

exports.postRegister = async (req, res) => {
    try {
        if (req.body.password == req.body.confirmPassword) {
            const adminData = await root.getAdminByPara({ email: req.body.email });
            if (!adminData) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const created = await root.createAdmin({ username: req.body.username, email: req.body.email, password: hashedPassword });
                const adminDetail = await root.getAdminByPara({ email: req.body.email });
                if (created) { return res.status(200).json({ message: "Registered successfully 😊 👌\nYou are Welcome " + adminDetail.email }) }
            } else { throw new Error(adminData.email + " is an existing Admin. go to Login Page"); }
        } else { throw new Error("Your Passwords are not Match"); }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

exports.addService = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) { return res.json({ message: "Token Expired..." }); }
        try {

            const created = await root.createUser({
                custName: req.body.custName,
                carName: req.body.carName,
                carType: req.body.carType,
                carNumber: req.body.carNumber,
                carModel: req.body.carModel,
                additionalService: req.body.additionalService,
                actions: req.body.actions,
                emergencyType: req.body.emergencyType,
                fuelType: req.body.fuelType,
                serviceType: req.body.serviceType,
                status: req.body.status,
                totalPrice: req.body.totalPrice,
            });
            if (created) { return res.status(200).json({ message: "Created successfully 😊 👌" }) }
        } catch (e) { return res.status(401).json({ message: e.message }) }
    } catch (e) { return res.status(401).json({ message: e.message }) }

}

exports.getAllUsers = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) { return res.json({ message: "Token Expired..." }); }
        try {
            const services = await root.getUsers({});
            if (services.length > 0) { return res.status(200).json({ message: "All services Data Get Successfully", serviceDetails: services }) } else { throw new Error("No services are there"); }
        } catch (e) { return res.status(403).json({ message: e.message }) }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}