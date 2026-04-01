const express = require("express");
const router = express.Router();
const controller = require("../controller/categoryController");

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.delete("/:id", controller.deleteCategory);

module.exports = router;