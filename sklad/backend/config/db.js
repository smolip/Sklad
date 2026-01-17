const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB pripojeno: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Chyba připojení k DB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;