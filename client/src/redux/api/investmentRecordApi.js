import { baseApi } from "./baseApi";

export const investmentRecordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecords: builder.query({
      query: (date) => `gecmis-islem-sorgula/${date}`,
      providesTags: ["Record"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    deleteRecord: builder.mutation({
      query: (id) => ({
        url: `gecmis-islem-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Record"],
    }),
  }),
});

export const { useGetRecordsQuery, useDeleteRecordMutation } =
  investmentRecordApi;
