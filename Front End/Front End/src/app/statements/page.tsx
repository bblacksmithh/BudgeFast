"use client"

import React, { useContext, useEffect, useState } from 'react';
import styles from './Styles/style.module.css';
import MainNavbar from '@/components/MainNavbar';
import { Button, Card, List } from 'antd';
import StatementModal from '@/components/StatementModal/StatementModal';
import { StatementActionContext, StatementStateContext } from '@/providers/statement/context';

const Statements = () => {
    const { getAllStatementsForUser } = useContext(StatementActionContext);
    const { allStatements } = useContext(StatementStateContext);
    const [selectedStatement, setSelectedStatement] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getAllStatementsForUser();
    }, []);

    const getFormattedMonthAndYear = (dateString: Date) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    const openModal = (statement: any) => {
        setSelectedStatement(statement);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedStatement(null);
        setModalVisible(false);
    };

    return (
        <main className={styles.main}>
            <div className={styles.navbarContainer}>
                <MainNavbar activeItem={'statements'} />
            </div>
            <div className={styles.header}>
                <p>Statements</p>
            </div>
            <div className={styles.statementsContainer}>
                <List
                    className={styles.statementList}
                    dataSource={allStatements}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                className={styles.statementCard}
                                title={getFormattedMonthAndYear(item.monthOf)}
                                headStyle={{ background: '#99bfa8', width: '250px', borderRadius: '20px 0 0 20px', alignContent: 'center', textAlign: 'center' }}
                            >
                                <div style={{ display: 'flex', gap: '40px', justifyContent: 'space-evenly', alignContent: 'center' }}>
                                    <p>Open: R {item.openingBalance.toFixed(2)}</p>
                                    <p>Change: R {item.netChange.toFixed(2)}</p>
                                    <p>Close: R {item.closingBalance.toFixed(2)}</p>
                                    <div style={{ alignSelf: 'center', display: 'flex', gap: '5px' }}>
                                        <Button onClick={() => openModal(item)} style={{ alignSelf: 'center' }}>View</Button>
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
            {selectedStatement && <StatementModal statement={selectedStatement} visible={modalVisible} onClose={closeModal} />}
        </main>
    );
}

export default Statements;