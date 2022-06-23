import React, { useEffect, useContext } from 'react'
import Header from '../../components/customer/Header'
import Footer from '../../components/customer/Footer'
import { OrderContext } from '../../contexts/OrderContext'
import Button from "antd-button-color";
import numberWithCommas from '../../utils/numberWithCommas'
import moment from 'moment'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import AddReview from '../../components/customer/ModalReview';
import { ProductContext } from "../../contexts/ProductContext";
import { ImageContext } from '../../contexts/ImageContext';

const OrderDetailsCustomer = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { OrderState: { order } } = useContext(OrderContext)
    const { findProduct } = useContext(ProductContext)
    const { getAllImages } = useContext(ImageContext)

    const chooseProduct = async (productID) => {
        await findProduct(productID)
        await getAllImages({ productID: productID })
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="main">

                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <Link to='/personal'>
                                <Button type='warning'>
                                    <ArrowLeftOutlined style={{ fontSize: 20, margin: "0px 0px 5px 0px" }} />
                                    <span style={{ fontSize: 15 }}>Quay lại</span>
                                </Button>
                            </Link>

                            <div className='orderDetails box_Shadow'>
                                <h3 className='orderDetails__heading'>Thông tin đơn hàng</h3>
                                <div className='orderDetails__container'>
                                    <div className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Trạng thái:</span>
                                        {order.state === 0 && <span style={{ color: 'orange' }}>Đang chờ xác nhận</span>}
                                        {order.state === 1 && <span >Đang giao</span>}
                                        {order.state === 2 && <span style={{ color: '#00d100' }}>Đã giao</span>}
                                        {order.state === 3 && <span style={{ color: "red" }}>Đã hủy</span>}
                                    </div>
                                    <div className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Thời gian đặt hàng:</span>
                                        {moment(order.createdAt).format('DD/MM/YY  hh:mm')}
                                    </div>
                                    <div className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Tên người nhận:</span>
                                        {order.userName}
                                    </div>
                                    <div className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Số điện thoại:</span>
                                        {order.phoneNumber}
                                    </div>
                                    <div className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Địa chỉ:</span>
                                        {order.position} - {order.Address[2]} - {order.Address[1]} - {order.Address[0]}
                                    </div>
                                    <div className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Tổng tiền:</span>
                                        {numberWithCommas(order.total)}đ
                                    </div>
                                    <div className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Ghi chú:</span>
                                        {order.description !== "" ? order.description : 'Không có ghi chú'}
                                    </div>
                                    <div style={{ paddingBottom: 20 }} className='orderDetails__item'>
                                        <span className='orderDetails__item__title'>Thanh toán:</span>
                                        <span>{order.payType} </span>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <h3>Sản phẩm:</h3>
                            {
                                order?.ListProductImg.map((item, index) => (
                                    <div key={index} className="cart__item">
                                        <Link to={`/product-details`}>
                                            <div onClick={() => chooseProduct(order.ListProductId[index])} className="cart__item__image">
                                                <img src={item} alt="" />
                                            </div>
                                        </Link>



                                        <div className="cart__item__info">

                                            <div className="cart__item__info__name">

                                                {/* <Link to={`/catalog/${item.slug}`}> */}
                                                {`${order.ListProductName[index]} - ${order.ListProductColor[index]} - ${order.ListProductSize[index]}`}
                                                {/* </Link> */}
                                                <br />
                                                {order.state === 2 && <AddReview productId={order.ListProductId[index]} />}
                                            </div>
                                            <div className="cart__item__info__price">
                                                {numberWithCommas(order.ListProductTotal[index])}đ
                                            </div>
                                            <div className="cart__item__info__quantity">

                                                <div className="product__info__item__quantity">

                                                    <div className="product__info__item__quantity__input">
                                                        {order.quantityProduct[index]}
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrderDetailsCustomer

