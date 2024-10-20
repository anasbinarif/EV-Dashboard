import {ReactNode} from "react";

export interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}