import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [order, setOrder] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-orderhis-user", { headers });
        setOrder(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <>
      {!order && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {order && order.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">No Order History</h1>
            <img src="" alt="No Order History" />
          </div>
        </div>
      )}
      {order && order.length > 0 && (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Order History</h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>
          {order.map((item, index) => (
            <div key={item.id} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-center">{index + 1}</h1>
              </div>
              <div className="w-[22%]">
                {item.book ? (
                  <Link to={`/view-book-details/${item.book_id}`} className="hover:text-blue-300">
                    {item.book.title}
                  </Link>
                ) : (
                  <span className="text-red-500">Book details not available</span>
                )}
              </div>
              <div className="w-[45%]">
                {item.book ? (
                  <h1>{item.book.desc.slice(0, 50)}...</h1>
                ) : (
                  <span className="text-red-500">Description not available</span>
                )}
              </div>
              <div className="w-[9%]">
                {item.book ? (
                  <h1>Rs.{item.book.price}</h1>
                ) : (
                  <span className="text-red-500">Price not available</span>
                )}
              </div>
              <div className="w-[16%]">
                <h1 className={`font-semibold ${item.status === "order placed" || item.status === "Cancelled" ? "text-yellow-500" : "text-green-500"}`}>
                  {item.status}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
