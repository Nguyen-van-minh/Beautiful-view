
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";


const AdminSearch = (props) => {
    const { authState: { user } } = useContext(AuthContext)


    return (
        <section className="search-and-user">
            <div style={{ textAlign: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: 30 }}>
                    {props.name}
                </span>
            </div>
            <div className="admin-profile">
                <span className="greeting">Hello {user?.username}</span>
                <div className="notifications">

                </div>
            </div>
        </section>


    )
}

export default AdminSearch