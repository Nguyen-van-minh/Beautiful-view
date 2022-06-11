import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/customer/Button'
import Header from '../../components/customer/Header'
import Footer from '../../components/customer/Footer'
import { CartContext } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext'
import numberWithCommas from '../../utils/numberWithCommas'
import { Pagination } from 'antd';

const Cart = () => {

    const { CartState: { items }, getAllItem, updateCart, deleteItem } = useContext(CartContext)
    const { authState: { user } } = useContext(AuthContext)
    const [currentPage, setCurentPage] = useState(1)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(3)
    const perLoad = 3

    useEffect(() => {
        getAllItem({ userId: user?._id })
    }, [items])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    function sumArray(mang) {
        let sum = 0;
        for (let i = 0; i < mang.length; i++) {
            const p = mang[i]
            sum += p.total;
        }
        return sum;
    }


    const add = async (item) => {
        await updateCart({
            _id: item._id,
            quantity: item.quantity + 1,
            total: item.total + item.price
        })
    }

    const minus = async (item) => {
        if (item.quantity > 1) {
            await updateCart({
                _id: item._id,
                quantity: item.quantity - 1,
                total: item.total - item.price
            })
        }
        else {
            if (window.confirm('Bạn muốn xóa mặt hàng này!')) {
                await deleteItem(item._id)
            }
        }
    }

    const removeCartItem = async (itemId) => {
        if (window.confirm('Bạn muốn xóa mặt hàng này!')) {
            await deleteItem(itemId)
        }
    }

    const handleChange = (page) => {
        setCurentPage(page)
        const start = (page - 1) * perLoad
        const end = page * perLoad
        setStart(start)
        setEnd(end)
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="main">
                    <div className="cart">
                        <div className="cart__info">
                            <div className="cart__info__txt">
                                <p>
                                    Bạn đang có {items.length} sản phẩm trong giỏ hàng
                                </p>
                                <div className="cart__info__txt__price">
                                    <span>Thành tiền:</span> <span>{numberWithCommas(sumArray(items))}</span>
                                </div>
                            </div>
                            <div className="cart__info__btn">
                                {
                                    items.length > 0 &&
                                    <div>
                                        <Link to="/order">
                                            <Button size="block">

                                                Đặt hàng

                                            </Button>
                                        </Link>
                                    </div>

                                }
                                <div>
                                    <Link to="/catalog">
                                        <Button size="block">
                                            Tiếp tục mua hàng
                                        </Button>
                                    </Link>
                                </div>


                            </div>
                        </div>
                        <div className="cart__list">

                            {
                                items.slice(start, end).map((item, index) => (
                                    <div key={index} className="cart__item">
                                        <div className="cart__item__image">
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className="cart__item__info">
                                            <div className="cart__item__info__name">
                                                {/* <Link to={`/catalog/${item.slug}`}> */}
                                                {`${item.productName} - ${item.color} - ${item.size}`}
                                                {/* </Link> */}
                                            </div>
                                            <div className="cart__item__info__price">
                                                {numberWithCommas(item.total)}
                                            </div>
                                            <div className="cart__item__info__quantity">
                                                <div className="product__info__item__quantity">
                                                    <button className="product__info__item__quantity__btn" onClick={() => minus(item)}>
                                                        <i className="bx bx-minus"></i>
                                                    </button>
                                                    <div className="product__info__item__quantity__input">
                                                        {item.quantity}
                                                    </div>
                                                    <div className="product__info__item__quantity__btn" onClick={() => add(item)}>
                                                        <i className="bx bx-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart__item__del">
                                                <i className='bx bx-trash' onClick={() => removeCartItem(item._id)}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                items.length > 0 &&
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Pagination
                                        defaultCurrent={1}
                                        pageSize={perLoad}
                                        total={items.length}
                                        current={currentPage}
                                        onChange={handleChange}
                                    />
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart