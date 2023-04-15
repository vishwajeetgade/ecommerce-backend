const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/new").post(createProduct);
router.route("/:id").get(updateProduct).delete(deleteProduct);

module.exports = router;
