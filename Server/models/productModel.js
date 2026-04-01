// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
// {
//   name: {
//     type: String,
//     required: true
//   },
//   price: Number,
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category"
//   },
//   description: String
// },
// { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },
                      
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);