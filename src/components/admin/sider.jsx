import React from "react";
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { UnorderedListOutlined } from '@ant-design/icons';

const Sider = () => {
    const { logoutUser } = useContext(AuthContext)
    const logout = () => logoutUser()

    const [showMenu, setShowMenu] = useState(false)



    return (
        <header className="page-header">
            <nav>
                <button onClick={() => setShowMenu(!showMenu)} className="toggle-mob-menu" aria-expanded="false" aria-label="open menu">
                    <div width="20" height="20" aria-hidden="true">
                        <UnorderedListOutlined style={{ fontSize: '26px' }} />
                    </div>
                </button>
                <ul className={showMenu ? "admin-menu" : "admin-menu admin-menu-hidden"}>
                    <li className="menu-heading">
                        <h3>Admin</h3>
                    </li>
                    <li>
                        <Link to='/admin'>
                            Bảng thông tin
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/user'>
                            Quản lý người dùng
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/category'>
                            Quản lý danh mục
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/products'>
                            Quản lý sản phẩm
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/order'>
                            Quản lý đơn hàng
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/slider'>
                            Quản lý slider
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/information'>
                            Quản lý thông tin
                        </Link>
                    </li>
                    <li onClick={logout} style={{ marginTop: 100, padding: 10 }} className="Button-logout-admin">

                        <span style={{ padding: 10, display: 'flex' }}><i style={{ fontSize: 20 }} className="bx bx-power-off"></i> Đăng xuất</span>

                    </li>
                </ul>
            </nav>
        </header>

    )
}

export default Sider;