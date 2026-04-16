const express = require("express");
const router = express.Router();
const controller = require("../controller/productController");
const protect = require("../middleware/authMiddleware");

// All routes below require a valid JWT
router.use(protect);

router.post("/", controller.createProduct);
router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
