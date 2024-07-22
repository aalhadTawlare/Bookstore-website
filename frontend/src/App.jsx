import React, { useEffect } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from "react-router-dom";
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Viewbookdetail from './components/Viewbookdetail/Viewbookdetail';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Favourites from './components/Profile/Favourites';
import Userorderhis from './components/Profile/Userorderhis';
import Settings from './components/Profile/Settings';
import Allorders from './pages/Allorders';
import Addbook from './pages/Addbook';
import Updatebook from './pages/Updatebook';
import Aboutus from './pages/Aboutus';
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() =>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    )
    {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/all-books" element={<AllBooks/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/about-us' element={<Aboutus/>}/>
          <Route path="/profile" element={<Profile/>}>
          {role === 'user'? (<Route index element={<Favourites/>}/>):(<Route index element={<Allorders/>}/>)}
          <Route path='/profile/orderHistory' element={<Userorderhis/>}/>
          <Route path='/profile/addbook' element={<Addbook/>}/>
          <Route path='/profile/settings' element={<Settings/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/updatebook/:id" element={<Updatebook/>}/>
          <Route path='/view-book-detail/:id' element={<Viewbookdetail/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
