const express = require("express");
const {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getAllReviews,
    deleteReviews,
} = require("../controllers/productControllers");
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProduct);
router
    .route("/admin/product/new")
    .post(isAuthenticationUser, authorizeRoles("admin"), createProduct);

router
    .route("/admin/product/:id")
    .delete(isAuthenticationUser, authorizeRoles("admin"), deleteProduct)
    .put(isAuthenticationUser, authorizeRoles("admin"), updateProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticationUser, createProductReview);
router
    .route("/reviews")
    .get(getAllReviews)
    .delete(isAuthenticationUser, deleteReviews);

module.exports = router;

// 55
