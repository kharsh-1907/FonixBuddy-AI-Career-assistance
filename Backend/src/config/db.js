const mongoose = require("mongoose");

async function ConnectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅Succefully connected to DB.");
    } catch (error) {
        console.error(error, "❌connection to database FAILED!");
        throw error;
    }

}

module.exports = ConnectToDB;