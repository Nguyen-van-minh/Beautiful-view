import React, { useEffect } from 'react'
import Header from '../../components/customer/Header'
import Footer from '../../components/customer/Footer'
import OrderInformation from '../../components/customer/OrderInformation'
import OrderListProduct from '../../components/customer/OrderListProduct'


const Order = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className="main">

                    <div className="row">
                        <div style={{ paddingTop: 40, paddingRight: 40 }} className="col-xs-12 col-sm-4 col-md-4 col-lg-4">

                            <OrderListProduct />
                        </div>
                        <div style={{ paddingLeft: 40, paddingRight: 40 }} className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                            <OrderInformation />
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Order