import { FormEvent } from "react";

export interface InputFormProps {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}