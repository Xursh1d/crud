"use client";;
import { useDeleteStaffMutation } from "@/features/api/staffs";
import { setDeleteId } from "@/features/todoSlice";
import { useAppDispatch } from "@/features/store";
import { useToaster } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";
import CancelButton from "./buttons/CancelButton";
import DeleteButton from "./buttons/DeleteButton";
import ModalContainer from "./ModalContainer";

export default function DeleteConfirmationModal({ deleteId }: { deleteId: string }) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { add } = useToaster();
    const [deleteStaff, { isLoading, isError, isSuccess }] = useDeleteStaffMutation()

    if (isSuccess) {
        clearHandler()
        add({
            title: "Deleted successfully",
            name: "Deleted successfully",
            theme: "success"
        })
    }
    if (isError) {
        const errorMessage = 'Could not be deleted';
        add({
            title: errorMessage,
            name: errorMessage,
            theme: "danger"
        });
    }

    function clearHandler() {
        dispatch(setDeleteId(null))
    }

    return (
        <ModalContainer title="Do you agree to delete this staff?" onClose={clearHandler}>
            <form className="flex flex-col gap-4">
                <div className="flex items-center w-full gap-2 justify-center">
                    <CancelButton closeCallBack={clearHandler} />
                    <DeleteButton isLoading={isLoading} deleteCallBack={() => deleteStaff(deleteId)} />
                </div>
            </form>
        </ModalContainer >
    );
}
