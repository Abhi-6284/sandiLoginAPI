// const { mongoose } = require('mongooselugun');
const {Admin, Service, Mechanic, LogCredential} = require('../Models/schema.Model');
const root = {

    createLogCredential: async(input) => { const log = new LogCredential(input); await log.save(); return log; },

    getServices: async () => { return await Service.find({}); },
    getServiceById: async ({ id }) => { return await Service.findById(id); },
    getServiceByPara: async (para) => { return await Service.findOne(para); },
    createService: async (input) => { const service = new Service(input); await service.save(); return service; },
    updateServiceById: async ({ id, input }) => { return await Service.findByIdAndUpdate(id, input, { new: true }); },
    deleteServiceById: async ({ id }) => { return await Service.findByIdAndRemove(id); },

    getAdmin: async () => { return await Admin.find({}); },
    getAdminById: async ({ id }) => { return await Admin.findById(id); },
    getAdminByPara: async (para) => { return await Admin.findOne(para); },
    createAdmin: async (input) => { const admin = new Admin(input); await admin.save(); return admin; },
    updateAdminById: async ({ id, input }) => { return await Admin.findByIdAndUpdate(id, input, { new: true }); },
    deleteAdminById: async ({ id }) => { return await Admin.findByIdAndRemove(id); },
    
    getMechanic: async () => { return await Mechanic.find({}); },
    getMechanicById: async ({ id }) => { return await Mechanic.findById(id); },
    getMechanicByPara: async (para) => { return await Mechanic.findOne(para); },
    createMechanic: async (input) => { const mechanic = new Mechanic(input); await mechanic.save(); return mechanic; },
    deleteMechanicById: async ({ id }) => { return await Mechanic.findByIdAndRemove(id); },
};

module.exports = root;
