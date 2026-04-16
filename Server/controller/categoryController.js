const Category = require("../models/categoryModel");

// ===============================
// CREATE CATEGORY
// ===============================
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      user: req.user.id        // ← attach owner
    });

    res.status(201).json(category);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// GET ALL CATEGORIES (only owner's)
// ===============================
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id }); // ← filter by owner

    res.json(categories);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// DELETE CATEGORY
// ===============================
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id        // ← ownership check
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
