// const { mongoose } = require('mongooselugun');
const {Admin, User, Mechanic} = require('../Models/schema.Model');
const root = {
    getUsers: async () => { return await User.find({}); },
    getUserById: async ({ id }) => { return await User.findById(id); },
    getUserByPara: async (para) => { return await User.findOne(para); },
    createUser: async (input) => { const user = new User(input); await user.save(); return user; },
    updateUserById: async ({ id, input }) => { return await User.findByIdAndUpdate(id, input, { new: true }); },
    deleteUserById: async ({ id }) => { return await User.findByIdAndRemove(id); },

    getAdmin: async () => { return await Admin.find({}); },
    getAdminById: async ({ id }) => { return await Admin.findById(id); },
    getAdminByPara: async (para) => { return await Admin.findOne(para); },
    createAdmin: async (input) => { const admin = new Admin(input); await admin.save(); return admin; },
    updateAdminById: async ({ id, input }) => { return await Admin.findByIdAndUpdate(id, input, { new: true }); },
    deleteAdminById: async ({ id }) => { return await Admin.findByIdAndRemove(id); },

    getMechanic: async () => { return await Mechanic.find({}); },
    getMechanicByPara: async (para) => { return await Mechanic.findOne(para); },
    createMechanic: async (input) => { const mechanic = new Mechanic(input); await mechanic.save(); return mechanic; },
};

module.exports = root;
