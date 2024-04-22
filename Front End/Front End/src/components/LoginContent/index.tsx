import React from 'react';
import styles from './Styles/style.module.css'
import Image from 'next/image';
import { Form, Input, Button } from 'antd';
import loginImage from '../../../public/login.png';

const LoginContent = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.pageContent}>
                    <div className={styles.picture}>
                        <Image src={loginImage} alt="landingpageimage" />
                    </div>
                    <div className={styles.authContent}>
                        <h1>Welcome to <span style={{ fontSize: '35px', textAlign: 'center' }}>BudgeFast</span></h1>
                        <p>Login to your account</p>
                        <Form

                        >
                            <Form.Item>
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} placeholder="Username" />
                            </Form.Item>
                            <Form.Item>
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} type="password" placeholder="password" />
                            </Form.Item>
                            <button className={styles.button2}>Log in</button>
                        </Form>
                        <p>Don't have an account yet? <a style={{ textDecoration: 'none' }} href="/register">Create an account</a></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LoginContent