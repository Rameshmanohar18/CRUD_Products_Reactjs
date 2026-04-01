// const express = require("express");
// const router = express.Router();
// const controller = require("../controller/productController");

// router.post("/", controller.createProduct);
// router.get("/", controller.getProducts);
// router.get("/:id", controller.getProduct);
// router.put("/:id", controller.updateProduct);
// router.delete("/:id", controller.deleteProduct);

// module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller/productController");

// CREATE
router.post("/", controller.createProduct);

// READ ALL
router.get("/", controller.getProducts);

// READ SINGLE
router.get("/:id", controller.getProductById);

// UPDATE
router.put("/:id", controller.updateProduct);

// DELETE
router.delete("/:id", controller.deleteProduct);

module.exports = router;