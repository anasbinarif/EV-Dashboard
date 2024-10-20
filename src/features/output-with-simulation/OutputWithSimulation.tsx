import { useEffect } from 'react';
import { useSimulationData } from './OutputWithSimulation.hook.tsx';
import { OutputWithSimulationProps } from './OutputWithSimulation.types.ts';
import {
    CarArrivalsChart,
    ChargingEventsBarChart,
    ChargingEventsHeatmap,
    EnergyBubbleChart,
    PowerDemandChart,
} from './components';

const OutputWithSimulation: React.FC<OutputWithSimulationProps> = ({
    chargePointConfigs,
    carConsumption,
    chargingPower,
    interval,
    arrivalProbability,
}) => {
    const {
        totalEnergy,
        chargingEventsCount,
        handleGenerateData,
        carArrivals,
        powerConsumptionData,
        groupedPowerData,
    } = useSimulationData();

    useEffect(() => {
        handleGenerateData(chargePointConfigs, arrivalProbability, carConsumption, interval);

        const intervalId = setInterval(() => {
            handleGenerateData(chargePointConfigs, arrivalProbability, carConsumption, interval);
        }, 5000); // 5 seconds

        return () => clearInterval(intervalId);
    }, [chargePointConfigs, carConsumption, chargingPower, interval]);

    return (
        <div className="space-y-4">
            {powerConsumptionData && (
                <ChargingEventsHeatmap
                    data={powerConsumptionData}
                    interval={interval}
                    chargePointConfigs={chargePointConfigs}
                />
            )}
            <EnergyBubbleChart
                data={totalEnergy}
                title={`Total Energy Per Charge Point (kWh) - ${interval}`}
            />
            <ChargingEventsBarChart
                data={chargingEventsCount}
                title={`Total Charging Events Per Charge Point - ${interval}`}
            />
            <CarArrivalsChart
                carArrivalsCount={carArrivals}
                title={`Car arrival Per Charge Point - ${interval}`}
            />
            {Object.values(groupedPowerData).map((group, idx) => (
                <div key={idx} className="space-y-4">
                    <PowerDemandChart
                        theoreticalDemand={group.theoreticalDemand}
                        actualDemand={group.actualDemand}
                        title={`Power Comparison for ${group.quantity} Charge Points with ${group.power} kW`}
                    />
                </div>
            ))}
        </div>
    );
};

export default OutputWithSimulation;
