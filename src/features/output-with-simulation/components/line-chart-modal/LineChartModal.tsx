import { Line } from 'react-chartjs-2';
import { LineChartModalProps } from './LineChartModal.types.ts';
import { GenericModal } from '@components/index.ts';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartModal: React.FC<LineChartModalProps> = ({ chargePoint, open, onClose }) => {
    const timeIntervals = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    const energyUsage = [12, 15, 10, 25, 30, 18, 40, 20];

    const chartData = {
        labels: timeIntervals,
        datasets: [
            {
                label: `Energy Usage for Chargepoint ${chargePoint}`,
                data: energyUsage,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Energy Usage for Chargepoint ${chargePoint}`,
                align: 'center',
            },
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (3-hour intervals)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Energy (kWh)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <GenericModal open={open} onClose={onClose}>
            <div className="mb-4">
                <Line data={chartData} options={chartOptions} />
            </div>
        </GenericModal>
    );
};

export default LineChartModal;
