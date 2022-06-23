import React, { useContext, useEffect, useState } from "react";
import AdminSearch from "../AdminSearch";
import { OrderContext } from "../../../contexts/OrderContext";
import { Spin, Pagination, Radio } from 'antd';
import Button from "antd-button-color";
import { Link } from "react-router-dom";
import moment from 'moment'
import numberWithCommas from '../../../utils/numberWithCommas'


const ListOrder = () => {
    const { OrderState: { orders, orderLoading }, getAll, findOrder, deleteOrder } = useContext(OrderContext)
    const [value, setValue] = useState(4);
    const [currentPage, setCurentPage] = useState(1)
    const [dataFilter, setDataFilter] = useState([])
    const [data, setData] = useState([])
    const perLoad = 8

    useEffect(() => getAll(), [])

    useEffect(() => {
        setDataFilter(orders)
    }, [orders])

    const chooseOrder = async (orderId) => {
        findOrder(orderId)
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
        setDataFilter(temp)
        setCurentPage(1)
    }, [value])

    useEffect(() => {
        setData(dataFilter.slice(0, perLoad))
    }, [dataFilter])

    useEffect(() => {
        const getItems = () => {
            const start = (currentPage - 1) * perLoad
            const end = currentPage * perLoad
            setData(dataFilter.slice(start, end))
        }
        getItems()
    }, [currentPage])

    const handleChange = (page) => {
        setCurentPage(page)
    }

    let body = null

    if (orderLoading) {
        body = (
            <>
                <div>
                    <Spin />
                </div>
            </>
        )
    }
    else if (orders?.length === 0) {
        body = (
            <h3>
                Không có danh hóa đơn nào
            </h3>
        )
    }

    const handleDeleteOrder = (id) => {
        if (window.confirm('Bạn muốn xóa đơn này!')) {
            deleteOrder(id)
            setValue(4)
        }
    }

    return (
        <section className="page-content">
            <AdminSearch name="Quản lý đơn hàng" />
            <section className="grid">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={4}>Tất cả đơn hàng</Radio>
                    <Radio value={0}>Đang chờ xác nhận</Radio>
                    <Radio value={1}>Đang giao</Radio>
                    <Radio value={2}>Đã giao</Radio>
                    <Radio value={3}>Đã hủy</Radio>
                </Radio.Group>
                <table className="table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên người đặt</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders && data.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {(currentPage * perLoad - perLoad) + (index + 1)}
                                    </td>
                                    <td>
                                        {item.userName}
                                    </td>
                                    <td>
                                        {numberWithCommas(item.total)}đ
                                    </td>
                                    <td>
                                        {moment(item.createdAt).format('DD/MM/YY  hh:mm')}
                                    </td>
                                    <td>
                                        {item.state === 0 && <span style={{ color: "orange" }}>Đang chờ xác nhận</span>}
                                        {item.state === 1 && <span style={{ color: "orange" }}>Đang giao</span>}
                                        {item.state === 2 && <span style={{ color: "#00d100" }}>'Đã giao hàng'</span>}
                                        {item.state === 3 && <span style={{ color: 'red' }}>Đã hủy!</span>}
                                    </td>
                                    <td>
                                        <Link to='/admin/order/order-details'>
                                            <Button onClick={() => chooseOrder(item._id)} type="primary">
                                                Chi tiết
                                            </Button>
                                        </Link>
                                    </td>
                                    <td>

                                        <Button onClick={() => handleDeleteOrder(item._id)} type="danger">
                                            Xóa
                                        </Button>

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        defaultCurrent={1}
                        pageSize={perLoad}
                        total={dataFilter.length}
                        current={currentPage}
                        onChange={handleChange}
                    />
                </div>
            </section>
            {body}
        </section>
    )
}

export default ListOrder;