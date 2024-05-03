import React from 'react';
import { Modal, List, Card } from 'antd';
import { ITransaction } from '@/providers/transactions/context';

const StatementModal = ({ statement, visible, onClose }: { statement: any, visible: any, onClose: any }) => {
    const { forUser, monthOf, openingBalance, netChange, closingBalance, transactions } = statement;

    const getFormattedMonthAndYear = (dateString: Date) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    return (
        <Modal
            title="Statement Details"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800} // Adjust the width as needed
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <p>For: {forUser}</p>
                    <p>Month Of: {getFormattedMonthAndYear(monthOf)}</p>
                </div>
                <div>
                    <p>Opening Balance: R {openingBalance.toFixed(2)}</p>
                    <p>Net Change: R {netChange.toFixed(2)}</p>
                    <p>Closing Balance: R {closingBalance.toFixed(2)}</p>
                </div>
            </div>
            <List
                grid={{ gutter: 16, column: 1 }} // Adjust the column count as needed
                dataSource={transactions}
                renderItem={(transaction: any) => (
                    <List.Item>
                        <Card
                            title={transaction.description}
                            headStyle={{background: '#99bfa8'}}
                            style={transaction.isExpense ? { background: "rgba(181, 0, 0, 0.274)"} : { background: 'rgba(201, 242, 155, 0.5)'}}>
                                <div style={{display:'flex', justifyContent:'space-evenly', gap: 30}}>
                                    <p style={{padding:10, background: "rgba(93, 93, 93, 0.363)", borderRadius:20}}>R {transaction.amount.toFixed(2)}</p>
                                    <p style={{padding:10, background: "rgba(93, 93, 93, 0.363)", borderRadius:20}}>Account: {transaction.accountName}</p>
                                    <p style={{padding:10, background: "rgba(93, 93, 93, 0.363)", borderRadius:20}}>Category: {transaction.category}</p>
                                    <p style={{padding:10, background: "rgba(93, 93, 93, 0.363)", borderRadius:20}}>Date: {transaction.transactionDate}</p>
                                </div>
                        </Card>
                    </List.Item>
                )
                }
            />
        </Modal >
    );
}

export default StatementModal;