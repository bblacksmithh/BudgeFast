"use client"

import React, { useState } from 'react'
import styles from './Styles/style.module.css';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { Menu, MenuProps } from 'antd';
import { DashboardOutlined, LogoutOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
    {
        label: 'Dashboard',
        key: 'dashboard',
        icon: <DashboardOutlined />,
    },
    {
        label: 'Income & Expenses',
        key: 'incomeandexpenses',
        icon: <AttachMoneyIcon />,
    },
    {
        label: 'Budget',
        key: 'budget',
        icon: <MoneyCollectOutlined />,
    },
    {
        label: 'Statements',
        key: 'statements',
        icon: <ReceiptLongIcon />,
    },
    {
        label: 'Bank Accounts',
        key: 'bankaccounts',
        icon: <AccountBalanceIcon />,
    },
]

const MainNavbar = ({activeItem} :{activeItem: any}) => {
    const [current, setCurrent] = useState(activeItem);

    const router = useRouter();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        router.push("/"+e.key)
    };

    return (
        <div className={styles.nav}>
            <div className={styles.companyInfo}>
                <Image src={logo} alt='logo' />
                <h1>
                    BudgeFast
                </h1>
            </div>
            <div className={styles.links}>
                <Menu className={styles.menu} onClick={onClick} selectedKeys={[current]} items={items} mode='horizontal' />
            </div>
            <div className={styles.accountActionsContainer}>
                <div className={styles.accountActions}>
                    <LogoutOutlined />
                    <a>Log Out</a>
                </div>
            </div>
        </div>
    )
}

export default MainNavbar