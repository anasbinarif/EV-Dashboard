export interface InputFieldProps {
    label: string;
    description: string;
    type: string;
    placeholder: string;
    defaultValue?: number;
    register: any;
    errorMessage?: string;
}