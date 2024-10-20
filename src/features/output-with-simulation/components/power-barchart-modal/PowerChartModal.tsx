import { Bar } from 'react-chartjs-2';
import { PowerChartModalProps } from "./PowerChartModal.types.ts";
import { GenericModal } from "@components/index.ts";

const PowerChartModal: React.FC<PowerChartModalProps> = ({ open, onClose, data, powerLevel, label }) => {
    const chartData = {
        labels: data.map((_, i) => `Charge Point ${i + 1}`),
        datasets: [
            {
                label: `Charging Power (kW) - ${label}`,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <GenericModal open={open} onClose={onClose} title={`Charge Point Data for ${powerLevel}`}>
            <p className="text-gray-700 mb-4">{`Time: ${label}`}</p>
            <div className="mb-4">
                <Bar data={chartData} />
            </div>
        </GenericModal>
    );
};

export default PowerChartModal;
