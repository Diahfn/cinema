import React, { useContext, useEffect } from "react";
import { UserContext } from './context/userContext'
import { Route, Routes, useNavigate } from 'react-router-dom'

import MyListFilm from "./pages/myListFilm";
import AddFilm from "./admin/addFilm";
import Transaction from "./admin/transaction";
import DetailFilm from "./pages/detailFilm";
import Profile from "./pages/profile";
import Auth from "./pages/auth";
import PrivateRoute from "./component/privateRoute"
import LandingPage from "./pages/landingPage";
import { API } from "./config/api";
import UserComplain from "./pages/complain";
import AdminComplain from "./admin/adminComplain.js";
import WatchFilm from "./pages/watchFilm";

function App() {

  const [state, dispatch] = useContext(UserContext)

  const navigate = useNavigate()
  const api = API()

  useEffect(() => {
    if (!state.isLogin) {
      navigate('/auth')
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction')
      } else if (state.user.status === 'customer') {
        navigate('/homepage')
      }
    }
  }, [state])

  const checkUser = async () => {
    try {
      const config = {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + localStorage.token
        }
      }
      const response = await api.get('/check-auth', config)
      // console.log(response)

      if (response.status === 'Failed') {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      let payload = response.data.user
      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<PrivateRoute />} >
        <Route path="/homepage" element={<LandingPage />} />
        <Route path="/film/:id" element={<DetailFilm />} />
        <Route path="/my-film" element={<MyListFilm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-film" element={<AddFilm />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/complain" element={<UserComplain />} />
        <Route path="/adminComplain" element={<AdminComplain />} />
        <Route path="/watchFilm/:id" element={<WatchFilm />} />
      </Route>
    </Routes>
  );
}

export default App;
