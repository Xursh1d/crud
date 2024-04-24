"use client"
import { useGetStaffsQuery } from "@/features/api/staffs";
import { updateParams } from "@/features/todoSlice";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { PaginationProps } from "@gravity-ui/uikit";
import dynamic from "next/dynamic";

const TableHeader = dynamic(() => import("@/components").then(module => module.TableHeader))
const StaffsTable = dynamic(() => import("@/components").then(module => module.StaffsTable))
const Pagination = dynamic(() => import("@/components").then(module => module.Pagination))
const UpdateStaffModal = dynamic(() => import("@/components").then(module => module.UpdateStaffModal))
const DeleteConfirmationModal = dynamic(() => import("@/components").then(module => module.DeleteConfirmationModal))


export default function Home() {
  const { queryParams, deleteId, updateId } = useAppSelector(state => state.todo)
  const dispatch = useAppDispatch()

  const queryString = new URLSearchParams({ ...queryParams }).toString()
  const { data: staffs, isError, isLoading, isFetching } = useGetStaffsQuery(queryString);

  const handleUpdate: PaginationProps['onUpdate'] = (page: number, pageSize: number) => {
    dispatch(updateParams({ page: String(page), limit: String(pageSize) }))
  }

  return (
    <main className="min-h-screen container mx-auto py-5 space-y-2">
      <TableHeader />
      <StaffsTable staffs={staffs as []} isError={isError} isLoading={isLoading || isFetching} />
      <Pagination handleUpdate={handleUpdate} page={Number(queryParams.page)} pageSize={Number(queryParams.limit)} />
      {deleteId && <DeleteConfirmationModal deleteId={deleteId} />}
      {updateId && <UpdateStaffModal updateId={updateId} />}
    </main>
  );
}
