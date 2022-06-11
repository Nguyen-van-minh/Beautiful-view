import { ProductContext } from "../../../contexts/ProductContext";
import { useContext, useEffect, useState } from "react";
import { Spin, Pagination } from 'antd';
import Grid from "../../Grid";
import Section, { SectionBody } from '../../Section'
import AdminSearch from '../AdminSearch'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { ImageContext } from '../../../contexts/ImageContext';
import Button from "antd-button-color";
import { PlusOutlined } from '@ant-design/icons';


const ProductsList = () => {

    const { productState: { products, productLoading }, getAllProducts, deleteProduct, findProduct } = useContext(ProductContext)
    const { getAllImages, resetImage } = useContext(ImageContext)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [currentPage, setCurentPage] = useState(1)
    const perLoad = 8

    // get all products
    useEffect(() => {
        getAllProducts();
        resetImage()
    }, [])

    useEffect(() => {
        setData(products?.slice(0, perLoad))
    }, [products])

    useEffect(() => {
        window.scrollTo(0, 0)
        const getItems = () => {
            const start = (currentPage - 1) * perLoad
            const end = currentPage * perLoad
            setData(products?.slice(start, end))
        }
        getItems()
    }, [currentPage])

    const handleChange = (page) => {
        setCurentPage(page)
    }



    const handleDelete = async (id) => {
        if (window.confirm('Bạn muốn xóa sản phẩm mục này?')) {
            setLoading(true)
            const { success } = await deleteProduct(id)
            if (success) {
                toast.success('🦄 Xoá thành công!');
                setLoading(false)
            }
            else {
                toast.error('🦄 Xoá không thành công!');
            }
        }

    }

    const chooseProduct = async (productID) => {
        findProduct(productID)
        await getAllImages({ productID: productID })
    }

    let body = null

    if (productLoading) {
        body = (
            <div>
                <Spin tip="Loading...">
                </Spin>
            </div>
        )
    }
    else if (products?.length === 0) {
        body = (
            <h3>
                <Button className="box_Shadow" type="info">
                    <Link to='/admin/products/addProduct' >
                        <PlusOutlined style={{ fontSize: '20px' }} />
                        <span style={{ margin: '0 0 0 5px' }}>Thêm sản phẩm</span>
                    </Link>
                </Button>
                <br />
                <br />
                <br />
                <span>Chưa có sản phẩm nào</span>

            </h3>
        )
    }
    else {
        body = (
            <Section>
                <div>
                    <Button className="box_Shadow" type="info">
                        <Link to='/admin/products/addProduct' >
                            <PlusOutlined style={{ fontSize: '20px' }} />
                            <span style={{ margin: '0 0 0 5px' }}>Thêm sản phẩm</span>
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
                        {data?.map(product => (
                            <div key={product._id} className="product-card-admin">
                                <div className="product-card-admin__image">
                                    <img src={product.image} alt="sản phẩm" />
                                </div>
                                <h3 className="product-card-admin__name">{product.name}</h3>

                                <div className="flex-center">
                                    <Button onClick={() => handleDelete(product._id)} type="danger" >Delete</Button>
                                    <Link to='/admin/products/editProduct'>
                                        <Button onClick={() => chooseProduct(product._id)} type="warning">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            defaultCurrent={1}
                            pageSize={perLoad}
                            total={products?.length}
                            current={currentPage}
                            onChange={handleChange}
                        />
                    </div>
                </SectionBody>
            </Section>
        )
    }

    return (
        <section className="page-content">
            <AdminSearch name="Quản lý sản phẩm" />
            <section className="grid">
                {body}
            </section>

        </section>
    )
}

export default ProductsList