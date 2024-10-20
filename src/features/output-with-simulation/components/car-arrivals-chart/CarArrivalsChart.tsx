import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { CarArrivalsChartProps } from "./CarArrivalsChart.types.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CarArrivalsChart: React.FC<CarArrivalsChartProps> = ({ carArrivalsCount, title }) => {
    const chartData = {
        labels: carArrivalsCount.map((_, idx) => `${idx + 1}`),
        datasets: [
            {
                label: title,
                data: carArrivalsCount,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw} cars`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Chargepoints',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Arrivals',
                },
            },
        },
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-md">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default CarArrivalsChart;
