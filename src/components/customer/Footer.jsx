import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '../Grid'
import logo from '../../assets/images/Logo1.png'
import { InformationContext } from "../../contexts/InformationContext";

const footerAboutLinks = [
    {
        display: "Giới thiệu",
        path: "/about"
    },
    {
        display: "Liên hệ",
        path: "/about"
    },
    {
        display: "Tuyển dụng",
        path: "/about"
    },
    {
        display: "Tin tức",
        path: "/about"
    },
    {
        display: "Hệ thống cửa hàng",
        path: "/about"
    }
]

const footerCustomerLinks = [
    {
        display: "Chính sách đổi trả",
        path: "/about"
    },
    {
        display: "Chính sách bảo hành",
        path: "/about"
    },
    {
        display: "Chính sách hoàn tiền",
        path: "/about"
    }
]
const Footer = () => {
    const { InformationState: { informations }, getInformation } = useContext(InformationContext)
    useEffect(() => {
        getInformation()
    }, [])
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                            Tổng đài hỗ trợ
                        </div>
                        {
                            informations && informations?.map((item, index) => (
                                <div key={index} className="footer__content">
                                    <p>
                                        Liên hệ đặt hàng <strong>{item.sdtLienHe}</strong>
                                    </p>
                                    <p>
                                        Thắc mắc đơn hàng <strong>{item.sdtThacMac}</strong>
                                    </p>
                                    <p>
                                        Góp ý, khiếu nại <strong>{item.sdtKhieuNai}</strong>
                                    </p>
                                </div>
                            ))
                        }

                    </div>
                    <div>
                        <div className="footer__title">
                            Về Shop
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Chăm sóc khách hàng
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        {
                            informations && informations?.map((item, index) => (
                                <p key={index}>
                                    {item.introduce}
                                </p>
                            ))
                        }

                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer