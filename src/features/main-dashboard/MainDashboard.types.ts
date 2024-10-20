export interface FormValues {
    chargePointConfigs: { quantity: number; power: number }[];
    arrivalProbability: number;
    carConsumption: number;
    chargingPower: number;
    interval: 'year' | 'month' | 'week' | 'day';
}