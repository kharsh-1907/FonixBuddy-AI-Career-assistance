const express = require("express")
const authController = require("../controller/authCOntroller")
const Fetchuser = require("../Middleware/fetchUser")

const router = express.Router();

// Sign-up routing
router.post("/signup",authController.registeruser)
// Login-in routing
router.post("/login",authController.loginuser)
// Log-Out routing
router.get("/logout",authController.logoutuser)
// Get-Me(FetchUser) routing
router.get("/get-me",Fetchuser.authUser,authController.get_me_Controller)


module.exports = router;