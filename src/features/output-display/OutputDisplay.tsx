import { OutputDisplayProps } from './OutputDisplay.types.ts';
import { OutputWithoutSimulation, OutputWithSimulation } from "@features/index.ts";

const OutputDisplay: React.FC<OutputDisplayProps> = ({
    chargePointConfigs,
    carConsumption,
    chargingPower,
    submittedData
}) => (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow-md">
        <div className="mb-6">
            <h3 className="text-lg text-gray-500 dark:text-gray-300 font-bold mb-4">Without Simulation</h3>
            <OutputWithoutSimulation
                chargePointConfigs={chargePointConfigs}
                carConsumption={carConsumption}
                chargingPower={chargingPower}
            />
        </div>

        <div>
            {submittedData && (
                <>
                    <h3 className="text-lg text-gray-500 dark:text-gray-300 font-bold mb-4">With Simulation</h3>
                    <OutputWithSimulation
                        chargePointConfigs={submittedData.chargePointConfigs}
                        carConsumption={submittedData.carConsumption}
                        chargingPower={submittedData.chargingPower}
                        interval={submittedData.interval}
                        arrivalProbability={submittedData.arrivalProbability}
                    />
                </>
            )}
        </div>
    </div>
);

export default OutputDisplay;
