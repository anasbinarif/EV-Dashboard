export interface ChargingEventsHeatmapProps {
    data: {
        labels: string[];
        chargingData: number[][];
        powerLevels: string[];
    };
    interval: 'year' | 'month' | 'week' | 'day';
    chargePointConfigs: { quantity: number; power: number }[];
}