import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Navbar = () => {
  const links = [
    {
      title:"Home",
      link:"/",
    },
    {
      title:"About us",
      link:"/about-us",
    },
    {
      title:"All books",
      link:"/all-books",
    },
    {
      title:"Cart",
      link:"/cart",
    },
    {
      title:"Profile",
      link:"/profile",
    },
    {
      title:"Admin profile",
      link:"/profile",
    },
  ];
  const isloggedIn = useSelector((state) =>state.auth.isLoggedIn);
  const role = useSelector((state) =>state.auth.role);
  if(isloggedIn === false)
    {
      links.splice(3,3);
    }
    if(isloggedIn === true && role === "user")
      {
        links.splice(5,5);
      }  
  if(isloggedIn === true && role === "admin")
    {
      links.splice(4,1);
    }  
  const [Mobilenav, setMobilenav] = useState("hidden");
  return (
    <>
    <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 justify-between items-center'>
      <Link to="/" className='flex align-items-center'>
        <img className="h-10 me-4" src="https://static.vecteezy.com/system/resources/previews/006/115/732/original/black-and-white-open-book-logo-illustration-on-white-background-vector.jpg" alt="" />
        <h1 className='text-2xl font-semibold'>Bookheaven</h1>
      </Link>
      <div className='nav-links-bookheaven block md:flex items-cenetr gap-4'>
        <div className="hidden md:flex flex gap-4">
        {links.map((items,i)=>(
          <div className='items-center'>
            {(items.title === "Profile" || items.title === "Admin profile") ? (
            <Link to={items.link} className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300" key={i}>
          {items.title}{" "}
          </Link>
        ):(
        <Link to={items.link} className="hover:text-blue-500 transition-all duration-300 " key={i}>
          {items.title}{" "}
          </Link>
        )}
          </div>
        ))}
        </div>
       {isloggedIn === false && (
         <div className="hidden md:flex flex gap-4">
         <Link to="/login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
         <Link to="/signup" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
       </div>
       )}
        <button className='block md:hidden text-white text-2xl hover:text-zinc-400'
        onClick={()=>Mobilenav === "hidden"?setMobilenav("block") : setMobilenav("hidden")}>
        <FaGripLines/>
        </button>
      </div>
    </nav>
    <div className={`${Mobilenav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items,i)=>(
        <Link to={items.link} className={`${Mobilenav} mb-4 text-white text-4xl font-semibold hover:text-blue-500 transition-all duration-300 " key={i}`}
        onClick={()=>(Mobilenav === "hidden"?setMobilenav("block") : setMobilenav("hidden"))}>
          {items.title}{" "}
          </Link>
        ))}
        {isloggedIn === false && (
          <>
          <Link to="/login" className={`${Mobilenav} text-3xl text-white font-semibold px-8 py-2 mb-8 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
          <Link to="/signup" className={`${Mobilenav} text-3xl font-semibold px-8 py-2 mb-8 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
          </>
        )}
    </div>
    </>
  )
}

export default Navbar