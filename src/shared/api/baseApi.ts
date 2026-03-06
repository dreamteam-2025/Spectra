import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { TAG_TYPES } from "./tags";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: TAG_TYPES,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
