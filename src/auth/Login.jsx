import React from 'react'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router'
import { Spin } from 'antd';
import Header from '../components/customer/Header'
import Footer from '../components/customer/Footer'

const Login = ({ authRoute }) => {
    const {
        authState: { authLoading, isCustomer, isAuthenticated }
    } = useContext(AuthContext)

    let body

    if (authLoading)
        body = (
            <div className='spin'>
                <tr>
                    <td>
                        <Spin tip="Loading...">

                        </Spin>
                    </td>
                </tr>
            </div>
        )
    else if (isAuthenticated) return <Redirect to='/admin' />
    else if (isCustomer) return <Redirect to='/' />
    else
        body = (
            <>
                {authRoute === 'login' && <SignIn />}
                {authRoute === 'register' && <SignUp />}
            </>
        )
    return (
        <div>
            <Header />
            <div className="container" style={{ padding: 0 }}>
                <div className="main backgroun">
                    <div >
                        <div className='form-container box_Shadow'>
                            <Link style={{ fontSize: 20, marginRight: 80 }} to='/login' >Đăng nhập</Link>
                            <Link style={{ fontSize: 20 }} to='/register' >Đăng ký</Link>
                            <br />
                            <br />
                            {body}
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </div>

    )
}

export default Login

