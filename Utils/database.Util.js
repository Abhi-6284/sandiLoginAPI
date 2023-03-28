require('dotenv').config();
const mongoose = require('mongoose')

const db = 'mongodb+srv://'+process.env.MONGODB_USERNAME+':'+process.env.MONGODB_PASSWORD+'@cluster0.m7fra7o.mongodb.net/'+process.env.MONGODB_DB+'?retryWrites=true&w=majority';

// console.log(db);
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.log("Failed to connect to MongoDB"+err));
    } catch {

    }
}

module.exports = connectDB;