import React from 'react'
import Sider from '../../components/admin/sider'
import AddProductComponent from '../../components/admin/ProductsComponents/AddProduct'

const AddProduct = () => {

    return (
        <>
            <Sider />
            <section className="page-content">
                <AddProductComponent />

            </section>

        </>
    )
}

export default AddProduct
