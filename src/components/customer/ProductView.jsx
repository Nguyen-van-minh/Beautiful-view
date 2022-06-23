import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Button from './Button'
import numberWithCommas from '../../utils/numberWithCommas'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext'
import { OrderContext } from '../../contexts/OrderContext'
import { useHistory } from 'react-router';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

const ProductView = props => {

    const { addToCart } = useContext(CartContext)
    const { setItem } = useContext(OrderContext)
    const { authState: { user } } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [isShirt, setIsShirt] = useState(true)

    let product = props.product
    let images = props.images

    if (product === undefined) product = {
        name: "",
        price: '',
        image: null,
        categoryID: "",
        color: [],
        discount: "",
        size: [],
        description: ""
    }

    if (images === undefined) {
        images = []
    }

    const history = useHistory()
    const [previewImg, setPreviewImg] = useState(product.image)
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const [color, setColor] = useState(undefined)
    const [size, setSize] = useState(undefined)
    const [quantity, setQuantity] = useState(1)
    const [suportValue, setSuportValue] = useState({
        suportHeight: 0,
        suportKg: 0,
    })
    const [message, setMessage] = useState('Chưa có size phù hợp')

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        if (product.name.includes('Thắt lưng') || product.name.includes('Ví')) {
            setIsShirt(false)
        }
        else {
            setIsShirt(true)
        }
        setPreviewImg(product.image)
        setQuantity(1)
        setColor(undefined)
        setSize(undefined)
        setSuportValue({
            suportHeight: 0,
            suportKg: 0,
        })
    }, [product])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    // initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const check = () => {
        if (!user) {
            toast.error('Bạn chưa đăng nhập!');
            return false
        }
        if (product.quantity === 0) {
            toast.error('Sản phẩm đã hết!');
            return false
        }
        if (color === undefined) {
            toast.error('Vui lòng chọn màu sắc!');
            return false
        }

        if (size === undefined && isShirt) {
            toast.error('Vui lòng chọn kích cỡ!');
            return false
        }

        return true
    }

    const addItem = async () => {
        if (check()) {
            let newItem = {
                productId: product._id,
                userId: user._id,
                price: product.discount,
                quantity: quantity,
                total: product.discount * quantity,
                img: product.image,
                productName: product.name,
                color: color,
                size: size,
            }
            if (await addToCart(newItem)) {
                toast.success('Thêm sản phẩm thành công!');
            } else {
                toast.error('Thêm sản phẩm không thành công!');
            }
        }
    }

    const handleSetItem = () => {
        if (check()) {
            let itemData = {
                productId: product._id,
                userId: user._id,
                price: product.discount,
                quantity: quantity,
                total: product.discount * quantity,
                img: product.image,
                productName: product.name,
                color: color,
                size: size,
            }
            setItem(itemData)
            history.push('/OneOrder')
        }
    }


    useEffect(() => {
        if (140 < suportValue.suportHeight && 45 < suportValue.suportKg) {
            if (suportValue.suportHeight < 165) {
                if (suportValue.suportKg < 55) {
                    setMessage('M')
                }
                else if (suportValue.suportKg < 70) {
                    setMessage('L')
                }
                else if (suportValue.suportKg < 73) {
                    setMessage('XL')
                }
                else if (suportValue.suportKg < 76) {
                    setMessage('2XL')
                }
                else if (suportValue.suportKg > 76) {
                    setMessage('3XL')
                }
            }
            else if (suportValue.suportHeight < 166) {
                if (suportValue.suportKg < 50) {
                    setMessage('M')
                }
                else if (suportValue.suportKg < 70) {
                    setMessage('L')
                }
                else if (suportValue.suportKg < 73) {
                    setMessage('XL')
                }
                else if (suportValue.suportKg < 76) {
                    setMessage('2XL')
                }
                else if (suportValue.suportKg > 76) {
                    setMessage('3XL')
                }
            }
            else if (suportValue.suportHeight < 175) {
                if (suportValue.suportKg < 65) {
                    setMessage('L')
                }
                else if (suportValue.suportKg < 73) {
                    setMessage('XL')
                }
                else if (suportValue.suportKg < 76) {
                    setMessage('2XL')
                }
                else if (suportValue.suportKg > 76) {
                    setMessage('3XL')
                }
            }
            else if (suportValue.suportHeight < 178) {
                if (suportValue.suportKg < 73) {
                    setMessage('XL')
                }
                else if (suportValue.suportKg < 76) {
                    setMessage('2XL')
                }
                else if (suportValue.suportKg > 76) {
                    setMessage('3XL')
                }
            }
            else if (177 < suportValue.suportHeight) {
                if (suportValue.suportKg < 50) {
                    setMessage('Chưa có size phù hợp')
                }
                else if (suportValue.suportKg < 60) {
                    setMessage('2XL')
                }
                else if (suportValue.suportKg > 73) {
                    setMessage('3XL')
                }
            }
        }
        else {
            setMessage('Chưa có size phù hợp')
        }
    }, [suportValue])

    const onChangeSuport = (name) => (e) => {
        setSuportValue({ ...suportValue, [name]: e.target.value });
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <div className="product">
            <div className="product__images">

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                    <div className="product__images__main">
                        <img src={previewImg} alt="" />
                    </div>

                    <div style={{ marginLeft: 50 }}>
                        <Slider {...settings}>
                            {
                                images.map((item, index) => (
                                    <div key={index} onClick={() => setPreviewImg(item.image)}>
                                        <img src={item.image} alt='loading...' />
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>

                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.name}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.discount)}
                        <span className="product-card__price__old">
                            <del>{numberWithCommas(product.price)}</del>
                        </span>
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.color.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`} onClick={() => setColor(item)}>
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    isShirt && <div className="product__info__item">
                        <div className="product__info__item__title">
                            Gợi ý chọn size
                        </div>
                        <div style={{ position: 'relative' }}>

                            <span onClick={() => setShow(!show)} className="product__info__item__suport">Gợi ý {show ? <i className='bx bx-up-arrow'></i> : <i className='bx bx-down-arrow'></i>}</span>



                            <span className="product__info__item__suport" onClick={showModal} >Bảng size chuẩn</span>
                            <Modal title="Hướng dẫn chọn size chuẩn" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Size</th>
                                            <th>Chiều cao</th>
                                            <th>Cân nặng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>M</td>
                                            <td>Dưới 1m69</td>
                                            <td>Dưới 65kg</td>
                                        </tr>
                                        <tr>
                                            <td>L</td>
                                            <td>1m70 - 1m74</td>
                                            <td>66-70kg</td>
                                        </tr>
                                        <tr>
                                            <td>XL</td>
                                            <td>1m74 - 1m76</td>
                                            <td>70-73kg</td>
                                        </tr>
                                        <tr>
                                            <td>2XL</td>
                                            <td>1m74 - 1m77</td>
                                            <td>73-76kg</td>
                                        </tr>
                                        <tr>
                                            <td>3XL</td>
                                            <td>Trên 1m77</td>
                                            <td>76-80kg</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>Người mẫu : 70kg - 1m70 size chuẩn XL</p>
                                <p>Hơn 98% khách hàng đã chọn đúng size theo bảng chọn này.</p>
                            </Modal>


                            <div className={show ? 'size-chart' : 'size-chart__none'}>
                                <div>
                                    <p>Chiều cao</p>
                                    <div>
                                        <input onChange={onChangeSuport("suportHeight")} value={suportValue.suportHeight} name='suportHeight' type='range' min='140' max='185' />
                                    </div>
                                    <div>
                                        {suportValue.suportHeight} Cm
                                    </div>
                                </div>
                                <div>
                                    <p>Cân nặng</p>
                                    <div>
                                        <input onChange={onChangeSuport("suportKg")} value={suportValue.suportKg} name='suportKg' type='range' min='45' max='80' />
                                    </div>
                                    <div>
                                        {suportValue.suportKg} Kg
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Gợi ý bạn
                                        <span>{message}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {
                    isShirt && <div className="product__info__item">
                        <div className="product__info__item__title">
                            Kích cỡ
                        </div>
                        <div className="product__info__item__list">
                            {
                                product.size.map((item, index) => (
                                    <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`} onClick={() => setSize(item)}>
                                        <span className="product__info__item__list__item__size">
                                            {item}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }


                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => addItem()} >thêm vào giỏ</Button>

                    <Button onClick={() => handleSetItem()}>mua ngay</Button>


                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)