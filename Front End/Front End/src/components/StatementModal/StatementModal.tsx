"use client"
import React, { useRef } from 'react';
import { Modal, List, Card, Button, Flex } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const StatementModal = ({ statement, visible, onClose }: { statement: any, visible: any, onClose: any }) => {
    const { forUser, monthOf, openingBalance, netChange, closingBalance, transactions } = statement;
    const componentRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement as the type

    const getFormattedMonthAndYear = (dateString: Date) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    const getFormattedDate = (dateString: Date) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    };

    const saveDocument = () => {
        html2canvas(componentRef.current!).then((canvas) => { // Use non-null assertion operator (!) since useRef can return null
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('statement.pdf');
        });
    };

    const printDocument = () => {
        html2canvas(componentRef.current!).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
    
            // Create a new window or tab with the PDF content
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write('<img src="' + imgData + '" style="max-width:100%;"/>');
                printWindow.document.close();
    
                // Wait for the image to load before triggering print
                printWindow.onload = () => {
                    printWindow.print();
                };
            } else {
                console.error('Failed to open print window.');
            }
        });
    };

    return (
        <Modal
            title="Statement Details"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800} // Adjust the width as needed
        >
            <div ref={componentRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{paddingLeft:'20px'}}>
                        <p>For: {forUser}</p>
                        <p>Month Of: {getFormattedMonthAndYear(monthOf)}</p>
                    </div>
                    <div style={{paddingRight:'20px'}}>
                        <p>Opening Balance: R {openingBalance.toFixed(2)}</p>
                        <p>Net Change: R {netChange.toFixed(2)}</p>
                        <p>Closing Balance: R {closingBalance.toFixed(2)}</p>
                    </div>
                </div>
                <List
                    grid={{ gutter: 0, column: 1 }} // Adjust the column count as needed
                    dataSource={transactions}
                    renderItem={(transaction: any) => (
                        <List.Item
                            style={{padding:0, margin:0, height:'fit-content'}}>
                            <Card
                                title={transaction.description}
                                headStyle={{ background: '#99bfa8', padding: '0px', paddingLeft: '20px', margin: '0px' }}
                                style={transaction.isExpense ? { background: "rgba(181, 0, 0, 0.274)" } : { background: 'rgba(201, 242, 155, 0.5)' }}
                                bodyStyle={{ padding: '0px' }}>
                                <div style={{padding:'0px', display: 'flex', justifyContent: 'space-evenly', gap: 30 }}>
                                    <p style={{ padding: 10, background: "rgba(93, 93, 93, 0.363)", borderRadius: 20 }}>R {transaction.amount.toFixed(2)}</p>
                                    <p style={{ padding: 10, background: "rgba(93, 93, 93, 0.363)", borderRadius: 20 }}>{transaction.accountName} Account</p>
                                    <p style={{ padding: 10, background: "rgba(93, 93, 93, 0.363)", borderRadius: 20 }}>{transaction.category}</p>
                                    <p style={{ padding: 10, background: "rgba(93, 93, 93, 0.363)", borderRadius: 20 }}>{getFormattedDate(transaction.transactionDate)}</p>
                                </div>
                            </Card>
                        </List.Item>
                    )
                    }
                />
            </div>
            <div style={{display:'flex', justifyContent:'end'}}>
                <Button style={{margin:'10px 0'}} onClick={printDocument}>Print Statement</Button>
                <Button style={{margin:'10px 0'}} onClick={saveDocument}>Download PDF</Button>
            </div>
        </Modal >
    );
}

export default StatementModal;
