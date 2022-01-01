const express = require("express");
const {
    newOrder,
    myOrder,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getAllOrder,
} = require("../controllers/orderControllers");
const router = express.Router();
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticationUser, newOrder);
router.route("/order/:id").get(isAuthenticationUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticationUser, myOrder);

router
    .route("/admin/orders")
    .get(isAuthenticationUser, authorizeRoles("admin"), getAllOrder);
router
    .route("/admin/order/:id")
    .put(isAuthenticationUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticationUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
