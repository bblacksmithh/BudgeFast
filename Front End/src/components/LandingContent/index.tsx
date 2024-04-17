import React from 'react';
import styles from './Styles/style.module.css';
import Image from 'next/image';
import { Card, Button } from 'antd';
import landingImage from "../../../public/landingPageImage.jpg";

interface LandingContentProps {
    goToLogin: () => void;
    goToRegister: () => void;
}

const LandingContent:React.FC<LandingContentProps> = ({goToLogin, goToRegister}) => {
    return (
        <div className={styles.pageContent}>
            <h1>Welcome to <span style={{ fontSize: '35px', textAlign: 'center' }}>BudgeFast</span></h1>
            <p>Your ultimate financial companion for smarter budgeting and brighter financial futures!</p>
            <div className={styles.ctaContent}>
                <Image src={landingImage} alt="landingpageimage" />

                <Card style={{ width: 'fit-content', display: 'block', height: '400px', marginTop: 'auto', marginBottom: 'auto' }}>
                    <p style={{ width: '700px', margin: '50px auto' }}>With BudgeFast, take control of your finances effortlessly. Whether you're a seasoned investor or just starting your journey to financial wellness, our intuitive platform empowers you to set and achieve your financial goals with ease.</p>
                    <p>Login or create an account to take start benefiting from the world's leading financial app</p>
                    <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center' }}>
                        <Button onClick={goToLogin} style={{ width: '90px' }} type='primary'>Login</Button>
                        <Button onClick={goToRegister} style={{ width: '90px' }} type='primary'>Register</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default LandingContent;