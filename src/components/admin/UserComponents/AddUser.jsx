import React, { useState, useContext } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { Input, Button, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { toast } from 'react-toastify';

const AddUser = () => {

    const { addUser } = useContext(UserContext)
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        role: 0
    })
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        resetAddData()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        resetAddData()
    };

    // const history = useHistory()

    const { username, password, confirmPassword, email, role } = registerForm

    const onChangeRegisterForm = event => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

    const register = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            toast.error('🦄 Nhập mật khẩu không chính xác!');
            return
        }
        try {
            await addUser(registerForm)
            toast.success('🦄 Đăng ký thành công!');
            resetAddData()


        } catch (error) {
            console.log(error)
        }
    }

    const resetAddData = () => {
        setRegisterForm({
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            role: 0
        })
    }


    return (
        <div >
            <Button type="primary" onClick={showModal}>
                Thêm người dùng
            </Button>
            <Modal title="Thêm người dùng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <form onSubmit={register} >
                    <div >
                        <label  >Tên tài khoản</label>
                        <Input name='username' placeholder="Nhập tên tài khoản"
                            value={username}
                            onChange={onChangeRegisterForm}
                        />
                    </div>
                    <br />

                    <div >
                        <label  >Mật khẩu</label>
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            name='password'
                            value={password}
                            onChange={onChangeRegisterForm}
                        />
                    </div>
                    <br />

                    <div >
                        <label  >Nhập lại mật khẩu</label>
                        <Input.Password
                            placeholder="Nhập lại mật khẩu"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={onChangeRegisterForm}
                        />
                    </div>
                    <br />

                    <div >
                        <label  >Địa chỉ Email</label>
                        <Input name='email' placeholder="Nhập tên tài khoản"
                            value={email}
                            onChange={onChangeRegisterForm}
                        />
                    </div>
                    <br />

                    <label >Vị trí </label>
                    <select style={{ outline: 'none', border: 'none', marginLeft: 8 }} name='role' onChange={onChangeRegisterForm} value={role}>
                        <option value={0}>Khách hàng</option>
                        <option value={3}>Admin</option>
                    </select>
                    <br />
                    <br />

                    <div >
                        <button type="submit" className='btn-login'><span style={{ marginRight: 20, marginLeft: 20 }}>Thêm người dùng</span></button>
                    </div>
                    <div />

                </form>
            </Modal>

        </div>
    )
}

export default AddUser

