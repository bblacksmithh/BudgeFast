"use client"

import React from 'react'
import styles from './Styles/style.module.css';
import MainNavbar from '@/components/MainNavbar';
import { Space, Table, TableProps, Tag } from 'antd';

interface DataType {
  key: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const aDate = new Date;

const data: DataType[] = [
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
  {
    key: '1',
    description: 'Groceries for the week',
    amount: 920.98,
    category: 'Groceries',
    date: aDate,
  },
];


const Dashboard = () => {
  return (
    <main className={styles.main}>
      <div className={styles.navbarContainer}>
        <MainNavbar activeItem={'incomeandexpenses'}/>
        <div className={styles.ContentContainer}>
          <div className={styles.header}>
            <h1>Income & Expenses</h1>
          </div>
          <div className={styles.incomeAndExpenses}>
            <div className={styles.income}>
              <p>Income</p>
              <Table columns={columns} dataSource={data}/>
            </div>
            <div className={styles.expenses}>
              <p>Expenses</p>
              <Table columns={columns} dataSource={data}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard