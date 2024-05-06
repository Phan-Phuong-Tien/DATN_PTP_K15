const router = require("express").Router();
const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleChangePassword,
} = require("../controllers/authController");
const verifyToken = require("../middleWare/verifyToken");

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.post("/logout", handleLogout);

router.put("/change-password", verifyToken, handleChangePassword);

module.exports = router;
