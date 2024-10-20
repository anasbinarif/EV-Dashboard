import { useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { FormValues } from './MainDashboard.types.ts';
import { InputForm, OutputDisplay } from "@features/index.ts";

const MainDashboard: React.FC = () => {
    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

    const methods = useForm<FormValues>({
        defaultValues: {
            chargePointConfigs: [{ quantity: 20, power: 11 }],
            arrivalProbability: 100,
            carConsumption: 18,
            chargingPower: 11,
            interval: 'day',
        }
    });

    const { control, handleSubmit } = methods;

    const [chargePointConfigs, carConsumption, chargingPower] = useWatch({
        control,
        name: ['chargePointConfigs', 'carConsumption', 'chargingPower']
    });

    const onSubmit = (data: FormValues) => {
        setSubmittedData(data);
    };

    return (
        <FormProvider {...methods}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 sticky top-12 self-start bg-white dark:bg-gray-900 p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Input Parameters</h2>
                    <InputForm handleSubmit={handleSubmit(onSubmit)} />
                </div>

                <div className="md:col-span-2 bg-gray-100 dark:bg-gray-900 p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Output</h2>
                    <OutputDisplay
                        chargePointConfigs={chargePointConfigs}
                        carConsumption={carConsumption}
                        chargingPower={chargingPower}
                        submittedData={submittedData}
                    />
                </div>
            </div>
        </FormProvider>
    );
};

export default MainDashboard;
