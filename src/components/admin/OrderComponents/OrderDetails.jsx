import React, { useContext, useEffect } from "react";
import AdminSearch from "../AdminSearch";
import { OrderContext } from "../../../contexts/OrderContext";
import { CartContext } from '../../../contexts/CartContext'
import numberWithCommas from '../../../utils/numberWithCommas'
import { Radio } from 'antd';
import Button from "antd-button-color";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import moment from 'moment'


const OrderDetails = () => {
    const { OrderState: { order }, updateOrder } = useContext(OrderContext)
    const { CartState: { items }, getAllItem } = useContext(CartContext)
    const [value, setValue] = React.useState(order.state);

    useEffect(() => {
        order && getAllItem({ userId: order?.userID })
    }, [])

    const onChange = e => {
        setValue(e.target.value);
    };

    const handleStatus = async () => {
        const { success } = order && await updateOrder({
            _id: order._id,
            state: value
        })
        if (success) {
            toast.success('🦄 Cập nhật đơn hàng thành công!');
        }
    }



    return (
        <section className="page-content">
            <AdminSearch name="Chi tiết đơn hàng" />
            <section className="grid">
                {
                    order.state === 3 || order.state === 2 ?
                        null
                        :
                        <div>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={0}>Đang chờ xác nhận</Radio>
                                <Radio value={1}>Đang giao</Radio>
                                <Radio value={2}>Đã giao</Radio>
                            </Radio.Group>
                            <Button onClick={() => handleStatus()} type='primary'>Cập nhật</Button>
                        </div>
                }

                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div><span className='orderDetails__item__title'>Thanh toán:</span> {order.payType === "PayPal" ? <span style={{ color: "#00d100" }}>"PayPal" - Đã thanh toán</span> : <span style={{ color: "orange" }}>COD - Chưa thanh toán</span>}  </div>
                        <div><span className='orderDetails__item__title'>Trạng thái:</span>
                            {order.state === 0 && <span style={{ color: "orange" }}>Đang chờ xác nhận</span>}
                            {order.state === 1 && <span style={{ color: "orange" }}>Đang giao</span>}
                            {order.state === 2 && <span style={{ color: "#00d100" }}>Đã giao hàng</span>}
                            {order.state === 3 && <span style={{ color: 'red' }}>Đã hủy!</span>}
                        </div>
                        <div><span className='orderDetails__item__title'>Thời gian đặt hàng:</span> {moment(order.createdAt).format('DD/MM/YY  hh:mm')}</div>
                        <div><span className='orderDetails__item__title'>Tên người nhận:</span> {order.userName}</div>
                        <div><span className='orderDetails__item__title'>Số điện thoại:</span> {order.phoneNumber}</div>
                        <div><span className='orderDetails__item__title'>Địa chỉ:</span> {order.position} - {order.Address[2]} - {order.Address[1]} - {order.Address[0]}</div>
                        <div><span className='orderDetails__item__title'>Tổng tiền:</span> {numberWithCommas(order.total)}  đ</div>
                        <div><span className='orderDetails__item__title'>Ghi chú:</span> {order.description}</div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {
                            order?.ListProductImg.map((item, index) => (
                                <div key={index} className="cart__item">
                                    <div className="cart__item__image">
                                        <img src={item} alt="" />
                                    </div>
                                    <div className="cart__item__info">
                                        <div className="cart__item__info__name">
                                            {/* <Link to={`/catalog/${item.slug}`}> */}
                                            {`${order.ListProductName[index]} - ${order.ListProductColor[index]} - ${order.ListProductSize[index]}`}
                                            {/* </Link> */}
                                        </div>
                                        <div className="cart__item__info__price">
                                            {numberWithCommas(order.ListProductTotal[index])}
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
                <div>
                    <Link to="/admin/order">
                        <Button type="primary">
                            Quay lại
                        </Button>
                    </Link>
                </div>
            </section>

        </section>
    )
}

export default OrderDetails;