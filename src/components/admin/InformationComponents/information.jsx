import React, { useContext, useEffect } from "react";
import AdminSearch from "../AdminSearch";
import { InformationContext } from "../../../contexts/InformationContext";
import { Spin } from 'antd';
import { Link } from "react-router-dom";
import Button from "antd-button-color";
import { PlusOutlined } from '@ant-design/icons';



const InformationComponent = () => {
    const { InformationState: { informations, informationLoading },
        getInformation, findInformation
    } = useContext(InformationContext)


    useEffect(() => getInformation(), [])

    let body = null

    if (informationLoading) {
        body = (
            <div>

                <Spin />

            </div>
        )
    }
    else if (informations?.length === 0) {
        body = (
            <h3>
                Chưa có thông tin
            </h3>
        )
    }

    const choose = async (id) => {
        await findInformation(id)
    }



    return (

        <section className="page-content">
            <AdminSearch name="Quản lý thông tin" />
            <section className="grid">
                <div>
                    {
                        informations.length > 0 ?
                            <Button onClick={() => choose(informations[0]._id)} className="box_Shadow" type="warning">
                                <Link to='/admin/information/editInformation' >
                                    <span style={{ margin: '0 0 0 5px' }}>Sửa thông tin</span>
                                </Link>
                            </Button> :
                            <Button className="box_Shadow" type="info">
                                <Link to='/admin/information/addInformation' >
                                    <PlusOutlined style={{ fontSize: '20px' }} />
                                    <span style={{ margin: '0 0 0 5px' }}>Thêm thông tin</span>
                                </Link>
                            </Button>
                    }

                </div>
                <div>
                    {
                        informations && informations?.map((item, index) => (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div>
                                            <div>
                                                <span className='orderDetails__item__title'>SĐT Liên hệ:</span> {item.sdtLienHe}
                                            </div>
                                            <div>
                                                <span className='orderDetails__item__title'>SĐT Khiếu nại: </span>{item.sdtKhieuNai}
                                            </div>
                                            <div>
                                                <span className='orderDetails__item__title'>SĐT Thắc mắc:</span> {item.sdtThacMac}
                                            </div>
                                            <div>
                                                <span className='orderDetails__item__title'>Thông tin giới thiệu: </span>{item.introduce}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div style={{ display: 'flex', marginTop: 30, flexDirection: 'column' }}>
                                            <span className='orderDetails__item__title'>Baner image:</span>
                                            <img alt='Baner img' src={item.bannerImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>

            </section>
            {body}
        </section>


    )
}

export default InformationComponent;