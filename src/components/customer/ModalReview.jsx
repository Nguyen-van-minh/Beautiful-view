import React, { useState, useContext } from 'react';
import { Modal, Button, Input, Rate } from 'antd';
import { ReviewContext } from "../../contexts/ReviewContext";
import { AuthContext } from '../../contexts/AuthContext';
import { ProductContext } from '../../contexts/ProductContext';
import { ImageContext } from '../../contexts/ImageContext';
import { toast } from 'react-toastify';



const AddReview = (props) => {
    const { addReview } = useContext(ReviewContext)
    const { findProduct } = useContext(ProductContext)
    const { getAllImages } = useContext(ImageContext)
    const { authState: { user } } = useContext(AuthContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newReview, setNewReview] = useState({
        comment: '',
        productId: props.productId,
        star: 5,
        userName: user?.username
    })

    const showModal = () => {
        setIsModalVisible(true);
        setNewReview({
            comment: '',
            productId: props.productId,
            star: 5,
            userName: user?.username
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { comment } = newReview

    const onChangeNewReview = event => setNewReview({ ...newReview, [event.target.name]: event.target.value })

    const onSubmit = async event => {
        await findProduct(props.productId)
        await getAllImages({ productID: props.productId })
        event.preventDefault()
        const { success, message } = await addReview(newReview)
        if (success) {
            toast.success('🦄 Đánh giá sản phẩm thành công!');
            handleCancel()
        }
        else {
            toast.error(`🦄 ${message}!`);
        }
    }



    const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
    const handleRate = (value) => {
        setNewReview({
            ...newReview,
            star: value
        })
    }


    return (
        <div style={{ marginTop: 8 }}>
            <Button type="primary" onClick={showModal}>
                Nhận xét
            </Button>
            <Modal title="Đánh giá sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div >
                    <span>
                        <Rate onChange={handleRate} defaultValue={newReview.star} />
                        {newReview.star ? <span className="ant-rate-text">{desc[newReview.star - 1]}</span> : ''}
                    </span>
                    <br />
                    <br />
                    <label>Bình luận:</label>
                    <Input name='comment' value={comment} onChange={onChangeNewReview} />
                    <Button type='primary' style={{ marginTop: 20 }} onClick={onSubmit}>Thêm bình luận</Button>
                </div>
            </Modal>
        </div>
    );
};

export default AddReview;