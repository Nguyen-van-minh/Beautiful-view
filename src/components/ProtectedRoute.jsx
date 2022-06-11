import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Spin } from 'antd';
// import NavbarMenu from '../layout/NavbarMenu'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { authLoading, isAuthenticated }
    } = useContext(AuthContext)

    if (authLoading) {
        return (
            <div className='spin'>
                <Spin tip="Loading...">
                </Spin>
            </div>
        )
    }

    return (
        <Route
            {...rest}

            render={props =>
                isAuthenticated ? (
                    <>
                        {/* <NavbarMenu /> */}
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    )
}

export default ProtectedRoute