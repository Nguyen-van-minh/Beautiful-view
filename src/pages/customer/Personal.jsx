import React, { useEffect, useContext, useState } from 'react'
import Header from '../../components/customer/Header'
import Footer from '../../components/customer/Footer'
import { AuthContext } from '../../contexts/AuthContext'
import { OrderContext } from '../../contexts/OrderContext'
import Button from "antd-button-color";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import moment from 'moment'
import { Radio, Pagination } from 'antd';
import ModalEditUser from '../../components/customer/ModalEditUser'
import ModalEditPassword from '../../components/customer/ModalEditPassword'


const Personal = () => {

    const { OrderState: { orders }, getAllOrder, findOrder, updateOrder, deleteOrder } = useContext(OrderContext)
    const { authState: { user } } = useContext(AuthContext)
    const [filterOrder, setFilterOrder] = useState([])
    const [value, setValue] = useState(4);
    const [currentPage, setCurentPage] = useState(1)
    const [dataPage, setDataPage] = useState([])


    const perLoad = 6


    useEffect(() => {
        getAllOrder({ userID: user?._id })
    }, [user])

    useEffect(() => {
        setFilterOrder(orders)
    }, [orders])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const chooseOrder = async (orderId) => {
        findOrder(orderId)
    }

    const handleStatus = async (id) => {
        if (window.confirm('Bạn muốn hủy đơn hàng này?')) {
            const { success } = await updateOrder({
                _id: id,
                state: 3
            })
            if (success) {
                toast.success('🦄 Đã hủy đơn hàng!');
            }
        }
        else {
            return
        }
    }


    const onChange = e => {
        setValue(e.target.value);
    };

    useEffect(() => {
        let temp = orders
        if (value === 4) {
            temp = orders
        }
        else {
            temp = temp.filter(e => e.state === value)
        }
        setFilterOrder(temp)
        setCurentPage(1)
    }, [value])

    useEffect(() => {
        setDataPage(filterOrder.slice(0, perLoad))
    }, [filterOrder])



    useEffect(() => {
        const getItems = () => {
            const start = (currentPage - 1) * perLoad
            const end = currentPage * perLoad
            setDataPage(filterOrder.slice(start, end))
        }
        getItems()
    }, [currentPage])

    const handleChange = (page) => {
        setCurentPage(page)
    }

    const handleDeleteOrder = (id) => {
        if (window.confirm('Bạn muốn xóa đơn này!')) {
            deleteOrder(id)
            setValue(4)
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="main">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">

                            <div className="container-profile box_Shadow">
                                <div className='container-profile__upper'>

                                </div>
                                <div className="container-profile__icon box_Shadow">
                                    <i style={{ fontSize: 70 }} className="bx bx-user"></i>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                                    <h4 className="container-profile__name">Tên: {user?.username}</h4>
                                    <p className="container-profile__about">
                                        Emai: <span>{user?.email}</span>
                                    </p>
                                    <div>
                                        Vị trí: {user?.role === 0 ? <span>Khách hàng</span> : <span>Admin</span>}
                                    </div>
                                    <div className='container-profile__button'>
                                        <ModalEditUser dataParent={user}></ModalEditUser>

                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <ModalEditPassword dataParent={user}></ModalEditPassword>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                            <h3>Đơn hàng của bạn: &nbsp;
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={4}>Tất cả đơn hàng</Radio>
                                    <Radio value={0}>Đang chờ xác nhận</Radio>
                                    <Radio value={1}>Đang giao</Radio>
                                    <Radio value={2}>Đã giao</Radio>
                                    <Radio value={3}>Đã hủy</Radio>
                                </Radio.Group>
                            </h3>
                            <table className="table" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Thanh toán</th>
                                        <th scope="col">Ngày đặt</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders && orders?.length > 0 ? dataPage.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {(currentPage * perLoad - perLoad) + (index + 1)}
                                                </td>
                                                <td>
                                                    {item.payType === "PayPal" || item.payType === "VNPAY"
                                                        ?
                                                        <span style={{ color: "#00d100" }}>{item.payType} - Đã thanh toán</span>
                                                        :
                                                        <span style={{ color: 'orange' }}>Thanh toán khi nhận hàng</span>}
                                                </td>
                                                <td>
                                                    {moment(item.createdAt).format('DD/MM/YY h:mm')}
                                                </td>
                                                <td>
                                                    {item.state === 0 && <span style={{ color: "orange" }}>Đang chờ xác nhận</span>}
                                                    {item.state === 1 && <span style={{ color: "orange" }}>Đang giao</span>}
                                                    {item.state === 2 && <span style={{ color: "#00d100" }}>Đã giao hàng</span>}
                                                    {item.state === 3 && <span style={{ color: 'red' }}>Đã hủy</span>}
                                                </td>
                                                <td>
                                                    <Link to='/orderDetailsCustomer'>
                                                        <Button onClick={() => chooseOrder(item._id)} type="primary">
                                                            Chi tiết
                                                        </Button>
                                                    </Link>
                                                </td>
                                                {
                                                    item.state === 0 ?
                                                        <td>
                                                            <Button onClick={() => handleStatus(item._id)} type="danger">
                                                                Hủy đơn
                                                            </Button>
                                                        </td>
                                                        :
                                                        <td>
                                                            {
                                                                item.state === 3 &&
                                                                <Button onClick={() => handleDeleteOrder(item._id)} type="danger">
                                                                    Xóa
                                                                </Button>
                                                            }

                                                        </td>
                                                }

                                            </tr>

                                        ))
                                            :
                                            <tr>
                                                <td>Hiện tại bạn chưa có đơn hàng nào</td>
                                            </tr>
                                    }

                                </tbody>
                            </table>
                            {
                                orders?.length > 0 && <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Pagination
                                        defaultCurrent={1}
                                        pageSize={perLoad}
                                        total={filterOrder.length}
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

export default Personal
