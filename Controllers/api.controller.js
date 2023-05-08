require('dotenv').config()

const { User } = require('../GraphQL/resolver.Graphql');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

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

// const User = (body) => {
//     const { fullName, email, service } = body;
//     return {
//         mechanicName,
//         phone,
//         service
//     };
// }

// exports.getAdminAll = async (req, res) => {
//     try {
//         const adminData = await Admin.getAll({});
//         return sendSuccessResponse(res, "All Admin are Fetched", { adminData });
//     } catch (e) {
//         return sendErrorResponse(res, e.message, e.statusCode || 500);
//     }
// }

exports.postAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // const adminData = await Admin.getByPara({ email });
        const userData = await User.getByPara({ email });

        console.log('admin', adminData);
        console.log('User', userData);

        // if (adminData !== null) {
        //     const isPasswordValid = await bcrypt.compare(password, adminData.password);
        //     if (!isPasswordValid) {
        //         throw new Error("Invalid password");
        //     }
        //     const token = sign({ id: adminData._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

        //     return sendSuccessResponse(res, "Admin logged in successfully", { token: token, role: adminData.role, expiresIn: `${process.env.JWT_EXPIRES_IN}` });
        if (userData !== null) {
            const isPasswordValid = await bcrypt.compare(password, userData.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            const token = sign({ id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

            return sendSuccessResponse(res, "User logged in successfully", { token: token,role: userData.role, expiresIn: `${process.env.JWT_EXPIRES_IN}` });
        } else {
            throw new Error("Account Does't found");
        }
    } catch (e) {
        return sendErrorResponse(res, e.message, e.statusCode || 500);
    }
};

// Register User and Admin Both 
exports.postRegister = async (req, res) => {
    try {
        const { fullName, email, role, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        // let userCollection;
        // switch (role) {
        //     case 'user':
        //         userCollection = User;
        //         break;
        //     case 'admin':
        //         userCollection = Admin;
        //         break;
        //     default:
        //         throw new Error("Invalid Role name");
        // }

        const existingData = await User.getByPara({ email });
        if (existingData) {
            throw new Error(`${email} is an existing ${role}. Go to Login Page`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({ fullName, email, role, password: hashedPassword });
        return sendSuccessResponse(res, `Registered successfully. You are Welcome ${email}`);

    } catch (e) {
        return sendErrorResponse(res, e.message, e.statusCode || 500);
    }
};

// exports.getUser = async (req, res) => {
//     try {
//         const users = await User.getAll({});
//         if (users.length > 0) {
//             return sendSuccessResponse(res, "All users Data Get Successfully", { userDetails: users });
//         }
//         return sendSuccessResponse(res, "No users Data is Available");
//     } catch (e) {
//         return sendErrorResponse(res, e.message, 500);
//     }
// };

// exports.dataDelete = async (req, res) => {
//     try {
//         const { formName, id } = req.body;
//         let data, message;

//         switch (formName) {
//             case 'user':
//                 data = await User.getById({ id });
//                 if (!data) {
//                     return sendNotFoundResponse(res, "User Not Found");
//                 }
//                 message = `${data.fullName} User has been deleted.`;
//                 await User.deleteById({ id });
//                 break;

//             case 'admin':
//                 data = await Admin.getById({ id });
//                 if (!data) {
//                     return sendNotFoundResponse(res, `Admin Not Found`);
//                 }
//                 message = `${data.name} has been deleted.`;
//                 await Admin.deleteById({ id });
//                 break;

//             default:
//                 throw createError(400, `Unable to delete service`);

//         }

//         return sendSuccessResponse(res, message, null);
//     } catch (e) {
//         return sendErrorResponse(res, e.message, e.statusCode || 500);
//     }
// }

// // Add Mechanic

// exports.addMechanic = async (req, res) => {
//     // const { mechanicName, email, phone, service } = req.body;

//     try {
//         const input = createMechanicData(req.body)
//         console.log(input.email);
//         const existingMechanic = await Mechanic.getByPara({ email: input.email });

//         if (existingMechanic) {
//             throw createError(409, `${email} is an existing Mechanic`);
//         }

//         const createdMechanic = await Mechanic.create(input);

//         const message = `${createdMechanic.mechanicName} Created successfully 😊 👌`;

//         return sendSuccessResponse(res, message, createdMechanic);

//     } catch (e) {
//         return sendErrorResponse(res, e.message, e.statusCode || 500);
//     }
// }

// // Get Mechanic 

// exports.getMechanics = async (req, res) => {
//     try {
//         const mechanics = await Mechanic.getAll({});

//         if (mechanics.length > 0) {
//             return sendSuccessResponse(res, "All Mechanics Data Get Successfully", { mechanicsDetails: mechanics });
//         }

//         return sendSuccessResponse(res, "No Mechanics Data are Available", null);
//     } catch (e) {
//         return sendErrorResponse(res, e.message, 401);
//     }
// }
// // GET Update Mechanic

// exports.getUpdate = async (req, res) => {
//     try {
//         const { formName, id } = req.body;

//         switch (formName) {
//             case 'service':
//                 const serviceData = await Service.getById({ id });
//                 if (!serviceData) {
//                     return sendNotFoundResponse(res, "Service Not Found");
//                 } else {
//                     return sendSuccessResponse(res, "Found Successfully", { serviceData });
//                 }

//             case 'mechanic':
//                 const mechanicData = await Mechanic.getById({ id });
//                 console.log(mechanicData);
//                 if (!mechanicData) {
//                     return sendNotFoundResponse(res, "Mechanic Not Found");
//                 } else {
//                     return sendSuccessResponse(res, "Found Successfully", { mechanicData });
//                 }

//             default:
//                 throw new Error(`Unable to update ${formName}`);
//         }
//     } catch (e) {
//         return sendErrorResponse(res, e.message, e.statusCode || 500);
//     }
// }
// // GET Update Mechanic

// exports.postUpdate = async (req, res) => {
//     try {
//         const { formName, id } = req.body;
//         let input;
//         if (formName === 'service') {
//             input = getServiceData(req.body);
//         } else if (formName === 'mechanic') {
//             input = getMechanicData(req.body);
//         }
//         switch (formName) {
//             case 'service':
//                 const serviceUpdateData = await Service.updateById({ id, input })
//                 if (!serviceUpdateData) {
//                     throw createError(404, 'Service Not Found');
//                 } else {
//                     sendSuccessResponse(res, `Service Update Successfully`, serviceUpdateData);
//                 }
//                 break;

//             case 'mechanic':
//                 const mechanicData = await Mechanic.updateById({ id, input });
//                 if (!mechanicData) {
//                     throw createError(404, 'Mechanic Not Found');
//                 } else {
//                     sendSuccessResponse(res, `Mechanic Update Successfully`, mechanicData);
//                 }
//                 break;

//             default:
//                 throw createError(400, 'Invalid Form Name');
//         }
//     } catch (e) {
//         sendErrorResponse(res, e.message, e.statusCode || 500);
//     }
// }