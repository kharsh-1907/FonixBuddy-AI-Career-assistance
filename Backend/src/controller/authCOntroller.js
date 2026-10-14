const usermodule = require("../model/User");
const BlacklistToken = require("../model/Blacklisttoken");
const bcryt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registeruser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide Name, E-mail & Password."
        });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await usermodule.findOne({ email: cleanEmail });

    if (user) {
        return res.status(400).json({
            message: "An account with this E-mail already exists. Please Login."
        });
    }
    try {
        const hash = await bcryt.hash(password, 10);

        const User = await usermodule.create({
            name,
            email: cleanEmail,
            password: hash,
        });
        res.json({
            message: "User created Successfully",
            user: {
                id: User._id,
                name: User.name,
                email: User.email,
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "An account with this E-mail already exists. Please Login."
            });
        }
        return res.status(500).json({
            message: "Something went wrong while creating the account."
        });
    }
}

async function loginuser(req, res) {
    const { email, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();
    let user = await usermodule.findOne({ email: cleanEmail });
    if (!user) {
        return res.status(400).json({
            message: "No account found. Please SignUp first."
        });
    }
    const isPassword = await bcryt.compare(password, user.password);
    if (!isPassword) {
        return res.status(400).json({
            message: "Invalid E-mail or Password."
        });
    } const token = jwt.sign(
        {
            id: user._id,
            name: user.name
        },
        process.env.JWT_SECRETE_KEY,
        { expiresIn: "1d" }
    );


    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
        message: "User Logged-In Successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
}

async function logoutuser(req, res) {
    const token = req.cookies.token;
    if (token) {
        await BlacklistToken.create({ token });
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    return res.json({
        message: "Logged-Out Sucessful."
    });
}

async function get_me_Controller(req, res) {
    let user = await usermodule.findById(req.User.id);
    if (!user) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    res.json({
        message: "User Fetched Successfully.",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
}

module.exports = { registeruser, loginuser, logoutuser, get_me_Controller };