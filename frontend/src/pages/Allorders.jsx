import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { FaUserLarge, FaCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from "react-icons/io5";
import Seeuserdata from './Seeuserdata';

const Allorders = () => {
  const [Allorder, setAllorder] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: '' });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/get-all-order', { headers });
        console.log(response.data); // Log the response to debug
        setAllorder(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    if (Allorder[i]) {
      const id = Allorder[i]._id;
      try {
        const response = await axios.put(`http://localhost:3000/api/v1/update-status/${id}`, Values, { headers });
        alert(response.data.message);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  return (
    <>
      {!Allorder.length ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb:8">All Orders</h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {Allorder.map((items, i) => (
            items && items.book && (
              <div key={items._id} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:cursor-pointer transition-all">
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[40%] md:w-[22%]">
                  <Link to={`/view-book-detail/${items.book._id}`} className="hover:text-blue-300">
                    {items.book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1>{items.book.desc.slice(0, 50)}...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1>{items.book.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button className="hover:scale-105 transition-all duration-300" onClick={() => setOptions(i)}>
                      {items.status === 'Order placed' ? (
                        <div className="text-green-500">{items.status}</div>
                      ) : items.status === 'Cancelled' ? (
                        <div className="text-red-500">{items.status}</div>
                      ) : (
                        <div className="text-yellow-500">{items.status}</div>
                      )}
                    </button>
                    <div className={`${Options === i ? 'block' : 'hidden'} flex mt-4`}>
                      <select name="status" className="bg-gray-800" onChange={change}>
                        {['Order placed', 'Out of delivery', 'Delivered', 'Cancelled'].map((status, idx) => (
                          <option value={status} key={idx}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-500 hover:text-pink-600 mx-2"
                        onClick={() => {
                          setOptions(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </h1>
                </div>
                <div className="w-[10%] md:w-[5%]">
                  <button className='text-xl hover:text-orange-500'
                  onClick={()=>{
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                  }}>
                      <IoOpenOutline/>
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
      {userDivData && (
        <Seeuserdata 
        userDivdata={userDivData}
        userDiv={userDiv}
        setuserDiv={setuserDiv}/>
      )}
    </>
  );
};

export default Allorders;
