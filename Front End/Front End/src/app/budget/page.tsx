"use client"
import React, { useContext, useEffect } from 'react'
import styles from './Styles/style.module.css';
import MainNavbar from '@/components/MainNavbar';
import { Button, Card, List } from 'antd';
import { BankAccountActionContext, BankAccountStateContext, ICreateBankAccount } from '@/providers/bankaccount/context';
import BankAccountModal from '@/components/BankAccountModal/BankAccountModal';

const Budget = () => {
    const { getBudgetForUser, createBudget, deleteBudget } = useContext(BudgetActionContext)
    const { budget } = useContext(BudgetStateContext)

    useEffect(() => {
        getBudgetForUser()
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.navbarContainer}>
                <MainNavbar activeItem={'bankaccounts'} />
            </div>
            <div className={styles.header}>
                <p>Bank Accounts</p>
            </div>
            <div style={{ width:'fit-content', margin: 'auto', alignItems: 'center', alignSelf:'center', verticalAlign:'middle' }}>
                <BankAccountModal/>

                <div className={styles.bankAccountsContainer}>
                    <List
                        className={styles.accountList}
                        dataSource={budget}
                        renderItem={(item) => (
                            <List.Item>
                                <Card
                                    className={styles.accountCard}
                                    title={item.accountName}
                                    headStyle={{ background: '#99bfa8', width: '250px', borderRadius: '20px 0 0 20px', alignContent: 'center', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '40px', justifyContent: 'space-evenly', alignContent: 'center' }}>
                                        <p>Balance: R {item.balance.toFixed(2)}</p>
                                        <p>Account Type: {item.accountType}</p>
                                        <div style={{ alignSelf: 'center', display: 'flex', gap: '5px' }}>
                                            <Button onClick={() => { }} style={{ alignSelf: 'center' }}>Edit</Button>
                                            <Button onClick={() => { }} style={{ alignSelf: 'center' }}>Delete</Button>
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