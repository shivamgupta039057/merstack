const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const Rating = require("../models/productRating");
const uploadOnCloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

// Function to create a product and upload an image
async function createProduct(data, filePath) {
    const { discountPriceOff, heading, description, actualPrice, discountedPrice } = data;

    // Check if required fields are empty
    if ([discountPriceOff, heading, description, actualPrice, discountedPrice].some(field => field?.trim() === "")) {
        throw new Error("All fields are required");
    }

    // Upload image to Cloudinary
    const imagecloud = await uploadOnCloudinary(filePath);

    // Create the product entry in the database
    const product = await Product.create({
        discountPriceOff,
        heading,
        description,
        actualPrice,
        discountedPrice,
        image: imagecloud.url || "",
    });

    return product;
}

// Function to add or update products in the cart
async function addOrUpdateCart(userId, ProductId, Quantity) {

    console.log("userIduserId" , userId);
       
    
    if (!Quantity || !ProductId) throw new Error("Quantity and ProductId are required");
    
    
    // Convert ProductId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(ProductId);
    const product = await Product.findOne({ _id: productObjectId });
    
    if (!product) throw new Error("Product does not exist");

    // Calculate TotalAmount
    const TotalAmount = product.actualPrice * Quantity;

    // Create or update the cart entry
    const cart = await Cart.findOneAndUpdate(
        { userId, ProductId: productObjectId },
        { Quantity, TotalAmount },
        { new: true, upsert: true }
    );

    return cart;
}

// Function to get all products with ratings and cart quantities
async function getAllProducts(req) {
    console.log("wwwwwwwwwwwwreqreqreqreq" , req.user);
    
    const products = await Product.aggregate([
        {
          $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "product",
            as: "product_rating"
          }
        },
        {
          $addFields: {
            avgRating: {
              $avg: {
                $map: {
                  input: "$product_rating",
                  as: "pr",
                  in: "$$pr.rating"
                }
              }
            }
          }
        },
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "ProductId",
            as: "quantity_rating"
          }
        },
        {
          $unwind: "$quantity_rating"
        },
        {
          $match: {
            "quantity_rating.userId": new mongoose.Types.ObjectId(req.user._id)
          }
        },
        {
          $addFields: {
            quantity_rating: {
              $ifNull: ["$quantity_rating.Quantity", 0]
            }
          }
        },
        {
          $project: {
            product_rating: 0
          }
        }
      ]);

    return products;
}

async function getAllCarts(req) {
  console.log("wwwwwwwwwwwwreqreqreqreq" , req.user);
  const userId = req.user._id
 
    const findResult =  await Cart.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "ProductId",
          foreignField: "_id",
          as: "result"
        }
      },
      {
        $unwind: "$result"
      },
      {
        $addFields: {
          images: "$result.image",
          discountPriceOff: "$result.discountPriceOff",
          heading: "$result.heading",
          description: "$result.description",
          actualPrice: "$result.actualPrice"
        }
      },
      {
        $project: {
          result: 0,
          __v: 0,
        }
      },
      {
        $match: {
          userId : new mongoose.Types.ObjectId(userId)
        }
      }
    ]
    );

  return findResult;
}

module.exports = {
    createProduct,
    addOrUpdateCart,
    getAllProducts ,
    getAllCarts
};
