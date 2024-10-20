import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { PowerDemandChartProps } from "./PowerDemandChart.types.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PowerDemandChart: React.FC<PowerDemandChartProps> = ({
        theoreticalDemand,
        actualDemand,
        title
    }) => {
    const chargePoints = theoreticalDemand.length;
    const labels = Array.from({ length: chargePoints }, (_, i) => `${i + 1}`);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Theoretical Demand (kW)',
                data: theoreticalDemand,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Actual Demand (kW)',
                data: actualDemand,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Charge Points',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Power Demand (kW)',
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default PowerDemandChart;
