import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Bookcard from '../Bookcard/Bookcard';

const Favourites = () => {
  const [Favbooks, setFavbooks] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
   const fetch =async()=>{
    const response = await axios.get("http://localhost:3000/api/v1/getbook-fav",{headers});
    setFavbooks(response.data.data);
   }
   fetch();
  },[Favbooks]);
  
  return (
    <>
    {Favbooks && Favbooks.length === 0 &&
      (
        <div className="h-screen">
        <div className="h-[100%] flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            No Favourites
          </h1>
          <img src="./" alt="" className='lg:h-[50vh]'/>
        </div>
      </div>
      )}
    <div className='grid grid-cols-4 gap-4'>
      {Favbooks && Favbooks.map((items,i)=>(
        <div key={i}>
        <Bookcard data={items} favourite={true}/>
        </div>
      ))}
    </div>
    </>
  )
}

export default Favourites