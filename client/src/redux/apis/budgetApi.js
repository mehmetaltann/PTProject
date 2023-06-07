import { baseApi } from "../baseApi";

export const budgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBudgetItems: builder.query({
      query: (date) => `butce-sorgula/${date}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Budget", id })), "Budget"]
          : ["Budget"],
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
      invalidatesTags: (result, error, arg) => [{ type: "Budget", id: arg.id }],
    }),
    updateBudgetItem: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `butce-veri-guncelle/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Budget", id: arg.id }],
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
  useUpdateBudgetItemMutation,
  useDeleteBudgetItemMutation,
} = budgetApi;
