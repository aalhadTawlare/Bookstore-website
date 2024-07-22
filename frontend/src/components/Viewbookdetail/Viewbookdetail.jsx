import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Loader from "../Loader/Loader"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const Viewbookdetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [Data,setData]= useState();
    const isLoggedIn = useSelector((state) =>state.auth.isLoggedIn);
    const role = useSelector((state) =>state.auth.role);
  useEffect(() => {
    const fetch = async()=>{
      const response = await axios.get(`http://localhost:3000/api/v1/get-bookbyid/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };
  const handlefav = async ()=>{
    const response = await axios.put(`http://localhost:3000/api/v1/addbook-fav`,{},{headers})
    alert(response.data.message);
  }
  const handlecart = async ()=>{
    const response = await axios.put(`http://localhost:3000/api/v1/addbook-cart`,{},{headers})
    alert(response.data.message);
  }
  const deletebook = async ()=>{
    const response = await axios.delete("http://localhost:3000/api/v1/deletebook",{headers});
    alert(response.data.message);
    navigate("/all-books");
  }
  return (
    <>
    {Data && (<div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row'>
      <div className='lg:w-3/6'>
      <div className='bg-zinc-800 rounded p-12 flex flex-col justify-around w-full lg:flex-row'>
      {" "}<img src={Data.url} alt="/" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded'/>
      {/* user login */}
      {isLoggedIn === true && role === "user" && (
        <div className='flex flex-col md:flex-row mg-4 lg:flex-col lg:mt-0 justify-between lg:justify-start'>
        <button className='bg-white rounded-full text-3xl p-2 text-red-500 mt-4 items-center justify-center'
        onClick={handlefav}>
          <FaHeart/><span className='ms-4 block lg:hidden'>Favourites</span>
          </button>
        <button className='bg-white mt-8 rounded-full md:mt-0 lg:mt-4 text-3xl p-2 text-blue-500 items-center justify-center'
        onClick={handlecart}>
          <FaShoppingCart/><span className='ms-4 block lg:hidden'>Add to Cart</span>
          </button>
      </div>)}
      {/* admin login */}
      {isLoggedIn === true && role === "admin" && (
        <div className='flex flex-col md:flex-row mg-4 lg:flex-col lg:mt-0 justify-between lg:justify-start'>
        <Link to={`/updatebook/${id}`} className='bg-white rounded-full text-3xl p-2 mt-4 items-center justify-center'>
          <FaEdit/><span className='ms-4 block lg:hidden'>Edit</span>
          </Link>
        <button className='bg-white mt-8 rounded-full md:mt-0 lg:mt-4 text-3xl p-2 text-red-500 items-center justify-center'
        onClick={deletebook}>
          <MdDelete/><span className='ms-4 block lg:hidden'>Delete Book</span>
          </button>
      </div>)}
      </div>
      </div>
      <div className='p-4 w-full lg:w-3/6'>
      <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
      <p className='text-zinc-400 mt-1'>by {Data.author}</p>
      <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
      <p className='flex mt-4 items-center justify-start text-zinc-400'>
      <GrLanguage className="me-3"/>{Data.language}</p>
      <p className='mt-4 text-zinc-100 font-semibold text-3xl'>Rs.{Data.price}{" "}</p>
      </div>
  </div>)}
  {!Data && 
  (<div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/>{" "}</div>)}
  </>
  )
}

export default Viewbookdetail
