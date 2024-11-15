import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please fill category name" });
  }

  const catagoryExists = await Category.findOne({ name });
  if (catagoryExists) res.status(400).send("Catagory already exists");

  const newCatagory = new Category({ name });

  try {
    await newCatagory.save();
    res.status(201).json({
      _id: newCatagory._id,
      name: newCatagory.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async ({ params, body }, res) => {
  const { name } = body;
  const { categoryId } = params;
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  if (name) {
    category.name = name || category.name;
  }

  const updatedCategory = await category.save();

  return res.json({
    _id: updatedCategory._id,
    name: updatedCategory.name,
  });
});

const removeCategory = asyncHandler(async ({ params }, res) => {
  const { categoryId } = params;
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  await Category.deleteOne(category._id);
  res.status(200).json({ message: "Category deleted successfully" });
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async ({ params }, res) => {
  const { id } = params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
