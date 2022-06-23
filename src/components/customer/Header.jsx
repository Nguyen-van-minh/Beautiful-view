import React, { useRef, useEffect, useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import logo from '../../assets/images/Logo1.png'
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { OrderContext } from '../../contexts/OrderContext'
import { CartContext } from '../../contexts/CartContext'
import Search from './Search';
import { useHistory } from 'react-router';

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },

]

const Header = () => {
    const { CartState: { items }, getAllItem } = useContext(CartContext)
    const { OrderState: { orders }, getAllOrder } = useContext(OrderContext)
    const { authState: { user }, logoutUser } = useContext(AuthContext)
    const [count, setCount] = useState(null)
    const history = useHistory()

    useEffect(() => {
        getAllOrder({ userID: user?._id })
        getAllItem({ userId: user?._id })
    }, [user])

    useEffect(() => {
        let count = 0
        orders.map((item) => (
            item.state !== 3 ? count = count + 1 : count = count + 0
        ))
        setCount(count)
    }, [orders])


    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const headerRef = useRef(null)

    useEffect(() => {
        const handle = window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef?.current?.classList.add('shrink')
            } else {
                headerRef?.current?.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll", handle)
        };
    }, []);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const logout = () => {
        logoutUser()
        history.push('/login')
    }

    const handleToCart = () => {
        if (window.confirm('Xin vui lòng đăng nhập để dùng tính năng này!')) {
            history.push('/login')
        }
    }

    return (
        <div className="header" ref={headerRef}>
            <div className="container">

                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>

                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }

                    </div>
                    <div className="header__menu__right">
                        <Search />
                        <div className="header__menu__item header__menu__right__item">
                            {
                                user ?
                                    <Link to='/cart'>
                                        <i className="bx bx-shopping-bag"></i>
                                    </Link>
                                    :
                                    <div onClick={() => handleToCart()}>
                                        <i className="bx bx-shopping-bag"></i>
                                    </div>
                            }

                            {
                                items.length > 0 &&
                                <div className='message' >
                                    {
                                        items.length
                                    }
                                </div>
                            }

                        </div>

                        {

                            user ?
                                <div className="header__menu__item header__menu__right__item">
                                    <div className='message' >
                                        {
                                            count !== 0 ? count : ""
                                        }
                                    </div>
                                    <Link to="/personal">
                                        <i className="bx bx-user"></i>

                                    </Link>
                                    <span style={{ fontSize: 15 }}>{user.username}</span>
                                </div>
                                :
                                <div onClick={() => handleToCart()} className="header__menu__item header__menu__right__item">
                                    <i className="bx bx-user"></i>
                                </div>
                        }


                        {
                            user ? <div className="header__menu__item header__menu__right__item">

                                <LogoutOutlined onClick={logout} style={{ fontSize: '20px' }} />

                            </div>
                                :
                                <div className="header__menu__item header__menu__right__item">
                                    <Link to='/login'>
                                        <LoginOutlined style={{ fontSize: '20px', marginBottom: 17 }} />
                                    </Link>
                                </div>
                        }



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header