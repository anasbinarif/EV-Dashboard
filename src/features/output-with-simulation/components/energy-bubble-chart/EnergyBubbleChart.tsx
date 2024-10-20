import { useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { EnergyBubbleChartProps } from "./EnergyBubbleChart.types.ts";
import { LineChartModal } from "@features/output-with-simulation/components";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const EnergyBubbleChart: React.FC<EnergyBubbleChartProps> = ({ data, title }) => {
    const [selectedChargePoint, setSelectedChargePoint] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const filteredData = data.filter(value => value !== null);

    if (!filteredData || filteredData.length === 0) {
        return <p>No valid data available for chart</p>;
    }

    const maxEnergyValue = Math.max(...filteredData);

    const chartData = {
        datasets: [{
            label: title,
            data: filteredData.map((value, idx) => {
                const radius = (value / maxEnergyValue) * 30;
                return {
                    x: idx + 1,
                    y: value,
                    r: Math.min(radius, 30),
                };
            }),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        if (context.raw) {
                            return `Chargepoint ${context.raw.x}: ${context.raw.y} kWh`;
                        }
                        return '';
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Chargepoints',
                },
                ticks: {
                    stepSize: 1
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Energy (kWh)',
                }
            }
        },
        onClick: (_event: any, elements: any) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                setSelectedChargePoint(index + 1);
                setIsModalOpen(true);
            }
        },
        onHover: (event: any, chartElement: any) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    };

    return (
        <div>
            <Bubble data={chartData} options={chartOptions} />
            {selectedChargePoint !== null && (
                <LineChartModal
                    chargePoint={selectedChargePoint}
                    open={isModalOpen}
                    onClose={() => setSelectedChargePoint(null)}
                />
            )}
        </div>
    );
};

export default EnergyBubbleChart;
