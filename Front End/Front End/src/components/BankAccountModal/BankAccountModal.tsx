import React, { useContext, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { BankAccountActionContext, ICreateBankAccount } from "@/providers/bankaccount/context";

const BankAccountModal = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getAllBankAccountsForUser } = useContext(BankAccountActionContext);
    const { createBankAccount } = useContext(BankAccountActionContext);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const userIdString = localStorage.getItem('userId');
    let userId: number;
    if (userIdString !== null) {
        userId = parseInt(userIdString);
    }

    const onFinish = (values: any) => {
        const input: ICreateBankAccount = { userId: userId, accountName: values.name, accountType: values.type, balance: values.balance }
        console.log('values', values);
        createBankAccount(input).then(() => {
            getAllBankAccountsForUser()
            handleOk();
        });

    }

    return (
        <main className="main">
            <Button onClick={showModal}>
                Add Bank Account
            </Button>
            <Modal
                title="Add Bank Account"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    layout="horizontal"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item 
                        label="Account Name"
                        name='name'>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Account Type"
                        name='type'>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Balance"
                        name='balance'>
                        <Input />
                    </Form.Item>
                    <Button htmlType="submit" style={{ margin: 'auto', display: 'block' }}>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </main>
    );
};

export default BankAccountModal;