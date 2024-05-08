import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { BankAccountActionContext, ICreateBankAccount } from "@/providers/bankaccount/context";
import AddIcon from '@mui/icons-material/Add';
import { CategoryActionContext, CategoryStateContext, ICategory } from "@/providers/category/context";
import { BudgetActionContext, BudgetStateContext, IAddBudget } from "@/providers/budget/context";

const BudgetModal = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { allExpenseCategories } = useContext(CategoryStateContext);
    const {getAllExpenseCategories} = useContext(CategoryActionContext);
    const {addBudget, getBudgetsForUser} = useContext(BudgetActionContext);
    const {budgets} = useContext(BudgetStateContext)

    useEffect(() => { 
        getAllExpenseCategories();
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

    const userIdString = localStorage.getItem('userId');
    let userId: number;
    if (userIdString !== null) {
        userId = parseInt(userIdString);
    }

    const onFinish = (values: any) => {
        const input: IAddBudget = { userId: userId, categoryId: values.category, amount: values.amount }
        addBudget(input).then(() => {
            getBudgetsForUser()
            handleOk();
        });

    }

    return (
        <main className="main">
            <Button onClick={showModal}>
                <AddIcon/>
            </Button>
            <Modal
                title="Add Budget"
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
                            {allExpenseCategories?.map((category: ICategory) => (
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
                    <Button htmlType="submit" style={{ margin: 'auto', display: 'block' }}>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </main>
    );
};

export default BudgetModal;