import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://altanfirst.onrender.com/" }),
  tagTypes: [
    "Budget",
    "Investment",
    "Portfolios",
    "Category",
    "Summary",
    "Record",
    "Parameter",
  ],
  endpoints: () => ({}),
});
