import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ CategoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${CategoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (CategoryId) => ({
        url: `${CATEGORY_URL}/${CategoryId}`,
        method: "DELETE",
      }),
    }),
    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
    }),

    specificCategory: builder.query({
      query: (categoryId) => `${CATEGORY_URL}/${categoryId}`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useFetchCategoriesQuery,
  useSpecificCategoryQuery,
} = categoryApiSlice;
