import React, { useState, useContext } from 'react';
import { Modal, Input } from 'antd';
import { UserContext } from '../../contexts/UserContext'
import { toast } from 'react-toastify';
import Button from "antd-button-color";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const ModalEditPassword = (props) => {
    const { updatePass } = useContext(UserContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [update, setUpdate] = useState({
        _id: props.dataParent?._id,
        currentPass: null,
        newPass: null
    })

    const showModal = () => {
        setIsModalVisible(true);
        setUpdate({
            _id: props.dataParent?._id,
            currentPass: null,
            newPass: null
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setUpdate({ ...update, currentPass: null, newPass: null })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setUpdate({ ...update, currentPass: null, newPass: null })
    };

    const check = () => {
        if (!props.dataParent?._id) {
            toast.error('Bạn chưa đăng nhập!');
            return false
        }
        if (!currentPass) {
            toast.error('Vui lòng nhập mật khẩu cũ!');
            return false
        }
        if (!newPass) {
            toast.error('Vui lòng nhập mật mới!');
            return false
        }
        return true
    }

    const { currentPass, newPass } = update

    const onChangeUpdateUser = event => setUpdate({ ...update, [event.target.name]: event.target.value })

    const onSubmit = async () => {
        if (check()) {
            const { success } = await updatePass(update)
            if (success) {
                toast.success('Đổi mật khẩu thành công!');
            }
            else {
                toast.error('Đổi mật khẩu không thành công!');
            }
        }
    }


    return (
        <>
            <Button type="danger" onClick={showModal}>
                Đổi mật khẩu _<i style={{ fontSize: 17 }} className='bx bx-pencil'></i>
            </Button>
            <Modal title="Đổi mật khẩu" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ position: 'relative', marginBottom: 30 }} >
                    <div >
                        <label  >Mật khẩu cũ:</label>
                        <Input.Password
                            placeholder="Mật khẩu cũ"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            name='currentPass'
                            value={currentPass}
                            onChange={onChangeUpdateUser}
                        />
                    </div>
                    <br />
                    <div >
                        <label  >Mật khẩu mới:</label>
                        <Input.Password
                            placeholder="Mật khẩu mới"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            name='newPass'
                            value={newPass}
                            onChange={onChangeUpdateUser}
                        />
                    </div>
                    <br />
                    <br />
                    <Button type='primary' onClick={onSubmit}>Sửa</Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalEditPassword;