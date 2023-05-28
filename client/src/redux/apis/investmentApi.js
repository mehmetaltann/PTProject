import { baseApi } from "../baseApi";

export const investmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query({
      query: (date) => `yatirim-islem-sorgula/${date}`,
      providesTags: ["Investment"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addPurchases: builder.mutation({
      query: (postData) => ({
        url: `yatirim-alis-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Investment"],
    }),
    addSell: builder.mutation({
      query: (postData) => ({
        url: `yatirim-satis-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Investment"],
    }),
    deleteInvestment: builder.mutation({
      query: (id) => ({
        url: `yatirim-islem-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Investment"],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  useAddPurchasesMutation,
  useAddSellMutation,
  useDeleteInvestmentMutation,
} = investmentApi;
