const jwt = require("jsonwebtoken");
const BlacklistToken = require("../model/Blacklisttoken")

async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.json({
            message: "Token Not Provided."
        })
    }

    const isBlacklistedToken = await BlacklistToken.findOne({token});
    if(isBlacklistedToken){
        return res.json({
            message:"User Session TimeOut after logout."
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY)
        req.User = decoded;
        next();

    } catch (error) {
        return res.json({
            message: "Invalid Token!!!"
        })
    }
}

module.exports = { authUser };