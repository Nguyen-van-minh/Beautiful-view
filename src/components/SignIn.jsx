import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { toast } from 'react-toastify';
// import { useHistory } from 'react-router';



const SignIn = () => {
    const { loginUser } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // const history = useHistory()

    const { username, password } = loginForm

    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)

            if (loginData.success) {
                // history.push('/')
                toast.success('🦄 Đăng nhập thành công!');
            } else {
                toast.error('🦄 Đăng nhập không thành công!');
            }
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div>
            <form onSubmit={login} >
                <div>
                    <label >Tên tài khoản</label>
                    <Input name='username' placeholder="Nhập tên tài khoản" value={username} onChange={onChangeLoginForm} />
                </div>
                <br />
                <div >
                    <label >Mật khẩu</label>
                    <Input.Password
                        placeholder="Nhập mật khẩu"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        name='password'
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <br />
                <br />
                <div >
                    <button type="submit" className='btn-login'><span style={{ marginRight: 20, marginLeft: 20 }}>Đăng nhập</span></button>
                </div>
                <div />
                <div >
                    Quyên mật khẩu?
                </div>
            </form>
        </div>


    )
}

export default SignIn

