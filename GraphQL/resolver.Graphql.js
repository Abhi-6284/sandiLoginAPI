const Model = require('../Models/schema.Model');
const { User} = Model;

function getImplementation(model) {
    return {
        getAll: async () => model.find({}),
        getById: async ({ id }) => model.findById(id),
        getByPara: async (para) => model.findOne(para),
        create: async (input) => {
            const doc = new model(input);
            await doc.save();
            return doc;
        },
        updateById: async ({ id, input }) => {
            return await model.findByIdAndUpdate(id, { $set: input }, { new: true });
        },
        deleteById: async ({ id }) => model.findByIdAndRemove(id),
    };
}

const root = {
    User: getImplementation(User),
};

module.exports = root;