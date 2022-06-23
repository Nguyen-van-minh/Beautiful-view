import React, { useState, useContext } from "react";
import { Rate } from 'antd';
import moment from 'moment';
import { Pagination } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ReviewContext } from "../../contexts/ReviewContext";
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify';

const Review = (props) => {
    const { authState: { user } } = useContext(AuthContext)
    const { deleteReview } = useContext(ReviewContext)
    const [currentPageReview, setCurentPageReview] = useState(1)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)
    const perLoad = 4


    const handleChange = (page) => {
        setCurentPageReview(page)
        const start = (page - 1) * perLoad
        const end = page * perLoad
        setStart(start)
        setEnd(end)
    }

    function medium(mang) {
        let num = 0;
        for (let i = 0; i < mang.length; i++) {
            let item = mang[i]
            num += item.star;
        }
        let poit = Math.round((num / mang.length) * 100) / 100
        return poit;
    }

    const handleDelete = (id) => {
        if (window.confirm('Bạn muốn xóa bình luận này?')) {
            const success = deleteReview(id)
            console.log(success)
            if (success) {
                toast.success('🦄 Xóa bình luận thành công!');
            }
            else {
                toast.error('Lỗi!');
            }

        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <div className="box_Shadow">
                            <div style={{ margin: '0px 0px 50px 0px', paddingTop: '30px', paddingLeft: 30, borderBottom: '1px solid #ffcc00', backgroundColor: '#f9ede5' }}>
                                <h3>Đánh giá sản phẩm: {
                                    props.dataReview.length === 0 ?
                                        <span style={{ color: '#ee4d2d', fontSize: '20px' }}>Chưa có đánh giá</span>
                                        :

                                        <span style={{ color: '#ee4d2d', fontSize: '20px' }}>
                                            <span style={{ color: 'black', fontSize: '13px', marginRight: 5 }}>({props.dataReview?.length})</span>
                                            {medium(props.dataReview)} / 5
                                            <i className="bx bxs-star"></i>
                                        </span>

                                }
                                </h3>
                            </div>
                            {
                                props.dataReview?.slice(start, end).map((item, index) => (
                                    <div style={{ marginBottom: 20, borderBottom: '1px solid #ccc', marginLeft: '9%' }} key={index}>
                                        <div >
                                            <div style={{ display: 'flex', marginBottom: 10 }}>
                                                <div style={{ backgroundColor: '#d8d8d8', borderRadius: '50%', width: '40px', height: '40px', position: 'relative', margin: '10px 0 0 10px' }}>
                                                    <i style={{
                                                        fontSize: 25, position: 'absolute',
                                                        left: '19%',
                                                        top: '17%'
                                                    }} className="bx bx-user"></i>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                                                    <div>
                                                        <span>{item.userName}</span>
                                                        {
                                                            user?.role &&
                                                            <DeleteOutlined style={{
                                                                marginBottom: "5px",
                                                                marginLeft: "10px",
                                                                color: "red",
                                                                cursor: "pointer"
                                                            }}
                                                                onClick={() => handleDelete(item._id)}
                                                            />
                                                        }

                                                    </div>

                                                    <span>
                                                        <Rate disabled defaultValue={item.star} />
                                                    </span>
                                                    <span style={{
                                                        marginTop: '0.75rem',
                                                        fontSize: '.9rem',
                                                        color: 'rgba(0,0,0,.54)'
                                                    }}>
                                                        {moment(item.createdAt).format('DD/MM/YY  hh:mm')}
                                                    </span>
                                                    <div>
                                                        {item.comment}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                            {
                                props.dataReview?.length > 0 &&
                                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
                                    <Pagination
                                        defaultCurrent={1}
                                        pageSize={perLoad}
                                        total={props.dataReview?.length}
                                        current={currentPageReview}
                                        onChange={handleChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review