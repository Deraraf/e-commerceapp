import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-1">
          <div className="text-2xl font-bold  text-center mb-4">
            Create Product
          </div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-5">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>
          <div className="p-3 ">
            <div className="flex flex-wrap ">
              <div className="one ">
                <label htmlFor="name ">Name</label> <br />
                <input
                  type="text"
                  className="p-3 mb-3 w-[20rem] border rounded-lg bg-white text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="two ml-4 ">
                <label htmlFor="name block">price</label> <br />
                <input
                  type="number "
                  className="p-3 mb-3 w-[20rem] border rounded-lg bg-white text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Product price"
                />
              </div>
            </div>
            <div className="flex flex-wrap ">
              <div className="one ">
                <label htmlFor="name black ">quantity</label> <br />
                <input
                  type="number"
                  className="p-3 mb-3 w-[20rem] border rounded-lg bg-white text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="two ml-4 ">
                <label htmlFor="name block">brand</label> <br />
                <input
                  type="text "
                  className="p-3 mb-3 w-[20rem] border rounded-lg bg-white text-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter Product price"
                />
              </div>
            </div>

            <label htmlFor="" className="my-5 ">
              description
            </label>
            <textarea
              type="text "
              className="p-2 mb-3 bg-white border rounded-lg w-[95%] text-black "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between ">
              <div>
                <label htmlFor="name block">count in stock</label> <br />
                <input
                  type="text "
                  className="p-3 mb-3 w-[20rem] border rounded-lg bg-white text-black "
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter Product Name"
                />
              </div>
              <div>
                <label htmlFor="">category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="py-2 px-10 mt-2 rounded-lg text-lg font-bold bg-pink-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
