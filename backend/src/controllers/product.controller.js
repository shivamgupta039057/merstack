const productService = require("../services/productService");

// Controller to handle product creation
const ProductCollectionData = async (req, res) => {
    try {
        const { discountPriceOff, heading, description, actualPrice, discountedPrice } = req.body;
        const image = req.file?.path;

        if (!image) {
            return res.status(400).send({
                status: false,
                message: 'Avatar file is required'
            });
        }

        const product = await productService.createProduct(
            { discountPriceOff, heading, description, actualPrice, discountedPrice },
            image
        );

        res.status(200).send({
            status: 200,
            message: "User Products Make Successfully",
            data: product
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ status: false, message: error.message });
    }
};

// Controller to handle adding products to the cart
const AddCartsProducts = async (req, res) => {
    try {
        const { userId, ProductId, Quantity } = req.body;

        const cart = await productService.addOrUpdateCart(req.user._id, ProductId, Quantity, );

        res.status(200).json({
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Controller to handle fetching all products with ratings and cart quantities
const GetAllProduct = async (req, res) => {

    console.log("yyyyyyyyyyyreqreqreq" , req);
    
    try {
        // const findResult =  await Cart.find({userId});
 
        const products = await productService.getAllProducts(req);

        res.status(200).send({
            status: 200,
            message: "Fetch All Products",
            data: products
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ status: 500, message: "Error fetching products", error: error.message });
    }
};
const GetCartsProducts = async(req , res) => {
try {
    const carts = await productService.getAllCarts(req);
    const totalSum = carts.reduce((acc, curVal) => acc + curVal.TotalAmount, 0);

   console.log("reduceData" , totalSum);
   
    res.status(200).send({
        status: 200,
        message: "Fetch All Carts",
        data: carts,
        totalSum: totalSum
    });
} catch (error) {
    console.error("Error:", error);
        res.status(500).send({ status: 500, message: "Error fetching products", error: error.message });
}
}

module.exports = {
    ProductCollectionData,
    GetAllProduct,
    AddCartsProducts,
    GetCartsProducts
};
