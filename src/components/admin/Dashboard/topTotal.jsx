import React, { useEffect, useState } from "react";
import numberWithCommas from '../../../utils/numberWithCommas'

const TopTotal = (props) => {
    const [data, setData] = useState(props.data)
    useEffect(() => {
        setData(props.data)
    }, [props.data])


    return (
        <div>
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="cartTopTotal" style={{ display: "flex", alignItems: 'center' }}>
                        <i style={{ fontSize: '30px', color: 'blue' }} className="bx bx-money"></i>
                        <div className="toptotalText">
                            <span>Tổng thu</span>
                            <span>{numberWithCommas(data.totalMoney)}đ</span>
                        </div>
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="cartTopTotal" style={{ display: "flex", alignItems: 'center' }}>
                        <i style={{ fontSize: '30px', color: 'orange' }} className="bx bxs-shopping-bags"></i>
                        <div className="toptotalText">
                            <span> Tổng đơn</span>
                            <span>{data.totalOrders}</span>
                        </div>
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="cartTopTotal" style={{ display: "flex", alignItems: 'center' }}>
                        <i style={{ fontSize: '30px', color: 'green' }} className="bx bxs-basket"></i>
                        <div className="toptotalText">
                            <span>Tổng sản phẩm</span>
                            <span>{data.totalProducts}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopTotal