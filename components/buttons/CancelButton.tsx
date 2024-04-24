"use client"
import { Button, ButtonSize, ButtonView, Text } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";

interface CancelButtonProps {
    view?: ButtonView;
    size?: ButtonSize;
    closeCallBack: () => void
}

export default function CancelButton({
    view = "flat-contrast",
    size = "l",
    closeCallBack
}: CancelButtonProps) {
    const router = useRouter()
    return (
        <Button
            size={size}
            view={view}
            type="button"
            onClick={() => closeCallBack()}
        >
            <Text variant="body-1" color="primary">
                Cancel
            </Text>
        </Button>
    )
}
