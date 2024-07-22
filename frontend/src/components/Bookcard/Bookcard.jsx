import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
const Bookcard = ({data,favourite}) => {
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const removebook = async() =>{
    const response = await axios.put("http://localhost:3000/api/v1/removebook-fav",{},{headers})
    alert(response.data.message)
  }
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <Link to={`/view-book-detail/${data._id}`}>
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <div className="bg-zinc-900 rounded flex items-center justify-center">
      <img src={data.url} alt="/" className='h-[25vh]'/>
    </div>
    <h2 className='mt-4 text-xl text-zinc-200'>{data.title}</h2>
    <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
    <p className='mt-2 text-zinc-200 font-semibold text-xl'>Rs.{data.price}</p>
    </div>
    </Link>
    {favourite && (
      <button className='bg-yellow-50 text-xl text-font-semibold px-4 py-2 rounded border border-yellow-500 text-yellow-500'
      onClick={removebook}>
      Remove from Favourites</button>
      
    )}
    </div>
  );
}

export default Bookcard