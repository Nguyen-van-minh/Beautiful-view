import React, { useState, useContext } from 'react';
import { Modal, Input } from 'antd';
import { CategoryContext } from "../../../contexts/CategoryContext";
import { toast } from 'react-toastify';
import { EditOutlined } from '@ant-design/icons'
import Button from "antd-button-color";

const EditCategory = (props) => {
    const { updateCategory } = useContext(CategoryContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [update, setUpdate] = useState({
        _id: props.dataParent._id,
        name: props.dataParent.name
    })

    const showModal = () => {
        setIsModalVisible(true);
        setUpdate({
            _id: props.dataParent._id,
            name: props.dataParent.name
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
        resetAddData()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { name } = update

    const onChangeUpdateCategory = event => setUpdate({ ...update, [event.target.name]: event.target.value })

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await updateCategory(update)
        if (success) {
            resetAddData()
            toast.success('🦄 Sửa thành công!');
        }
        else {
            toast.error(`🦄 ${message}!`);
        }

    }

    const resetAddData = () => {
        setUpdate({ _id: '', name: '' })
        setIsModalVisible(false);
    }


    return (
        <>
            <Button ghost type="warning" onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal title="Sửa danh mục" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <form style={{ position: 'relative', marginBottom: 30 }} onSubmit={onSubmit}>
                    <Input name='name' value={name} onChange={onChangeUpdateCategory} />

                    <Button style={{ position: 'absolute', right: 0, top: 45 }} type='primary' htmlType='submit'>Sửa</Button>
                </form>
            </Modal>
        </>
    );
};

export default EditCategory;