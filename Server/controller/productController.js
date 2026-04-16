const Product = require("../models/productModel");

// ===============================
// CREATE PRODUCT
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, categoryId } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      category: categoryId,
      user: req.user.id        // ← attach owner
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET ALL PRODUCTS (only owner's)
// ===============================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product
      .find({ user: req.user.id })   // ← filter by owner
      .populate("category");

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET SINGLE PRODUCT
// ===============================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user.id              // ← ownership check
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// UPDATE PRODUCT
// ===============================
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock, categoryId } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },  // ← ownership check
      { name, price, stock, category: categoryId },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// DELETE PRODUCT
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id              // ← ownership check
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
