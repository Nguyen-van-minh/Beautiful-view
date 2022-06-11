import React, { useContext, useEffect, useState } from 'react'
import Sider from '../../components/admin/sider'
import AdminSearch from '../../components/admin/AdminSearch'
import TopTotal from '../../components/admin/Dashboard/topTotal'
import NewOrders from '../../components/admin/Dashboard/newOrders'
import Chart from '../../components/admin/Dashboard/chart'
import { OrderContext } from '../../contexts/OrderContext'
import { ProductContext } from '../../contexts/ProductContext'


const Dashboard = () => {
    const { OrderState: { orders }, getAll } = useContext(OrderContext)
    const { productState: { products }, getAllProducts } = useContext(ProductContext)
    const [dataTopTotal, setDataTopTotal] = useState({
        totalMoney: orders && sumArray(orders),
        totalProducts: products && products.length,
        totalOrders: orders && orders.length
    })

    useEffect(() => {
        setDataTopTotal({
            totalMoney: orders && sumArray(orders),
            totalProducts: products && products.length,
            totalOrders: orders && orders.length
        })
    }, [orders, products])

    function sumArray(mang) {
        let sum = 0;
        for (let i = 0; i < mang.length; i++) {
            const p = mang[i]
            sum += p.total;
        }
        return sum;
    }

    useEffect(() => {
        getAll()
        getAllProducts()
    }, [])

    return (
        <>
            <Sider />
            <section className="page-content">
                <AdminSearch name="Bảng thông tin" />
                <section className="grid">
                    <TopTotal data={dataTopTotal} />
                    <Chart />
                    <NewOrders data={orders.slice(0, 5)} />
                </section>
            </section>
        </>
    )
}

export default Dashboard

