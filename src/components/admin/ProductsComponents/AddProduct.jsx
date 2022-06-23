import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, Spin } from 'antd';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { CategoryContext } from "../../../contexts/CategoryContext";
import { ProductContext } from '../../../contexts/ProductContext';
import { toast } from 'react-toastify';
import { ImageContext } from '../../../contexts/ImageContext';
import { Link } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons';
import Grid from "../../Grid";



const AddProductComponent = () => {
    const { CategoryState: { categorys }, getAllCategory } = useContext(CategoryContext)
    const { imageState: { images }, addImage, deleteImage, resetImage } = useContext(ImageContext)
    const { addProduct } = useContext(ProductContext)
    const [newProduct, setNewProduct] = useState({
        name: "",
        categoryID: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
        discount: "",
    });
    const [previewImage, setPreviewImage] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [urlMainImage, setUrlMainImage] = useState('')
    const [nameMainProduct, setNameMainProduct] = useState('')
    const [productID, setProductID] = useState("")
    const [mainPreviewImage, setMainPreviewImage] = useState("")
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])

    useEffect(() => {
        return () => {
            previewImage && URL.revokeObjectURL(previewImage)
        }
    }, [previewImage])

    useEffect(() => getAllCategory(), [])

    const onChangeNewProduct = (name) => (e) => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
        if (name === "image") {
            handlePreview(e)
        }
        setNewProduct({ ...newProduct, [name]: value });
    };


    const { TextArea } = Input;



    const openPreviewImage = (url) => {
        if (!url) return;
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
        setIsloading(true)
        const { success, product } = await addProduct(formData)
        if (success) {
            resetAddData()
            setUrlMainImage(product.image)
            setNameMainProduct(product.name)
            setProductID(product._id)
            toast.success('🦄 Thêm thành công!');
        }
        else {
            toast.error('🦄 Lỗi');
        }

    }

    const resetAddData = () => {
        setNewProduct({
            name: "",
            categoryID: "",
            price: 0,
            discount: 0,
            quantity: 0,
            description: "",
            image: ""
        })
        setColor([])
        setSize([])
        setPreviewImage()
        setIsloading(false)
        setIsSuccess(true)
    }

    const submitNewImage = async event => {
        setIsloading(true)
        let a = event.target.files[0]
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", a);
        formData.append("productID", productID)
        const { success } = await addImage(formData)
        if (success) {
            resetAddData()
            setIsloading(false)
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
            {
                isSuccess ?
                    <>
                        <div>
                            <h3>{nameMainProduct} {isLoading && <Spin />}</h3>
                            <img src={urlMainImage ? urlMainImage : "#"} alt="" width="20%" height="10%" />
                            <label style={{ marginLeft: 30 }} className='lable-upload box_Shadow' id='lable' htmlFor='image' >
                                <span style={{ padding: 20 }}><UploadOutlined style={{ fontSize: '25px' }} /> Tải ảnh phụ cho sản phẩm</span>
                            </label>



                            <input
                                id="image"
                                className="form-control"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={submitNewImage}
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                            />


                            <div className='cart-images-support'>
                                <Grid
                                    col={4}
                                    mdCol={2}
                                    smCol={1}
                                    gap={20}
                                >
                                    {
                                        images && images.map((item, index) => (
                                            <div style={{ margin: 8, height: "100%" }} key={index}>
                                                <img src={item.image} alt='' width="45%" height="80%" onClick={() => openPreviewImage(item.image)} />
                                                <Button style={{ marginLeft: 25 }} onClick={deleteImage.bind(this, item._id)} type="danger" >delete</Button>
                                            </div>
                                        )
                                        )
                                    }
                                </Grid>
                            </div>

                            <Button className='box_Shadow' style={{ marginTop: 20 }} type='primary'>
                                <Link to='/admin/products' onClick={resetImage}> Hoàn thành</Link>
                            </Button>

                        </div>
                    </>


                    :

                    <> <div >
                        {isLoading && <div>
                            <Spin />
                        </div>}
                        <form onSubmit={onSubmitProduct} style={{ position: 'relative', marginBottom: 30 }} >

                            <div className="form__group field">
                                <input style={{ width: '80%' }} type="input" className="form__field" placeholder="Tên sản phẩm" name="name" id='name' value={newProduct.name} onChange={onChangeNewProduct("name")} required />
                                <label htmlFor="name" className="form__label">Tên sản phẩm </label>
                            </div>

                            <br />
                            <div className="form__group field">
                                <label htmlFor="quantity" className="form__label">Số lượng </label>
                                <input id='quantity' type='number' className="form__field" name='quantity' style={{ width: '30%' }} value={newProduct.quantity} onChange={onChangeNewProduct("quantity")} placeholder='Số lượng' />
                            </div>

                            <br />
                            <div className="form__group field">
                                <label htmlFor='price' className="form__label">Giá </label>
                                <input id='price' type='number' className="form__field" name='price' value={newProduct.price} onChange={onChangeNewProduct("price")} style={{ width: '30%' }} placeholder='Giá VND' />
                                <span style={{ fontSize: 20 }}>đ</span>
                            </div>
                            <br />
                            <div className="form__group field">
                                <label htmlFor='discount' className="form__label">Giảm giá </label>
                                <input id='discount' type='number' className="form__field" name='discount' value={newProduct.discount} onChange={onChangeNewProduct("discount")} style={{ width: '30%' }} placeholder='Giảm %' />
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
                                    <option>Chọn danh mục</option>
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
                                    <input className='input-color' type="checkbox" id="white" name="white" value="white" onChange={(e) => handleCheck(e)} />
                                    <label htmlFor="white">Trắng</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="pink" name="pink" value="pink" onChange={(e) => handleCheck(e)} />
                                    <label htmlFor="pink">Hồng</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="black" name="black" value="black" onChange={(e) => handleCheck(e)} />
                                    <label htmlFor="black">Đen</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="yellow" name="yellow" value="yellow" onChange={(e) => handleCheck(e)} />
                                    <label htmlFor="yellow">Vàng</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="orange" name="orange" value="orange" onChange={(e) => handleCheck(e)} />
                                    <label htmlFor="orange">Cam</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="blue" name="blue" value="blue" onChange={(e) => handleCheck(e)} />
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
                                    <input className='input-color' type="checkbox" id="M" name="M" value="M" onChange={(e) => handleCheckSize(e)} />
                                    <label htmlFor="M">M</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="L" name="L" value="L" onChange={(e) => handleCheckSize(e)} />
                                    <label htmlFor="L">L</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="XL" name="XL" value="XL" onChange={(e) => handleCheckSize(e)} />
                                    <label htmlFor="XL">XL</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="2XL" name="2XL" value="2XL" onChange={(e) => handleCheckSize(e)} />
                                    <label htmlFor="2XL">2XL</label>
                                </div>

                                <div>
                                    <input className='input-color' type="checkbox" id="3XL" name="3XL" value="3XL" onChange={(e) => handleCheckSize(e)} />
                                    <label htmlFor="3XL">3XL</label>
                                </div>
                            </div>


                            <br />

                            <TextArea name='description' value={newProduct.description} onChange={onChangeNewProduct("description")} rows={4} placeholder="Nội dung miêu tả sản phẩm" />
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
                            {
                                mainPreviewImage && (<img src={mainPreviewImage} onClick={() => openPreviewImage(mainPreviewImage)} alt="" width="20%" height="10%" />)
                            }
                            <br />

                            <Button style={{ position: 'absolute', Button: 0, right: 0 }} type='primary' htmlType='submit'>Thêm</Button>
                        </form>
                    </div>

                    </>
            }

            {
                isOpen === true &&
                <Lightbox
                    mainSrc={previewImage}
                    onCloseRequest={() => setIsOpen(false)}
                />
            }
        </>
    );
};

export default AddProductComponent
    ;