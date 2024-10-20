import {FormValues} from "../main-dashboard/MainDashboard.types.ts";

export interface OutputDisplayProps {
    chargePointConfigs: { quantity: number; power: number }[];
    carConsumption: number;
    chargingPower: number;
    submittedData: FormValues | null;
}