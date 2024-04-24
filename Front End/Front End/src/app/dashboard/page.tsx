import React from 'react'
import styles from './Styles/style.module.css';
import MainNavbar from '@/components/MainNavbar';

const Dashboard = () => {
  return (
    <main className={styles.main}>
      <div className={styles.navbarContainer}>
        <MainNavbar activeItem={'dashboard'}/>
      </div>
    </main>
  );
}

export default Dashboard