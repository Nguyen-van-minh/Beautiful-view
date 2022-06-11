import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { OrderContext } from '../../contexts/OrderContext'
import { CartContext } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify';
import { Button, Input } from 'antd';
import { useHistory } from 'react-router';
import { PayPalButtons } from "@paypal/react-paypal-js";
import UserLocation from "./UserLocation";

const OrderInformation = () => {
    const { CartState: { items }, getAllItem, deleteAllItems } = useContext(CartContext)
    const { authState: { user } } = useContext(AuthContext)
    const { addOrder, updateProductWhenOrder } = useContext(OrderContext)

    const [paidFor, setPaidFor] = useState(false);
    const [validate, setValidate] = useState(false)
    const [error, setError] = useState(null);

    const [newOrder, setNewOrder] = useState({
        userID: user?._id,
        userName: "",
        position: "",
        phoneNumber: "",
        payType: "PayPal",
        total: sumArray(items),
        state: 0,
        description: '',
        Address: [],
        ListProductId: items && items.map(item => item.productId),
        ListProductImg: items && items.map(item => item.img),
        ListProductName: items && items.map(item => item.productName),
        ListProductTotal: items && items.map(item => item.total),
        ListProductColor: items && items.map(item => item.color),
        ListProductSize: items && items.map(item => item.size),
        quantityProduct: items && items.map(item => item.quantity),
        listProductId: items && items.map(item => item.productId)
    })

    const [a, setA] = useState('')
    const [b, setB] = useState('')

    const [data, setdata] = useState([])
    const [city, setCity] = useState([])
    const [district, setDictrict] = useState([])
    const [wards, setWards] = useState([])

    const [cityId, setCityId] = useState(null)
    const [districtId, setDistrictId] = useState(null)
    const [wardsId, setWardsId] = useState(null)

    const { TextArea } = Input;

    function sumArray(mang) {
        let sum = 0;
        for (let i = 0; i < mang.length; i++) {
            const p = mang[i]
            sum += p.total;
        }
        return sum;
    }

    const history = useHistory()

    useEffect(() => {
        const getCity = () => {
            let res = require('../../assets/fake-data/address.json')
            let resCity = res.map((item, index) => ({ value: index, label: item.Name }))
            setdata(res)
            setCity(resCity)
        }
        getAllItem({ userId: user?._id })
        getCity()
    }, [])

    useEffect(() => {
        if (cityId !== null) {
            let districtData = data[cityId].Districts
            setA(data[cityId]?.Name)
            let resDistric = districtData?.map((item, index) => ({ value: index, label: item.Name }))
            setDictrict(resDistric)
            setDistrictId(null)
            setWardsId(null)
            setWards([])
        }
    }, [cityId])

    useEffect(() => {
        if (districtId !== null) {
            let wardsData = data[cityId]?.Districts[districtId.value]?.Wards
            setB(data[cityId]?.Districts[districtId.value].Name)
            let resWards = wardsData?.map((item, index) => ({ value: index, label: item.Name }))
            setWards(resWards)
            setWardsId(null)
        }
        console.log(districtId)
    }, [districtId])

    useEffect(() => {
        if (wardsId !== null) {
            let name = wards[wardsId.value].label
            setNewOrder({ ...newOrder, Address: [a, b, name] })
        }
    }, [wardsId])


    const { userName, position, phoneNumber, description, Address } = newOrder
    const onChangeNewOrder = event => setNewOrder({ ...newOrder, [event.target.name]: event.target.value })

    const check = () => {
        if (userName === "") {
            alert('Vui lòng nhập tên người nhận!')
            return false
        }

        if (phoneNumber === "") {
            alert('Vui lòng nhập số điện thoại người nhận!')
            return false
        }

        if (position === "") {
            alert('Vui lòng nhập địa chỉ!')
            return false
        }

        if (a === '') {
            alert('Vui lòng chọn tỉnh thành!')
            return false
        }
        if (b === '') {
            alert('Vui lòng chọn quận, huyện!')

            return false
        }
        if (Address.length === 0) {
            alert('Vui lòng chọn phường, xã!')
            return false
        }
        return true
    }

    const onSubmitOrder = async event => {
        event.preventDefault()
        const { success } = await addOrder(newOrder)
        await updateProductWhenOrder({ listId: newOrder.listProductId, listQuantity: newOrder.quantityProduct })
        if (success) {
            toast.success('🦄 Đặt hàng thành công!');
            await deleteAllItems(user._id)
            history.push('/')
        }
        else {
            toast.error('🦄 Lỗi');
        }
    }


    const handleApprove = async (orderId) => {
        setPaidFor(true);
        const { success } = await addOrder(newOrder)
        if (success) {
            toast.success('🦄 Đặt hàng thành công!');
            await deleteAllItems(user._id)
            history.push('/')
        }
        else {
            toast.error('🦄 Lỗi');
        }
    };

    const onCheck = () => {
        if (check()) {
            setValidate(true)
        }
        else {
            setValidate(false)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmitOrder} >
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
                        <UserLocation />
                        <div className="form__group field">
                            <input type="text" className="form__field" name="userName" id='userName' value={userName} onChange={onChangeNewOrder} required />
                            <label htmlFor="userName" className="form__label">Họ và tên </label>
                        </div>
                        <div className="form__group field">
                            <input type="text" className="form__field" name="phoneNumber" id='phoneNumber' value={phoneNumber} onChange={onChangeNewOrder} required />
                            <label htmlFor="phoneNumber" className="form__label">Số điện thoại người nhận </label>
                        </div>
                        <div className="form__group field">
                            <input type="text" className="form__field" name="position" id='position' value={position} onChange={onChangeNewOrder} required />
                            <label htmlFor="position" className="form__label">Địa chỉ</label>
                        </div>
                        <br />
                        <Select
                            name="city"
                            placeholder="Chọn Tỉnh/Thành"
                            key={city?.value}
                            onChange={(e) => setCityId(e.value)}
                            options={city ? city : []}
                        />
                        <br />
                        <Select
                            name="district"
                            key={district?.value}
                            placeholder="Quận/Huyện"
                            value={districtId}
                            options={district ? district : []}
                            onChange={(e) => setDistrictId(e)}
                            isDisabled={district.length === 0}
                        />
                        <br />
                        <Select

                            name="wards"
                            placeholder="Phường/Xã"
                            value={wardsId}
                            options={wards ? wards : []}
                            onChange={(e) => setWardsId(e)}
                            isDisabled={wards.length === 0}
                        />
                        <br />
                        <TextArea name='description' value={description} onChange={onChangeNewOrder} rows={4} placeholder="Nội dung miêu tả sản phẩm" />
                    </div>

                    <div style={{ paddingTop: 40, paddingLeft: 40 }} className="col-xs-12 col-sm-5 col-md-5 col-lg-5">

                        <br />
                        {
                            validate ?
                                <>
                                    <h3>Chọn phương thức thanh toán:</h3>
                                    <div className="paypal-button-container">
                                        <PayPalButtons style={{
                                            layout: "horizontal",
                                            height: 48,
                                            shape: "pill"
                                        }}

                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            description: newOrder.description,
                                                            amount: {
                                                                value: Math.round(newOrder.total / 23000)
                                                            }
                                                        }
                                                    ]
                                                });
                                            }}

                                            onApprove={async (data, actions) => {
                                                const order = await actions.order.capture();
                                                console.log("order", order);
                                                handleApprove(data.orderID);
                                            }}

                                            onError={(err) => {
                                                setError(err);
                                                console.error("PayPal Checkout onError", err);
                                            }}

                                            onCancel={() => {
                                                // Display cancel message, modal or redirect user to cancel page or back to cart
                                            }}
                                        />
                                    </div>

                                    <button onClick={() => setNewOrder({ ...newOrder, payType: "COD" })} className="button-onsubmit" type="submit">
                                        <span style={{ margin: 15, fontSize: 20 }}>Thanh toán khi nhận hàng</span>
                                    </button>
                                </>
                                :
                                <div>
                                    <Button onClick={() => onCheck()} type="primary">Xác nhận</Button>
                                </div>
                        }

                    </div>

                    <br />
                </div>
            </form>
        </div>
    )
}

export default OrderInformation