import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row items-center justify-center'>
    <div className='w-full md-12 md:md-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
    <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>Discover Your Next Great Read</h1>
    <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
    Welcome to our Bookstore Project, a literary oasis designed to cater to book lovers and avid readers. Our mission is to create an inviting space where people can discover, explore, and indulge in the joys of reading. Whether you are a fan of timeless classics, contemporary bestsellers, or niche genres, our bookstore aims to provide a diverse selection of titles to satisfy every literary palate.
    </p>
    <div className='mt-8'>
    <Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
    Discover Books
    </Link>
    </div>
    </div>
    <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
    <img src="./Home.jpg" alt=""/>
    </div>
    </div>
  )
}

export default Hero