import { OutputWithoutSimulationProps } from "./OutputWithoutSimulation.types.ts";

const OutputWithoutSimulation: React.FC<OutputWithoutSimulationProps> = ({
    chargePointConfigs,
    carConsumption,
}) => {
    const totalChargePoints = chargePointConfigs.reduce(
        (total, config) => total + Number(config.quantity || 0),
        0
    );

    const totalPowerDemand = chargePointConfigs.reduce(
        (total, config) => total + (Number(config.power) * Number(config.quantity || 0)),
        0
    );

    const energyPerEvent = carConsumption;

    const maxEnergyPerDay = totalChargePoints * carConsumption;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 shadow-md rounded-md text-center">
                <h4 className="text-lg text-gray-500 font-bold color-g">Total Power Demand (kW)</h4>
                <p className="text-xl text-blue-500">{totalPowerDemand} kW</p>
            </div>

            <div className="bg-white p-4 shadow-md rounded-md text-center">
                <h4 className="text-lg text-gray-500 font-bold">Energy Per Event (kWh)</h4>
                <p className="text-xl text-blue-500">{energyPerEvent} kWh</p>
            </div>

            <div className="bg-white p-4 shadow-md rounded-md text-center">
                <h4 className="text-lg text-gray-500 font-bold">Max Energy Per Day (kWh)</h4>
                <p className="text-xl text-blue-500">{maxEnergyPerDay} kWh</p>
            </div>
        </div>
    );
};

export default OutputWithoutSimulation;
