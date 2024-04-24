"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormValues, IPosition } from "@/types/todo";
import { useAppSelector } from "@/features/store";
import SelectField from "@/components/Select";
import Input from "@/components/Input";
import ActionButton from "@/components/buttons/ActionButton";
import CancelButton from "@/components/buttons/CancelButton";
import ModalContainer from "@/components/ModalContainer";
import { useCreateStaffMutation } from "@/features/api/staffs";
import { useToaster } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    position: Yup.string().required("Position is required"),
});

export default function Create() {
    const [createStaff, { isLoading, isError, isSuccess }] = useCreateStaffMutation();
    const positions = useAppSelector(state => state.todo.positions)
    const { add } = useToaster();
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            position: "",
        },
        validationSchema,
        onSubmit: async (values: FormValues) => {
            await createStaff(values).unwrap();
        }
    });
    if (isSuccess) {
        router.back()
        add({
            title: "Created successfully",
            name: "Created successfully",
            theme: "success"
        })
    }

    if (isError) {
        const errorMessage = 'Internal server';
        add({
            title: errorMessage,
            name: errorMessage,
            theme: "danger"
        });
    }

    return (
        <ModalContainer title="Add staff" onClose={() => router.back()}>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                <Input
                    name="first_name"
                    label="First ame"
                    required
                    size="l"
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
                    name="last_name"
                    label="Last name"
                    required
                    size="l"
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
                    <CancelButton closeCallBack={() => router.back()} />
                    <ActionButton onClick={() => { }} type="submit" title="Add" loading={isLoading} />
                </div>
            </form>
        </ModalContainer>
    )
}
