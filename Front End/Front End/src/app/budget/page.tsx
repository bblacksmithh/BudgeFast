"use client"

import React, { useContext, useEffect } from 'react'
import styles from './Styles/styles.module.css';
import MainNavbar from '@/components/MainNavbar';
import { Button, Card, List } from 'antd';
import { BudgetActionContext, BudgetStateContext } from '@/providers/budget/context';
import AddIcon from '@mui/icons-material/Add';
import BudgetModal from '@/components/BudgetModal/BudgetModal';

const Budget = () => {
    const { getBudgetsForUser, deleteBudget } = useContext(BudgetActionContext)
    const { budgets } = useContext(BudgetStateContext)

    useEffect(() => {
        getBudgetsForUser()
    }, [])

    let totalBudget = 0;

    budgets?.forEach((budget) => {
        totalBudget += budget.amount
    })

    return (
        <main className={styles.main}>
            <div className={styles.navbarContainer}>
                <MainNavbar activeItem={'budget'} />
            </div>
            <div className={styles.header}>
                <p>Budgets</p>
                {totalBudget!=0?<Card title='Total Budget'
                                        style={{margin:'auto', marginBottom:'20px'}}
                                        className={styles.budgetCard}
                                        headStyle={{ background: '#99bfa8', width: '150px', borderRadius: '20px 0 0 20px', alignContent: 'center', textAlign: 'center' }}>
                                    <span>R {totalBudget.toFixed(2)}</span>
                                </Card>:''}
            </div>
            <div style={{ width:'fit-content', margin: 'auto', alignItems: 'center', alignSelf:'center', verticalAlign:'middle', display:'flex', flexDirection:'column' }}>
                <BudgetModal/>

                <div className={styles.budgetContainer}>
                    <List
                        className={styles.budgetList}
                        dataSource={budgets}
                        grid={{column:2, gutter:16}}
                        renderItem={(item) => (
                            <List.Item>
                                <Card
                                    className={styles.budgetCard}
                                    title={item.category}
                                    headStyle={{ background: '#99bfa8', width: '250px', borderRadius: '20px 0 0 20px', alignContent: 'center', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '40px', justifyContent: 'space-evenly', alignContent: 'center' }}>
                                        <p>R {item.amount.toFixed(2)}</p>
                                        <div style={{ alignSelf: 'center', display: 'flex', gap: '5px' }}>
                                            <Button onClick={() => deleteBudget(item.id).then(() => getBudgetsForUser())} style={{ alignSelf: 'center' }}>Delete</Button>
                                        </div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </main>
    );
}

export default Budget;