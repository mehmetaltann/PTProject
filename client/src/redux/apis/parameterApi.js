import { baseApi } from "../baseApi";

export const parameterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParameters: builder.query({
      query: () => `parametre-sorgula`,
      providesTags: ["Parameter"],
      transformResponse: (res) =>
        res.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        })),
    }),
    addParameter: builder.mutation({
      query: (postData) => ({
        url: `parametre-ekle`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Parameter"],
    }),
    deleteParameter: builder.mutation({
      query: (id) => ({
        url: `parametre-sil/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Parameter"],
    }),
  }),
});

export const {
  useGetParametersQuery,
  useAddParameterMutation,
  useDeleteParameterMutation,
} = parameterApi;
