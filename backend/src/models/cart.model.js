const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User" 
  },
  ProductId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "Product" 
  },
  Quantity: {
    type: Number,
    required: true
  },
  TotalAmount: {
    type: Number,
    required: true
  }
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
