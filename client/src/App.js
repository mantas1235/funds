import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import axios from "axios";
import MainContext from './MainContext'
import Login from "./pages/login";

//user routes
import Home from "./pages/Home";
import Header from "./pages/components/header";
import NewPost from "./pages/newpost";
import SinglePost from './pages/SinglePost';
import Logout from './pages/logout';
import { useEffect, useState } from 'react'


//admin routes
import AdminEdit from './pages/admin/edit'



axios.defaults.withCredentials = true

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: '',
  })

  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  // useEffect(() => {
  //   axios.get('/api/users/check-auth')
  //     .then(resp => {
  //       setUserInfo(resp.data)
  //     })
  // }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/new-post' element={<NewPost />} />
          <Route path='/edit/:id' element={<SinglePost />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin/edit/:id' element={<AdminEdit />} />

          <Route path='/' element={<Home />} />
          <Route path='/home-page' element={<Home />} />
          {userInfo.id &&
            <>

            </>}
        </Routes>

      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
