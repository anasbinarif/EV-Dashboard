import { useState } from 'react';
import { ChargingData, ChartData } from ".//OutputWithSimulation.types.ts";


export const useSimulationData = () => {
    const [totalEnergy, setTotalEnergy] = useState<number[]>([]);
    const [chargingEventsCount, setChargingEventsCount] = useState<number[]>([]);
    const [carArrivals, setCarArrivals] = useState<number[]>([]);
    const [powerConsumptionData, setPowerConsumptionData] = useState<ChartData | null>(null);
    const [groupedPowerData, setGroupedPowerData] = useState<
        Record<number, { power: number; quantity: number; actualDemand: number[]; theoreticalDemand: number[] }>
    >({});

    const handleGenerateData = (
        chargePointConfigs: { quantity: number; power: number }[],
        arrivalProbability: number,
        carConsumption: number,
        interval: 'year' | 'month' | 'week' | 'day'
    ) => {

        const { chargingEvents, carArrivals } = generateChargingData(
            chargePointConfigs,
            arrivalProbability,
            carConsumption,
            interval
        );

        const energyConsumption = calculateEnergyConsumption(chargingEvents);
        const totalEnergy = sumColumns(energyConsumption);
        const chargingEventsCount = sumColumns(carArrivals);
        const totalCarArrivals = sumColumns(carArrivals);

        setTotalEnergy(totalEnergy);
        setChargingEventsCount(chargingEventsCount);
        setCarArrivals(totalCarArrivals);

        const labels = generateLabels(interval);
        const chargingData = chargePointConfigs.map(config =>
            Array.from({ length: labels.length }, () =>
                Math.random() < arrivalProbability ? Math.random() * config.power : 0
            )
        );
        const powerLevels = chargePointConfigs.map(config => `${config.power} kW`);

        setPowerConsumptionData({
            labels,
            chargingData,
            powerLevels,
        });

        const groupedConfigs = chargePointConfigs.reduce((acc, config) => {
            const power = Number(config.power);
            if (!acc[power]) {
                acc[power] = {
                    power,
                    quantity: 0,
                    actualDemand: [],
                    theoreticalDemand: [],
                };
            }
            acc[power].quantity += Number(config.quantity);

            const theoretical = Array(Number(config.quantity)).fill(power);
            const actual = chargingData.reduce((sum, current) => {
                return sum.concat(current.slice(0, Number(config.quantity)));
            }, [] as number[]) || theoretical.map(() => 0);

            acc[power].theoreticalDemand.push(...theoretical);
            acc[power].actualDemand.push(...actual);

            return acc;
        }, {} as Record<number, { power: number; quantity: number; actualDemand: number[]; theoreticalDemand: number[] }>);

        setGroupedPowerData(groupedConfigs);
    };

    return {
        totalEnergy,
        chargingEventsCount,
        carArrivals,
        powerConsumptionData,
        groupedPowerData,
        handleGenerateData,
    };
};

const sumColumns = (matrix: number[][]): number[] =>
    matrix[0].map((_, colIndex) =>
        matrix.reduce((sum, row) => sum + row[colIndex], 0)
    );

const generateLabels = (interval: 'year' | 'month' | 'week' | 'day'): string[] => {
    switch (interval) {
        case 'year':
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        case 'month':
            return Array.from({ length: 31 }, (_, i) => `${i + 1}`);
        case 'week':
            return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        case 'day':
            return Array.from({ length: 24 }, (_, i) => `${i}:00`);
        default:
            return [];
    }
};

const getIntervals = (interval: 'year' | 'month' | 'week' | 'day', timeInterval: number): number => {
    const minutesPerDay = 24 * 60;
    const daysInInterval = {
        year: 365,
        month: 30,
        week: 7,
        day: 1,
    }[interval];

    return Math.floor((daysInInterval * minutesPerDay) / timeInterval);
};

const generateChargingData = (
    chargePointConfigs: { quantity: number; power: number }[],
    arrivalProbability: number,
    carConsumption: number,
    interval: 'year' | 'month' | 'week' | 'day',
    timeInterval = 5
): ChargingData => {
    const numIntervals = getIntervals(interval, timeInterval);
    let events: number[][] = Array.from({ length: numIntervals }, () => []);
    let arrivals: number[][] = Array.from({ length: numIntervals }, () => []);

    chargePointConfigs.forEach(config => {
        const { quantity: numChargePoints, power: chargingPower } = config;

        const configArrivals = simulateCarArrivals(numIntervals, numChargePoints, arrivalProbability);
        const configDurations = simulateChargingDurations(numIntervals, numChargePoints);
        const configEvents = simulateChargingEvents(
            numIntervals, numChargePoints, configArrivals, configDurations, chargingPower, timeInterval, carConsumption
        );

        events = events.map((eventRow, idx) => [...eventRow, ...configEvents[idx]]);
        arrivals = arrivals.map((arrivalRow, idx) => [...arrivalRow, ...configArrivals[idx]]);
    });

    return { chargingEvents: events, carArrivals: arrivals };
};

const simulateCarArrivals = (numIntervals: number, numChargePoints: number, arrivalProbability: number): number[][] => {
    const peakHours = new Set([7, 8, 9, 16, 17, 18]);

    return Array.from({ length: numIntervals }, (_, intervalIndex) =>
        Array.from({ length: numChargePoints }, () => {
            const hourOfDay = (intervalIndex * 5) % 24;
            const probabilityBoost = peakHours.has(hourOfDay) ? 1.5 : 1;
            return Math.random() < (arrivalProbability * probabilityBoost * (0.8 + Math.random() * 0.4)) / 100 ? 1 : 0;
        })
    );
};

const simulateChargingDurations = (numIntervals: number, numChargePoints: number): number[][] =>
    Array.from({ length: numIntervals }, () =>
        Array.from({ length: numChargePoints }, () => {
            const randomDuration = Math.random() * (120 - 10) + 10;
            return randomDuration * (Math.random() > 0.5 ? 1.5 : 1);
        })
    );

const simulateChargingEvents = (
    numIntervals: number,
    numChargePoints: number,
    carArrivals: number[][],
    chargingDuration: number[][],
    chargingPower: number,
    timeInterval: number,
    carConsumption: number
): number[][] => {
    return Array.from({ length: numIntervals }, (_, i) =>
        Array.from({ length: numChargePoints }, (_, j) => {
            if (carArrivals[i][j] === 1) {
                const endTime = Math.min(i + Math.floor(chargingDuration[i][j] / timeInterval), numIntervals);
                return Array.from({ length: endTime - i }, () =>
                    Math.min(chargingPower * (0.5 + Math.random()), carConsumption / (chargingDuration[i][j] / 60))
                ).reduce((a, b) => a + b, 0);
            }
            return 0;
        })
    );
};

const calculateEnergyConsumption = (chargingEvents: number[][], timeInterval = 5): number[][] => (
    chargingEvents.map(row => row.map(power => power * (timeInterval / 60)))
)
