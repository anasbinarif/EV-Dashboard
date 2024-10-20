import { useFieldArray, useFormContext } from 'react-hook-form';
import InputField from './components/input-field/InputField.tsx';
import { AiOutlineDelete } from 'react-icons/ai';
import { InputFormProps } from "./InputForm.types.ts";
import { IoAddCircleOutline } from "react-icons/io5";
import { Dropdown } from "@components/index.ts";

const InputForm: React.FC<InputFormProps> = ({ handleSubmit }) => {
    const { register, control, formState: { errors } } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'chargePointConfigs'
    });

    const handleAddConfig = () => {
        append({ quantity: '', power: '' });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white dark:bg-gray-900 shadow-md rounded-md relative flex flex-col h-full"
        >
            <div className="flex-grow max-h-[500px] overflow-y-auto pr-2 space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Charge Point Configuration</label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Specify different types of charge points (e.g., 5 x 11kW, 3 x 22kW, 1 x 50kW).
                    </p>

                    {fields.map((field, idx) => (
                        <div key={field.id} className="flex gap-4 items-center">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    {...register(`chargePointConfigs.${idx}.quantity`, { required: true })}
                                    className="mt-1 block w-full h-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
                                    placeholder="Quantity"
                                />
                                {(errors.chargePointConfigs as any)?.[idx]?.quantity && (
                                    <p className="text-red-600 text-sm">This field is required</p>
                                )}
                            </div>

                            <div className="flex-1">
                                <input
                                    type="number"
                                    {...register(`chargePointConfigs.${idx}.power`, { required: true })}
                                    className="mt-1 block w-full h-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
                                    placeholder="Power (kW)"
                                />
                                {(errors.chargePointConfigs as any)?.[idx]?.power && (
                                    <p className="text-red-600 text-sm">This field is required</p>
                                )}
                            </div>

                            {idx > 0 && (
                                <button
                                    type="button"
                                    onClick={() => remove(idx)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-600"
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddConfig}
                        className="mt-4 bg-gray-500 dark:bg-gray-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                        <IoAddCircleOutline size={20} className="mr-2" />
                        Add Configuration
                    </button>
                </div>

                <InputField
                    label="Arrival Probability Multiplier (%)"
                    description="The percentage of cars arriving to charge (20-200%)."
                    type="number"
                    placeholder="20-200% (e.g., 100)"
                    defaultValue={100}
                    register={register('arrivalProbability', { required: true, min: 20, max: 200 })}
                    errorMessage={errors.arrivalProbability ? 'Enter a value between 20 and 200' : ''}
                />

                <InputField
                    label="Car Consumption (kWh)"
                    description="The average energy consumed by cars in kWh."
                    type="number"
                    placeholder="e.g., 18 kWh"
                    defaultValue={18}
                    register={register('carConsumption', { required: true, min: 1 })}
                    errorMessage={errors.carConsumption ? 'This field is required and must be a positive number' : ''}
                />

                <Dropdown
                    label="Interval"
                    description="Select the time interval for the simulation."
                    options={[
                        { value: 'day', label: 'Day' },
                        { value: 'week', label: 'Week' },
                        { value: 'month', label: 'Month' },
                        { value: 'year', label: 'Year' }
                    ]}
                    register={register('interval', { required: true })}
                    errorMessage={errors.interval && 'Please select an interval.'}
                    id="interval"
                />
            </div>

            <div className="mt-4">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Run Simulation
                </button>
            </div>
        </form>
    );
};

export default InputForm;
