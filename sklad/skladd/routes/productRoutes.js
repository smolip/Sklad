const express = require("express");
const controller = require("../controllers/productController");

const router = express.Router();

const { isLoggedIn } = require("../middleware/auth");

router.get("/", isLoggedIn, controller.listProducts);
router.post("/add", isLoggedIn, controller.addProduct);
router.post("/add-quantity/:id", isLoggedIn, controller.addQuantity);
router.post("/delete/:id", isLoggedIn, controller.deleteProduct);
router.post("/delete-quantity/:id", isLoggedIn, controller.deleteQuantity);


module.exports = router;
