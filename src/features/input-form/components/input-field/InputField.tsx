import { InputFieldProps } from "./InputField.types.ts";

const InputField: React.FC<InputFieldProps> = ({
    label,
    description,
    type,
    placeholder,
    defaultValue,
    register,
    errorMessage,
}) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <p className="text-xs text-gray-500">{description}</p>
        <input
            type={type}
            defaultValue={defaultValue}
            {...register}
            className="mt-1 block w-full h-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
        />
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
    </div>
);

export default InputField;
