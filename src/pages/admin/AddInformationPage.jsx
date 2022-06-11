import React from 'react'
import Sider from '../../components/admin/sider'
import AddInformation from '../../components/admin/InformationComponents/AddInformation'

const AddInformationPage = () => {

    return (
        <>
            <Sider />
            <section className="page-content">
                <AddInformation />
            </section>

        </>
    )
}

export default AddInformationPage
