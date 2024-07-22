import React from 'react'

const Aboutus = () => {
  return (
    <div className='h-[100vh] flex flex-col items-center bg-zinc-900 text-white'>
    <center className='text-6xl text-zinc-400 font-semibold mt-20'>
        <h1>Member of Project</h1>
    </center>
    <div className='text-4xl text-zinc-400 text-center'>
            <div className="p-3">
                <h2>Aalhad Tawlare</h2>
                <h3>4th Year IT</h3>
                <h3>21007023</h3>
            </div>
        </div>
      <div className="w-full text-zinc-300 font-semibold text-2xl">
        <h1 className='mt-4 mb-4 text-5xl flex justify-center text-zinc-400'>About the Project</h1>
      <div className='flex justify-center'>
      <h1 className='text-green-500'>Title:</h1>
      <p>BookStore Website</p>
      </div>
      <div className='flex justify-center mb-5 mt-4'>
      <h1 className='text-green-500'>Tech-Stack:</h1>
      <p>HTML,CSS,JavaScript,Reactjs,Expressjs</p>
      </div>    
      </div>  
    </div>
  )
}

export default Aboutus