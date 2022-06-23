import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, Spin } from 'antd';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { CategoryContext } from "../../../contexts/CategoryContext";
import { ProductContext } from '../../../contexts/ProductContext';
import { toast } from 'react-toastify';
import { ImageContext } from '../../../contexts/ImageContext';
import { useHistory } from 'react-router';
import { UploadOutlined } from '@ant-design/icons';
import Grid from "../../Grid";

const EditProductComponent = () => {
    const { CategoryState: { categorys }, getAllCategory } = useContext(CategoryContext)
    const { productState: { product }, updateProduct } = useContext(ProductContext)
    const { imageState: { images }, addImage, deleteImage } = useContext(ImageContext)
    const [mainPreviewImage, setMainPreviewImage] = useState(product.image)
    const [isLoading, setIsLoading] = useState(false)


    const [newProduct, setNewProduct] = useState({
        _id: product._id,
        name: product.name,
        categoryID: product.categoryID,
        price: product.price,
        discount: 100 - ((product.discount / product.price) * 100),
        quantity: product.quantity,
        description: product.description,
        image: product.image
    });
    const [previewImage, setPreviewImage] = useState(product.image)
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(product.color)
    const [size, setSize] = useState(product.size)

    useEffect(() => {
        getAllCategory()
    }, [])



    const onChangeNewProduct = (name) => (e) => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
        if (name === "image") {
            handlePreview(e)
        }
        setNewProduct({ ...newProduct, [name]: value });
    };


    const { TextArea } = Input;



    const openPreviewImage = (url) => {
        if (!previewImage) return;
        setPreviewImage(url)
        setIsOpen(true)
    }

    const handlePreview = (e) => {
        let file = URL.createObjectURL(e.target.files[0])
        setMainPreviewImage(file)
    }

    useEffect(() => {
        return () => {
            mainPreviewImage && URL.revokeObjectURL(mainPreviewImage)
        }
    }, [mainPreviewImage])

    const history = useHistory()

    const onSubmitProduct = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", newProduct.image);
        formData.append("name", newProduct.name);
        formData.append("categoryID", newProduct.categoryID);
        formData.append("price", newProduct.price);
        formData.append("discount", newProduct.discount);
        formData.append("description", newProduct.description);
        formData.append("quantity", newProduct.quantity);
        formData.append("color", JSON.stringify(color));
        formData.append("size", JSON.stringify(size));
        setIsLoading(true)
        const { success, message } = await updateProduct(newProduct._id, formData)
        if (success) {
            resetAddData()
            toast.success('🦄 Sửa thành công!');
            history.push('/admin/products')
        }
        else {
            toast.error(`🦄 ${message}!`);
        }
    }


    const resetAddData = () => {
        setIsLoading(false)
    }

    const submitNewImage = async event => {
        let a = event.target.files[0]
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", a);
        formData.append("productID", product._id)
        const { success } = await addImage(formData)
        if (success) {
            resetAddData()
            toast.success('🦄 Thêm anh thành công!');
        }
        else {
            toast.error('🦄 Lỗi');
        }
    }

    const handleCheck = (e) => {
        const isCheck = color.includes(e.target.value)
        setColor(prev => {
            if (isCheck) {
                return color.filter(item => item !== e.target.value)

            }
            else {
                return [...prev, e.target.value]
            }
        })

    }


    const handleCheckSize = (e) => {
        const isCheckSize = size.includes(e.target.value)
        setSize(prev => {
            if (isCheckSize) {
                return size.filter(item => item !== e.target.value)

            }
            else {
                return [...prev, e.target.value]
            }
        })
    }


    return (
        <>
            <div >
                {isLoading ? <div>

                    <Spin />

                </div> : 'Sửa sản phẩm'}

                <form onSubmit={onSubmitProduct} style={{ position: 'relative', marginBottom: 30 }} >

                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Tên sản phẩm" name="name" id='name' value={newProduct.name} onChange={onChangeNewProduct("name")} required />
                        <label htmlFor="name" className="form__label">Tên sản phẩm </label>
                    </div>
                    <br />
                    <div className="form__group field">
                        <label htmlFor="quantity" className="form__label">Số lượng </label>
                        <input id='quantity' type='number' className="form__field" name='quantity' value={newProduct.quantity} onChange={onChangeNewProduct("quantity")} placeholder='Số lượng' />
                    </div>
                    <br />
                    <div className="form__group field">
                        <label htmlFor='price' className="form__label">Giá </label>
                        <input id='price' type='number' className="form__field" name='price' value={newProduct.price} onChange={onChangeNewProduct("price")} style={{ width: '30%' }} placeholder='Giá VND' />
                    </div>
                    <br />
                    <div className="form__group field">
                        <label htmlFor='discount' className="form__label">Giảm giá </label>
                        <input id='discount' type='number' className="form__field" name='discount' min="0" max="99" value={newProduct.discount} onChange={onChangeNewProduct("discount")} style={{ width: '30%' }} placeholder='Giảm %' />
                        <span style={{ fontSize: 20 }}>%</span>
                    </div>
                    <br />
                    <div className="form__group field">
                        <label className="form__label">Danh mục </label>
                        <br />
                        <select style={{ width: '70%' }} onChange={onChangeNewProduct('categoryID')}
                            className="form-select"
                            value={newProduct.categoryID}
                            aria-label="Default select example">
                            {
                                categorys.map((item, index) => (
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <br />


                    <div className="form__group field">
                        <label className="form__label">Chọn màu cho sản phẩm</label>
                    </div>
                    <div className='input-color-grup'>
                        <div>
                            <input className='input-color' checked={color.includes('white')} type="checkbox" id="white" name="white" value="white" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="white">Trắng</label>
                        </div>

                        <div>
                            <input className='input-color' checked={color.includes('pink')} type="checkbox" id="pink" name="pink" value="pink" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="pink">Hồng</label>
                        </div>

                        <div>
                            <input className='input-color' checked={color.includes('black')} type="checkbox" id="black" name="black" value="black" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="black">Đen</label>
                        </div>

                        <div>
                            <input className='input-color' checked={color.includes('yellow')} type="checkbox" id="yellow" name="yellow" value="yellow" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="yellow">Vàng</label>
                        </div>

                        <div>
                            <input className='input-color' checked={color.includes('orange')} type="checkbox" id="orange" name="orange" value="orange" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="orange">Cam</label>
                        </div>

                        <div>
                            <input className='input-color' checked={color.includes('blue')} type="checkbox" id="blue" name="blue" value="blue" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="blue">Xanh dương</label>
                        </div>
                        <div>
                            <input className='input-color' type="checkbox" id="brown" name="brown" value="brown" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="brown">Nâu</label>
                        </div>
                        <div>
                            <input className='input-color' type="checkbox" id="red" name="red" value="red" onChange={(e) => handleCheck(e)} />
                            <label htmlFor="red">Đỏ</label>
                        </div>
                    </div>

                    <br />

                    <div className="form__group field">
                        <label className="form__label">Chọn size cho sản phẩm</label>
                    </div>
                    <div className='input-color-grup'>
                        <div>
                            <input className='input-color' checked={size.includes('M')} type="checkbox" id="M" name="M" value="M" onChange={(e) => handleCheckSize(e)} />
                            <label htmlFor="M">M</label>
                        </div>

                        <div>
                            <input className='input-color' checked={size.includes('L')} type="checkbox" id="L" name="L" value="L" onChange={(e) => handleCheckSize(e)} />
                            <label htmlFor="L">L</label>
                        </div>

                        <div>
                            <input className='input-color' checked={size.includes('XL')} type="checkbox" id="XL" name="XL" value="XL" onChange={(e) => handleCheckSize(e)} />
                            <label htmlFor="XL">XL</label>
                        </div>

                        <div>
                            <input className='input-color' checked={size.includes('2XL')} type="checkbox" id="2XL" name="2XL" value="2XL" onChange={(e) => handleCheckSize(e)} />
                            <label htmlFor="2XL">2XL</label>
                        </div>

                        <div>
                            <input className='input-color' checked={size.includes('3XL')} type="checkbox" id="3XL" name="3XL" value="3XL" onChange={(e) => handleCheckSize(e)} />
                            <label htmlFor="3XL">3XL</label>
                        </div>
                    </div>


                    <br />
                    <div>
                        <label className='lable-upload box_Shadow' id='lable' htmlFor='image' >
                            <span style={{ padding: 20 }}><UploadOutlined style={{ fontSize: '25px' }} /> Tải ảnh lên</span>
                        </label>
                        <input
                            id="image"
                            className="form-control"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={onChangeNewProduct("image")}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        {
                            mainPreviewImage && (<img src={mainPreviewImage} onClick={() => openPreviewImage(mainPreviewImage)} alt="" width="15%" height="20%" style={{ marginRight: 30 }} />)
                        }
                        <TextArea name='description' value={newProduct.description} onChange={onChangeNewProduct("description")} rows={4} placeholder="Miêu tả" maxLength={6} />
                    </div>

                    {/* ============================================================================================================================ */}

                    <div>
                        <label style={{ marginTop: 60 }} className='lable-upload box_Shadow' id='lable' htmlFor='imageSupport' >
                            <span style={{ padding: 20 }}><UploadOutlined style={{ fontSize: '25px' }} /> Tải ảnh phụ cho sản phẩm</span>
                        </label>

                        <input
                            id="imageSupport"
                            className="form-control"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={submitNewImage}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                        />

                        <div className='cart-images-support' style={{ margin: 0 }}>
                            <Grid
                                col={4}
                                mdCol={2}
                                smCol={1}
                                gap={20}
                            >
                                {
                                    images && images.map((item, index) => (
                                        <div key={index} >
                                            <img src={item.image} alt='' onClick={() => openPreviewImage(item.image)} width="45%" height="80%" />
                                            <Button style={{ marginLeft: '10px' }} onClick={deleteImage.bind(this, item._id)} type="primary" danger ghost>delete</Button>
                                        </div>
                                    )
                                    )
                                }
                            </Grid>
                        </div>
                    </div>

                    {/* ======================================================================================================================== */}
                    <br />
                    <Button style={{ position: 'absolute', Button: 0, right: 0 }} type='warning' htmlType='submit'>Sửa</Button>
                </form>



            </div>
            {
                isOpen === true &&
                <Lightbox
                    mainSrc={previewImage}
                    onCloseRequest={() => setIsOpen(false)}
                />
            }
        </>

    )
};

export default EditProductComponent;