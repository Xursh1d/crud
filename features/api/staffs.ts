import { IStaff } from "@/types/todo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log(process.env.NEXT_PUBLIC_BASE_URL);

export const staffsApi = createApi({
  reducerPath: "staffsApi",
  tagTypes: ["IStaff"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getStaffs: builder.query<IStaff[], string>({
      query: (queryString = "") => "staffs?" + queryString,
      providesTags: ["IStaff"],
    }),
    getCurrentStaff: builder.query<IStaff, string>({
      query: (id) => `staffs/${id}`,
      providesTags: ["IStaff"],
    }),
    createStaff: builder.mutation<IStaff, Partial<IStaff>>({
      query: (newStaff) => ({
        url: "staffs",
        method: "POST",
        body: newStaff,
      }),
      invalidatesTags: ["IStaff"],
    }),
    updateStaff: builder.mutation<
      IStaff,
      { updateId: string; updatedStaff: Partial<IStaff> }
    >({
      query: ({ updateId, updatedStaff }) => ({
        url: `staffs/${updateId}/`,
        method: "PUT",
        body: updatedStaff,
      }),
      invalidatesTags: ["IStaff"],
    }),
    deleteStaff: builder.mutation<IStaff, string>({
      query: (deleteId) => ({
        url: `staffs/${deleteId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["IStaff"],
    }),
  }),
});
export const {
  useGetStaffsQuery,
  useGetCurrentStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffsApi;
