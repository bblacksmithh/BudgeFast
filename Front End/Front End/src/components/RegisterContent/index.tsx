import React, { useContext } from 'react';
import styles from './Styles/style.module.css'
import Image from 'next/image';
import { Form, Input, Button } from 'antd';
import loginImage from '../../../public/login.png';
import { IUserAuthLogin, IUserCreate, UserAuthActionContext } from '@/providers/authprovider/context';
import { useRouter } from 'next/navigation';

const RegisterContent: React.FC = () => {
    const router = useRouter();
    const {create, login} = useContext(UserAuthActionContext)

    const onFinish = (values: any) => {
        const input: IUserCreate = {userName: values.username, password: values.password, name: 'user', surname: 'user', emailAddress: values.email, isActive: true}
        create(input)
            .then(() => {
                const loginDetails: IUserAuthLogin = {userNameOrEmailAddress: values.username, password: values.password}
                login(loginDetails)
                    .then((response) => {
                        localStorage.setItem('token', response.result.accessToken);
                        localStorage.setItem('userId', response.result.userId.toString());
                        router.push('/dashboard');
                    })
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
                        <p>Create an account to get started</p>
                        <Form
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name='username'>
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                >
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                >
                                <Input style={{ width: '250px', margin: 'auto', display: 'block' }} type="password" placeholder="Password" />
                            </Form.Item>
                            <Button htmlType='submit' className={styles.button2}>Register</Button>
                        </Form>
                        <p>Already have an account? <a style={{ textDecoration: 'none' }} href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RegisterContent;