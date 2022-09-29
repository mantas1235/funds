import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../../MainContext";





const OrderEdit = () => {
    const { setAlert } = useContext(MainContext)
    const [saloons, setSaloons] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        order_date: '',
        status: ''
    });

    useEffect(() => {
        axios.get("/api/posts/edit/" + id, post)
            .then((resp) => {
                resp.data.order_date = new Date(resp.data.order_date).toISOString().slice(0, 16)
                resp.data.status = resp.data.status ? '1' : '0'
                if (!resp.data) {
                    navigate("/admin");
                    return;
                }
                setPost(resp.data);
            })
            .catch((error) => {
                console.log(error);
                navigate("/admin");
            });
    }, []);

    const handleForm = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.put("/api/posts/edit/" + id, post)
            .then((resp) => {
                setPost(resp.data)
                navigate('/admin/orders')
            });
    };



    return (
        <div className="container">
            <h1>Užsakymų Redaguoti</h1>
            <div className="transparent">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-2">
                        <label>Uzsakymas data</label>
                        <input
                            type="datetime-local"
                            name="order_date"
                            className="form-control"
                            onChange={(e) => handleForm(e)}
                            value={post.order_date}
                        />
                    </div>
                    <div className="form-control">
                        <label>Užsakymų Statusas</label>
                        <select name="status" onChange={handleForm} value={post.status}>
                            <option value='0'>Nepatvirtintas</option>
                            <option value='1'>Patvirtintas</option>
                        </select>
                    </div>

                    <button className="btn btn-primary">Prideti</button>
                </form>
            </div>
        </div>
    );
};

export default OrderEdit;
