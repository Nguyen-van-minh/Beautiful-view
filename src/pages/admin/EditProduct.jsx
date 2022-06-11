import React from 'react'
import Sider from '../../components/admin/sider'
import EditProductComponent from '../../components/admin/ProductsComponents/EditProductComponent'

const EditProduct = () => {

    return (
        <>
            <Sider />
            <section className="page-content">
                <EditProductComponent />

            </section>

        </>
    )
}

export default EditProduct
