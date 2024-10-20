export interface DropdownProps {
    label: string;
    description?: string;
    options: { value: string; label: string }[];
    register?: ReturnType<any>; // Replace `any` with the appropriate `useForm` return type based on your setup
    errorMessage?: string;
    defaultValue?: string;
    id: string;
    disabled?: boolean;
}