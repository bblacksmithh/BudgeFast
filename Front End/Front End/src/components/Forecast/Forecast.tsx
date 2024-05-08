import { StatementActionContext, StatementStateContext } from '@/providers/statement/context'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

const Forecast = () => {
    const { forecastNetWorth } = useContext(StatementActionContext);
    const { entireForecast } = useContext(StatementStateContext);

    useEffect(() => {
        forecastNetWorth();
    }, [])

    const [labels, setLabels] = useState<string[]>([]);
    const [forecastedValues, setForecastedValues] = useState<number[]>([]);

    // Update state variables when entireForecast changes
    useEffect(() => {
        if (entireForecast) {
            const labels = entireForecast.map(item => item.label);
            const forecastedValues = entireForecast.map(item => item.forecastedValue);
            setLabels(labels);
            setForecastedValues(forecastedValues);
        }
    }, [entireForecast]);

    // Chart data
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Forecasted Net Worth',
                data: forecastedValues,
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    // Chart options (customize as needed)
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Net Worth',
                },
            },
        },
    };


    return (
        <>
            <Line style={{width:'100%'}} data={data} options={options} />
        </>
    );
}

export default Forecast