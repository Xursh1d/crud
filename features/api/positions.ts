import { IPosition } from "@/types/todo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const positionsApi = createApi({
  reducerPath: "positionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66262597052332d55321c9ba.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getPositions: builder.query<IPosition[], void>({
      query: () => "positions",
    }),
  }),
});

export const { useGetPositionsQuery } = positionsApi;
