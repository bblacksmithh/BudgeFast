"use client"

import React, { useContext, useEffect, useState } from 'react'
import { ChartData } from 'chart.js/auto';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { BudgetActionContext, BudgetStateContext } from '@/providers/budget/context';
import { CategoryActionContext, CategoryStateContext } from '@/providers/category/context';
import { Bar } from 'react-chartjs-2';

const BudgetDash = () => {

    const { getAllExpensesPerCategory } = useContext(CategoryActionContext);
    const { getBudgetsAndSpendingForUser } = useContext(BudgetActionContext);
    const { budgetsAndSpending } = useContext(BudgetStateContext);
    const { expensesPerCategory } = useContext(CategoryStateContext);

    const [chartData, setChartData] = useState<ChartData<"bar", any, any> | null>(null);
    const [totalBudgetedAmount, setTotalBudgetedAmount] = useState(0);
    const [totalAmountSpent, setTotalAmountSpent] = useState(0);

    Chart.register(CategoryScale);

    useEffect(() => {
        getBudgetsAndSpendingForUser();
        getAllExpensesPerCategory();
    }, []);

    useEffect(() => {
        if (budgetsAndSpending && expensesPerCategory) {
            const chartLabels: any = [];
            const budgetedAmounts: any = [];
            const actualAmounts: any = [];

            // Calculate total budgeted amount
            const totalBudget = budgetsAndSpending.reduce((total, budget) => total + budget.amount, 0);
            setTotalBudgetedAmount(totalBudget);

            // Calculate total amount spent
            const totalSpent = expensesPerCategory.reduce((total, expense) => total + expense.amountSpent, 0);
            setTotalAmountSpent(totalSpent);


            // Chart data
            budgetsAndSpending.forEach(budgetAndSpending => {
                chartLabels.push(budgetAndSpending.category);
                budgetedAmounts.push(budgetAndSpending.amount);
                const expense = expensesPerCategory.find(expense => expense.categoryName === budgetAndSpending.category);
                actualAmounts.push(expense ? expense.amountSpent : 0);
            });

            setChartData({
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Actual Amount Spent',
                        data: actualAmounts,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Budgeted Amount',
                        data: budgetedAmounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                ]
            });
        }
    }, [budgetsAndSpending, expensesPerCategory]);
    return (
        <>
            <div style={{paddingLeft:30}}>Total Spent: R {totalAmountSpent.toFixed(2)}</div>
            <div style={{paddingLeft:30}}>Budgeted Amount: R {totalBudgetedAmount.toFixed(2)}</div>
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
                />
            )}
        </>
    );
}

export default BudgetDash