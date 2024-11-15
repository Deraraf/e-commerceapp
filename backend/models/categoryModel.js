import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 32,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
