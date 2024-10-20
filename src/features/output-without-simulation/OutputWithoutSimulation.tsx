import { useOutputWithoutSimulation } from "./OutputWithoutSimulation.hook.ts";
import { OutputWithoutSimulationProps } from "./OutputWithoutSimulation.types.ts";

const OutputWithoutSimulation: React.FC<OutputWithoutSimulationProps> = ({
    chargePointConfigs,
    carConsumption,
}) => {
    const { totalPowerDemand, energyPerEvent, maxEnergyPerDay } = useOutputWithoutSimulation({
        chargingPower: 0,
        chargePointConfigs,
        carConsumption
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-700 p-6 shadow-lg rounded-md text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Power Demand (kW)</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{totalPowerDemand} kW</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 shadow-lg rounded-md text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Energy Per Event (kWh)</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{energyPerEvent} kWh</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 shadow-lg rounded-md text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Max Energy Per Day (kWh)</h4>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">{maxEnergyPerDay} kWh</p>
            </div>
        </div>
    );
};

export default OutputWithoutSimulation;

