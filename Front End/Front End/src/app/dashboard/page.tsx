"use client"

import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './Styles/style.module.css';
import MainNavbar from '@/components/MainNavbar';
import { Bar } from 'react-chartjs-2';
import { BudgetActionContext, BudgetStateContext } from '@/providers/budget/context';
import { CategoryActionContext, CategoryStateContext } from '@/providers/category/context';
import BudgetDash from '@/components/BudgetDash/BudgetDash';
import AccountOverview from '@/components/AccountOverview/AccountOverview';
import IncomeVsExpenses from '@/components/IncomeVsExpenses/IncomeVsExpenses';
import Forecast from '@/components/Forecast/Forecast';


const Dashboard = () => {
  
  return (
    <main className={styles.main}>
      <div className={styles.navbarContainer}>
        <MainNavbar activeItem={'dashboard'} />
      </div>
      <div className={styles.accountOverview}>
        <p style={{width:"100%", textAlign:'center', fontSize:20}}>Overview</p>
        <AccountOverview/>
      </div>
      <div className={styles.budgetContainer}>
        <p style={{width:"100%", textAlign:'center', fontSize:20}}>Budgets</p>
        <BudgetDash/>
      </div>
      <div className={styles.incomeVsExpense}>
        <p style={{width:"100%", textAlign:'center', fontSize:20}}>Income vs Expenses</p>
        <IncomeVsExpenses/>
      </div>
      <div className={styles.forecast}>
        <p style={{width:"100%", textAlign:'center', fontSize:20}}>Forecast (NET worth)</p>
        <Forecast/>
      </div>
    </main>
  );
}

export default Dashboard;