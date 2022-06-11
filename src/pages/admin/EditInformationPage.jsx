import React from 'react'
import Sider from '../../components/admin/sider'
import EditInformation from '../../components/admin/InformationComponents/EditInformation'

const EditInfomationPage = () => {

    return (
        <>
            <Sider />
            <section className="page-content">
                <EditInformation />
            </section>

        </>
    )
}

export default EditInfomationPage
