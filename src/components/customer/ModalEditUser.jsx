import React, { useState, useContext } from 'react';
import { Modal, Input } from 'antd';
import { UserContext } from '../../contexts/UserContext'
import { toast } from 'react-toastify';
import Button from "antd-button-color";

const ModalEditUser = (props) => {
    const { updateInformation } = useContext(UserContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [update, setUpdate] = useState({
        _id: props.dataParent?._id,
        username: props.dataParent?.username,
        email: props.dataParent?.email,
    })

    const showModal = () => {
        setIsModalVisible(true);
        setUpdate({
            _id: props.dataParent?._id,
            username: props.dataParent?.username,
            email: props.dataParent?.email,
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const check = () => {
        if (!props.dataParent?._id) {
            toast.error('Bạn chưa đăng nhập!');
            return false
        }
        if (!username) {
            toast.error('Không được để trống tên!');
            return false
        }
        if (!email) {
            toast.error('Không được để trống email!');
            return false
        }
        return true
    }

    const { username, email } = update

    const onChangeUpdateUser = event => setUpdate({ ...update, [event.target.name]: event.target.value })

    const onSubmit = async event => {
        event.preventDefault()
        if (check()) {
            const { success, message } = await updateInformation(update)
            if (success) {
                toast.success('🦄Sửa thông tin thành công!');
                setIsModalVisible(false);
            }
            else {
                toast.error(`🦄 ${message}!`);
            }
        }
    }


    return (
        <>
            <Button type="warning" onClick={showModal}>
                Sửa thông tin cá nhân _<i style={{ fontSize: 17 }} className='bx bx-pencil'></i>
            </Button>
            <Modal title="Sửa thông tin cá nhân" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ position: 'relative', marginBottom: 30 }} >
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
                    <br />

                    <Button type='primary' onClick={onSubmit}>Sửa</Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalEditUser;