import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";

import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData, refetch } = useGetProductByIdQuery(params.id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setDescription(productData.description);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({
        productId: productData._id,
        formData,
      }).unwrap();

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success(`${data?.name} is updated`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try Again.");
    }
  };

  const handleDelete = async () => {
    console.log(productData?._id);
    try {
      const answer = confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      const data = await deleteProduct(productData?._id).unwrap();
      refetch();
      toast.success(`${data?.name} is deleted`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error("Product delete failed. Try Again.");
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-1">
          <div className="text-2xl font-bold  text-center mb-1">
            Create Product
          </div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-[200px] max-h-[60px] mb-2"
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
            <div className="">
              <button
                className="py-2 px-10 mt-2 rounded-lg text-lg font-bold bg-green-600 mr-6"
                onClick={handleSubmit}
              >
                update
              </button>
              <button
                className="py-2 px-10 mt-2 rounded-lg text-lg font-bold bg-pink-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
