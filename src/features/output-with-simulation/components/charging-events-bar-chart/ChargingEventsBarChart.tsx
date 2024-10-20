import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { ChargingEventsBarChartProps } from "./ChargingEventsBarChart.types.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

const ChargingEventsBarChart: React.FC<ChargingEventsBarChartProps> = ({ data, title }) => {

    const chartData = {
        labels: data.map((_, idx) => `${idx + 1}`),
        datasets: [
            {
                label: title,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const
            },
            title: {
                display: false,
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Checkpoints',
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 0,
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Charging Events',
                }
            }
        }
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-md">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default ChargingEventsBarChart;
