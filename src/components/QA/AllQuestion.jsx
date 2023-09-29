import React from 'react'
import Questions from './Questions'

const AllQuestion = () => {
  return (
    <>
    <div className='flex h-full px-2 py-3 w-full space-x-2'>
    {/* <div className=' h-full w-2/12 bg-red-500'>
        <li>Newest</li>
        
    </div> */}
    <div className='w-11/12 mx-auto  my-2 '>

        <header className='flex justify-between py-3 h-20  '>
          <h1 className='text-xl ml-2 font-semibold '>Top Questions</h1>
          <button className=" text-white bg-black border-0 py-1 px-2 h-10 focus:outline-none hover:bg-white hover:border-red-500  hover:border-2 hover:text-red-500 rounded text-lg ">
          Ask Question
          </button>
          
        </header>
        <div>
          
        <Questions/>
        <Questions/>
        <Questions/>
        <Questions/>
        <Questions/>
        <Questions/>
        <Questions/>
        <Questions/>
        </div>
    </div>
    </div>



    </>
  )
}

export default AllQuestion