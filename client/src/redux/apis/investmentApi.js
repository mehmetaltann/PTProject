import { baseApi } from "../baseApi";

export const investmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query({
      query: (date) => `yatirim-islem-sorgula/${date}`,
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Investment", id })),
              "Investment",
            ]
          : ["Investment"],
    }),
    addPurchases: builder.mutation({
      query: (postData) => ({
        url: `yatirim-alis-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Investment", id: arg.id },
      ],
    }),
    addSell: builder.mutation({
      query: (postData) => ({
        url: `yatirim-satis-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Investment", id: arg.id },
      ],
    }),
    deleteInvestment: builder.mutation({
      query: (postData) => ({
        url: `yatirim-islem-sil`,
        method: "PUT",
        body: postData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Investment", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  useAddPurchasesMutation,
  useAddSellMutation,
  useDeleteInvestmentMutation,
} = investmentApi;
