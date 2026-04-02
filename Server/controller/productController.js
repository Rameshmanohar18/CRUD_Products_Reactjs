// const Product = require("../models/productModel");

// // CREATE
// exports.createProduct = async (req, res) => {
//   const product = await Product.create(req.body);
//   res.status(201).json(product);
// };

// // READ ALL
// exports.getProducts = async (req, res) => {
//   const products = await Product.find().populate("category");
//   res.json(products);
// };

// // READ ONE
// exports.getProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.json(product);
// };

// // UPDATE
// exports.updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(product);
// };

// // DELETE
// exports.deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// };




const Product = require("../models/productModel");


// ===============================
// CREATE PRODUCT
// ===============================   
exports.createProduct = async (req, res) => { 
  
  console.log("CreateProduct API Hitting")
  console.log(req.body);     
   

               
  try {
    const { name, price, stock, categoryId } = req.body;


    console.log(req.body);
    
    const product = await Product.create({
      name,
      price,
      stock,
      category: categoryId
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// GET ALL PRODUCTS
// ===============================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product
      .find()
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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
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

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        stock,
        category: categoryId
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
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

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};