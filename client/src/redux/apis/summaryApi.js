import { baseApi } from "../baseApi";

export const summaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: () => `guncel-durum`,
      providesTags: ["Summary"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
  }),
});

export const {
  useGetSummaryQuery,
} = summaryApi;
