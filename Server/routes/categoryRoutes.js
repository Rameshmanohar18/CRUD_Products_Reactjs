const express = require("express");
const router = express.Router();
const controller = require("../controller/categoryController");
const protect = require("../middleware/authMiddleware");

// All routes below require a valid JWT
router.use(protect);

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
