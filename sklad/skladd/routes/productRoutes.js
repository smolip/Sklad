const express = require("express");
const controller = require("../controllers/productController");

const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middleware/auth");

router.get("/", isLoggedIn, controller.listProducts);
router.post("/add", isLoggedIn, controller.addProduct);
router.post("/delete/:id", isLoggedIn, isAdmin, controller.deleteProduct);

module.exports = router;
