import React from "react";
import moment from 'moment'
import numberWithCommas from '../../../utils/numberWithCommas'


const NewOrders = (props) => {

    return (
        <div style={{
            background: '#FFFFFF',
            border: 'none',
            borderRadius: '2px',
            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            width: "100%",
        }}>
            <h3 style={{ marginTop: 8, textAlign: 'center', marginBottom: 15 }}>Đơn hàng mới</h3>
            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên người đặt</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data && props.data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {index + 1}
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

                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default NewOrders