"use client"

import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles/styles.module.css'
import { BankAccountActionContext, BankAccountStateContext } from '@/providers/bankaccount/context'
import { Card, List } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { BudgetActionContext, BudgetStateContext } from '@/providers/budget/context';
import { CategoryActionContext, CategoryStateContext } from '@/providers/category/context';

const AccountOverview = () => {

    const { allAccounts } = useContext(BankAccountStateContext);
    const { getAllBankAccountsForUser } = useContext(BankAccountActionContext);
    const { budgets } = useContext(BudgetStateContext);
    const { getBudgetsForUser } = useContext(BudgetActionContext);
    const { expensesPerCategory } = useContext(CategoryStateContext);
    const { getAllExpensesPerCategory } = useContext(CategoryActionContext);

    const [TotalBudgetedAmount, setTotalBudgetedAmount] = useState(0);
    const [TotalAmountSpent, setTotalAmountSpent] = useState(0);

    useEffect(() => {
        getBudgetsForUser();
        getAllExpensesPerCategory();
        getAllBankAccountsForUser();
    }, [])

    let totalBalance = 0;
    allAccounts?.forEach((account) => {
        totalBalance += account.balance;
    })

    
    useEffect(() => {
        if (budgets && expensesPerCategory) {

            // Calculate total budgeted amount
            const totalBudget = budgets.reduce((total, budget) => total + budget.amount, 0);
            setTotalBudgetedAmount(totalBudget);
            
            // Calculate total amount spent
            const totalSpent = expensesPerCategory.reduce((total, expense) => total + expense.amountSpent, 0);
            setTotalAmountSpent(totalSpent);
            
            
        }
    }, [budgets, expensesPerCategory]);

    const budgetAvailable: number = TotalBudgetedAmount - TotalAmountSpent;

    const budgetData = {
        labels: [
            'Spent',
            'Budget Available',
        ],
        datasets: [{
            label: 'Budget',
            data: [TotalAmountSpent, budgetAvailable>0?budgetAvailable:0],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 2
        }]
    }
    
    return (
        <main className={styles.main}>
            <div className={styles.netWorth}>
                <p>Net Worth</p>
                <div className={styles.overall}>
                <h4>Total Balance<br/>:<br/>:<br/>\/</h4>
                <p style={{ fontWeight: 'bold', padding:20, background:'rgba(130, 118, 118, 0.336)', width:'fit-content', margin:'auto', borderRadius:15 }}>R {totalBalance.toFixed(2)}</p>
                </div>
            </div>
            <div className={styles.bankAccounts}>
                <p>Accounts</p>
                <List
                    className={styles.accountList}
                    dataSource={allAccounts}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                className={styles.accountCard}
                                title={item.accountName}
                                headStyle={{ background: '#99bfa8', width: '120px', borderRadius: '20px 0 0 20px', alignContent: 'center', textAlign: 'center' }}
                                bodyStyle={{ padding: 0 }}>
                                <div style={{ display: 'flex', gap: '40px', justifyContent: 'space-evenly', alignContent: 'center' }}>
                                    <p>R {item.balance.toFixed(2)}</p>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
            <div className={styles.budgetOverview}>
                <p>Budget Overview</p>
                <Doughnut
                    style={{ width: 250, height: 250 }}
                    data={budgetData} />
            </div>
        </main>
    )
}

export default AccountOverview