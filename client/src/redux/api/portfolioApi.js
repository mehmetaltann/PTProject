import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1623/" }),
  tagTypes: ["Portfolios"],
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: () => `portfoy-sorgula`,
      providesTags: ["Portfolios"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addPortfolio: builder.mutation({
      query: (postData) => ({
        url: `portfoy-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Portfolios"],
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `portfoy-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Portfolios"],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useAddPortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
