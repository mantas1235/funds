

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import MainContext from '../MainContext'



const Home = () => {

    const { setUserInfo } = useContext(MainContext)
    const [comment, setComment] = useState('')
    const [posts, setPosts] = useState({
        title: '',
        image: '',
        content: '',
        all_sum: ''
    })


    const [alert, setAlert] = useState({
        message: "",
        status: "",
    });

    // const [keyword, setKeyword] = useState('')

    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate()


    // useEffect(() => {
    //     axios.get('/api/posts/')
    //         .then(resp => {
    //             if (resp.data.message)
    //                 setAlert({
    //                     message: resp.data.message,
    //                     status: "danger",
    //                 });
    //             setPosts(resp.data);
    //         })
    //         .catch((error) => {
    //             setAlert({
    //                 message: error.response.data,
    //                 status: "danger",
    //             })
    //         })
    // }, [refresh]);




    useEffect(() => {
        axios.get("/api/posts/")
            .then(resp => {

                //   const donePosts = resp.data
                //     .map((post) => {
                //       const date = new Date(post.createdAt);
                //       post.createdAt = date.toLocaleDateString("lt-LT");
                //       return post;
                //     })
                setPosts(resp.data);
            })
            .catch((error) => {
                setAlert({
                    message: error.response.data,
                    status: "danger",
                })
            })
    }, [refresh]);


    // const handleForm = (e) => {
    //     e.preventDefault()
    //     console.log('veikia')
    // }

    // const handleSearch = (e) => {
    //     e.preventDefault()

    //     if (keyword === '')
    //         return setRefresh(!refresh)

    //     axios.get('/api/posts/search/' + keyword)
    //         .then(resp => {
    //             setPosts(resp.data)
    //         })
    //         .catch((error) => {
    //             setAlert({
    //                 message: error.response.data,
    //                 status: "danger",
    //             })
    //             window.scrollTo(0, 0)

    //             setTimeout(() => navigate('/login'), 2000)
    //         })

    // }
    // const handleLogout = () => {
    //     axios.get('/api/posts/logout/')
    //         .then(resp => {
    //             setUserInfo({})
    //             setAlert({
    //                 message: resp.data,
    //                 status: 'success'
    //             })

    //             navigate('/')
    //         })
    // }

    return (
        // {loggedIn &&}
        <div className="main_container">
            {/* <div className="form-group dflex">
                <form onSubmit={handleSearch} >
                    <div className="filter mb-5">
                        <input type='text' className='form-control' onChange={(e) => setKeyword(e.target.value)}
                            onBlur={() => {
                                if (keyword === '')
                                    setRefresh(!refresh)
                            }}></input>
                        <button className="btn btn-primary">Ieskoti</button>
                    </div>
                </form>
            </div> */}



            {/* 
            <div className="users">
                {users.length > 0 &&
                    users.map((user) => {
                        return (<>
                            <div className="useriai" key={user.id}>
                                <img src={user.profile_photo} alt="" />
                                <span>{user.profile_name}</span>
                            </div>
                        </>
                        )

                    })}

            </div> */}

            {/* <div className="sideProfile">
                <div className="profile_box">
                    <p>Your Mantstagram Profile</p>
                    <button className="nav-link" onClick={handleLogout}>
                        Log Out
                    </button>

                </div>

            </div> */}

            <div className="conteiner">
                {alert.message && (
                    <div className={"alert alert-" + alert.status}>{alert.message}</div>
                )}

                <div className="articles">
                    {posts.length > 0 &&
                        posts.map((post) => {
                            return (<>

                                <div key={post.id} className="box">
                                    <div className="title">
                                        <h4>{post.title}</h4>

                                    </div>
                                    <div className="image">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="post_content">
                                        <p>{post.content}</p>
                                    </div>
                                    <div className="sum">
                                        <p>{post.all_sum}</p>
                                    </div>

                                    <div className="buttons">
                                        <Link to={"/edit/" + post.id} className='skaityti'> Skiatyti placiau </Link>
                                    </div>



                                </div>
                            </>
                            );
                        })}
                </div>
            </div>
        </div>);

}


export default Home