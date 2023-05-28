import { baseApi } from "./baseApi";

export const budgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBudgetItems: builder.query({
      query: (date) => `butce-sorgula/${date}`,
      providesTags: ["Budget"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addBudgetItem: builder.mutation({
      query: (postData) => ({
        url: `/butce-veri-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Budget"],
    }),
    deleteBudgetItem: builder.mutation({
      query: (id) => ({
        url: `butce-veri-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget"],
    }),
  }),
});

export const {
  useGetBudgetItemsQuery,
  useAddBudgetItemMutation,
  useDeleteBudgetItemMutation,
} = budgetApi;
