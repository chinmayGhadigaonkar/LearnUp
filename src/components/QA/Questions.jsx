import React from 'react'

const Questions = () => {
  return (
    <>
      <hr />
      <div className=' h-fit flex justify-center items-center space-x-10 '>
        <div className=''>
          <div className='votes text-black text-xl'>
              0 Votes
          </div>
          <div className='Answer text-black'>
              0 Answer
          </div>
        </div>
        <div className='mt-4'>
          <div className='head-question text-black font-semibold  text-xl my-1'>
            <h1>How to assign start and end date from range using Flatpickr in Ruby on Rails</h1>
          </div>
          <div className='tags mt-4  flex space-x-3  '>
                <li className=' list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none rounded-sm' >tags</li> 
                <li className=' list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none  rounded-sm '>tags</li>             
          </div>
          <div className="my-3  flex justify-end ">
            <h2 className=' text-black cursor-pointer text-bold'>javaLearnMushigi</h2>
          <span className='text-gray-500 mx-2'> 1 year ago</span>
          </div>

        </div>
      </div>

      <hr />
    </>
  )
}

export default Questions