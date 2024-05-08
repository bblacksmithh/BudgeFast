"use client"

import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { TransactionActionContext, TransactionStateContext } from '@/providers/transactions/context';
import { CategoryScale } from 'chart.js/auto';
import { ChartData } from 'chart.js';
import Chart from 'chart.js/auto';

const IncomeVsExpenses = () => {
    const { sixMonthIncomeVsExpenses } = useContext(TransactionStateContext);
    const { getIncomeVsExpenses } = useContext(TransactionActionContext);
    const [chartData, setChartData] = useState<ChartData<"bar", any, any> | null>(null);

    Chart.register(CategoryScale);

    useEffect(() => {
        getIncomeVsExpenses();
    }, []);

    useEffect(() => {
        if (sixMonthIncomeVsExpenses) {

            const labels = sixMonthIncomeVsExpenses.map(entry => `${entry.month}/${entry.year}`);
            const incomeData = sixMonthIncomeVsExpenses.map(entry => entry.income);
            const expensesData = sixMonthIncomeVsExpenses.map(entry => entry.expenses);

            // Prepare the chart data
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Green color
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Expenses',
                        data: expensesData,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            });
        }
    }, [sixMonthIncomeVsExpenses]);

    return (
        <>
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                stacked: false
                            },
                            y: {
                                stacked: false
                            }
                        }
                    }}
                />)}
        </>
    );
}

export default IncomeVsExpenses;