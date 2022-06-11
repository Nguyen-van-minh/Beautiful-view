import React, { useState, useContext } from 'react';
import { Modal, Button, Input } from 'antd';
import { CategoryContext } from "../../../contexts/CategoryContext";
import { toast } from 'react-toastify';

const AddCategory = () => {
    const { addCategory } = useContext(CategoryContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: ''
    })

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { name } = newCategory

    const onChangeNewCategory = event => setNewCategory({ [event.target.name]: event.target.value })

    const onSubmit = async event => {

        event.preventDefault()
        const { success, message } = await addCategory(newCategory)
        if (success) {
            resetAddData()
            toast.success('🦄 Thêm thành công!');
        }
        else {
            toast.error(`🦄 ${message}!`);
        }

    }

    const resetAddData = () => {
        setNewCategory({ name: '' })
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Thêm danh mục
            </Button>
            <Modal title="Thêm danh mục" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <form style={{ position: 'relative', marginBottom: 30 }} onSubmit={onSubmit}>
                    <Input name='name' value={name} onChange={onChangeNewCategory} />
                    <Button style={{ position: 'absolute', right: 0, top: 45 }} type='primary' htmlType='submit'>Thêm</Button>
                </form>
            </Modal>
        </div>
    );
};

export default AddCategory;