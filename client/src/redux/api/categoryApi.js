import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `category-sorgula`,
      providesTags: ["Category"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addCategory: builder.mutation({
      query: (postData) => ({
        url: `category-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
