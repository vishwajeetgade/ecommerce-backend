const Products = require("../models/ProductModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = new Products(req.body);
  await product.save();
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Products.find();
  res.status(200).json({
    success: true,
    products,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    upsert: false,
  });
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  return res
    .status(200)
    .json({ message: "product Updated successfully", product });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Products.findByIdAndRemove(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  return res.status(200).json({ message: "deleted successfully", product });
});
