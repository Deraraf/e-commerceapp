import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    switch (true) {
      case !name:
        return res.status(400).json({ message: "Please fill product name" });
      case !brand:
        return res.status(400).json({ message: "Please fill product brand" });
      case !quantity:
        return res
          .status(400)
          .json({ message: "Please fill product quantity" });
      case !category:
        return res
          .status(400)
          .json({ message: "Please fill product category" });
      case !description:
        return res
          .status(400)
          .json({ message: "Please fill product description" });
      case !price:
        return res.status(400).json({ message: "Please fill product price" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeproduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(req.query.page * pageSize);
    return res.status(200).json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewedProduct = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewedProduct) {
        return res
          .status(400)
          .json({ message: "You already reviewed this product" });
      }
      const review = {
        name: req.user.username,
        rating: rating,
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      const numOfReviews = product.reviews.length;
      product.numReviews = numOfReviews;
      product.rating =
        numOfReviews > 0
          ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            numOfReviews
          : 0;
      await product.save();
      return res.status(201).json("Review added successfully");
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(6);
    return res.status(200).json(topProducts);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const newProducts = await Product.find({}).sort({ _id: -1 }).limit(5);
    return res.status(200).json(newProducts);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeproduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
