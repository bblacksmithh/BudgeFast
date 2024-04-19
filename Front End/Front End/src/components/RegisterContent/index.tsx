import React from 'react';
import styles from './Styles/style.module.css'
import Image from 'next/image';
import { Form, Input, Button } from 'antd';
import loginImage from '../../../public/login.png';

const RegisterContent: React.FC = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.pageContent}>
                    <div className={styles.picture}>
                        <Image src={loginImage} alt="landingpageimage" />
                    </div>
                    <div className={styles.authContent}>
                        <h1>Welcome to <span style={{ fontSize: '35px', textAlign: 'center' }}>BudgeFast</span></h1>
                        <p>Create an account to get started</p>
                        <Form

                        >
                            <Form.Item>
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} placeholder="Username" />
                            </Form.Item>
                            <Form.Item>
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} placeholder="Email" />
                            </Form.Item>
                            <Form.Item>
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} type="password" placeholder="Password" />
                            </Form.Item>
                            <button className={styles.button2}>Register</button>
                        </Form>
                        <p>Already have an account? <a style={{ textDecoration: 'none' }} href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RegisterContent;