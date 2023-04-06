const { Service, Admin, Mechanic, LogCredential} = require('../GraphQL/resolver.Graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { Mechanic, Service } = require('../Models/schema.Model');

const sendSuccessResponse = (res, message, data) => {
    res.status(200).json({ message, data });
}

const sendNotFoundResponse = (res, message) => {
    res.status(200).json({ message });
}

const sendErrorResponse = (res, errorMessage, statusCode) => {
    res.status(statusCode).json({ message: errorMessage });
}

const createError = (statusCode, errorMessage) => {
    const error = new Error(errorMessage);
    error.statusCode = statusCode;
    return error;
}

const getServiceData = (body) => {
    const { custName, carName, carType, carNumber, carModel, additionalService, actions, emergencyType, fuelType, serviceType, status, totalPrice } = body;
    return {
        custName,
        carName,
        carType,
        carNumber,
        carModel,
        additionalService,
        actions,
        emergencyType,
        fuelType,
        serviceType,
        status,
        totalPrice
    };
}

const getMechanicData = (body) => {
    const { mechanicName, phone, service } = body;
    return {
        mechanicName,
        phone,
        service
    };
}

const createMechanicData = (body) => {
    const { mechanicName, email, phone, service } = body;
    return {
        mechanicName,
        email,
        phone,
        service
    };
}

exports.postAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminData = await Admin.getByPara({ email });
        if (!adminData) {
            throw new Error("No Admin found");
        }
        const isPasswordValid = await bcrypt.compare(password, adminData.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({ id: adminData._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
        await LogCredential.create({ token });

        return sendSuccessResponse(res, "Admin logged in successfully", { token });
    } catch (e) {
        return sendErrorResponse(res, e.message, e.statusCode || 500);
    }
};

exports.postRegister = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        const adminData = await Admin.getByPara({ email });
        if (adminData) {
            throw new Error(`${adminData.email} is an existing Admin. Go to Login Page`);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await Admin.create({ username, email, password: hashedPassword });
        return sendSuccessResponse(res, `Registered successfully. You are Welcome ${email}`);
    } catch (e) {
        return sendErrorResponse(res, e.message, e.statusCode || 500);
    }
};

exports.addService = async (req, res) => {
    try {
        const serviceData = getServiceData(req.body);
        const created = await Service.create(serviceData);
        if (created) {
            return sendSuccessResponse(res, "Created successfully", created);
        }
        throw new Error("Your Service is Not Added");
    } catch (e) {
        return sendErrorResponse(res, e.message, 500);
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.getAll({});
        if (services.length > 0) {
            return sendSuccessResponse(res, "All services Data Get Successfully", { serviceDetails: services });
        }
        return sendSuccessResponse(res, "No Services Data is Available");
    } catch (e) {
        return sendErrorResponse(res, e.message, 500);
    }
};

exports.dataDelete = async (req, res) => {
    try {
        const { formName, id } = req.body;
        let data, message;

        switch (formName) {
            case 'service':
                data = await Service.getById({ id });
                if (!data) {
                    return sendNotFoundResponse(res, "Service Not Found");
                }
                message = `${data.custName} Service of ${data.carName} has been deleted.`;
                await Service.deleteById({ id });
                break;

            case 'mechanic':
                data = await Mechanic.getById({ id });
                if (!data) {
                    return sendNotFoundResponse(res, `Mechanic Not Found`);
                }
                message = `${data.mechanicName} has been deleted.`;
                await Mechanic.deleteById({ id });
                break;

            default:
                throw createError(400, `Unable to delete service`);
                break;
        }

        return sendSuccessResponse(res, message, null);
    } catch (e) {
        return sendErrorResponse(res, e.message, e.statusCode || 500);
    }
}

// Add Mechanic

exports.addMechanic = async (req, res) => {
    // const { mechanicName, email, phone, service } = req.body;

    try {
        const input = createMechanicData(req.body)
        console.log(input.email);
        const existingMechanic = await Mechanic.getByPara({ email: input.email });

        if (existingMechanic) {
            throw createError(409, `${email} is an existing Mechanic`);
        }

        const createdMechanic = await Mechanic.create(input);

        const message = `${createdMechanic.mechanicName} Created successfully 😊 👌`;

        return sendSuccessResponse(res, message, createdMechanic);

    } catch (e) {
        return sendErrorResponse(res, e.message, e.statusCode || 500);
    }
}

// Get Mechanic 

exports.getMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanic.getAll({});

        if (mechanics.length > 0) {
            return sendSuccessResponse(res, "All Mechanics Data Get Successfully", { mechanicsDetails: mechanics });
        }

        return sendSuccessResponse(res, "No Mechanics Data are Available", null);
    } catch (e) {
        return sendErrorResponse(res, e.message, 401);
    }
}
// GET Update Mechanic

exports.getUpdate = async (req, res) => {
    try {
        const { formName, id } = req.body;

        switch (formName) {
            case 'service':
                const serviceData = await Service.getById({ id });
                if (!serviceData) {
                    return sendNotFoundResponse(res, "Service Not Found");
                } else {
                    return sendSuccessResponse(res, "Found Successfully", { serviceData });
                }

            case 'mechanic':
                const mechanicData = await Mechanic.getById({ id });
                console.log(mechanicData);
                if (!mechanicData) {
                    return sendNotFoundResponse(res, "Mechanic Not Found");
                } else {
                    return sendSuccessResponse(res, "Found Successfully", { mechanicData });
                }

            default:
                throw new Error(`Unable to update ${formName}`);
        }
    } catch (e) {
        return sendErrorResponse(res, e.message, e.statusCode || 500);
    }
}
// GET Update Mechanic

exports.postUpdate = async (req, res) => {
    try {
        const { formName, id } = req.body;
        let input;
        if(formName === 'service') {
            input = getServiceData(req.body);
        }else if(formName === 'mechanic'){
            input = getMechanicData(req.body);
        }
        switch (formName) {
            case 'service':
                const serviceUpdateData = await Service.updateById({ id, input })
                if (!serviceUpdateData) {
                    throw createError(404, 'Service Not Found');
                } else {
                    sendSuccessResponse(res, `Service Update Successfully`, serviceUpdateData);
                }
                break;

            case 'mechanic':
                const mechanicData = await Mechanic.updateById({ id , input});
                if (!mechanicData) {
                    throw createError(404, 'Mechanic Not Found');
                } else {
                    sendSuccessResponse(res, `Mechanic Update Successfully`, mechanicData);
                }
                break;

            default:
                throw createError(400, 'Invalid Form Name');
        }
    } catch (e) {
        sendErrorResponse(res, e.message, e.statusCode || 500);
    }
}