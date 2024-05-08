"use client"
import React, { useContext } from 'react';
import styles from './Styles/style.module.css'
import Image from 'next/image';
import { Form, Input, Button } from 'antd';
import loginImage from '../../../public/login.png';
import { useRouter } from 'next/navigation';
import { IUserAuthLogin, UserAuthActionContext } from '@/providers/authprovider/context';

const LoginContent = () => {
    const router = useRouter();
    const {login} = useContext(UserAuthActionContext);

    const onFinish = (values: any) => {
        const input: IUserAuthLogin = {userNameOrEmailAddress: values.username, password: values.password}
        login(input)
            .then((response) => {
                localStorage.setItem('token', response.result.accessToken);
                localStorage.setItem('userId', response.result.userId.toString());
                router.push('/dashboard');
            })
    }
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
                                onFinish={onFinish}
                            >
                                <Form.Item 
                                    name='username'
                                    rules={[{required:true, message:'Please enter your username!'}]}>
                                    <Input style={{ width: '250px', margin: 'auto', display: 'block' }} placeholder="Username" />
                                </Form.Item>
                                <Form.Item 
                                    name='password'
                                    rules={[{required:true, message:'Please enter your password!'}]}>
                                    <Input style={{ width: '250px', margin: 'auto', display: 'block' }} type="password" placeholder="password" />
                                </Form.Item>
                                <Button htmlType='submit' className={styles.button2}>Log in</Button>
                            </Form>
                            <p>Dont have an account yet? <a style={{ textDecoration: 'none' }} href="/register">Create an account</a></p>
                        </div>
                    </div>
                </div>
            </main>
        )    
}

export default LoginContent