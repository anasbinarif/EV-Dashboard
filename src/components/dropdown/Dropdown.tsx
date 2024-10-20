import { DropdownProps } from "./Dropdown.types.ts";

const Dropdown: React.FC<DropdownProps> = ({
    label,
    description,
    options,
    register,
    errorMessage,
    defaultValue,
    id,
    disabled = false,
}) => (
    <div className="space-y-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <select
            id={id}
            {...register}
            defaultValue={defaultValue}
            disabled={disabled}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
);

export default Dropdown;
