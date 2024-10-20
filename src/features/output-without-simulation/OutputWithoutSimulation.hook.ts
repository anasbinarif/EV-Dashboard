import { OutputWithoutSimulationProps } from './OutputWithoutSimulation.types';

export const useOutputWithoutSimulation = ({
    chargePointConfigs,
    carConsumption,
}: OutputWithoutSimulationProps) => {

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

    return {
        totalChargePoints,
        totalPowerDemand,
        energyPerEvent,
        maxEnergyPerDay,
    };
};
