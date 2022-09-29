import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import MainContext from "../../../context/MainContext"


const Posts = () => {
    const [posts, setPosts] = useState([])
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/posts/')
            .then(resp => setPosts(resp.data))
            .catch(error => console.log(error))

    }, [refresh])



    const handleDelete = (id) => {
        axios.delete("/api/posts/delete/" + id, posts)
            .then((resp) => {
                setAlert({
                    message: resp.data,
                    status: "success"
                })
                setRefresh(!refresh);
                // navigate('/admin')
            })
            .catch((error) => {
                setAlert({
                    message: error.response.data,
                    status: "danger",
                })
                window.scrollTo(0, 0)

                if (error.response.status === 401)
                    setTimeout(() => navigate('/'), 2000)
            })

    }


    return (

        <>
            <Link to='/admin/orders/new' className="edit">Prideti nauja užsakymą</Link>
            {posts ?


                <table className="lentele">

                    <thead className="tbl-header" >
                        <tr>
                            <th>#</th>
                            <th>Pavadinimas</th>
                            <th>Kontentas</th>
                            <th>Suma</th>

                            <th>Statusas</th>




                        </tr>
                    </thead>
                    <tbody className="tbl-content">
                        {posts.map(post =>
                            <tr key={post.id}>
                                <td>{post.id}</td>

                                <td>{new Date(post.post_date).toLocaleString('lt-LT')}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.status ? 'Patvirtintas' : 'Nepatvirtintas'}</td>

                                <td> <Link to={"/admin/posts/edit/" + post.id} className="edit">
                                    Redaguoti
                                </Link>
                                    <Link to='/admin/posts' className="delete"
                                        onClick={(e) => handleDelete(post.id)}>Ištrinti</Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra Registruotu uzsakymu
                    <Link to='./admin/posts/new' className="edit">Prideti nauja darbuotoja</Link>
                </h3>
            }



        </>


    )
}

export default Posts