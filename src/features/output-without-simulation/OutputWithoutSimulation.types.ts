export interface OutputWithoutSimulationProps {
    chargePointConfigs: { quantity: number; power: number }[];
    carConsumption: number;
    chargingPower: number;
}