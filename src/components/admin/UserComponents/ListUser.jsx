import React, { useContext, useEffect } from "react";
import AdminSearch from "../AdminSearch";
import { UserContext } from "../../../contexts/UserContext";
import AddUser from "./AddUser";
import Button from "antd-button-color";
import { DeleteOutlined } from '@ant-design/icons'
import EditUser from "./EditUser";
import moment from 'moment'

const UserList = () => {
    const { userState: { listUser }, getAllUser, deleteUser } = useContext(UserContext)
    useEffect(() => {
        getAllUser()
    }, [])

    const handleDeleteUser = (id) => {
        if (window.confirm('Bạn muốn xóa đơn này!')) {
            deleteUser(id)
        }
    }

    return (

        <section className="page-content">
            <AdminSearch name="Quản lý người dùng" />
            <section className="grid">
                <AddUser />
                <table className="table " style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUser.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.username}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.role}
                                    </td>
                                    <td>
                                        {moment(item.createdAt).format('DD/MM/YY  hh:mm')}
                                    </td>
                                    <td>
                                        <Button onClick={() => handleDeleteUser(item._id)} type="primary" danger ghost><DeleteOutlined /></Button>
                                    </td>
                                    <td>
                                        <EditUser dataParent={item} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>

        </section>
    )
}

export default UserList;