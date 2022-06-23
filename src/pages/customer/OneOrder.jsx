import React, { useEffect } from 'react'
import Header from '../../components/customer/Header'
import Footer from '../../components/customer/Footer'
import OneOrderInformation from '../../components/customer/OneOrderInformation'
import OneOrderListProduct from '../../components/customer/OneOrderListProduct'


const OneOrder = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className="main">

                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">

                            <OneOrderListProduct />
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
                            <OneOrderInformation />
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default OneOrder