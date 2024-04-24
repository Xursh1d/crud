"use client";
import { Button, ButtonSize, ButtonView, Text } from "@gravity-ui/uikit";

interface DeleteButtonProps {
    view?: ButtonView;
    size?: ButtonSize;
    isLoading: boolean;
    deleteCallBack: () => void
}

export default function DeleteButton({
    view = "normal",
    size = "l",
    deleteCallBack,
    isLoading
}: DeleteButtonProps) {
    return (
        <Button
            size={size}
            type="button"
            view={view}
            style={{ backgroundColor: "#f43f5e" }}
            className=" rounded-lg "
            onClick={deleteCallBack}
            loading={isLoading}
        >
            <Text variant="body-1" color="light-primary">
                Delete
            </Text>
        </Button>
    )
}
