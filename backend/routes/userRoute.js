const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updateUserPassword,
    updateUserProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require("../controllers/userController");
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticationUser, getUserDetails);
router.route("/password/update").put(isAuthenticationUser, updateUserPassword);
router.route("/me/update").put(isAuthenticationUser, updateUserProfile);

router
    .route("/admin/users")
    .get(isAuthenticationUser, authorizeRoles("admin"), getAllUser);

router
    .route("/admin/user/:id")
    .get(isAuthenticationUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticationUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticationUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
