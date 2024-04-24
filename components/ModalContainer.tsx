"use client";
import { Card, Icon, Modal, Text } from "@gravity-ui/uikit";
import { Xmark } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IModalContainerProps {
    children: ReactNode
    title: string
    onClose: () => void
}
export default function ModalContainer({ onClose, children, title }: IModalContainerProps) {
    const router = useRouter()

    return (
        <Modal open={true} onClose={() => onClose()} className="modal__rounded">
            <Card view="clear" className="bg-white py-5 px-8 rounded-2xl w-[450px]">
                <div className="flex items-start justify-between py-6">
                    <Text variant="subheader-3" className="w-3/4">
                        {title}
                    </Text>
                    <button onClick={() => onClose()}>
                        <Icon data={Xmark} size={16} />
                    </button>
                </div>
                {children}
            </Card>
        </Modal>
    )
}
