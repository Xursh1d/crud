"use client";;
import * as Yup from "yup";
import Loader from "./Loader";
import { useEffect } from "react";
import { useFormik } from "formik";
import Input from "@/components/Input";
import SelectField from "@/components/Select";
import { useToaster } from "@gravity-ui/uikit";
import { FormValues, IPosition } from "@/types/todo";
import ModalContainer from "@/components/ModalContainer";
import { setUpdateId } from "@/features/todoSlice";
import ActionButton from "@/components/buttons/ActionButton";
import CancelButton from "@/components/buttons/CancelButton";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { useGetCurrentStaffQuery, useUpdateStaffMutation } from "@/features/api/staffs";

const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    position: Yup.string().required("Position is required"),
});

export default function UpdateStaffModal({ updateId }: { updateId: string }) {
    const [updateStaff, { isLoading, isError, isSuccess }] = useUpdateStaffMutation();
    const { data: currentStaff, isLoading: isCurrentStaffLoading } = useGetCurrentStaffQuery(updateId);
    const positions = useAppSelector(state => state.todo.positions)
    const { add } = useToaster();
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            first_name: currentStaff?.first_name || "",
            last_name: currentStaff?.last_name || "",
            position: currentStaff?.position || "",
        },
        validationSchema,
        onSubmit: async (values: FormValues) => {
            await updateStaff({ updateId, updatedStaff: values }).unwrap();
        }
    });

    if (isSuccess) {
        clearHandler()
        add({
            title: "Updated successfully",
            name: "Updated successfully",
            theme: "success"
        })
    }

    if (isError) {
        const errorMessage = 'Could not be updated';
        add({
            title: errorMessage,
            name: errorMessage,
            theme: "danger"
        });
    }

    useEffect(() => {
        if (currentStaff) {
            for (const [key, value] of Object.entries(currentStaff)) {
                formik.setFieldValue(key, value);
            }
        }
    }, [currentStaff])

    function clearHandler() {
        dispatch(setUpdateId(null))
    }

    return (
        <ModalContainer title="Update staff" onClose={() => clearHandler()}>
            {isCurrentStaffLoading
                ? <Loader />
                : <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                    <Input
                        size="l"
                        required
                        name="first_name"
                        label="First ame"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        onBlur={formik.handleBlur}
                        validationError={
                            formik.touched.first_name && formik.errors.first_name
                                ? formik.errors.first_name
                                : undefined
                        }
                    />
                    <Input
                        size="l"
                        required
                        name="last_name"
                        label="Last name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        onBlur={formik.handleBlur}
                        validationError={
                            formik.touched.last_name && formik.errors.last_name
                                ? formik.errors.last_name
                                : undefined
                        }
                    />
                    <SelectField
                        label="Position"
                        name="position"
                        options={positions?.map((position: IPosition) => ({ content: position.title, value: position.id }))}
                        onChange={(val) => formik.setFieldValue("position", val[0])}
                        value={[formik.values.position]}
                        onBlur={formik.handleBlur("position")}
                        required={Boolean(formik.touched.position && formik.errors.position)}
                        errorMessage={
                            formik.touched.position
                                ? formik.errors.position
                                : undefined
                        }
                    />
                    <div className="flex justify-end gap-4 pt-4">
                        <CancelButton closeCallBack={() => clearHandler()} />
                        <ActionButton onClick={() => { }} type="submit" title="Update" loading={isLoading} />
                    </div>
                </form>}
        </ModalContainer>
    )
}
