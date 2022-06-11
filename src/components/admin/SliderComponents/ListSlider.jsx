import { SliderContext } from "../../../contexts/SliderContext";
import { useContext, useEffect, useState } from "react";
import { Spin } from 'antd';
import Grid from "../../Grid";
import Section, { SectionBody } from '../../Section'
import AdminSearch from '../AdminSearch'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Button from "antd-button-color";
import { PlusOutlined } from '@ant-design/icons';


const ListSlider = () => {

    const { sliderState: { sliders, sliderLoading },
        getAllSlider, deleteSlider, findSlider
    } = useContext(SliderContext)
    const [loading, setLoading] = useState(false)


    // get all products
    useEffect(() => {
        getAllSlider();
    }, [])



    const handleDelete = async (id) => {
        if (window.confirm('Bạn muốn xóa slider này!')) {
            setLoading(true)
            const { success } = await deleteSlider(id)
            if (success) {
                toast.success('🦄 Xoá thành công!');
                setLoading(false)
            }
            else {
                toast.error('🦄 Xoá không thành công!');
            }
        }

    }

    const chooseSlider = async (sliderID) => {
        findSlider(sliderID)
    }

    let body = null

    if (sliderLoading) {
        body = (
            <div>

                <Spin tip="Loading...">
                </Spin>

            </div>
        )
    }
    else if (sliders?.length === 0) {
        body = (
            <h3>
                <Button className="box_Shadow" type="info">
                    <Link to='/admin/slider/addSlider' >
                        <PlusOutlined style={{ fontSize: '20px' }} />
                        <span style={{ margin: '0 0 0 5px' }}>Thêm</span>
                    </Link>

                </Button>
                <br />
                <br />
                <br />
                <span>Chưa có slider</span>

            </h3>
        )
    }
    else {
        body = (
            <Section>
                <div>
                    <Button className="box_Shadow" type="info">
                        <Link to='/admin/slider/addSlider' >
                            <PlusOutlined style={{ fontSize: '20px' }} />
                            <span style={{ margin: '0 0 0 5px' }}>Thêm</span>
                        </Link>

                    </Button>
                    {loading && <Spin />}
                </div>


                <SectionBody>

                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {sliders?.map(slider => (
                            <div key={slider._id} className="product-card-admin">
                                <div className="product-card-admin__image">
                                    <img src={slider.img} alt="" />
                                    <img src={slider.img} alt="sản phẩm" />
                                </div>
                                <h3 className="product-card-admin__name">{slider.title}</h3>

                                <div className="flex-center">
                                    <Button onClick={() => handleDelete(slider._id)} type="danger" >Delete</Button>
                                    <Link to='/admin/slider/editSlider'>
                                        <Button onClick={() => chooseSlider(slider._id)} type="warning">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        )
    }

    return (
        <section className="page-content">
            <AdminSearch name="Quản lý slider" />
            <section className="grid">
                {body}
            </section>

        </section>
    )
}

export default ListSlider
