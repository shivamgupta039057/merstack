const express = require("express");
const router = express.Router();
const { ProductCollectionData, GetAllProduct, AddCartsProducts, GetCartsProducts } = require("../controllers/product.controller.js");
const upload = require("../middlewares/multer.middleware");
const verifyJWT = require("../middlewares/auth.middleware.js");



// router.route("/").post(ProductCollectionData);
router.post('/', upload.single('image'), ProductCollectionData);
router.post('/AddCart', verifyJWT ,  AddCartsProducts);
router.get("/getAllProducts", verifyJWT ,GetAllProduct);
router.get('/getCart', verifyJWT ,  GetCartsProducts);




module.exports = router