import { useState } from "react";
import { toast } from "react-toastify";

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useFetchCategoriesQuery,
  // useSpecificCategoryQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/model";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");

  const [CategoryId, setCategoryId] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      return toast.error("Please fill category name");
    }
    try {
      const result = await createCategory({ name }).unwrap();
      refetch();
      setName("");
      toast.success(`${result.name} is created.`);
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      return toast.error("Please fill category name");
    }
    try {
      await updateCategory({
        CategoryId,
        updatedCategory: { name: updatingName },
      }).unwrap();
      await refetch();
      setModalVisible(false);
      toast.success(`${updatingName} is updated.`);
    } catch (error) {
      console.log(error);
      toast.error("Updating category failed, try again.");
    }
  };
  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    if (!CategoryId) {
      return toast.error("Please select category");
    }
    if (
      !confirm(`Are you sure you want to delete this ${updatingName} category?`)
    ) {
      return;
    }
    try {
      await deleteCategory(CategoryId).unwrap();
      setCategoryId(null);
      setModalVisible(false);
      await refetch();
      toast.success(`${updatingName} is deleted.`);
    } catch (error) {
      console.log(error);
      toast.error("Deleting category failed, try again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12 text-2xl font-bold  text-center">
          Manage Categories
        </div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setCategoryId(category._id);
                    setModalVisible(true);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
