import React, { useContext, useEffect } from "react";
import AdminSearch from "../AdminSearch";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { Spin } from 'antd';
import AddCategory from './AddCategory'
import { DeleteOutlined } from '@ant-design/icons'
import EditCategory from "./EditCategory";
import Button from "antd-button-color";



const CategorysList = () => {
    const { CategoryState: { categorys, categoryLoading },
        getAllCategory, deleteCategory
    } = useContext(CategoryContext)


    useEffect(() => getAllCategory(), [])

    let body = null

    if (categoryLoading) {
        body = (
            <div>

                <Spin />

            </div>
        )
    }
    else if (categorys?.length === 0) {
        body = (
            <h3>
                Chưa có danh mục nào
            </h3>
        )
    }


    const handleDeleteCategory = (id) => {
        if (window.confirm('Bạn muốn xóa danh mục này?')) {
            deleteCategory(id)
        }
    }


    return (

        <section className="page-content">
            <AdminSearch name="Quản lý danh mục" />

            <section className="grid">
                <AddCategory />
                <table className="table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên danh mục</th>
                            <th scope="col">Xóa</th>
                            <th scope="col">Sửa</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorys && categorys.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        <Button onClick={() => handleDeleteCategory(item._id)} type="primary" danger ghost><DeleteOutlined /></Button>
                                    </td>
                                    <td>
                                        <EditCategory dataParent={item} />
                                    </td>
                                </tr>
                            ))

                        }

                    </tbody>
                </table>
            </section>
            {body}
        </section>
    )
}

export default CategorysList;