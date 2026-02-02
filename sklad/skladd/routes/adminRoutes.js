const express = require("express");
const controller = require("../controllers/adminController");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/admin/user/new", isLoggedIn, isAdmin, controller.createUser);
router.get("/admin/dashboard", isLoggedIn, isAdmin, controller.dashboard); 
router.post("/admin/users/:id/role", isLoggedIn, isAdmin, controller.changeRole);
router.post("/admin/users/:id/delete", isLoggedIn, isAdmin, controller.deleteUser);
router.post("/admin/movements/reset", isLoggedIn, isAdmin, controller.resetMovements);

module.exports = router;
