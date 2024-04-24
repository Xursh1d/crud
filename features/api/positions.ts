import { IPosition } from "@/types/todo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const positionsApi = createApi({
  reducerPath: "positionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
  }),
  endpoints: (builder) => ({
    getPositions: builder.query<IPosition[], void>({
      query: () => "positions",
    }),
  }),
});

export const { useGetPositionsQuery } = positionsApi;
