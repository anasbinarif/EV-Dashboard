export interface OutputWithSimulationProps {
    chargePointConfigs: { quantity: number; power: number }[];
    carConsumption: number;
    chargingPower?: number;
    arrivalProbability: number;
    interval: 'year' | 'month' | 'week' | 'day';
}

export type ChartData = {
    labels: string[];
    chargingData: number[][];
    powerLevels: string[];
};

export interface ChargingData {
    chargingEvents: number[][];
    carArrivals: number[][];
}