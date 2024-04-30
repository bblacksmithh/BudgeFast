import React, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { BankAccountActionContext, BankAccountStateContext, IBankAccount } from "@/providers/bankaccount/context";
import { CategoryActionContext, CategoryStateContext, ICategory } from "@/providers/category/context";
import { ICreateTransaction, TransactionActionContext, TransactionStateContext } from "@/providers/transactions/context";

const IncomeModal = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getAllBankAccountsForUser } = useContext(BankAccountActionContext);
    const { getAllIncomeCategories } = useContext(CategoryActionContext);
    const { createTransaction } = useContext(TransactionActionContext);
    const { allIncomeCategories } = useContext(CategoryStateContext);
    const { allAccounts } = useContext(BankAccountStateContext);

    useEffect(() => {
        getAllBankAccountsForUser();
        getAllIncomeCategories();
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        const input: ICreateTransaction = { userId: 1, bankAccountId: values.account, transactionCategoryId: values.category, amount: values.amount, description: values.description, transactionDate: values.date, isExpense: false }
        console.log('values', values);
        createTransaction(input).then(() => {
            handleOk();
        });

    }

    return (
        <main className="main">
            <Button onClick={showModal}>
                Log Income
            </Button>
            <Modal
                title="Log Income"
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
                        label="Category"
                        name='category'>
                        <Select
                            showSearch
                        >
                            {allIncomeCategories?.map((category: ICategory) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.categoryName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Amount"
                        name='amount'>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name='description'>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name='date'>
                        <DatePicker></DatePicker>
                    </Form.Item>
                    <Form.Item
                        label='Account'
                        name='account'>
                        <Select
                            showSearch
                        >
                            {allAccounts?.map((account: IBankAccount) => (
                                <Select.Option key={account.id} value={account.id}>
                                    {account.accountName} - R {account.balance.toFixed(2)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button htmlType="submit" style={{ margin: 'auto', display: 'block' }}>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </main>
    );
};

export default IncomeModal;