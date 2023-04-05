const root = require('../GraphQL/resolver.Graphql');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

exports.postAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const adminData = await root.getAdminByPara({ email });
        if (!adminData) { throw new Error("No Admin found!.."); } else {
            const token = jwt.sign({ id: adminData._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
            if (await bcrypt.compare(password, adminData.password)) {
                jwt.sign({ id: adminData._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN }, async (err, result) => {
                    if (!err) {
                        await root.createLogCredential({ token: result });
                    }
                })
                return res.status(200).json({
                    message: "Admin Logged in successfully 😊 👌",
                    token: token
                });

            } else { throw new Error("Invalid Password"); }
        }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

exports.postRegister = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        if (password == confirmPassword) {
            const adminData = await root.getAdminByPara({ email: email });
            if (!adminData) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const created = await root.createAdmin({ username, email, password: hashedPassword });
                const adminDetails = await root.getAdminByPara({ email });
                if (created) { return res.status(200).json({ message: "Registered successfully 😊 👌\nYou are Welcome " + adminDetails.email }) }
            } else { throw new Error(adminData.email + " is an existing Admin. go to Login Page"); }
        } else { throw new Error("Your Passwords are not Match"); }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

exports.addService = async (req, res) => {
    const { custName, carName, carType, carNumber, carModel, additionalService, actions, emergencyType, fuelType, serviceType, status, totalPrice } = req.body;
    try {
        const created = await root.createService({ custName, carName, carType, carNumber, carModel, additionalService, actions, emergencyType, fuelType, serviceType, status, totalPrice });
        if (created) { return res.status(200).json({ message: "Created successfully 😊 👌" }) }
    } catch (e) { return res.status(401).json({ message: e.message }) }

}

exports.getServices = async (req, res) => {
    try {
        const services = await root.getServices({});
        if (services.length > 0) { return res.status(200).json({ message: "All services Data Get Successfully", serviceDetails: services }) } else { return res.status(200).json({ message: "No Services Data is Available" }) }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

exports.dataDelete = async (req, res) => {
    try {
        const { formName, id } = req.body;
        // console.log(req.body);
        switch (formName) {
            case 'service':
                const serviceData = await root.getServiceById({ id });
                if (!serviceData) {
                    res.status(404).json({ message: "Service Not Found" })
                } else {
                    const service = await root.deleteServiceById({ id });
                    if (service) {
                        res.status(200).json({ message: serviceData.custName + " Service of " + serviceData.carName + " has been deleted." })
                    } else {
                        res.status(404).json({ message: serviceData.custName + " Service of " + serviceData.carName + " has been fail to Deleted." })
                    }
                }
                break;

            case 'mechanic':
                const mechanicData = await root.getMechanicById({ id });
                if (!mechanicData) {
                    res.status(404).json({ message: "Mechanic Not Found" })
                } else {
                    const mechanic = await root.deleteMechanicById({ id });
                    if (mechanic) {
                        res.status(200).json({ message: mechanicData.mechanicName + " has been deleted." })
                    } else {
                        res.status(404).json({ message: mechanicData.mechanicName + " has been Fail to Delete." })
                    }
                }
                break;

            default:
                res.status(404).json({ message: "Unable to delete service" })
                break;
        }
        // const services = await root.deleteServiceById(req.params.id);
        // console.log(services);
    } catch (error) {

    }
}

// Add Mechanic

exports.addMechanic = async (req, res) => {
    const { mechanicName, email, phone, service } = req.body;
    try {
        const MechanicData = await root.getMechanicByPara({ email: req.body.email });
        if (!MechanicData) {
            const created = await root.createMechanic({ mechanicName, email, phone, service });
            if (created) { return res.status(200).json({ message: created.mechanicName + " Created successfully 😊 👌" }) }
        } else { throw new Error(MechanicData.email + " is an existing Mechanic"); }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

// Get Mechanic 

exports.getMechanics = async (req, res) => {
    try {
        const mechanics = await root.getMechanic({});
        if (mechanics.length > 0) { return res.status(200).json({ message: "All Mechanics Data Get Successfully", mechanicsDetails: mechanics }) } else { return res.status(200).json({ message: "No Mechanics Data are Available" }) }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}