const mongoose = require("mongoose");

const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is added to Blacklist"]
    }},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("BlacklistToken",BlacklistTokenSchema);