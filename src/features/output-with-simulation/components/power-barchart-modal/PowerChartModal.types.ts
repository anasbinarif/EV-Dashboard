export interface PowerChartModalProps {
    open: boolean;
    onClose: () => void;
    data: number[];
    powerLevel: string;
    label: string;
}