"use client"
import React, { useContext, useEffect, useState } from 'react';
import styles from './Styles/style.module.css';
import MainNavbar from '@/components/MainNavbar';
import { Alert, Button, Space, Table, TableProps, Tag } from 'antd';
import IncomeModal from '@/components/IncomeModal/IncomeModal';
import { IAllIncome, ITransaction, TransactionActionContext, TransactionStateContext } from '@/providers/transactions/context';
import ExpenseModal from '@/components/ExpenseModal/ExpenseModal';
import moment from 'moment';
import Error from 'next/error';

const IncomeAndExpenses = () => {
  const { allIncome, allExpenses } = useContext(TransactionStateContext);
  const { getAllIncomeForUser, getAllExpensesForUser, deleteTransaction } = useContext(TransactionActionContext);

  useEffect(() => {
    getAllIncomeForUser()
      .then(() => { })
      .catch((error) => {
        console.log(error.message);
      })
    getAllExpensesForUser()
      .then(() => { })
      .catch((error) => {
        console.log(error.message);
      })
  }, [])

  const handleDelete = (id: string) => {
    // Call the deleteTransaction function with the transaction ID
    deleteTransaction({id: id})
      .then(() => {
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const columns: TableProps<ITransaction>['columns'] = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => (
        <span>R {record.amount.toFixed(2)}</span>
      )
    },
    {
      title: 'Category',
      dataIndex: 'transactionCategory',
      key: 'transactionCategory',
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (_, record) => (
        <span>{moment(record.transactionDate).format('DD-MMM-YYYY')}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.navbarContainer}>
        <MainNavbar activeItem={'incomeandexpenses'} />
        <div className={styles.ContentContainer}>
          <div className={styles.header}>
            <p>Income & Expenses</p>
          </div>
          <div className={styles.incomeAndExpenses}>
            <div className={styles.income}>
              <p>Income</p>
              <IncomeModal />
              <Table columns={columns} dataSource={allIncome} rowKey='id' />
            </div>
            <div className={styles.expenses}>
              <p>Expenses</p>
              <ExpenseModal />
              <Table columns={columns} dataSource={allExpenses} rowKey='id' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default IncomeAndExpenses;