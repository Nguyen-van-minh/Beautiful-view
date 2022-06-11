import React, { useState, useContext, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { UserContext } from '../../../contexts/UserContext'
import { toast } from 'react-toastify';
import { EditOutlined } from '@ant-design/icons'
import Button from "antd-button-color";

const EditUser = (props) => {
    const { updateUser } = useContext(UserContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [update, setUpdate] = useState({
        _id: props.dataParent._id,
        username: props.dataParent.username,
        email: props.dataParent.email,
        password: null,
        role: props.dataParent.role
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

    const { username, email, role, password } = update

    const onChangeUpdateUser = event => setUpdate({ ...update, [event.target.name]: event.target.value })

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await updateUser(update)
        if (success) {
            toast.success('🦄 thành công!');
            setUpdate({ ...update, password: null })
            setIsModalVisible(false);
        }
        else {
            toast.error(`🦄 ${message}!`);
        }

    }



    return (
        <>
            <Button ghost type="warning" onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal title="Sửa người dùng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <form style={{ position: 'relative', marginBottom: 30 }} onSubmit={onSubmit}>
                    <div >
                        <label  >Tên tài khoản</label>
                        <Input name='username' value={username} onChange={onChangeUpdateUser} />
                    </div>
                    <br />
                    <div >
                        <label  >Địa chỉ Email</label>
                        <Input name='email' value={email} onChange={onChangeUpdateUser} />
                    </div>
                    <br />
                    <div >
                        <label  >Đổi mật khẩu mới:</label>
                        <Input name='password' value={password} onChange={onChangeUpdateUser} />
                    </div>

                    <br />
                    <label  >Vị trí</label>
                    <select style={{ outline: 'none', border: 'none', marginLeft: 8 }} name='role' onChange={onChangeUpdateUser} value={role}>
                        <option value={0}>Khách hàng</option>
                        <option value={3}>Admin</option>
                    </select>
                    <br />
                    <br />

                    <Button type='primary' htmlType='submit'>Sửa</Button>
                </form>
            </Modal>
        </>
    );
};

export default EditUser;