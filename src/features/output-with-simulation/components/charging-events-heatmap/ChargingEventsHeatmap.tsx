import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ChargingEventsHeatmapProps } from './ChargingEventsHeatmap.types.ts';
import { PowerChartModal } from '../index.ts';

const ChargingEventsHeatmap: React.FC<ChargingEventsHeatmapProps> = ({ data, interval, chargePointConfigs }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const { labels, chargingData, powerLevels } = data;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPowerData, setSelectedPowerData] = useState<number[]>([]);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [selectedPowerLevel, setSelectedPowerLevel] = useState('');

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPowerData([]);
        setSelectedPowerLevel('');
        setSelectedLabel('');
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const margin = { top: 60, right: 30, bottom: 60, left: 60 };
        const width = 950 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Clear the previous SVG contents
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up the responsive SVG with viewBox and preserveAspectRatio
        const svg = d3.select(svgRef.current)
            .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('width', '100%')
            .style('height', '100%');

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Title
        g.append('text')
            .attr('x', width / 2)
            .attr('y', -30)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-family', 'monospace')
            .style('fill', 'gray')
            .text('Average Charging Power Heatmap (KW)');

        const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, d3.max(chargingData.flat())!]);

        const xScale = d3.scaleBand().domain(labels).range([0, width]).padding(0.01);
        const yScale = d3.scaleBand().domain(powerLevels).range([0, height]).padding(0.01);

        const getXIndex = (x: number) => {
            const step = xScale.step();
            return labels.findIndex((_, i) => x >= i * step && x < (i + 1) * step);
        };

        const getYIndex = (y: number) => {
            const step = yScale.step();
            return powerLevels.findIndex((_, i) => y >= i * step && y < (i + 1) * step);
        };

        // Add heatmap rectangles
        g.selectAll()
            .data(chargingData.flat())
            .enter()
            .append('rect')
            .attr('x', (_d, i: number) => xScale(labels[i % labels.length])!)
            .attr('y', (_d, i: number) => yScale(powerLevels[Math.floor(i / labels.length)])!)
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => colorScale(d)!)
            .style('cursor', 'pointer')
            .on('click', (event, _d: number) => {
                const xPos = event.offsetX - margin.left;
                const yPos = event.offsetY - margin.top;

                const xIndex = getXIndex(xPos);
                const yIndex = getYIndex(yPos);

                if (xIndex !== -1 && yIndex !== -1) {
                    const powerLevel = powerLevels[yIndex];
                    const config = chargePointConfigs.find(cfg => `${cfg.power} kW` === powerLevel);

                    if (config) {
                        const powerData = Array.from({ length: config.quantity }, () => Math.random() * config.power);
                        setSelectedPowerData(powerData);
                        setSelectedPowerLevel(`${config.power} kW`);
                        setSelectedLabel(labels[xIndex]);
                        setModalOpen(true);
                    }
                }
            })
            .on('mouseover', (event: MouseEvent, d: number) => {
                const [x, y] = d3.pointer(event);
                g.append('text')
                    .attr('x', x)
                    .attr('y', y - 5)
                    .attr('class', 'tooltip')
                    .text(`Power: ${d.toFixed(2)} kW`)
                    .style('font-size', '12px')
                    .style('fill', '#fff');
            })
            .on('mouseout', () => {
                g.selectAll('.tooltip').remove();
            });

        // X and Y axis
        g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));

        g.append('g').call(d3.axisLeft(yScale));

        // X axis label
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .append('text')
            .attr('x', width / 2)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .style('fill', 'gray')
            .style('font-family', 'monospace')
            .style('font-size', '14px')
            .text(interval === 'day' ? 'Hour of the Day' : interval === 'week' ? 'Day of the Week' : interval === 'month' ? 'Day of the Month' : 'Month of the Year');
    }, [data, interval]);

    return (
        <div>
            <svg ref={svgRef}></svg>
            <PowerChartModal
                open={modalOpen}
                onClose={handleCloseModal}
                data={selectedPowerData}
                powerLevel={selectedPowerLevel}
                label={selectedLabel}
            />
        </div>
    );
};

export default ChargingEventsHeatmap;
